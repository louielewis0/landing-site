import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";

/**
 * Homepage hero — parallax redesign. Full-height navy stage with three
 * GSAP-driven layers (bg @0.35 scroll speed, grid overlay, gold glow
 * @0.6) plus mouse tilt, orchestrated by SiteMotion. Content fades and
 * scales out on scroll-past. The working HeroLeadForm is preserved on
 * the right column (business logic untouched).
 *
 * Background: layered navy gradients stand in for photography. To use
 * a photo, drop /public/hero-bg.jpg and add it to backgroundImage
 * below — the parallax layer is already wired.
 */
export default function Hero() {
  return (
    <section id="top" className="s-hero">
      <div
        className="hero-layer hero-bg"
        data-speed="0.35"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(13,19,33,0.35) 0%, rgba(13,19,33,0.6) 55%, rgba(13,19,33,0.96) 100%), radial-gradient(ellipse 80% 60% at 20% 25%, #24344f 0%, transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, #1a2740 0%, transparent 65%), linear-gradient(180deg, #182338 0%, #131c2e 100%)",
        }}
      />
      <div className="hero-layer hero-grid" />
      <div className="hero-layer hero-glow" data-speed="0.6" />

      <div className="container hero-content">
        <div className="hero-cols">
          <div>
            <div className="hero-badge">
              <span className="dot" /> {company.region} · Accepting new clients
            </div>
            <h1 className="hero-title">
              Sell for top dollar.
              <br />
              Buy with <em>confidence.</em>
            </h1>
            <p className="hero-sub">
              The team behind $100M+ in closed {company.region} sales. A free
              home valuation in less than 24 hours — or pick up the phone.
            </p>
            <div className="hero-ctas">
              <a href="/home-value" className="btn btn-gold">
                Request your valuation →
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-outline">
                Call {company.phone}
              </a>
            </div>
            <div className="hero-badges">
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
          </div>

          <div className="hero-form-col">
            <HeroLeadForm />
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
