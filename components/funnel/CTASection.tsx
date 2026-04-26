import { ArrowRight, Calendar, Scale } from "lucide-react";

// Strong CTA on the results page. Three buttons of decreasing intent:
// management proposal (high), book consult (medium), compare to current
// manager (lower commitment but still a real conversation).
//
// `mailto:` is used for now so leads route to a human inbox without any
// backend wiring. Swap to a route handler / Calendly link later.
export default function CTASection({
  emailSubject = "Property management inquiry",
}: {
  emailSubject?: string;
}) {
  const subject = encodeURIComponent(emailSubject);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-brand-50/40 p-6 shadow-soft sm:p-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Want us to manage this property?
        </h2>
        <p className="mt-3 text-base text-slate-600">
          We&apos;ll review your property in detail and respond with a clear
          next-step plan — usually within one business day.
        </p>
      </div>

      <div className="mx-auto mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={`mailto:hello@bayline.example?subject=${subject}%20-%20Management%20Proposal`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Request Management Proposal
          <ArrowRight size={16} />
        </a>
        <a
          href={`mailto:hello@bayline.example?subject=${subject}%20-%20Book%20Consultation`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          <Calendar size={16} />
          Book Consultation
        </a>
        <a
          href={`mailto:hello@bayline.example?subject=${subject}%20-%20Compare%20to%20Current%20Manager`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          <Scale size={16} />
          Compare to Current Manager
        </a>
      </div>
    </section>
  );
}
