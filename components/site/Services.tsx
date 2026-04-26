import { ArrowRight } from "lucide-react";
import { PROPERTY_MANAGEMENT_SERVICES } from "@/lib/content";

// Primary services section. Copy here is intentionally outcome-focused —
// the goal is for an owner to scan the cards and immediately see what they
// get out of each service, not just what we do.
export default function Services() {
  return (
    <section id="property-management" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          {/* Left: section intro */}
          <div className="lg:col-span-1">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Property Management
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Maximize occupancy. Protect asset value. Skip the friction.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We run your rental like a modern operation: transparent owner
              reporting, fast communication, and a practical asset management
              mindset on every decision. No paper statements, no vague vendor
              invoices, no waiting days for an answer.
            </p>
            <div className="mt-6">
              <a
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get Free Rental Estimate
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: services grid */}
          <div className="lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {PROPERTY_MANAGEMENT_SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-card"
                >
                  <h3 className="text-base font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
