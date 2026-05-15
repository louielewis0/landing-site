"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Subtle cursor-tilt parallax — desktop only.
 *
 * Tilts the child up to MAX_TILT degrees toward the cursor while the
 * cursor is inside, with rAF-smoothed lerp. Wrapped in a fixed
 * perspective so the rotation feels grounded.
 *
 * Tuning:
 * - MAX_TILT = 5 — luxury bar. Anything above feels gimmicky.
 * - LERP = 0.12 — smooth without feeling laggy.
 */

const MAX_TILT = 5;
const LERP = 0.12;

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    let rafId = 0;
    let active = false;
    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      targetRY = (px - 0.5) * 2 * MAX_TILT;
      targetRX = -(py - 0.5) * 2 * MAX_TILT;
    };

    const onLeave = () => {
      targetRX = 0;
      targetRY = 0;
    };

    const tick = () => {
      currentRX += (targetRX - currentRX) * LERP;
      currentRY += (targetRY - currentRY) * LERP;
      el.style.transform = `perspective(1200px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg)`;
      if (
        Math.abs(currentRX) < 0.02 &&
        Math.abs(currentRY) < 0.02 &&
        targetRX === 0 &&
        targetRY === 0
      ) {
        el.style.transform = "";
        active = false;
        return;
      }
      rafId = requestAnimationFrame(tick);
      active = true;
    };

    const onEnter = () => {
      if (!active) rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform", transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </div>
  );
}
