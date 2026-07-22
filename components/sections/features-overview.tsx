import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { FeatureCard } from "@/components/sections/feature-card";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { features } from "@/lib/features-data";

/** Aperçu des fonctionnalités clés sur l'accueil (grille de cartes). */
export function FeaturesOverview() {
  return (
    <Section id="fonctionnalites">
      <SectionHeading
        eyebrow="Une plateforme complète"
        title={
          <>
            Tout ce qu&apos;il faut pour{" "}
            <span className="text-gradient-brand">connecter</span> clients et
            artisans
          </>
        }
        description="De la découverte en vidéo à la réservation, chaque détail est pensé pour créer la confiance."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <RevealItem key={feature.slug}>
            <FeatureCard feature={feature} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="brand" size="lg">
          <Link href="/fonctionnalites">
            Voir le détail des fonctionnalités <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
