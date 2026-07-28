import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

/**
 * Jetons de désinscription.
 *
 * Le lien contenu dans chaque email porte l'adresse et une signature HMAC :
 * aucun stockage n'est nécessaire, et personne ne peut désinscrire un tiers
 * sans connaître le secret du serveur.
 */

function secret(): string {
  // La clé service_role n'est jamais exposée au client : elle sert ici de clé
  // de signature. (Changer cette clé invalide les anciens liens.)
  return env.supabaseServiceKey ?? "bara-pro-ci-fallback-secret";
}

/** Génère le jeton associé à une adresse email. */
export function unsubscribeToken(email: string): string {
  return createHmac("sha256", secret())
    .update(email.trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

/** Vérifie un jeton en temps constant. */
export function verifyUnsubscribeToken(
  email: string,
  token: string,
): boolean {
  const expected = unsubscribeToken(email);
  if (expected.length !== token.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}

/** Construit l'URL complète de désinscription. */
export function unsubscribeUrl(email: string, siteUrl: string): string {
  const params = new URLSearchParams({
    email,
    token: unsubscribeToken(email),
  });
  return `${siteUrl}/desinscription?${params.toString()}`;
}
