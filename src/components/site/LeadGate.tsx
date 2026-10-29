"use client";

import { useEffect, useRef, useState } from "react";
import { submitLead } from "@/lib/submit-lead";

/**
 * LeadGate — a scroll-triggered registration wall for the IDX listings page.
 *
 * Compliance: Realcomp's IDX Rules do not prohibit requiring consumer
 * registration (the word "registration" does not appear in them), and Realcomp
 * runs its own lead-delivery system — so a signup gate is permitted. Rule
 * 18.3.8 only requires that a *search* be able to return up to 500 listings;
 * a gate doesn't cap results, so it's clear. We still show the first screen of
 * listings + the required disclaimer before the gate appears.
 *
 * Behavior: once the visitor scrolls past the first view, a modal covers the
 * rest and body scroll locks until they register (or they've registered
 * before, remembered in localStorage). Submitting writes a lead straight into
 * Supabase `leads` (same path as ContactForm) which fires the existing
 * email + Pushover alert pipeline.
 */

const STORAGE_KEY = "rmc_idx_registered";

function alreadyRegistered(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.4 35.9 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export default function LeadGate({ location }: { location?: string }) {
  const [gated, setGated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");
  const [googleNote, setGoogleNote] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Arm the scroll trigger (unless the visitor already registered).
  useEffect(() => {
    if (alreadyRegistered()) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setGated(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + focus the first field while the gate is up.
  useEffect(() => {
    if (!gated) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gated]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErr("");

    const { error } = await submitLead({
      name,
      email,
      phone,
      intent: "buyer",
      source: "idx-gate",
      message: location
        ? `Registered while browsing ${location} listings`
        : "Registered while browsing listings",
    });

    if (error) {
      setStatus("error");
      setErr(error.message);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode — fine, they just may be asked again next visit */
    }
    setStatus("ok");
    // Let the success state show briefly, then release the gate.
    setTimeout(() => setGated(false), 1200);
  }

  if (!gated) return null;

  return (
    <div className="lg-overlay" role="dialog" aria-modal="true" aria-labelledby="lg-title">
      <div className="lg-card">
        {status === "ok" ? (
          <div className="lg-done">
            <div className="lg-check" aria-hidden>✓</div>
            <h2 id="lg-title">You&rsquo;re in.</h2>
            <p>Keep browsing{location ? ` ${location}` : ""} — we&rsquo;ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <div className="lg-eyebrow">Real Estate Market Center</div>
            <h2 id="lg-title" className="lg-title">
              See every home{location ? ` in ${location}` : ""}
            </h2>
            <p className="lg-sub">Create your free account to keep browsing and save your favorites.</p>

            <button type="button" className="lg-google" onClick={() => setGoogleNote(true)}>
              <GoogleG /> Continue with Google
            </button>
            {googleNote && (
              <p className="lg-google-note">Google sign-in is being set up — continue with your details below for now.</p>
            )}

            <div className="lg-or"><span>or</span></div>

            <form onSubmit={handleSubmit} className="lg-form">
              <input
                ref={firstFieldRef}
                className="lg-input"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="lg-input"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="lg-input"
                type="tel"
                placeholder="Phone number"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {status === "error" && <div className="lg-err">{err || "Something went wrong. Please try again."}</div>}
              <button type="submit" className="lg-submit" disabled={status === "loading"}>
                {status === "loading" ? "Creating account…" : "Continue"}
              </button>
            </form>

            <p className="lg-fine">
              By continuing you agree to be contacted by Real Estate Market Center about your home search.
              Message &amp; data rates may apply.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
