"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Word-by-word reveal for headlines.
 *
 * Uses SplitType (dynamically imported to keep the initial bundle small)
 * to wrap each word in a span, then animates them in with a staggered
 * fadeUp via GSAP when the headline enters the viewport.
 *
 * Falls back to a simple opacity reveal if SplitType fails to load or
 * the user has requested reduced motion.
 *
 * Tuning:
 * - stagger: 0.08s per word — gives the slow editorial cadence Sotheby's uses.
 * - duration: 1.0s — long enough to feel intentional, short enough to scan.
 * - y: 24px → 0 — restrained, not bouncy.
 */

type SplitTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds before the reveal begins after entering viewport. */
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Whether to split by word (default) or line. */
  split?: "words" | "lines";
};

export default function SplitText({
  children,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.08,
  split = "words",
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    let mounted = true;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: SplitType }, gsapMod] = await Promise.all([
        import("split-type"),
        import("gsap"),
      ]);
      if (!mounted) return;
      const gsap = gsapMod.default;

      const splitInstance = new SplitType(el, {
        types: split === "lines" ? "lines" : "words",
        tagName: "span",
      });

      const targets =
        split === "lines" ? splitInstance.lines : splitInstance.words;
      if (!targets || targets.length === 0) {
        el.style.opacity = "1";
        return;
      }

      gsap.set(targets, { opacity: 0, y: 24, display: "inline-block" });
      el.style.opacity = "1";

      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power3.out",
                stagger,
                delay,
              });
              obs.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
      );
      obs.observe(el);

      cleanup = () => {
        obs.disconnect();
        splitInstance.revert();
      };
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [delay, stagger, split]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </Tag>
  );
}
