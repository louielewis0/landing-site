"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Intent = "buy" | "sell" | "invest" | "other";

/**
 * Lead-capture card. Submission logic unchanged (Supabase leads
 * insert, source tag). Styled as a clean white card for the light
 * Tiny-Villa-reference design.
 */
export default function HeroLeadForm({ source = "hero" }: { source?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState<Intent>("buy");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { error } = await supabase
      .from("leads")
      .insert({ name, email, phone, intent, source });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ok");
    setMessage("We've got your info. Expect a call within the hour.");
    setName("");
    setEmail("");
    setPhone("");
  }

  if (status === "ok") {
    return (
      <div className="lead-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(217,118,47,0.12)",
            border: "1px solid rgba(217,118,47,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            color: "var(--s-gold)",
          }}
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3>Request received.</h3>
        <p style={{ color: "var(--s-muted)", fontSize: 14.5 }}>{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lead-card">
      <h3>Tell us your move.</h3>
      <p style={{ color: "var(--s-muted)", fontSize: 13.5, marginBottom: 20 }}>
        A real broker reaches out — usually within the hour.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
        {(
          [
            ["buy", "Buy"],
            ["sell", "Sell"],
            ["invest", "Invest"],
            ["other", "Other"],
          ] as [Intent, string][]
        ).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setIntent(val)}
            style={{
              padding: "10px 0",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 100,
              cursor: "pointer",
              transition: "all .3s",
              border: intent === val ? "1px solid var(--navy)" : "1px solid var(--line)",
              background: intent === val ? "var(--navy)" : "transparent",
              color: intent === val ? "#fff" : "var(--s-muted)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-gold"
          style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? "Sending…" : "Request a callback →"}
        </button>
      </div>

      {status === "error" && (
        <p style={{ color: "#c0392b", fontSize: 13, textAlign: "center", marginTop: 10 }}>
          {message}
        </p>
      )}

      <p className="form-note">Your info stays with us. Never shared, never sold.</p>
    </form>
  );
}
