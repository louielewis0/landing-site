"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { company } from "@/lib/config";

/**
 * Standalone contact form for the yard-sign QR code. Phone-first,
 * dead-simple: name + phone (+ optional email/message). Writes a hot
 * lead to the CRM tagged source "yard-sign" so Louie can tell
 * sign-scan leads apart from the website funnel.
 */
export default function ContactPageForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErr("Please add your name and a phone number.");
      return;
    }
    setStatus("loading");
    setErr("");
    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      message: message || "Scanned the yard sign.",
      intent: "other",
      source: "yard-sign",
      priority: "hot",
      status: "new",
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
      <div className="cq-card cq-done">
        <div className="cq-check" aria-hidden>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2>Got it, thank you!</h2>
        <p>
          {name.split(" ")[0]}, a licensed broker will reach out shortly. Need
          us sooner? Call or text {company.phone}.
        </p>
        <a href={`tel:${company.phoneTel}`} className="cq-call">
          Call {company.phone}
        </a>
      </div>
    );
  }

  return (
    <form className="cq-card" onSubmit={submit}>
      <input
        className="cq-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        autoComplete="name"
      />
      <input
        className="cq-input"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
      />
      <input
        className="cq-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email (optional)"
        type="email"
        autoComplete="email"
      />
      <textarea
        className="cq-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What can we help with? (optional)"
        rows={3}
      />
      {err && <p className="cq-err">{err}</p>}
      <button type="submit" className="cq-submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send"}
      </button>
      <p className="cq-note">Your info stays with us. Never shared, never sold.</p>
    </form>
  );
}
