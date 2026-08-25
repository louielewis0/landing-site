import "server-only";

/**
 * Free address → lat/lng geocoding, no API key. Tries the US Census
 * Bureau geocoder first (fast, batch-friendly, made for US addresses),
 * falls back to OpenStreetMap Nominatim for anything it misses. Both
 * are free; Nominatim asks for a descriptive User-Agent + ~1 req/sec,
 * so callers geocode sequentially with a small delay.
 */

export type GeoResult = { lat: number; lng: number } | null;

async function censusGeocode(address: string): Promise<GeoResult> {
  const url =
    "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress" +
    `?address=${encodeURIComponent(address)}` +
    "&benchmark=Public_AR_Current&format=json";
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      result?: { addressMatches?: { coordinates?: { x: number; y: number } }[] };
    };
    const c = data.result?.addressMatches?.[0]?.coordinates;
    if (c && typeof c.x === "number" && typeof c.y === "number") {
      return { lat: c.y, lng: c.x };
    }
    return null;
  } catch {
    return null;
  }
}

async function nominatimGeocode(address: string): Promise<GeoResult> {
  const url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
    encodeURIComponent(address);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "MarketCenterRealtyCRM/1.0 (marketcenterrealty.com)" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { lat: string; lon: string }[];
    const hit = data[0];
    if (hit) return { lat: parseFloat(hit.lat), lng: parseFloat(hit.lon) };
    return null;
  } catch {
    return null;
  }
}

/** Geocode a single address. Census first, Nominatim fallback. */
export async function geocodeAddress(address: string): Promise<GeoResult> {
  const census = await censusGeocode(address);
  if (census) return census;
  return nominatimGeocode(address);
}
