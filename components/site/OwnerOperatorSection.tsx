import { Compass, LineChart, MessagesSquare, ShieldCheck } from "lucide-react";

// Credibility section. Establishes that the company is run with an
// owner/operator mindset — not a generic property management vendor.
// Sits high in the page (right under the hero band) to reframe the visitor
// before they read service details.
const PILLARS = [
  {
    icon: Compass,
    title: "Owner mindset",
    copy: "Every decision is made through the lens of long-term value, not short-term convenience.",
  },
  {
    icon: LineChart,
    title: "Asset management discipline",
    copy: "Rent positioning, capex planning, and NOI awareness baked into how we run your property.",
  },
  {
    icon: MessagesSquare,
    title: "Professional communication",
    copy: "Same-business-day owner responses and clean, written updates — never radio silence.",
  },
  {
    icon: ShieldCheck,
    title: "Cost control",
    copy: "Vetted vendors, scope review, and quality checks to protect your asset and your operating margin.",
  },
];

export default function OwnerOperatorSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left: headline + supporting copy */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Owner / Operator
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built by real estate owners and operators.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              We built this company around the experience owners actually
              want: fast communication, clear reporting, reliable vendor
              coordination, and practical asset management judgment.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              That means thinking about your property the way you would —
              long-term value, controlled costs, and residents who renew.
            </p>
          </div>

          {/* Right: 4 supporting pillars in a 2x2 grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
