import { Hero } from "@/components/sections/hero";
import { TradesMarquee } from "@/components/sections/trades-marquee";
import { ProblemSolution } from "@/components/sections/problem-solution";
import { TalentFeedPreview } from "@/components/sections/talent-feed-preview";
import { FeaturesOverview } from "@/components/sections/features-overview";
import { SocialProof } from "@/components/sections/social-proof";
import { WaitlistCta } from "@/components/sections/waitlist-cta";

/**
 * Page d'accueil — assemble les sections vitrine dans un ordre narratif :
 * accroche → métiers → problème/solution → fil de talents → fonctionnalités →
 * preuve sociale → appel à rejoindre la liste d'attente.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TradesMarquee />
      <ProblemSolution />
      <TalentFeedPreview />
      <FeaturesOverview />
      <SocialProof />
      <WaitlistCta />
    </>
  );
}
