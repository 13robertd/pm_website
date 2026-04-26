import { Cpu, BadgeCheck, Zap } from "lucide-react";

// Three feature cards reinforcing the brand pillars: tech, professional, fast.
// Copy is written as full sentences (not bullets) so each card reads like
// a clear promise rather than a feature checklist.
const PILLARS = [
  {
    icon: Cpu,
    title: "Tech-Friendly",
    copy: "Digital reporting, online approvals, maintenance visibility, and simple communication so owners always know what is happening.",
  },
  {
    icon: BadgeCheck,
    title: "Professional",
    copy: "Clear processes, polished communication, reliable vendors, and owner-ready reporting without the old-school friction.",
  },
  {
    icon: Zap,
    title: "Fast",
    copy: "Quick owner responses, faster leasing follow-up, same-day maintenance triage, and organized turnovers.",
  },
];

export default function Differentiators() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Why we&apos;re different
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built for owners who expect better.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Modern systems, clear communication, and operations you can trust
            with your most valuable asset.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-shadow hover:shadow-card"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
