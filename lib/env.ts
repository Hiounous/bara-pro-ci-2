/**
 * Accès centralisé aux variables d'environnement + drapeaux de disponibilité.
 *
 * Principe clé : le site doit tourner en local MÊME sans clés. On n'utilise
 * donc jamais de validation qui jette au démarrage — on expose plutôt des
 * booléens (`isSupabaseConfigured`, `isResendConfigured`) que les intégrations
 * consultent pour basculer en mode "démo" proprement.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail:
    process.env.RESEND_FROM_EMAIL ?? "Bara Pro CI <onboarding@resend.dev>",
  contactToEmail:
    process.env.CONTACT_TO_EMAIL ?? "holy.corporation.us@gmail.com",
} as const;

/** Vrai si les clés Supabase (URL + service role) sont présentes côté serveur. */
export const isSupabaseConfigured = Boolean(
  env.supabaseUrl && env.supabaseServiceKey,
);

/**
 * Vrai si l'auth Supabase est configurée (URL + clé anon publique).
 * L'auth utilise la clé anon (côté client + serveur via cookies), pas la clé
 * service_role. Les pages d'auth s'appuient dessus pour dégrader proprement.
 */
export const isSupabaseAuthConfigured = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);

/** Vrai si la clé Resend est présente. */
export const isResendConfigured = Boolean(env.resendApiKey);
