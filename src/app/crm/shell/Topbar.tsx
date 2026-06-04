import Link from "next/link";
import { Plus, Search } from "lucide-react";

/**
 * Top bar above the main content column. Search input on the
 * left (max-w-md), spacer, "+ Add lead" CTA on the right.
 *
 * Search is still disabled in 2D (table-scope find lives on the
 * leads page itself; cross-CRM global search arrives in a later
 * pass). Add lead in 2D becomes a deep-link to
 * /crm/leads?add=1 — landing on the leads page auto-expands the
 * manual-entry panel via a useEffect that consumes the ?add
 * param and then strips it from the URL.
 *
 * Sticky to the viewport top so the bar stays visible as the
 * main column scrolls. The bone-translucent backdrop sits over
 * the atmospheric background — blur is the visual seam between
 * topbar and content.
 */
export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-6 bg-ink/60 backdrop-blur-xl border-b border-bone/10">
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-bone/35"
          strokeWidth={1.5}
        />
        <input
          type="search"
          placeholder="Search leads, activity, agents…"
          disabled
          title="Global search arrives in a later polish pass — for now, search on /crm/leads"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-[14px] text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex-1" />

      <Link
        href="/crm/leads?add=1"
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[13px] font-semibold tracking-wide transition-all duration-400"
      >
        <Plus className="w-4 h-4" strokeWidth={2.25} />
        Add lead
      </Link>
    </header>
  );
}
