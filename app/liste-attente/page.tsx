import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Liste d'attente",
  description:
    "Rejoignez la liste d'attente de Bara Pro CI et bénéficiez d'un accès " +
    "prioritaire au lancement, que vous soyez client ou artisan.",
};

const perks = [
  "Accès prioritaire dès l'ouverture à Abidjan",
  "Accompagnement pour créer votre profil (artisans)",
  "Aucune carte bancaire, aucun engagement",
  "Des nouvelles en avant-première du lancement",
];

/**
 * Page dédiée à la liste d'attente. Le rôle par défaut peut être pré-sélectionné
 * via l'URL (`?role=artisan`), pratique depuis les CTA de l'accueil.
 */
export default async function ListeAttentePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const defaultRole = role === "artisan" ? "artisan" : "client";

  return (
    <>
      <PageHeader
        eyebrow="Liste d'attente"
        title={
          <>
            Rejoignez l&apos;aventure{" "}
            <span className="text-gradient-brand">dès maintenant</span>
          </>
        }
        description="Soyez parmi les premiers à profiter de Bara Pro CI au lancement."
      />

      <Section className="!pt-16">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="lg:pt-4">
            <h2 className="text-2xl font-bold">Pourquoi s&apos;inscrire maintenant ?</h2>
            <p className="mt-3 text-muted-foreground">
              La liste d&apos;attente, c&apos;est votre place réservée dans la
              première vague — avec des avantages concrets.
            </p>
            <ul className="mt-6 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-green" />
                  <span className="text-sm">{perk}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-6 sm:p-8">
              <WaitlistForm defaultRole={defaultRole} source="liste-attente" />
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
