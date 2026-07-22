import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell, AuthDivider } from "@/components/auth/auth-shell";
import { GoogleButton } from "@/components/auth/google-button";
import { SignInForm } from "@/components/auth/sign-in-form";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connecte-toi à ton compte Bara Pro CI.",
};

/** Page de connexion (email/mot de passe + Google). */
export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  // Déjà connecté → direction le tableau de bord.
  if (isSupabaseAuthConfigured) {
    const user = await getCurrentUser();
    if (user) redirect(next || "/tableau-de-bord");
  }

  return (
    <AuthShell
      title="Content de te revoir 👋"
      subtitle="Connecte-toi pour accéder à ton espace."
      error={error}
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="font-medium text-primary hover:underline"
          >
            Créer un compte
          </Link>
        </>
      }
    >
      <GoogleButton next={next} />
      <AuthDivider />
      <SignInForm next={next} />
    </AuthShell>
  );
}
