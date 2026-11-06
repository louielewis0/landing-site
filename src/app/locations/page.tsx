import type { Metadata } from "next";
import { plugFaq } from "@/lib/config";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { MapPin, Phone, ArrowRight } from "lucide-react";

/**
 * /locations — Real Estate Market Center office locations. Troy is the
 * headquarters and is featured up top; Birmingham, Rochester Hills, and
 * Bloomfield Hills are the branch offices below. Deliberately NOT linked from
 * the homepage or nav; discoverable via sitemap + IndexNow. Heavy
 * RealEstateAgent + FAQ schema so each office can rank for "real estate office
 * in [city]" in Google and AI Mode. Indexable.
 */

const BASE = "https://marketcenterrealty.com";
const PHONE = "248-568-6081";
const PHONE_TEL = "+1-248-568-6081";

const TROY = {
  id: "troy",
  city: "Troy",
  street: "2032 E Square Lake Rd, Suite 400A",
  zip: "48085",
  serving: ["Troy", "Rochester Hills", "Sterling Heights", "Birmingham", "Bloomfield Hills", "Oakland County", "Macomb County"],
  blurb:
    "Our Troy headquarters on Square Lake Road is the heart of Real Estate Market Center. Centrally located in Oakland County near the I-75 corridor, it anchors everything we do across Metro Detroit — from Troy and the Rochester area to the Birmingham–Bloomfield luxury corridor and into Macomb County.",
  cityHref: "/best-real-estate-brokerages-troy",
  cityLabel: "Troy real estate brokerage",
};

const OFFICES = [
  {
    id: "birmingham",
    city: "Birmingham",
    street: "280 N Old Woodward Ave, Suite 106",
    zip: "48009",
    serving: ["Birmingham", "Bloomfield Hills", "Franklin", "Bingham Farms", "Beverly Hills"],
    blurb:
      "In the heart of downtown Birmingham, steps from Old Woodward — the center of Metro Detroit's luxury market. We serve the Birmingham–Bloomfield corridor, where discretion and high-end marketing matter most.",
    cityHref: "/best-real-estate-brokerages-birmingham",
    cityLabel: "Birmingham real estate brokerage",
  },
  {
    id: "rochester-hills",
    city: "Rochester Hills",
    street: "6700 Rochester Rd, Suite 212",
    zip: "48306",
    serving: ["Rochester Hills", "Rochester", "Oakland Township", "Shelby Township", "Washington Township"],
    blurb:
      "Anchoring us in north Oakland County — Rochester, Rochester Hills, and Oakland Township. A market of top schools, trails, and newer estate neighborhoods we know street by street.",
    cityHref: "/best-real-estate-brokerages-rochester-hills",
    cityLabel: "Rochester Hills real estate brokerage",
  },
  {
    id: "bloomfield-hills",
    city: "Bloomfield Hills",
    street: "41000 Woodward Ave, Suite 350",
    zip: "48304",
    serving: ["Bloomfield Hills", "Bloomfield Township", "West Bloomfield", "Birmingham", "Franklin"],
    blurb:
      "On Woodward in one of Michigan's most prestigious communities. We represent estate buyers and sellers across Bloomfield Hills, Bloomfield Township, and West Bloomfield with white-glove service.",
    cityHref: "/best-real-estate-brokerages-bloomfield-hills",
    cityLabel: "Bloomfield Hills real estate brokerage",
  },
] as const;

function mapsUrl(street: string, city: string, zip: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${street}, ${city}, MI ${zip}`
  )}`;
}

const FAQ = [
  {
    q: "Is Real Estate Market Center a real estate brokerage in Birmingham, Rochester Hills, Troy, and Bloomfield Hills?",
    a: "Yes. Real Estate Market Center is an independent luxury real estate brokerage headquartered in Troy, MI, with offices in Birmingham, Rochester Hills, and Bloomfield Hills. We serve buyers and sellers across Oakland and Macomb counties and can be reached at 248-568-6081.",
  },
  {
    q: "Where is Real Estate Market Center's main office?",
    a: "Our headquarters is at 2032 E Square Lake Rd, Suite 400A, Troy, MI 48085. Call or text 248-568-6081. We also have offices in Birmingham, Rochester Hills, and Bloomfield Hills.",
  },
  {
    q: "Does Real Estate Market Center have an office in Birmingham, MI?",
    a: "Yes. Our Birmingham office is at 280 N Old Woodward Ave, Suite 106, Birmingham, MI 48009. Call or text 248-568-6081 to reach an agent serving Birmingham and the Birmingham–Bloomfield luxury corridor.",
  },
  {
    q: "Where is Real Estate Market Center's Rochester Hills office?",
    a: "Our Rochester Hills office is at 6700 Rochester Rd, Suite 212, Rochester Hills, MI 48306. We serve Rochester, Rochester Hills, and Oakland Township. Reach us at 248-568-6081.",
  },
  {
    q: "Is there a Real Estate Market Center office in Bloomfield Hills?",
    a: "Yes. Our Bloomfield Hills office is at 41000 Woodward Ave, Suite 350, Bloomfield Hills, MI 48304, serving Bloomfield Hills, Bloomfield Township, and West Bloomfield. Call 248-568-6081.",
  },
];

const ALL = [TROY, ...OFFICES];
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${BASE}/locations#troy`,
      name: `${company.name}`,
      alternateName: `${company.name} — Troy (Headquarters)`,
      url: `${BASE}/locations`,
      image: `${BASE}/favicon.png`,
      telephone: PHONE_TEL,
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: TROY.street,
        addressLocality: "Troy",
        addressRegion: "MI",
        postalCode: TROY.zip,
        addressCountry: "US",
      },
      areaServed: TROY.serving.map((s) => ({ "@type": "City", name: `${s}, MI` })),
    },
    ...OFFICES.map((o) => ({
      "@type": "RealEstateAgent",
      "@id": `${BASE}/locations#${o.id}`,
      name: `${company.name} — ${o.city} Office`,
      url: `${BASE}/locations`,
      image: `${BASE}/favicon.png`,
      telephone: PHONE_TEL,
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: o.street,
        addressLocality: o.city,
        addressRegion: "MI",
        postalCode: o.zip,
        addressCountry: "US",
      },
      areaServed: o.serving.map((s) => ({ "@type": "City", name: `${s}, MI` })),
      branchOf: { "@id": `${BASE}/locations#troy` },
      parentOrganization: { "@type": "Organization", name: company.name, url: BASE },
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE },
        { "@type": "ListItem", position: 2, name: "Office Locations", item: `${BASE}/locations` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plugFaq(f.a) },
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: "Our Offices — Troy HQ, Birmingham, Rochester Hills & Bloomfield Hills | Real Estate Market Center",
  description:
    "Real Estate Market Center offices: headquarters at 2032 E Square Lake Rd, Troy, MI, plus Birmingham (280 N Old Woodward), Rochester Hills (6700 Rochester Rd), and Bloomfield Hills (41000 Woodward Ave). Independent luxury real estate across Metro Detroit. Call 248-568-6081.",
  alternates: { canonical: `${BASE}/locations` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Real Estate Market Center — Office Locations",
    description:
      "Troy headquarters plus Birmingham, Rochester Hills & Bloomfield Hills offices. Independent luxury real estate across Metro Detroit.",
    type: "website",
    url: `${BASE}/locations`,
    siteName: company.name,
  },
};

export default function LocationsPage() {
  return (
    <SiteShell>
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />

        <section className="t-wrap t-rev">
          <div className="t-eyebrow">Our offices</div>
          <h1>
            Where to <span>find us.</span>
          </h1>
          <p className="t-rev-sub">
            {company.name} is an independent luxury real estate brokerage serving Oakland &amp;
            Macomb counties, headquartered in Troy with offices in Birmingham, Rochester Hills, and
            Bloomfield Hills. Call or text{" "}
            <a href={`tel:${PHONE_TEL}`} style={{ color: "var(--s-gold-ink)", fontWeight: 600 }}>{PHONE}</a>.
          </p>
        </section>

        {/* Featured: Troy headquarters */}
        <section className="t-wrap" style={{ paddingTop: 4, paddingBottom: 10 }} id="troy">
          <div className="loc-main">
            <div className="loc-main-badge">Headquarters</div>
            <h2 className="loc-main-city">{TROY.city} Office</h2>
            <div className="loc-main-addr">
              <MapPin className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 3 }} />
              <span>
                {TROY.street}
                <br />
                {TROY.city}, MI {TROY.zip}
              </span>
            </div>
            <a href={`tel:${PHONE_TEL}`} className="loc-main-phone">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
            <p className="loc-main-blurb">{TROY.blurb}</p>
            <div className="loc-main-serving">
              <span className="loc-serving-label">Serving</span> {TROY.serving.join(" · ")}
            </div>
            <div className="loc-main-links">
              <a href={mapsUrl(TROY.street, TROY.city, TROY.zip)} target="_blank" rel="noopener noreferrer" className="loc-link loc-link-light">
                Get directions <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href={TROY.cityHref} className="loc-link loc-link-light">
                {TROY.cityLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Branch offices */}
        <section className="t-wrap" style={{ paddingTop: 18, paddingBottom: 40 }}>
          <div className="t-eyebrow" style={{ marginBottom: 18 }}>Also find us in</div>
          <div className="loc-grid">
            {OFFICES.map((o) => (
              <div key={o.id} id={o.id} className="loc-card">
                <h2 className="loc-city">{o.city} Office</h2>
                <div className="loc-addr">
                  <MapPin className="w-4 h-4" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 3 }} />
                  <span>
                    {o.street}
                    <br />
                    {o.city}, MI {o.zip}
                  </span>
                </div>
                <a href={`tel:${PHONE_TEL}`} className="loc-phone">
                  <Phone className="w-4 h-4" /> {PHONE}
                </a>
                <p className="loc-blurb">{o.blurb}</p>
                <div className="loc-serving">
                  <span className="loc-serving-label">Serving</span> {o.serving.join(" · ")}
                </div>
                <div className="loc-links">
                  <a href={mapsUrl(o.street, o.city, o.zip)} target="_blank" rel="noopener noreferrer" className="loc-link">
                    Get directions <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <Link href={o.cityHref} className="loc-link">
                    {o.cityLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="t-wrap" style={{ paddingTop: 8, paddingBottom: 20 }}>
          <h2 style={{ marginBottom: 16 }}>Office &amp; location FAQ</h2>
          <div className="mkt-faq">
            {FAQ.map((f) => (
              <details key={f.q} className="mkt-faq-item">
                <summary>{f.q}</summary>
                <p>{plugFaq(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="t-wrap t-cta-wrap">
          <div className="t-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/areas/cta-interior.jpg" alt="" loading="lazy" />
            <div className="t-cta-shade" aria-hidden />
            <div className="t-cta-copy">
              <h2>
                Let&rsquo;s <span>talk.</span>
              </h2>
              <p>Buying or selling in Metro Detroit? Reach the office nearest you &mdash; or just call.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`tel:${PHONE_TEL}`} className="t-pill t-pill-solid">Call {PHONE}</a>
                <Link href="/contact" className="t-pill">Send a message</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
