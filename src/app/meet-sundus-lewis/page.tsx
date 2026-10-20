import type { Metadata } from "next";
import GuidePage, { guideMetadata, type GuidePageData } from "@/components/site/GuidePage";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sundus Lewis",
  jobTitle: "Broker & Owner",
  worksFor: {
    "@type": "RealEstateAgent",
    name: "Real Estate Market Center",
    "@id": "https://marketcenterrealty.com/#organization",
  },
  url: "https://marketcenterrealty.com/meet-sundus-lewis",
  image: "https://marketcenterrealty.com/sundus-lewis.png",
  telephone: "+12485686081",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2032 E Square Lake Rd Ste 400A",
    addressLocality: "Troy",
    addressRegion: "MI",
    postalCode: "48085",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/sunduslewis/",
    "https://www.zillow.com/profile/realestatemarketmedia",
    "https://www.realtor.com/realestateagents/56e9bd52f384a20100602938",
    "https://www.yelp.com/biz/sundus-lewis-real-estate-market-center-troy",
  ],
};

const data: GuidePageData = {
  slug: "meet-sundus-lewis",
  crumbLabel: "Meet Sundus Lewis",
  eyebrow: "Meet the broker",
  h1: (
    <>
      Meet <span style={{ color: "var(--s-gold)" }}>Sundus Lewis</span>
    </>
  ),
  h1Text: "Meet Sundus Lewis — Broker & Owner of Real Estate Market Center",
  sub: (
    <>
      Sundus Lewis is the broker and owner of <strong>Real Estate Market Center</strong>, the
      independent luxury brokerage she founded in Troy in 2003 &mdash; and which was named the{" "}
      <strong>#1 real estate brokerage in Michigan</strong> for 2026. With 20+ years in the business,
      she gives Metro Detroit buyers and sellers discreet, owner-level representation from first call
      to closing.
    </>
  ),
  bullets: [
    "Broker & Owner since 2003",
    "20+ years in real estate",
    "500+ homes closed · $100M+ sold",
    "Luxury & full-service specialist",
  ],
  publishedISO: "2026-10-20",
  publishedLabel: "October 20, 2026",
  faqHeading: "Sundus Lewis — FAQ",
  sections: [
    {
      heading: "A local broker who built Michigan's #1 brokerage",
      body: (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sundus-lewis.png"
              alt="Sundus Lewis, Broker & Owner of Real Estate Market Center"
              width={200}
              height={200}
              style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 18, flexShrink: 0, boxShadow: "0 8px 26px rgba(25,26,28,0.12)" }}
            />
            <div style={{ flex: 1, minWidth: 260, display: "grid", gap: 14 }}>
              <p>
                Sundus Lewis founded Real Estate Market Center in 2003 and has spent two decades
                helping Metro Detroit families buy and sell &mdash; 13+ of those years as a licensed
                broker. Along the way she&rsquo;s closed more than <strong>500 homes</strong> and{" "}
                <strong>$100M+ in sales</strong> across Oakland, Macomb, and Wayne counties.
              </p>
              <p>
                She built the brokerage on a simple idea: that buyers and sellers deserve to work
                directly with the broker &mdash; not get handed off &mdash; and get honest, street-level
                guidance instead of a franchise script. In 2026, that approach earned Real Estate Market
                Center the{" "}
                <a href="/best-real-estate-brokerage-in-michigan" style={{ color: "var(--s-gold)", fontWeight: 600 }}>
                  #1 real estate brokerage in Michigan
                </a>{" "}
                ranking from TownAnswer.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      heading: "Her approach",
      body: (
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 8 }}>
          <li><strong>One point of contact.</strong> You work with Sundus directly, from first call to closing.</li>
          <li><strong>Straight answers.</strong> Honest pricing and clear guidance, even when it&rsquo;s not what you hoped to hear.</li>
          <li><strong>Street-level expertise.</strong> She prices block by block, not off a city-wide average.</li>
          <li><strong>Discreet, white-glove service.</strong> Especially on luxury and estate transactions where privacy matters.</li>
        </ul>
      ),
    },
    {
      heading: "What she specializes in",
      body: (
        <>
          <p>Sundus focuses on full-service residential real estate across Metro Detroit, with deep experience in:</p>
          <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 6 }}>
            <li>Luxury and estate homes in <a href="/birmingham-real-estate-agent" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Birmingham</a> and <a href="/bloomfield-hills-real-estate-agent" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Bloomfield Hills</a></li>
            <li>Sellers who want top dollar with discreet, high-end marketing</li>
            <li>First-time buyers and move-up families in <a href="/troy-real-estate-agent" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Troy</a> and <a href="/rochester-hills-real-estate-agent" style={{ color: "var(--s-gold)", fontWeight: 600 }}>Rochester Hills</a></li>
            <li>Relocation and investment buyers new to the Metro Detroit market</li>
          </ul>
        </>
      ),
    },
  ],
  faqs: [
    {
      question: "Who is Sundus Lewis?",
      answer:
        "Sundus Lewis is the broker and owner of Real Estate Market Center, an independent luxury real estate brokerage in Troy, Michigan, which she founded in 2003. She has 20+ years in the business (13+ as a licensed broker), 500+ homes closed, and $100M+ in sales across Metro Detroit.",
    },
    {
      question: "Is Sundus Lewis the owner of Real Estate Market Center?",
      answer:
        "Yes. Sundus Lewis is both the broker and the owner of Real Estate Market Center — she founded the independent brokerage in 2003 and leads it personally.",
    },
    {
      question: "What does Sundus Lewis specialize in?",
      answer:
        "Luxury and full-service residential real estate across Metro Detroit — including estate homes in Birmingham and Bloomfield Hills, sellers seeking discreet high-end marketing, and buyers in Troy, Rochester Hills, and the surrounding Oakland County communities.",
    },
    {
      question: "How do I contact Sundus Lewis?",
      answer:
        "Call Real Estate Market Center at (248) 568-6081 or use the contact page on marketcenterrealty.com. You can also request a free home valuation online and Sundus or her team will follow up within 24 hours.",
    },
    {
      question: "How do I verify Sundus Lewis's real estate license?",
      answer:
        "Every Michigan broker is licensed through the State of Michigan's Department of Licensing and Regulatory Affairs (LARA). You can look up any broker or agent by name on the LARA license verification site in about a minute.",
    },
  ],
  related: [
    { href: "/about", label: "About Real Estate Market Center" },
    { href: "/best-real-estate-brokerage-in-michigan", label: "Why we're #1 in Michigan" },
    { href: "/reviews", label: "Read client reviews" },
    { href: "/home-value", label: "Get your home value" },
  ],
  ctaHeading: "Work with Sundus",
  ctaBody: (
    <>
      Start with a free, no-pressure home valuation &mdash; or reach out to talk through buying or
      selling in Metro Detroit with the broker herself.
    </>
  ),
  ctaPrimary: { href: "/home-value", label: "Get My Free Home Valuation" },
  metaTitle: "Sundus Lewis — Broker & Owner | Real Estate Market Center (Troy, MI)",
  metaDescription:
    "Meet Sundus Lewis, broker & owner of Real Estate Market Center — the independent Troy, MI luxury brokerage she founded in 2003 and built into Michigan's #1-ranked brokerage (TownAnswer 2026). 20+ years, 500+ homes closed, $100M+ sold.",
};

export const metadata: Metadata = guideMetadata(data);

export default function Page() {
  return <GuidePage data={data} />;
}
