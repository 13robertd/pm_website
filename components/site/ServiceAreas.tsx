import { MapPin } from "lucide-react";
import {
  PENINSULA_AREAS,
  SOUTH_BAY_AREAS,
  CITY_TAGLINES,
} from "@/lib/content";

// Two-column service area layout: Peninsula on the left, South Bay on
// the right. Each city is a small inner card with the city name and a
// one-line tagline pulled from CITY_TAGLINES (lib/content.ts). Cities
// without a tagline render the city name only.
//
// City names are still rendered as plain text — wrap in <Link> when
// per-city landing pages exist.
export default function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Service Areas
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Peninsula &amp; South Bay specialists.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Local property management for the cities where Bay Area owners
            need careful leasing, responsive maintenance, and clear
            reporting.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <RegionColumn label="Peninsula" cities={PENINSULA_AREAS} />
          <RegionColumn label="South Bay" cities={SOUTH_BAY_AREAS} />
        </div>
      </div>
    </section>
  );
}

function RegionColumn({
  label,
  cities,
}: {
  label: string;
  cities: readonly string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
        <MapPin size={14} />
        {label}
      </div>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cities.map((city) => (
          <li
            key={city}
            className="rounded-xl border border-slate-200/70 bg-white p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/30"
          >
            <div className="text-sm font-semibold text-slate-900">
              {city}
              <span className="ml-1 font-normal text-slate-500">
                property management
              </span>
            </div>
            {CITY_TAGLINES[city] && (
              <div className="mt-1 text-xs leading-relaxed text-slate-600">
                {CITY_TAGLINES[city]}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
