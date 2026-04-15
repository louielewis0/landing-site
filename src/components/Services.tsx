import { services } from "@/lib/config";

const icons: Record<string, string> = {
  home: "M10 2L2 9h2v9h4v-6h4v6h4V9h2L10 2z",
  sell: "M12 2l1.5 5h5l-4 3 1.5 5-5-3-5 3 1.5-5-4-3h5z",
  key: "M7 14a5 5 0 01-5-5V4a1 1 0 011-1h4a1 1 0 011 1v5a5 5 0 01-5 5zm5-11h5a1 1 0 011 1v8a1 1 0 01-1 1h-3m3 3l-2-2m4 4l-2-2",
  crown: "M3 7l3 3 4-6 4 6 3-3v9H3V7z",
  building: "M4 21V3h6v5h10v13H4zm6-10h4V8h-4v3zm0 4h4v-3h-4v3zm0 4h4v-3h-4v3z",
  chart: "M3 17v2h18v-2H3zm4-2l3-3 3 3 6-6-1.4-1.4L13 12l-3-3-5 5 2 2z",
  shield: "M10 1l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V4l7-3z",
  map: "M10 2a6 6 0 00-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z",
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 bg-[#0A1429] text-white overflow-hidden noise"
    >
      <div className="absolute inset-0 glow-orange opacity-20" />
      <div className="absolute inset-0 grid-overlay opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-[0.22em] mb-4">
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-5 leading-[1.05]">
            Full-service real estate,
            <br />
            <span className="gradient-text">done at the highest level.</span>
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            From first-time buyers to seasoned investors — one team, every need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <a
              key={s.id}
              href="#lead-magnet"
              className="group relative rounded-2xl p-7 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur border border-white/10 hover:border-orange-400/40 hover:from-white/[0.07] hover:to-white/[0.02] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors">
                <svg
                  className="w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 20 20"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icons[s.icon]} />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold tracking-tight mb-2 leading-tight">
                {s.title}
              </h3>
              <p className="text-[13.5px] text-white/60 leading-relaxed mb-5">
                {s.blurb}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-300 group-hover:text-orange-200 transition-colors">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#lead-magnet"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-[0_20px_50px_-12px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 transition-all"
          >
            Schedule Your Free Consultation
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
