import { company } from "@/lib/config";

/**
 * Homepage hero — Tiny Villa reference language: airy off-white,
 * centered composition, enormous tight headline, minimal copy, then a
 * single large rounded media panel that parallaxes on scroll. The
 * warm gradient in the panel is the photo placeholder — drop
 * /public/hero-home.jpg in and set it as the backgroundImage on
 * .media-layer for the full effect.
 */
export default function Hero() {
  return (
    <section id="top" className="s-hero" style={{ paddingBottom: 70 }}>
      <div className="hero-layer hero-grid" />
      <div className="hero-layer hero-glow" data-speed="0.6" />

      <div
        className="container hero-content"
        style={{ textAlign: "center", alignItems: "center", paddingTop: 150, position: "relative", zIndex: 5 }}
      >
        <div className="hero-badge" style={{ margin: "0 auto 30px" }}>
          <span className="dot" /> {company.region} · Accepting new clients
        </div>
        <h1 className="hero-title" style={{ margin: "0 auto" }}>
          Sell for top dollar.
          <br />
          Buy with <em>confidence.</em>
        </h1>
        <p className="hero-sub" style={{ margin: "26px auto 36px" }}>
          The team behind $100M+ in closed {company.region} sales. A free home
          valuation in less than 24 hours — or pick up the phone.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <a href="/home-value" className="btn btn-gold">
            Request your valuation →
          </a>
          <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
            Call {company.phone}
          </a>
        </div>
        <div className="hero-badges" style={{ justifyContent: "center" }}>
          <span>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.9L12 17.6l-6.1 3.3 1.3-6.9-5-4.8 6.9-.9z" />
            </svg>
            Five-star rated
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 3 6v6c0 5 3.8 8.7 9 10 5.2-1.3 9-5 9-10V6z" />
            </svg>
            Licensed in Michigan
          </span>
          <span>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="9" />
            </svg>
            Replies within the hour
          </span>
        </div>

        {/* Media panel — parallax layer inside the rounded frame */}
        <div className="hero-media" style={{ width: "100%" }}>
          <div
            className="media-layer"
            data-speed="0.25"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 80% at 30% 30%, rgba(217,118,47,0.28), transparent 60%), radial-gradient(ellipse 60% 70% at 75% 70%, rgba(240,161,92,0.22), transparent 65%), linear-gradient(160deg, #23262e 0%, #16181d 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "28px 34px",
              color: "#fff",
              zIndex: 2,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.7 }}>
                Metro Detroit
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>
                Troy · Rochester Hills · Birmingham & beyond
              </div>
            </div>
            <a
              href="/#areas"
              className="btn"
              style={{ background: "#fff", color: "var(--navy)", padding: "12px 22px", fontSize: 13 }}
            >
              Explore areas →
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-cue" style={{ position: "relative", left: "auto", transform: "none", bottom: "auto", marginTop: 40 }}>
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
