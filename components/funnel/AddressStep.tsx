"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/content";

// Step 1: collect the property address.
// City is a select biased toward our service areas (any other city falls
// to a free-text "Other" option). Street + ZIP are free text.
export type AddressData = {
  street: string;
  city: string;
  zip: string;
};

export default function AddressStep({
  initial,
  onSubmit,
}: {
  initial: AddressData;
  onSubmit: (data: AddressData) => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      street: String(fd.get("street") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      zip: String(fd.get("zip") ?? "").trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
        <MapPin size={16} />
        Property Address
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Street address
        </label>
        <input
          name="street"
          required
          defaultValue={initial.street}
          placeholder="123 Main St"
          className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            City
          </label>
          <select
            name="city"
            required
            defaultValue={initial.city}
            className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="" disabled>
              Select a city
            </option>
            {SERVICE_AREAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Other">Other Bay Area city</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            ZIP
          </label>
          <input
            name="zip"
            required
            defaultValue={initial.zip}
            inputMode="numeric"
            pattern="\d{5}"
            placeholder="94087"
            className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
