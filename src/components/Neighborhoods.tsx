import { cities, company } from "@/lib/config";

export default function Neighborhoods() {
  return (
    <section id="areas" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            Where we work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] mb-5 leading-[1.05]">
            Serving {company.region}
            <br />
            <span className="gradient-text">block by block.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Real Estate Market Center represents buyers and sellers across all
            of Metro Detroit's top communities — from family-first suburbs to
            luxury estates and urban investment neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-10">
          {cities.map((c) => (
            <a
              key={c.slug}
              href="#contact"
              className="group relative overflow-hidden px-6 py-5 rounded-xl bg-white border border-slate-200/70 hover:border-orange-300 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                    Homes for sale in
                  </div>
                  <div className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {c.name}, MI
                  </div>
                </div>
                <span className="text-orange-500 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500">
          Don't see your city? <a href="#contact" className="text-orange-600 font-semibold hover:underline">Just ask</a> — we work across all of Michigan.
        </p>
      </div>
    </section>
  );
}
