import type { CSSProperties } from "react";

/**
 * AwardBadges — two side-by-side badges used on the homepage reviews band and
 * in the footer:
 *   1. "#1 Real Estate Brokerage in Michigan 2026 — TownAnswer Awards"
 *      (gold on black, big "#1"), links to the TownAnswer ranking.
 *   2. "As featured in The Mile Detroit" (the masthead), links to the article.
 *
 * NOTE: the #1 ranking is TownAnswer's. Never phrase it as "#1 by The Mile
 * Detroit" — The Mile only *featured* the award.
 */
export default function AwardBadges({ style }: { style?: CSSProperties }) {
  const sans =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {/* #1 — TownAnswer Awards */}
      <a
        href="https://townanswer.com/best-real-estate-brokerage-michigan/"
        target="_blank"
        rel="noopener noreferrer"
        title="#1 Real Estate Brokerage in Michigan 2026 — TownAnswer Awards"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 16,
          height: 100,
          boxSizing: "border-box",
          padding: "0 26px",
          background: "#15110c",
          borderRadius: 16,
          boxShadow: "0 8px 26px rgba(25,26,28,0.18)",
          textDecoration: "none",
        }}
      >
        <span style={{ fontFamily: "Georgia, serif", fontSize: 54, fontWeight: 700, color: "#d6aa5e", lineHeight: 1, flexShrink: 0 }}>
          #1
        </span>
        <span style={{ textAlign: "left" }}>
          <span style={{ display: "block", fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#f7f4ec", lineHeight: 1.15 }}>
            Real Estate Brokerage
            <br />
            in Michigan
          </span>
          <span style={{ display: "block", marginTop: 6, fontFamily: sans, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d6aa5e" }}>
            2026 &middot; TownAnswer Awards
          </span>
        </span>
      </a>

      {/* As featured in The Mile Detroit */}
      <a
        href="https://themiledetroit.com/articles/best-real-estate-brokerage-michigan-2026"
        target="_blank"
        rel="noopener noreferrer"
        title="As featured in The Mile Detroit"
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          boxSizing: "border-box",
          padding: "0 30px",
          background: "#f7f4ec",
          border: "1.5px solid #15110c",
          borderRadius: 16,
          boxShadow: "0 8px 26px rgba(25,26,28,0.12)",
          textDecoration: "none",
        }}
      >
        <span style={{ fontFamily: sans, fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "#6b6456", marginBottom: 9 }}>
          As featured in
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/the-mile-masthead.png" alt="The Mile Detroit" style={{ height: 30, width: "auto", maxWidth: "100%", display: "block" }} />
      </a>
    </div>
  );
}
