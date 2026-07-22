"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseAuthConfigured } from "@/lib/env";
import {
  signInSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type ActionState,
} from "@/lib/validations";

/** Reconstruit l'origine (protocole + hôte) pour les redirections d'auth. */
async function getOrigin(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

/** Message d'erreur convivial (les erreurs Supabase sont en anglais). */
function friendlyAuthError(message?: string): string {
  const m = (message ?? "").toLowerCase();
  if (m.includes("invalid login")) return "Email ou mot de passe incorrect.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Un compte existe déjà avec cet email.";
  if (m.includes("email not confirmed"))
    return "Confirme d'abord ton email (vérifie ta boîte mail).";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Trop de tentatives. Réessaie dans quelques minutes.";
  if (m.includes("database error"))
    return "Erreur base de données : la migration des profils (0002) n'a probablement pas été exécutée dans Supabase.";
  if (m.includes("password"))
    return "Mot de passe trop faible (8 caractères minimum).";
  return "Une erreur est survenue. Réessaie dans un instant.";
}

const NOT_CONFIGURED: ActionState = {
  status: "error",
  message:
    "L'authentification n'est pas encore configurée. Ajoute tes clés Supabase dans .env.local.",
};

/** Connexion email + mot de passe. */
export async function signInWithEmail(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Vérifie les champs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  if (!isSupabaseAuthConfigured) return NOT_CONFIGURED;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { status: "error", message: friendlyAuthError(error.message) };
  }

  const next = (formData.get("next") as string) || "/tableau-de-bord";
  redirect(next);
}

/** Inscription email + mot de passe (avec rôle client/artisan). */
export async function signUpWithEmail(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = signUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    city: formData.get("city") ?? "",
    trade: formData.get("trade") ?? "",
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Vérifie les champs du formulaire.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  if (!isSupabaseAuthConfigured) return NOT_CONFIGURED;

  const { fullName, email, password, role, city, trade } = parsed.data;
  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/tableau-de-bord`,
      data: {
        full_name: fullName,
        role,
        city: city || null,
        trade: trade || null,
      },
    },
  });

  if (error) {
    console.error("[auth:signup] erreur Supabase:", error.status, error.message);
    return { status: "error", message: friendlyAuthError(error.message) };
  }

  // Session immédiate = confirmation d'email désactivée → on entre directement.
  if (data.session) redirect("/tableau-de-bord");

  return {
    status: "success",
    message:
      "Presque fini ! Vérifie ta boîte mail et clique sur le lien de confirmation.",
  };
}

/** Déconnexion. */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

/** Demande de réinitialisation du mot de passe (envoi d'email). */
export async function requestPasswordReset(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Adresse email invalide.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  if (!isSupabaseAuthConfigured) return NOT_CONFIGURED;

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=/reinitialiser`,
  });

  // On répond toujours succès (ne pas révéler si l'email existe).
  return {
    status: "success",
    message:
      "Si un compte existe, un email de réinitialisation vient d'être envoyé.",
  };
}

/** Définit un nouveau mot de passe (après clic sur le lien de récupération). */
export async function updatePassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Mot de passe invalide.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  if (!isSupabaseAuthConfigured) return NOT_CONFIGURED;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return { status: "error", message: friendlyAuthError(error.message) };
  }

  redirect("/tableau-de-bord");
}
