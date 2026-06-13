import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/reviews/google-link
 *
 * Gates the Google Business Profile review URL behind a 5-star rating.
 * The URL itself lives in a server-only env var (GOOGLE_REVIEW_URL, no
 * NEXT_PUBLIC_ prefix), so it never ships in the client bundle and is
 * never reachable for sub-5-star paths.
 *
 * Body: { rating: number }
 * 200:  { url: string }     when rating is the integer 5
 * 403:  { error }           for anything else
 * 500:  { error }           if the env var is missing
 *
 * Threat model honesty: this is UX gating, not security gating. Anyone
 * with curl can POST { rating: 5 } and get the URL. The point isn't to
 * lock the URL away from a motivated attacker — it's to keep the link
 * out of the static markup so well-intentioned visitors can't reach
 * Google without first having selected a 5-star rating in the UI.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { rating?: unknown };

  // Strict integer-equality on 5. No truthy weirdness, no "5".
  if (body.rating !== 5) {
    return NextResponse.json({ error: "Not eligible" }, { status: 403 });
  }

  const url = process.env.GOOGLE_REVIEW_URL;
  if (!url) {
    return NextResponse.json(
      { error: "Server misconfigured: GOOGLE_REVIEW_URL not set" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url });
}
