"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { company } from "@/lib/config";

/**
 * NewsletterSignup — sitewide "Get The Mile Detroit" module (RMC's owned
 * newsletter). Styled as a classic newspaper subscription box to match The
 * Mile's blackletter brand. Captures the email into Supabase `leads` with
 * source "newsletter-the-mile" (owned list, exportable) — a direct anon insert
 * so it does NOT fire the hot-lead alert pipeline. Also links out to
 * themiledetroit.com, driving traffic to the publication.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const addr = email.trim();
    if (!addr) return;
    setStatus("loading");
    setErr("");
    const { error } = await supabase.from("leads").insert({
      name: addr,
      email: addr,
      source: "newsletter-the-mile",
      status: "new",
      message: "Subscribed to The Mile Detroit newsletter via marketcenterrealty.com",
    });
    if (error) {
      setStatus("error");
      setErr("Couldn't sign you up just now — please try again.");
      return;
    }
    setStatus("ok");
  }

  return (
    <section className="nl-band" aria-label="Subscribe to The Mile Detroit newsletter">
      <div className="nl-box">
        <div className="nl-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/the-mile-masthead.png" alt="The Mile Detroit" className="nl-masthead" />
        </div>
        <div className="nl-eyebrow">The Metro Detroit real estate newsletter</div>

        {status === "ok" ? (
          <div className="nl-done">
            <p>
              <strong>You&rsquo;re in.</strong> Watch your inbox for the next issue.
            </p>
            <a href="https://themiledetroit.com" target="_blank" rel="noopener noreferrer" className="nl-readlink">
              Read the latest at themiledetroit.com &rarr;
            </a>
          </div>
        ) : (
          <>
            <p className="nl-sub">
              Market reports, neighborhood deep-dives, and the Metro Detroit real
              estate stories that matter &mdash; free, every week. Published by {company.name}.
            </p>
            <form onSubmit={submit} className="nl-form">
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="nl-input"
                aria-label="Email address"
                autoComplete="email"
              />
              <button type="submit" className="nl-btn" disabled={status === "loading"}>
                {status === "loading" ? "Subscribing…" : "Subscribe free"}
              </button>
            </form>
            {status === "error" && <div className="nl-err">{err}</div>}
            <a href="https://themiledetroit.com" target="_blank" rel="noopener noreferrer" className="nl-readlink">
              Or browse The Mile Detroit &rarr;
            </a>
          </>
        )}
      </div>
    </section>
  );
}
