import "server-only";

/**
 * Petits gabarits d'email en HTML inline (compatibles clients mail).
 * Volontairement simples et sans dépendance : suffisant pour une confirmation
 * de liste d'attente et une notification de contact.
 */

const BRAND = {
  orange: "#ff7a00",
  ink: "#14201a",
  ivory: "#fffcf7",
  muted: "#5e6a62",
};

function shell(title: string, body: string) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:${BRAND.ivory};font-family:Inter,Arial,sans-serif;color:${BRAND.ink};">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px;">
    <div style="font-size:20px;font-weight:800;letter-spacing:-.5px;">
      Bara<span style="color:${BRAND.orange}">Pro</span> <span style="color:${BRAND.muted};font-weight:600">CI</span>
    </div>
    <div style="height:4px;width:56px;background:${BRAND.orange};border-radius:4px;margin:16px 0 24px;"></div>
    <h1 style="font-size:22px;margin:0 0 16px;">${title}</h1>
    ${body}
    <hr style="border:none;border-top:1px solid #ece5d8;margin:28px 0;">
    <p style="font-size:12px;color:${BRAND.muted};margin:0;">
      Bara Pro CI — Trouvez un pro, en un clic. · Abidjan, Côte d'Ivoire
    </p>
  </div>
</body></html>`;
}

export function waitlistConfirmationEmail(role: "client" | "artisan") {
  const roleLine =
    role === "artisan"
      ? "Tu fais partie des premiers artisans à rejoindre l'aventure. Prépare-toi à mettre ton savoir-faire en lumière."
      : "Tu seras parmi les premiers à trouver un pro de confiance, en un clic.";

  return shell(
    "Bienvenue sur la liste d'attente 🎉",
    `<p style="font-size:15px;line-height:1.6;color:${BRAND.ink};">
        Merci de rejoindre <strong>Bara Pro CI</strong> !
      </p>
      <p style="font-size:15px;line-height:1.6;color:${BRAND.muted};">
        ${roleLine}
      </p>
      <p style="font-size:15px;line-height:1.6;color:${BRAND.muted};">
        On te préviendra dès l'ouverture. En attendant, suis-nous et parle de
        nous autour de toi 🙌
      </p>`,
  );
}

export function contactNotificationEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  return shell(
    "Nouveau message de contact",
    `<p style="font-size:15px;line-height:1.6;">
        <strong>${escapeHtml(input.name)}</strong>
        &lt;${escapeHtml(input.email)}&gt;
      </p>
      <div style="background:#fff;border:1px solid #ece5d8;border-radius:12px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;">
        ${escapeHtml(input.message)}
      </div>`,
  );
}

/** Échappe le HTML pour éviter toute injection dans les emails. */
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
