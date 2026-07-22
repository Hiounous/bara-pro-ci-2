import "server-only";

/**
 * Anti-spam léger et sans dépendance pour les formulaires publics.
 *
 * 1. Honeypot : un champ caché `website` que les humains ne remplissent jamais
 *    mais que les bots remplissent automatiquement.
 * 2. Temps de remplissage : un formulaire soumis en moins de ~1,5 s est
 *    quasi certainement rempli par un bot.
 *
 * Renvoie `true` si la soumission est suspecte → l'appelant répond alors un
 * faux succès (pour ne pas renseigner le bot) sans rien enregistrer.
 */
export function isSpam(formData: FormData): boolean {
  const honeypot = ((formData.get("website") as string | null) ?? "").trim();
  if (honeypot !== "") return true;

  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt > 0 && Date.now() - startedAt < 1500) return true;

  return false;
}
