import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";
import KenBurns from "./motion/KenBurns";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center pt-32 pb-24 overflow-hidden atmosphere grain vignette"
    >
      {/* Layer 1 — far backdrop. Slow Ken Burns over a tonal gradient.
         TODO: drop a high-res cinematic Detroit twilight or interior photo
         into /public/hero-bg.jpg and uncomment the <img>. */}
      <div className="absolute inset-0 -z-20 opacity-[0.55]">
        <KenBurns className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 22% 30%, rgba(217,185,104,0.22), transparent 65%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(140,74,31,0.18), transparent 65%), linear-gradient(180deg, #14110D 0%, #0A0908 100%)",
            }}
          />
          {/* <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-70" /> */}
        </KenBurns>
      </div>

      {/* Layer 2 — faux architectural silhouette via CSS gradient bands */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[28vh] -z-10 opacity-60"
        style={{
          background:
            "linear-gradient(to top, rgba(10,9,8,0.95) 0%, rgba(10,9,8,0.65) 35%, transparent 100%), repeating-linear-gradient(90deg, transparent 0 8vw, rgba(200,162,76,0.06) 8vw 8.05vw, transparent 8.05vw 14vw, rgba(200,162,76,0.04) 14vw 14.04vw)",
        }}
      />

      {/* Layer 3 — fine scanline texture */}
      <div className="absolute inset-0 -z-10 scanline opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          {/* Eyebrow with thin gold rule */}
          <div className="fade-up flex items-center gap-3 mb-8">
            <span className="block w-10 h-px bg-[var(--gold)] opacity-60" />
            <span className="eyebrow">Metro Detroit · Est. brokerage</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 ml-2 text-[11px] text-bone/55">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--gold-soft)] opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--gold)]" />
              </span>
              Accepting clients · {company.phone}
            </span>
          </div>

          {/* Headline — three masked lines, staggered wipe */}
          <h1 className="font-display text-[3rem] sm:text-6xl lg:text-[5.25rem] font-light leading-[0.98] mb-7 text-bone">
            <span className="block overflow-hidden">
              <span className="block mask-wipe">Sell for top dollar.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block mask-wipe delay-1">Buy with confidence.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block mask-wipe delay-2 italic gold-text">All in Metro Detroit.</span>
            </span>
          </h1>

          <p className="fade-up delay-2 max-w-xl text-[17px] sm:text-lg text-bone/65 leading-[1.65] mb-10 font-light">
            The team behind <span className="text-bone">$100M+ in closed Metro Detroit sales</span>.
            A free home valuation, in less than 24 hours — or pick up the phone.
          </p>

          <div className="fade-up delay-3 flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#lead-magnet"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-soft)] text-ink font-semibold text-[15px] tracking-wide transition-all duration-500"
            >
              Request your valuation
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-bone/25 text-bone hover:border-bone/60 hover:bg-bone/5 font-medium text-[15px] tracking-wide transition-all duration-500"
            >
              <svg className="w-4 h-4 text-[var(--gold-soft)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call {company.phone}
            </a>
          </div>

          <div className="fade-up delay-3 flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] text-bone/45">
            <span className="inline-flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-[var(--gold-soft)]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Five-star rated
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="block w-1 h-1 rounded-full bg-bone/25" />
              Licensed in Michigan
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="block w-1 h-1 rounded-full bg-bone/25" />
              Replies within the hour
            </span>
          </div>
        </div>

        {/* Glass lead form */}
        <div className="lg:col-span-5 fade-up delay-3">
          <HeroLeadForm />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-bone/40 fade-up delay-3">
        <span>Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-bone/40 to-transparent drift" />
      </div>
    </section>
  );
}
