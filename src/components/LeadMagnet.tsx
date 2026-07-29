/**
 * Homepage valuation CTA — prototype #cta-banner treatment: navy
 * parallax banner (.cta-bg scrubs at 0.4x) with the checklist left
 * and the glass CTA card right. Copy and the id="lead-magnet" anchor
 * preserved; all valuation traffic still funnels to /home-value.
 */
export default function LeadMagnet() {
  return (
    <section id="lead-magnet" className="cta-banner">
      <div
        className="cta-bg"
        data-speed="0.4"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(22,24,29,0.95), rgba(22,24,29,0.8)), radial-gradient(ellipse 70% 60% at 75% 30%, #23262e 0%, transparent 65%), linear-gradient(180deg, #1b1e24 0%, #16181d 100%)",
        }}
      />
      <div className="container cta-inner">
        <div className="reveal">
          <div className="s-eyebrow" style={{ color: "var(--s-gold-light)" }}>
            Free · 24-hour turnaround
          </div>
          <h2>What&rsquo;s your home actually worth?</h2>
          <p>
            Zestimates miss by 10% on average. Get a real valuation from a
            local broker who knows your street — not an algorithm. Detailed
            report, no cost, no obligation.
          </p>
          <ul className="cta-list">
            {[
              "Comps from the last 90 days",
              "Current neighborhood trends",
              "Upgrades worth doing (and ones that aren't)",
              "A realistic list-price range you can take to the bank",
            ].map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="cta-card reveal">
          <h3>A real broker, in 24 hours.</h3>
          <p>
            Three quick steps. No algorithm, no instant lowball — a local Troy
            broker reviews your property and sends a real number back.
          </p>
          <a href="/home-value" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
            Get my free valuation →
          </a>
          <p className="form-note">Private. We never share your details.</p>
        </div>
      </div>
    </section>
  );
}
