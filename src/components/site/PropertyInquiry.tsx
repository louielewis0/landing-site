"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * PropertyInquiry — the "Learn more about this property" form on a listing
 * detail page. Writes a lead straight into Supabase `leads` (same path as the
 * contact form + registration gate), tagged source "idx-detail" with the
 * listing address/MLS# in the message, so it fires the live CRM alert pipeline.
 */
export default function PropertyInquiry({
  listingLabel,
  listingId,
}: {
  listingLabel: string;
  listingId: string | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `I'd like more information about ${listingLabel}.`
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const ref = listingId ? ` (MLS# ${listingId})` : "";
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      intent: "buyer",
      source: "idx-detail",
      message: `${message}\n\n— Inquiry about ${listingLabel}${ref}`,
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="pi-card pi-done">
        <div className="pi-check" aria-hidden>✓</div>
        <h3>Request sent</h3>
        <p>Thanks! A Real Estate Market Center agent will reach out shortly about this home.</p>
      </div>
    );
  }

  return (
    <div className="pi-card">
      <h3 className="pi-title">Learn more about this property</h3>
      <p className="pi-sub">Get full details, disclosures, or schedule a private showing.</p>
      <form onSubmit={handleSubmit} className="pi-form">
        <input className="pi-input" type="text" placeholder="Full name" autoComplete="name"
          value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="pi-input" type="email" placeholder="Email address" autoComplete="email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="pi-input" type="tel" placeholder="Phone number" autoComplete="tel"
          value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <textarea className="pi-input pi-textarea" rows={3}
          value={message} onChange={(e) => setMessage(e.target.value)} />
        {status === "error" && <div className="pi-err">{err || "Something went wrong. Please try again."}</div>}
        <button type="submit" className="pi-submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Request information"}
        </button>
      </form>
      <p className="pi-fine">
        By submitting you agree to be contacted by Real Estate Market Center about this property.
      </p>
    </div>
  );
}
