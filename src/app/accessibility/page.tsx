import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: `Accessibility Statement | ${company.name}`,
  description: `${company.name} is committed to making its website accessible to everyone, including people with disabilities, and works toward WCAG 2.1 Level AA.`,
  alternates: { canonical: "https://marketcenterrealty.com/accessibility" },
  robots: { index: true, follow: true },
};

/**
 * Accessibility statement — typography tokens only, no motion.
 * States our commitment, the standard we work toward (WCAG 2.1 AA),
 * the measures in place, known limitations, and how to reach us for
 * help or to report a barrier.
 */
export default function AccessibilityPage() {
  return (
    <SiteShell>
      <main className="bg-cream" style={{ paddingTop: 40, paddingBottom: 90 }}>
        <div className="container prose-site" style={{ maxWidth: 780 }}>
          <div className="s-eyebrow">Accessibility</div>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", marginBottom: 8 }}>
            Accessibility Statement
          </h1>
          <p style={{ color: "var(--s-muted)", fontSize: 13, marginBottom: 40 }}>
            Last updated: October 22, 2026
          </p>

          <h2>Our commitment</h2>
          <p>
            {company.name} is committed to making this website usable for as
            many people as possible, including people with disabilities. We
            believe everyone should be able to find a home, request a
            valuation, and reach our team regardless of how they browse the
            web.
          </p>

          <h2>The standard we work toward</h2>
          <p>
            We aim to conform to the{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>
            . These guidelines explain how to make web content more accessible
            to people with a wide range of disabilities, including visual,
            motor, auditory, and cognitive. Accessibility is an ongoing
            effort, and we review and improve the site over time.
          </p>

          <h2>What we&rsquo;ve done</h2>
          <ul>
            <li>Structured pages with proper headings and landmarks so assistive technology can navigate them.</li>
            <li>Made the site operable by keyboard, with a &ldquo;Skip to main content&rdquo; link and a visible focus indicator on every interactive element.</li>
            <li>Checked text color contrast against its background to meet the AA minimum.</li>
            <li>Gave every form field a clear label and added descriptive text for images.</li>
            <li>Respected the &ldquo;reduce motion&rdquo; setting — animations are minimized or turned off for visitors who prefer less movement.</li>
            <li>Kept text resizable and pinch-zoom enabled, and designed the site to work on phones, tablets, and desktops.</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Some content relies on third-party services — for example, embedded
            Google Maps — whose accessibility we do not fully control. We also
            add new pages and features regularly, and despite our best efforts
            some content may not yet fully meet every guideline. If you
            encounter a barrier, we want to hear about it and will work to fix
            it.
          </p>

          <h2>Need help or found a problem?</h2>
          <p>
            If any part of this site is difficult to use, or you need
            information in a different format, please contact us and we will
            help directly:
          </p>
          <ul>
            <li>
              Phone: <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
            </li>
            <li>
              Email: <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>Mail: {company.address}</li>
          </ul>
          <p>
            We aim to respond within a few business days. Please tell us the
            page and what you were trying to do, so we can help as quickly as
            possible.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
