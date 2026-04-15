import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
        {/* 1. Hero — above the fold: headline + form + trust triggers */}
        <Hero />

        {/* 2. Lead cards — 4 direct paths to convert (valuation / listings / sell / call) */}
        <LeadCards />

        {/* 3. Social proof */}
        <Testimonials />

        {/* 4. Primary seller-lead capture */}
        <LeadMagnet />

        {/* 5. Services — 8 specialty cards, each funnels to valuation form */}
        <Services />

        {/* 6. About — tight authority block */}
        <About />

        {/* 7. Local SEO section */}
        <Neighborhoods />

        {/* 8. Final contact / schedule */}
        <ContactForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
