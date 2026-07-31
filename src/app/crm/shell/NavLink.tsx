"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Single sidebar nav item. Active when the current path matches
 * the link's href exactly (for the root /crm) or starts with it
 * (for nested paths). Without the exact-match special case the
 * Dashboard ("/crm") row would render active on every sub-route,
 * since /crm/pipeline does start with /crm.
 *
 * Active style is the brand's gold-on-ink with a left rule; idle
 * is bone/55 with no rule, hover lifts to bone with a thin tinted
 * row. Transition durations match the marketing site (300ms) —
 * slower than a standard webapp because the cinematic feel is the
 * brand.
 *
 * The icon is passed as a pre-rendered JSX node (not a component
 * reference) so it serializes cleanly across the server → client
 * RSC boundary — Sidebar can stay a server component while
 * NavLink uses `usePathname()`. Icon color is set via a wrapper
 * span; lucide SVGs use `currentColor` for stroke, so the color
 * inherits from the parent's `text-…` class.
 */
export default function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const path = usePathname();
  const isActive =
    href === "/crm" ? path === "/crm" : path.startsWith(href);

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-medium tracking-tight transition-all duration-150 ${
        isActive
          ? "text-[#191a1c] bg-gradient-to-r from-[var(--gold)]/[0.14] to-white/[0.04] border border-[var(--gold)]/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "text-white/55 hover:text-white/90 hover:bg-white/[0.05] border border-transparent"
      }`}
    >
      <span
        className={`transition-colors duration-150 ${
          isActive
            ? "text-[var(--gold-soft)]"
            : "text-white/40 group-hover:text-white/70"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
