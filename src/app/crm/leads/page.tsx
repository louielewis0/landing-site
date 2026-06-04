import type { Metadata } from "next";
import Placeholder from "../Placeholder";

export const metadata: Metadata = { title: "Leads" };

export default function CrmLeadsPage() {
  return (
    <>
      <p className="eyebrow mb-3">Leads</p>
      <h1 className="font-display text-4xl font-light text-bone tracking-tight mb-3">
        All leads.
      </h1>
      <p className="text-bone/55 text-[15px] mb-10 max-w-2xl font-light">
        The existing list at <code className="font-mono text-[13px] text-[var(--gold-soft)]">/dashboard</code>{" "}
        — search, status filter, DNC scrubber, CSV export — lifts here in
        Phase 2D with additional source / priority / property-type filters
        and a row-click drawer.
      </p>
      <Placeholder
        phase="2D"
        title="Upgraded leads table"
        items={[
          "Search",
          "Status filter",
          "Source filter",
          "Priority filter",
          "Property-type filter",
          "DNC scrubber",
          "CSV export",
          "Row-click drawer",
        ]}
      />
    </>
  );
}
