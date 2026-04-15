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
      className="relative py-24 overflow-hidden bg-[#0B1733]"
    >
      <div className="absolute inset-0 glow-orange opacity-50 -z-0" />
      <div className="absolute inset-0 grid-overlay opacity-40 -z-0" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="text-white">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.2em] mb-3">
              Free · 24-hour turnaround
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              What's your home actually worth?
            </h2>
            <p className="text-lg text-white/75 mb-8 leading-relaxed">
              Zestimates are off by 10% on average. Get a real valuation from a
              local broker who knows your street — not an algorithm. Detailed
              report, no cost, no obligation.
            </p>
            <ul className="space-y-2.5 text-white/75">
              {[
                "Comps from the last 90 days",
                "Current neighborhood trends",
                "Upgrades worth doing (and ones that aren't)",
                "A realistic list-price range you can take to the bank",
              ].map((p) => (
                <li key={p} className="flex gap-3 text-[15px]">
                  <svg
                    className="w-4 h-4 text-orange-400 flex-shrink-0 mt-[4px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {status === "ok" ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                You're all set.
              </h3>
              <p className="text-slate-600">
                Your valuation arrives within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] space-y-4"
            >
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Request your valuation
              </h3>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Property address"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
              />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3.5 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/5 text-slate-900 transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base shadow-[0_10px_30px_-10px_rgba(249,115,22,0.6)] transition-all disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send me my valuation →"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600 text-center">{err}</p>
              )}
              <p className="text-xs text-slate-500 text-center pt-1">
                Private. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
