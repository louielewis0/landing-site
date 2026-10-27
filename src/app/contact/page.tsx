import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import BgVideo from "@/components/site/BgVideo";
import { company } from "@/lib/config";
import ContactPageForm from "./ContactPageForm";

export const metadata: Metadata = {
  title: `Contact ${company.name} | Metro Detroit Real Estate`,
  description:
    "Reach Real Estate Market Center. Leave your info and a licensed Metro Detroit team will get right back to you.",
  alternates: { canonical: "https://marketcenterrealty.com/contact" },
  robots: { index: true, follow: true },
};

/**
 * /contact — DOBI-style cinematic hero (luxury motion video #1 + dark overlay),
 * nav over the hero, centered contact form. Also the destination for the For
 * Sale sign QR code, so the form + call link stay front and center.
 */
export default function ContactPage() {
  return (
    <SiteShell navOnDark>
      <main>
        <section className="lb-hero cq-hero" style={{ color: "#F1EADB" }}>
          <BgVideo srcMp4="/hero-contact.mp4" poster="/hero-contact-poster.jpg" />
          <div className="lb-hero-shade" aria-hidden />
          <div className="cq-hero-inner">
            <div className="cq-hero-eyebrow">Contact Real Estate Market Center</div>
            <h1 className="cq-hero-title">
              Let&rsquo;s talk about <em>your move.</em>
            </h1>
            <p className="cq-hero-sub">
              Buying, selling, or just curious what a home&rsquo;s worth? Leave your info
              and our licensed {company.region} team will reach out shortly. No pressure.
            </p>
            <div className="cq-hero-form">
              <ContactPageForm />
            </div>
            <a href={`tel:${company.phoneTel}`} className="cq-hero-phone">
              Or call us now &middot; {company.phone}
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
