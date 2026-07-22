import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Bara Pro CI collecte, utilise et protège vos données personnelles.",
};

/** Page de confidentialité (contenu de base à finaliser avec un juriste). */
export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Politique de confidentialité"
        description="Votre confiance compte. Voici comment nous traitons vos données."
      />
      <Section className="!pt-16">
        <div className="mx-auto max-w-2xl space-y-5 text-muted-foreground">
          <p className="text-sm">
            Dernière mise à jour : {new Date().getFullYear()}. Ce document est une
            version préliminaire, destinée à être complétée avant le lancement
            commercial.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Données que nous collectons
          </h2>
          <p>
            Lorsque vous rejoignez la liste d&apos;attente ou la newsletter, nous
            collectons uniquement les informations nécessaires : votre adresse
            email, votre rôle (client ou artisan) et, le cas échéant, votre ville
            et votre métier.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Utilisation des données
          </h2>
          <p>
            Vos données servent exclusivement à vous informer du lancement, à
            préparer votre accès et à améliorer notre service. Nous ne revendons
            jamais vos informations à des tiers.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Vos droits
          </h2>
          <p>
            Vous pouvez à tout moment demander l&apos;accès, la rectification ou la
            suppression de vos données en nous écrivant à{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-primary underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
