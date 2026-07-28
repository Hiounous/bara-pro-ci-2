import "server-only";
import type { Campaign } from "@/lib/newsletter/campaigns";
import { EMAIL_LOGO_URL } from "@/lib/email-assets";
import { siteConfig } from "@/config/site";

/**
 * Gabarit HTML de la newsletter : identité Bara Pro CI, contenu de la
 * campagne, appel à l'action principal, partage WhatsApp et lien de
 * désinscription (obligatoire).
 */

const BRAND = {
  orange: "#FF7A00",
  orangeDeep: "#E85D00",
  green: "#0B8A3D",
  ink: "#14201A",
  ivory: "#FFFCF7",
  muted: "#5E6A62",
  border: "#ECE5D8",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderNewsletter(
  campaign: Campaign,
  unsubscribeLink: string,
): string {
  const site = siteConfig.url;
  const waitlistUrl = `${site}/liste-attente`;

  const shareText = encodeURIComponent(
    `Découvre Bara Pro CI 🇨🇮 — trouve un artisan de confiance en un clic : ${site}`,
  );
  const shareUrl = `https://wa.me/?text=${shareText}`;

  const body = campaign.paragraphs
    .map(
      (p) =>
        `<p style="font-size:15px;line-height:1.65;color:${BRAND.muted};margin:0 0 16px;">${escapeHtml(p)}</p>`,
    )
    .join("");

  const highlight = campaign.highlight
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
         <tr><td style="border-left:4px solid ${BRAND.orange};background:#FFF6EC;border-radius:0 10px 10px 0;padding:14px 18px;">
           <p style="margin:0;font-size:15px;line-height:1.55;color:${BRAND.ink};font-style:italic;">${escapeHtml(campaign.highlight)}</p>
         </td></tr>
       </table>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(campaign.subject)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.ivory};font-family:Inter,Arial,Helvetica,sans-serif;">
  <!-- Aperçu masqué -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(campaign.preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.ivory};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;">

        <!-- En-tête : logo officiel (texte de repli si les images sont bloquées) -->
        <tr><td align="center" style="padding:26px 28px 0;">
          <a href="${site}" style="text-decoration:none;">
            <img src="${EMAIL_LOGO_URL}" width="86" height="86" alt="Bara Pro CI"
                 style="display:block;margin:0 auto 6px;width:86px;height:86px;border:0;outline:none;text-decoration:none;">
          </a>
          <div style="font-size:12px;font-weight:600;color:${BRAND.muted};letter-spacing:0.4px;">
            ${escapeHtml(siteConfig.slogan)}
          </div>
          <div style="height:3px;width:52px;background:${BRAND.orange};border-radius:3px;margin:16px auto 0;"></div>
        </td></tr>

        <!-- Contenu -->
        <tr><td style="padding:22px 28px 4px;">
          <h1 style="margin:0 0 16px;font-size:23px;line-height:1.25;color:${BRAND.ink};">${escapeHtml(campaign.title)}</h1>
          ${body}
          ${highlight}
        </td></tr>

        <!-- Appel à l'action -->
        <tr><td align="center" style="padding:6px 28px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:100px;background:${BRAND.orange};">
              <a href="${waitlistUrl}" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:100px;">
                ${escapeHtml(campaign.ctaLabel)} →
              </a>
            </td></tr>
          </table>
          <p style="margin:14px 0 0;font-size:13px;color:${BRAND.muted};">
            Déjà inscrit ? Faites-nous connaître autour de vous :
            <a href="${shareUrl}" style="color:${BRAND.green};font-weight:600;text-decoration:none;">partager sur WhatsApp</a>
          </p>
        </td></tr>

        <!-- Pied de page -->
        <tr><td style="padding:24px 28px 26px;">
          <hr style="border:none;border-top:1px solid ${BRAND.border};margin:0 0 16px;">
          <p style="margin:0 0 8px;font-size:12px;color:${BRAND.muted};">
            ${siteConfig.name} — ${siteConfig.slogan}<br>
            ${siteConfig.city}
          </p>
          <p style="margin:0;font-size:11px;color:#9AA69E;">
            Vous recevez cet email car vous êtes inscrit sur notre liste d'attente.
            <a href="${unsubscribeLink}" style="color:#9AA69E;text-decoration:underline;">Se désinscrire</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
