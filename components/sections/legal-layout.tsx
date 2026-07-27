import { cn } from "@/lib/utils";

/**
 * Mise en page commune aux pages légales (confidentialité, conditions).
 * Sections numérotées, ancres pour les liens directs et typographie lisible.
 */
export function LegalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl", className)}>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

/** Bandeau « dernière mise à jour » en tête de document. */
export function LegalMeta({ updatedAt }: { updatedAt: string }) {
  return (
    <p className="rounded-xl border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
      <span className="font-medium text-foreground">
        Dernière mise à jour :
      </span>{" "}
      {updatedAt}
    </p>
  );
}

/** Section numérotée avec ancre (#slug). */
export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-baseline gap-2.5 font-display text-xl font-bold sm:text-2xl">
        <span className="text-primary">{index}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/** Liste à puces au style cohérent avec le reste du site. */
export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Encadré d'information (contact, précision importante). */
export function LegalCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
      {children}
    </div>
  );
}
