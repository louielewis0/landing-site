import Image from "next/image";
import { company } from "@/lib/config";

/**
 * About — prototype .about-grid treatment: parallax portrait (image
 * scrubs -12% via SiteMotion) with floating credential badge, copy
 * right. Copy unchanged.
 */
export default function About() {
  return (
    <section id="about" className="sec-pad bg-cream">
      <div className="container about-grid">
        <div className="about-media reveal">
          <Image
            src="/agent.jpg"
            alt={`${company.name} — Metro Detroit real estate experts`}
            width={900}
            height={1100}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="about-badge">
            <div>
              <b>20+</b>
              <span>Years on the ground</span>
            </div>
          </div>
        </div>
        <div className="reveal">
          <div className="s-eyebrow">About</div>
          <h2>{company.region}&rsquo;s trusted real-estate experts.</h2>
          <p style={{ color: "var(--s-muted)", fontSize: 16, marginTop: 16, maxWidth: 520 }}>
            We&rsquo;re a {company.region}-based team helping buyers, sellers, and
            investors make confident real-estate decisions. Over 20 years of
            experience and $100M+ in closed transactions behind every
            conversation.
          </p>
          <ul className="about-check">
            {[
              "Licensed real estate professionals",
              "Residential, commercial & luxury",
              "First-time buyer specialists",
              "Investor-focused strategies",
            ].map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="about-ctas">
            <a href="/home-value" className="btn btn-navy">
              Schedule a consultation
            </a>
            <a
              href={`tel:${company.phoneTel}`}
              className="btn"
              style={{ border: "1.5px solid var(--line)", color: "var(--navy)" }}
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
