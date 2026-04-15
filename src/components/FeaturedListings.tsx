import Image from "next/image";
import { getFeaturedListings, type Listing } from "@/lib/listings";
import ListingAlertForm from "./ListingAlertForm";

export default async function FeaturedListings() {
  const listings = await getFeaturedListings();
  const hasListings = listings.length > 0;

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
            Verified listings across Metro Detroit — Troy MI real estate,
            Rochester Hills homes, Birmingham MI listings, and surrounding
            communities. Sign up below and we'll send new matches the moment
            they go live.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {hasListings ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {listings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>

          <div className="lg:sticky lg:top-28 h-fit">
            <ListingAlertForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/70 p-10 sm:p-14 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
        New listings coming soon.
      </h3>
      <p className="text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
        Our MLS feed is being connected. In the meantime, we have hundreds of
        active and off-market homes across Metro Detroit — sign up on the right
        and we'll send properties that match your criteria directly to you.
      </p>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
      >
        Tell us what you're looking for
        <span>→</span>
      </a>
    </div>
  );
}

function ListingCard({ listing: l }: { listing: Listing }) {
  const hasImage = Boolean(l.image_url);
  const href = l.listing_url ?? "#contact";
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.2)] hover:-translate-y-1 transition-all duration-500">
      <a href={href} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
        {hasImage ? (
          <Image
            src={l.image_url!}
            alt={`${l.address}, ${l.city}, ${l.state}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-[900ms]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">No image available</span>
          </div>
        )}
        {l.status && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg">
            {l.status}
          </div>
        )}
      </a>

      <div className="p-6">
        <div className="text-[1.5rem] font-bold text-slate-900 tracking-[-0.02em] leading-none mb-2">
          {l.price}
        </div>
        <div className="text-[15px] text-slate-900 font-semibold mt-2">
          {l.address}
        </div>
        <div className="text-sm text-slate-500 mb-5">
          {l.city}, {l.state}
          {l.zip ? ` ${l.zip}` : ""}
        </div>
        <div className="flex gap-5 text-sm text-slate-700 pb-5 mb-5 border-b border-slate-100">
          <span>
            <strong className="text-slate-900">{l.beds}</strong>
            <span className="text-slate-500 ml-1">bd</span>
          </span>
          <span>
            <strong className="text-slate-900">{l.baths}</strong>
            <span className="text-slate-500 ml-1">ba</span>
          </span>
          {l.sqft && (
            <span>
              <strong className="text-slate-900">{l.sqft.toLocaleString()}</strong>
              <span className="text-slate-500 ml-1">sqft</span>
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={href}
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border border-slate-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-[13px] font-semibold transition-colors"
          >
            View Details
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg bg-slate-900 hover:bg-orange-500 text-white text-[13px] font-semibold transition-colors"
          >
            Schedule Tour
          </a>
        </div>
      </div>
    </article>
  );
}
