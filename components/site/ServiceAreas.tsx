import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/content";

// Simple grid of city tiles. Adding/removing a market is a one-line
// change in lib/content.ts.
export default function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Service Areas
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            South Bay specialists.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Local expertise across the cities where your property sits — and
            where your tenants want to live.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICE_AREAS.map((city) => (
            <div
              key={city}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-shadow hover:shadow-card"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <MapPin size={16} />
              </span>
              <span className="font-medium text-slate-900">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
