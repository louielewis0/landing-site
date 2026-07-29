import SiteShell from "@/components/site/SiteShell";
import Hero from "@/components/Hero";
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
    <SiteShell>
      <main>
        <Hero />
        <TrustBadges />
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
