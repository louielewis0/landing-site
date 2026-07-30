"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { company } from "@/lib/config";

/**
 * Fixed site nav — transparent over the hero, blurred cream once
 * scrolled 60px (prototype behavior). Mobile: burger → dropdown card.
 * Also owns the back-to-top button (shows past 700px).
 */
export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "/#services" },
    { label: "Areas", href: "/#areas" },
    { label: "About", href: "/#about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav id="site-nav" className={scrolled ? "scrolled" : ""}>
        <div className="container">
          {/* No logo in the nav — the hero owns the brand. Invisible
              home link keeps the corner clickable + accessible. */}
          <Link
            href="/"
            aria-label={company.name}
            style={{ width: 34, height: 34, display: "block" }}
          />
          <div className="nav-links">
            {links.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-right">
            <a href={`tel:${company.phoneTel}`} className="nav-phone">
              {company.phone}
            </a>
            <Link
              href="/home-value"
              className="btn btn-gold"
              style={{ padding: "11px 22px", fontSize: 13 }}
            >
              Request valuation
            </Link>
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu site-theme" onClick={() => setMenuOpen(false)}>
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a href={`tel:${company.phoneTel}`}>Call {company.phone}</a>
          <Link href="/home-value" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
            Request valuation →
          </Link>
        </div>
      )}

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
