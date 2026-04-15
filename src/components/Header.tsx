"use client";

import { useEffect, useState } from "react";
import { company } from "@/lib/config";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span
            className={`font-bold text-lg tracking-tight ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            {company.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Listings", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`transition-colors ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${company.phoneTel}`}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {company.phone}
        </a>
      </div>
    </header>
  );
}
