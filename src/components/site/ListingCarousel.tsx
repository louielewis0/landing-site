"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Listing photo slideshow — one photo at a time, shown in full
 * (object-fit: contain, no cropping) with prev/next arrows, a counter,
 * a thumbnail strip, keyboard arrows, and touch swipe.
 */

type Photo = { src: string; alt: string };

export default function ListingCarousel({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  const n = photos.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // touch swipe
  const startX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="lc">
      <div className="lc-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[i].src} alt={photos[i].alt} />
        <button className="lc-nav lc-prev" aria-label="Previous photo" onClick={() => go(-1)}>
          &#8249;
        </button>
        <button className="lc-nav lc-next" aria-label="Next photo" onClick={() => go(1)}>
          &#8250;
        </button>
        <div className="lc-count">
          {i + 1} / {n}
        </div>
      </div>
      <div className="lc-thumbs">
        {photos.map((p, idx) => (
          <button
            key={p.src}
            className={idx === i ? "on" : ""}
            aria-label={`Photo ${idx + 1}`}
            onClick={() => setI(idx)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
