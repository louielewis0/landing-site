import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: `For Rent: 5556 Pine Aires Dr, Sterling Heights — $1,800/mo | ${company.name}`,
  description:
    "For rent — move-in ready 2-bed, 2-bath condo (1,213 sq ft) in Sterling Heights, MI at $1,800/mo. Attached garage, in-unit laundry, and association fee, trash, snow & yard included. Available now from Real Estate Market Center.",
  alternates: {
    canonical: "https://marketcenterrealty.com/listing/5556-pine-aires",
  },
  openGraph: {
    title: "For Rent: 5556 Pine Aires Dr, Sterling Heights — $1,800/mo",
    description:
      "2 Bed | 2 Bath | 1,213 sqft condo for rent in Sterling Heights. Snow, trash & yard included. Available now.",
    type: "website",
    images: ["https://marketcenterrealty.com/listings/5556-pine-aires/p01.jpg"],
  },
};

const PHOTOS = ["p01", "p02", "p03", "p04", "p05", "p06", "p07"];

const facts = [
  { label: "Bedrooms", value: "2" },
  { label: "Bathrooms", value: "2" },
  { label: "Sq Ft", value: "1,213" },
  { label: "Style", value: "Condo" },
  { label: "Garage", value: "1-Car" },
  { label: "Built", value: "2001" },
];

const highlights = [
  "In-unit laundry",
  "1-car attached garage",
  "Association fee, trash removal, snow removal & yard maintenance included in rent",
  "Security deposit: 1.5 months' rent · available now",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Apartment",
  name: "5556 Pine Aires Dr, Sterling Heights, MI",
  url: "https://marketcenterrealty.com/listing/5556-pine-aires",
  image: PHOTOS.map((p) => `https://marketcenterrealty.com/listings/5556-pine-aires/${p}.jpg`),
  numberOfBedrooms: 2,
  numberOfBathroomsTotal: 2,
  floorSize: { "@type": "QuantitativeValue", value: 1213, unitCode: "FTK" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "5556 Pine Aires Dr",
    addressLocality: "Sterling Heights",
    addressRegion: "MI",
    postalCode: "48314",
    addressCountry: "US",
  },
  offers: {
    "@type": "Offer",
    price: 1800,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    businessFunction: "https://schema.org/LeaseOut",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: 1800,
      priceCurrency: "USD",
      unitCode: "MON",
    },
  },
  provider: { "@type": "RealEstateAgent", name: company.name, telephone: company.phone },
};

export default function ListingPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        <section className="t-wrap t-listing">
          <div className="t-eyebrow">For Rent &middot; MLS #20261085080</div>
          <h1>5556 Pine Aires Drive</h1>
          <p className="t-listing-sub">Sterling Heights, MI 48314</p>
          <div className="t-listing-price">
            $1,800 <span>/ month</span>
          </div>

          {/* Gallery */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 12,
              marginTop: 28,
            }}
          >
            {PHOTOS.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p}
                src={`/listings/5556-pine-aires/${p}.jpg`}
                alt={`5556 Pine Aires Dr, Sterling Heights — photo ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  borderRadius: 14,
                  border: "1px solid var(--line)",
                  gridColumn: i === 0 ? "1 / -1" : undefined,
                  maxHeight: i === 0 ? 520 : undefined,
                }}
              />
            ))}
          </div>

          <div className="t-stats-grid t-listing-facts" style={{ marginTop: 28 }}>
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
                A move-in ready 2-bedroom, 2-bath condo in a fantastic Sterling
                Heights location. Low-maintenance living with a 1-car attached
                garage and in-unit laundry &mdash; and the association fee, trash
                removal, snow removal and yard maintenance are all included in
                the rent. Available now at $1,800/month.
              </p>
              <div className="t-about-rows">
                {highlights.map((h, i) => (
                  <div key={h}>
                    <span className="t-num">0{i + 1}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--s-muted)", marginTop: 20 }}>
                Information deemed reliable but not guaranteed. Equal Housing Opportunity.
              </p>
            </div>
            <div className="t-listing-map">
              <iframe
                src="https://maps.google.com/maps?q=5556+Pine+Aires+Dr+Sterling+Heights+MI+48314&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="Map — 5556 Pine Aires Dr, Sterling Heights"
              />
            </div>
          </div>
        </section>

        <div className="t-wrap t-cta-wrap">
          <div className="t-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/listings/5556-pine-aires/p01.jpg" alt="" loading="lazy" />
            <div className="t-cta-shade" aria-hidden />
            <div className="t-cta-copy">
              <h2>
                Want to
                <br />
                <span>tour it?</span>
              </h2>
              <p>
                Call or text Real Estate Market Center to schedule a showing this
                week &mdash; it won&rsquo;t last long.
              </p>
              <a href={`tel:${company.phoneTel}`} className="t-pill t-pill-solid">
                Call {company.phone}
              </a>
              <div style={{ marginTop: 12 }}>
                <Link href="/contact" style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                  Or send a message &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
