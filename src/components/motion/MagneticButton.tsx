"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Magnetic hover wrapper — desktop only.
 *
 * The element translates a small fraction of the cursor's distance from
 * the element's center while the cursor is inside. Smoothed via rAF lerp.
 *
 * Tuning:
 * - PULL = 0.25 — feels like gentle attraction, not jarring follow.
 * - LERP = 0.18 — smooth catch-up without feeling delayed.
 * - Falls back to a plain wrapper on touch / reduced-motion.
 */

const PULL = 0.25;
const LERP = 0.18;

type MagneticProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Override the radius (in px) within which magnetism activates. */
  radius?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function MagneticButton<T extends ElementType = "div">({
  as,
  children,
  className = "",
  radius,
  ...rest
}: MagneticProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    let rafId = 0;
    let active = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const r = radius ?? Math.max(rect.width, rect.height);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > r) {
        targetX = 0;
        targetY = 0;
        return;
      }
      targetX = dx * PULL;
      targetY = dy * PULL;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      if (Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01 && targetX === 0 && targetY === 0) {
        el.style.transform = "";
        active = false;
        return;
      }
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(tick);
      active = true;
    };

    const onEnter = () => {
      if (!active) {
        rafId = requestAnimationFrame(tick);
      }
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
  }, [radius]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`magnetic-host ${className}`.trim()}
      style={{ display: "inline-block", willChange: "transform" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
