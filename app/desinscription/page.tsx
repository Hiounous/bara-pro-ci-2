import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Section } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyUnsubscribeToken } from "@/lib/newsletter/unsubscribe";

export const metadata: Metadata = {
  title: "Désinscription",
  description: "Se désinscrire de la newsletter Bara Pro CI.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Désinscription de la newsletter, via le lien signé présent dans chaque email.
 * Le traitement se fait au chargement : l'utilisateur n'a rien à valider,
 * conformément au principe de désinscription en un clic.
 */
export default async function DesinscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  let status: "success" | "invalid" | "error" = "invalid";

  if (email && token && verifyUnsubscribeToken(email, token)) {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      status = "error";
    } else {
      const { error } = await supabase
        .from("newsletter")
        .delete()
        .eq("email", email);
      status = error ? "error" : "success";
      if (error) {
        console.error("[desinscription] échec:", error);
      }
    }
  }

  const content = {
    success: {
      icon: <CheckCircle2 className="size-7 text-brand-green" />,
      bg: "bg-brand-green/10",
      title: "Vous êtes désinscrit",
      text: "Vous ne recevrez plus nos emails. Si vous changez d'avis, vous pourrez vous réinscrire à tout moment depuis le site.",
    },
    invalid: {
      icon: <XCircle className="size-7 text-destructive" />,
      bg: "bg-destructive/10",
      title: "Lien invalide ou expiré",
      text: "Ce lien de désinscription n'est pas valide. Écrivez-nous et nous retirerons votre adresse manuellement.",
    },
    error: {
      icon: <XCircle className="size-7 text-destructive" />,
      bg: "bg-destructive/10",
      title: "Une erreur est survenue",
      text: "Nous n'avons pas pu traiter votre demande. Réessayez plus tard ou contactez-nous directement.",
    },
  }[status];

  return (
    <>
      <PageHeader eyebrow="Newsletter" title="Désinscription" />
      <Section className="!pt-16">
        <Card className="mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
          <span
            className={`flex size-14 items-center justify-center rounded-full ${content.bg}`}
          >
            {content.icon}
          </span>
          <h2 className="font-display text-xl font-semibold">{content.title}</h2>
          <p className="text-sm text-muted-foreground">{content.text}</p>
          <div className="mt-2 flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
