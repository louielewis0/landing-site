import { company } from "@/lib/config";

export default function Stats() {
  return (
    <section className="relative bg-[#0B1733] text-white py-20 overflow-hidden">
      <div className="absolute inset-0 glow-orange opacity-30 -z-0" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {company.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0B1733] px-6 py-10 text-center hover:bg-white/[0.03] transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-[0.15em] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
