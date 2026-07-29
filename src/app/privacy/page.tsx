import type { Metadata } from "next";
import SiteShell from "@/components/site/SiteShell";
import { company } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${company.name}`,
  description: `How ${company.name} collects, uses, and protects your information.`,
  alternates: { canonical: "https://marketcenterrealty.com/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Privacy policy — typography tokens only, no motion (legal page).
 * This page previously did not exist despite footer links to it;
 * created as part of the redesign rollout.
 */
export default function PrivacyPage() {
  return (
    <SiteShell>
      <main className="bg-cream" style={{ paddingTop: 130, paddingBottom: 90 }}>
        <div className="container prose-site" style={{ maxWidth: 780 }}>
          <div className="s-eyebrow">Legal</div>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 46px)", marginBottom: 8 }}>Privacy Policy</h1>
          <p style={{ color: "var(--s-muted)", fontSize: 13, marginBottom: 40 }}>
            Last updated: July 29, 2026
          </p>

          <h2>Who we are</h2>
          <p>
            {company.name} is a licensed real estate brokerage in Michigan,
            located at {company.address}. You can reach us at{" "}
            <a href={`tel:${company.phoneTel}`}>{company.phone}</a> or{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>

          <h2>What we collect</h2>
          <p>
            When you submit a form on this site — a valuation request, a
            contact message, or a review — we collect the information you
            provide: typically your name, email address, phone number,
            property address, and anything you write in a message field. We
            also collect standard technical information (such as pages
            visited) through our hosting provider&rsquo;s logs.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your inquiry — that&rsquo;s why you gave it to us.</li>
            <li>To prepare the valuation or service you requested.</li>
            <li>To follow up about your real-estate needs, by phone, text, or email.</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal information with
            third parties for their marketing purposes. Your information
            stays with our brokerage.
          </p>

          <h2>Text messages and calls</h2>
          <p>
            If you provide a phone number, you may receive a call or text from
            a member of our team about your inquiry. Reply STOP to any text to
            opt out, or tell us on a call and we will not contact you again.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We retain inquiry records for as long as needed to serve you and
            to meet Michigan real-estate record-keeping requirements. You can
            ask us to delete your information at any time by emailing{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>, and we
            will do so unless a legal obligation requires us to keep it.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site does not use advertising trackers. Our hosting and form
            infrastructure may set strictly necessary cookies for the site to
            function.
          </p>

          <h2>Third-party services</h2>
          <p>
            Form submissions are stored with our database provider and
            embedded maps are served by Google Maps, which has its own privacy
            policy. We only work with providers that support the commitments
            on this page.
          </p>

          <h2>Changes</h2>
          <p>
            If we change this policy, we will update this page and the date at
            the top. Questions? Email{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
      </main>
    </SiteShell>
  );
}
