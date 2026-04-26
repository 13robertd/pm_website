import { Check } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";

// Compact trust badges for the results page.
// Same source of truth as the homepage TrustBar so messaging stays
// consistent between the marketing page and the funnel.
export default function TrustBadges() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/60 px-6 py-5">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-700 sm:justify-between">
        {TRUST_BADGES.map((badge) => (
          <li key={badge} className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="font-medium">{badge}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
