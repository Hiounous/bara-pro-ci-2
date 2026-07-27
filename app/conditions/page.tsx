import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import {
  LegalBody,
  LegalCallout,
  LegalList,
  LegalMeta,
  LegalSection,
} from "@/components/sections/legal-layout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Les conditions générales d'utilisation du site et des services Bara Pro CI, " +
    "ainsi que les mentions légales de l'éditeur.",
};

/** Date de dernière révision du texte (à mettre à jour à chaque modification). */
const UPDATED_AT = "27 juillet 2026";

/**
 * Conditions générales d'utilisation + mentions légales.
 * Le texte décrit l'état réel du service (phase de pré-lancement : liste
 * d'attente, newsletter et comptes) et anticipe les fonctionnalités à venir.
 */
export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Conditions d'utilisation"
        description="Le cadre qui régit l'utilisation du site et des services Bara Pro CI."
      />

      <Section className="!pt-16">
        <LegalBody>
          <LegalMeta updatedAt={UPDATED_AT} />

          <LegalSection id="objet" index={1} title="Objet et acceptation">
            <p>
              Les présentes conditions générales d&apos;utilisation (les
              « Conditions ») encadrent l&apos;accès et l&apos;utilisation du site{" "}
              {siteConfig.url.replace("https://", "")} et des services proposés par
              Bara Pro CI (le « Service »).
            </p>
            <p>
              En accédant au site, en vous inscrivant à la liste d&apos;attente ou en
              créant un compte, vous acceptez sans réserve les présentes Conditions.
              Si vous ne les acceptez pas, vous ne devez pas utiliser le Service.
            </p>
          </LegalSection>

          <LegalSection id="mentions" index={2} title="Mentions légales">
            <LegalList
              items={[
                <>
                  <strong>Éditeur :</strong> Bara Pro CI —{" "}
                  <em>[forme juridique et numéro RCCM à compléter]</em>
                </>,
                <>
                  <strong>Siège :</strong> {siteConfig.city}
                </>,
                <>
                  <strong>Contact :</strong> {siteConfig.email} — {siteConfig.phone}
                </>,
                <>
                  <strong>Directeur de la publication :</strong> KAMARA Hiounous
                </>,
                <>
                  <strong>Hébergement du site :</strong> Vercel Inc. (États-Unis) —
                  vercel.com
                </>,
                <>
                  <strong>Hébergement des données :</strong> Supabase — supabase.com
                </>,
              ]}
            />
          </LegalSection>

          <LegalSection id="definitions" index={3} title="Définitions">
            <LegalList
              items={[
                <>
                  <strong>Utilisateur</strong> : toute personne qui accède au site ou
                  utilise le Service.
                </>,
                <>
                  <strong>Client</strong> : Utilisateur cherchant à découvrir,
                  comparer ou réserver un professionnel.
                </>,
                <>
                  <strong>Artisan</strong> : professionnel proposant ses services sur
                  la plateforme.
                </>,
                <>
                  <strong>Compte</strong> : espace personnel créé par un Utilisateur
                  pour accéder aux fonctionnalités réservées.
                </>,
              ]}
            />
          </LegalSection>

          <LegalSection id="etat" index={4} title="État actuel du Service">
            <p>
              Bara Pro CI est en phase de <strong>pré-lancement</strong>. À ce jour,
              le Service permet de s&apos;inscrire à la liste d&apos;attente, de
              s&apos;abonner à la newsletter et de créer un compte.
            </p>
            <p>
              Les fonctionnalités annoncées sur le site — fil de talents en vidéo,
              profils vérifiés, recherche, carte, réservation et messagerie — sont en
              cours de développement. Leur description a une valeur indicative et ne
              constitue pas un engagement contractuel de disponibilité à une date
              donnée.
            </p>
          </LegalSection>

          <LegalSection id="compte" index={5} title="Accès et compte utilisateur">
            <LegalList
              items={[
                "L'accès au site est gratuit ; les frais de connexion restent à votre charge.",
                "La création d'un compte est réservée aux personnes majeures et juridiquement capables.",
                "Vous vous engagez à fournir des informations exactes et à les tenir à jour.",
                "Vous êtes responsable de la confidentialité de vos identifiants et de toute activité effectuée depuis votre compte.",
                "En cas d'utilisation non autorisée de votre compte, prévenez-nous sans délai.",
              ]}
            />
          </LegalSection>

          <LegalSection id="engagements" index={6} title="Vos engagements">
            <p>En utilisant le Service, vous vous interdisez notamment de :</p>
            <LegalList
              items={[
                "Fournir des informations fausses, trompeuses ou usurper l'identité d'un tiers ;",
                "Utiliser le Service à des fins illicites, frauduleuses ou contraires à l'ordre public ;",
                "Publier des contenus injurieux, diffamatoires, haineux, violents ou portant atteinte aux droits d'autrui ;",
                "Tenter d'accéder sans autorisation aux systèmes, comptes ou données de la plateforme ;",
                "Collecter automatiquement des données du site (extraction, robots) sans notre accord écrit ;",
                "Perturber le fonctionnement du Service ou contourner ses mesures de sécurité.",
              ]}
            />
          </LegalSection>

          <LegalSection id="role" index={7} title="Rôle de Bara Pro CI">
            <p>
              Bara Pro CI est une <strong>plateforme de mise en relation</strong>.
              Lorsque les fonctionnalités de réservation seront ouvertes, la
              prestation sera conclue directement entre le Client et l&apos;Artisan :
              Bara Pro CI n&apos;est pas partie à ce contrat et n&apos;exécute
              aucune prestation artisanale.
            </p>
            <p>
              Nous mettons en œuvre des moyens de vérification des professionnels afin
              de renforcer la confiance, sans pour autant garantir la qualité, les
              délais ou le résultat des prestations réalisées par un Artisan.
            </p>
          </LegalSection>

          <LegalSection id="contenus" index={8} title="Contenus publiés par les Utilisateurs">
            <p>
              Vous restez propriétaire des contenus que vous publiez (textes, photos,
              vidéos). En les publiant, vous accordez à Bara Pro CI une licence
              gratuite et non exclusive pour les héberger, les afficher et les
              promouvoir dans le cadre du Service, pour la durée de leur publication.
            </p>
            <p>
              Vous garantissez détenir les droits nécessaires sur ces contenus et
              qu&apos;ils ne portent atteinte à aucun droit de tiers. Nous pouvons
              retirer tout contenu manifestement illicite ou contraire aux présentes
              Conditions.
            </p>
          </LegalSection>

          <LegalSection id="propriete" index={9} title="Propriété intellectuelle">
            <p>
              La marque « Bara Pro CI », son logo, la charte graphique, les textes et
              les éléments composant le site sont protégés. Toute reproduction ou
              utilisation, totale ou partielle, sans autorisation écrite préalable est
              interdite.
            </p>
          </LegalSection>

          <LegalSection id="responsabilite" index={10} title="Disponibilité et responsabilité">
            <p>
              Nous nous efforçons d&apos;assurer la disponibilité du Service, sans
              pouvoir la garantir de manière ininterrompue. L&apos;accès peut être
              suspendu pour maintenance, mise à jour ou en cas d&apos;incident
              technique.
            </p>
            <p>
              Notre responsabilité ne saurait être engagée en cas de dommage indirect,
              de perte de données ou de manquement imputable à un Utilisateur, à un
              Artisan ou à un événement échappant à notre contrôle raisonnable.
            </p>
          </LegalSection>

          <LegalSection id="donnees" index={11} title="Données personnelles">
            <p>
              Le traitement de vos données est décrit dans notre{" "}
              <Link
                href="/confidentialite"
                className="font-medium text-primary underline underline-offset-4"
              >
                politique de confidentialité
              </Link>
              , qui fait partie intégrante des présentes Conditions.
            </p>
          </LegalSection>

          <LegalSection id="resiliation" index={12} title="Durée, suspension et résiliation">
            <p>
              Les Conditions s&apos;appliquent pendant toute la durée
              d&apos;utilisation du Service. Vous pouvez à tout moment cesser de
              l&apos;utiliser et demander la suppression de votre compte en nous
              écrivant.
            </p>
            <p>
              Nous pouvons suspendre ou résilier un accès, après information préalable
              lorsque c&apos;est possible, en cas de manquement grave aux présentes
              Conditions ou d&apos;usage frauduleux du Service.
            </p>
          </LegalSection>

          <LegalSection id="modifications" index={13} title="Modification des Conditions">
            <p>
              Nous pouvons modifier les présentes Conditions afin de les adapter à
              l&apos;évolution du Service ou de la réglementation. En cas de
              changement substantiel, vous en serez informé par email ou par une
              mention sur le site. La date de dernière mise à jour figure en haut de
              cette page.
            </p>
          </LegalSection>

          <LegalSection id="droit" index={14} title="Droit applicable et règlement des litiges">
            <p>
              Les présentes Conditions sont régies par le droit ivoirien. En cas de
              différend, les parties privilégieront une solution amiable. À défaut
              d&apos;accord, le litige sera porté devant les juridictions
              compétentes d&apos;Abidjan, Côte d&apos;Ivoire.
            </p>
          </LegalSection>

          <LegalSection id="contact" index={15} title="Contact">
            <LegalCallout>
              <p className="font-medium">Une question sur ces conditions ?</p>
              <p className="mt-1 text-muted-foreground">
                Écrivez-nous à{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>{" "}
                ou via notre{" "}
                <Link
                  href="/contact"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  formulaire de contact
                </Link>
                .
              </p>
            </LegalCallout>
          </LegalSection>
        </LegalBody>
      </Section>
    </>
  );
}
