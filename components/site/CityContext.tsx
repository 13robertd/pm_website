import { CITY_TAGLINES } from "@/lib/content";
import {
  CITY_BASELINES,
  FALLBACK_CITY_BASELINE,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
} from "@/lib/mockProperties";
import { regionFor } from "@/lib/areas";

// Local-knowledge section. Lives between the per-city FAQ and the
// homepage Comparison/Services blocks. Shows rent baselines by
// property type for the current city in a simple bordered table.
//
// Per-unit types ("small-multifamily", "apartment") are clearly
// labeled "/ unit" so the number is read correctly.
const TYPE_ORDER: PropertyType[] = [
  "single-family",
  "condo",
  "duplex",
  "small-multifamily",
  "apartment",
];

const PER_UNIT_TYPES: PropertyType[] = ["small-multifamily", "apartment"];

export default function CityContext({ city }: { city: string }) {
  const cityBaseline = CITY_BASELINES[city] ?? FALLBACK_CITY_BASELINE;
  const tagline = CITY_TAGLINES[city];
  const region = regionFor(city);

  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Left: copy */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Rental ranges in {city}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              What we know about the {city} market.
            </h2>
            {tagline && (
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {tagline}
              </p>
            )}
            <p className="mt-4 text-sm text-slate-500">
              {region ? `${region} · ` : ""}Numbers below are directional —
              get a free Bayline estimate for a number specific to your
              property.
            </p>
            <div className="mt-6">
              <a
                href="/estimate"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get an estimate for your {city} property
              </a>
            </div>
          </div>

          {/* Right: rent table */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <div className="hidden grid-cols-2 border-b border-slate-200 bg-slate-50/60 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
                <div>Property type</div>
                <div className="text-right">Typical monthly rent</div>
              </div>
              <ul className="divide-y divide-slate-100">
                {TYPE_ORDER.map((type) => {
                  const range =
                    cityBaseline[type] ?? FALLBACK_CITY_BASELINE[type];
                  if (!range) return null;
                  const perUnit = PER_UNIT_TYPES.includes(type);
                  return (
                    <li
                      key={type}
                      className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-2 sm:items-center sm:gap-0"
                    >
                      <div className="text-sm font-medium text-slate-900">
                        {PROPERTY_TYPE_LABELS[type]}
                      </div>
                      <div className="text-sm text-slate-700 sm:text-right">
                        ${range.low.toLocaleString()} – $
                        {range.high.toLocaleString()}
                        {perUnit && (
                          <span className="text-slate-500"> / unit</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
