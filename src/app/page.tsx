import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import FeaturedListings from "@/components/FeaturedListings";
import LeadMagnet from "@/components/LeadMagnet";
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
        <Stats />
        <Testimonials />
        <Services />
        <FeaturedListings />
        <LeadMagnet />
        <About />
        <Neighborhoods />
        <ContactForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
