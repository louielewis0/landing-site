"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/config";

/**
 * Fixed site nav — minimal by design (user request): a centered
 * Home Valuation capsule and the phone number in a pill, nothing else.
 * Transparent frosted-white over the hero video, cream once scrolled.
 * Section navigation lives in the footer. Also owns the back-to-top
 * button (shows past 700px).
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav id="site-nav" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          {/* Small 3D logo, top left — home button on every page. */}
          <Link href="/" aria-label={`${company.name} home`} className="nav-logo">
            <Image
              src="/mcr-logo-color-3d.png"
              alt=""
              width={46}
              height={46}
              priority
            />
          </Link>
          {/* Centered valuation capsule — the nav's single CTA. */}
          <Link href="/home-value" className="nav-val-cta">
            <b>Home Valuation</b>
            <span>Free instant estimate</span>
          </Link>
          <a href={`tel:${company.phoneTel}`} className="nav-phone-pill">
            Contact Us
          </a>
        </div>
      </nav>

      <button
        className={`back-to-top ${showTop ? "show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
