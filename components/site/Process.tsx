// Two parallel process tracks side-by-side. Mobile stacks them vertically.
const PM_STEPS = [
  { title: "Property review", description: "We learn your property, goals, and current state." },
  { title: "Management proposal", description: "Clear scope, pricing, and timelines — no surprises." },
  { title: "Smooth onboarding", description: "Documents, vendor handoffs, tenant outreach handled." },
  { title: "Monthly owner reporting", description: "Live dashboard, statements, and proactive updates." },
];

const HS_STEPS = [
  { title: "Request service", description: "Tell us what you need and when." },
  { title: "Scope the need", description: "We confirm details and set expectations." },
  { title: "Coordinate vendors / checks", description: "We schedule, oversee, and verify the work." },
  { title: "Send clear update", description: "Photos, notes, and next steps — in writing." },
];

export default function Process() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            How we work.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Two simple tracks — one for full property management, one for
            on-demand homeowner support.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <ProcessCard title="Property Management" steps={PM_STEPS} />
          <ProcessCard title="Homeowner Services" steps={HS_STEPS} />
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  title,
  steps,
}: {
  title: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft sm:p-8">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <ol className="mt-6 space-y-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            {/* Step number */}
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
              {i + 1}
            </span>
            <div>
              <div className="font-semibold text-slate-900">{step.title}</div>
              <div className="mt-1 text-sm text-slate-600">
                {step.description}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
