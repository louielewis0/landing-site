import { company } from "@/lib/config";
import Reveal from "./motion/Reveal";

type Card = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  ctaLabel: string;
  href: string;
  icon: React.ReactNode;
};

const cards: Card[] = [
  {
    id: "value",
    eyebrow: "Free home valuation",
    title: "What's my home worth?",
    blurb: "A real Metro Detroit valuation, not a Zestimate. Detailed, in 24 hours.",
    ctaLabel: "Get my value",
    href: "#lead-magnet",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
  },
  {
    id: "new-listings",
    eyebrow: "Buyer early access",
    title: "New listings, before Zillow.",
    blurb: "See homes in Troy & Rochester Hills the day they hit the MLS.",
    ctaLabel: "Send me listings",
    href: "#contact",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
      </svg>
    ),
  },
  {
    id: "sell",
    eyebrow: "Seller strategy",
    title: "Sell on your terms.",
    blurb: "Find out what serious buyers would pay for your home today.",
    ctaLabel: "Start selling",
    href: "#lead-magnet",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: "consult",
    eyebrow: "Talk to a broker",
    title: "Schedule a consultation.",
    blurb: "A direct conversation with a Metro Detroit real-estate expert.",
    ctaLabel: "Book a call",
    href: `tel:${company.phoneTel}`,
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.2a1 1 0 01.97.76l1 4a1 1 0 01-.53 1.15L7 9.8a11 11 0 007.2 7.2l.89-1.64a1 1 0 011.15-.53l4 1a1 1 0 01.76.97V19a2 2 0 01-2 2A16 16 0 013 5z" />
      </svg>
    ),
  },
];

export default function LeadCards() {
  return (
    <section id="listings" className="relative py-32 atmosphere overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Reveal>
            <p className="eyebrow mb-5">How we can help today</p>
          </Reveal>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] mb-6 text-bone">
            <span className="block overflow-hidden">
              <Reveal variant="mask" className="block">Pick your move.</Reveal>
            </span>
            <span className="block overflow-hidden">
              <Reveal variant="mask" delay={1} className="block italic gold-text">We handle the rest.</Reveal>
            </span>
          </h2>
          <Reveal delay={2}>
            <p className="text-[17px] text-bone/55 leading-relaxed max-w-2xl font-light">
              Every option below connects you directly with a local Metro Detroit
              broker. No bots, no generic replies. Most clients hear back within
              the hour.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <Reveal
              key={card.id}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              as="a"
              className="group relative overflow-hidden rounded-2xl p-9 lg:p-10 min-h-[300px] flex flex-col justify-between border border-bone/10 bg-gradient-to-br from-ink-2 to-ink hover:border-[var(--gold)]/40 transition-all duration-700 tilt"
            >
              <a href={card.href} className="absolute inset-0 z-10" aria-label={card.title} />

              {/* warm corner glow */}
              <span
                aria-hidden
                className="absolute -top-32 -right-32 w-72 h-72 rounded-full opacity-50 group-hover:opacity-90 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(circle, rgba(200,162,76,0.22), transparent 65%)",
                }}
              />

              <div className="relative">
                <div className="w-12 h-12 rounded-full border border-bone/15 flex items-center justify-center mb-7 text-[var(--gold-soft)] group-hover:border-[var(--gold)]/50 transition-colors duration-700">
                  <span className="w-6 h-6 block">{card.icon}</span>
                </div>
                <p className="eyebrow mb-3">{card.eyebrow}</p>
                <h3 className="font-display text-3xl lg:text-[2rem] font-light text-bone tracking-tight mb-3 leading-[1.1]">
                  {card.title}
                </h3>
                <p className="text-bone/55 text-[14.5px] leading-relaxed max-w-md font-light">
                  {card.blurb}
                </p>
              </div>

              <div className="relative mt-8 inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-semibold text-[var(--gold-soft)] group-hover:text-[var(--gold)] transition-colors duration-500">
                {card.ctaLabel}
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
