"use server";

import { contactSchema, type ActionState } from "@/lib/validations";
import { isSpam } from "@/lib/anti-spam";
import { getResend, RESEND_FROM, CONTACT_TO } from "@/lib/resend";
import { contactNotificationEmail } from "@/lib/emails";

/**
 * Formulaire de contact : envoie le message à l'équipe via Resend.
 * Sans clé Resend, on répond succès en mode démo (le message est loggé).
 */
export async function sendContactMessage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Vérifie les champs du formulaire.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isSpam(formData)) {
    return {
      status: "success",
      message: "Merci ! Ton message a bien été pris en compte.",
    };
  }

  const input = parsed.data;
  const resend = getResend();

  if (!resend) {
    console.info("[contact:demo] message reçu:", input);
    return {
      status: "success",
      demo: true,
      message: "Merci ! Ton message a bien été pris en compte.",
    };
  }

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_TO,
      replyTo: input.email,
      subject: `Contact — ${input.name}`,
      html: contactNotificationEmail(input),
    });
  } catch (e) {
    console.error("[contact] échec envoi email:", e);
    return {
      status: "error",
      message: "Impossible d'envoyer ton message. Réessaie dans un instant.",
    };
  }

  return {
    status: "success",
    message: "Merci ! Ton message est parti, on te répond très vite. 🙌",
  };
}
