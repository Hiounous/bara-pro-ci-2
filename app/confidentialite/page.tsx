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
  title: "Politique de confidentialité",
  description:
    "Comment Bara Pro CI collecte, utilise, conserve et protège vos données " +
    "personnelles, conformément à la loi ivoirienne n°2013-450.",
};

/** Date de dernière révision du texte (à mettre à jour à chaque modification). */
const UPDATED_AT = "27 juillet 2026";

/**
 * Politique de confidentialité. Le contenu décrit fidèlement les traitements
 * réellement effectués par le site (liste d'attente, newsletter, contact,
 * comptes) et les sous-traitants utilisés (Supabase, Vercel, Resend, Google).
 */
export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Légal"
        title="Politique de confidentialité"
        description="Votre confiance est notre priorité. Voici, en toute transparence, ce que nous collectons et pourquoi."
      />

      <Section className="!pt-16">
        <LegalBody>
          <LegalMeta updatedAt={UPDATED_AT} />

          <LegalSection id="responsable" index={1} title="Qui est responsable de vos données">
            <p>
              Le présent site est édité par <strong>Bara Pro CI</strong>, plateforme
              de mise en relation entre particuliers et artisans qualifiés, basée à{" "}
              {siteConfig.city}.
            </p>
            <p>
              Bara Pro CI agit en qualité de responsable du traitement des données
              personnelles collectées sur {siteConfig.url.replace("https://", "")}.
            </p>
            <LegalCallout>
              <p className="font-medium">Contact — protection des données</p>
              <p className="mt-1 text-muted-foreground">
                Email :{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
                <br />
                Téléphone : {siteConfig.phone}
              </p>
            </LegalCallout>
          </LegalSection>

          <LegalSection id="donnees" index={2} title="Les données que nous collectons">
            <p>
              Nous ne collectons que les informations nécessaires au fonctionnement
              du service. Concrètement :
            </p>
            <p className="font-medium text-foreground">
              a. Inscription à la liste d&apos;attente
            </p>
            <LegalList
              items={[
                "Votre adresse email ;",
                "Votre profil : client ou artisan ;",
                "Pour les artisans : votre métier et votre ville (facultatifs) ;",
                "La page depuis laquelle vous vous êtes inscrit et la date d'inscription.",
              ]}
            />
            <p className="font-medium text-foreground">b. Création d&apos;un compte</p>
            <LegalList
              items={[
                "Votre nom complet et votre adresse email ;",
                "Votre mot de passe, stocké sous forme chiffrée — nous n'y avons jamais accès en clair ;",
                "Votre profil (client ou artisan) et, pour les artisans, métier et ville ;",
                "Si vous choisissez la connexion Google : votre nom, votre adresse email et votre photo de profil, transmis par Google.",
              ]}
            />
            <p className="font-medium text-foreground">c. Newsletter et contact</p>
            <LegalList
              items={[
                "Newsletter : votre adresse email et la date d'inscription ;",
                "Formulaire de contact : votre nom, votre email et le contenu de votre message.",
              ]}
            />
            <p className="font-medium text-foreground">d. Données techniques</p>
            <LegalList
              items={[
                "Cookies de session, strictement nécessaires pour vous maintenir connecté ;",
                "Journaux techniques de nos hébergeurs (adresse IP, type de navigateur, pages consultées), utilisés pour la sécurité et le bon fonctionnement du service.",
              ]}
            />
            <p>
              Nous n&apos;utilisons <strong>aucun cookie publicitaire</strong>, aucun
              traceur de réseau social et aucun outil de profilage.
            </p>
          </LegalSection>

          <LegalSection id="finalites" index={3} title="Pourquoi nous les utilisons">
            <LegalList
              items={[
                "Vous informer du lancement et vous donner un accès prioritaire, si vous êtes inscrit sur la liste d'attente ;",
                "Créer et sécuriser votre compte, et vous permettre de vous connecter ;",
                "Vous envoyer les emails liés à votre compte (confirmation d'inscription, réinitialisation de mot de passe) ;",
                "Vous adresser notre newsletter, si vous y avez consenti ;",
                "Répondre à vos messages envoyés via le formulaire de contact ;",
                "Assurer la sécurité du service et prévenir les abus (notamment les inscriptions automatisées) ;",
                "Comprendre l'intérêt porté au service afin de l'améliorer.",
              ]}
            />
            <p>
              Ces traitements reposent sur votre consentement (liste d&apos;attente,
              newsletter), sur l&apos;exécution du service que vous demandez (compte
              utilisateur) et sur notre intérêt légitime à sécuriser la plateforme.
            </p>
          </LegalSection>

          <LegalSection id="partage" index={4} title="Avec qui nous les partageons">
            <p>
              <strong>
                Nous ne vendons ni ne louons jamais vos données personnelles.
              </strong>{" "}
              Nous faisons appel à des prestataires techniques (sous-traitants) qui
              les traitent uniquement pour notre compte et selon nos instructions :
            </p>
            <LegalList
              items={[
                <>
                  <strong>Supabase</strong> — hébergement de la base de données et
                  gestion des comptes utilisateurs ;
                </>,
                <>
                  <strong>Vercel</strong> — hébergement du site web ;
                </>,
                <>
                  <strong>Resend</strong> — envoi de nos emails (serveurs situés en
                  Irlande) ;
                </>,
                <>
                  <strong>Google</strong> — uniquement si vous choisissez de vous
                  connecter avec votre compte Google.
                </>,
              ]}
            />
            <p>
              Nous pouvons également être amenés à communiquer des informations à une
              autorité administrative ou judiciaire lorsque la loi l&apos;exige.
            </p>
          </LegalSection>

          <LegalSection id="transferts" index={5} title="Transferts hors de Côte d'Ivoire">
            <p>
              Nos prestataires techniques étant établis à l&apos;étranger, vos données
              peuvent être hébergées ou traitées en dehors de la Côte d&apos;Ivoire,
              notamment dans l&apos;Union européenne et aux États-Unis. Nous
              sélectionnons des prestataires reconnus, offrant des garanties
              contractuelles et techniques appropriées.
            </p>
          </LegalSection>

          <LegalSection id="conservation" index={6} title="Combien de temps nous les conservons">
            <LegalList
              items={[
                "Liste d'attente : jusqu'au lancement du service, puis au maximum trois (3) ans après notre dernier contact ;",
                "Newsletter : jusqu'à votre désinscription ;",
                "Compte utilisateur : tant que votre compte est actif, puis supprimé sur demande ;",
                "Messages de contact : douze (12) mois après notre réponse ;",
                "Journaux techniques : durée courte, définie par nos hébergeurs, à des fins de sécurité.",
              ]}
            />
          </LegalSection>

          <LegalSection id="securite" index={7} title="Comment nous les protégeons">
            <LegalList
              items={[
                "Chiffrement des échanges entre votre navigateur et le site (HTTPS) ;",
                "Mots de passe stockés de façon chiffrée et irréversible ;",
                "Accès aux données restreint et protégé par des règles de sécurité au niveau de la base de données ;",
                "Aucune donnée sensible (carte bancaire, pièce d'identité) n'est collectée à ce stade.",
              ]}
            />
            <p>
              Aucun système n&apos;étant infaillible, nous nous engageons à vous
              informer sans délai en cas d&apos;incident de sécurité affectant vos
              données.
            </p>
          </LegalSection>

          <LegalSection id="droits" index={8} title="Vos droits">
            <p>
              Conformément à la loi ivoirienne n°2013-450 du 19 juin 2013 relative à
              la protection des données à caractère personnel, vous disposez des
              droits suivants :
            </p>
            <LegalList
              items={[
                "Droit d'accès : savoir quelles données nous détenons sur vous ;",
                "Droit de rectification : corriger une information inexacte ;",
                "Droit d'effacement : demander la suppression de vos données ;",
                "Droit d'opposition : refuser un traitement, notamment la prospection ;",
                "Droit de retirer votre consentement à tout moment.",
              ]}
            />
            <p>
              Pour exercer ces droits, écrivez-nous à{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-primary underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              . Nous répondons dans un délai raisonnable, et au plus tard sous trente
              (30) jours. Chaque email de newsletter comporte par ailleurs un lien de
              désinscription.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir
              l&apos;Autorité de Régulation des Télécommunications de Côte
              d&apos;Ivoire (ARTCI), autorité compétente en matière de protection des
              données personnelles.
            </p>
          </LegalSection>

          <LegalSection id="cookies" index={9} title="Cookies">
            <p>
              Nous utilisons uniquement des cookies strictement nécessaires au
              fonctionnement du site :
            </p>
            <LegalList
              items={[
                "Cookies d'authentification, qui vous maintiennent connecté à votre compte ;",
                "Une préférence enregistrée dans votre navigateur pour mémoriser le thème clair ou sombre.",
              ]}
            />
            <p>
              Ces éléments ne servent ni à la publicité, ni au suivi de votre
              navigation sur d&apos;autres sites. Vous pouvez les supprimer à tout
              moment depuis les réglages de votre navigateur ; la connexion à votre
              compte sera alors interrompue.
            </p>
          </LegalSection>

          <LegalSection id="mineurs" index={10} title="Mineurs">
            <p>
              Le service est destiné aux personnes majeures. Nous ne collectons pas
              sciemment de données concernant des mineurs. Si vous constatez
              qu&apos;un mineur nous a transmis des informations, contactez-nous :
              nous procéderons à leur suppression.
            </p>
          </LegalSection>

          <LegalSection id="modifications" index={11} title="Modifications de cette politique">
            <p>
              Cette politique peut évoluer avec le service. En cas de changement
              important, nous vous en informerons par email ou par une mention visible
              sur le site. La date de dernière mise à jour figure en haut de cette
              page.
            </p>
          </LegalSection>

          <LegalSection id="contact" index={12} title="Nous contacter">
            <p>
              Pour toute question relative à vos données personnelles, écrivez-nous à{" "}
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
          </LegalSection>
        </LegalBody>
      </Section>
    </>
  );
}
