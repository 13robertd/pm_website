import { FOUNDER } from "@/lib/content";

// Compact founder credibility card. Bay Area owners want to know who
// is operating their property. Renders a placeholder portrait (initials
// in a gradient circle) until a real headshot is wired up.
//
// Content lives in lib/content.ts — swap FOUNDER values when the real
// name, photo URL, and DRE license are ready.
export default function FounderNote() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Placeholder portrait — gradient circle with initials.
                Swap to <Image> with a real headshot when available. */}
            <div
              aria-hidden
              className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-200 via-brand-400 to-brand-600 text-xl font-semibold text-white shadow-sm sm:h-24 sm:w-24 sm:text-2xl"
            >
              {FOUNDER.initials}
            </div>

            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                A note from our founder
              </span>
              <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                &ldquo;{FOUNDER.note}&rdquo;
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="font-semibold text-slate-900">
                  {FOUNDER.name}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-600">{FOUNDER.role}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{FOUNDER.license}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
