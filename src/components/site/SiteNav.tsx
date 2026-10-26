"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { company } from "@/lib/config";

/**
 * Site nav (DOBI-inspired): logo left, links pinned top-right, no phone pill.
 * "About Us" is a dropdown (About RMC / Meet Our Team / Reviews). On mobile a
 * hamburger opens a full menu, since the links are hidden on small screens.
 */
export default function SiteNav() {
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const aboutLinks = [
    { label: "About Real Estate Market Center", href: "/about" },
    { label: "Meet Our Team", href: "/meet-sundus-lewis" },
    { label: "Reviews & Testimonials", href: "/reviews" },
  ];

  return (
    <>
      <div className="t-nav">
        <Link href="/" className="t-nav-brand" aria-label={`${company.name} home`}>
          <Image src="/mcr-logo-color-3d.png" alt={company.name} width={64} height={64} priority />
        </Link>

        {/* Desktop links, pinned right */}
        <nav className="t-nav-links" aria-label="Primary">
          <Link href="/homes">Buy</Link>
          <Link href="/home-value">Sell</Link>
          <div className="t-nav-dd">
            <button type="button" className="t-nav-dd-trigger" aria-haspopup="true">
              About Us <ChevronDown width={14} height={14} aria-hidden />
            </button>
            <div className="t-nav-dd-menu">
              {aboutLinks.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
          <Link href="/contact">Contact Us</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="t-nav-burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu width={26} height={26} />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="t-nav-mobile" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="t-nav-mobile-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X width={26} height={26} />
          </button>
          <nav className="t-nav-mobile-links" onClick={() => setMenuOpen(false)}>
            <Link href="/homes">Buy</Link>
            <Link href="/home-value">Sell</Link>
            {aboutLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
            <Link href="/contact">Contact Us</Link>
          </nav>
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
