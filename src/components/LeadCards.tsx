import { company } from "@/lib/config";

type Card = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  ctaLabel: string;
  href: string;
  gradient: string;
  icon: React.ReactNode;
  accent: string;
};

const cards: Card[] = [
  {
    id: "value",
    eyebrow: "Free home valuation",
    title: "What's My Home Worth?",
    blurb: "Get your free Metro Detroit home value in minutes.",
    ctaLabel: "Get Value",
    href: "#lead-magnet",
    gradient: "from-[#0A1429] via-[#111C36] to-[#1E293B]",
    accent: "from-orange-500/30 to-transparent",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" />
      </svg>
    ),
  },
  {
    id: "new-listings",
    eyebrow: "Buyer early access",
    title: "New Listings First Access",
    blurb: "See new listings in Troy & Rochester Hills before they hit Zillow.",
    ctaLabel: "Get Listings",
    href: "#contact",
    gradient: "from-[#3B1D08] via-[#7C2D12] to-[#EA580C]",
    accent: "from-white/20 to-transparent",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
      </svg>
    ),
  },
  {
    id: "sell",
    eyebrow: "Seller strategy",
    title: "Sell Your Home Fast",
    blurb: "Find out what buyers would pay for your home today.",
    ctaLabel: "Start Selling",
    href: "#lead-magnet",
    gradient: "from-[#0B3A2E] via-[#0F5F46] to-[#10B981]",
    accent: "from-white/20 to-transparent",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: "consult",
    eyebrow: "Book a call",
    title: "Schedule a Consultation",
    blurb: "Talk with a local Metro Detroit real estate expert.",
    ctaLabel: "Book Call",
    href: `tel:${company.phoneTel}`,
    gradient: "from-[#1E1B4B] via-[#312E81] to-[#4F46E5]",
    accent: "from-white/20 to-transparent",
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.2a1 1 0 01.97.76l1 4a1 1 0 01-.53 1.15L7 9.8a11 11 0 007.2 7.2l.89-1.64a1 1 0 011.15-.53l4 1a1 1 0 01.76.97V19a2 2 0 01-2 2A16 16 0 013 5z" />
      </svg>
    ),
  },
];

export default function LeadCards() {
  return (
    <section id="listings" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            How we can help today
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] leading-[1.05] mb-5">
            Pick your move.
            <br />
            <span className="gradient-text">We'll handle the rest.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Every option below connects you directly with a local Metro Detroit
            expert — no bots, no generic replies. Most clients hear back within
            the hour.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card) => (
            <LeadCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCard({ card }: { card: Card }) {
  return (
    <a
      href={card.href}
      className={`group relative overflow-hidden rounded-3xl p-8 lg:p-10 text-white bg-gradient-to-br ${card.gradient} shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)] hover:shadow-[0_30px_70px_-15px_rgba(15,23,42,0.4)] hover:-translate-y-1 transition-all duration-500 min-h-[280px] flex flex-col justify-between noise`}
    >
      {/* Accent glow */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-radial ${card.accent} blur-3xl opacity-70 group-hover:opacity-100 transition-opacity`}
      />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center mb-6 text-white/90 group-hover:bg-white/15 transition-colors">
          <div className="w-7 h-7">{card.icon}</div>
        </div>
        <div className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.18em] mb-3">
          {card.eyebrow}
        </div>
        <h3 className="text-2xl lg:text-[1.75rem] font-bold tracking-[-0.02em] mb-3 leading-tight">
          {card.title}
        </h3>
        <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
          {card.blurb}
        </p>
      </div>

      <div className="relative mt-8">
        <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold text-sm shadow-lg group-hover:bg-orange-400 group-hover:text-white transition-colors">
          {card.ctaLabel}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </div>
    </a>
  );
}
