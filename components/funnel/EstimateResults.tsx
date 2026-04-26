import {
  TrendingUp,
  CalendarClock,
  Flame,
  Gauge,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PROPERTY_TYPE_LABELS } from "@/lib/mockProperties";
import type { PropertyInput, Estimate } from "@/lib/rentEstimator";

// Top of results: address, summary, then 5 result cards.
// The map placeholder is rendered as a styled gradient block so we don't
// take a Maps API dependency for the MVP — easy to swap with a real
// embed later.
export default function EstimateResults({
  input,
  estimate,
}: {
  input: PropertyInput;
  estimate: Estimate;
}) {
  return (
    <section>
      {/* Header — address + property summary + map placeholder */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-700">
              <MapPin size={12} /> Your Property Report
            </span>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {input.street}
            </h1>
            <div className="mt-1 text-sm text-slate-600">
              {input.city}, CA {input.zip}
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
              <SummaryStat label="Type" value={PROPERTY_TYPE_LABELS[input.type]} />
              <SummaryStat label="Bedrooms" value={String(input.bedrooms)} />
              <SummaryStat label="Bathrooms" value={String(input.bathrooms)} />
              <SummaryStat label="Sq Ft" value={input.sqft.toLocaleString()} />
            </dl>
          </div>

          {/* Map placeholder — styled gradient with a pin */}
          <div
            aria-hidden
            className="relative hidden h-40 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_60%_40%,rgb(207_250_254/0.9),rgb(241_245_249/0.9))] md:block"
          >
            <div className="absolute inset-0 bg-dots opacity-60" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-slate-200">
                <MapPin size={18} className="text-brand-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1 — Estimated Rent Range (hero card, spans wider on lg) */}
        <ResultCard
          accent
          className="lg:col-span-2"
          icon={<TrendingUp size={16} />}
          label="Estimated Rent Range"
          value={`$${estimate.rentLow.toLocaleString()} – $${estimate.rentHigh.toLocaleString()}`}
          sub="per month, based on comparable South Bay properties"
        />

        {/* 2 — Suggested Market Rent */}
        <ResultCard
          icon={<Gauge size={16} />}
          label="Suggested Market Rent"
          value={`$${estimate.suggestedRent.toLocaleString()} / mo`}
          sub={`≈ $${estimate.annualGrossRent.toLocaleString()} / year gross`}
        />

        {/* 3 — Estimated Days on Market */}
        <ResultCard
          icon={<CalendarClock size={16} />}
          label="Estimated Days on Market"
          value={`${estimate.daysOnMarketLow}–${estimate.daysOnMarketHigh} days`}
          sub="From list to lease, based on demand & status"
        />

        {/* 4 — Demand Score */}
        <ResultCard
          icon={<Flame size={16} />}
          label="Demand Score"
          value={estimate.demandScore}
          sub="Driven by submarket and property type"
        />

        {/* 5 — Management Readiness */}
        <ResultCard
          icon={<Sparkles size={16} />}
          label="Management Readiness"
          value="Strong candidate"
          sub={estimate.readinessText}
        />
      </div>
    </section>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  sub,
  accent = false,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-soft transition-shadow hover:shadow-card ${
        accent
          ? "border-brand-200 bg-brand-50/50"
          : "border-slate-200 bg-white"
      } ${className}`}
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
      <div className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-sm text-slate-600">{sub}</div>
    </div>
  );
}
