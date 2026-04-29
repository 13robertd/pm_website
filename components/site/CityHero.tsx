import { ArrowRight, Check } from "lucide-react";
import { TRUST_BADGES, CITY_TAGLINES } from "@/lib/content";
import { sampleAddressFor } from "@/lib/areas";
import {
  CITY_BASELINES,
  FALLBACK_CITY_BASELINE,
} from "@/lib/mockProperties";
import HeroDashboard from "./HeroDashboard";

// Per-city hero. Same visual rhythm as the homepage Hero — eyebrow,
// gradient H1, subhead, two CTAs, trust chips, mini dashboard on the
// right — but with a city-specific H1 ("Property Management in {city}")
// and a subhead that injects the city's single-family rent range and
// tagline so the page proves we know the local market.
export default function CityHero({ city }: { city: string }) {
  const baseline =
    CITY_BASELINES[city]?.["single-family"] ??
    FALLBACK_CITY_BASELINE["single-family"]!;
  const tagline = CITY_TAGLINES[city];
  const address = sampleAddressFor(city);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgb(207_250_254/0.55),transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              {city} Property Management
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.07]">
              Property Management in{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                {city}.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {tagline ? `${tagline} ` : ""}
              Single-family rentals in {city} typically rent between{" "}
              <span className="font-medium text-slate-900">
                ${baseline.low.toLocaleString()}
              </span>{" "}
              and{" "}
              <span className="font-medium text-slate-900">
                ${baseline.high.toLocaleString()}
              </span>{" "}
              per month. Get a free Bayline rental estimate tailored to
              your property.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get Free Rental Estimate
                <ArrowRight size={16} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                Preview Owner Dashboard
              </a>
            </div>

            {/* Same trust chips as the homepage Hero */}
            <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
              {TRUST_BADGES.map((badge) => (
                <li key={badge} className="inline-flex items-center gap-1.5">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>{badge}</span>
                </li>
              ))}
            </ul>
          </div>

          <HeroDashboard address={address} />
        </div>
      </div>
    </section>
  );
}
