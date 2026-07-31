import Link from "next/link";

/**
 * Homepage "On the market" section — three cards. The featured listing
 * links straight to its detail page (real photos live there); the
 * other two route to the valuation funnel and contact.
 */

const CARDS = [
  {
    href: "/listing/56291-hastings",
    img: "/listing/hastings/kitchen.jpg",
    tag: "For Sale",
    price: "$520,000",
    meta: "4 bd · 2.1 ba",
    addr: "56291 Hastings · Macomb Twp",
  },
  {
    href: "/home-value",
    img: "/areas/cta-interior.jpg",
    tag: "Sellers",
    price: "Your home?",
    meta: "60-sec estimate",
    addr: "Find out what it's worth today",
  },
  {
    href: "/#contact",
    img: "/areas/modern-white.jpg",
    tag: "Buyers",
    price: "Coming soon",
    meta: "early access",
    addr: "Hear about listings before they hit the market",
  },
];

export default function ListingsShowcase() {
  return (
    <div className="t-wrap t-listings" id="listings">
      <div className="t-listings-head">
        <h2>
          On the <span>market</span>
        </h2>
        <Link href="/listing/56291-hastings" className="t-link-caps">
          View listing &rarr;
        </Link>
      </div>
      <div className="t-listings-grid">
        {CARDS.map((c) => (
          <Link key={c.addr} href={c.href} className="t-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt={c.addr} loading="lazy" />
            <div className="t-card-shade" aria-hidden />
            <div className="t-card-tag">{c.tag}</div>
            <div className="t-card-bar">
              <div className="t-card-row">
                <div className="t-card-price">{c.price}</div>
                <div className="t-card-meta">{c.meta}</div>
              </div>
              <div className="t-card-addr">{c.addr}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
