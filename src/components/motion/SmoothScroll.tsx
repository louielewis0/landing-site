"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth-scrolling provider.
 *
 * Why:
 * - Native smooth-scroll is jerky and varies wildly across browsers.
 * - Lenis interpolates scroll position via rAF — pairs naturally with
 *   GSAP ScrollTrigger for parallax + scrubbing.
 *
 * Tuning:
 * - lerp: 0.08 = inertia. Lower = silkier but laggier. 0.08 is the
 *   sweet spot for luxury (Aman, The Agency are roughly here).
 * - duration: 1.2s applies only to programmatic scrollTo (anchor links).
 * - Disabled entirely under prefers-reduced-motion.
 *
 * The instance is exposed on window.__lenis so ScrollInterceptor and
 * any future code can drive it for in-page anchor navigation.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
