import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/site/SiteShell";
import { getOfficeListings, isIdxConfigured, IDX_DISCLAIMER } from "@/lib/idx";
import { company } from "@/lib/config";

/**
 * /listings — Real Estate Market Center's OWN active listings (the homepage
 * "Just Listed" tab links here). Pulls live from the Realcomp feed by
 * ListOfficeName, so new listings appear automatically. Includes rentals
 * (shown as "$X/mo"), unlike /homes which is for-sale only. Cards link to the
 * live IDX detail pages. noindex (IDX-fed, like /homes) but followed.
 */
export const metadata: Metadata = {
  title: "Our Listings | Real Estate Market Center",
  description: `Browse the current active listings represented by ${company.name} across ${company.region} — straight from the MLS.`,
  robots: { index: false, follow: true },
};

function priceLabel(price: number | null, isLease: boolean): string {
  if (price == null) return "Call for price";
  return `$${price.toLocaleString("en-US")}${isLease ? "/mo" : ""}`;
}

export default async function ListingsPage() {
  let listings: Awaited<ReturnType<typeof getOfficeListings>> = [];
  if (isIdxConfigured()) {
    try {
      listings = await getOfficeListings();
    } catch {
      listings = [];
    }
  }

  return (
    <SiteShell>
      <main>
        <section className="t-wrap t-rev">
          <div className="t-eyebrow">Real Estate Market Center</div>
          <h1>
            Our <span>current listings.</span>
          </h1>
          <p className="t-rev-sub">
            The homes and properties we&rsquo;re representing right now across{" "}
            {company.region} &mdash; straight from the MLS.
          </p>
        </section>

        <section className="t-wrap" style={{ paddingTop: 4, paddingBottom: 40 }}>
          {listings.length > 0 ? (
            <>
              <div className="jl-grid">
                {listings.map((l) => (
                  <Link
                    key={l.listingKey}
                    href={`/homes/${l.listingKey}`}
                    className="jl-card"
                  >
                    <div className="jl-photo">
                      {l.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={l.photos[0]}
                          alt={l.address ?? "New listing"}
                          loading="lazy"
                        />
                      ) : (
                        <div className="jl-noimg" aria-hidden />
                      )}
                      <span className="jl-badge">Just Listed</span>
                    </div>
                    <div className="jl-body">
                      <div className="jl-price">
                        {priceLabel(l.price, l.isLease)}
                      </div>
                      <div className="jl-addr">
                        {l.address ?? "Address available on request"}
                      </div>
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
                      {l.attribution && (
                        <div className="jl-courtesy">{l.attribution}</div>
                      )}
                      <span className="jl-cta">View details &rarr;</span>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="jl-disclaimer">{IDX_DISCLAIMER}</p>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
              <p style={{ color: "var(--s-muted)", fontSize: 16, marginBottom: 18 }}>
                We don&rsquo;t have any active listings on the market at the
                moment &mdash; new ones land here the day they go live.
              </p>
              <Link href="/homes" className="t-pill">
                Browse all {company.region} homes &rarr;
              </Link>
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
