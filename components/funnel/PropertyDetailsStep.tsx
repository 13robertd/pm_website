"use client";

import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import {
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/mockProperties";

// Step 2: collect property characteristics that drive the rent estimate.
export type PropertyDetailsData = {
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  units: number;
  status: PropertyStatus;
};

const TYPES = Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][];
const STATUSES = Object.entries(PROPERTY_STATUS_LABELS) as [
  PropertyStatus,
  string,
][];

export default function PropertyDetailsStep({
  initial,
  onSubmit,
  onBack,
}: {
  initial: PropertyDetailsData;
  onSubmit: (data: PropertyDetailsData) => void;
  onBack: () => void;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      type: fd.get("type") as PropertyType,
      bedrooms: Number(fd.get("bedrooms") ?? 0),
      bathrooms: Number(fd.get("bathrooms") ?? 0),
      sqft: Number(fd.get("sqft") ?? 0),
      units: Math.max(1, Number(fd.get("units") ?? 1)),
      status: fd.get("status") as PropertyStatus,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
        <Building2 size={16} />
        Property Details
      </div>

      {/* Property type — visual radio cards */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Property type
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TYPES.map(([value, label]) => (
            <label
              key={value}
              className="group flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-3 text-center text-sm text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50/40 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800 has-[:checked]:ring-2 has-[:checked]:ring-brand-200"
            >
              <input
                type="radio"
                name="type"
                value={value}
                required
                defaultChecked={initial.type === value}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Numeric fields */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <NumberField
          label="Bedrooms"
          name="bedrooms"
          defaultValue={initial.bedrooms}
          min={0}
          max={10}
        />
        <NumberField
          label="Bathrooms"
          name="bathrooms"
          defaultValue={initial.bathrooms}
          min={0}
          max={10}
          step={0.5}
        />
        <NumberField
          label="Square feet"
          name="sqft"
          defaultValue={initial.sqft || 1000}
          min={100}
          max={50000}
          step={50}
        />
        <NumberField
          label="Units"
          name="units"
          defaultValue={initial.units || 1}
          min={1}
          max={200}
        />
      </div>

      {/* Current status */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Current status
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {STATUSES.map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50/40 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800 has-[:checked]:ring-2 has-[:checked]:ring-brand-200"
            >
              <input
                type="radio"
                name="status"
                value={value}
                required
                defaultChecked={initial.status === value}
                className="sr-only"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Generate Estimate
          <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}

function NumberField({
  label,
  name,
  defaultValue,
  min,
  max,
  step = 1,
}: {
  label: string;
  name: string;
  defaultValue: number;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="number"
        name={name}
        required
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
