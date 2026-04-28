import { Home, DollarSign, Receipt, Wrench } from "lucide-react";
import type { Estimate } from "@/lib/rentEstimator";

// Owner Dashboard preview shown on /estimate/results.
//
// Same four metrics as the homepage dashboard — rent, expenses,
// maintenance, occupancy — but the numbers are personalized off the
// rental estimate so the visitor sees their own projection.
//
// Rough cost assumptions (mock; intentionally simple):
//   - Total operating expenses: ~12% of suggested rent
//     (covers PM fee, utilities owner pays, insurance, landscaping)
//   - Maintenance reserve: ~5% of suggested rent
//
// These percentages are conservative averages used by Bay Area owners
// when modeling SFH rentals. Easy to refine later when we plug in real
// expense data.
const EXPENSE_PCT = 0.12;
const MAINTENANCE_PCT = 0.05;

export default function DashboardPreview({
  estimate,
}: {
  estimate: Estimate;
}) {
  const rent = estimate.suggestedRent;
  const expenses = Math.round((rent * EXPENSE_PCT) / 5) * 5;
  const maintenance = Math.round((rent * MAINTENANCE_PCT) / 5) * 5;
  const net = rent - expenses - maintenance;

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
          Four numbers that tell you everything that matters about your
          rental — projected from the estimate above.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Kpi
          accent
          icon={<DollarSign size={16} />}
          label="Rent (projected)"
          value={`$${rent.toLocaleString()} / mo`}
          sub="Based on suggested market rent"
        />
        <Kpi
          icon={<Receipt size={16} />}
          label="Operating expenses"
          value={`~$${expenses.toLocaleString()} / mo`}
          sub="Management fee + utilities + insurance"
        />
        <Kpi
          icon={<Wrench size={16} />}
          label="Maintenance reserve"
          value={`~$${maintenance.toLocaleString()} / mo`}
          sub="Suggested set-aside for repairs"
        />
        <Kpi
          icon={<Home size={16} />}
          label="Occupancy"
          value="Ready to lease"
          sub="Listing-ready in 24–48 hours"
        />
      </div>

      {/* Net to owner — the bottom line */}
      <div className="mt-6 rounded-2xl bg-slate-900 p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Net to you (projected)
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-white">
              ~${net.toLocaleString()} / mo
            </div>
          </div>
          <div className="text-xs text-slate-400">
            Rent <span className="text-slate-300">${rent.toLocaleString()}</span>
            {" · "}
            Expenses{" "}
            <span className="text-slate-300">
              −${(expenses + maintenance).toLocaleString()}
            </span>
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
              : "bg-white text-brand-700 ring-1 ring-slate-200"
          }`}
        >
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}
