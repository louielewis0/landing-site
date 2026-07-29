import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";
import { getCityPage, getAllCitySlugs, cityPages } from "@/lib/city-pages";
import {
  Phone,
  MapPin,
  Clock,
  Users,
  GraduationCap,
  ArrowRight,
  Star,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  BarChart3,
  ChevronRight,
} from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getCityPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://marketcenterrealty.com/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "website",
      locale: "en_US",
      url: `https://marketcenterrealty.com/${page.slug}`,
    },
  };
}

/** City hero backgrounds — layered navy gradients varied per slug so
 *  adjacent city pages don't feel identical. Swap for real
 *  neighborhood photos in /public/areas/<slug>.jpg when available. */
function heroBackground(slug: string): string {
  const seeds = [""];
  const i = slug.length % seeds.length;
  void seeds; void slug;
  return "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(217,118,47,0.10), transparent 60%), linear-gradient(180deg, #fafaf8 0%, #f1efea 100%)";
}

export default async function CityLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getCityPage(slug);
  if (!page) notFound();

  const otherCities = cityPages.filter((c) => c.slug !== page.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: company.name,
    telephone: company.phone,
    email: company.email,
    url: `https://marketcenterrealty.com/${page.slug}`,
    areaServed: {
      "@type": "City",
      name: page.city,
      containedInPlace: { "@type": "State", name: "Michigan" },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2032 E Square Lake Rd Suite 400A",
      addressLocality: "Troy",
      addressRegion: "MI",
      postalCode: "48085",
      addressCountry: "US",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marketcenterrealty.com" },
      { "@type": "ListItem", position: 2, name: `${page.city} Real Estate`, item: `https://marketcenterrealty.com/${page.slug}` },
    ],
  };

  return (
    <SiteShell>
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        {/* ── Hero (parallax) ── */}
        <section className="s-hero s-hero-short">
          <div
            className="hero-layer hero-bg"
            data-speed="0.35"
            style={{ backgroundImage: heroBackground(page.slug) }}
          />
          <div className="hero-layer hero-grid" />
          <div className="hero-layer hero-glow" data-speed="0.6" />
          <div className="container hero-content">
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--s-muted)",
                marginBottom: 26,
              }}
            >
              <a href="/" style={{ color: "var(--s-muted)" }}>Home</a>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: "var(--navy)" }}>{page.city} Real Estate</span>
            </nav>
            <div className="hero-badge">
              <MapPin className="w-3.5 h-3.5" style={{ color: "var(--s-gold-light)" }} />
              {page.city}, {page.state} · {page.county}
            </div>
            <h1 className="hero-title">{page.headline}</h1>
            <p className="hero-sub">{page.subheadline}</p>
            <div className="hero-ctas">
              <a href="/home-value" className="btn btn-gold">
                Request your valuation <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${company.phoneTel}`} className="btn btn-ghost">
                <Phone className="w-4 h-4" />
                {company.phone}
              </a>
            </div>
            <div className="hero-badges">
              <span><Clock className="w-4 h-4" /> 20+ years experience</span>
              <span><DollarSign className="w-4 h-4" /> $100M+ closed sales</span>
              <span><MapPin className="w-4 h-4" /> {page.city} specialist</span>
            </div>

            {/* City media panel — licensed luxury photography, parallax */}
            <div className="hero-media">
              <div
                className="media-layer"
                data-speed="0.25"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(22,24,29,0) 50%, rgba(22,24,29,0.65) 100%), url('/areas/${page.slug}.jpg')`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "24px 30px",
                  color: "#fff",
                  zIndex: 2,
                }}
              >
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", opacity: 0.75 }}>
                    Area guide
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 4 }}>
                    {page.city}, Michigan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Market stats band ── */}
        <section className="stats-band">
          <div className="container">
            <div className="stats-grid cols-4" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
              {[
                { Icon: DollarSign, value: page.medianPrice, label: "Median Price" },
                { Icon: TrendingUp, value: page.priceChange, label: "Price Trend" },
                { Icon: Clock, value: page.avgDaysOnMarket, label: "Days on Market" },
                { Icon: Users, value: page.population, label: "Population" },
                { Icon: GraduationCap, value: page.topSchoolDistrict.split("—")[0].trim(), label: "Schools" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-num" style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>
                    <span className="accent">{s.value}</span>
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="sec-pad bg-cream" style={{ paddingBottom: 60 }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <div className="prose-site">
              {page.introParagraphs.map((p, i) => (
                <p key={i} className="reveal" style={{ fontSize: 17, lineHeight: 1.85 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Buyers ── */}
        <section className="sec-pad bg-cream" style={{ paddingTop: 60 }}>
          <div className="container">
            <div className="about-grid" style={{ gridTemplateColumns: "1.05fr 0.95fr", alignItems: "start" }}>
              <div className="reveal">
                <div className="s-eyebrow">For Buyers</div>
                <h2 style={{ fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.15, marginBottom: 22 }}>
                  {page.buyerHeadline}
                </h2>
                <div className="prose-site">
                  {page.buyerParagraphs.map((p, i) => (
                    <p key={i} style={{ color: "var(--s-muted)", fontSize: 16 }}>{p}</p>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {page.buyerPoints.map((point) => (
                  <div key={point} className="service-card reveal" style={{ padding: "18px 22px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 2 }} strokeWidth={1.75} />
                    <span style={{ fontSize: 14.5 }}>{point}</span>
                  </div>
                ))}
                <a href="/#contact" className="btn btn-navy reveal" style={{ justifyContent: "center", marginTop: 10 }}>
                  Start your home search <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── For Sellers ── */}
        <section className="sec-pad bg-cream-2">
          <div className="container">
            <div className="about-grid" style={{ gridTemplateColumns: "0.95fr 1.05fr", alignItems: "start" }}>
              <div style={{ display: "grid", gap: 12 }} className="order-cards">
                {page.sellerPoints.map((point) => (
                  <div key={point} className="service-card reveal" style={{ padding: "18px 22px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 2 }} strokeWidth={1.75} />
                    <span style={{ fontSize: 14.5 }}>{point}</span>
                  </div>
                ))}
                <a href="/home-value" className="btn btn-gold reveal" style={{ justifyContent: "center", marginTop: 10 }}>
                  Request your valuation <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="reveal">
                <div className="s-eyebrow">For Sellers</div>
                <h2 style={{ fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.15, marginBottom: 22 }}>
                  {page.sellerHeadline}
                </h2>
                <div className="prose-site">
                  {page.sellerParagraphs.map((p, i) => (
                    <p key={i} style={{ color: "var(--s-muted)", fontSize: 16 }}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Market Trend ── */}
        <section className="stats-band" style={{ padding: "56px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="reveal" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--s-gold-light)",
                  flexShrink: 0,
                }}
              >
                <BarChart3 className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="s-eyebrow" style={{ color: "var(--s-gold-light)" }}>
                  {page.city} Market Outlook
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16.5, lineHeight: 1.8 }}>
                  {page.marketTrend}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Neighborhoods ── */}
        <section className="sec-pad bg-cream">
          <div className="container">
            <div className="sec-head reveal">
              <div className="s-eyebrow">Neighborhoods</div>
              <h2>Where to buy in {page.city}.</h2>
            </div>
            <div className="services-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {page.neighborhoods.map((n) => (
                <div key={n.name} className="service-card reveal">
                  <h3 style={{ fontSize: 20 }}>{n.name}</h3>
                  <p style={{ fontSize: 14.5, marginTop: 6 }}>{n.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="sec-pad bg-cream-2">
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="sec-head reveal">
              <div className="s-eyebrow">Why us</div>
              <h2>Why {page.city} clients choose us.</h2>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {page.whyChooseUs.map((item) => (
                <div key={item.title} className="service-card reveal" style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: "26px 28px" }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 3 }} strokeWidth={1.75} />
                  <div>
                    <h3 style={{ fontSize: 19, marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ fontSize: 14.5 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="stats-band" style={{ padding: "90px 0" }}>
          <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
            <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 26 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5" style={{ color: "var(--s-gold-light)" }} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote
              className="reveal"
              style={{
                fontFamily: "var(--font-fraunces), Fraunces, serif",
                fontSize: "clamp(22px, 2.8vw, 30px)",
                color: "#fff",
                lineHeight: 1.45,
                marginBottom: 24,
              }}
            >
              &ldquo;{page.testimonial.quote}&rdquo;
            </blockquote>
            <div className="reveal" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              <span style={{ color: "#fff", fontWeight: 600 }}>{page.testimonial.name}</span>
              <span style={{ margin: "0 8px" }}>·</span>
              {page.testimonial.context}
            </div>
          </div>
        </section>

        {/* ── Local Insight ── */}
        <section className="sec-pad bg-cream" style={{ padding: "80px 0" }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <div className="service-card reveal" style={{ padding: 36 }}>
              <div className="s-eyebrow">Local insight</div>
              <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "var(--s-ink)" }}>{page.localInsight}</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sec-pad bg-cream-2">
          <div className="container" style={{ maxWidth: 900 }}>
            <div className="sec-head reveal">
              <div className="s-eyebrow">FAQ</div>
              <h2>{page.city} real-estate questions.</h2>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {page.faqs.map((f) => (
                <details key={f.question} className="service-card reveal" style={{ padding: 0, overflow: "hidden" }}>
                  <summary
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "22px 26px",
                      cursor: "pointer",
                      fontSize: 15.5,
                      fontWeight: 600,
                      color: "var(--navy)",
                      listStyle: "none",
                    }}
                  >
                    {f.question}
                    <ChevronRight className="w-4 h-4" style={{ color: "var(--s-gold)", flexShrink: 0, marginLeft: 14 }} />
                  </summary>
                  <div style={{ padding: "0 26px 24px", color: "var(--s-muted)", fontSize: 14.5, lineHeight: 1.8 }}>
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Schools Deep Dive (optional) ── */}
        {page.schoolsDeepDive && (
          <section className="sec-pad bg-cream">
            <div className="container" style={{ maxWidth: 900 }}>
              <div className="sec-head reveal">
                <div className="s-eyebrow">Schools</div>
                <h2>{page.schoolsDeepDive.title}</h2>
              </div>
              <div className="prose-site" style={{ marginBottom: 34 }}>
                {page.schoolsDeepDive.paragraphs.map((p, i) => (
                  <p key={i} className="reveal">{p}</p>
                ))}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {page.schoolsDeepDive.schools.map((s) => (
                  <div key={s.name} className="service-card reveal" style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 24px" }}>
                    <GraduationCap className="w-5 h-5" style={{ color: "var(--s-gold)", flexShrink: 0, marginTop: 3 }} strokeWidth={1.75} />
                    <div>
                      <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 18 }}>{s.name}</h3>
                        <span style={{ fontSize: 10, color: "var(--s-gold)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}>
                          {s.grades}
                        </span>
                      </div>
                      <p style={{ fontSize: 14, marginTop: 4 }}>{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Market Deep Dive (optional) ── */}
        {page.marketDeepDive && (
          <section className="sec-pad bg-cream-2">
            <div className="container" style={{ maxWidth: 860 }}>
              <div className="sec-head reveal">
                <div className="s-eyebrow">Deep Dive</div>
                <h2>{page.marketDeepDive.title}</h2>
              </div>
              <div className="prose-site">
                {page.marketDeepDive.paragraphs.map((p, i) => (
                  <p key={i} className="reveal">{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Lifestyle (optional) ── */}
        {page.lifestyleHighlights && (
          <section className="sec-pad bg-cream">
            <div className="container">
              <div className="sec-head reveal">
                <div className="s-eyebrow">Lifestyle</div>
                <h2>{page.lifestyleHighlights.title}</h2>
              </div>
              <div className="services-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {page.lifestyleHighlights.categories.map((cat) => (
                  <div key={cat.name} className="service-card reveal">
                    <h3 style={{ fontSize: 20, marginBottom: 14 }}>{cat.name}</h3>
                    <ul style={{ listStyle: "none", display: "grid", gap: 10, padding: 0 }}>
                      {cat.items.map((item) => (
                        <li key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--s-muted)" }}>
                          <span
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "var(--s-gold)",
                              marginTop: 8,
                              flexShrink: 0,
                            }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Additional Testimonials (optional) ── */}
        {page.additionalTestimonials && page.additionalTestimonials.length > 0 && (
          <section className="sec-pad bg-cream-2">
            <div className="container">
              <div className="sec-head reveal">
                <div className="s-eyebrow">More {page.city} reviews</div>
                <h2>What {page.city} clients say.</h2>
              </div>
              <div className="testi-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {page.additionalTestimonials.map((t) => (
                  <div key={t.name} className="testi-card reveal">
                    <div className="stars">★★★★★</div>
                    <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                    <div className="testi-who">
                      <b>{t.name}</b> · {t.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Cities ── */}
        <section className="stats-band" style={{ padding: "70px 0" }}>
          <div className="container">
            <div className="reveal">
              <div className="s-eyebrow" style={{ color: "var(--s-gold-light)" }}>Also serving</div>
              <h2 style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 28 }}>
                Explore more {company.region} communities
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: 12,
              }}
            >
              {otherCities.map((c) => (
                <a
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="reveal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 18px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{c.city}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 3 }}>
                      {c.medianPrice}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" style={{ color: "var(--s-gold-light)" }} />
                </a>
              ))}
            </div>
            <div className="reveal" style={{ marginTop: 26 }}>
              <a href="/best-metro-detroit-suburbs" style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Not sure which city fits? Compare all seven in our ranked 2026 guide
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Standard valuation CTA banner (parallax) ── */}
        <section className="cta-banner">
          <div
            className="cta-bg"
            data-speed="0.4"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(22,24,29,0.92), rgba(22,24,29,0.72)), url('/areas/kitchen.jpg')",
            }}
          />
          <div className="container cta-inner">
            <div className="reveal">
              <div className="s-eyebrow" style={{ color: "var(--s-gold-light)" }}>
                Free · 24-hour turnaround
              </div>
              <h2>{page.ctaHeadline}</h2>
              <p>{page.ctaSubheadline}</p>
            </div>
            <div className="cta-card reveal">
              <h3>A real broker, in 24 hours.</h3>
              <p>
                No algorithm, no instant lowball — a local Troy broker reviews
                your property and sends a real number back.
              </p>
              <a href="/home-value" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Request your valuation →
              </a>
              <p className="form-note">
                or call <a href={`tel:${company.phoneTel}`} style={{ color: "var(--s-gold-light)" }}>{company.phone}</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
