"use client";

import type { MndaData, Party } from "@/lib/mnda";

interface NdaFormProps {
  data: MndaData;
  onChange: (data: MndaData) => void;
}

const labelClass = "block text-sm font-medium text-stone-700";
const inputClass =
  "mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500";

export default function NdaForm({ data, onChange }: NdaFormProps) {
  function set<K extends keyof MndaData>(key: K, value: MndaData[K]) {
    onChange({ ...data, [key]: value });
  }

  function setParty(
    which: "party1" | "party2",
    key: keyof Party,
    value: string,
  ) {
    onChange({ ...data, [which]: { ...data[which], [key]: value } });
  }

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {/* Agreement details */}
      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-stone-900">
          Agreement details
        </legend>

        <div>
          <label className={labelClass} htmlFor="purpose">
            Purpose
          </label>
          <textarea
            id="purpose"
            className={inputClass}
            rows={2}
            value={data.purpose}
            onChange={(e) => set("purpose", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="effectiveDate">
            Effective date
          </label>
          <input
            id="effectiveDate"
            type="date"
            className={inputClass}
            value={data.effectiveDate}
            onChange={(e) => set("effectiveDate", e.target.value)}
          />
        </div>

        <div>
          <span className={labelClass}>MNDA term</span>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="mndaTermKind"
                checked={data.mndaTermKind === "expires"}
                onChange={() => set("mndaTermKind", "expires")}
              />
              Expires after
              <input
                type="number"
                min={1}
                className="w-16 rounded-md border border-stone-300 px-2 py-1 text-sm disabled:bg-stone-100"
                value={data.mndaTermYears}
                disabled={data.mndaTermKind !== "expires"}
                onChange={(e) =>
                  set("mndaTermYears", Math.max(1, Number(e.target.value) || 1))
                }
              />
              year(s) from the effective date
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="mndaTermKind"
                checked={data.mndaTermKind === "untilTerminated"}
                onChange={() => set("mndaTermKind", "untilTerminated")}
              />
              Continues until terminated
            </label>
          </div>
        </div>

        <div>
          <span className={labelClass}>Term of confidentiality</span>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="confidentialityKind"
                checked={data.confidentialityKind === "years"}
                onChange={() => set("confidentialityKind", "years")}
              />
              <input
                type="number"
                min={1}
                className="w-16 rounded-md border border-stone-300 px-2 py-1 text-sm disabled:bg-stone-100"
                value={data.confidentialityYears}
                disabled={data.confidentialityKind !== "years"}
                onChange={(e) =>
                  set(
                    "confidentialityYears",
                    Math.max(1, Number(e.target.value) || 1),
                  )
                }
              />
              year(s) from the effective date
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="radio"
                name="confidentialityKind"
                checked={data.confidentialityKind === "perpetuity"}
                onChange={() => set("confidentialityKind", "perpetuity")}
              />
              In perpetuity
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="governingLawState">
              Governing law (state)
            </label>
            <input
              id="governingLawState"
              type="text"
              placeholder="Delaware"
              className={inputClass}
              value={data.governingLawState}
              onChange={(e) => set("governingLawState", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="jurisdiction">
              Jurisdiction (city/county & state)
            </label>
            <input
              id="jurisdiction"
              type="text"
              placeholder="New Castle County, Delaware"
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) => set("jurisdiction", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="modifications">
            Modifications <span className="text-stone-400">(optional)</span>
          </label>
          <textarea
            id="modifications"
            className={inputClass}
            rows={2}
            placeholder="List any changes to the Standard Terms"
            value={data.modifications}
            onChange={(e) => set("modifications", e.target.value)}
          />
        </div>
      </fieldset>

      <PartyFields
        legend="Party 1"
        party={data.party1}
        onField={(key, value) => setParty("party1", key, value)}
      />
      <PartyFields
        legend="Party 2"
        party={data.party2}
        onField={(key, value) => setParty("party2", key, value)}
      />
    </form>
  );
}

function PartyFields({
  legend,
  party,
  onField,
}: {
  legend: string;
  party: Party;
  onField: (key: keyof Party, value: string) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-semibold text-stone-900">{legend}</legend>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Company</label>
          <input
            type="text"
            className={inputClass}
            value={party.company}
            onChange={(e) => onField("company", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Signatory name</label>
          <input
            type="text"
            className={inputClass}
            value={party.signatoryName}
            onChange={(e) => onField("signatoryName", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            className={inputClass}
            value={party.title}
            onChange={(e) => onField("title", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Notice address (email or postal)</label>
          <input
            type="text"
            className={inputClass}
            value={party.noticeAddress}
            onChange={(e) => onField("noticeAddress", e.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
}
