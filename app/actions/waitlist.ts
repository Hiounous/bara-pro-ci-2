"use server";

import { waitlistSchema, type ActionState } from "@/lib/validations";
import { isSpam } from "@/lib/anti-spam";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getResend, RESEND_FROM } from "@/lib/resend";
import { waitlistConfirmationEmail } from "@/lib/emails";

/**
 * Inscription à la liste d'attente.
 * 1. Valide les données (Zod).
 * 2. Enregistre dans Supabase (si configuré) — email unique, on ignore les
 *    doublons proprement.
 * 3. Envoie un email de confirmation via Resend (si configuré).
 * Sans clés, l'action réussit en "mode démo" pour ne pas casser l'UX locale.
 */
export async function joinWaitlist(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
    city: formData.get("city") ?? "",
    trade: formData.get("trade") ?? "",
    source: formData.get("source") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Vérifie les champs du formulaire.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Anti-spam : faux succès silencieux (on ne renseigne pas le bot).
  if (isSpam(formData)) {
    return { status: "success", message: successMessage(parsed.data.role, true) };
  }

  const { email, role, city, trade, source } = parsed.data;
  const supabase = getSupabaseAdmin();

  // --- Mode démo (pas de backend configuré) ---
  if (!supabase) {
    console.info("[waitlist:demo] inscription simulée:", { email, role });
    return {
      status: "success",
      demo: true,
      message: successMessage(role, true),
    };
  }

  // --- Enregistrement ---
  const { error } = await supabase.from("waitlist").insert({
    email,
    role,
    city: city || null,
    trade: trade || null,
    source: source || null,
  });

  // 23505 = violation de contrainte unique → déjà inscrit, on traite en succès.
  if (error && error.code !== "23505") {
    console.error("[waitlist] erreur Supabase:", error);
    return {
      status: "error",
      message: "Une erreur est survenue. Réessaie dans un instant.",
    };
  }

  const alreadyIn = error?.code === "23505";

  // --- Email de confirmation (seulement pour une nouvelle inscription) ---
  const resend = getResend();
  if (resend && !alreadyIn) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: email,
        subject: "Bienvenue sur la liste d'attente Bara Pro CI 🎉",
        html: waitlistConfirmationEmail(role),
      });
    } catch (e) {
      // L'email est secondaire : on n'échoue pas l'inscription pour autant.
      console.error("[waitlist] échec envoi email:", e);
    }
  }

  return {
    status: "success",
    message: alreadyIn
      ? "Tu es déjà sur la liste — on te tient au courant très vite !"
      : successMessage(role, false),
  };
}

function successMessage(role: "client" | "artisan", demo: boolean) {
  const base =
    role === "artisan"
      ? "Bienvenue ! Tu fais partie des premiers artisans. On te contacte à l'ouverture."
      : "C'est noté ! Tu seras parmi les premiers prévenus au lancement.";
  return demo ? `${base}` : `${base} Vérifie ta boîte mail 📬`;
}
