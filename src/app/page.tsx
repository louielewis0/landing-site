import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import LeadCards from "@/components/LeadCards";
import Testimonials from "@/components/Testimonials";
import LeadMagnet from "@/components/LeadMagnet";
import Services from "@/components/Services";
import About from "@/components/About";
import Neighborhoods from "@/components/Neighborhoods";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
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
      <Footer />
      <FloatingCTA />
    </>
  );
}
