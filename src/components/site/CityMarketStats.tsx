import { getMarketStats, getCityMarketStats } from "@/lib/idx/client";

/**
 * Live per-city market snapshot (async server component). Pulls aggregate
 * active-inventory stats for one city from the Realcomp-backed feed and renders
 * them with the required MLS attribution + consumer-use disclaimer.
 *
 * Renders nothing when the city has no match in the feed (e.g. "Michigan",
 * "Metro Detroit", or a community outside the priority set) — so it's safe to
 * drop into any city template. Figures are ACTIVE listings' ASKING prices, not
 * closed sales. Data refreshes at least every 6h (within Realcomp's 12h rule).
 */

const fmt = (n: number) => n.toLocaleString("en-US");

export default async function CityMarketStats({ city }: { city: string }) {
  const [metro, cities] = await Promise.all([
    getMarketStats().catch(() => null),
    getCityMarketStats().catch(() => []),
  ]);

  const c = cities.find((x) => x.city.toLowerCase() === city.trim().toLowerCase());
  if (!c || c.forSale < 1) return null;

  const asOf = metro?.asOf
    ? new Date(metro.asOf + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const stats = [
    { label: "Homes for sale", value: fmt(c.forSale) },
    { label: "Avg. asking price", value: `$${fmt(c.avgListPrice)}` },
    { label: "Avg. days on market", value: fmt(c.avgDaysOnMarket) },
    { label: "New this month", value: fmt(c.newLast30) },
  ];

  return (
    <section className="bg-cream-2" style={{ padding: "56px 0" }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <div className="reveal">
          <div className="s-eyebrow">Live market data{asOf ? ` · as of ${asOf}` : ""}</div>
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 30px)", marginBottom: 20 }}>
            The {c.city} market right now
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 14,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="reveal"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "22px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(24px, 3.4vw, 32px)",
                  fontWeight: 700,
                  color: "var(--navy)",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--s-muted)",
                  marginTop: 6,
                  letterSpacing: "0.02em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11.5, lineHeight: 1.6, color: "var(--s-muted)", marginTop: 16 }}>
          Active residential listings in {c.city} compiled by Real Estate Market Center from
          Realcomp II Ltd. data &mdash; asking prices on homes currently for sale, not closed
          sales. Deemed reliable but not guaranteed. Provided for consumers&rsquo; personal,
          non-commercial use and may not be used for any purpose other than to identify
          prospective properties consumers may be interested in purchasing.
        </p>
      </div>
    </section>
  );
}
