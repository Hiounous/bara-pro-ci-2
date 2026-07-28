import { siteConfig } from "@/config/site";

/**
 * Origine publique utilisée pour les images intégrées aux emails.
 *
 * Un email est lu en dehors du navigateur : une URL `localhost` y afficherait
 * une image cassée. On force donc le domaine de production, même lorsqu'un
 * test est déclenché depuis l'environnement local.
 */
export const EMAIL_ASSET_ORIGIN = siteConfig.url.startsWith("http://localhost")
  ? "https://www.baraproci.online"
  : siteConfig.url;

/** Logo circulaire optimisé pour l'email (240×240, ~8 Ko). */
export const EMAIL_LOGO_URL = `${EMAIL_ASSET_ORIGIN}/logo-email.png`;
