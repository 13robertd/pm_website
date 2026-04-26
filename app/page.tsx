import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import TrustBar from "@/components/site/TrustBar";
import Differentiators from "@/components/site/Differentiators";
import PropertyManagement from "@/components/site/PropertyManagement";
import DashboardPreview from "@/components/site/DashboardPreview";
import HomeownerServices from "@/components/site/HomeownerServices";
import ServiceAreas from "@/components/site/ServiceAreas";
import Process from "@/components/site/Process";
import LeadForm from "@/components/site/LeadForm";
import Footer from "@/components/site/Footer";

// Homepage: composes every section in the agreed order. Section components
// are kept independent so reordering, swapping, or removing one is trivial.
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Differentiators />
        <PropertyManagement />
        <DashboardPreview />
        <HomeownerServices />
        <ServiceAreas />
        <Process />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
