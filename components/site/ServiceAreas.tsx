import { MapPin } from "lucide-react";
import { PENINSULA_AREAS, SOUTH_BAY_AREAS } from "@/lib/content";

// Two-column service area layout: Peninsula on the left, South Bay on
// the right. City names are rendered as plain text inside <span> tags
// — they're ready to upgrade to <Link href={`/areas/${slug}`}> when
// city-level landing pages are built.
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
      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-2">
        {cities.map((city) => (
          <li key={city}>
            {/* Plain text for now — easy to swap for <Link> later when
                per-city landing pages exist. */}
            <span className="font-medium text-slate-900">{city}</span>
            <span className="ml-1 text-slate-500">property management</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
