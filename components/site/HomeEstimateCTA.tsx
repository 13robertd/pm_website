import { ArrowRight } from "lucide-react";

// Replaces the old LeadForm at the bottom of the homepage.
// One job: route the visitor into the /estimate funnel where they can
// give us real qualifying info instead of a freeform message.
export default function HomeEstimateCTA() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-brand-50/40 p-8 shadow-card sm:p-12">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Curious what your property could rent for?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Get a free rental estimate, demand signals, and a preview of
                the owner dashboard you&apos;d see if we managed your property.
                No phone tag, no hard sell.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                <li>· About 60 seconds</li>
                <li>· No obligation</li>
                <li>· Real human follow-up</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href="/estimate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get Free Rental Estimate
                <ArrowRight size={16} />
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
              >
                Preview Owner Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
