import { company } from "@/lib/config";
import HeroLeadForm from "./HeroLeadForm";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16"
    >
      {/* Background image + dark overlay */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2000&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Now accepting new clients in {company.city}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Find Your Dream Home or Sell for{" "}
            <span className="text-amber-400">Top Dollar</span> in {company.city}
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl">
            {company.shortName} combines deep local expertise, aggressive
            marketing, and honest negotiating to get you the best outcome —
            whether you're buying your first home or selling a portfolio.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href="#lead-magnet"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-colors"
            >
              Get a Free Home Valuation
            </a>
            <a
              href="#listings"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white font-bold transition-colors"
            >
              Browse Homes
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-900"
                  />
                ))}
              </div>
              <span>500+ happy clients</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1">4.9 on Google</span>
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}
