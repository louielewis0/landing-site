import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-[#0A1429] noise"
    >
      {/* Background photo + gradients */}
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 backdrop-blur-sm mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400" />
            </span>
            Serving {company.region} · {company.city}, {company.state}
          </div>

          <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-bold tracking-[-0.035em] leading-[0.95] mb-8">
            Real estate,
            <br />
            <span className="gradient-text">done right.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl leading-[1.6]">
            Twenty years. Over $100 million closed. A team that answers the
            phone. Whether you're buying your first home or selling your fifth,
            we make sure the outcome is the one you wanted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <a
              href="#lead-magnet"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.65)] hover:shadow-[0_20px_50px_-8px_rgba(249,115,22,0.9)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get my free home valuation
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="#listings"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/30 text-white font-semibold transition-all"
            >
              Browse homes
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-medium text-white/80">5-star rated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              Licensed in Michigan
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              Responses within the hour
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 fade-up-delay">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}
