import type { Metadata } from "next";
import Link from "next/link";
import { Search, BedDouble, Bath, Ruler } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import LeadGate from "@/components/site/LeadGate";
import {
  searchListings,
  isIdxConfigured,
  IDX_DISCLAIMER,
  SUGGESTED_CITIES,
  type IdxListing,
  type SearchResult,
} from "@/lib/idx";

/**
 * /homes — live IDX search results (Phase 2).
 *
 * The hero search box submits ?location=… here. We resolve it to a city/ZIP,
 * pull compliant active listings from Realcomp, and render a dark-cinematic
 * grid. All IDX display rules are honored by the data layer (active only,
 * IDX-permitted only, per-listing address/price opt-outs, listing-office
 * attribution). The required Realcomp disclaimer shows beneath the grid.
 *
 * Noindex for now: IDX results pages are standard to keep out of the index
 * (thin/duplicate), and this is still pre-launch.
 */
export const metadata: Metadata = {
  title: "Search Homes — Real Estate Market Center",
  robots: { index: false, follow: true },
};

function formatPrice(n: number | null): string {
  if (n == null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form className="hx-search homes-search" action="/homes" method="get" role="search">
      <label htmlFor="homes-location" className="hx-sr-only">
        Search by city, area, region, or ZIP code
      </label>
      <Search className="hx-search-icon" width={19} height={19} aria-hidden />
      <input
        id="homes-location"
        name="location"
        type="text"
        autoComplete="off"
        defaultValue={defaultValue}
        placeholder="City, Area, Region or Zip Code"
        className="hx-search-input"
      />
      <button type="submit" className="hx-search-btn">
        Search
      </button>
    </form>
  );
}

function ListingCard({ listing }: { listing: IdxListing }) {
  const photo = listing.photos[0];
  const place = [listing.city, listing.state].filter(Boolean).join(", ");
  return (
    <Link href={`/homes/${listing.listingKey}`} className="hm-card hm-card-link" aria-label={listing.address ?? `Home in ${listing.city ?? "Metro Detroit"}`}>
      <div className="hm-card-media">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={listing.address ?? `Home in ${listing.city ?? "Metro Detroit"}`} loading="lazy" />
        ) : (
          <div className="hm-card-noimg">Photo unavailable</div>
        )}
        <div className="hm-card-price">{formatPrice(listing.price)}</div>
      </div>
      <div className="hm-card-body">
        <h3 className="hm-card-addr">{listing.address ?? "Address available on request"}</h3>
        {place && <div className="hm-card-city">{place}{listing.postalCode ? ` ${listing.postalCode}` : ""}</div>}
        <div className="hm-card-specs">
          {listing.bedrooms != null && (
            <span><BedDouble width={15} height={15} aria-hidden /> {listing.bedrooms} bd</span>
          )}
          {listing.bathrooms != null && (
            <span><Bath width={15} height={15} aria-hidden /> {listing.bathrooms} ba</span>
          )}
          {listing.livingArea != null && (
            <span><Ruler width={15} height={15} aria-hidden /> {listing.livingArea.toLocaleString()} sqft</span>
          )}
        </div>
        {/* Listing-office attribution — required with every IDX listing. */}
        {listing.attribution && <div className="hm-card-attr">{listing.attribution}</div>}
      </div>
    </Link>
  );
}

export default async function HomesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location = "" } = await searchParams;
  const hasQuery = location.trim().length > 0;

  // Degrade gracefully: if the Realcomp credentials aren't set on this host yet
  // (or a search throws), show a friendly notice instead of a 500.
  let result: SearchResult | null = null;
  let serviceDown = false;
  if (hasQuery) {
    if (!isIdxConfigured()) {
      serviceDown = true;
    } else {
      try {
        result = await searchListings(location);
      } catch {
        serviceDown = true;
      }
    }
  }

  return (
    <SiteShell navOnDark hideOverlays>
      <main className="hm-main">
        <section className="hm-head">
          <div className="hm-head-inner">
            <div className="hx-eyebrow">Metro Detroit &middot; Live MLS listings</div>
            <h1 className="hm-title">
              {result
                ? result.listings.length > 0
                  ? <>Homes for sale in <em>{result.label}</em></>
                  : <>Search results for <em>{result.label || location}</em></>
                : <>Find your next home</>}
            </h1>
            <SearchBar defaultValue={location} />
          </div>
        </section>

        <section className="hm-results">
          {serviceDown && (
            <div className="hm-empty">
              <p>Live listings are coming online shortly. In the meantime, call us at (248) 568-6081 and we&rsquo;ll pull up anything on the market for you.</p>
            </div>
          )}

          {!result && !serviceDown && (
            <div className="hm-empty">
              <p>Search any Metro Detroit city, area, or ZIP code to see live listings.</p>
              <div className="hm-suggest">
                {SUGGESTED_CITIES.map((c) => (
                  <Link key={c} href={`/homes?location=${encodeURIComponent(c)}`} className="hm-chip">{c}</Link>
                ))}
              </div>
            </div>
          )}

          {result && result.listings.length === 0 && (
            <div className="hm-empty">
              {result.resolved === "unknown" ? (
                <p>We couldn&rsquo;t match &ldquo;{location}&rdquo; to a Metro Detroit city or ZIP. Try one of these:</p>
              ) : (
                <p>No active listings in {result.label} right now. Try a nearby city:</p>
              )}
              <div className="hm-suggest">
                {SUGGESTED_CITIES.map((c) => (
                  <Link key={c} href={`/homes?location=${encodeURIComponent(c)}`} className="hm-chip">{c}</Link>
                ))}
              </div>
            </div>
          )}

          {result && result.listings.length > 0 && (
            <>
              <div className="hm-count">
                {result.listings.length} {result.listings.length === 1 ? "home" : "homes"} shown
              </div>
              <div className="hm-grid">
                {result.listings.map((l) => (
                  <ListingCard key={l.listingKey} listing={l} />
                ))}
              </div>
            </>
          )}

          {/* Scroll-triggered registration wall — fires once past the first view. */}
          {result && result.listings.length > 0 && (
            <LeadGate location={result.label} />
          )}

          {/* Required IDX attribution / disclaimer — always visible with results. */}
          <div className="hm-disclaimer">
            <p>{IDX_DISCLAIMER}</p>
            <p className="hm-disclaimer-fine">
              Listings refreshed hourly from Realcomp II Ltd. &copy; {new Date().getFullYear()} Realcomp II Ltd. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
