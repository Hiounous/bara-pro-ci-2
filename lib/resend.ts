import "server-only";
import { Resend } from "resend";
import { env, isResendConfigured } from "@/lib/env";

/**
 * Instance Resend (emails transactionnels). Renvoie `null` si la clé n'est pas
 * configurée — les appelants basculent alors en mode "démo" (aucun email
 * envoyé, mais le formulaire répond succès pour ne pas casser l'UX locale).
 */
let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (!isResendConfigured) return null;
  if (cached) return cached;
  cached = new Resend(env.resendApiKey);
  return cached;
}

export const RESEND_FROM = env.resendFromEmail;
export const CONTACT_TO = env.contactToEmail;
