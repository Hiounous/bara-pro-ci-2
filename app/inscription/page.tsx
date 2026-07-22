import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell, AuthDivider } from "@/components/auth/auth-shell";
import { GoogleButton } from "@/components/auth/google-button";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Inscription",
  description:
    "Crée ton compte Bara Pro CI, en tant que client ou artisan, en une minute.",
};

/** Page d'inscription (email/mot de passe + rôle + Google). */
export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (isSupabaseAuthConfigured) {
    const user = await getCurrentUser();
    if (user) redirect("/tableau-de-bord");
  }

  return (
    <AuthShell
      title="Rejoins Bara Pro CI"
      subtitle="Crée ton compte gratuitement, client ou artisan."
      error={error}
      footer={
        <>
          Déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="font-medium text-primary hover:underline"
          >
            Se connecter
          </Link>
        </>
      }
    >
      <GoogleButton />
      <AuthDivider />
      <SignUpForm />
    </AuthShell>
  );
}
