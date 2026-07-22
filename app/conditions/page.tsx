import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Les conditions d'utilisation du site et des services Bara Pro CI.",
};

/** Conditions d'utilisation (contenu de base à finaliser avec un juriste). */
export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Conditions d'utilisation"
        description="Le cadre qui régit l'utilisation de nos services."
      />
      <Section className="!pt-16">
        <div className="mx-auto max-w-2xl space-y-5 text-muted-foreground">
          <p className="text-sm">
            Dernière mise à jour : {new Date().getFullYear()}. Version
            préliminaire, à compléter avant le lancement commercial.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Objet
          </h2>
          <p>
            Les présentes conditions encadrent l&apos;accès au site Bara Pro CI et
            l&apos;inscription à la liste d&apos;attente et à la newsletter, en
            phase de pré-lancement.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Utilisation du service
          </h2>
          <p>
            Vous vous engagez à fournir des informations exactes et à utiliser le
            site de manière loyale. Bara Pro CI se réserve le droit de faire
            évoluer ses services et ces conditions.
          </p>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Contact
          </h2>
          <p>
            Pour toute question relative à ces conditions, écrivez-nous à{" "}
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
