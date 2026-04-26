import { Check } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";

// Compact horizontal strip of trust signals. Sits directly below the hero.
export default function TrustBar() {
  return (
    <section aria-label="Trust signals" className="border-y border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-700 sm:justify-between">
          {TRUST_BADGES.map((badge) => (
            <li key={badge} className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Check size={12} />
              </span>
              <span className="font-medium">{badge}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
