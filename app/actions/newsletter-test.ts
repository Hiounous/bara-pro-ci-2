"use server";

import { getCurrentUser } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { sendScheduledNewsletter } from "@/lib/newsletter/send";
import { selectCampaign } from "@/lib/newsletter/campaigns";
import type { ActionState } from "@/lib/validations";

/**
 * Envoi d'un email de test à l'administrateur connecté.
 *
 * Volontairement exposé en server action (POST) et non en simple lien : un
 * envoi d'email est un effet de bord, il ne doit pas pouvoir être déclenché
 * par un rechargement de page ou le préchargement d'un lien par le navigateur.
 */
export async function sendNewsletterTest(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user || !isAdminEmail(user.email)) {
    return { status: "error", message: "Accès refusé." };
  }

  const slug = (formData.get("slug") as string) || undefined;
  // Hors mercredi/dimanche, aucune campagne n'est prévue : on teste alors la
  // première de la rotation.
  const fallback = selectCampaign(new Date())
    ? undefined
    : "artisanat-voie-davenir";

  try {
    const result = await sendScheduledNewsletter(new Date(), {
      testEmail: user.email!,
      forceSlug: slug ?? fallback,
    });

    if (result.skipped) {
      return {
        status: "error",
        message: `Envoi impossible : ${result.reason ?? "raison inconnue"}`,
      };
    }

    return {
      status: "success",
      message: `Test envoyé à ${user.email} (campagne « ${result.campaign} »). Pensez à regarder l'onglet Promotions et les spams.`,
    };
  } catch (e) {
    console.error("[newsletter:test] échec:", e);
    return { status: "error", message: "L'envoi a échoué. Réessayez." };
  }
}
