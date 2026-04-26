import {
  DollarSign,
  Home,
  Wrench,
  CalendarDays,
  FileText,
  BellRing,
} from "lucide-react";
import type { Estimate } from "@/lib/rentEstimator";

// "See how ownership should feel." — sample dashboard cards on the
// results page. Lighter than the full DashboardPreview on the homepage —
// here we just want to preview the *experience* of having a dashboard.
//
// Some cards pull live numbers from the estimate (income, occupancy)
// so the preview feels personalized, not generic.
export default function DashboardPreview({
  estimate,
}: {
  estimate: Estimate;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
          Owner Dashboard Preview
        </span>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          See how ownership should feel.
        </h2>
        <p className="mt-3 text-base text-slate-600">
          A preview of the dashboard you&apos;d see if we managed this
          property — real numbers, real-time, on every device.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashCard
          icon={<DollarSign size={16} />}
          label="Monthly income projection"
          value={`$${estimate.suggestedRent.toLocaleString()}`}
          sub="Based on suggested market rent"
        />
        <DashCard
          icon={<Home size={16} />}
          label="Occupancy status"
          value="Ready to lease"
          sub="Listing-ready in 24–48 hours"
          tone="emerald"
        />
        <DashCard
          icon={<Wrench size={16} />}
          label="Maintenance requests"
          value="0 open"
          sub="Same-day triage when they come in"
        />
        <DashCard
          icon={<CalendarDays size={16} />}
          label="Lease timeline"
          value="—"
          sub="Renewal alerts 90 days in advance"
        />
        <DashCard
          icon={<FileText size={16} />}
          label="Owner statements"
          value="Monthly + on demand"
          sub="Line-item digital, never PDF-only"
        />
        <DashCard
          icon={<BellRing size={16} />}
          label="Property alerts"
          value="Push + email"
          sub="Only what matters — no noise"
          tone="brand"
        />
      </div>
    </section>
  );
}

function DashCard({
  icon,
  label,
  value,
  sub,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: "neutral" | "brand" | "emerald";
}) {
  const valueClass =
    tone === "emerald"
      ? "text-emerald-700"
      : tone === "brand"
      ? "text-brand-700"
      : "text-slate-900";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm ring-1 ring-slate-200">
          {icon}
        </span>
        {label}
      </div>
      <div className={`mt-3 text-xl font-semibold ${valueClass}`}>{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
