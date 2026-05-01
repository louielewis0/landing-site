"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/lib/config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-2xl border-b border-bone/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div
            className={`rounded-xl p-1 transition-all duration-500 ${
              scrolled ? "bg-bone/95" : "bg-bone/95"
            }`}
          >
            <Image
              src="/logo.png"
              alt={company.name}
              width={44}
              height={44}
              priority
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            />
          </div>
          <span className="hidden sm:inline font-display font-light text-[18px] tracking-tight text-bone">
            {company.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-[0.06em]">
          {[
            { label: "Services", href: "#services" },
            { label: "Areas", href: "#areas" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-bone/65 hover:text-bone transition-colors duration-400 group"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--gold)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            </a>
          ))}
        </nav>

        <a
          href={`tel:${company.phoneTel}`}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink text-[13px] font-semibold tracking-wide transition-all duration-500"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {company.phone}
        </a>
      </div>
    </header>
  );
}
