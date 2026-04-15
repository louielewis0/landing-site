import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#0A1429] noise"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=85)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1429] via-[#0A1429]/85 to-[#0A1429]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1429] via-transparent to-transparent" />
        <div className="absolute inset-0 glow-orange opacity-70" />
        <div className="absolute inset-0 grid-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="text-white fade-up lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 backdrop-blur-sm mb-7">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
            </span>
            Now serving {company.region} — call {company.phone}
          </div>

          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1.02] mb-6">
            Metro Detroit Real Estate Experts{" "}
            <span className="gradient-text">helping you buy & sell with confidence.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 mb-9 max-w-2xl leading-[1.55]">
            Serving Troy, Rochester Hills, Birmingham, Bloomfield Hills, and surrounding areas with
            <strong className="text-white"> 20+ years of experience</strong> and
            <strong className="text-white"> $100M+ in closed sales</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#lead-magnet"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:shadow-[0_20px_50px_-8px_rgba(249,115,22,0.9)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Free Home Valuation
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-slate-900 hover:bg-white/90 font-bold transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            {[
              { v: "20+", l: "Years Experience" },
              { v: "$100M+", l: "In Sales" },
              { v: "Metro", l: "Detroit Specialists" },
            ].map((b) => (
              <div
                key={b.l}
                className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm"
              >
                <div className="text-lg font-bold gradient-text leading-none">{b.v}</div>
                <div className="text-[11px] text-white/60 uppercase tracking-wider mt-1.5">{b.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 fade-up-delay">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}
