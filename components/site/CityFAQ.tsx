import { cityFaqFor } from "@/lib/areas";

// Per-city Q&A section. Same visual treatment as the homepage
// AnswerSection but with city-localized questions and answers
// generated from rent baselines + tagline (lib/areas.ts).
//
// The exact same items are emitted as FAQPage JSON-LD on the city
// page so structured data matches what's on screen.
export default function CityFAQ({ city }: { city: string }) {
  const items = cityFaqFor(city);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {city} Property Management FAQ
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Common questions from {city} owners.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
