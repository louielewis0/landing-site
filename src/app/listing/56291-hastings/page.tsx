import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import ListingInquiry from "@/components/site/ListingInquiry";
import ListingCarousel from "@/components/site/ListingCarousel";
import { company } from "@/lib/config";

const PROPERTY = "56291 Hastings Dr, Macomb Twp";

export const metadata: Metadata = {
  title: `56291 Hastings, Macomb Twp — Off Market | 4 Bed Colonial | ${company.name}`,
  description:
    "56291 Hastings, Macomb Twp MI 48042 — a 4-bed, 2.1-bath, 3,600 sqft colonial listed by Real Estate Market Center. Currently off market. We're the listing agents — inquire and we'll reach back if it returns to the market.",
  alternates: {
    canonical: "https://marketcenterrealty.com/listing/56291-hastings",
  },
  openGraph: {
    title: "56291 Hastings, Macomb Twp — Off Market",
    description:
      "4 Bed | 2.1 Bath | 3,600 sqft finished colonial in Macomb Twp. Off market — inquire with the listing agents at Real Estate Market Center.",
    type: "website",
    images: ["/listing/hastings/exterior.jpg"],
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

const PHOTOS = [
  { src: "/listing/hastings/exterior.jpg", alt: "Front exterior — brick colonial with covered entry and two-car garage" },
  { src: "/listing/hastings/kitchen.jpg", alt: "Updated kitchen with granite counters and stainless appliances" },
  { src: "/listing/hastings/living.jpg", alt: "Open living room with fireplace" },
  { src: "/listing/hastings/dining.jpg", alt: "Dining area with doorwall to the backyard patio" },
  { src: "/listing/hastings/bathroom.jpg", alt: "Full bathroom with double vanity and marble counters" },
  { src: "/listing/hastings/bedroom.jpg", alt: "Primary bedroom with vaulted ceiling and large windows" },
];

export default function HastingsListing() {
  return (
    <SiteShell>
      <main>
        <section className="t-wrap t-listing">
          <div className="t-eyebrow">Off Market &middot; Listed by {company.name}</div>
          <h1>
            56291 Hastings Dr<span className="t-listing-sold"> &mdash; Off Market</span>
          </h1>
          <p className="t-listing-sub">Macomb Twp, MI 48042 &middot; Strathmore Sub</p>
          <div className="t-listing-price">
            Off Market <span>4 bd &middot; 2.1 ba &middot; 3,600 sqft &middot; last listed $520,000</span>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: "16px 20px",
              borderRadius: 14,
              background: "rgba(217,118,47,0.06)",
              border: "1px solid rgba(217,118,47,0.28)",
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "var(--s-ink)",
              maxWidth: 620,
            }}
          >
            This home is <strong>not currently on the market</strong>. We&rsquo;re the listing agents, and it may
            return &mdash; if you have questions or want to be notified if it comes back on, send an inquiry below
            and a broker will reach back.
          </div>

          <div className="t-listing-actions" style={{ marginTop: 22 }}>
            <a href="#inquire" className="t-pill t-pill-solid t-pill-dark">
              Ask about this home
            </a>
          </div>

          {/* Photo slideshow — the actual Hastings house, uncropped */}
          <ListingCarousel photos={PHOTOS} />

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

        {/* Off-market inquiry section (replaces the showing CTA) */}
        <div className="t-wrap t-cta-wrap" id="inquire">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }} className="t-listing-cols">
            <div>
              <h2>
                Interested in
                <br />
                <span>this home?</span>
              </h2>
              <p className="t-hv-sub">
                It&rsquo;s off market for now, but as the listing agents we can tell you more about the property,
                the neighborhood, and whether it&rsquo;s likely to return. Leave your details and we&rsquo;ll reach
                back personally.
              </p>
              <p style={{ fontSize: 14, color: "var(--s-muted)", marginTop: 16 }}>
                Thinking about your own move?{" "}
                <Link href="/home-value" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                  See what your home is worth
                </Link>{" "}
                or{" "}
                <Link href="/reviews" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                  read our client reviews
                </Link>
                .
              </p>
            </div>
            <ListingInquiry property={PROPERTY} source="off-market-inquiry-hastings" />
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
