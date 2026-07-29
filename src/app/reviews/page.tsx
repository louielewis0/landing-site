import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { Star, Phone } from "lucide-react";
import StarGate from "./StarGate";

/**
 * /reviews — rating-gated capture surface, redesign treatment.
 *
 * The Google review URL is NEVER hardcoded on this page (or referenced
 * anywhere in the client bundle). The single entry point remains the
 * <StarGate> client component: 5★ → server route hands back the URL →
 * same-tab nav. 1–4★ → private feedback form → public.public_feedback.
 * All CTAs anchor back to the star picker (id="rating"); there is no
 * Google href anywhere on this page.
 */
export const metadata: Metadata = {
  title: "Leave a Review | Real Estate Market Center",
  description: `Share your experience with ${company.name}. Your feedback helps Metro Detroit families find a team they can trust.`,
};

export default function ReviewPage() {
  return (
    <SiteShell>
      <main>
        {/* Hero + gated star picker */}
        <section className="s-hero s-hero-short" style={{ height: "auto", minHeight: 620, paddingBottom: 70 }}>
          <div
            className="hero-layer hero-bg"
            data-speed="0.35"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(217,118,47,0.10), transparent 60%), linear-gradient(180deg, #fafaf8 0%, #f1efea 100%)",
            }}
          />
          <div className="hero-layer hero-grid" />
          <div className="hero-layer hero-glow" data-speed="0.6" />
          <div className="container hero-content" style={{ textAlign: "center", alignItems: "center", paddingTop: 130 }}>
            <div className="hero-badge" style={{ margin: "0 auto 28px" }}>
              <Star className="w-3.5 h-3.5" style={{ color: "var(--s-gold-light)" }} fill="currentColor" />
              Trusted by hundreds
            </div>
            <h1 className="hero-title" style={{ margin: "0 auto", fontSize: "clamp(36px, 5vw, 64px)" }}>
              Your feedback <em>means everything.</em>
            </h1>
            <p className="hero-sub" style={{ margin: "24px auto 40px" }}>
              If we helped you buy, sell, or invest in {company.region}, we&rsquo;d
              love to hear how it went.
            </p>
            <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
              <StarGate />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="sec-pad bg-cream">
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="sec-head reveal" style={{ margin: "0 auto 56px", textAlign: "center", maxWidth: 640 }}>
              <div className="s-eyebrow" style={{ justifyContent: "center" }}>How it works</div>
              <h2>Three quick steps.</h2>
            </div>
            <div className="testi-grid">
              {[
                { num: "01", title: "Pick your rating", desc: "Tap the stars that match your experience." },
                { num: "02", title: "Share your experience", desc: "A few words — what stood out, what didn't." },
                { num: "03", title: "We read every one.", desc: "Honest feedback shapes how we show up next time." },
              ].map((s) => (
                <div key={s.num} className="testi-card reveal" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: "var(--cream-2)",
                      color: "var(--s-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 18px",
                      fontFamily: "var(--font-fraunces), Fraunces, serif",
                      fontSize: 19,
                      fontWeight: 600,
                    }}
                  >
                    {s.num}
                  </div>
                  <h3 style={{ fontSize: 20, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--s-muted)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="areas-more reveal">
              <a href="#rating" className="btn btn-gold" style={{ padding: "13px 26px", fontSize: 14 }}>
                Rate your experience
              </a>
            </div>
          </div>
        </section>

        {/* Appreciation + Contact */}
        <section className="cta-banner">
          <div
            className="cta-bg"
            data-speed="0.4"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(22,24,29,0.95), rgba(22,24,29,0.8)), radial-gradient(ellipse 70% 60% at 50% 40%, #23262e 0%, transparent 65%), linear-gradient(180deg, #1b1e24 0%, #16181d 100%)",
            }}
          />
          <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 720, textAlign: "center" }}>
            <h2 className="reveal" style={{ color: "#fff", fontSize: "clamp(28px, 3.8vw, 44px)", marginBottom: 18 }}>
              Thank you for choosing {company.name}.
            </h2>
            <p className="reveal" style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 36 }}>
              We don&rsquo;t take your trust for granted. Every review — good or
              constructive — helps us serve {company.region} better.
            </p>
            <div className="reveal" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${company.phoneTel}`} className="btn btn-outline">
                <Phone className="w-4 h-4" />
                Call {company.phone}
              </a>
              <a href="#rating" className="btn btn-gold">
                Rate your experience
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
