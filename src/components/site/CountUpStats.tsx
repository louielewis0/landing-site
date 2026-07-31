"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats band with count-up: each number animates from 0 to its target
 * the first time the band scrolls into view. Honors reduced-motion by
 * showing final values immediately.
 */

type Stat = { target: number; prefix?: string; suffix: string; label: string };

const STATS: Stat[] = [
  { target: 20, suffix: "+", label: "Years in business" },
  { target: 100, prefix: "$", suffix: "M+", label: "In homes sold" },
  { target: 500, suffix: "+", label: "Homes closed" },
];

function useCountUp(target: number, run: boolean, ms = 1600) {
  const [n, setN] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, run, ms]);
  return n;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const n = useCountUp(stat.target, run);
  return (
    <div>
      <div className="t-stat-num">
        {stat.prefix}
        {n}
        <span>{stat.suffix}</span>
      </div>
      <div className="t-stat-label">{stat.label}</div>
    </div>
  );
}

export default function CountUpStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="t-stats-grid" ref={ref}>
      {STATS.map((s) => (
        <StatItem key={s.label} stat={s} run={run} />
      ))}
    </div>
  );
}
