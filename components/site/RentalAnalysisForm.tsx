"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/content";

// Inline rental-analysis lead form on the homepage.
// Lower-friction alternative to the multi-step /estimate funnel —
// this captures a lead in a single submit so SEO traffic landing on
// the homepage can convert without leaving the page.
export default function RentalAnalysisForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    // Placeholder — wire to /api/leads or Supabase later.
    console.log("Rental analysis lead:", payload);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  }

  return (
    <section
      id="rental-analysis"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-brand-50/40 shadow-card">
          <div className="grid lg:grid-cols-5">
            {/* Left: copy */}
            <div className="border-b border-slate-200 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Get a free rental estimate for your Peninsula or South Bay
                property.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Tell us the property address and a few details. We&apos;ll
                provide a rental range, local demand signals, and a preview
                of how your property would appear inside the Bayline owner
                dashboard.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  Free, no obligation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  Real human follow-up
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  Peninsula &amp; South Bay local team
                </li>
              </ul>
            </div>

            {/* Right: form / success state */}
            <div id="contact" className="p-8 lg:col-span-3">
              {submitted ? (
                <SuccessState />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Field
                    className="sm:col-span-2"
                    label="Property address"
                    name="address"
                    required
                    placeholder="123 Main St, Palo Alto, CA 94301"
                  />

                  <SelectField
                    label="Property type"
                    name="propertyType"
                    options={PROPERTY_TYPES}
                  />
                  <Field
                    label="Current rent (optional)"
                    name="currentRent"
                    type="number"
                    placeholder="$"
                  />

                  <Field
                    label="Bedrooms"
                    name="bedrooms"
                    type="number"
                    required
                    placeholder="3"
                  />
                  <Field
                    label="Bathrooms"
                    name="bathrooms"
                    type="number"
                    required
                    placeholder="2"
                  />

                  <Field
                    className="sm:col-span-2"
                    label="Owner name"
                    name="name"
                    required
                  />

                  <Field label="Email" name="email" type="email" required />
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                  />

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
                    >
                      {submitting ? "Sending…" : "Request My Rental Analysis"}
                      <ArrowRight size={16} />
                    </button>
                    <p className="mt-3 text-xs text-slate-500">
                      No obligation. No hard sell. Real human follow-up.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable input field. `className` lets a single field span both columns.
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <option value="" disabled>
          Select a type
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <CheckCircle2 size={24} />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">
        Thanks — we&apos;ll be in touch.
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">
        Your rental analysis request is in. A member of our team will reach
        out within one business day.
      </p>
    </div>
  );
}
