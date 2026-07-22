import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { TalentCard } from "@/components/sections/talent-card";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { demoArtisans } from "@/lib/demo-data";

/** Aperçu du fil de talents : rangée de cartes vidéo. */
export function TalentFeedPreview() {
  return (
    <Section className="bg-secondary/30">
      <SectionHeading
        eyebrow="Le fil de talents"
        title={
          <>
            Le savoir-faire ivoirien,{" "}
            <span className="text-gradient-brand">en vidéo</span>
          </>
        }
        description="Chaque artisan raconte son métier en images. Un format court et vivant qui donne envie de faire confiance — et de réserver."
      />

      <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {demoArtisans.map((artisan) => (
          <RevealItem key={artisan.name}>
            <TalentCard artisan={artisan} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/fonctionnalites">
            Découvrir toutes les fonctionnalités <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
