import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Header from "@/components/site/Header";
import CityHero from "@/components/site/CityHero";
import StatsStrip from "@/components/site/StatsStrip";
import CityFAQ from "@/components/site/CityFAQ";
import CityContext from "@/components/site/CityContext";
import ComparisonTable from "@/components/site/ComparisonTable";
import Services from "@/components/site/Services";
import DashboardPreview from "@/components/site/DashboardPreview";
import ServiceAreas from "@/components/site/ServiceAreas";
import RentalAnalysisForm from "@/components/site/RentalAnalysisForm";
import FloatingCTA from "@/components/site/FloatingCTA";
import Footer from "@/components/site/Footer";

import {
  allCitySlugs,
  cityFaqFor,
  cityFromSlug,
  regionFor,
  sampleAddressFor,
} from "@/lib/areas";
import { COMPANY_NAME, CITY_TAGLINES } from "@/lib/content";
import {
  CITY_BASELINES,
  FALLBACK_CITY_BASELINE,
} from "@/lib/mockProperties";
import { SITE_URL } from "@/lib/site";

// Prerender all 16 city pages at build time → static HTML for each.
// Adding a city to PENINSULA_AREAS or SOUTH_BAY_AREAS automatically
// adds a new prerendered route on the next build.
export function generateStaticParams() {
  return allCitySlugs().map((city) => ({ city }));
}

// Per-city metadata. Title leads with the city name + the keyword
// phrase ("Property Management") so SERP scanning is fast. Description
// stays under ~160 chars and namesthe city + service areas.
export async function generateMetadata(
  props: { params: Promise<{ city: string }> }
): Promise<Metadata> {
  const { city: slug } = await props.params;
  const city = cityFromSlug(slug);
  if (!city) return { title: "Not Found" };

  const tagline = CITY_TAGLINES[city];
  const description = tagline
    ? `${tagline} Bayline provides modern property management for ${city} rental owners — leasing, maintenance, owner reporting, and a transparent dashboard.`
    : `Bayline provides modern property management for ${city} rental owners — leasing, maintenance coordination, owner reporting, and rental analysis.`;

  const url = `${SITE_URL}/areas/${slug}`;
  const title = `${city} Property Management | Bayline Property Co.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: COMPANY_NAME,
      title: `${city} Property Management — Bayline Property Co.`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${city} Property Management`,
      description,
    },
  };
}

export default async function CityPage(
  props: { params: Promise<{ city: string }> }
) {
  const { city: slug } = await props.params;
  const city = cityFromSlug(slug);
  if (!city) notFound();

  const region = regionFor(city);
  const baseline =
    CITY_BASELINES[city]?.["single-family"] ??
    FALLBACK_CITY_BASELINE["single-family"]!;

  const url = `${SITE_URL}/areas/${slug}`;

  // Per-city RealEstateAgent — same shape as the homepage version but
  // with `areaServed` narrowed to the single city, plus a city-specific
  // service offer name.
  const realEstateAgentLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${url}#organization`,
    name: COMPANY_NAME,
    url,
    description: `Bayline provides modern property management for ${city} rental owners.`,
    telephone: "[TBD]",
    email: "[TBD]",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "California DRE Broker License",
      identifier: "[TBD]",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region
          ? `${region}, San Francisco Bay Area, California`
          : "San Francisco Bay Area, California",
      },
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${city} Property Management`,
        description: `Residential and small multifamily property management in ${city}, California — leasing, maintenance, owner reporting, and rental analysis.`,
        areaServed: { "@type": "City", name: city },
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: baseline.low,
        maxPrice: baseline.high,
        // Reference rent range for context — not the management fee.
        description: `Typical monthly rent for single-family homes in ${city}`,
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityFaqFor(city).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  // Breadcrumb helps Google show "Home > Service Areas > Palo Alto"
  // in SERP and gives users a clear path back.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE_URL}/#service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Header />
      <main id="main-content">
        <CityHero city={city} />

        {/* Visible breadcrumb — quiet, slate text */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:px-8"
        >
          <ol className="flex items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-slate-700"
              >
                Home
              </Link>
            </li>
            <ChevronRight size={12} className="text-slate-400" aria-hidden />
            <li>
              <Link
                href="/#service-areas"
                className="transition-colors hover:text-slate-700"
              >
                Service Areas
              </Link>
            </li>
            <ChevronRight size={12} className="text-slate-400" aria-hidden />
            <li className="font-medium text-slate-700">{city}</li>
          </ol>
        </nav>

        <StatsStrip />
        <CityContext city={city} />
        <CityFAQ city={city} />
        <ComparisonTable />
        <Services />
        <DashboardPreview address={sampleAddressFor(city)} />
        <ServiceAreas />
        <RentalAnalysisForm />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
