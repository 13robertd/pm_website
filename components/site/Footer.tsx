import { BadgeCheck, Building2, Home, ShieldCheck } from "lucide-react";
import { COMPANY_NAME } from "@/lib/content";
import type { LucideIcon } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Property Management", href: "#property-management" },
  { label: "Owner Dashboard", href: "#dashboard" },
  { label: "Rental Analysis", href: "#rental-analysis" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#" },
];

// Professional standards / regulatory reassurance.
//   - CA DRE      → BadgeCheck (credential)
//   - NARPM       → Building2  (residential PM org)
//   - Equal Housing Opportunity → Home + equal-bar via icon
//   - Licensed & Insured → ShieldCheck
// Each is a small pill; the row stays quiet (slate-400/500) so it
// reads as compliance, not promotion. Swap these inline icons for
// real NARPM / EHO SVG assets when available.
const STANDARDS: { label: string; icon: LucideIcon }[] = [
  { label: "CA DRE Lic. # [TBD]", icon: BadgeCheck },
  { label: "NARPM Member", icon: Building2 },
  { label: "Equal Housing Opportunity", icon: Home },
  { label: "Licensed & Insured", icon: ShieldCheck },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-sm"
            />
            <span className="text-base font-semibold text-slate-900">
              {COMPANY_NAME}
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Professional standards row — quiet reassurance, low visual weight */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <ul className="flex flex-wrap items-center gap-2.5">
            {STANDARDS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/60 px-3 py-1 text-[11px] font-medium text-slate-500"
              >
                <Icon size={12} className="text-slate-400" aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </span>
          <span>Modern property management for the Bay Area.</span>
        </div>
      </div>
    </footer>
  );
}
