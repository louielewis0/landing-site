"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

/**
 * Homepage "On the market" section. The featured (real) listing card
 * opens an in-page photo lightbox on click — the house photos live in
 * the gallery popup, not spread across the detail page. The other two
 * cards are plain links.
 */

const HASTINGS_PHOTOS = [
  { src: "/listing/hastings/1.jpg", alt: "Front exterior — brick colonial with covered entry and two-car garage" },
  { src: "/listing/hastings/2.jpg", alt: "Updated kitchen with granite counters and stainless appliances" },
  { src: "/listing/hastings/3.jpg", alt: "Open living room with fireplace" },
  { src: "/listing/hastings/4.jpg", alt: "Dining area with doorwall to the backyard patio" },
  { src: "/listing/hastings/5.jpg", alt: "Spacious bedroom with natural light" },
  { src: "/listing/hastings/6.jpg", alt: "Finished basement with rec and gym space" },
];

const CARDS = [
  {
    type: "gallery" as const,
    img: "/listing/hastings/1.jpg",
    tag: "For Sale",
    price: "$520,000",
    meta: "4 bd · 2.1 ba",
    addr: "56291 Hastings · Macomb Twp",
  },
  {
    type: "link" as const,
    href: "/home-value",
    img: "/areas/cta-interior.jpg",
    tag: "Sellers",
    price: "Your home?",
    meta: "60-sec estimate",
    addr: "Find out what it's worth today",
  },
  {
    type: "link" as const,
    href: "/#contact",
    img: "/areas/modern-white.jpg",
    tag: "Buyers",
    price: "Coming soon",
    meta: "early access",
    addr: "Hear about listings before they hit the market",
  },
];

function CardInner({ c }: { c: (typeof CARDS)[number] }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.img} alt={c.addr} loading="lazy" />
      <div className="t-card-shade" aria-hidden />
      <div className="t-card-tag">{c.tag}</div>
      <div className="t-card-bar">
        <div className="t-card-row">
          <div className="t-card-price">{c.price}</div>
          <div className="t-card-meta">{c.meta}</div>
        </div>
        <div className="t-card-addr">{c.addr}</div>
      </div>
    </>
  );
}

export default function ListingsShowcase() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const n = HASTINGS_PHOTOS.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  return (
    <div className="t-wrap t-listings" id="listings">
      <div className="t-listings-head">
        <h2>
          On the <span>market</span>
        </h2>
        <button
          type="button"
          className="t-link-caps"
          onClick={() => {
            setIdx(0);
            setOpen(true);
          }}
        >
          View photos &rarr;
        </button>
      </div>
      <div className="t-listings-grid">
        {CARDS.map((c) =>
          c.type === "gallery" ? (
            <button
              key={c.addr}
              type="button"
              className="t-card"
              onClick={() => {
                setIdx(0);
                setOpen(true);
              }}
              aria-label="View photos of 56291 Hastings"
            >
              <CardInner c={c} />
            </button>
          ) : (
            <Link key={c.addr} href={c.href} className="t-card">
              <CardInner c={c} />
            </Link>
          ),
        )}
      </div>

      {open && (
        <div className="t-lb" role="dialog" aria-label="Listing photos" onClick={() => setOpen(false)}>
          <button className="t-lb-close" aria-label="Close" onClick={() => setOpen(false)}>
            &times;
          </button>
          <button
            className="t-lb-nav t-lb-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            &#8249;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="t-lb-img"
            src={HASTINGS_PHOTOS[idx].src}
            alt={HASTINGS_PHOTOS[idx].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="t-lb-nav t-lb-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            &#8250;
          </button>
          <div className="t-lb-bar" onClick={(e) => e.stopPropagation()}>
            <span className="t-lb-count">
              {idx + 1} / {n} &middot; 56291 Hastings, Macomb Twp &middot; $520,000
            </span>
            <Link href="/listing/56291-hastings" className="t-lb-details">
              Full details &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
