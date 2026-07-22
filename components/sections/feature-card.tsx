import { cn } from "@/lib/utils";
import { accentClasses, type Feature } from "@/lib/features-data";

/** Carte présentant une fonctionnalité (icône, titre, description). */
export function FeatureCard({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) {
  const accent = accentClasses[feature.accent];
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--brand-ink)_25%,transparent)]",
        accent.ring,
        className,
      )}
    >
      <div
        className={cn(
          "flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          accent.bg,
        )}
      >
        <Icon className={cn("size-6", accent.text)} />
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
