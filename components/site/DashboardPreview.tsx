import {
  TrendingUp,
  Building2,
  DollarSign,
  Wrench,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

// Larger, "marketing screenshot" style dashboard preview. Different shape
// from the Hero mock so the page doesn't feel repetitive.
export default function DashboardPreview() {
  return (
    <section id="dashboard" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Owner Dashboard
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Owners deserve visibility, not guesswork.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Track occupancy, income, NOI trend, and open work orders in real
            time — from anywhere.
          </p>
        </div>

        {/* The mock dashboard */}
        <div className="mt-14">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Portfolio overview
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  Smith Family Holdings · April 2026
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                Live
              </div>
            </div>

            {/* KPI grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Kpi
                icon={<Building2 size={16} />}
                label="Occupancy"
                value="96%"
                trend="+2 pts MoM"
                trendUp
              />
              <Kpi
                icon={<DollarSign size={16} />}
                label="Monthly Income"
                value="$42,500"
                trend="On track"
              />
              <Kpi
                icon={<TrendingUp size={16} />}
                label="NOI Trend"
                value="+8.4%"
                trend="vs prior year"
                trendUp
                accent
              />
              <Kpi
                icon={<Wrench size={16} />}
                label="Open Work Orders"
                value="3"
                trend="2 in progress"
              />
              <Kpi
                icon={<CalendarDays size={16} />}
                label="Upcoming Lease Expirations"
                value="2"
                trend="Next 60 days"
              />
              <Kpi
                icon={<ArrowUpRight size={16} />}
                label="YTD Distributions"
                value="$148,200"
                trend="6 payouts"
              />
            </div>

            {/* Rent roll snapshot */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">
                  Rent roll snapshot
                </div>
                <div className="text-xs text-slate-500">As of today</div>
              </div>

              <div className="divide-y divide-slate-100">
                <RentRow
                  unit="Sunnyvale · 4B"
                  tenant="K. Patel"
                  rent="$3,450"
                  status="Paid"
                />
                <RentRow
                  unit="San Jose · Main"
                  tenant="M. Nguyen"
                  rent="$4,100"
                  status="Paid"
                />
                <RentRow
                  unit="Santa Clara · 2"
                  tenant="J. Lopez"
                  rent="$3,200"
                  status="Scheduled"
                />
                <RentRow
                  unit="Mountain View · A"
                  tenant="R. Cohen"
                  rent="$3,750"
                  status="Paid"
                />
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
  trend,
  trendUp = false,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-brand-200 bg-brand-50/40"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm ring-1 ring-slate-200">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div
        className={`mt-1 text-xs ${
          trendUp ? "text-emerald-600" : "text-slate-500"
        }`}
      >
        {trend}
      </div>
    </div>
  );
}

function RentRow({
  unit,
  tenant,
  rent,
  status,
}: {
  unit: string;
  tenant: string;
  rent: string;
  status: "Paid" | "Scheduled" | "Late";
}) {
  // Map status to an appropriate pill color
  const tone =
    status === "Paid"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Scheduled"
      ? "bg-brand-50 text-brand-700"
      : "bg-rose-50 text-rose-700";

  return (
    <div className="grid grid-cols-4 items-center px-5 py-3 text-sm">
      <div className="font-medium text-slate-900">{unit}</div>
      <div className="text-slate-600">{tenant}</div>
      <div className="text-slate-900">{rent}</div>
      <div className="text-right">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
