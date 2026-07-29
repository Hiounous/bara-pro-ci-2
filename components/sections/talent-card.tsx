import Image from "next/image";
import { BadgeCheck, MapPin, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemoArtisan } from "@/lib/demo-data";

/**
 * Vignette d'artisan façon fil vidéo (TikTok) : photo du métier en fond,
 * badge vérifié, note, métier et localisation.
 *
 * Les photos sont des illustrations libres de droits (gestes de métier, sans
 * personne identifiable) : elles ne représentent pas les artisans nommés.
 */
export function TalentCard({
  artisan,
  className,
  priority = false,
}: {
  artisan: DemoArtisan;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative aspect-[9/14] w-full overflow-hidden rounded-3xl border shadow-soft",
        className,
      )}
    >
      {/* Photo du métier (repli sur le dégradé pendant le chargement) */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: artisan.gradient }}
        aria-hidden="true"
      />
      <Image
        src={artisan.photo}
        alt={`${artisan.trade} au travail`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Voile pour garantir la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35" />

      {/* Emoji métier en filigrane */}
      <span
        className="absolute right-4 top-4 text-3xl opacity-90 drop-shadow-lg"
        aria-hidden="true"
      >
        {artisan.emoji}
      </span>

      {/* Bouton lecture */}
      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 backdrop-blur transition-transform duration-300 group-hover:scale-110">
        <Play className="size-6 fill-white text-white" />
      </span>

      {/* Note en haut à gauche */}
      <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        <Star className="size-3.5 fill-brand-gold text-brand-gold" />
        {artisan.rating.toFixed(1)}
      </span>

      {/* Infos en bas */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-lg font-bold leading-none drop-shadow">
            {artisan.name}
          </h3>
          {artisan.verified && (
            <BadgeCheck className="size-4 fill-brand-green text-white" />
          )}
        </div>
        <p className="mt-1 text-sm font-medium text-white/95 drop-shadow">
          {artisan.trade}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80 drop-shadow">
          <MapPin className="size-3" /> {artisan.city}
        </p>
      </div>
    </article>
  );
}
