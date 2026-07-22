import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  description: "Réinitialise le mot de passe de ton compte Bara Pro CI.",
};

/** Page de demande de réinitialisation de mot de passe. */
export default function MotDePasseOubliePage() {
  return (
    <AuthShell
      title="Mot de passe oublié ?"
      subtitle="Entre ton email, on t'envoie un lien pour le réinitialiser."
      footer={
        <>
          Tu t&apos;en souviens ?{" "}
          <Link
            href="/connexion"
            className="font-medium text-primary hover:underline"
          >
            Retour à la connexion
          </Link>
        </>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
