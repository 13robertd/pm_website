"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PROPERTY_TYPES, SERVICE_INTERESTS } from "@/lib/content";

// Lead capture form. For now this just console.logs the payload and shows
// a success state. Wire this up to an API route or Supabase later.
export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // Pull values via FormData — no controlled inputs needed.
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Placeholder: send to backend / Supabase / email service later.
    console.log("Lead submission:", payload);

    // Simulate a quick "thinking" moment for nicer UX, then succeed.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  }

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-brand-50/40 shadow-card">
          <div className="grid lg:grid-cols-5">
            {/* Left: copy */}
            <div className="border-b border-slate-200 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Get a better property management experience.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Tell us about your property. We&apos;ll send a clear proposal
                with pricing, scope, and a fast onboarding plan — usually
                within one business day.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  No obligation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  Real human reply
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brand-600" />
                  Local Bay Area team
                </li>
              </ul>
            </div>

            {/* Right: form / success state */}
            <div className="p-8 lg:col-span-3">
              {submitted ? (
                <SuccessState />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                  <Field
                    label="Property address"
                    name="address"
                    placeholder="123 Main St, Sunnyvale, CA"
                  />

                  <SelectField
                    label="Property type"
                    name="propertyType"
                    options={PROPERTY_TYPES}
                  />
                  <SelectField
                    label="Service interest"
                    name="serviceInterest"
                    options={SERVICE_INTERESTS}
                  />

                  <Field
                    label="Number of units"
                    name="units"
                    type="number"
                    placeholder="1"
                  />
                  <Field
                    label="Best time to reach you"
                    name="bestTime"
                    placeholder="Optional"
                  />

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us a bit about the property and what you need."
                      className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-60 sm:w-auto"
                    >
                      {submitting ? "Sending…" : "Request Proposal"}
                      <ArrowRight size={16} />
                    </button>
                    <p className="mt-3 text-xs text-slate-500">
                      We&apos;ll never share your info. Replies usually within
                      one business day.
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

// Reusable text input field. Keeps form markup tidy and consistent.
function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
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

// Reusable select dropdown driven by a list of string options.
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
          Select an option
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

// Friendly thank-you state shown after submission.
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
        Your request is in. A member of our team will reach out within one
        business day with next steps.
      </p>
    </div>
  );
}
