"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Animated number counter that triggers when scrolled into view.
 *
 * Supports prefix/suffix (for "$" and "+") and locale-formatted commas.
 *
 * Tuning:
 * - duration 1.6s with ease-out feels editorial (vs the 2-3s "showy" feel
 *   you see on landing pages). Quick enough not to bore, long enough to read.
 */

type CountUpProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(prefersReducedMotion() ? end : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || startedRef.current) continue;
          startedRef.current = true;

          const start = performance.now();
          // power3.out easing
          const ease = (t: number) => 1 - Math.pow(1 - t, 3);

          let rafId = 0;
          const tick = (now: number) => {
            const elapsed = (now - start) / 1000;
            const t = Math.min(1, elapsed / duration);
            setValue(Math.round(ease(t) * end));
            if (t < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);

          obs.unobserve(entry.target);
          return () => cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
