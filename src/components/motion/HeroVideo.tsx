"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Cinematic hero video.
 *
 * Behavior:
 * - Autoplays muted on load (broadly allowed).
 * - Ken Burns fade-in: scale 1.05 → 1.0, opacity 0 → 1 over 1200ms.
 * - Scroll parallax: translates at 0.4× scroll, scales down toward 0.95,
 *   fades out toward 0.4 as the hero leaves view.
 * - Disabled animations under prefers-reduced-motion (still plays, just static).
 *
 * Sources are ordered: WebM (smaller, better quality) → MP4 fallback.
 */

const HERO_HEIGHT_ASSUMPTION = 800; // px. Used for parallax math.

type HeroVideoProps = {
  webm?: string;
  mp4?: string;
  poster?: string;
  className?: string;
};

export default function HeroVideo({
  webm = "/hero.webm",
  mp4 = "/hero.mp4",
  poster = "/hero-poster.jpg",
  className = "",
}: HeroVideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    // Best effort: ensure autoplay kicks in even when the user navigates back
    // to a tab where the video paused.
    const tryPlay = () => video.play().catch(() => {});
    if (video.readyState >= 2) tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });

    if (prefersReducedMotion()) return;

    // Fade-in is now a pure CSS animation on .hero-video-wrapper.
    // JS only adds scroll parallax — keeping the entry visible even if
    // hydration is slow or fails.

    // Scroll parallax handler. We avoid querying layout in the rAF; instead
    // we read scrollY only and pre-compute the scrub range using the wrapper's
    // initial position. This is jank-free on 60Hz+.
    let rafId = 0;
    let ticking = false;
    const heroTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const scrubRange = Math.max(HERO_HEIGHT_ASSUMPTION, wrapper.offsetHeight);

    const update = () => {
      ticking = false;
      const y = window.scrollY - heroTop;
      const p = Math.max(0, Math.min(1, y / scrubRange));
      const translateY = y * 0.4;
      const scale = 1 - p * 0.05; // 1.0 → 0.95
      const opacity = 1 - p * 0.6; // 1.0 → 0.4
      wrapper.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      wrapper.style.opacity = opacity.toFixed(3);
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`hero-video-wrapper absolute inset-0 ${className}`.trim()}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      {/* Cinematic vignette (~10% darker corners) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(10,9,8,0.35) 80%, rgba(10,9,8,0.65) 100%)",
        }}
      />
      {/* Bottom fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,9,8,0.4) 60%, rgba(10,9,8,0.85) 100%)",
        }}
      />
      {/* Warm gold ambient wash to match site palette */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(200,162,76,0.18), transparent 65%)",
        }}
      />
    </div>
  );
}
