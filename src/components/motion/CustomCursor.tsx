"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Minimal custom cursor — desktop, fine pointer only.
 *
 * Two layers:
 *  - A small dot that tracks the cursor 1:1.
 *  - A ring that lerps to follow with a slight lag.
 *
 * On hoverable elements the ring grows; the native cursor remains hidden
 * via CSS (.cursor-active selector on <html>).
 *
 * Hidden entirely on touch devices and reduced-motion.
 */

const HOVERABLE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-magnetic]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-active");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(HOVERABLE_SELECTOR)) {
        ring.classList.add("is-hover");
      } else {
        ring.classList.remove("is-hover");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
