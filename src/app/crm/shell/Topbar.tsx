import { Plus, Search } from "lucide-react";

/**
 * Top bar above the main content column. Search input on the
 * left (max-w-md), spacer, "+ Add lead" CTA on the right.
 *
 * Both controls are disabled in 2A — the search becomes
 * functional in 2D (table-scope find + cross-CRM lookup), and
 * Add lead opens the manual-entry sheet in 2D. Rendering them
 * disabled rather than hidden makes the eventual UX shape
 * legible in the 2A preview review.
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
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-bone/[0.04] border border-bone/15 text-[14px] text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex-1" />

      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[13px] font-semibold tracking-wide transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-4 h-4" strokeWidth={2.25} />
        Add lead
      </button>
    </header>
  );
}
