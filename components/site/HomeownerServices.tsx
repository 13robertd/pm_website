import { Eye, Phone, Sparkles, Check } from "lucide-react";
import { HOMEOWNER_SERVICES } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/site";

// Secondary services line. Visually quieter than the PM section so it
// reads as an add-on vertical, not the main business. Uses a light gray
// band (not the dark slate band) to keep the page focused on PM.
const ICONS = [Eye, Phone, Sparkles];

export default function HomeownerServices() {
  return (
    <section
      id="homeowner-services"
      className="relative bg-slate-50 py-20 sm:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            Homeowner Services
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Already own a Bay Area home but not ready to rent?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            We help with the in-between — for busy owners, vacant homes,
            frequent travelers, and owners preparing a property for rent or
            sale.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {HOMEOWNER_SERVICES.map((service, idx) => {
            const Icon = ICONS[idx] ?? Eye;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brand-100 text-brand-700">
                        <Check size={10} strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Homeowner%20Services%20Inquiry`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Talk to a homeowner services advisor
          </a>
          <a
            href="/estimate"
            className="text-sm font-medium text-slate-700 underline-offset-4 transition-colors hover:text-slate-900 hover:underline"
          >
            Or get a rental estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
