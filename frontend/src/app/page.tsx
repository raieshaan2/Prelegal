"use client";

import { useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaDocument from "@/components/NdaDocument";
import { defaultMndaData, suggestedFileName, type MndaData } from "@/lib/mnda";

export default function Home() {
  const [data, setData] = useState<MndaData>(defaultMndaData);

  function handleDownload() {
    // Use the browser's print dialog (Save as PDF) for the document.
    // The print stylesheet hides everything except the document itself.
    const previousTitle = document.title;
    document.title = suggestedFileName(data);
    window.print();
    document.title = previousTitle;
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="no-print border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-stone-900">
              Mutual NDA Creator
            </h1>
            <p className="text-sm text-stone-500">
              Fill in the details to generate a Common Paper Mutual NDA.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-stone-700"
          >
            Download PDF
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[minmax(0,420px)_1fr]">
        <section className="no-print">
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <NdaForm data={data} onChange={setData} />
          </div>
        </section>

        <section>
          <div className="no-print mb-2 text-sm font-medium text-stone-500">
            Live preview
          </div>
          <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
            <div id="nda-print-area">
              <NdaDocument data={data} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
