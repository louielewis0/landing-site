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
        <section className="t-wrap t-rev">
          <div className="t-eyebrow">Trusted by hundreds</div>
          <h1>
            Your feedback
            <br />
            <span>means everything.</span>
          </h1>
          <p className="t-rev-sub">
            If we helped you buy, sell, or invest in {company.region}, we&rsquo;d
            love to hear how it went.
          </p>
          <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
            <StarGate />
          </div>
        </section>

        {/* How it works */}
        <section className="t-wrap t-rev-steps">
          <h2>
            Three quick <span>steps</span>
          </h2>
          <div className="t-about-rows">
            {[
              { title: "Pick your rating", desc: "Tap the stars that match your experience." },
              { title: "Share your experience", desc: "A few words — what stood out, what didn't." },
              { title: "We read every one", desc: "Honest feedback shapes how we show up next time." },
            ].map((s, i) => (
              <div key={s.title}>
                <span className="t-num">0{i + 1}</span>
                <span>
                  {s.title}
                  <span className="t-rev-desc"> — {s.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Appreciation + Contact */}
        <div className="t-wrap t-cta-wrap">
          <div className="t-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/areas/modern-white.jpg" alt="" loading="lazy" />
            <div className="t-cta-shade" aria-hidden />
            <div className="t-cta-copy">
              <h2>
                Thank you for
                <br />
                <span>choosing us.</span>
              </h2>
              <p>
                We don&rsquo;t take your trust for granted. Every review — good
                or constructive — helps us serve {company.region} better.
              </p>
              <a href="#rating" className="t-pill t-pill-solid">
                Rate your experience
              </a>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
