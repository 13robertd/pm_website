// Helpers for the per-city service area pages at /areas/[city].
//
// Cities live in lib/content.ts (PENINSULA_AREAS + SOUTH_BAY_AREAS).
// This module turns that list into routable slugs, generates per-city
// FAQ copy on the fly, and exposes a sample-address map used by the
// city Hero's mock dashboard.

import {
  PENINSULA_AREAS,
  SOUTH_BAY_AREAS,
  CITY_TAGLINES,
} from "./content";
import { CITY_BASELINES, FALLBACK_CITY_BASELINE } from "./mockProperties";

// All cities we serve, in a single flat array.
export const ALL_CITIES = [...PENINSULA_AREAS, ...SOUTH_BAY_AREAS] as const;

// "Palo Alto" → "palo-alto"
export function citySlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

// "palo-alto" → "Palo Alto" (or null if unknown)
export function cityFromSlug(slug: string): string | null {
  const match = ALL_CITIES.find((c) => citySlug(c) === slug);
  return match ?? null;
}

// What region a city belongs to — used by breadcrumbs.
export function regionFor(city: string): "Peninsula" | "South Bay" | null {
  if ((PENINSULA_AREAS as readonly string[]).includes(city)) return "Peninsula";
  if ((SOUTH_BAY_AREAS as readonly string[]).includes(city)) return "South Bay";
  return null;
}

// Believable sample addresses used in the mock dashboard on city Hero
// pages. Streets are real for each city; numbers are made up. Falls back
// to "Sample property · {city}" if we add a city without an entry.
const SAMPLE_ADDRESSES: Record<string, string> = {
  // Peninsula
  Hillsborough: "112 Crystal Springs Rd",
  Burlingame: "415 Linden Ave",
  "San Mateo": "1247 Maplewood Dr",
  Belmont: "82 Cipriani Blvd",
  "Redwood City": "1924 Hudson St",
  Atherton: "55 Walnut Ln",
  "Menlo Park": "623 Sand Hill Rd",
  "Palo Alto": "812 Madrona Pl",
  // South Bay
  "Mountain View": "337 Castro St",
  Sunnyvale: "412 Murphy Ave",
  "Santa Clara": "1980 The Alameda",
  Cupertino: "20410 Stevens Creek Blvd",
  "San Jose": "1455 Lincoln Ave",
  Campbell: "212 E Hamilton Ave",
  "Los Gatos": "16 University Ave",
  Milpitas: "1788 Calaveras Blvd",
};

export function sampleAddressFor(city: string): string {
  const street = SAMPLE_ADDRESSES[city];
  return street ? `${street} · ${city}` : `Sample property · ${city}`;
}

// Per-city FAQ — generated from rent baselines + tagline so the
// answers are specific to each city. Mirrored as FAQPage JSON-LD on
// the city page.
export function cityFaqFor(city: string): { question: string; answer: string }[] {
  const baseline =
    CITY_BASELINES[city]?.["single-family"] ??
    FALLBACK_CITY_BASELINE["single-family"]!;
  const tagline = CITY_TAGLINES[city];

  return [
    {
      question: `What rent could my ${city} home earn?`,
      answer: `Single-family rentals in ${city} typically rent between $${baseline.low.toLocaleString()} and $${baseline.high.toLocaleString()} per month, depending on bedrooms, square footage, condition, and exact neighborhood. Bayline can generate a free rental estimate specific to your property in about 60 seconds.`,
    },
    {
      question: `Does Bayline manage rental properties in ${city}?`,
      answer: `Yes — Bayline serves rental owners across ${city}.${
        tagline ? ` ${tagline}` : ""
      } We manage single-family homes, condos, townhomes, duplexes, and small multifamily buildings.`,
    },
    {
      question: `How fast does Bayline lease properties in ${city}?`,
      answer: `Most Bayline-managed listings in ${city} reach lease signing in 14 days or less from the listing date, depending on rent positioning, property condition, and seasonality. We coordinate professional photography, modern listings, fast tours, and digital lease execution.`,
    },
  ];
}

// The full set of slugs — used by generateStaticParams in the
// dynamic route so all 16 cities pre-render at build time.
export function allCitySlugs(): string[] {
  return ALL_CITIES.map(citySlug);
}
