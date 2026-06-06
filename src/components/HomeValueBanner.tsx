import Reveal from "./motion/Reveal";

/**
 * Homepage CTA band that drives sellers to /home-value.
 *
 * Placed directly after Hero (and before TrustBadges) so it's the first
 * thing a visitor sees once they pass the main headline. Visually
 * banded — bg-ink-2 with stronger gold radial glow and hairline gold
 * dividers top + bottom — so it reads as a distinct CTA strip rather
 * than blending into adjacent sections.
 *
 * This is a STYLED LINK only. No form, no Supabase call. The real
 * multi-step capture lives at /home-value (HomeValueForm.tsx), which
 * lands leads in /crm tagged source = "home-valuation-tool".
 *
 * Honest copy — no instant dollar figure, no "find out your exact
 * value now". A human broker reviews; the section just promises the
 * free analysis and 24-hour turnaround.
 */
export default function HomeValueBanner() {
  return (
    <section className="relative bg-ink-2 py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none" />
      {/* Warm gold radial — stronger than adjacent TrustBadges so this
          strip reads as an emphasized CTA, not just another band */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,162,76,0.14), transparent 65%)",
        }}
      />
      {/* Thin gold hairlines that bracket the band */}
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] divider-rule" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 text-center lg:text-left">
          <Reveal className="lg:max-w-2xl">
            <p className="eyebrow mb-3">Sellers · Free · 24-hour turnaround</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-bone tracking-tight leading-[1.08] mb-4">
              What&rsquo;s your home{" "}
              <span className="italic gold-text">actually worth?</span>
            </h2>
            <p className="text-[15.5px] sm:text-base text-bone/65 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              A free, no-obligation market analysis from a local Troy expert.
              Find out what your home could sell for in today&rsquo;s market —
              real comps from a real broker, not an algorithm.
            </p>
          </Reveal>

          <Reveal delay={2} className="flex-shrink-0">
            <a
              href="/home-value"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[14px] tracking-wide transition-all duration-500 whitespace-nowrap shadow-[0_20px_50px_-20px_rgba(200,162,76,0.45)]"
            >
              Get my free valuation
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
