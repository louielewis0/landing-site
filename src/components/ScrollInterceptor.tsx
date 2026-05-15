"use client";

import { useEffect } from "react";

/**
 * Intercepts clicks on in-page anchor links (href="#section-id") and scrolls
 * smoothly to the target without updating the browser URL. Section IDs stay
 * in place — only the hash-in-URL behavior is suppressed.
 */
export default function ScrollInterceptor() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
