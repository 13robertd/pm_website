import { FAQ_ITEMS } from "@/lib/content";

// AI-friendly Q&A section. Sits high in the page so LLM-style search
// (Perplexity, Gemini, ChatGPT browsing) can pull a clean answer
// without scraping marketing copy first. The same FAQ_ITEMS array is
// emitted as FAQPage JSON-LD on the homepage — keep them in sync by
// editing one place: lib/content.ts.
export default function AnswerSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Quick Answers
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Property management built for owners who want clarity.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {FAQ_ITEMS.map((item) => (
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
