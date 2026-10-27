import type { Metadata } from "next";
import { Check } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import BgVideo from "@/components/site/BgVideo";
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
 * Sell / valuation funnel — DOBI-style cinematic hero: full-bleed luxury motion
 * video (hero-sell.mp4) + dark overlay, nav over the hero, Fraunces headline,
 * benefit checkmarks, and the valuation form on the right. Form logic unchanged.
 */
export default function HomeValuePage() {
  const checks = [
    "Instant estimate from recorded-sale data",
    "Comps from the last 90 days on your street",
    "Broker-verified range within 24 hours",
    "Free, with zero obligation to list",
  ];

  return (
    <SiteShell navOnDark>
      <main>
        <section className="lb-hero hv-hero" style={{ color: "#F1EADB" }}>
          <BgVideo srcMp4="/hero-sell.mp4" poster="/hero-sell-poster.jpg" />
          <div className="lb-hero-shade" aria-hidden />
          <div className="hv-hero-inner">
            <div className="hv-hero-grid">
              <div className="hv-hero-copy">
                <div className="hv-eyebrow">Know your worth</div>
                <h1 className="hv-title">
                  What&rsquo;s your home <em>actually worth?</em>
                </h1>
                <p className="hv-sub">
                  An instant estimate built on recorded sales, then a broker-verified
                  number from a local {company.region}{" "}team that knows your
                  street &mdash; within 24 hours, no obligation.
                </p>
                <ul className="hv-checks">
                  {checks.map((c) => (
                    <li key={c}>
                      <Check width={18} height={18} aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hv-hero-form">
                <HomeValueForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
