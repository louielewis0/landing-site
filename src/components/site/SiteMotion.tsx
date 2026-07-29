"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP orchestrator for the public site — a literal port of the
 * prototype's motion system (marketcenterrealty-parallax-redesign.html):
 *
 *   • [data-speed] layers scrub-parallax against their parent section
 *   • .s-hero content fades/scales out as you scroll past
 *   • .about-media img gets a subtle -12% parallax
 *   • .reveal elements rise 36px → 0 at 88% viewport, 60ms stagger
 *   • .counter elements count 0 → data-target once at 90%
 *   • hero mouse tilt on hover-capable devices
 *
 * prefers-reduced-motion: everything is DISABLED (not reduced) — reveals
 * snap visible, counters snap to target, no scrub, per the perf brief.
 * Re-runs on route change; gsap.context reverts cleanly on unmount.
 */
export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-theme");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      root.querySelectorAll<HTMLElement>(".counter").forEach((el) => {
        el.textContent = el.dataset.target ?? el.textContent;
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax layers
      root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0");
        gsap.to(el, {
          yPercent: speed * 30,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Hero content fade/scale as you scroll past
      const hero = root.querySelector<HTMLElement>(".s-hero");
      if (hero && hero.querySelector(".hero-content")) {
        gsap.to(hero.querySelector(".hero-content"), {
          opacity: 0,
          y: -60,
          scale: 0.96,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
        });
      }

      // About image parallax
      const aboutImg = root.querySelector<HTMLElement>(".about-media img");
      if (aboutImg) {
        gsap.to(aboutImg, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector(".about-media"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Reveal-on-scroll
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".reveal")).forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: (i % 4) * 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Counters
      root.querySelectorAll<HTMLElement>(".counter").forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(obj.val));
              },
            });
          },
        });
      });
    }, root);

    // Hero mouse tilt (desktop pointers only)
    const heroEl = root.querySelector<HTMLElement>(".s-hero");
    const heroBg = root.querySelector<HTMLElement>(".hero-bg");
    const heroGlow = root.querySelector<HTMLElement>(".hero-glow");
    let onMove: ((e: MouseEvent) => void) | null = null;
    if (heroEl && heroBg && window.matchMedia("(hover:hover)").matches) {
      onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(heroBg, { x: x * 18, y: y * 12, duration: 0.9, ease: "power2.out" });
        if (heroGlow) gsap.to(heroGlow, { x: x * 34, y: y * 24, duration: 1.1, ease: "power2.out" });
      };
      heroEl.addEventListener("mousemove", onMove);
    }

    return () => {
      if (heroEl && onMove) heroEl.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
