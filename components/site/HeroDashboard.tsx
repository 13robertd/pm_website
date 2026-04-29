import { Home, DollarSign, Receipt, Wrench } from "lucide-react";

// Single-property mini dashboard used inside Hero (homepage) and
// CityHero (per-city pages). Four numbers an SFH owner actually
// checks every month: rent in, expenses, maintenance, occupancy —
// plus a "Net to you" bottom line.
//
// The address shown in the window-chrome row is the only thing that
// varies between contexts, so it's a prop with a sensible default.
export default function HeroDashboard({
  address = "812 Madrona Pl · Palo Alto",
}: {
  address?: string;
}) {
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
          <span className="text-xs font-medium text-slate-500">{address}</span>
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
