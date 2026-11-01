import Link from "next/link";
import { getOfficeListings, isIdxConfigured, IDX_DISCLAIMER } from "@/lib/idx";

/**
 * JustListed — homepage section that shows Real Estate Market Center's OWN
 * active listings (pulled live from the Realcomp feed by ListOfficeName), so
 * a newly listed property appears automatically. Unlike /homes (for-sale
 * only), this includes rentals, shown as "$X/mo". Each card links to the live
 * IDX detail page. Hides itself entirely if the feed is unconfigured, errors,
 * or returns nothing — never blocks the homepage.
 */

function priceLabel(price: number | null, isLease: boolean): string {
  if (price == null) return "Call for price";
  return `$${price.toLocaleString("en-US")}${isLease ? "/mo" : ""}`;
}

export default async function JustListed() {
  if (!isIdxConfigured()) return null;

  let listings;
  try {
    listings = await getOfficeListings();
  } catch {
    return null;
  }
  if (!listings || listings.length === 0) return null;

  return (
    <section className="t-wrap" id="just-listed" style={{ paddingTop: 12, paddingBottom: 12 }}>
      <div className="t-areas-head">
        <div>
          <div className="t-eyebrow">Just Listed</div>
          <h2>
            Fresh from <span>our listings.</span>
          </h2>
        </div>
        <p className="t-areas-sub">
          Our newest active listings across Metro Detroit &mdash; straight from
          the MLS, updated in real time.
        </p>
      </div>

      <div className="jl-grid">
        {listings.map((l) => (
          <Link key={l.listingKey} href={`/homes/${l.listingKey}`} className="jl-card">
            <div className="jl-photo">
              {l.photos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.photos[0]} alt={l.address ?? "New listing"} loading="lazy" />
              ) : (
                <div className="jl-noimg" aria-hidden />
              )}
              <span className="jl-badge">Just Listed</span>
            </div>
            <div className="jl-body">
              <div className="jl-price">{priceLabel(l.price, l.isLease)}</div>
              <div className="jl-addr">{l.address ?? "Address available on request"}</div>
              <div className="jl-sub">
                {[l.city, l.state, l.postalCode].filter(Boolean).join(", ")}
              </div>
              <div className="jl-specs">
                {[
                  l.bedrooms != null ? `${l.bedrooms} bd` : null,
                  l.bathrooms != null ? `${l.bathrooms} ba` : null,
                  l.livingArea != null
                    ? `${l.livingArea.toLocaleString("en-US")} sqft`
                    : null,
                ]
                  .filter(Boolean)
                  .join("  ·  ")}
              </div>
              {l.attribution && <div className="jl-courtesy">{l.attribution}</div>}
              <span className="jl-cta">View details &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="jl-disclaimer">{IDX_DISCLAIMER}</p>
    </section>
  );
}
