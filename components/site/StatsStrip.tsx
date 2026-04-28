import { HOMEPAGE_STATS } from "@/lib/content";

// Compact "numbers" strip — sits between TrustBar and AnswerSection.
// Same visual vocabulary as the rest of the site (slate borders,
// rounded-2xl, soft shadow) so it reads as an extension of the trust
// row above, not a separate marketing section.
export default function StatsStrip() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HOMEPAGE_STATS.map((stat) => (
            <li
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
            >
              <div className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal sm:font-normal">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
