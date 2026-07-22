import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Détecte la présence d'un logo officiel déposé dans `public/`.
 * Permet au header/footer de basculer automatiquement sur le vrai logo
 * (ex. le badge circulaire) dès que le fichier est ajouté, sans code à changer.
 *
 * Ordre de préférence des noms de fichiers acceptés.
 */
const CANDIDATES = ["logo-full.png", "logo-full.svg", "logo.png", "logo.svg"];

export function getBrandLogoSrc(): string | undefined {
  const publicDir = path.join(process.cwd(), "public");
  for (const name of CANDIDATES) {
    if (fs.existsSync(path.join(publicDir, name))) {
      return `/${name}`;
    }
  }
  return undefined;
}
