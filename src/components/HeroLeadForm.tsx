"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Intent = "buy" | "sell" | "invest" | "other";

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
      <div className="rounded-2xl p-10 bg-bone/95 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] border border-bone/20">
        <div className="w-14 h-14 rounded-full bg-[var(--gold)]/15 text-[var(--gold-deep)] flex items-center justify-center mx-auto mb-5 border border-[var(--gold)]/30">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-light text-ink mb-2 text-center">
          Request received.
        </h3>
        <p className="text-ink/65 text-center text-[15px]">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl p-7 sm:p-9 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] space-y-4"
    >
      {/* gold corner accent */}
      <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

      <div>
        <p className="eyebrow mb-3">A real conversation</p>
        <h3 className="font-display text-3xl font-light text-bone tracking-tight">
          Tell us your move.
        </h3>
        <p className="text-[13.5px] text-bone/55 mt-2">
          A real broker reaches out — usually within the hour.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {([
          ["buy", "Buy"],
          ["sell", "Sell"],
          ["invest", "Invest"],
          ["other", "Other"],
        ] as [Intent, string][]).map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => setIntent(val)}
            className={`py-2.5 text-xs font-semibold tracking-[0.18em] uppercase rounded-full border transition-all duration-400 ${
              intent === val
                ? "bg-[var(--gold)] text-ink border-[var(--gold)]"
                : "bg-transparent text-bone/65 border-bone/20 hover:border-bone/40 hover:text-bone"
            }`}
          >
            {label}
          </button>
        ))}
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
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
      />

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-400 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request a callback →"}
      </button>

      {status === "error" && (
        <p className="text-sm text-rust text-center">{message}</p>
      )}

      <p className="text-[11px] text-bone/40 text-center pt-1 tracking-wide">
        Your info stays with us. Never shared, never sold.
      </p>
    </form>
  );
}
