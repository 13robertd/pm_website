import { ArrowRight, TrendingUp, Wrench, FileText, Home, Check } from "lucide-react";
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
              Bay Area • South Bay specialists
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Fast, transparent property management for{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Bay Area owners.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Modern systems, responsive communication, and clear owner
              reporting for rental homes and small multifamily properties
              across the South Bay.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get a Management Proposal
                <ArrowRight size={16} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                See Owner Dashboard
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

// Inline mini dashboard: keeps Hero self-contained and visually distinct
// from the larger DashboardPreview section further down the page.
function HeroDashboard() {
  return (
    <div className="relative">
      {/* Decorative gradient halo behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand-100 via-white to-slate-100 blur-2xl"
      />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        {/* Mock window chrome */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
          <span className="text-xs font-medium text-slate-500">
            Owner Dashboard
          </span>
        </div>

        {/* Top stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniStat
            icon={<Home size={14} />}
            label="Occupancy"
            value="96%"
            sub="12 of 12 units"
          />
          <MiniStat
            icon={<TrendingUp size={14} />}
            label="Monthly Income"
            value="$42,500"
            sub="+8.4% YoY"
            accent
          />
        </div>

        {/* Two-column content */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Work orders */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Wrench size={14} /> Open Work Orders
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">3</div>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center justify-between">
                <span>Dishwasher repair</span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                  Scheduled
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>HVAC service</span>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
                  In progress
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Garage door</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  New
                </span>
              </li>
            </ul>
          </div>

          {/* Lease expirations */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <FileText size={14} /> Lease Expirations
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">2</div>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li className="flex items-center justify-between">
                <span>Unit 4B — Sunnyvale</span>
                <span className="text-slate-500">Jul 31</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Unit 2 — San Jose</span>
                <span className="text-slate-500">Aug 14</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Maintenance health bar */}
        <div className="mt-4 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Maintenance status</span>
            <span className="text-emerald-600">Healthy</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" />
          </div>
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
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
