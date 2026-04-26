import { Eye, Phone, Sparkles, Check } from "lucide-react";
import { HOMEOWNER_SERVICES } from "@/lib/content";

// Secondary services line. Visually quieter than the PM section so it
// reads as an add-on vertical, not the main business.
const ICONS = [Eye, Phone, Sparkles];

export default function HomeownerServices() {
  return (
    <section
      id="homeowner-services"
      className="relative bg-slate-900 py-20 sm:py-24"
    >
      {/* Subtle radial highlight in the dark band */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(8_145_178/0.25),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-300">
            Homeowner Services
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Homeowner services for busy Bay Area owners.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Need help while you travel, coordinate repairs, or prepare a home
            for rent or sale? We offer simple homeowner support services backed
            by the same professional operations used in property management.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {HOMEOWNER_SERVICES.map((service, idx) => {
            const Icon = ICONS[idx] ?? Eye;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/30">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-300">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                        <Check size={10} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
          >
            Ask About Homeowner Services
          </a>
        </div>
      </div>
    </section>
  );
}
