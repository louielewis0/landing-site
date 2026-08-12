import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { manrope, grotesk } from "@/lib/site-fonts";
import { company } from "@/lib/config";
import ContactPageForm from "./ContactPageForm";

export const metadata: Metadata = {
  title: `Contact ${company.name} | Metro Detroit Real Estate`,
  description:
    "Reach Real Estate Market Center. Leave your info and a licensed Metro Detroit broker will get right back to you.",
  alternates: { canonical: "https://marketcenterrealty.com/contact" },
  robots: { index: true, follow: true },
};

/**
 * Standalone /contact page — the destination for the For Sale sign QR
 * code. Deliberately NOT the full SiteShell (no nav/footer/popups): a
 * clean, phone-first landing so a scanner sees one thing to do. Own
 * font-variable wrapper since it skips SiteShell.
 */
export default function ContactPage() {
  return (
    <div className={`cq-page site-theme ${manrope.variable} ${grotesk.variable}`}>
      <div className="cq-inner">
        <Link href="/" className="cq-logo" aria-label={`${company.name} home`}>
          <Image src="/mcr-logo-color-3d.png" alt={company.name} width={84} height={84} priority />
        </Link>
        <div className="cq-eyebrow">Real Estate Market Center</div>
        <h1>
          Let&rsquo;s talk about
          <br />
          <span>your move.</span>
        </h1>
        <p className="cq-sub">
          Buying, selling, or just curious what a home&rsquo;s worth? Leave your
          info and a licensed {company.region} broker will reach out shortly.
          No pressure.
        </p>

        <ContactPageForm />

        <a href={`tel:${company.phoneTel}`} className="cq-phone">
          Or call us now &middot; {company.phone}
        </a>
      </div>
    </div>
  );
}
