"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Inline inquiry form for a listing detail page — used when a property is
 * OFF MARKET but we're the listing agents and may relist. Captures the
 * inquirer straight into the CRM (Supabase leads, source-tagged, property
 * referenced in the message) exactly like ShowingCTA, so it lands in /crm.
 * A broker reaches back — and can notify them if the home returns to market.
 */
export default function ListingInquiry({
  property,
  source = "off-market-inquiry",
}: {
  property: string;
  source?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      setErr("Please add your name and an email or phone so we can reach back.");
      return;
    }
    setStatus("loading");
    setErr("");
    const parts = [`Off-market inquiry for ${property}.`];
    if (msg.trim()) parts.push(`Message: ${msg.trim()}`);
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      message: parts.join(" "),
      intent: "buy",
      lead_type: "buyer",
      transaction_type: "buy",
      priority: "warm",
      status: "new",
      source,
    });
    if (error) {
      setStatus("error");
      setErr("Couldn't send that just now — please try again, or call us.");
      return;
    }
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="lead-card" style={{ textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(217,118,47,0.12)",
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
        <h3>Thanks — we&rsquo;ve got your inquiry.</h3>
        <p style={{ color: "var(--s-muted)", fontSize: 14.5 }}>
          As the listing agents, we&rsquo;ll reach back with details and let you know if {property} returns
          to the market.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="lead-card">
      <h3>Ask about this home</h3>
      <p style={{ color: "var(--s-muted)", fontSize: 13.5, marginBottom: 18 }}>
        It&rsquo;s off market right now, but we&rsquo;re the listing agents. Leave your details and a licensed
        broker will reach back — and let you know if it comes back on.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoComplete="name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" autoComplete="email" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" type="tel" autoComplete="tel" />
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Your questions (and the best way to reach you)"
          rows={3}
          style={{ resize: "vertical" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-gold"
          style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.6 : 1 }}
        >
          {status === "loading" ? "Sending…" : "Send my inquiry →"}
        </button>
      </div>
      {err && <p style={{ color: "#c0392b", fontSize: 13, textAlign: "center", marginTop: 10 }}>{err}</p>}
      <p className="form-note">Your info stays with us. Never shared, never sold.</p>
    </form>
  );
}
