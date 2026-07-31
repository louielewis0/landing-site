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
 * Valuation funnel — template design system (t- classes): bone
 * ground, Space Grotesk uppercase display, numbered hairline rows,
 * form card right. Copy and form logic unchanged.
 */
export default function HomeValuePage() {
  return (
    <SiteShell>
      <main>
        <section className="t-wrap t-hv">
          <div>
            <div className="t-eyebrow">Free &middot; Instant estimate</div>
            <h1>
              What&rsquo;s your home
              <br />
              <span>actually worth?</span>
            </h1>
            <p className="t-hv-sub">
              An instant estimate built on recorded sales, then a
              broker-verified number from a local {company.region} team that
              knows your street &mdash; within 24 hours, no obligation.
            </p>
            <div className="t-about-rows">
              {[
                "Instant estimate from recorded-sale data",
                "Comps from the last 90 days on your street",
                "Broker-verified range within 24 hours",
                "Free, with zero obligation to list",
              ].map((p, i) => (
                <div key={p}>
                  <span className="t-num">0{i + 1}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <HomeValueForm />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
