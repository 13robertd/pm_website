"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Floating "Get Free Rental Estimate" button. Hidden until the user
// scrolls past the hero (~600px) so it doesn't fight the in-hero CTAs.
// Desktop only — on mobile the sticky header CTA is enough and a
// floating button would overlap thumb zones.
const SHOW_AFTER = 600;

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }
    onScroll(); // set initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="/estimate"
      aria-label="Get Free Rental Estimate"
      className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-card transition-all duration-200 hover:bg-slate-800 md:inline-flex ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      Get Free Rental Estimate
      <ArrowRight size={16} />
    </a>
  );
}
