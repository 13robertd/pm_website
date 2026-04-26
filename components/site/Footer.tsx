import { COMPANY_NAME } from "@/lib/content";

const FOOTER_LINKS = [
  { label: "Property Management", href: "#property-management" },
  { label: "Homeowner Services", href: "#homeowner-services" },
  { label: "Owner Dashboard", href: "#dashboard" },
  { label: "Service Areas", href: "#service-areas" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "#" },
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

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </span>
          <span>Modern property management for the Bay Area.</span>
        </div>
      </div>
    </footer>
  );
}
