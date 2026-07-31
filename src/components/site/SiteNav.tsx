"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/config";

/**
 * Template nav (user's "Real Estate Market Center.html" design):
 * in-flow bone bar — logo + stacked Space Grotesk wordmark, centered
 * links, phone pill right. Also owns the back-to-top button.
 */
export default function SiteNav() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Sell", href: "/home-value" },
    { label: "Listings", href: "/#listings" },
    { label: "Team", href: "/#about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <div className="t-nav">
        <Link href="/" className="t-nav-brand" aria-label={`${company.name} home`}>
          <Image src="/mcr-logo-color-3d.png" alt={company.name} width={64} height={64} priority />
        </Link>
        <nav className="t-nav-links">
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a href={`tel:${company.phoneTel}`} className="t-nav-phone">
          {company.phone}
        </a>
      </div>

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
