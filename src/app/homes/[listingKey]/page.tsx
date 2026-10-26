import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, ArrowLeft, ExternalLink } from "lucide-react";
import SiteShell from "@/components/site/SiteShell";
import PropertyInquiry from "@/components/site/PropertyInquiry";
import ListTracPixel from "@/components/site/ListTracPixel";
import { getListing, IDX_DISCLAIMER } from "@/lib/idx";

export const metadata: Metadata = {
  // IDX detail pages are kept out of the index (avoid duplicate-listing content).
  robots: { index: false, follow: true },
};

function formatPrice(n: number | null): string {
  if (n == null) return "Contact for price";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function bathsLabel(full: number | null, half: number | null, total: number | null): string | null {
  if (full != null && half != null) {
    return half > 0 ? `${full} full, ${half} half` : `${full}`;
  }
  return total != null ? String(total) : null;
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ listingKey: string }>;
}) {
  const { listingKey } = await params;
  const listing = await getListing(listingKey);
  if (!listing) notFound();

  const place = [listing.city, listing.state].filter(Boolean).join(", ");
  const label = listing.address ?? `Home in ${listing.city ?? "Metro Detroit"}`;
  const hero = listing.photos[0];
  const rest = listing.photos.slice(1, 9);

  const facts: Array<[string, string]> = [];
  if (listing.yearBuilt) facts.push(["Year built", String(listing.yearBuilt)]);
  if (listing.propertySubType) facts.push(["Type", listing.propertySubType.replace(/([a-z])([A-Z])/g, "$1 $2")]);
  if (listing.livingArea) facts.push(["Living area", `${listing.livingArea.toLocaleString()} sqft`]);
  if (listing.lotSizeAcres) facts.push(["Lot size", `${listing.lotSizeAcres} acres`]);
  else if (listing.lotSizeSqFt) facts.push(["Lot size", `${listing.lotSizeSqFt.toLocaleString()} sqft`]);
  if (listing.garageSpaces) facts.push(["Garage", `${listing.garageSpaces} car`]);
  if (listing.daysOnMarket != null) facts.push(["Days on market", String(listing.daysOnMarket)]);
  if (listing.listingId) facts.push(["MLS #", listing.listingId]);

  const bl = bathsLabel(listing.bathroomsFull, listing.bathroomsHalf, listing.bathrooms);

  return (
    <SiteShell navOnDark hideOverlays>
      <ListTracPixel listingId={listing.listingId} zip={listing.postalCode} />
      <main className="ld-main">
        <div className="ld-wrap">
          <Link href="/homes" className="ld-back">
            <ArrowLeft width={16} height={16} aria-hidden /> Back to search
          </Link>

          {/* Gallery */}
          {hero ? (
            <div className="ld-gallery">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="ld-hero" src={hero} alt={label} />
              {rest.length > 0 && (
                <div className="ld-thumbs">
                  {rest.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={src} alt={`${label} — photo ${i + 2}`} loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="ld-gallery ld-gallery-empty">Photos unavailable for this listing</div>
          )}

          <div className="ld-grid">
            {/* Left: details */}
            <div className="ld-body">
              <div className="ld-price">{formatPrice(listing.price)}</div>
              <h1 className="ld-addr">{listing.address ?? "Address available on request"}</h1>
              {place && <div className="ld-place">{place}{listing.postalCode ? ` ${listing.postalCode}` : ""}</div>}

              <div className="ld-specs">
                {listing.bedrooms != null && (
                  <span><BedDouble width={18} height={18} aria-hidden /> {listing.bedrooms} beds</span>
                )}
                {bl && (
                  <span><Bath width={18} height={18} aria-hidden /> {bl} baths</span>
                )}
                {listing.livingArea != null && (
                  <span><Ruler width={18} height={18} aria-hidden /> {listing.livingArea.toLocaleString()} sqft</span>
                )}
              </div>

              {listing.description && (
                <section className="ld-section">
                  <h2>About this home</h2>
                  <p className="ld-desc">{listing.description}</p>
                </section>
              )}

              {facts.length > 0 && (
                <section className="ld-section">
                  <h2>Property details</h2>
                  <dl className="ld-facts">
                    {facts.map(([k, v]) => (
                      <div key={k} className="ld-fact">
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {listing.virtualTourUrl && (
                <a className="ld-tour" href={listing.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                  View virtual tour <ExternalLink width={15} height={15} aria-hidden />
                </a>
              )}

              {/* Required attribution. */}
              {listing.attribution && (
                <div className="ld-attr">
                  {listing.attribution}
                  {listing.originatingSystem ? ` · ${listing.originatingSystem}` : ""}
                </div>
              )}
            </div>

            {/* Right: inquiry → CRM */}
            <aside className="ld-aside">
              <PropertyInquiry listingLabel={label} listingId={listing.listingId} />
            </aside>
          </div>

          {/* Required IDX disclaimer. */}
          <div className="hm-disclaimer">
            <p>{IDX_DISCLAIMER}</p>
            <p className="hm-disclaimer-fine">
              Listings refreshed hourly from Realcomp II Ltd. &copy; {new Date().getFullYear()} Realcomp II Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
