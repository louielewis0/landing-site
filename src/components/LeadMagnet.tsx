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
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div
        className="absolute inset-0 -z-10 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2000&q=80)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">
              Free market report
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's your home actually worth?
            </h2>
            <p className="text-lg text-white/80 mb-6">
              Automated Zestimates are wrong by 10% on average. Get a real
              valuation from a local agent who knows your neighborhood — in
              under 24 hours. Completely free, no obligation.
            </p>
            <ul className="space-y-2 text-white/80">
              {[
                "Comparable sales from the last 90 days",
                "Current market trends in your neighborhood",
                "Repairs/upgrades with the highest ROI",
                "Realistic list-price range",
              ].map((p) => (
                <li key={p} className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {status === "ok" ? (
            <div className="bg-white rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Request received</h3>
              <p className="text-slate-600">
                You'll get your custom valuation in your inbox within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-2xl space-y-4"
            >
              <h3 className="text-2xl font-bold text-slate-900">Get Your Free Valuation</h3>
              <input
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Property address"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 text-slate-900"
              />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 text-slate-900"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 text-slate-900"
              />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 text-slate-900"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send My Free Report →"}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600 text-center">{err}</p>
              )}
              <p className="text-xs text-slate-500 text-center">
                🔒 100% private. No spam. Delete anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
