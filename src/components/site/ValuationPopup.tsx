"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Scroll-depth valuation popup — the site's highest-converting offer
 * (instant home estimate) shown to engaged readers. Fires once per
 * session at ~55% scroll depth, never on /home-value or /crm, and
 * waits so it doesn't stack on Maya's corner teaser (which fires
 * early at 450px / 8s).
 */

const KEY = "remc-val-popup";

export default function ValuationPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/home-value") || pathname.startsWith("/crm")) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {}
    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const doc = document.documentElement;
      const depth = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (depth > 0.55 && window.scrollY > 900) {
        fired = true;
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        window.dispatchEvent(new Event("remc-val-open"));
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const focusables = card.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !card.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocusRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="vp-overlay" role="dialog" aria-modal="true" aria-labelledby="vp-title" onClick={() => setOpen(false)}>
      <div className="vp-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
        <button className="vp-close" aria-label="Close" ref={closeRef} onClick={() => setOpen(false)}>
          &times;
        </button>
        <div className="vp-eyebrow">Free &middot; 60 seconds</div>
        <h3 id="vp-title">
          What&rsquo;s your home worth
          <br />
          <span>in today&rsquo;s market?</span>
        </h3>
        <p>
          Metro Detroit values moved again this year. See your instant
          estimate now, then a licensed broker verifies your number
          personally. No cost, no obligation.
        </p>
        <Link href="/home-value" className="vp-cta" onClick={() => setOpen(false)}>
          Get My Free Estimate
        </Link>
        <button className="vp-later" onClick={() => setOpen(false)}>
          Maybe later
        </button>
      </div>
    </div>
  );
}
