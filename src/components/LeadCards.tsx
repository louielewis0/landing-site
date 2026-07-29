import { company } from "@/lib/config";

type Card = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  ctaLabel: string;
  href: string;
};

const cards: Card[] = [
  {
    id: "value",
    eyebrow: "Free home valuation",
    title: "What's my home worth?",
    blurb: "A real Metro Detroit valuation, not a Zestimate. Detailed, in 24 hours.",
    ctaLabel: "Get my value",
    href: "/home-value",
  },
  {
    id: "new-listings",
    eyebrow: "Buyer early access",
    title: "New listings, before Zillow.",
    blurb: "See homes in Troy & Rochester Hills the day they hit the MLS.",
    ctaLabel: "Send me listings",
    href: "/#contact",
  },
  {
    id: "sell",
    eyebrow: "Seller strategy",
    title: "Sell on your terms.",
    blurb: "Find out what serious buyers would pay for your home today.",
    ctaLabel: "Start selling",
    href: "/home-value",
  },
  {
    id: "consult",
    eyebrow: "Talk to a broker",
    title: "Schedule a consultation.",
    blurb: "A direct conversation with a Metro Detroit real-estate expert.",
    ctaLabel: "Book a call",
    href: `tel:${company.phoneTel}`,
  },
];

/**
 * "Pick your move" cards — prototype service-card treatment on cream.
 * Copy and destinations unchanged.
 */
export default function LeadCards() {
  return (
    <section id="listings" className="sec-pad bg-cream">
      <div className="container">
        <div className="sec-head reveal">
          <div className="s-eyebrow">How we can help today</div>
          <h2>Pick your move. We handle the rest.</h2>
          <p>
            Every option below connects you directly with a local Metro Detroit
            broker. No bots, no generic replies. Most clients hear back within
            the hour.
          </p>
        </div>
        <div className="services-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 22 }}>
          {cards.map((card) => (
            <a key={card.id} href={card.href} className="service-card reveal" style={{ display: "block", padding: "40px 34px" }}>
              <div className="s-eyebrow">{card.eyebrow}</div>
              <h3 style={{ fontSize: 24 }}>{card.title}</h3>
              <p style={{ fontSize: 15, marginTop: 6 }}>{card.blurb}</p>
              <span style={{ display: "inline-block", marginTop: 18, color: "var(--s-gold)", fontWeight: 600, fontSize: 14 }}>
                {card.ctaLabel} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
