import { Cpu, BadgeCheck, Zap } from "lucide-react";

// Three feature cards reinforcing the brand pillars: tech, professional, fast.
const PILLARS = [
  {
    icon: Cpu,
    title: "Tech-Friendly",
    bullets: [
      "Online owner dashboard",
      "Digital statements",
      "Maintenance visibility",
      "Simple communication",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Professional",
    bullets: [
      "Clear reporting",
      "Documented processes",
      "Reliable vendor coordination",
      "Investor-grade communication",
    ],
  },
  {
    icon: Zap,
    title: "Fast",
    bullets: [
      "Quick owner responses",
      "Same-day maintenance triage",
      "Faster leasing workflows",
      "Organized turnovers",
    ],
  },
];

export default function Differentiators() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built for owners who expect better.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Modern systems, clear communication, and operations you can trust
            with your most valuable asset.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, bullets }) => (
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
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
