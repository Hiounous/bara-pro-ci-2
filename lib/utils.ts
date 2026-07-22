import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` fusionne des classes conditionnelles (clsx) puis résout les conflits
 * d'utilitaires Tailwind (tailwind-merge). Utilisé par tous les composants UI.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
