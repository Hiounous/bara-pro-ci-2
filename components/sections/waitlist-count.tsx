import { getWaitlistCount } from "@/lib/stats";
import { demoArtisans } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/**
 * Preuve sociale : petite rangée d'avatars + nombre d'inscrits.
 * Honnête selon le volume réel : sous un seuil, on invite à « être parmi les
 * premiers » plutôt que d'afficher un petit chiffre.
 */
export async function WaitlistCount({ className }: { className?: string }) {
  const count = await getWaitlistCount();

  const label =
    count !== null && count >= 20
      ? `Déjà ${Math.floor(count / 10) * 10}+ inscrits`
      : "Rejoignez les premiers inscrits";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex -space-x-2">
        {demoArtisans.slice(0, 4).map((a) => (
          <span
            key={a.name}
            className="flex size-8 items-center justify-center rounded-full border-2 border-background text-sm shadow-sm"
            style={{ backgroundImage: a.gradient }}
            aria-hidden="true"
          >
            {a.emoji}
          </span>
        ))}
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
