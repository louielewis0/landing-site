"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: "fade" | "mask";
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  threshold?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "fade",
  delay = 0,
  className = "",
  threshold = 0.18,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() =>
    typeof window === "undefined" ? false : typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  const base = variant === "mask" ? "reveal-mask" : "reveal";
  const delayCls = delay > 0 ? `delay-${delay}` : "";
  const visibleCls = visible ? "is-visible" : "";

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${base} ${delayCls} ${visibleCls} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
