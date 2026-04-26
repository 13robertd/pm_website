import { X, Check } from "lucide-react";

// Two-column "Industry Standard vs. Bayline" comparison.
// Minimalist border-grid: no fills, just dividers. Stacks on mobile so
// each row reads as a labeled pair instead of a cramped two-column squeeze.
const ROWS = [
  {
    standard: "Vague monthly invoices",
    bayline: "Line-item digital transparency",
  },
  {
    standard: "Quarterly PDF reports",
    bayline: "Real-time asset dashboard",
  },
  {
    standard: "Reactive maintenance",
    bayline: "Proactive asset preservation",
  },
  {
    standard: "Generic tenant screening",
    bayline: "Income + reference + background verification",
  },
];

export default function ComparisonTable() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The Industry Standard vs. Bayline.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A side-by-side look at how modern operations differ from the way
            most property managers still work.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200">
          {/* Header row — desktop only. On mobile each row carries its own
              labels so headers would be redundant. */}
          <div
            role="row"
            className="hidden grid-cols-2 border-b border-slate-200 bg-slate-50/60 sm:grid"
          >
            <div className="border-r border-slate-200 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Industry Standard
            </div>
            <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-700">
              Bayline
            </div>
          </div>

          {/* Body rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.standard}
              role="row"
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                i > 0 ? "border-t border-slate-200" : ""
              }`}
            >
              {/* Industry Standard cell */}
              <div className="flex items-start gap-3 border-b border-slate-200 px-6 py-5 sm:border-b-0 sm:border-r">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-400"
                >
                  <X size={12} strokeWidth={3} />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:hidden">
                    Industry Standard
                  </div>
                  <div className="mt-0.5 text-sm leading-relaxed text-slate-500 sm:mt-0">
                    {row.standard}
                  </div>
                </div>
              </div>

              {/* Bayline cell */}
              <div className="flex items-start gap-3 px-6 py-5">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-brand-700 sm:hidden">
                    Bayline
                  </div>
                  <div className="mt-0.5 text-sm font-medium leading-relaxed text-slate-900 sm:mt-0">
                    {row.bayline}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
