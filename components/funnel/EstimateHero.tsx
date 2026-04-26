// Top of the /estimate page. Renders headline + a subtle progress
// indicator so the user can see how far they are through the flow.
export default function EstimateHero({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
        Free Rental Estimate
      </span>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        See what your property could rent for.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Three quick questions. Then we&apos;ll show you a rent range, demand
        signals, and a preview of the owner dashboard.
      </p>

      {/* Step indicator — segmented bar + caption */}
      <div className="mt-8">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < step ? "bg-brand-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Step {step} of {totalSteps}
        </div>
      </div>
    </div>
  );
}
