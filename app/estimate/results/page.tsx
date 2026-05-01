"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import EstimateResults from "@/components/funnel/EstimateResults";
import DashboardPreview from "@/components/funnel/DashboardPreview";
import CTASection from "@/components/funnel/CTASection";
import TrustBadges from "@/components/funnel/TrustBadges";
import {
  ESTIMATE_STORAGE_KEY,
  estimateRent,
  type PropertyInput,
} from "@/lib/rentEstimator";
import { DEMO_PROPERTY } from "@/lib/mockProperties";
import { Lightbulb } from "lucide-react";

// Wrap the inner component in Suspense — useSearchParams requires it
// when prerendering, even on client pages.
export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main id="main-content" className="py-20 text-center text-slate-500">
            Loading your report…
          </main>
          <Footer />
        </>
      }
    >
      <ResultsInner />
    </Suspense>
  );
}

type StoredPayload = PropertyInput & {
  contact: { name: string; email: string; phone: string };
  submittedAt?: string;
};

function ResultsInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "1";

  // null = still checking; false = redirecting; object = ready to render
  const [payload, setPayload] = useState<StoredPayload | null>(null);

  useEffect(() => {
    if (isDemo) {
      setPayload(DEMO_PROPERTY);
      return;
    }
    try {
      const raw = sessionStorage.getItem(ESTIMATE_STORAGE_KEY);
      if (!raw) {
        router.replace("/estimate");
        return;
      }
      setPayload(JSON.parse(raw) as StoredPayload);
    } catch {
      router.replace("/estimate");
    }
  }, [isDemo, router]);

  // useMemo so we don't re-run estimator on every render once payload exists
  const estimate = useMemo(() => {
    if (!payload) return null;
    return estimateRent(payload);
  }, [payload]);

  if (!payload || !estimate) {
    return (
      <>
        <Header />
        <main id="main-content" className="flex min-h-[60vh] items-center justify-center text-sm text-slate-500">
          Generating your report…
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="bg-slate-50/40 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Personalized greeting if we know who they are */}
          {payload.contact?.name && !isDemo && (
            <div className="text-sm text-slate-500">
              Hi {payload.contact.name.split(" ")[0]} — here&apos;s the report
              for your property.
            </div>
          )}

          <EstimateResults input={payload} estimate={estimate} />

          {/* Custom insights — copy varies by property type */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
              <Lightbulb size={14} /> Custom Insights
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              What we noticed about your property.
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700">
              {estimate.insights.map((insight) => (
                <li key={insight} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500"
                  />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </section>

          <DashboardPreview estimate={estimate} />

          <CTASection emailSubject={`${payload.street}, ${payload.city}`} />

          <TrustBadges />
        </div>
      </main>
      <Footer />
    </>
  );
}
