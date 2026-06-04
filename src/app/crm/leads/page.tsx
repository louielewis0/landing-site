import type { Metadata } from "next";
import { Suspense } from "react";
import LeadsTableClient from "./LeadsTableClient";

export const metadata: Metadata = { title: "Leads" };

export default function CrmLeadsPage() {
  return (
    <>
      <p className="eyebrow mb-3">Leads</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-2">
        All leads.
      </h1>
      <p className="text-bone/55 text-[15px] mb-8 max-w-2xl font-light">
        Search, filter, scrub, export. Click any row to select it — the
        full editable record + activity timeline opens in 2E. Status
        updates are best done from the{" "}
        <a
          href="/crm/pipeline"
          className="text-[var(--gold-soft)] hover:text-[var(--gold)] transition-colors"
        >
          Kanban
        </a>
        ; the row-pill still cycles the legacy four-status flow.
      </p>
      {/* Suspense boundary is required because LeadsTableClient calls
          useSearchParams() — Next.js 16 prerenders /crm/leads as static
          and that hook must run inside a Suspense boundary. */}
      <Suspense fallback={null}>
        <LeadsTableClient />
      </Suspense>
    </>
  );
}
