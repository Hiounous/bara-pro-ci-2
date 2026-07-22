import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  description: "Définis un nouveau mot de passe pour ton compte Bara Pro CI.",
};

/**
 * Page de définition d'un nouveau mot de passe. L'utilisateur y arrive via le
 * lien de récupération (une session de récupération est active à ce stade).
 */
export default function ReinitialiserPage() {
  return (
    <AuthShell
      title="Nouveau mot de passe"
      subtitle="Choisis un nouveau mot de passe sécurisé."
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
