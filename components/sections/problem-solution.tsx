import { CheckCircle2, XCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/motion/reveal";

const problems = [
  "Le bouche-à-oreille, lent et incertain",
  "Impossible de vérifier le sérieux d'un artisan",
  "Pas d'avis, pas de preuves du travail réel",
  "Devis flous et rendez-vous manqués",
];

const solutions = [
  "Des artisans à portée de clic, près de chez vous",
  "Profils vérifiés avec badge de confiance",
  "Vidéos du travail réel + avis clients authentiques",
  "Réservation claire et messagerie intégrée",
];

/** Section « Le problème / La solution » en deux colonnes contrastées. */
export function ProblemSolution() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Le constat"
        title={
          <>
            Trouver un bon artisan ne devrait pas être{" "}
            <span className="text-gradient-brand">un parcours du combattant</span>
          </>
        }
        description="En Côte d'Ivoire, le talent artisanal ne manque pas — c'est la visibilité et la confiance qui manquent. Bara Pro CI change la donne."
      />

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border bg-card p-7 shadow-soft">
            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
              <XCircle className="size-5 text-destructive" />
              Avant Bara Pro
            </h3>
            <ul className="space-y-3.5">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-primary/30 bg-card p-7 shadow-soft">
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-2xl" />
            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
              <CheckCircle2 className="size-5 text-brand-green" />
              Avec Bara Pro
            </h3>
            <ul className="space-y-3.5">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-green" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
