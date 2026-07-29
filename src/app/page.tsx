import SiteShell from "@/components/site/SiteShell";
import VideoHero from "@/components/site/VideoHero";
import Hero3D from "@/components/site/Hero3D";
import HeroLeadForm from "@/components/HeroLeadForm";
import TrustBadges from "@/components/TrustBadges";
import LeadCards from "@/components/LeadCards";
import Testimonials from "@/components/Testimonials";
import LeadMagnet from "@/components/LeadMagnet";
import Services from "@/components/Services";
import About from "@/components/About";
import Neighborhoods from "@/components/Neighborhoods";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <SiteShell navOnDark>
      <main>
        <VideoHero />
        <Hero3D />
        <TrustBadges />
        {/* Quick capture — white card, centered, right under the stats band */}
        <section className="bg-cream" style={{ padding: "90px 0" }}>
          <div className="container" style={{ maxWidth: 560 }}>
            <HeroLeadForm />
          </div>
        </section>
        <LeadCards />
        <Testimonials />
        <LeadMagnet />
        <Services />
        <About />
        <Neighborhoods />
        <ContactForm />
      </main>
    </SiteShell>
  );
}
