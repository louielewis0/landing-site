import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import RentalInquiryForm from "@/components/site/RentalInquiryForm";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: `For Rent: 5556 Pine Aires Dr, Sterling Heights — $1,800/mo | ${company.name}`,
  description:
    "For rent — move-in ready 2-bed, 2-bath condo (1,213 sq ft) in Sterling Heights, MI at $1,800/mo. Attached garage, in-unit laundry, and association fee, trash, snow & yard included. Available now from Real Estate Market Center.",
  alternates: { canonical: "https://marketcenterrealty.com/listing/5556-pine-aires" },
  openGraph: {
    title: "For Rent: 5556 Pine Aires Dr, Sterling Heights — $1,800/mo",
    description: "2 Bed | 2 Bath | 1,213 sqft condo for rent in Sterling Heights. Snow, trash & yard included. Available now.",
    type: "website",
    images: ["https://marketcenterrealty.com/listings/5556-pine-aires/p01.jpg"],
  },
};

const PHOTOS = ["p01", "p02", "p03", "p04", "p05", "p06", "p07"];
const facts = [
  { label: "Bedrooms", value: "2" },
  { label: "Bathrooms", value: "2" },
  { label: "Square feet", value: "1,213" },
  { label: "Style", value: "Condo" },
  { label: "Garage", value: "1-Car Attached" },
  { label: "Year built", value: "2001" },
];
const highlights = [
  "In-unit laundry",
  "1-car attached garage",
  "Association fee, trash, snow removal & yard maintenance — all included in rent",
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
    priceSpecification: { "@type": "UnitPriceSpecification", price: 1800, priceCurrency: "USD", unitCode: "MON" },
  },
  provider: { "@type": "RealEstateAgent", name: company.name, telephone: company.phone },
};

export default function ListingPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <style>{paStyles}</style>
      <main className="pa-root">
        {/* Hero */}
        <section className="pa-hero">
          <div className="pa-hero-glow" aria-hidden />
          <div className="pa-hero-inner">
            <div className="pa-eyebrow">For Lease &middot; Sterling Heights, Michigan</div>
            <h1 className="pa-h1">5556 Pine Aires Drive</h1>
            <div className="pa-price">$1,800 <span>/ month</span></div>
            <div className="pa-chips">
              <span>2 Bedrooms</span><span>2 Bathrooms</span><span>1,213 Sq Ft</span><span>Available Now</span>
            </div>
            <div className="pa-cta-row">
              <a href="#inquire" className="pa-btn-gold">Request a tour</a>
              <a href={`tel:${company.phoneTel}`} className="pa-btn-ghost">Call {company.phone}</a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pa-wrap">
          <div className="pa-gallery">
            {PHOTOS.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p}
                src={`/listings/5556-pine-aires/${p}.jpg`}
                alt={`5556 Pine Aires Dr, Sterling Heights — photo ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className={i === 0 ? "pa-photo pa-photo-lead" : "pa-photo"}
              />
            ))}
          </div>
        </section>

        {/* Details + form */}
        <section className="pa-wrap pa-cols">
          <div>
            <div className="pa-stats">
              {facts.map((f) => (
                <div key={f.label} className="pa-stat">
                  <div className="pa-stat-num">{f.value}</div>
                  <div className="pa-stat-label">{f.label}</div>
                </div>
              ))}
            </div>

            <h2 className="pa-h2">The residence</h2>
            <p className="pa-body">
              A move-in ready two-bedroom, two-bath condominium in a sought-after
              Sterling Heights location. Refined, low-maintenance living with a
              one-car attached garage and in-unit laundry — and the association
              fee, trash removal, snow removal, and yard maintenance are all
              included in the rent. Offered at $1,800 per month, available now.
            </p>
            <div className="pa-rows">
              {highlights.map((h, i) => (
                <div key={h} className="pa-row">
                  <span className="pa-row-n">0{i + 1}</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pa-map">
              <iframe
                src="https://maps.google.com/maps?q=5556+Pine+Aires+Dr+Sterling+Heights+MI+48314&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="Map — 5556 Pine Aires Dr, Sterling Heights"
              />
            </div>
            <p className="pa-fine">
              MLS #20261085080. Information deemed reliable but not guaranteed. Equal Housing Opportunity.
            </p>
          </div>

          <div className="pa-aside" id="inquire">
            <RentalInquiryForm />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

const paStyles = `
.pa-root{background:#0e131a;color:#f4ecdc;}
.pa-root ::selection{background:#cdae70;color:#0e131a;}
.pa-wrap{max-width:1160px;margin:0 auto;padding:0 24px;}
.pa-hero{position:relative;padding:118px 24px 70px;text-align:center;overflow:hidden;
  background:radial-gradient(1100px 620px at 50% -10%,#1b2432 0%,#0e131a 62%),#0e131a;}
.pa-hero-glow{position:absolute;inset:0;background:radial-gradient(540px 300px at 50% 8%,rgba(205,174,112,0.16),transparent 70%);pointer-events:none;}
.pa-hero-inner{position:relative;max-width:900px;margin:0 auto;}
.pa-eyebrow{font-family:var(--font-geist-sans),sans-serif;font-size:13px;font-weight:600;letter-spacing:0.32em;text-transform:uppercase;color:#cdae70;}
.pa-h1{font-family:var(--font-display),"Cormorant Garamond",Georgia,serif;font-weight:600;font-size:clamp(44px,7vw,92px);line-height:1.0;letter-spacing:-0.01em;color:#f6efe0;margin:18px 0 0;}
.pa-price{font-family:var(--font-display),Georgia,serif;font-size:clamp(30px,4.4vw,52px);color:#e8d4a2;margin-top:14px;}
.pa-price span{font-size:0.45em;color:#cdae70;letter-spacing:0.04em;}
.pa-chips{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:26px;}
.pa-chips span{font-family:var(--font-geist-sans),sans-serif;font-size:12.5px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#e9e0cd;border:1px solid rgba(205,174,112,0.4);border-radius:40px;padding:9px 18px;}
.pa-cta-row{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:34px;}
.pa-btn-gold{background:#cdae70;color:#13171d;font-family:var(--font-geist-sans),sans-serif;font-weight:700;letter-spacing:0.04em;padding:15px 34px;border-radius:40px;text-decoration:none;font-size:15px;}
.pa-btn-gold:hover{background:#dcc08a;}
.pa-btn-ghost{color:#f4ecdc;border:1px solid rgba(244,236,220,0.4);font-family:var(--font-geist-sans),sans-serif;font-weight:600;padding:15px 30px;border-radius:40px;text-decoration:none;font-size:15px;}
.pa-btn-ghost:hover{border-color:#cdae70;color:#e8d4a2;}
.pa-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:48px auto 0;}
.pa-photo{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:14px;border:1px solid rgba(205,174,112,0.32);display:block;}
.pa-photo-lead{grid-column:1 / -1;aspect-ratio:16/9;max-height:560px;}
.pa-cols{display:grid;grid-template-columns:1.5fr 1fr;gap:54px;margin-top:64px;padding-bottom:90px;align-items:start;}
.pa-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 10px;padding-bottom:30px;border-bottom:1px solid rgba(205,174,112,0.2);margin-bottom:34px;}
.pa-stat-num{font-family:var(--font-display),Georgia,serif;font-size:clamp(28px,3vw,40px);color:#e8d4a2;line-height:1;}
.pa-stat-label{font-family:var(--font-geist-sans),sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#9aa0a8;margin-top:8px;}
.pa-h2{font-family:var(--font-display),Georgia,serif;font-weight:600;font-size:clamp(28px,3.4vw,40px);color:#f6efe0;margin-bottom:16px;}
.pa-body{font-size:16px;line-height:1.8;color:#c6ccce;}
.pa-rows{margin-top:28px;display:grid;gap:16px;}
.pa-row{display:flex;gap:18px;align-items:flex-start;font-size:15.5px;line-height:1.5;color:#e4e7e6;}
.pa-row-n{font-family:var(--font-display),Georgia,serif;color:#cdae70;font-size:22px;line-height:1.2;min-width:34px;}
.pa-map{margin-top:40px;border-radius:14px;overflow:hidden;border:1px solid rgba(205,174,112,0.25);height:300px;}
.pa-map iframe{width:100%;height:100%;border:0;filter:grayscale(0.2) brightness(0.9);}
.pa-fine{font-size:11.5px;color:#7f858c;margin-top:18px;line-height:1.6;}
.pa-aside{position:sticky;top:24px;}
.pa-form{background:linear-gradient(180deg,#f8f3e8,#f1ead9);border:1px solid #e3d8bf;border-radius:20px;padding:30px 28px;box-shadow:0 30px 70px rgba(0,0,0,0.45);}
.pa-form-h{font-family:var(--font-display),Georgia,serif;font-weight:600;font-size:28px;color:#17120a;}
.pa-submit{width:100%;background:#17120a;color:#f4ecdc;font-family:var(--font-geist-sans),sans-serif;font-weight:700;letter-spacing:0.03em;font-size:15.5px;padding:15px;border:0;border-radius:11px;cursor:pointer;}
.pa-submit:hover{background:#2a2114;}
.pa-submit:disabled{opacity:0.6;cursor:default;}
@media (max-width:860px){
  .pa-cols{grid-template-columns:1fr;gap:40px;}
  .pa-aside{position:static;}
  .pa-gallery{grid-template-columns:repeat(2,1fr);}
  .pa-photo-lead{aspect-ratio:4/3;}
}
`;
