import SiteShell from "@/components/site/SiteShell";
import HeroExplore from "@/components/site/HeroExplore";
import {
  TemplateStats,
  TemplateAreas,
  TemplateAbout,
  TemplateReviews,
  TemplateCta,
} from "@/components/site/TemplateHome";
import ListingsShowcase from "@/components/site/ListingsShowcase";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <SiteShell navOnDark>
      <main>
        <HeroExplore />
        <TemplateStats />
        <ListingsShowcase />
        <TemplateAreas />
        <TemplateAbout />
        <TemplateReviews />
        <TemplateCta />
        <ContactForm />
      </main>
    </SiteShell>
  );
}
