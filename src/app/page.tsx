import SiteShell from "@/components/site/SiteShell";
import HeroExplore from "@/components/site/HeroExplore";
import {
  TemplateStats,
  TemplateAreas,
  TemplateAbout,
  TemplateReviews,
  TemplateCta,
} from "@/components/site/TemplateHome";
import ActionTiles from "@/components/site/ActionTiles";
import JustListed from "@/components/site/JustListed";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <SiteShell navOnDark>
      <main>
        <HeroExplore />
        <TemplateStats />
        <ActionTiles />
        <JustListed />
        <TemplateAreas />
        <TemplateAbout />
        <TemplateReviews />
        <TemplateCta />
        <ContactForm />
      </main>
    </SiteShell>
  );
}
