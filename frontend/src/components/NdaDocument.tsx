import {
  confidentialityPhrase,
  formatEffectiveDate,
  mndaTermPhrase,
  orBlank,
  type MndaData,
  type Party,
} from "@/lib/mnda";

/** Inline-highlighted value pulled from the Cover Page. */
function Field({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-amber-100 px-1 font-medium text-stone-900 print:bg-transparent print:px-0">
      {children}
    </span>
  );
}

function PartyColumn({ party, label }: { party: Party; label: string }) {
  return (
    <div className="flex-1">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </h4>
      <dl className="space-y-1 text-sm">
        <Row term="Signature" value="" />
        <Row term="Print Name" value={orBlank(party.signatoryName, "—")} />
        <Row term="Title" value={orBlank(party.title, "—")} />
        <Row term="Company" value={orBlank(party.company, "—")} />
        <Row term="Notice Address" value={orBlank(party.noticeAddress, "—")} />
        <Row term="Date" value="" />
      </dl>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex gap-2 border-b border-stone-200 py-1">
      <dt className="w-28 shrink-0 text-stone-500">{term}</dt>
      <dd className="min-h-[1.25rem] flex-1 text-stone-900">{value}</dd>
    </div>
  );
}

/**
 * Renders the complete Common Paper Mutual NDA (v1.0): a Cover Page filled with
 * the user's values, followed by the verbatim Standard Terms with the
 * Cover Page variables interpolated inline.
 */
export default function NdaDocument({ data }: { data: MndaData }) {
  const purpose = orBlank(data.purpose, "[Purpose]");
  const effectiveDate = formatEffectiveDate(data.effectiveDate);
  const termPhrase = mndaTermPhrase(data);
  const confidentiality = confidentialityPhrase(data);
  const governingLaw = orBlank(data.governingLawState, "[Governing Law]");
  const jurisdiction = orBlank(data.jurisdiction, "[Jurisdiction]");

  return (
    <article className="mnda-document mx-auto max-w-[8.5in] bg-white px-10 py-12 text-stone-800 print:px-0 print:py-0">
      {/* ---- Cover Page ---- */}
      <header className="mb-8 border-b border-stone-300 pb-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Mutual Non-Disclosure Agreement
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists
          of (1) this Cover Page and (2) the Common Paper Mutual NDA Standard
          Terms Version 1.0. Any modifications to the Standard Terms are made on
          this Cover Page, which controls over conflicts with the Standard Terms.
        </p>
      </header>

      <section className="space-y-5 text-sm leading-relaxed">
        <div>
          <h3 className="font-semibold text-stone-900">Purpose</h3>
          <p className="text-stone-500">How Confidential Information may be used</p>
          <p className="mt-1">
            <Field>{purpose}</Field>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900">Effective Date</h3>
          <p className="mt-1">
            <Field>{effectiveDate}</Field>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900">MNDA Term</h3>
          <p className="text-stone-500">The length of this MNDA</p>
          <p className="mt-1">
            {data.mndaTermKind === "expires" ? (
              <>
                This MNDA expires at the end of the{" "}
                <Field>{mndaTermPhrase(data)}</Field>.
              </>
            ) : (
              <>This MNDA continues until terminated in accordance with its terms.</>
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900">Term of Confidentiality</h3>
          <p className="text-stone-500">How long Confidential Information is protected</p>
          <p className="mt-1">
            Confidential Information is protected for{" "}
            <Field>{confidentiality}</Field>.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900">
            Governing Law &amp; Jurisdiction
          </h3>
          <p className="mt-1">
            Governing Law: <Field>{governingLaw}</Field>
          </p>
          <p>
            Jurisdiction: <Field>{jurisdiction}</Field>
          </p>
        </div>

        {data.modifications.trim() && (
          <div>
            <h3 className="font-semibold text-stone-900">MNDA Modifications</h3>
            <p className="mt-1 whitespace-pre-line">{data.modifications.trim()}</p>
          </div>
        )}
      </section>

      <section className="mt-8">
        <p className="mb-4 text-sm">
          By signing this Cover Page, each party agrees to enter into this MNDA
          as of the Effective Date.
        </p>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
          <PartyColumn party={data.party1} label="Party 1" />
          <PartyColumn party={data.party2} label="Party 2" />
        </div>
      </section>

      {/* ---- Standard Terms ---- */}
      <section className="mt-10 border-t border-stone-300 pt-8 print:break-before-page">
        <h2 className="mb-4 text-lg font-bold text-stone-900">Standard Terms</h2>
        <ol className="space-y-3 text-sm leading-relaxed text-stone-700">
          <li>
            <strong>1. Introduction.</strong> This MNDA allows each party
            (&ldquo;Disclosing Party&rdquo;) to disclose or make available
            information in connection with the <Field>{purpose}</Field> which
            (1) the Disclosing Party identifies as &ldquo;confidential&rdquo;,
            &ldquo;proprietary&rdquo;, or the like or (2) should be reasonably
            understood as confidential or proprietary due to its nature and the
            circumstances of its disclosure (&ldquo;Confidential
            Information&rdquo;). To use this MNDA, the parties must complete and
            sign the Cover Page incorporating these Standard Terms.
          </li>
          <li>
            <strong>2. Use and Protection of Confidential Information.</strong>{" "}
            The Receiving Party shall: (a) use Confidential Information solely for
            the <Field>{purpose}</Field>; (b) not disclose Confidential
            Information to third parties without the Disclosing Party&rsquo;s
            prior written approval, except to its representatives having a
            reasonable need to know for the <Field>{purpose}</Field> who are
            bound by confidentiality obligations no less protective than this
            MNDA; and (c) protect Confidential Information using at least a
            reasonable standard of care.
          </li>
          <li>
            <strong>3. Exceptions.</strong> The Receiving Party&rsquo;s
            obligations do not apply to information that it can demonstrate: (a)
            is or becomes publicly available through no fault of the Receiving
            Party; (b) it rightfully knew or possessed prior to receipt without
            confidentiality restrictions; (c) it rightfully obtained from a third
            party without confidentiality restrictions; or (d) it independently
            developed without using or referencing the Confidential Information.
          </li>
          <li>
            <strong>4. Disclosures Required by Law.</strong> The Receiving Party
            may disclose Confidential Information to the extent required by law,
            regulation, subpoena, or court order, provided it gives reasonable
            advance notice (where legally permitted) and reasonably cooperates,
            at the Disclosing Party&rsquo;s expense, in seeking confidential
            treatment.
          </li>
          <li>
            <strong>5. Term and Termination.</strong> This MNDA commences on{" "}
            <Field>{effectiveDate}</Field> and continues for the{" "}
            <Field>{termPhrase}</Field>. Either party may terminate this MNDA for
            any or no reason upon written notice. The Receiving Party&rsquo;s
            obligations relating to Confidential Information will survive for{" "}
            <Field>{confidentiality}</Field>, despite any expiration or
            termination of this MNDA.
          </li>
          <li>
            <strong>6. Return or Destruction of Confidential Information.</strong>{" "}
            Upon expiration or termination, or upon the Disclosing Party&rsquo;s
            earlier request, the Receiving Party will cease using, and destroy or
            return, all Confidential Information, subject to standard backup,
            record-retention, or legally required retention, which remains
            governed by this MNDA.
          </li>
          <li>
            <strong>7. Proprietary Rights.</strong> The Disclosing Party retains
            all intellectual property and other rights in its Confidential
            Information, and its disclosure grants the Receiving Party no license
            under such rights.
          </li>
          <li>
            <strong>8. Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS
            PROVIDED &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT
            WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE,
            MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE.
          </li>
          <li>
            <strong>9. Governing Law and Jurisdiction.</strong> This MNDA is
            governed by the laws of the State of <Field>{governingLaw}</Field>,
            without regard to its conflict of laws provisions. Any legal suit,
            action, or proceeding relating to this MNDA must be instituted in the
            federal or state courts located in <Field>{jurisdiction}</Field>, and
            each party irrevocably submits to the exclusive jurisdiction of such
            courts.
          </li>
          <li>
            <strong>10. Equitable Relief.</strong> A breach of this MNDA may
            cause irreparable harm for which monetary damages are insufficient.
            Upon a breach, the Disclosing Party is entitled to seek appropriate
            equitable relief, including an injunction, in addition to its other
            remedies.
          </li>
          <li>
            <strong>11. General.</strong> Neither party is obligated to disclose
            Confidential Information or to proceed with any transaction. Neither
            party may assign this MNDA without the other&rsquo;s prior written
            consent, except in connection with a merger or sale of substantially
            all its assets. Waivers must be signed to be effective. If any
            provision is unenforceable, it will be limited to the minimum extent
            necessary so the rest remains in effect. This MNDA (including the
            Cover Page) is the entire agreement of the parties on its subject
            matter and may be executed in counterparts.
          </li>
        </ol>
        <p className="mt-6 text-xs text-stone-400">
          Common Paper Mutual Non-Disclosure Agreement (Version 1.0), free to use
          under CC BY 4.0 (creativecommons.org/licenses/by/4.0). This generated
          document is a prototype and is not legal advice.
        </p>
      </section>
    </article>
  );
}
