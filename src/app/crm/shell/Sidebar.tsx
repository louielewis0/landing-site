"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Sidebar — dark-executive rail for the CRM. Deep translucent panel on the
 * charcoal mesh, logo + stacked MARKET CENTER / CRM wordmark in bone, numbered
 * nav with a gold active state, and the Louie user card pinned to the bottom.
 */

const NAV = [
  { num: "01", label: "Dashboard", href: "/crm" },
  { num: "02", label: "Call block", href: "/crm/call-block" },
  { num: "03", label: "Leads", href: "/crm/leads" },
  { num: "04", label: "Pipeline", href: "/crm/pipeline" },
  { num: "05", label: "Activity", href: "/crm/activity" },
  { num: "06", label: "Farm map", href: "/crm/farm" },
  { num: "07", label: "Playbook", href: "/crm/playbook" },
];

const GROTESK = "var(--font-grotesk), 'Space Grotesk', sans-serif";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex md:flex-col md:shrink-0 md:sticky md:top-0 md:h-screen md:self-start"
      style={{
        width: 244,
        gap: 6,
        padding: "26px 18px",
        borderRight: "1px solid var(--crm-line)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.01))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <Link
        href="/crm"
        style={{ display: "flex", alignItems: "center", gap: 11, padding: "0 8px 24px" }}
      >
        <Image
          src="/mcr-logo-color-3d.png"
          alt="Real Estate Market Center"
          width={36}
          height={36}
          style={{
            borderRadius: 9,
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))",
          }}
        />
        <span
          style={{
            fontFamily: GROTESK,
            fontWeight: 600,
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            lineHeight: 1.35,
            color: "var(--crm-ink)",
          }}
        >
          Market Center
          <br />
          <span style={{ color: "var(--crm-gold-soft)" }}>CRM</span>
        </span>
      </Link>

      {NAV.map((n) => {
        const active =
          n.href === "/crm" ? pathname === "/crm" : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: 12,
              fontSize: 14,
              fontFamily: GROTESK,
              fontWeight: active ? 600 : 500,
              background: active ? "var(--crm-gold-dim)" : "transparent",
              color: active ? "var(--crm-ink)" : "var(--crm-ink-dim)",
              border: active
                ? "1px solid rgba(200,162,76,0.28)"
                : "1px solid transparent",
              boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
              transition: "color 160ms ease, background 160ms ease",
            }}
          >
            <span
              style={{
                fontFamily: GROTESK,
                fontSize: 11,
                letterSpacing: "0.08em",
                width: 16,
                color: active ? "var(--crm-gold-soft)" : "var(--crm-ink-ghost)",
              }}
            >
              {n.num}
            </span>
            {n.label}
          </Link>
        );
      })}

      <div
        className="crm-glass"
        style={{
          marginTop: "auto",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--crm-gold-soft), var(--crm-gold))",
              color: "#0A0908",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: GROTESK,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            LL
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--crm-ink)" }}>
              Louie Lewis
            </div>
            <div style={{ fontSize: 11.5, color: "var(--crm-ink-faint)" }}>
              Real Estate Market Center
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
