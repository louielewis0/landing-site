import Image from "next/image";
import { featuredListings } from "@/lib/config";

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.2em] mb-3">
              Featured
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Moving fast this week.
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start md:self-end text-slate-900 font-semibold hover:text-orange-600 transition-colors"
          >
            Request full inventory →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredListings.map((l) => (
            <div
              key={l.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <Image
                  src={l.image}
                  alt={l.address}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  {l.status}
                </div>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                  {l.price}
                </div>
                <div className="text-sm text-slate-600 mb-5">
                  {l.address} · {l.neighborhood}
                </div>
                <div className="flex gap-5 text-sm text-slate-700 mb-6">
                  <span><strong className="text-slate-900">{l.beds}</strong> bd</span>
                  <span><strong className="text-slate-900">{l.baths}</strong> ba</span>
                  <span><strong className="text-slate-900">{l.sqft.toLocaleString()}</strong> sqft</span>
                </div>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
                >
                  Schedule a showing
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          A small sample. Hundreds more available on request.
        </p>
      </div>
    </section>
  );
}
