"use client";

import { useState } from "react";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";

/**
 * /reviews — rating-gated capture surface.
 *
 * Single source of truth for entering the reviews flow. Stars are
 * interactive; clicking commits a rating. Two branches:
 *
 *   5★ → POST /api/reviews/google-link → server validates rating === 5 →
 *        returns the URL from a server-only env var → window.location.href
 *        navigates same-tab to Google. The URL is never in the client
 *        bundle, never in the static markup.
 *
 *   1–4★ → no Google. Local feedback form appears (textarea + optional
 *          name + optional email) → POST /api/reviews/feedback → inserts
 *          into public.public_feedback (anon INSERT-only RLS) → thank-you
 *          state.
 *
 * Status state machine:
 *   selecting  → user hasn't clicked a star yet
 *   redirecting → 5★ clicked, waiting on the URL fetch
 *   feedback    → 1–4★ clicked, feedback form open
 *   submitting  → feedback form submit in flight
 *   thank-you   → feedback recorded; private appreciation state
 *   error       → fatal error (redirect URL fetch failed). Has a retry.
 */

type Status =
  | "selecting"
  | "redirecting"
  | "feedback"
  | "submitting"
  | "thank-you"
  | "error";

export default function StarGate() {
  const [status, setStatus] = useState<Status>("selecting");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleStarClick(rating: number) {
    // Block re-clicks once a path has been chosen — agents can refresh
    // to start over. Prevents accidental double-fire.
    if (status !== "selecting") return;

    setSelectedRating(rating);
    setErrorMsg("");

    if (rating === 5) {
      setStatus("redirecting");
      try {
        const res = await fetch("/api/reviews/google-link", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ rating: 5 }),
        });
        if (!res.ok) {
          throw new Error(
            "We couldn't open Google right now. Please try again in a moment.",
          );
        }
        const data = (await res.json()) as { url?: string };
        if (!data.url) throw new Error("Missing redirect URL.");
        // Open Google in a new tab so the user's session on our site
        // stays put. noopener,noreferrer is standard hygiene — the new
        // tab can't reach back into our window.
        window.open(data.url, "_blank", "noopener,noreferrer");
        // Reset the StarGate to its initial state. The visible
        // confirmation is the new tab itself; we don't need a
        // "thanks!" interstitial here.
        changeRating();
      } catch (e) {
        setStatus("error");
        setErrorMsg(
          e instanceof Error ? e.message : "Something went wrong.",
        );
      }
    } else {
      setStatus("feedback");
    }
  }

  function changeRating() {
    // Lets a user back out of the feedback or error states and re-pick.
    setStatus("selecting");
    setSelectedRating(0);
    setHoveredStar(0);
    setComment("");
    setName("");
    setEmail("");
    setErrorMsg("");
  }

  async function submitFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!Number.isInteger(selectedRating) || selectedRating < 1 || selectedRating > 4) {
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/reviews/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          rating: selectedRating,
          comment: comment.trim() || null,
          name: name.trim() || null,
          email: email.trim() || null,
        }),
      });
      if (!res.ok) {
        const errBody = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(
          errBody.error ?? "Couldn't submit feedback. Please try again.",
        );
      }
      setStatus("thank-you");
    } catch (e) {
      setStatus("feedback");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  /* ── Star row — used in selecting + locked-display states ──────────── */
  const renderStars = (interactive: boolean) => (
    <div className="flex justify-center gap-2 sm:gap-3">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (interactive ? hoveredStar || selectedRating : selectedRating);
        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            onClick={() => interactive && handleStarClick(star)}
            disabled={!interactive}
            className={`transition-transform ${
              interactive
                ? "hover:scale-110 active:scale-95 cursor-pointer"
                : "cursor-default"
            }`}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            <Star
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-300 ${
                filled ? "text-[var(--gold)]" : "text-bone/15"
              }`}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );

  /* ── Selecting ─────────────────────────────────────────────────────── */
  if (status === "selecting") {
    return (
      <div id="rating" className="fade-up delay-3">
        {renderStars(true)}
        <p className="text-[13px] text-bone/45 mt-6 font-light tracking-wide">
          Tap a star to rate your experience
        </p>
      </div>
    );
  }

  /* ── Redirecting (5★) ──────────────────────────────────────────────── */
  if (status === "redirecting") {
    return (
      <div id="rating" className="fade-up">
        {renderStars(false)}
        <div className="mt-8 inline-flex items-center gap-3 text-[14px] text-bone/75 font-light">
          <span className="w-4 h-4 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
          Opening Google…
        </div>
      </div>
    );
  }

  /* ── Feedback form (1–4★) ──────────────────────────────────────────── */
  if (status === "feedback" || status === "submitting") {
    return (
      <div id="rating" className="fade-up max-w-lg mx-auto">
        {renderStars(false)}
        <p className="text-[13px] text-bone/45 mt-4 mb-8 font-light tracking-wide">
          You rated us {selectedRating} {selectedRating === 1 ? "star" : "stars"}.
          {" "}
          <button
            type="button"
            onClick={changeRating}
            className="underline underline-offset-2 hover:text-bone/70 transition-colors"
          >
            Change rating
          </button>
        </p>

        <form
          onSubmit={submitFeedback}
          className="relative rounded-2xl p-7 sm:p-8 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] text-left space-y-4"
        >
          <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

          <div>
            <p className="eyebrow mb-3">Tell us what happened</p>
            <h3 className="font-display text-2xl sm:text-3xl font-light text-bone tracking-tight">
              Your feedback goes straight to us — privately.
            </h3>
            <p className="text-[13.5px] text-bone/55 mt-2 font-light">
              Not Google. Not public. Just a direct line so we can fix it.
            </p>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could we have done better?"
            rows={4}
            required
            className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-y transition-all"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              autoComplete="name"
              className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional, for follow-up)"
              autoComplete="email"
              className="px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || !comment.trim()}
            className="w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-400 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send feedback"}
          </button>

          <p className="flex items-center justify-center gap-2 text-[11.5px] text-bone/45 tracking-wide pt-1">
            <Lock className="w-3 h-3" />
            Private. Doesn&rsquo;t post anywhere public.
          </p>

          {errorMsg && (
            <div className="flex items-start gap-2 text-[13px] text-rust">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    );
  }

  /* ── Thank-you (post-feedback) ─────────────────────────────────────── */
  if (status === "thank-you") {
    return (
      <div id="rating" className="fade-up max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-soft)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-7 h-7" strokeWidth={2} />
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-light text-bone tracking-tight mb-4">
          Thanks for the feedback.
        </h3>
        <p className="text-[15px] text-bone/65 font-light leading-relaxed">
          We appreciate you taking the time to tell us. Your note goes
          directly to the team — privately — and we use every one of them
          to do better next time.
        </p>
      </div>
    );
  }

  /* ── Error (redirect URL fetch failed) ─────────────────────────────── */
  return (
    <div id="rating" className="fade-up max-w-md mx-auto">
      {renderStars(false)}
      <div className="mt-8 flex items-start gap-2 text-[14px] text-rust justify-center">
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span>{errorMsg || "Something went wrong."}</span>
      </div>
      <button
        type="button"
        onClick={changeRating}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 text-[13px] tracking-wide transition-all duration-500"
      >
        Try again
      </button>
    </div>
  );
}
