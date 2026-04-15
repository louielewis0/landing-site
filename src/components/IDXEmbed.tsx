"use client";

import { idx } from "@/lib/idx";

type IDXWidget = "search" | "hotsheet" | "area" | "saved-search" | "map";

type Props = {
  /** Which Showcase IDX widget to render. */
  widget: IDXWidget;
  /** Optional Showcase IDX saved-search slug or filter key. */
  search?: string;
  /** Optional additional data-* attributes (HTML-safe strings only). */
  attrs?: Record<string, string>;
  className?: string;
};

/**
 * Mount point for a Showcase IDX widget. The IDX script (loaded globally via
 * <ShowcaseIDXScript />) scans the page for these divs and renders real MLS
 * data into them.
 *
 * When the IDX account ID is not configured, this component renders a neutral
 * placeholder instead — no fake listings, no stock photos.
 */
export default function IDXEmbed({ widget, search, attrs = {}, className = "" }: Props) {
  if (!idx.enabled) {
    return <IDXPlaceholder widget={widget} className={className} />;
  }

  const widgetClass = `showcaseidx-${widget}`;

  return (
    <div
      className={`${widgetClass} ${className}`}
      data-search={search}
      {...attrs}
    />
  );
}

function IDXPlaceholder({ widget, className }: { widget: IDXWidget; className: string }) {
  const label = {
    search: "property search",
    hotsheet: "featured listings",
    area: "area search",
    "saved-search": "saved searches",
    map: "map view",
  }[widget];

  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Live MLS {label} loads here
      </h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto">
        Set <code className="px-1.5 py-0.5 rounded bg-slate-200 text-[11px]">NEXT_PUBLIC_SHOWCASE_IDX_ACCOUNT_ID</code>{" "}
        in your environment variables to activate real Metro Detroit listings
        via Showcase IDX.
      </p>
    </div>
  );
}
