import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import HomeValueForm from "./HomeValueForm";

export const metadata: Metadata = {
  title: `What's My Home Worth? | Free Home Valuation | ${company.name}`,
  description:
    "Get a free, no-obligation home valuation from a local Metro Detroit broker. Real comps, real numbers — back to you within 24 hours.",
  alternates: { canonical: "https://marketcenterrealty.com/home-value" },
  openGraph: {
    title: `Free Home Valuation | ${company.name}`,
    description:
      "Get a free, no-obligation home valuation from a local Metro Detroit broker. Real comps, back within 24 hours.",
    type: "website",
    url: "https://marketcenterrealty.com/home-value",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

/**
 * Valuation funnel — redesign hero treatment with the form kept above
 * the fold (right column at desktop, directly under the headline on
 * mobile). Copy and form logic unchanged.
 */
export default function HomeValuePage() {
  return (
    <SiteShell>
      <main>
        <section className="s-hero" style={{ height: "auto", minHeight: "100svh", paddingBottom: 80 }}>
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

          <div className="container hero-content" style={{ paddingTop: 120, paddingBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="hv-cols">
              <div>
                <div className="hero-badge">Free · 24-hour turnaround</div>
                <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4.6vw, 58px)" }}>
                  What&rsquo;s your home <em>actually worth?</em>
                </h1>
                <p className="hero-sub">
                  A free, no-obligation market analysis from a local{" "}
                  {company.region} broker. Real comps, no algorithm guesswork —
                  back to you within 24 hours.
                </p>
                <ul className="cta-list">
                  {[
                    "Comps from the last 90 days on your street",
                    "Local broker who knows your neighborhood",
                    "Realistic list-price range, no inflated promises",
                    "Free, with zero obligation to list",
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
              <div>
                <HomeValueForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
