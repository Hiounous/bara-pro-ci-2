import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Nombre d'inscrits à la liste d'attente (preuve sociale).
 * Mis en cache 5 min pour ne pas interroger la base à chaque requête et
 * préserver le rendu statique des pages. Renvoie `null` si Supabase n'est pas
 * configuré ou si la table n'existe pas encore (dégradation propre).
 */
export const getWaitlistCount = unstable_cache(
  async (): Promise<number | null> => {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;

    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) return null;
    return count ?? 0;
  },
  ["waitlist-count"],
  { revalidate: 300, tags: ["waitlist-count"] },
);
