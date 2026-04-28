import { Home, DollarSign, Receipt, Wrench } from "lucide-react";

// Owner Dashboard preview — single-family home edition.
// We deliberately show only the four numbers a single-property owner
// actually checks every month: rent in, expenses, maintenance, and
// whether the home is occupied. The "Net to you" row at the bottom
// closes the loop so the math is visible.
//
// No NOI trends, no portfolio rollups, no rent roll — those add noise
// for a one-home owner. If we ever support multi-property dashboards,
// that's a separate variant.
export default function DashboardPreview() {
  return (
    <section id="dashboard" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Owner Dashboard
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Owners deserve visibility, not guesswork.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Four numbers that tell you everything you need to know about
            your rental — and a clean line from rent to net.
          </p>
        </div>

        {/* The mock dashboard */}
        <div className="mt-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            {/* Header — single property */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Your Property
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  1247 Sunnydale Ave · Sunnyvale
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                Live
              </div>
            </div>

            {/* Four KPIs */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Kpi
                accent
                icon={<DollarSign size={16} />}
                label="Rent this month"
                value="$4,500"
                sub="Paid Apr 1 · on time"
              />
              <Kpi
                icon={<Receipt size={16} />}
                label="Expenses this month"
                value="$680"
                sub="Management fee · utilities · landscaping"
              />
              <Kpi
                icon={<Wrench size={16} />}
                label="Maintenance YTD"
                value="$1,240"
                sub="3 work orders completed"
              />
              <Kpi
                icon={<Home size={16} />}
                label="Occupancy"
                value="Occupied"
                sub="Lease through Aug 14, 2026"
              />
            </div>

            {/* Net to owner */}
            <div className="mt-6 rounded-2xl bg-slate-900 p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Net to you this month
                  </div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight text-white">
                    $3,820
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Rent received <span className="text-slate-300">$4,500</span>
                  {" · "}
                  Expenses <span className="text-slate-300">−$680</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Kpi({
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
      className={`rounded-2xl border p-5 ${
        accent ? "border-brand-200 bg-brand-50/40" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${
            accent
              ? "bg-white text-brand-700 ring-1 ring-brand-200"
              : "bg-brand-50 text-brand-700"
          }`}
        >
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
