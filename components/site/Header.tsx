"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY_NAME, NAV_LINKS } from "@/lib/content";

// Sticky top navigation. Uses a translucent background with a subtle
// border so content scrolls cleanly under it. Mobile uses a slide-down menu.
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / brand mark */}
        <a href="#top" className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 shadow-sm"
          />
          <span className="text-base font-semibold tracking-tight text-slate-900">
            {COMPANY_NAME}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Get Proposal
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Get Proposal
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
