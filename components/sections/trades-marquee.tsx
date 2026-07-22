import { trades } from "@/config/site";

/**
 * Bandeau défilant des métiers couverts (effet marquee CSS, sans JS).
 * Le contenu est dupliqué pour un défilement en boucle sans coupure.
 */
export function TradesMarquee() {
  const items = [...trades, ...trades];

  return (
    <div className="border-y bg-secondary/30 py-6">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {items.map((trade, i) => (
            <span
              key={`${trade}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border bg-card px-5 py-2 text-sm font-medium shadow-sm"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {trade}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
