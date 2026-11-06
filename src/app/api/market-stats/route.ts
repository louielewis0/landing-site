import { NextResponse } from "next/server";
import { getMarketStats, getCityMarketStats } from "@/lib/idx/client";
import type { CityMarketStat } from "@/lib/idx/client";

/**
 * GET /api/market-stats — a PUBLIC, read-only feed of aggregate Metro Detroit
 * market statistics for owned-media sites (e.g. The Mile Detroit) to display.
 *
 * Why this exists: Realcomp credentials must never live on a second domain.
 * This route runs on RMC's own server (creds stay here), computes the same
 * first-party aggregates the market-update page uses (via getMarketStats,
 * cached 12h), and returns them as plain JSON with permissive CORS so
 * themiledetroit.com can fetch them client- or server-side.
 *
 * Realcomp compliance: these are AGGREGATE summary figures (counts + average
 * asking prices for ACTIVE residential inventory), not individual listings and
 * not closed-sale data — published with credit to Realcomp II Ltd. No listing
 * detail, address, or MLS number is exposed.
 */

export const dynamic = "force-dynamic";
export const revalidate = 0; // always run the handler; getMarketStats caches 6h internally
export const maxDuration = 30; // per-city aggregates fan out; give them headroom

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
} as const;

export async function GET() {
  try {
    const s = await getMarketStats();

    // Per-city stats are best-effort: a failure here must not take down the
    // county/metro feed, so it falls back to an empty array.
    let cities: CityMarketStat[] = [];
    try {
      cities = await getCityMarketStats();
    } catch {
      cities = [];
    }

    const body = {
      ok: true,
      asOf: s.asOf, // ISO date the figures were computed
      metro: {
        totalForSale: s.totalForSale,
        avgListPrice: Math.round(s.avgListMetro),
        newLast30: s.newLast30,
        luxuryForSale: s.luxuryCount, // active listings $1M+
        avgDaysOnMarket: Math.round(s.avgDaysOnMarket),
      },
      counties: s.counties.map((c) => ({
        county: c.county,
        forSale: c.forSale,
        avgListPrice: Math.round(c.avgList),
      })),
      // Per-city active-inventory stats, sorted by # for sale (desc). Look up
      // by `slug` (troy, birmingham, bloomfield-hills, rochester-hills, …).
      cities: cities.map((c) => ({
        city: c.city,
        slug: c.slug,
        forSale: c.forSale,
        avgListPrice: c.avgListPrice,
        avgDaysOnMarket: c.avgDaysOnMarket,
        newLast30: c.newLast30,
      })),
      source: "Realcomp II Ltd. — active residential listings, Oakland / Macomb / Wayne",
      attribution:
        "Market statistics compiled by Real Estate Market Center from Realcomp II Ltd. data. " +
        "Aggregate figures describe active for-sale inventory and asking prices, not closed sales. " +
        "Information deemed reliable but not guaranteed.",
      publisher: "https://marketcenterrealty.com",
      marketUpdateUrl:
        "https://marketcenterrealty.com/metro-detroit-housing-market-update",
    };
    return NextResponse.json(body, {
      headers: {
        ...CORS,
        // CDN-cache 12h, serve stale up to 24h while revalidating
        // Realcomp §18.2.5 requires refresh at least every 12h. Cap CDN cache
        // at 6h with NO stale-serving so no layer ever hands out data >12h old.
        "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=0",
      },
    });
  } catch {
    // Feed stays up with ok:false so consumers can fall back gracefully.
    return NextResponse.json(
      { ok: false, asOf: null },
      { status: 200, headers: { ...CORS, "Cache-Control": "public, s-maxage=600" } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS });
}
