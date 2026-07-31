import type { Metadata } from "next";
import { Suspense } from "react";
import LeadsTableClient from "./LeadsTableClient";

export const metadata: Metadata = { title: "Leads" };

export default function CrmLeadsPage() {
  return (
    <>
      <h1
        style={{
          margin: "0 0 6px",
          fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: 40,
          letterSpacing: "-0.025em",
          color: "#191a1c",
        }}
      >
        Leads
      </h1>
      <p style={{ fontSize: 14, color: "rgba(25,26,28,0.55)", margin: "0 0 24px", maxWidth: 560 }}>
        Search, filter, scrub, export. Click any row to open the full
        record and activity timeline.
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
