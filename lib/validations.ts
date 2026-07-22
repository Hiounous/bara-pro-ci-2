import { z } from "zod";

/**
 * Schémas de validation partagés entre le client (react-hook-form) et le
 * serveur (server actions). Source unique de vérité pour les règles + messages.
 */

export const waitlistSchema = z.object({
  email: z.email({ message: "Adresse email invalide." }),
  role: z.enum(["client", "artisan"], {
    message: "Choisis un rôle.",
  }),
  // Champs optionnels, utiles surtout pour les artisans.
  city: z.string().trim().max(80).optional().or(z.literal("")),
  trade: z.string().trim().max(80).optional().or(z.literal("")),
  source: z.string().max(120).optional(),
});
export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const newsletterSchema = z.object({
  email: z.email({ message: "Adresse email invalide." }),
  source: z.string().max(120).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Ton nom est un peu court." })
    .max(80),
  email: z.email({ message: "Adresse email invalide." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Ton message doit faire au moins 10 caractères." })
    .max(2000, { message: "Message trop long (2000 caractères max)." }),
});
export type ContactInput = z.infer<typeof contactSchema>;

// --- Authentification ---------------------------------------------------------

export const signInSchema = z.object({
  email: z.email({ message: "Adresse email invalide." }),
  password: z.string().min(1, { message: "Mot de passe requis." }),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Ton nom est un peu court." })
    .max(80),
  email: z.email({ message: "Adresse email invalide." }),
  password: z
    .string()
    .min(8, { message: "8 caractères minimum." })
    .max(72, { message: "72 caractères maximum." }),
  role: z.enum(["client", "artisan"], { message: "Choisis un rôle." }),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  trade: z.string().trim().max(80).optional().or(z.literal("")),
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Adresse email invalide." }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "8 caractères minimum." })
    .max(72, { message: "72 caractères maximum." }),
});

/** Forme de réponse standard renvoyée par toutes les server actions. */
export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Erreurs de validation par champ. */
  errors?: Record<string, string[]>;
  /** Vrai quand l'action a réussi mais sans backend (mode démo local). */
  demo?: boolean;
};
