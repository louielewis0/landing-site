import IDXEmbed from "./IDXEmbed";
import ListingAlertForm from "./ListingAlertForm";

export default function FeaturedListings() {
  return (
    <section id="listings" className="relative py-28 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 glow-soft" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-[0.22em] mb-4">
            Featured Homes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-[-0.025em] leading-[1.05] mb-5">
            Featured Homes in
            <br />
            <span className="gradient-text">Metro Detroit.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Live MLS listings across Troy MI real estate, Rochester Hills homes,
            Birmingham MI listings, Bloomfield Hills, Sterling Heights, and
            surrounding communities — powered by Showcase IDX and refreshed
            automatically throughout the day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IDXEmbed widget="hotsheet" />
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <ListingAlertForm />
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg shadow-slate-900/10 transition-colors"
          >
            Search all Metro Detroit homes
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
