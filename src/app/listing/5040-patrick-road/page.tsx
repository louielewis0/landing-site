import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: `SOLD: 5040 Patrick Road, West Bloomfield | ${company.name}`,
  description:
    "SOLD — 4-bed, 3-bath colonial in West Bloomfield Twp, listed at $448,900. Another Metro Detroit home sold by Real Estate Market Center. Thinking of selling? Get your free instant valuation.",
  alternates: {
    canonical: "https://marketcenterrealty.com/listing/5040-patrick-road",
  },
  openGraph: {
    title: "SOLD: 5040 Patrick Road, West Bloomfield",
    description:
      "4 Bed | 3 Bath | 2,040 sqft colonial — sold by Real Estate Market Center.",
    type: "website",
  },
};

const facts = [
  { label: "Bedrooms", value: "4" },
  { label: "Bathrooms", value: "3" },
  { label: "Sq Ft", value: "2,040" },
  { label: "Style", value: "Colonial" },
  { label: "Garage", value: "2-Car" },
  { label: "City", value: "W. Bloomfield" },
];

const highlights = [
  "Modernized kitchen with granite countertops and stainless appliances",
  "White brick fireplace in the family room",
  "Hardwood flooring and updated bathrooms upstairs",
  "Full basement, expansive deck, large private backyard",
];

export default function ListingPage() {
  return (
    <SiteShell>
      <main>
        <section className="t-wrap t-listing">
          <div className="t-eyebrow">Sold &middot; MLS #20261021717</div>
          <h1>
            5040 Patrick Road<span className="t-listing-sold"> &mdash; Sold</span>
          </h1>
          <p className="t-listing-sub">West Bloomfield Twp, MI 48322</p>
          <div className="t-listing-price">
            $448,900 <span>list price</span>
          </div>

          <div className="t-stats-grid t-listing-facts">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="t-stat-num" style={{ fontSize: "clamp(26px,3vw,40px)" }}>
                  {f.value}
                </div>
                <div className="t-stat-label">{f.label}</div>
              </div>
            ))}
          </div>

          <div className="t-listing-cols">
            <div>
              <h2>
                The <span>home</span>
              </h2>
              <p className="t-hv-sub">
                A beautifully maintained 4-bedroom, 3-bath colonial with an
                updated granite kitchen, white brick fireplace, and a large
                deck over a private backyard &mdash; move-in ready, and now
                home to its next family.
              </p>
              <div className="t-about-rows">
                {highlights.map((h, i) => (
                  <div key={h}>
                    <span className="t-num">0{i + 1}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="t-listing-map">
              <iframe
                src="https://maps.google.com/maps?q=5040+Patrick+Road+West+Bloomfield+MI+48322&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="Map — 5040 Patrick Road, West Bloomfield"
              />
            </div>
          </div>
        </section>

        <div className="t-wrap t-cta-wrap">
          <div className="t-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/areas/west-bloomfield-real-estate-agent.jpg" alt="" loading="lazy" />
            <div className="t-cta-shade" aria-hidden />
            <div className="t-cta-copy">
              <h2>
                Selling your
                <br />
                <span>home next?</span>
              </h2>
              <p>
                See what your home could sell for &mdash; free instant
                estimate, verified by a broker who knows your street.
              </p>
              <Link href="/home-value" className="t-pill t-pill-solid">
                Get My Valuation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
