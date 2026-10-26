/**
 * Instant loading UI for /homes — shown the moment the visitor submits a
 * search, while the server fetches live listings. Self-contained styling (no
 * dependency on the themed SiteShell, which only mounts with the page) so it
 * paints immediately and the navigation never feels frozen.
 */
export default function HomesLoading() {
  const cards = Array.from({ length: 6 });
  return (
    <div style={{ minHeight: "100vh", background: "#0d0f13", color: "#F4EFE7" }}>
      <style>{`@keyframes hmShimmer{0%{opacity:.45}50%{opacity:.8}100%{opacity:.45}}`}</style>
      <div
        style={{
          padding: "150px 24px 46px",
          textAlign: "center",
          background: "linear-gradient(180deg,#141821 0%,#0d0f13 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.26em",
            fontSize: 12,
            fontWeight: 700,
            color: "#E4501E",
            marginBottom: 14,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Metro Detroit &middot; Live MLS Listings
        </div>
        <div style={{ fontSize: 26, fontFamily: "Georgia, serif", color: "#F4EFE7" }}>
          Finding homes&hellip;
        </div>
      </div>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 24px 70px" }}>
        <div
          style={{
            display: "grid",
            gap: 26,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {cards.map((_, i) => (
            <div
              key={i}
              style={{
                background: "#161a21",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                overflow: "hidden",
                animation: "hmShimmer 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div style={{ aspectRatio: "4 / 3", background: "#1d222b" }} />
              <div style={{ padding: "15px 16px 18px" }}>
                <div style={{ height: 15, width: "70%", background: "#232a34", borderRadius: 5, marginBottom: 10 }} />
                <div style={{ height: 12, width: "45%", background: "#1f2630", borderRadius: 5, marginBottom: 16 }} />
                <div style={{ height: 12, width: "85%", background: "#1f2630", borderRadius: 5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
