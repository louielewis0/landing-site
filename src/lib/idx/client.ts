import "server-only";
import { unstable_cache } from "next/cache";
import { getIdxConfig } from "./config";
import { resolveLocation } from "./cities";
import type { FeaturedQuery, IdxListing, SearchResult } from "./types";

/** Bump when the normalized listing shape changes, to bust stale cache entries. */
const IDX_CACHE_VERSION = "v2";

/**
 * Low-level Realcomp RAPI client + compliant featured-listings reader.
 *
 * Data flow: OAuth2 client-credentials → bearer token (cached in-memory until
 * it nears expiry) → OData `Property` query → normalize + apply per-listing
 * IDX permission opt-outs → sort client-side.
 *
 * Caching: the normalized result is wrapped in `unstable_cache` with a 1-hour
 * revalidate (well under Realcomp's 12-hour max-staleness rule) and an "idx"
 * tag so it can be purged on demand. The cache key is the query shape, NOT the
 * bearer token, so token rotation doesn't thrash the cache.
 */

// ---- OAuth token (in-memory, per server instance) --------------------------

interface CachedToken {
  token: string;
  /** epoch ms after which the token should be refreshed */
  expiresAt: number;
}
let tokenCache: CachedToken | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.token;
  }

  const cfg = getIdxConfig();
  // The Realcomp token endpoint takes EXACTLY these three params — no more.
  const res = await fetch(cfg.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      audience: cfg.audience,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Realcomp token request failed: ${res.status}`);
  }

  const json = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!json.access_token) {
    throw new Error("Realcomp token response had no access_token");
  }

  // Refresh 60s before actual expiry; default to 50 min if none reported.
  const ttlSeconds = json.expires_in ?? 3000;
  tokenCache = {
    token: json.access_token,
    expiresAt: now + Math.max(ttlSeconds - 60, 60) * 1000,
  };
  return tokenCache.token;
}

// ---- Raw RESO Property record (only the fields we read) --------------------

interface RawMedia {
  MediaURL?: string;
  Order?: number;
  MediaType?: string;
  MediaCategory?: string;
  MediaStatus?: string;
  ResourceRecordKey?: string;
}

interface RawProperty {
  ListingKey?: string;
  ListingId?: string;
  ListPrice?: number;
  StandardStatus?: string;
  SyndicateTo?: string;
  InternetEntireListingDisplayYN?: boolean;
  InternetAddressDisplayYN?: boolean;
  PublishSalePriceYN?: boolean;
  UnparsedAddress?: string;
  StreetNumber?: string;
  StreetDirPrefix?: string;
  StreetName?: string;
  StreetSuffix?: string;
  UnitNumber?: string;
  PostalCity?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  PropertySubType?: string;
  PhotosCount?: number;
  VirtualTourURLUnbranded?: string;
  ListOfficeName?: string;
  OriginatingSystemName?: string;
  ModificationTimestamp?: string;
  Media?: RawMedia[];
}

// The $select keeps the payload tight and guarantees we never pull confidential
// fields (ShowingContact*, LockBox*, PrivateRemarks, etc.) over the wire.
const SELECT = [
  "ListingKey",
  "ListingId",
  "ListPrice",
  "StandardStatus",
  "SyndicateTo",
  "InternetEntireListingDisplayYN",
  "InternetAddressDisplayYN",
  "PublishSalePriceYN",
  "UnparsedAddress",
  "StreetNumber",
  "StreetDirPrefix",
  "StreetName",
  "StreetSuffix",
  "UnitNumber",
  "PostalCity",
  "StateOrProvince",
  "PostalCode",
  "BedroomsTotal",
  "BathroomsTotalInteger",
  "LivingArea",
  "PropertySubType",
  "PhotosCount",
  "VirtualTourURLUnbranded",
  "ListOfficeName",
  "OriginatingSystemName",
  "ModificationTimestamp",
].join(",");

/** The exact SyndicateTo token that signals the seller permitted IDX display. */
const IDX_SYNDICATION_TOKEN = "InternetDataExchangeIDX";

function cleanCity(postalCity: string | undefined): string | null {
  if (!postalCity) return null;
  // PostalCity arrives like "BloomfieldHills_Oakland"; strip the county suffix
  // and insert spaces before internal capitals → "Bloomfield Hills".
  const base = postalCity.split("_")[0];
  return base.replace(/([a-z])([A-Z])/g, "$1 $2").trim() || null;
}

function buildAddress(p: RawProperty): string | null {
  // Prefer the pre-formatted address when present...
  const unparsed = p.UnparsedAddress?.trim();
  if (unparsed) return unparsed.replace(/\s+Unit:\s*/i, " Unit ").replace(/\s+/g, " ").trim();
  // ...otherwise reconstruct it from the component fields (often the only source).
  const parts = [p.StreetNumber, p.StreetDirPrefix, p.StreetName, p.StreetSuffix]
    .map((x) => (x == null ? "" : String(x).trim()))
    .filter(Boolean);
  if (parts.length === 0) return null;
  let addr = parts.join(" ");
  const unit = p.UnitNumber == null ? "" : String(p.UnitNumber).trim();
  if (unit) addr += ` Unit ${unit}`;
  return addr;
}

function pickPhotos(media: RawMedia[] | undefined): string[] {
  if (!media || media.length === 0) return [];
  return media
    .filter(
      (m) =>
        !!m.MediaURL &&
        (m.MediaStatus ?? "Active") === "Active" &&
        // keep image media only; MediaType is like "image/jpeg" / "jpg"
        (!m.MediaType || /image|jpe?g|png|webp/i.test(m.MediaType))
    )
    .sort((a, b) => (a.Order ?? 9999) - (b.Order ?? 9999))
    .map((m) => m.MediaURL as string);
}

function normalize(p: RawProperty): IdxListing {
  const addressAllowed = p.InternetAddressDisplayYN !== false;
  const priceAllowed = p.PublishSalePriceYN !== false;
  const office = p.ListOfficeName?.trim() || null;

  return {
    listingKey: p.ListingKey ?? "",
    listingId: p.ListingId ?? null,
    price: priceAllowed ? p.ListPrice ?? null : null,
    address: addressAllowed ? buildAddress(p) : null,
    city: cleanCity(p.PostalCity),
    state: p.StateOrProvince ?? null,
    postalCode: p.PostalCode ?? null,
    bedrooms: p.BedroomsTotal ?? null,
    bathrooms: p.BathroomsTotalInteger ?? null,
    livingArea: p.LivingArea ?? null,
    propertySubType: p.PropertySubType ?? null,
    photos: [], // populated by attachPhotos() in a separate, fast Media query
    photoCount: p.PhotosCount ?? 0,
    virtualTourUrl: p.VirtualTourURLUnbranded?.trim() || null,
    listOfficeName: office,
    originatingSystem: p.OriginatingSystemName?.trim() || null,
    attribution: office ? `Listing courtesy of ${office}` : "",
    modified: p.ModificationTimestamp ?? null,
  };
}

/** True only if the raw record is permissioned for public IDX display. */
function isIdxDisplayable(p: RawProperty): boolean {
  if ((p.StandardStatus ?? "") !== "Active") return false;
  if (p.InternetEntireListingDisplayYN === false) return false;
  // contains() isn't supported by Realcomp's OData, so this check runs here.
  if (!(p.SyndicateTo ?? "").includes(IDX_SYNDICATION_TOKEN)) return false;
  return true;
}

/**
 * Populate each listing's `photos` via a single, lightweight Media query.
 *
 * Why separate: `$expand=Media` on the Property query pulls *every* photo for
 * every listing (~500KB, ~2s), and `$top`/`$orderby` inside the expand are
 * catastrophically slow (26–85s). Querying the Media resource directly for just
 * the shown listings, capped to the first few photos (Order lt 5), returns the
 * primary image for all of them in ~230ms / ~20KB. Best-effort: a failure here
 * leaves photos empty rather than breaking the page.
 */
async function attachPhotos(
  listings: IdxListing[],
  cfg: { base: string },
  token: string
): Promise<void> {
  const keys = listings.map((l) => l.listingKey).filter(Boolean);
  if (keys.length === 0) return;

  // Chunk to keep the OR filter a sane length.
  const chunkSize = 25;
  const byKey = new Map<string, RawMedia[]>();

  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunk = keys.slice(i, i + chunkSize);
    const ors = chunk.map((k) => `ResourceRecordKey eq '${k}'`).join(" or ");
    const filter = `(${ors}) and Order lt 5`;
    const url =
      `${cfg.base}/odata/Media` +
      `?$top=2000` +
      `&$select=${encodeURIComponent("ResourceRecordKey,MediaURL,Order,MediaType,MediaStatus")}` +
      `&$filter=${encodeURIComponent(filter)}`;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) continue;
      const rows = ((await res.json()) as { value?: RawMedia[] }).value ?? [];
      for (const m of rows) {
        const k = m.ResourceRecordKey;
        if (!k) continue;
        const arr = byKey.get(k) ?? [];
        arr.push(m);
        byKey.set(k, arr);
      }
    } catch {
      /* best-effort — leave these listings without photos */
    }
  }

  for (const l of listings) {
    l.photos = pickPhotos(byKey.get(l.listingKey));
  }
}

async function fetchFeaturedUncached(q: FeaturedQuery): Promise<IdxListing[]> {
  const cfg = getIdxConfig();
  const token = await getAccessToken();

  const minPrice = q.minPrice ?? 1_000_000;
  const limit = q.limit ?? 9;

  // Server-side filter uses only scalar clauses Realcomp's OData supports fast
  // (no contains(), no $orderby — both are slow/unsupported). SyndicateTo and
  // ordering are handled client-side below. We over-fetch a little so that the
  // client-side SyndicateTo filter still leaves us enough listings.
  const clauses = [
    "StandardStatus eq 'Active'",
    `ListPrice gt ${minPrice}`,
    "InternetEntireListingDisplayYN eq true",
    "PropertySubType eq 'SingleFamilyResidence'",
  ];
  if (q.county) clauses.push(`CountyOrParish eq '${q.county}'`);
  const filter = clauses.join(" and ");

  // Photos come from a separate Media query (see attachPhotos), so no $expand.
  const fetchTop = Math.min(limit + 10, 60);
  const url =
    `${cfg.base}/odata/Property` +
    `?$top=${fetchTop}` +
    `&$select=${encodeURIComponent(SELECT)}` +
    `&$filter=${encodeURIComponent(filter)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Realcomp Property query failed: ${res.status}`);
  }
  const json = (await res.json()) as { value?: RawProperty[] };
  const raw = json.value ?? [];

  let listings = raw.filter(isIdxDisplayable).map(normalize);

  if (q.cities && q.cities.length > 0) {
    const wanted = q.cities.map((c) => c.toLowerCase());
    listings = listings.filter(
      (l) => l.city && wanted.includes(l.city.toLowerCase())
    );
  }

  // Sort highest-price first (nulls last), cap, then attach photos.
  listings.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  const top = listings.slice(0, limit);
  await attachPhotos(top, cfg, token);
  return top;
}

/**
 * Fetch compliant featured IDX listings, cached for 1 hour (< Realcomp's 12h
 * staleness cap). Safe to call from Server Components and GET route handlers.
 */
export async function getFeaturedListings(
  q: FeaturedQuery = {}
): Promise<IdxListing[]> {
  const key = JSON.stringify({
    minPrice: q.minPrice ?? 1_000_000,
    county: q.county ?? null,
    cities: q.cities ?? null,
    limit: q.limit ?? 9,
  });
  const cached = unstable_cache(
    () => fetchFeaturedUncached(q),
    ["idx-featured", IDX_CACHE_VERSION, key],
    { revalidate: 3600, tags: ["idx", "idx-featured"] }
  );
  return cached();
}

// ---- Location search (powers /homes) ---------------------------------------

async function searchUncached(
  locationInput: string,
  limit: number
): Promise<SearchResult> {
  const resolved = resolveLocation(locationInput);

  // Unrecognized location → no API call, empty result with the typed text.
  if (resolved.kind === "unknown") {
    return { listings: [], resolved: "unknown", label: resolved.raw, query: locationInput };
  }

  const cfg = getIdxConfig();
  const token = await getAccessToken();

  const clauses = [
    "StandardStatus eq 'Active'",
    "PropertyType eq 'Residential'", // for-sale only — excludes ResidentialLease
    "InternetEntireListingDisplayYN eq true",
  ];
  if (resolved.kind === "zip") {
    clauses.push(`PostalCode eq '${resolved.zip}'`);
  } else {
    const ors = resolved.postalCities.map((pc) => `PostalCity eq '${pc}'`).join(" or ");
    clauses.push(`(${ors})`);
  }
  const filter = clauses.join(" and ");

  // Over-fetch a small buffer so the client-side SyndicateTo filter still
  // leaves a full page. No $orderby (slow) and no Media $expand (slow) — we
  // sort client-side and pull photos in a separate fast query.
  const fetchTop = Math.min(limit + 10, 60);
  const url =
    `${cfg.base}/odata/Property` +
    `?$top=${fetchTop}` +
    `&$select=${encodeURIComponent(SELECT)}` +
    `&$filter=${encodeURIComponent(filter)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Realcomp search query failed: ${res.status}`);
  }
  const json = (await res.json()) as { value?: RawProperty[] };
  const listings = (json.value ?? [])
    .filter(isIdxDisplayable)
    .map(normalize)
    .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    .slice(0, limit);

  await attachPhotos(listings, cfg, token);

  return {
    listings,
    resolved: resolved.kind,
    label: resolved.label,
    query: locationInput,
  };
}

/**
 * Compliant IDX location search for the /homes page. Cached per (location,
 * limit) for 1 hour — under Realcomp's 12h staleness cap.
 */
export async function searchListings(
  locationInput: string,
  limit = 24
): Promise<SearchResult> {
  const normalized = (locationInput ?? "").trim().toLowerCase();
  const cached = unstable_cache(
    () => searchUncached(locationInput, limit),
    ["idx-search", IDX_CACHE_VERSION, normalized, String(limit)],
    { revalidate: 3600, tags: ["idx", "idx-search"] }
  );
  return cached();
}

/** Standard Realcomp IDX disclaimer that must display with IDX results. */
export const IDX_DISCLAIMER =
  "IDX provided courtesy of Realcomp II Ltd., via Real Estate Market Center. " +
  "The information provided is for consumers' personal, non-commercial use and " +
  "may not be used for any purpose other than to identify prospective properties " +
  "consumers may be interested in purchasing. All information deemed reliable but " +
  "not guaranteed and should be independently verified.";
