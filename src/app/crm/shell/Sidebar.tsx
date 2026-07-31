"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Sidebar — 1:1 from the user's "Market Center CRM.html" template:
 * light 240px rail, logo + stacked MARKET CENTER / CRM wordmark,
 * numbered nav items, and the Louie user card pinned to the bottom.
 */

const NAV = [
  { num: "01", label: "Dashboard", href: "/crm" },
  { num: "02", label: "Leads", href: "/crm/leads" },
  { num: "03", label: "Pipeline", href: "/crm/pipeline" },
  { num: "04", label: "Activity", href: "/crm/activity" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex md:flex-col md:shrink-0 md:sticky md:top-0 md:h-screen md:self-start"
      style={{
        width: 240,
        gap: 8,
        padding: "26px 18px",
        borderRight: "1px solid rgba(25,26,28,0.1)",
      }}
    >
      <Link href="/crm" style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 22px" }}>
        <Image
          src="/mcr-logo-color-3d.png"
          alt="Real Estate Market Center"
          width={36}
          height={36}
          style={{ borderRadius: 9, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.3,
            color: "#191a1c",
          }}
        >
          Market Center
          <br />
          <span style={{ color: "rgba(25,26,28,0.45)" }}>CRM</span>
        </span>
      </Link>

      {NAV.map((n) => {
        const active = n.href === "/crm" ? pathname === "/crm" : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: 12,
              fontSize: 14,
              fontWeight: active ? 600 : 500,
              background: active ? "rgba(255,255,255,0.72)" : "transparent",
              color: active ? "#191a1c" : "rgba(25,26,28,0.7)",
              boxShadow: active ? "0 2px 10px rgba(25,26,28,0.06)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
                fontSize: 12,
                width: 16,
                color: active ? "#E4501E" : "rgba(25,26,28,0.35)",
              }}
            >
              {n.num}
            </span>
            {n.label}
          </Link>
        );
      })}

      <div
        style={{
          marginTop: "auto",
          padding: 16,
          borderRadius: 16,
          background: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(25,26,28,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#2E5A9C",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            LL
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#191a1c" }}>Louie Lewis</div>
            <div style={{ fontSize: 11.5, color: "rgba(25,26,28,0.5)" }}>Real Estate Market Center</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
