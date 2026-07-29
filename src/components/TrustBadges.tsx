/**
 * Stats band — prototype #stats treatment: navy-2 strip, Fraunces
 * count-up numbers (GSAP .counter, driven by SiteMotion), uppercase
 * labels, hairline column dividers. Copy/values unchanged.
 */
export default function TrustBadges() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        <div>
          <div className="stat-num">
            <span className="accent counter" data-target="20">0</span>+
          </div>
          <div className="stat-label">Years of experience</div>
        </div>
        <div>
          <div className="stat-num">
            $<span className="accent counter" data-target="100">0</span>M+
          </div>
          <div className="stat-label">In Metro Detroit sales</div>
        </div>
        <div>
          <div className="stat-num">
            <span className="accent counter" data-target="500">0</span>+
          </div>
          <div className="stat-label">Homes closed</div>
        </div>
      </div>
    </section>
  );
}
