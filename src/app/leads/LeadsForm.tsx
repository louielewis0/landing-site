"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type IntentValue = "Buy" | "Sell" | "Both" | "Just browsing";

const INTENT_OPTIONS: IntentValue[] = ["Buy", "Sell", "Both", "Just browsing"];

export default function LeadsForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<IntentValue>("Buy");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      intent,
      message: message.trim() || null,
      source: "leads-page",
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
      <div className="relative rounded-2xl p-10 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] text-center">
        <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
        <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-soft)] flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-light text-bone mb-2">
          Request received.
        </h3>
        <p className="text-bone/65 text-[15px] font-light">
          A broker will reach out — usually within the hour.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl p-7 sm:p-9 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] space-y-4"
    >
      {/* Gold accent hairline matching HeroLeadForm / LeadMagnet pattern */}
      <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      <div className="mb-2">
        <p className="eyebrow mb-3">A real conversation</p>
        <h3 className="font-display text-3xl font-light text-bone tracking-tight">
          Get in touch.
        </h3>
        <p className="text-[13.5px] text-bone/55 mt-2 font-light">
          A real broker reaches out — usually within the hour.
        </p>
      </div>

      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
      />

      <input
        type="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
      />

      {/* Intent — segmented pills matching the HeroLeadForm pattern */}
      <div>
        <label className="block text-[11px] text-bone/45 uppercase tracking-[0.22em] mb-2.5">
          I&rsquo;m looking to
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INTENT_OPTIONS.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setIntent(val)}
              className={`py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-full border transition-all duration-400 ${
                intent === val
                  ? "bg-[var(--gold)] text-ink border-[var(--gold)]"
                  : "bg-transparent text-bone/65 border-bone/20 hover:border-bone/40 hover:text-bone"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything we should know? (optional)"
        rows={4}
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] resize-none transition-all"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-400 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request a callback →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-rust text-center">{err}</p>
      )}

      <p className="text-[11px] text-bone/40 text-center pt-1 tracking-wide">
        Your info stays with us. Never shared, never sold.
      </p>
    </form>
  );
}
