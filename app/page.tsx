import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import AnswerSection from "@/components/site/AnswerSection";
import OwnerOperatorSection from "@/components/site/OwnerOperatorSection";
import ComparisonTable from "@/components/site/ComparisonTable";
import Services from "@/components/site/Services";
import DashboardPreview from "@/components/site/DashboardPreview";
import HomeownerServices from "@/components/site/HomeownerServices";
import ServiceAreas from "@/components/site/ServiceAreas";
import RentalAnalysisForm from "@/components/site/RentalAnalysisForm";
import Footer from "@/components/site/Footer";
import {
  COMPANY_NAME,
  FAQ_ITEMS,
  PENINSULA_AREAS,
  SOUTH_BAY_AREAS,
} from "@/lib/content";

// Site URL — keep in sync with metadataBase in app/layout.tsx so the
// JSON-LD `url` field matches the canonical for crawlers / LLMs.
const SITE_URL = "https://pm-website-lemon.vercel.app";

// Schema.org structured data:
//   1) RealEstateAgent — primary entity, includes service catalog and
//      areaServed array (Peninsula + South Bay cities).
//   2) FAQPage — mirrors AnswerSection so search + AI assistants can
//      surface the answers directly.
// Placeholders ([TBD]) are intentional and called out in the summary.
const realEstateAgentLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY_NAME,
  url: SITE_URL,
  description:
    "Modern property management for Peninsula and South Bay homeowners — leasing, maintenance coordination, owner reporting, rental analysis, and a transparent owner dashboard.",
  // Replace with a hosted logo image when one exists.
  // image: `${SITE_URL}/logo.png`,
  telephone: "[TBD]",
  email: "[TBD]",
  // CA DRE Broker License number — placeholder until issued.
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "California DRE Broker License",
    identifier: "[TBD]",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
    addressLocality: "Peninsula / South Bay",
  },
  areaServed: [...PENINSULA_AREAS, ...SOUTH_BAY_AREAS].map((city) => ({
    "@type": "City",
    name: city,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "San Francisco Bay Area, California",
    },
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Property Management Services",
    itemListElement: [
      "Residential Property Management",
      "Small Multifamily Management",
      "Leasing & Tenant Placement",
      "Maintenance Coordination",
      "Turnover Management",
      "Rent Collection",
      "Owner Reporting",
      "Vendor Oversight",
      "Rental Analysis",
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// Homepage section flow (top → bottom):
//
//   Hero             — headline, CTAs, mini dashboard, trust chips
//   TrustBar         — strip of trust badges
//   AnswerSection    — AI-friendly Q&A, mirrors FAQPage JSON-LD
//   OwnerOperator    — credibility: built by owners/operators
//   ComparisonTable  — Industry Standard vs. Bayline
//   Services         — 8 outcome-focused PM services
//   DashboardPreview — premium SaaS-style portfolio view
//   HomeownerServices — secondary vertical
//   ServiceAreas     — Peninsula + South Bay two-column list
//   RentalAnalysisForm — inline lead capture (#rental-analysis, #contact)
//
// Section components are independent — reordering is one line each.
export default function HomePage() {
  return (
    <>
      {/* Structured data for SEO + AI surfaces. Two scripts kept as
          siblings rather than @graph so each can be edited independently. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <Header />
      <main>
        <Hero />
        <TrustBar />
        <AnswerSection />
        <OwnerOperatorSection />
        <ComparisonTable />
        <Services />
        <DashboardPreview />
        <HomeownerServices />
        <ServiceAreas />
        <RentalAnalysisForm />
      </main>
      <Footer />
    </>
  );
}
