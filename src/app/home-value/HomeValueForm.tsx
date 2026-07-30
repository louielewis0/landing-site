"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Instant-valuation funnel.
 *
 * Step 1 — address. Step 2 — contact gate (the lead moment). Then
 * POST /api/valuation: the lead is inserted server-side (source
 * "instant-valuation" → lands in /crm immediately), RentCast's AVM
 * runs live, and the estimate reveals with a count-up. If the AVM is
 * unavailable the flow degrades to "broker valuation within 24h" —
 * the lead is captured either way.
 */

type Estimate = { value: number; low: number; high: number; comps: number };

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function HomeValueForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 4=result 5=pending
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [shown, setShown] = useState(0);
  const rafRef = useRef(0);

  // Count-up reveal for the big number
  useEffect(() => {
    if (step !== 4 || !estimate) return;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(estimate.value * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [step, estimate]);

  async function submit() {
    setErr("");
    setStep(3);
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, phone, address, city, zip, intent: "sell" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error ?? "Something went wrong — call us instead.");
        setStep(2);
        return;
      }
      if (data.estimate) {
        setEstimate(data.estimate);
        setStep(4);
      } else {
        setStep(5);
      }
    } catch {
      setStep(5);
    }
  }

  const input: React.CSSProperties = {
    width: "100%",
    padding: "15px 16px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--cream)",
    color: "var(--s-ink)",
    fontFamily: "inherit",
    fontSize: 15,
  };

  /* ── Step 3: analyzing ── */
  if (step === 3) {
    return (
      <div className="lead-card" style={{ textAlign: "center", padding: "54px 34px" }}>
        <div className="val-spin" aria-hidden />
        <h3 style={{ marginTop: 22 }}>Analyzing {address}…</h3>
        <p style={{ color: "var(--s-muted)", fontSize: 14 }}>
          Pulling recorded sales, comparing nearby homes, weighing recent
          market movement.
        </p>
      </div>
    );
  }

  /* ── Step 4: instant estimate ── */
  if (step === 4 && estimate) {
    const pct = Math.max(
      4,
      Math.min(96, ((estimate.value - estimate.low) / (estimate.high - estimate.low)) * 100)
    );
    return (
      <div className="lead-card" style={{ textAlign: "center", padding: "44px 34px" }}>
        <div className="s-eyebrow" style={{ justifyContent: "center" }}>
          Estimated market value
        </div>
        <div
          style={{
            fontSize: "clamp(44px, 7vw, 64px)",
            fontWeight: 650,
            letterSpacing: "-0.03em",
            color: "var(--navy)",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1.1,
          }}
        >
          {fmt(shown)}
        </div>
        <div style={{ margin: "26px 0 8px" }}>
          <div
            style={{
              position: "relative",
              height: 6,
              borderRadius: 100,
              background: "var(--cream-2)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: `${pct}%`,
                top: -5,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "var(--s-gold)",
                transform: "translateX(-50%)",
                boxShadow: "0 4px 12px rgba(217,118,47,0.5)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: "var(--s-muted)",
              marginTop: 10,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span>{fmt(estimate.low)}</span>
            <span>{fmt(estimate.high)}</span>
          </div>
        </div>
        {estimate.comps > 0 && (
          <p style={{ fontSize: 13.5, color: "var(--s-muted)" }}>
            Based on {estimate.comps} comparable recorded sales near you.
          </p>
        )}
        <div
          style={{
            margin: "20px 0 0",
            padding: "16px 18px",
            borderRadius: 14,
            background: "rgba(217,118,47,0.07)",
            border: "1px solid rgba(217,118,47,0.25)",
            fontSize: 14,
            color: "var(--s-ink)",
            textAlign: "left",
          }}
        >
          <b>What happens next:</b> a licensed broker reviews your property
          against live MLS data and sends your verified range within 24
          hours — automated estimates can miss upgrades, condition, and
          street-level demand.
        </div>
        <p className="form-note">
          Automated estimate — not an appraisal or broker price opinion.
        </p>
      </div>
    );
  }

  /* ── Step 5: pending (no AVM available) ── */
  if (step === 5) {
    return (
      <div className="lead-card" style={{ textAlign: "center", padding: "44px 34px" }}>
        <div className="s-eyebrow" style={{ justifyContent: "center" }}>
          Request received
        </div>
        <h3>Your valuation is being prepared.</h3>
        <p style={{ color: "var(--s-muted)", fontSize: 14.5 }}>
          A licensed broker is running your property against live MLS
          comps. Expect your number within 24 hours — usually much sooner.
        </p>
      </div>
    );
  }

  /* ── Steps 1 & 2 ── */
  return (
    <div className="lead-card">
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {[1, 2].map((s) => (
          <span
            key={s}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 100,
              background: step >= s ? "var(--s-gold)" : "var(--cream-2)",
              transition: "background .3s",
            }}
          />
        ))}
      </div>

      {step === 1 ? (
        <>
          <h3>Where&rsquo;s the property?</h3>
          <p style={{ color: "var(--s-muted)", fontSize: 13.5, marginBottom: 18 }}>
            Instant estimate, powered by recorded-sale data.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              style={input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address — e.g. 2032 E Square Lake Rd"
              autoComplete="street-address"
            />
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: 12 }}>
              <input
                style={input}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                autoComplete="address-level2"
              />
              <input
                style={input}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="ZIP"
                inputMode="numeric"
                autoComplete="postal-code"
              />
            </div>
            <button
              type="button"
              className="btn btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                if (!address.trim() || !city.trim()) {
                  setErr("Enter the street address and city.");
                  return;
                }
                setErr("");
                setStep(2);
              }}
            >
              See my home&rsquo;s value →
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Where should we send the full report?</h3>
          <p style={{ color: "var(--s-muted)", fontSize: 13.5, marginBottom: 18 }}>
            Your estimate appears instantly — the broker-verified report
            follows within 24 hours.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              style={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
            />
            <input
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
            />
            <input
              style={input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              type="tel"
              autoComplete="tel"
            />
            <button
              type="button"
              className="btn btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                if (!name.trim() || (!email.trim() && !phone.trim())) {
                  setErr("Name plus an email or phone, and the number is yours.");
                  return;
                }
                submit();
              }}
            >
              Reveal my estimate →
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: "none",
                border: "none",
                color: "var(--s-muted)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              ← Back to address
            </button>
          </div>
        </>
      )}

      {err && (
        <p style={{ color: "#c0392b", fontSize: 13, textAlign: "center", marginTop: 12 }}>{err}</p>
      )}
      <p className="form-note">Your info stays with us. Never shared, never sold.</p>
    </div>
  );
}
