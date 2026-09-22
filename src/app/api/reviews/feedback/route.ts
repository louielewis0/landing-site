import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/reviews/feedback
 *
 * Sub-5-star private feedback from the public /reviews page. Inserts
 * one row into public.public_feedback. Uses the anon Supabase client
 * (RLS allows anon INSERT — see supabase/public_feedback.sql); RLS
 * remains the safety net even if a future bug in this handler tries
 * to write anything else.
 *
 * Body:
 *   rating:  1 | 2 | 3 | 4   (5 is REJECTED — 5-star traffic goes through
 *                              /api/reviews/google-link, not here)
 *   comment: string | null
 *   name:    string | null
 *   email:   string | null
 *
 * The route also captures user_agent server-side so the agent has
 * minimal context when reviewing feedback later — useful for spotting
 * obvious spam.
 */

type Body = {
  rating?: unknown;
  comment?: unknown;
  name?: unknown;
  email?: unknown;
};

function pickString(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Body;

  // Rating must be one of 1, 2, 3, 4. 5 is explicitly rejected — that
  // path is the redirect-token route, not this one.
  if (
    typeof body.rating !== "number" ||
    !Number.isInteger(body.rating) ||
    body.rating < 1 ||
    body.rating > 4
  ) {
    return NextResponse.json(
      { error: "rating must be an integer between 1 and 4" },
      { status: 400 },
    );
  }

  const payload = {
    rating: body.rating,
    comment: pickString(body.comment, 4000),
    name: pickString(body.name, 200),
    email: pickString(body.email, 320),
    source: "reviews-page",
    user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
  };

  const { error } = await supabase.from("public_feedback").insert(payload);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
