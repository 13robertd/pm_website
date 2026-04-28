import { ArrowRight, Home, DollarSign, Receipt, Wrench, Check } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";

// Hero with a polished mock dashboard visual on the right.
// Two CTAs: primary (proposal) and secondary (see dashboard).
// Trust chips appear directly below the CTAs for fast credibility.
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft radial background for premium feel */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(207_250_254/0.55),transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              Peninsula &amp; South Bay Property Management
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.07]">
              Property Management for{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Peninsula &amp; South Bay Homeowners.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Modern rental management, owner reporting, and proactive
              maintenance for single-family homes and small multifamily
              properties from San Mateo to San Jose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get Free Rental Estimate
                <ArrowRight size={16} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                Preview Owner Dashboard
              </a>
            </div>

            {/* Inline trust chips — fast credibility right below the CTAs */}
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
              {TRUST_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>{badge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — dashboard mockup */}
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

// Single-property mini dashboard. Four numbers an SFH owner actually
// checks: rent in, expenses, maintenance, occupancy. Plus a net-to-you
// total at the bottom so the math is right there.
function HeroDashboard() {
  return (
    <div className="relative">
      {/* Decorative gradient halo behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand-100 via-white to-slate-100 blur-2xl"
      />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        {/* Mock window chrome + property address */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
          <span className="text-xs font-medium text-slate-500">
            1247 Sunnydale Ave · Sunnyvale
          </span>
        </div>

        {/* Four KPIs in a clean 2x2 grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniStat
            icon={<Home size={14} />}
            label="Occupancy"
            value="Occupied"
            sub="Lease through Aug 2026"
          />
          <MiniStat
            icon={<DollarSign size={14} />}
            label="Rent this month"
            value="$4,500"
            sub="Paid Apr 1"
            accent
          />
          <MiniStat
            icon={<Receipt size={14} />}
            label="Expenses"
            value="$680"
            sub="PM fee + utilities"
          />
          <MiniStat
            icon={<Wrench size={14} />}
            label="Maintenance"
            value="$0"
            sub="No open work orders"
          />
        </div>

        {/* Net to owner — the bottom line */}
        <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm">
          <span className="font-medium text-slate-300">Net to you</span>
          <span className="text-base font-semibold text-white">$3,820</span>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        accent ? "border-brand-200 bg-brand-50/50" : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        {icon} {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
