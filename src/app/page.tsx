import SiteShell from "@/components/site/SiteShell";
import {
  TemplateHero,
  TemplateStats,
  TemplateAreas,
  TemplateAbout,
  TemplateCta,
} from "@/components/site/TemplateHome";
import ListingsShowcase from "@/components/site/ListingsShowcase";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <SiteShell navOnDark>
      <main>
        <TemplateHero />
        <TemplateStats />
        <ListingsShowcase />
        <TemplateAreas />
        <TemplateAbout />
        <TemplateCta />
        <ContactForm />
      </main>
    </SiteShell>
  );
}
