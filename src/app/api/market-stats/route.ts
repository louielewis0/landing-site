import { NextResponse } from "next/server";
import { getMarketStats } from "@/lib/idx/client";

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

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
} as const;

export async function GET() {
  try {
    const s = await getMarketStats();
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
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
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
