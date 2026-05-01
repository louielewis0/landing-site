"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeadMagnet() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      intent: "sell",
      message: `Requested valuation for: ${address}`,
      source: "lead-magnet",
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    setStatus("ok");
  }

  return (
    <section
      id="lead-magnet"
      className="relative py-32 overflow-hidden atmosphere"
    >
      <div className="absolute inset-0 grain pointer-events-none" />
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div>
            <p className="eyebrow mb-5">Free · 24-hour turnaround</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-light text-bone leading-[1.04] mb-7">
              <span className="block overflow-hidden">
                <span className="block fade-up">What's your home</span>
              </span>
              <span className="block overflow-hidden">
                <span className="block fade-up delay-1 italic gold-text">actually worth?</span>
              </span>
            </h2>
            <p className="text-[17px] text-bone/65 mb-10 leading-[1.7] font-light max-w-xl fade-up delay-2">
              Zestimates miss by 10% on average. Get a real valuation from a
              local broker who knows your street — not an algorithm. Detailed
              report, no cost, no obligation.
            </p>
            <ul className="space-y-3 max-w-xl fade-up delay-3">
              {[
                "Comps from the last 90 days",
                "Current neighborhood trends",
                "Upgrades worth doing (and ones that aren't)",
                "A realistic list-price range you can take to the bank",
              ].map((p) => (
                <li key={p} className="flex gap-4 text-[15px] text-bone/75">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--gold)]/40 flex items-center justify-center mt-[2px]">
                    <svg
                      className="w-3 h-3 text-[var(--gold-soft)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {status === "ok" ? (
            <div className="rounded-2xl p-12 text-center bg-bone shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] border border-bone/20">
              <div className="w-14 h-14 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold-deep)] flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-3xl font-light text-ink mb-2">
                You're all set.
              </h3>
              <p className="text-ink/65 text-[15px]">Your valuation arrives within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl p-9 bg-bone/[0.06] backdrop-blur-2xl border border-bone/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] space-y-4"
            >
              <span className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

              <div className="mb-2">
                <p className="eyebrow mb-3">Request your valuation</p>
                <h3 className="font-display text-3xl font-light text-bone">
                  Tell us about the property.
                </h3>
              </div>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Property address"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3.5 rounded-lg bg-bone/[0.04] border border-bone/15 text-bone placeholder-bone/35 focus:outline-none focus:border-[var(--gold)]/60 focus:bg-bone/[0.07] transition-all"
              />
              <input
                required
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
                {status === "loading" ? "Sending…" : "Send me my valuation →"}
              </button>
              {status === "error" && (
                <p className="text-sm text-rust text-center">{err}</p>
              )}
              <p className="text-[11px] text-bone/40 text-center pt-1 tracking-wide">
                Private. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
