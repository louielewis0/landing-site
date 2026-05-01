import { company } from "@/lib/config";
import Reveal from "./motion/Reveal";

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

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-ink overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,162,76,0.10), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-5">What clients say</p>
          </Reveal>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-bone leading-[1.02]">
            <span className="block overflow-hidden">
              <Reveal variant="mask" className="block">Outcomes,</Reveal>
            </span>
            <span className="block overflow-hidden">
              <Reveal variant="mask" delay={1} className="block italic gold-text">not promises.</Reveal>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {picks.map((t, i) => (
            <Reveal
              key={t.name}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              as="figure"
              className="group relative rounded-2xl p-9 bg-ink-2 border border-bone/10 hover:border-[var(--gold)]/35 transition-all duration-700 tilt"
            >
              <span className="font-display absolute top-6 right-7 text-7xl text-[var(--gold)]/15 leading-none select-none">
                &ldquo;
              </span>
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[var(--gold-soft)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-display text-bone text-[1.5rem] leading-[1.4] mb-7 font-light italic">
                {t.quote}
              </blockquote>
              <figcaption className="pt-5 border-t border-bone/10 text-sm">
                <div className="font-medium text-bone tracking-tight">{t.name}</div>
                <div className="text-bone/40 text-[12px] uppercase tracking-[0.18em] mt-1">{t.role}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="text-center">
          <a
            href="#lead-magnet"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500"
          >
            Request your valuation
            <span>→</span>
          </a>
          <p className="text-sm text-bone/45 mt-4">
            or call{" "}
            <a href={`tel:${company.phoneTel}`} className="text-bone font-medium hover:text-[var(--gold-soft)] transition-colors">
              {company.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
