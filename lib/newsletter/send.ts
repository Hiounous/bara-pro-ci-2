import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getResend, RESEND_FROM } from "@/lib/resend";
import {
  holidayCampaigns,
  regularCampaigns,
  selectCampaign,
  type Campaign,
} from "@/lib/newsletter/campaigns";
import { renderNewsletter } from "@/lib/newsletter/template";
import { unsubscribeUrl } from "@/lib/newsletter/unsubscribe";
import { siteConfig } from "@/config/site";

export type SendResult = {
  skipped: boolean;
  reason?: string;
  campaign?: string;
  recipients?: number;
  sent?: number;
  failed?: number;
};

/**
 * Prépare et envoie la newsletter du jour.
 *
 * - Choisit la campagne (fête prioritaire, sinon rotation mercredi/dimanche) ;
 * - Récupère les abonnés dans Supabase ;
 * - Envoie un email personnalisé à chacun (lien de désinscription unique).
 *
 * Les envois sont effectués un par un, avec un léger espacement, pour rester
 * dans les limites de débit de Resend.
 */
export async function sendScheduledNewsletter(
  now: Date = new Date(),
  options: { testEmail?: string; forceSlug?: string } = {},
): Promise<SendResult> {
  const campaign = options.forceSlug
    ? findBySlug(options.forceSlug)
    : selectCampaign(now);

  if (!campaign) {
    return { skipped: true, reason: "Aucune campagne prévue aujourd'hui" };
  }

  const resend = getResend();
  if (!resend) {
    return { skipped: true, reason: "Resend non configuré", campaign: campaign.slug };
  }

  // --- Destinataires ---
  let recipients: string[];
  if (options.testEmail) {
    recipients = [options.testEmail];
  } else {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return { skipped: true, reason: "Supabase non configuré", campaign: campaign.slug };
    }
    const { data, error } = await supabase.from("newsletter").select("email");
    if (error) {
      throw new Error(`Lecture des abonnés impossible : ${error.message}`);
    }
    recipients = (data ?? []).map((r) => r.email as string).filter(Boolean);
  }

  if (recipients.length === 0) {
    return { skipped: true, reason: "Aucun abonné", campaign: campaign.slug };
  }

  // --- Envoi ---
  let sent = 0;
  let failed = 0;

  for (const email of recipients) {
    const link = unsubscribeUrl(email, siteConfig.url);
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: email,
        subject: campaign.subject,
        html: renderNewsletter(campaign, link),
        headers: {
          // Permet la désinscription en un clic depuis Gmail/Outlook.
          "List-Unsubscribe": `<${link}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      sent++;
    } catch (e) {
      failed++;
      console.error(`[newsletter] échec pour ${email}:`, e);
    }
    // Petite pause : Resend limite le débit d'envoi.
    await new Promise((r) => setTimeout(r, 120));
  }

  console.info(
    `[newsletter] campagne "${campaign.slug}" — ${sent} envoyé(s), ${failed} échec(s)`,
  );

  return {
    skipped: false,
    campaign: campaign.slug,
    recipients: recipients.length,
    sent,
    failed,
  };
}

/** Retrouve une campagne par son identifiant (envoi manuel ou test). */
function findBySlug(slug: string): Campaign | null {
  return (
    regularCampaigns.find((c) => c.slug === slug) ??
    holidayCampaigns.find((c) => c.slug === slug) ??
    null
  );
}
