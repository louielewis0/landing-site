import "server-only";

/**
 * A single IDX listing, normalized from the raw RESO `Property` record into
 * the minimal, display-safe shape the site actually renders.
 *
 * Compliance is baked into this shape (Realcomp IDX Rules, Section 18):
 *   - Only listings permissioned for IDX display become an IdxListing at all
 *     (SyndicateTo contains "InternetDataExchangeIDX" + StandardStatus Active).
 *   - `address` is null when InternetAddressDisplayYN is false — the listing
 *     may still show, but without its street address.
 *   - `price` is null when PublishSalePriceYN is false — honor the opt-out.
 *   - No confidential fields (ShowingContact*, LockBox*, private remarks) are
 *     ever carried here, so they can't leak into the client bundle.
 *   - `listOfficeName` + `attribution` + `originatingSystem` carry the required
 *     courtesy-of / copyright text that must display with every listing.
 */
export interface IdxListing {
  /** Stable RESO ListingKey — used as the React key and for dedupe. */
  listingKey: string;
  /** Public MLS number (ListingId), shown in the required attribution line. */
  listingId: string | null;

  /** List price in whole dollars, or null if the broker opted out of price display. */
  price: number | null;
  /** Street address, or null if the listing opted out of internet address display. */
  address: string | null;
  /** Clean city name (PostalCity with the "_County" suffix stripped). */
  city: string | null;
  state: string | null;
  postalCode: string | null;

  bedrooms: number | null;
  bathrooms: number | null;
  /** Finished living area in square feet. */
  livingArea: number | null;
  propertySubType: string | null;

  /** Ordered photo URLs (first = primary). Empty when the listing has no media. */
  photos: string[];
  /** Count reported by the MLS (may exceed photos.length if media was capped). */
  photoCount: number;
  /** Unbranded virtual tour URL, when provided and IDX-permitted. */
  virtualTourUrl: string | null;

  /** Listing brokerage — the "Courtesy of {listOfficeName}" attribution. */
  listOfficeName: string | null;
  /** Source MLS name, e.g. "Realcomp II Ltd" — used in the copyright line. */
  originatingSystem: string | null;
  /** Ready-to-render courtesy line, e.g. "Listing courtesy of {office}". */
  attribution: string;

  /** Last MLS modification timestamp (ISO) — drives the freshness/audit trail. */
  modified: string | null;
}

/** Parameters for a compliant featured-listings query. */
export interface FeaturedQuery {
  /** Minimum list price (defaults applied by the caller). */
  minPrice?: number;
  /** Oakland | Wayne | Macomb | Washtenaw | Livingston | ... (RESO CountyOrParish). */
  county?: string;
  /** Restrict to specific clean city names (matched against PostalCity prefix). */
  cities?: string[];
  /** Max listings to return after compliance filtering + client-side sort. */
  limit?: number;
}

/** Result of a /homes location search. */
export interface SearchResult {
  /** Compliant, display-ready listings (may be empty). */
  listings: IdxListing[];
  /** How the typed location resolved: a city name, a ZIP, or unrecognized. */
  resolved: "city" | "zip" | "unknown";
  /** Friendly label for what was searched (e.g. "Birmingham" or "48009"). */
  label: string;
  /** The raw text the visitor typed. */
  query: string;
}
