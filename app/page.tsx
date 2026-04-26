import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import OwnerOperatorSection from "@/components/site/OwnerOperatorSection";
import Differentiators from "@/components/site/Differentiators";
import Services from "@/components/site/Services";
import DashboardPreview from "@/components/site/DashboardPreview";
import HomeownerServices from "@/components/site/HomeownerServices";
import ServiceAreas from "@/components/site/ServiceAreas";
import LeadForm from "@/components/site/LeadForm";
import Footer from "@/components/site/Footer";

// Homepage section flow:
//
//   Hero            — headline, CTAs, mini dashboard, trust chips
//   TrustBar        — strip of trust badges
//   OwnerOperator   — credibility: built by owners/operators
//   Differentiators — Tech-Friendly / Professional / Fast
//   Services        — 8 outcome-focused PM services
//   DashboardPreview — premium SaaS-style portfolio view
//   HomeownerServices — secondary vertical
//   ServiceAreas    — South Bay markets
//   LeadForm        — request a proposal
//
// Section components are independent — reordering is one line each.
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <OwnerOperatorSection />
        <Differentiators />
        <Services />
        <DashboardPreview />
        <HomeownerServices />
        <ServiceAreas />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
