import { company } from "@/lib/config";

const picks = [
  {
    quote: "Sold in 6 days for $18,000 over asking. Smooth, professional, stress-free.",
    name: "Recent Seller",
    role: "Troy, MI",
  },
  {
    quote: "First-time buyers with no clue what we were doing. They got us a better deal than we expected.",
    name: "First-Time Buyer",
    role: "Rochester Hills, MI",
  },
  {
    quote: "Another agent listed our home for months with no results. They had it under contract in 2 weeks.",
    name: "Relisted Seller",
    role: "Birmingham, MI",
  },
];

/**
 * Testimonials — prototype .testi-card treatment: cream-2 section,
 * white cards, gold stars, Fraunces quotes. Copy unchanged.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="sec-pad bg-cream-2">
      <div className="container">
        <div className="sec-head reveal">
          <div className="s-eyebrow">What clients say</div>
          <h2>Outcomes, not promises.</h2>
        </div>
        <div className="testi-grid">
          {picks.map((t) => (
            <div key={t.name} className="testi-card reveal">
              <div className="stars">★★★★★</div>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-who">
                <b>{t.name}</b> · {t.role}
              </div>
            </div>
          ))}
        </div>
        <div className="areas-more reveal">
          <a href="/home-value">Request your valuation →</a> or call{" "}
          <a href={`tel:${company.phoneTel}`} style={{ fontWeight: 600 }}>
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
