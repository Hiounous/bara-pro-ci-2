"use server";

import { newsletterSchema, type ActionState } from "@/lib/validations";
import { isSpam } from "@/lib/anti-spam";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Inscription à la newsletter. Écrit dans Supabase (si configuré), gère les
 * doublons proprement, et dégrade en mode démo sans backend.
 */
export async function subscribeNewsletter(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Adresse email invalide.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isSpam(formData)) {
    return {
      status: "success",
      message: "Merci ! Tu es inscrit·e à la newsletter.",
    };
  }

  const { email, source } = parsed.data;
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.info("[newsletter:demo] inscription simulée:", email);
    return {
      status: "success",
      demo: true,
      message: "Merci ! Tu es inscrit·e à la newsletter.",
    };
  }

  const { error } = await supabase
    .from("newsletter")
    .insert({ email, source: source || null });

  if (error && error.code !== "23505") {
    console.error("[newsletter] erreur Supabase:", error);
    return {
      status: "error",
      message: "Une erreur est survenue. Réessaie dans un instant.",
    };
  }

  return {
    status: "success",
    message:
      error?.code === "23505"
        ? "Tu es déjà inscrit·e — merci de ton intérêt !"
        : "Merci ! Tu es inscrit·e à la newsletter. 📬",
  };
}
