import { BadgeCheck, MapPin, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoArtisan } from "@/lib/demo-data";

/**
 * Vignette d'artisan façon fil vidéo (TikTok) : vignette en dégradé (placeholder
 * vidéo), badge vérifié, note, métier et localisation.
 */
export function TalentCard({
  artisan,
  className,
}: {
  artisan: DemoArtisan;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative aspect-[9/14] w-full overflow-hidden rounded-3xl border shadow-soft",
        className,
      )}
    >
      {/* Vignette vidéo (placeholder en dégradé) */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: artisan.gradient }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

      {/* Emoji métier en filigrane */}
      <span
        className="absolute right-4 top-4 text-4xl opacity-90 drop-shadow"
        aria-hidden="true"
      >
        {artisan.emoji}
      </span>

      {/* Bouton lecture */}
      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform duration-300 group-hover:scale-110">
        <Play className="size-6 fill-white text-white" />
      </span>

      {/* Note en haut à gauche */}
      <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        <Star className="size-3.5 fill-brand-gold text-brand-gold" />
        {artisan.rating.toFixed(1)}
      </span>

      {/* Infos en bas */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-lg font-bold leading-none">
            {artisan.name}
          </h3>
          {artisan.verified && (
            <BadgeCheck className="size-4 fill-brand-green text-white" />
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-white/90">{artisan.trade}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
          <MapPin className="size-3" /> {artisan.city}
        </p>
      </div>
    </article>
  );
}
