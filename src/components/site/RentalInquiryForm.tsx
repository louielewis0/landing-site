"use client";

import { useState } from "react";

/**
 * Lead-capture form for the 5556 Pine Aires rental. Posts to /api/lead, which
 * saves to the Supabase leads table (CRM) and fires the in-code phone/email
 * alert. source = "listing-5556-pine-aires" so it's attributable.
 */
export default function RentalInquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [moveIn, setMoveIn] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || (!phone.trim() && !email.trim())) {
      setErr("Please add your name and a phone or email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErr("");
    try {
      const parts = [
        "Rental inquiry — 5556 Pine Aires Dr",
        moveIn.trim() ? `move-in: ${moveIn.trim()}` : "",
        message.trim(),
      ].filter(Boolean);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message: parts.join(" · "),
          source: "listing-5556-pine-aires",
          lead_type: "renter",
          intent: "rent",
          transaction_type: "rent",
          address: "5556 Pine Aires Dr, Sterling Heights, MI 48314",
          priority: "hot",
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Something went wrong.");
      setStatus("ok");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="pa-form">
        <div className="pa-form-h">Request received</div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "#44403a" }}>
          Thank you — we&rsquo;ll reach out shortly to schedule your tour. For the
          fastest response, call or text{" "}
          <a href="tel:+12485686081" style={{ color: "#9a7a37", fontWeight: 700 }}>
            (248) 568-6081
          </a>
          .
        </p>
      </div>
    );
  }

  const input: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    fontSize: 15,
    borderRadius: 10,
    border: "1px solid #ddd2bc",
    background: "#fffdf8",
    color: "#1a140c",
    marginBottom: 12,
    fontFamily: "inherit",
  };

  return (
    <form className="pa-form" onSubmit={onSubmit} aria-label="Request a tour">
      <div className="pa-form-h">Request a private tour</div>
      <p style={{ fontSize: 13.5, color: "#6b6456", marginBottom: 18 }}>
        Available now · $1,800/mo. Leave your details and we&rsquo;ll be in touch.
      </p>
      <input style={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Full name" />
      <input style={input} type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
      <input style={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
      <input style={input} placeholder="Preferred move-in (optional)" value={moveIn} onChange={(e) => setMoveIn(e.target.value)} aria-label="Preferred move-in" />
      <textarea style={{ ...input, minHeight: 84, resize: "vertical" }} placeholder="Anything we should know? (optional)" value={message} onChange={(e) => setMessage(e.target.value)} aria-label="Message" />
      {status === "error" && (
        <p style={{ color: "#b23b2e", fontSize: 13, marginBottom: 10 }}>{err}</p>
      )}
      <button type="submit" className="pa-submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request a tour"}
      </button>
      <p style={{ fontSize: 11.5, color: "#8a8372", marginTop: 12, lineHeight: 1.5 }}>
        Or call/text (248) 568-6081. Equal Housing Opportunity.
      </p>
    </form>
  );
}
