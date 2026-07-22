import type { Metadata } from "next";
import { Compass, Eye, Flag, HandHeart, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section, SectionHeading } from "@/components/sections/section-heading";
import { WaitlistCta } from "@/components/sections/waitlist-cta";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire de Bara Pro CI : née de l'ambition d'un jeune entrepreneur " +
    "ivoirien, notre mission est de donner de la visibilité aux artisans " +
    "qualifiés de Côte d'Ivoire.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Confiance",
    description:
      "La vérification et la transparence au cœur de tout. Chaque interaction doit rassurer.",
  },
  {
    icon: HandHeart,
    title: "Fierté du métier",
    description:
      "Célébrer le savoir-faire ivoirien et redonner ses lettres de noblesse à l'artisanat.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "Une expérience soignée, digne des meilleures plateformes mondiales, pensée ici.",
  },
  {
    icon: Compass,
    title: "Impact local",
    description:
      "Créer des opportunités concrètes de revenus pour des milliers d'artisans.",
  },
];

/** Page À propos : récit fondateur + mission, vision et valeurs. */
export default function AProposPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notre histoire"
        title={
          <>
            Né en Côte d&apos;Ivoire, pour{" "}
            <span className="text-gradient-brand">les artisans ivoiriens</span>
          </>
        }
        description="Une plateforme qui met la technologie au service du talent local."
      />

      {/* Récit du fondateur */}
      <Section>
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border bg-gradient-brand shadow-soft">
              <div className="absolute inset-0 pattern-dots opacity-20" aria-hidden />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-white">
                <span className="text-6xl" aria-hidden>
                  🇨🇮
                </span>
                <p className="font-display text-xl font-bold">
                  Du concours d&apos;entrepreneuriat au terrain
                </p>
                <p className="text-sm text-white/80">
                  Une idée récompensée, devenue une mission.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <Badge variant="green">
              <Flag className="size-3.5" /> Le fondateur
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Tout commence par une conviction
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Bara Pro CI est née de l&apos;ambition d&apos;un jeune
                entrepreneur ivoirien. L&apos;idée a germé lors d&apos;un
                concours d&apos;entrepreneuriat, où une question simple revenait
                sans cesse : pourquoi est-il si difficile de trouver un artisan
                de confiance, alors que le talent est partout autour de nous ?
              </p>
              <p>
                En Côte d&apos;Ivoire, des milliers d&apos;électriciens,
                plombiers, peintres et menuisiers exceptionnels peinent à être
                trouvés — non par manque de compétence, mais par manque de
                visibilité. Dans le même temps, les clients naviguent à
                l&apos;aveugle, au gré du bouche-à-oreille.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  « Bara »
                </span>{" "}
                signifie « le travail » en nouchi. Notre projet : faire de ce
                travail une fierté visible, et connecter chaque Ivoirien au bon
                pro, en un clic.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-secondary/30">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-8">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Flag className="size-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold">Notre mission</h3>
              <p className="mt-3 text-muted-foreground">
                Donner de la visibilité aux artisans qualifiés de Côte
                d&apos;Ivoire et permettre à chacun de trouver, comparer et
                réserver un professionnel de confiance — simplement.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-8">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-green/10">
                <Eye className="size-6 text-brand-green" />
              </div>
              <h3 className="font-display text-xl font-bold">Notre vision</h3>
              <p className="mt-3 text-muted-foreground">
                Devenir la référence de l&apos;artisanat de confiance en Afrique
                de l&apos;Ouest, et faire du savoir-faire local un moteur
                d&apos;emploi et de fierté.
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Valeurs */}
      <Section>
        <SectionHeading
          eyebrow="Nos valeurs"
          title="Ce qui nous guide au quotidien"
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <RevealItem key={v.title}>
                <Card className="flex h-full flex-col gap-3 p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent">
                    <Icon className="size-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <WaitlistCta />
    </>
  );
}
