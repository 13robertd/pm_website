import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ALL_CITIES, citySlug } from "@/lib/areas";

// Custom 404. Reuses the site Header + Footer so users don't feel
// like they fell off the map. Below the apology we surface the two
// likely intents:
//   1. Get back to the homepage.
//   2. Find a service-area page they were probably looking for.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            404 · Page not found
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            The link may be old or mistyped. Try heading back home, or jump
            straight to one of our service areas below.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              <Home size={16} />
              Back to home
            </Link>
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Get Free Rental Estimate
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Service area list — gives the visitor a real way out */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-soft sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Service Areas
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-4">
              {ALL_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/areas/${citySlug(city)}`}
                    className="text-slate-700 transition-colors hover:text-brand-700"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
