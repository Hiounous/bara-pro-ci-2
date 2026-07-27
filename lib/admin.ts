import "server-only";

/**
 * Contrôle d'accès administrateur.
 *
 * Les adresses admin viennent de la variable d'env `ADMIN_EMAILS`
 * (liste séparée par des virgules) ; à défaut, on retombe sur les adresses
 * du fondateur. La vérification se fait toujours côté serveur, sur
 * l'utilisateur authentifié (session Supabase) — jamais côté client.
 */
const DEFAULT_ADMINS = [
  "holy.corporation.us@gmail.com",
  "hiounous.ibn.kamara@gmail.com",
];

export function getAdminEmails(): string[] {
  const fromEnv = process.env.ADMIN_EMAILS;
  if (fromEnv && fromEnv.trim() !== "") {
    return fromEnv
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }
  return DEFAULT_ADMINS;
}

/** Vrai si l'email appartient à un administrateur. */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
