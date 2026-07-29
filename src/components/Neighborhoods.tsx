import { company } from "@/lib/config";
import { cityPages } from "@/lib/city-pages";

const areas = [
  "Troy",
  "Rochester Hills",
  "Birmingham",
  "Bloomfield Hills",
  "West Bloomfield",
  "Sterling Heights",
  "Warren",
];

function getAreaHref(cityName: string): string {
  const page = cityPages.find((p) => p.city === cityName);
  return page ? `/${page.slug}` : "/#contact";
}

/**
 * Areas — prototype .area-card grid on cream-2. Photo slots use navy
 * gradient scenes per city (no external placeholder services in
 * production); drop real neighborhood photos into /public/areas/ and
 * swap the backgrounds when ready. Links and copy unchanged.
 */

export default function Neighborhoods() {
  return (
    <section id="areas" className="sec-pad bg-cream-2">
      <div className="container">
        <div className="sec-head reveal">
          <div className="s-eyebrow">Where we work</div>
          <h2>Serving {company.region}, block by block.</h2>
          <p>
            From family-first suburbs to luxury estates and urban investment
            neighborhoods — we know the streets, not just the listings.
          </p>
        </div>
        <div className="areas-grid">
          {areas.map((name) => (
            <a key={name} href={getAreaHref(name)} className="area-card reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/areas/${getAreaHref(name).replace("/", "") || "troy-real-estate-agent"}.jpg`}
                alt={`Luxury home — ${name}, MI`}
                loading="lazy"
              />
              <div className="area-card-txt">
                <small>Area Guide</small>
                <strong>{name}, MI</strong>
              </div>
            </a>
          ))}
          <div
            className="area-card reveal"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--navy)",
            }}
          >
            <div style={{ textAlign: "center", padding: 18, position: "relative", zIndex: 2 }}>
              <p style={{ color: "#fff", fontSize: 14, marginBottom: 10 }}>
                Don&rsquo;t see your city?
              </p>
              <a href="/#contact" className="btn btn-gold" style={{ padding: "10px 20px", fontSize: 13 }}>
                Just ask →
              </a>
            </div>
          </div>
        </div>
        <div className="areas-more reveal">
          <a href="/home-value">Request your valuation →</a> — we work across
          all of Michigan.
        </div>
      </div>
    </section>
  );
}
