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
      className={`group relative flex items-center gap-3 px-5 py-2.5 text-[14px] tracking-tight transition-colors duration-300 border-l-2 ${
        isActive
          ? "text-bone bg-[var(--gold)]/10 border-[var(--gold)]"
          : "text-bone/55 hover:text-bone hover:bg-bone/[0.03] border-transparent"
      }`}
    >
      <span
        className={`transition-colors duration-300 ${
          isActive
            ? "text-[var(--gold-soft)]"
            : "text-bone/45 group-hover:text-bone/75"
        }`}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
