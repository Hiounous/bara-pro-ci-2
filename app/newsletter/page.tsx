import type { Metadata } from "next";
import { Mail, Newspaper, Rocket } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Abonnez-vous à la newsletter Bara Pro CI : actus du lancement, conseils " +
    "pour artisans et clients, et coulisses du projet.",
};

const topics = [
  {
    icon: Rocket,
    title: "Les actus du lancement",
    description: "Dates, nouvelles villes, ouverture des inscriptions.",
  },
  {
    icon: Newspaper,
    title: "Conseils & astuces",
    description: "Bien choisir son artisan, mettre en valeur son métier.",
  },
  {
    icon: Mail,
    title: "Les coulisses",
    description: "L'histoire du projet et de la communauté, sans filtre.",
  },
];

/** Page dédiée à l'inscription newsletter. */
export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Newsletter"
        title={
          <>
            Ne manquez <span className="text-gradient-brand">aucune actu</span>
          </>
        }
        description="Une newsletter utile, sans spam. Désinscription en un clic, à tout moment."
      />

      <Section className="!pt-16">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <Card className="p-6 sm:p-8">
              <NewsletterForm source="page-newsletter" />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                En vous inscrivant, vous acceptez de recevoir nos emails. Vous
                pouvez vous désabonner quand vous le souhaitez.
              </p>
            </Card>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {topics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <Reveal key={topic.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center shadow-soft">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
