import type { Metadata } from "next";
import { MapPin, ShieldCheck, Zap } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RadarSearch } from "@/components/sections/radar-search";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Côté client comme côté artisan, Bara Pro CI se résume à trois étapes " +
    "simples. Découvrez le parcours de chacun.",
};

/** Page « Comment ça marche » : deux parcours en 3 étapes via des onglets. */
export default function CommentCaMarchePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comment ça marche"
        title={
          <>
            Simple pour tous,{" "}
            <span className="text-gradient-brand">en trois étapes</span>
          </>
        }
        description="Que vous cherchiez un pro ou que vous en soyez un, tout est pensé pour aller à l'essentiel."
      />

      <Section>
        <HowItWorks />
      </Section>

      {/* Démonstration côté client : la recherche d'artisan à proximité */}
      <Section className="bg-secondary/30">
        <SectionHeading
          eyebrow="Côté client"
          title={
            <>
              La recherche d&apos;un pro,{" "}
              <span className="text-gradient-brand">en direct</span>
            </>
          }
          description="Indiquez le métier et votre quartier : Bara Pro CI repère instantanément les artisans vérifiés et disponibles autour de vous."
        />

        <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1 flex flex-col gap-6">
            <FeatureLine
              icon={<MapPin className="size-5 text-primary" />}
              title="Autour de vous"
              text="La géolocalisation trouve les pros les plus proches — intervention plus rapide."
            />
            <FeatureLine
              icon={<Zap className="size-5 text-primary" />}
              title="En temps réel"
              text="Disponibilités, distance et notes affichées instantanément."
            />
            <FeatureLine
              icon={<ShieldCheck className="size-5 text-primary" />}
              title="Uniquement des pros vérifiés"
              text="Chaque artisan proposé porte le badge de confiance Bara Pro CI."
            />
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <RadarSearch />
          </Reveal>
        </div>
      </Section>

      <WaitlistCta />
    </>
  );
}

/** Argument illustré (icône + titre + texte) de la démo côté client. */
function FeatureLine({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
