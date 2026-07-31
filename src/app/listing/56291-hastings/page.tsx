import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import ShowingCTA from "@/components/site/ShowingCTA";
import { company } from "@/lib/config";

const PROPERTY = "56291 Hastings Dr, Macomb Twp";

export const metadata: Metadata = {
  title: `56291 Hastings, Macomb Twp — $520,000 | 4 Bed Colonial | ${company.name}`,
  description:
    "For sale: 56291 Hastings, Macomb Twp MI 48042. 4-bed, 2.1-bath colonial, 3,600 finished sqft, updated kitchen, finished basement, stamped-concrete patio. $520,000. MLS #20261057937. Listed by Real Estate Market Center.",
  alternates: {
    canonical: "https://marketcenterrealty.com/listing/56291-hastings",
  },
  openGraph: {
    title: "56291 Hastings, Macomb Twp — $520,000",
    description:
      "4 Bed | 2.1 Bath | 3,600 sqft finished colonial with updated kitchen, finished basement & stamped-concrete patio.",
    type: "website",
    images: ["/listing/hastings/1.jpg"],
  },
  robots: { index: true, follow: true },
};

const facts = [
  { label: "Bedrooms", value: "4" },
  { label: "Baths", value: "2.1" },
  { label: "Finished", value: "3,600" },
  { label: "Style", value: "Colonial" },
  { label: "Garage", value: "2-Car" },
  { label: "Built", value: "2005" },
];

const highlights = [
  "Bright, open floor plan with spacious main-level living areas",
  "Beautifully updated kitchen with granite counters and gas range",
  "Finished basement adding rec, media, and workout space",
  "Private backyard with a stamped-concrete patio",
  "Renovated in 2023, natural-gas forced air, city water and sewer",
  "New Haven schools, 0.3-acre lot in Strathmore Sub",
];

const inquiryMail = `mailto:${company.email}?subject=${encodeURIComponent(
  "Inquiry: 56291 Hastings, Macomb Twp (MLS #20261057937)"
)}&body=${encodeURIComponent(
  "Hi, I'm interested in 56291 Hastings, Macomb Twp. Please send me more information or set up a showing."
)}`;

export default function HastingsListing() {
  return (
    <SiteShell>
      <main>
        <section className="t-wrap t-listing">
          <div className="t-eyebrow">For Sale &middot; MLS #20261057937</div>
          <h1>56291 Hastings Dr</h1>
          <p className="t-listing-sub">Macomb Twp, MI 48042 &middot; Strathmore Sub</p>
          <div className="t-listing-price">
            $520,000 <span>4 bd &middot; 2.1 ba &middot; 3,600 sqft</span>
          </div>

          <div className="t-listing-actions">
            <ShowingCTA property={PROPERTY} label="Schedule a showing" />
            <a href={inquiryMail} className="t-pill-ghost">
              Request info
            </a>
          </div>

          <div className="t-stats-grid t-listing-facts" style={{ marginTop: 52 }}>
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
                Welcome to this beautifully maintained Macomb Township colonial &mdash;
                a bright, open floor plan, spacious living areas, a fully updated
                kitchen, and a finished basement for extra living space. Step out to
                a private backyard with a stamped-concrete patio, all on a
                established 0.3-acre lot in Strathmore Sub.
              </p>
              <div className="t-about-rows">
                {highlights.map((h, i) => (
                  <div key={h}>
                    <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="t-listing-map">
              <iframe
                src="https://maps.google.com/maps?q=56291+Hastings+Macomb+MI+48042&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="Map — 56291 Hastings, Macomb Twp"
              />
            </div>
          </div>
        </section>

        <div className="t-wrap t-cta-wrap">
          <div className="t-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/listing/hastings/1.jpg" alt="" loading="lazy" />
            <div className="t-cta-shade" aria-hidden />
            <div className="t-cta-copy">
              <h2>
                Want to see it
                <br />
                <span>in person?</span>
              </h2>
              <p>
                Book a private showing in a few taps. Tell us when works and a
                licensed broker confirms your time personally.
              </p>
              <ShowingCTA property={PROPERTY} />
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
