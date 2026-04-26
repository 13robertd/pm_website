// Rent estimator — pure function, mock logic for MVP.
// Intentionally simple so it's easy to swap with real comp data later.
// Inputs come from the /estimate flow; outputs feed /estimate/results.

import {
  CITY_BASELINES,
  FALLBACK_CITY_BASELINE,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
  type PropertyStatus,
} from "./mockProperties";

export type PropertyInput = {
  street: string;
  city: string;
  zip: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  units: number;
  status: PropertyStatus;
};

export type DemandScore = "Strong" | "High" | "Moderate";

export type Estimate = {
  rentLow: number;
  rentHigh: number;
  suggestedRent: number;
  daysOnMarketLow: number;
  daysOnMarketHigh: number;
  demandScore: DemandScore;
  readinessText: string;
  insights: string[];
  // Annual gross rent for convenience in copy / cards
  annualGrossRent: number;
};

// Bedroom multiplier — smaller homes rent at lower per-month rates than
// the city baseline, larger ones rent above. Tuned to feel reasonable.
function bedroomMultiplier(bedrooms: number): number {
  if (bedrooms <= 1) return 0.78;
  if (bedrooms === 2) return 0.9;
  if (bedrooms === 3) return 1.0;
  if (bedrooms === 4) return 1.12;
  return 1.22; // 5+
}

// Square footage adds a gentle nudge — properties significantly larger
// than the typical for the bedroom count rent for a bit more.
function sqftAdjustment(sqft: number, bedrooms: number): number {
  const expected = 600 + bedrooms * 350; // rough expected sqft
  if (sqft <= 0) return 1;
  const ratio = sqft / expected;
  // Cap the adjustment to ±8% so a single big number can't swing the result wildly
  const clamped = Math.max(0.92, Math.min(1.08, ratio * 0.5 + 0.5));
  return clamped;
}

// Round to a clean $25 increment for nicer-looking numbers in the UI.
function roundTo25(n: number): number {
  return Math.round(n / 25) * 25;
}

// Days on market: vacant properties are ready immediately, occupied
// properties need lead time for turnover. Demand on the high end shortens
// the window; lower demand widens it.
function daysOnMarket(
  status: PropertyStatus,
  demand: DemandScore
): { low: number; high: number } {
  const base =
    demand === "Strong"
      ? { low: 8, high: 16 }
      : demand === "High"
      ? { low: 12, high: 21 }
      : { low: 18, high: 30 };

  if (status === "tenant-occupied" || status === "owner-occupied") {
    return { low: base.low + 7, high: base.high + 14 };
  }
  return base;
}

// Demand is currently a function of city + property type — easy to swap
// for real signals (search volume, comp velocity, etc.) later.
function demandFor(city: string, type: PropertyType): DemandScore {
  const hot = ["Sunnyvale", "Mountain View", "Cupertino", "Los Gatos"];
  if (hot.includes(city) && type === "single-family") return "Strong";
  if (hot.includes(city)) return "High";
  if (type === "small-multifamily" || type === "apartment") return "High";
  return "Moderate";
}

// Readiness reads more like a recommendation than a score; it's
// directional copy a human writer would say to an owner.
function readinessTextFor(input: PropertyInput, demand: DemandScore): string {
  if (input.status === "considering-purchase") {
    return "Good candidate — we can model expected returns before you close.";
  }
  if (input.units > 1 || input.type === "small-multifamily" || input.type === "apartment") {
    return "Strong candidate for professional management — multi-unit operations benefit most from systems.";
  }
  if (demand === "Strong") {
    return "Strong candidate for professional management — pricing and marketing matter at this level.";
  }
  if (input.status === "vacant") {
    return "Good candidate — fast leasing process should minimize vacancy days.";
  }
  return "Solid candidate — modern reporting and maintenance coordination would help here.";
}

// Tailored insight bullets shown on the results page. Kept short so the
// section reads like an analyst's note, not generic marketing copy.
function insightsFor(input: PropertyInput, est: Pick<Estimate, "annualGrossRent">): string[] {
  const insights: string[] = [];
  const isMulti =
    input.type === "small-multifamily" ||
    input.type === "apartment" ||
    input.units > 1;

  if (isMulti) {
    insights.push(`Rent per unit appears in line with submarket comps.`);
    insights.push(
      `Occupancy trends in ${input.city} remain strong for well-managed multifamily.`
    );
    insights.push(
      `Centralized dashboard reporting can improve visibility across all ${input.units} units.`
    );
  } else {
    insights.push(
      `Similar ${PROPERTY_TYPE_LABELS[input.type].toLowerCase()}s in ${input.city} are leasing quickly.`
    );
    insights.push(
      `Professional photos and a sharp pricing strategy could shorten time to lease.`
    );
    insights.push(
      `Estimated annual gross rent: $${est.annualGrossRent.toLocaleString()}.`
    );
  }

  if (input.status === "tenant-occupied") {
    insights.push(
      `Property is currently occupied — rent positioning can be revisited at next lease cycle.`
    );
  }
  if (input.status === "considering-purchase") {
    insights.push(
      `Pre-purchase: we can pull comps and project NOI before close.`
    );
  }
  return insights;
}

export function estimateRent(input: PropertyInput): Estimate {
  const cityBaseline =
    CITY_BASELINES[input.city] ?? FALLBACK_CITY_BASELINE;
  const baseline =
    cityBaseline[input.type] ??
    FALLBACK_CITY_BASELINE[input.type] ??
    FALLBACK_CITY_BASELINE["single-family"]!;

  const bedMult = bedroomMultiplier(input.bedrooms);
  const sqftMult = sqftAdjustment(input.sqft, input.bedrooms);

  // For per-unit types, the baseline is per unit; multiply by unit count
  const isPerUnit =
    input.type === "small-multifamily" || input.type === "apartment";
  const unitMult = isPerUnit ? Math.max(1, input.units) : 1;

  // For per-unit baselines, bedroom multiplier doesn't apply at the
  // building level — rent is driven by unit mix, not bed count entered.
  const lowRaw =
    baseline.low * (isPerUnit ? 1 : bedMult) * sqftMult * unitMult;
  const highRaw =
    baseline.high * (isPerUnit ? 1 : bedMult) * sqftMult * unitMult;

  const rentLow = roundTo25(lowRaw);
  const rentHigh = roundTo25(highRaw);
  const suggestedRent = roundTo25((lowRaw + highRaw) / 2);

  const demand = demandFor(input.city, input.type);
  const dom = daysOnMarket(input.status, demand);
  const annualGrossRent = suggestedRent * 12;

  const readinessText = readinessTextFor(input, demand);
  const insights = insightsFor(input, { annualGrossRent });

  return {
    rentLow,
    rentHigh,
    suggestedRent,
    daysOnMarketLow: dom.low,
    daysOnMarketHigh: dom.high,
    demandScore: demand,
    readinessText,
    insights,
    annualGrossRent,
  };
}

// Keys used in sessionStorage to ferry data from /estimate to results.
export const ESTIMATE_STORAGE_KEY = "bayline_estimate_input";
