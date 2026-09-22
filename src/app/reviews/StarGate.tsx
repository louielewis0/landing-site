"use client";

import { useState } from "react";
import { Star, CheckCircle2, AlertCircle, Lock } from "lucide-react";

/**
 * /reviews — rating-gated capture surface (cream/navy theme).
 *
 * 5★ → POST /api/reviews/google-link → server validates rating === 5 →
 *      returns the URL from a server-only env var → opens Google in a new
 *      tab (URL never in the client bundle).
 * 1–4★ → private feedback form ("what could we do better") → POST
 *        /api/reviews/feedback → records feedback AND inserts a lead into
 *        the CRM (source "review-feedback") for fast follow-up.
 *
 * Only the presentation is themed here; the gating logic, the iOS-Safari
 * synchronous window.open, and the submit flow are unchanged.
 */

type Status =
  | "selecting"
  | "redirecting"
  | "feedback"
  | "submitting"
  | "thank-you"
  | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "#fff",
  color: "var(--s-ink)",
  fontFamily: "inherit",
  fontSize: 14.5,
};

export default function StarGate() {
  const [status, setStatus] = useState<Status>("selecting");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleStarClick(rating: number) {
    if (status !== "selecting") return;
    setSelectedRating(rating);
    setErrorMsg("");

    if (rating === 5) {
      // Open placeholder tab SYNCHRONOUSLY before any await (iOS Safari
      // only honors window.open while attached to the user gesture).
      const win = window.open("", "_blank");
      setStatus("redirecting");
      try {
        const res = await fetch("/api/reviews/google-link", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ rating: 5 }),
        });
        if (!res.ok) {
          throw new Error("We couldn't open Google right now. Please try again in a moment.");
        }
        const data = (await res.json()) as { url?: string };
        if (!data.url) throw new Error("Missing redirect URL.");
        if (win && !win.closed) {
          win.location.href = data.url;
          changeRating();
        } else {
          window.location.href = data.url;
        }
      } catch (e) {
        if (win && !win.closed) win.close();
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      }
    } else {
      setStatus("feedback");
    }
  }

  function changeRating() {
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
    if (!Number.isInteger(selectedRating) || selectedRating < 1 || selectedRating > 4) return;
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
        const errBody = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errBody.error ?? "Couldn't submit feedback. Please try again.");
      }
      setStatus("thank-you");
    } catch (e) {
      setStatus("feedback");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  const renderStars = (interactive: boolean) => (
    <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
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
            style={{ background: "none", border: "none", padding: 0, cursor: interactive ? "pointer" : "default", transition: "transform .15s" }}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            <Star
              width={46}
              height={46}
              style={{ color: filled ? "var(--s-gold)" : "rgba(25,26,28,0.16)", transition: "color .3s" }}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );

  /* ── Selecting ── */
  if (status === "selecting") {
    return (
      <div id="rating">
        {renderStars(true)}
        <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginTop: 20, letterSpacing: "0.02em" }}>
          Tap a star to rate your experience
        </p>
      </div>
    );
  }

  /* ── Redirecting (5★) ── */
  if (status === "redirecting") {
    return (
      <div id="rating">
        {renderStars(false)}
        <div style={{ marginTop: 26, display: "inline-flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--s-muted)" }}>
          <span className="animate-spin" style={{ width: 16, height: 16, border: "2px solid var(--s-gold)", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block" }} />
          Opening Google…
        </div>
      </div>
    );
  }

  /* ── Feedback form (1–4★) ── */
  if (status === "feedback" || status === "submitting") {
    return (
      <div id="rating" style={{ maxWidth: 520, margin: "0 auto" }}>
        {renderStars(false)}
        <p style={{ fontSize: 13.5, color: "var(--s-muted)", marginTop: 16, marginBottom: 26 }}>
          You rated us {selectedRating} {selectedRating === 1 ? "star" : "stars"}.{" "}
          <button
            type="button"
            onClick={changeRating}
            style={{ background: "none", border: "none", color: "var(--s-gold)", textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer", fontSize: 13.5 }}
          >
            Change rating
          </button>
        </p>

        <form
          onSubmit={submitFeedback}
          style={{ borderRadius: "var(--s-radius)", border: "1px solid var(--line)", background: "#fff", padding: 28, textAlign: "left", display: "grid", gap: 16, boxShadow: "0 20px 50px -24px rgba(25,26,28,0.18)" }}
        >
          <div>
            <div className="s-eyebrow" style={{ marginBottom: 10 }}>Tell us what happened</div>
            <h3 style={{ fontSize: "clamp(21px, 3vw, 26px)", lineHeight: 1.2, color: "var(--s-ink)", marginBottom: 6 }}>
              Your feedback goes straight to us — privately.
            </h3>
            <p style={{ fontSize: 13.5, color: "var(--s-muted)" }}>
              Not Google. Not public. Just a direct line so we can make it right.
            </p>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What could we have done better?"
            rows={4}
            required
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" autoComplete="name" style={inputStyle} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" autoComplete="email" style={inputStyle} />
          </div>

          <button
            type="submit"
            disabled={status === "submitting" || !comment.trim()}
            className="btn btn-gold"
            style={{ width: "100%", justifyContent: "center", opacity: status === "submitting" || !comment.trim() ? 0.55 : 1 }}
          >
            {status === "submitting" ? "Sending…" : "Send feedback"}
          </button>

          <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 11.5, color: "var(--s-muted)" }}>
            <Lock className="w-3 h-3" />
            Private. Doesn&rsquo;t post anywhere public.
          </p>

          {errorMsg && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#c0392b" }}>
              <AlertCircle className="w-4 h-4" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>
    );
  }

  /* ── Thank-you ── */
  if (status === "thank-you") {
    return (
      <div id="rating" style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(217,118,47,0.12)", border: "1px solid rgba(217,118,47,0.35)", color: "var(--s-gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 className="w-7 h-7" strokeWidth={2} />
        </div>
        <h3 style={{ fontSize: "clamp(24px, 4vw, 32px)", lineHeight: 1.2, color: "var(--s-ink)", marginBottom: 12 }}>
          Thanks for the feedback.
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--s-muted)" }}>
          We appreciate you taking the time to tell us. Your note goes directly to the team — privately —
          and we use every one to do better next time.
        </p>
      </div>
    );
  }

  /* ── Error ── */
  return (
    <div id="rating" style={{ maxWidth: 460, margin: "0 auto" }}>
      {renderStars(false)}
      <div style={{ marginTop: 26, display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "#c0392b", justifyContent: "center" }}>
        <AlertCircle className="w-4 h-4" style={{ flexShrink: 0, marginTop: 2 }} />
        <span>{errorMsg || "Something went wrong."}</span>
      </div>
      <button type="button" onClick={changeRating} className="btn btn-ghost" style={{ marginTop: 22 }}>
        Try again
      </button>
    </div>
  );
}
