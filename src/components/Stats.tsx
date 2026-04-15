import { company } from "@/lib/config";

export default function Stats() {
  return (
    <section className="relative bg-[#0A1429] text-white py-24 overflow-hidden noise">
      <div className="absolute inset-0 glow-orange opacity-25" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-12 text-center group hover:bg-white/[0.03] transition-colors"
            >
              <div className="text-4xl md:text-6xl font-bold tracking-[-0.03em] gradient-text mb-3 leading-none">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/50 uppercase tracking-[0.22em] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
