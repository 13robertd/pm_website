import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

// POST /api/leads
//
// Accepts lead submissions from both the homepage RentalAnalysisForm
// and the multi-step /estimate funnel. Body shape varies between
// sources; we normalize email/name on the server, format a readable
// plain-text body, and send via Resend if configured.
//
// Fail-soft strategy: every successful POST always logs to the server
// console (so leads are visible in Vercel function logs even if the
// email provider is misconfigured), then attempts the email. If email
// fails for any reason, the user still sees a success state — the
// lead isn't lost, it's still in the logs.
//
// Required env vars (set in Vercel project settings):
//   RESEND_API_KEY    — your Resend API key
//   LEADS_TO_EMAIL    — inbox that receives lead notifications
//   LEADS_FROM_EMAIL  — verified sender on your Resend domain
//                       (e.g. "leads@bayline.example")
//
// Without these, leads are still captured in server logs.

export const runtime = "nodejs";

type LeadBody = {
  source?: string;
  // Either form may include any of these — we read them defensively.
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  street?: string;
  city?: string;
  zip?: string;
  propertyType?: string;
  type?: string;
  bedrooms?: string | number;
  bathrooms?: string | number;
  sqft?: string | number;
  units?: string | number;
  currentRent?: string | number;
  status?: string;
  message?: string;
  contact?: { name?: string; email?: string; phone?: string };
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  // Normalize identifying fields — both shapes can supply these in
  // different places.
  const email = (body.email ?? body.contact?.email ?? "").trim();
  const name = (body.name ?? body.contact?.name ?? "").trim() || "Unknown";
  const phone = (body.phone ?? body.contact?.phone ?? "").trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 }
    );
  }

  const source = body.source || "unknown";
  const receivedAt = new Date().toISOString();

  // Backstop: every lead is logged to the server, regardless of whether
  // email delivery succeeds. Prefixed for easy grep in Vercel logs.
  console.log("[lead]", JSON.stringify({ source, receivedAt, ...body }));

  // Try to send email if Resend is configured. If not, we already
  // logged the lead — just return success.
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEADS_TO_EMAIL;
  const fromEmail =
    process.env.LEADS_FROM_EMAIL || "leads@bayline.example";

  if (!apiKey || !toEmail) {
    console.warn(
      "[lead] Resend not configured (RESEND_API_KEY or LEADS_TO_EMAIL missing) — lead saved to logs only."
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `[${source}] New lead: ${name} <${email}>`;
    const text = formatLeadEmail({ source, receivedAt, name, email, phone, body });

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      text,
    });

    if (result.error) {
      console.error("[lead] Resend returned error:", result.error);
    }
  } catch (err) {
    // Never fail the request because of email — the lead is in logs.
    console.error("[lead] Email send threw:", err);
  }

  return NextResponse.json({ ok: true });
}

// Plain text email body. Sections feel more skim-able than a JSON blob.
function formatLeadEmail({
  source,
  receivedAt,
  name,
  email,
  phone,
  body,
}: {
  source: string;
  receivedAt: string;
  name: string;
  email: string;
  phone: string;
  body: LeadBody;
}): string {
  const lines: string[] = [];
  lines.push(`Source:      ${source}`);
  lines.push(`Received at: ${receivedAt}`);
  lines.push("");

  lines.push("--- Contact ---");
  lines.push(`Name:  ${name}`);
  lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  lines.push("");

  // Address — homepage form sends a single string, funnel sends parts
  const addressLine =
    body.address ||
    [body.street, body.city, body.zip].filter(Boolean).join(", ");
  if (addressLine) {
    lines.push("--- Property ---");
    lines.push(`Address: ${addressLine}`);
  }
  if (body.propertyType || body.type) {
    lines.push(`Type:        ${body.propertyType || body.type}`);
  }
  if (body.bedrooms !== undefined && body.bedrooms !== "") {
    lines.push(`Bedrooms:    ${body.bedrooms}`);
  }
  if (body.bathrooms !== undefined && body.bathrooms !== "") {
    lines.push(`Bathrooms:   ${body.bathrooms}`);
  }
  if (body.sqft !== undefined && body.sqft !== "") {
    lines.push(`Sq Ft:       ${body.sqft}`);
  }
  if (body.units !== undefined && body.units !== "") {
    lines.push(`Units:       ${body.units}`);
  }
  if (body.status) lines.push(`Status:      ${body.status}`);
  if (body.currentRent) lines.push(`Current rent: ${body.currentRent}`);
  lines.push("");

  if (body.message) {
    lines.push("--- Message ---");
    lines.push(String(body.message));
    lines.push("");
  }

  lines.push("--- Raw payload ---");
  lines.push(JSON.stringify(body, null, 2));
  return lines.join("\n");
}
