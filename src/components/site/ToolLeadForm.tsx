"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Intent = "buy" | "sell" | "invest" | "other";

/**
 * Compact lead-capture card used as the "gate the upgrade" CTA inside the
 * interactive calculator tools. The calculator itself is always free and
 * instant (value-first, best for ranking + trust); this form captures the
 * lead who wants a broker to verify/personalize their numbers.
 *
 * Uses the same proven client-side leads insert as HeroLeadForm. The
 * `context` string (e.g. a one-line summary of what the user calculated) is
 * folded into the lead's message so the agent has context when they follow up.
 */
export default function ToolLeadForm({
  source,
  intent,
  heading,
  subhead,
  cta = "Send me my report →",
  context,
  successNote = "We've got it. A local broker will reach out — usually within the hour.",
}: {
  source: string;
  intent: Intent;
  heading: string;
  subhead: string;
  cta?: string;
  /** One-line summary of the user's calculation, stored on the lead. */
  context?: string;
  successNote?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      setErr("Name plus an email or phone, and it's on the way.");
      return;
    }
    setStatus("loading");
    setErr("");

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim() || "no-email@marketcenterrealty.com",
      phone: phone.trim() || null,
      intent,
      source,
      message: context ? `🧮 ${context}` : null,
    });

    if (error) {
      setStatus("error");
      setErr("Couldn't send that just now — please try again, or call us.");
      return;
    }
    setStatus("ok");
  }

  const input: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "#fff",
    color: "var(--s-ink)",
    fontFamily: "inherit",
    fontSize: 14.5,
  };

  if (status === "ok") {
    return (
      <div
        style={{
          borderRadius: "var(--s-radius)",
          border: "1px solid rgba(217,118,47,0.4)",
          background: "rgba(217,118,47,0.06)",
          padding: 28,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(217,118,47,0.14)",
            border: "1px solid rgba(217,118,47,0.35)",
            color: "var(--s-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{ fontSize: 20, color: "var(--s-ink)", marginBottom: 8 }}>Request received.</h3>
        <p style={{ color: "var(--s-muted)", fontSize: 14 }}>{successNote}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        borderRadius: "var(--s-radius)",
        border: "1px solid var(--line)",
        background: "#fff",
        padding: 28,
        display: "grid",
        gap: 14,
        boxShadow: "0 20px 50px -24px rgba(25,26,28,0.18)",
      }}
    >
      <div>
        <h3 style={{ fontSize: "clamp(19px, 2.4vw, 23px)", lineHeight: 1.25, color: "var(--s-ink)", marginBottom: 6 }}>
          {heading}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--s-muted)", lineHeight: 1.6 }}>{subhead}</p>
      </div>
      <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="email" />
        <input style={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" type="tel" autoComplete="tel" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-gold"
        style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.6 : 1 }}
      >
        {status === "loading" ? "Sending…" : cta}
      </button>
      {err && <p style={{ color: "#c0392b", fontSize: 13, textAlign: "center" }}>{err}</p>}
      <p style={{ fontSize: 11.5, color: "var(--s-muted)", textAlign: "center" }}>
        Your info stays with us. Never shared, never sold.
      </p>
    </form>
  );
}
