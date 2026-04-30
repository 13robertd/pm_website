"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import EstimateHero from "@/components/funnel/EstimateHero";
import AddressStep, {
  type AddressData,
} from "@/components/funnel/AddressStep";
import PropertyDetailsStep, {
  type PropertyDetailsData,
} from "@/components/funnel/PropertyDetailsStep";
import LeadCaptureStep, {
  type LeadCaptureData,
} from "@/components/funnel/LeadCaptureStep";
import { ESTIMATE_STORAGE_KEY } from "@/lib/rentEstimator";

// 3-step rental estimate flow.
//
// Why a single client component owns all the state:
//  - Each step is small; passing props down is cheaper than wiring a
//    context or a separate route per step.
//  - "Back" preserves what the user already entered without juggling URLs.
//
// Final submit writes the full payload to sessionStorage and navigates
// to /estimate/results, where the estimator runs and the report renders.
export default function EstimatePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);

  const [address, setAddress] = useState<AddressData>({
    street: "",
    city: "",
    zip: "",
  });
  const [details, setDetails] = useState<PropertyDetailsData>({
    type: "single-family",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1500,
    units: 1,
    status: "vacant",
  });
  const [contact, setContact] = useState<LeadCaptureData>({
    name: "",
    email: "",
    phone: "",
  });

  function handleAddressSubmit(data: AddressData) {
    setAddress(data);
    setStep(2);
    // Scroll to top of the card for tall mobile layouts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDetailsSubmit(data: PropertyDetailsData) {
    setDetails(data);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleLeadSubmit(data: LeadCaptureData) {
    setContact(data);
    setSubmitting(true);

    const payload = {
      ...address,
      ...details,
      contact: data,
      submittedAt: new Date().toISOString(),
    };

    // Save to sessionStorage first so the results page always has data,
    // even if the API call fails. The user earned their report.
    try {
      sessionStorage.setItem(ESTIMATE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // sessionStorage can fail in private mode; the results page handles it
    }

    // Fire-and-await the API call. Errors are logged but don't block
    // navigation — losing a server-side notification shouldn't ruin the
    // user's experience after they completed three steps.
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "estimate_funnel", ...payload }),
      });
    } catch (err) {
      console.error("Lead submission failed:", err);
    }

    router.push("/estimate/results");
  }

  return (
    <>
      <Header />
      <main className="bg-slate-50/40 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <EstimateHero step={step} totalSteps={3} />

          {/* Card containing the active step */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            {step === 1 && (
              <AddressStep initial={address} onSubmit={handleAddressSubmit} />
            )}
            {step === 2 && (
              <PropertyDetailsStep
                initial={details}
                onSubmit={handleDetailsSubmit}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <LeadCaptureStep
                initial={contact}
                onSubmit={handleLeadSubmit}
                onBack={() => setStep(2)}
                submitting={submitting}
              />
            )}
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Free, no obligation. Takes about 60 seconds.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
