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
const GRADIENTS = [
  "radial-gradient(ellipse 90% 70% at 30% 20%, #262a33 0%, transparent 60%), linear-gradient(160deg, #1d2026 0%, #16181d 100%)",
  "radial-gradient(ellipse 80% 60% at 70% 30%, #23262e 0%, transparent 65%), linear-gradient(200deg, #1d2026 0%, #121419 100%)",
  "radial-gradient(ellipse 85% 65% at 50% 15%, #282c35 0%, transparent 60%), linear-gradient(180deg, #1b1e24 0%, #16181d 100%)",
  "radial-gradient(ellipse 75% 60% at 25% 70%, #24282f 0%, transparent 60%), linear-gradient(140deg, #1d2026 0%, #16181d 100%)",
];

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
          {areas.map((name, i) => (
            <a key={name} href={getAreaHref(name)} className="area-card reveal">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: GRADIENTS[i % GRADIENTS.length],
                  transition: "transform .6s ease",
                }}
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
