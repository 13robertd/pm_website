"use client";

import { ArrowLeft, ArrowRight, User } from "lucide-react";

// Step 3: capture the lead before showing results.
// Phone is optional. Email is the canonical identifier.
export type LeadCaptureData = {
  name: string;
  email: string;
  phone: string;
};

export default function LeadCaptureStep({
  initial,
  onSubmit,
  onBack,
  submitting,
}: {
  initial: LeadCaptureData;
  onSubmit: (data: LeadCaptureData) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
        <User size={16} />
        Where should we send your estimate?
      </div>

      <p className="text-sm text-slate-600">
        We&apos;ll generate your free estimate and dashboard preview.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          name="name"
          required
          defaultValue={initial.name}
          placeholder="Alex Owner"
          className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={initial.email}
            placeholder="alex@example.com"
            className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Phone <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={initial.phone}
            placeholder="(408) 555-0142"
            className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <p className="text-xs text-slate-500">
        We&apos;ll never share your info. No spam — just your report.
      </p>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Generating…" : "See My Estimate"}
          {!submitting && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  );
}
