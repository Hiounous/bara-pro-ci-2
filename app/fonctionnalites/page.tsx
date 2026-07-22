import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { accentClasses, features } from "@/lib/features-data";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Fil vidéo, profils vérifiés, recherche intelligente, carte interactive, " +
    "réservation, messagerie et tableau de bord pro : découvrez tout ce que " +
    "Bara Pro CI met au service des artisans et des clients.",
};

/**
 * Page Fonctionnalités : chaque fonctionnalité présentée en ligne alternée
 * (texte + visuel), à partir de la source unique `features`.
 */
export default function FonctionnalitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fonctionnalités"
        title={
          <>
            Une plateforme pensée pour{" "}
            <span className="text-gradient-brand">la confiance</span>
          </>
        }
        description="Sept briques qui transforment la façon de trouver — et d'être — un artisan de confiance en Côte d'Ivoire."
      />

      <Section className="!pt-16">
        <div className="flex flex-col gap-16 lg:gap-24">
          {features.map((feature, i) => {
            const accent = accentClasses[feature.accent];
            const Icon = feature.icon;
            const reversed = i % 2 === 1;

            return (
              <Reveal key={feature.slug}>
                <div
                  id={feature.slug}
                  className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Texte */}
                  <div className={cn("space-y-5", reversed && "lg:order-2")}>
                    <div
                      className={cn(
                        "flex size-14 items-center justify-center rounded-2xl",
                        accent.bg,
                      )}
                    >
                      <Icon className={cn("size-7", accent.text)} />
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        Fonctionnalité {String(i + 1).padStart(2, "0")}
                      </Badge>
                    </div>
                    <h2 className="text-balance text-2xl font-bold sm:text-3xl">
                      {feature.title}
                    </h2>
                    <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {feature.description}
                    </p>
                  </div>

                  {/* Visuel abstrait (placeholder premium) */}
                  <div className={cn(reversed && "lg:order-1")}>
                    <FeatureVisual accent={feature.accent} Icon={Icon} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <WaitlistCta />
    </>
  );
}

/** Visuel décoratif d'une fonctionnalité (dégradé + icône, sans image externe). */
function FeatureVisual({
  accent,
  Icon,
}: {
  accent: "orange" | "green" | "gold";
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const a = accentClasses[accent];
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-card shadow-soft">
      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 size-48 rounded-full blur-3xl",
          a.bg,
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "flex size-24 items-center justify-center rounded-3xl shadow-soft",
            a.bg,
          )}
        >
          <Icon className={cn("size-12", a.text)} />
        </div>
      </div>
      {/* Fausses lignes d'UI pour évoquer une interface */}
      <div className="absolute inset-x-6 bottom-6 space-y-2">
        <div className="h-2.5 w-2/3 rounded-full bg-foreground/10" />
        <div className="h-2.5 w-1/2 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}
