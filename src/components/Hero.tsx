import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#0B1733]"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1733] via-[#0B1733]/80 to-transparent" />
        <div className="absolute inset-0 glow-orange opacity-60" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 backdrop-blur mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            {company.region} · {company.city}, {company.state}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02] mb-6">
            Real estate,
            <br />
            <span className="gradient-text">done right.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
            Twenty years. Fifty million in sales. A team that answers the phone.
            Whether you're buying your first home or selling your fifth, we make
            sure the outcome is the one you wanted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="#lead-magnet"
              className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_10px_40px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_10px_40px_-5px_rgba(249,115,22,0.8)] transition-all"
            >
              Get my free home valuation
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <a
              href="#listings"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur border border-white/15 text-white font-semibold transition-colors"
            >
              Browse homes
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>5-star rated</span>
            </div>
            <div>Licensed in Michigan</div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              Usually respond within the hour
            </div>
          </div>
        </div>

        <div className="lg:pl-8 fade-up">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}
