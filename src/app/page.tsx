import SiteShell from "@/components/site/SiteShell";
import {
  TemplateHero,
  TemplateStats,
  TemplateListings,
  TemplateAbout,
  TemplateCta,
} from "@/components/site/TemplateHome";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <SiteShell>
      <main>
        <TemplateHero />
        <TemplateStats />
        <TemplateListings />
        <TemplateAbout />
        <TemplateCta />
        <ContactForm />
      </main>
    </SiteShell>
  );
}
