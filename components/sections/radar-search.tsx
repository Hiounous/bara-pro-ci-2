"use client";

import * as React from "react";
import { ArrowLeft, Check, MapPin } from "lucide-react";

/**
 * Maquette téléphone illustrant la recherche d'artisan à proximité façon radar :
 * ondes qui pulsent, points « trouvés » qui apparaissent, puis liste de pros
 * disponibles. L'animation boucle en continu pour rester vivante sur la page.
 *
 * Adapté d'une maquette fournie (icônes → lucide, couleurs → design system).
 */
export function RadarSearch() {
  const [dots, setDots] = React.useState(false);
  const [found, setFound] = React.useState(false);

  React.useEffect(() => {
    let tA: ReturnType<typeof setTimeout>;
    let tB: ReturnType<typeof setTimeout>;
    let tC: ReturnType<typeof setTimeout>;

    function cycle() {
      setDots(false);
      setFound(false);
      tA = setTimeout(() => setDots(true), 2000);
      tB = setTimeout(() => setFound(true), 3200);
      tC = setTimeout(cycle, 7000); // recommence la boucle
    }
    cycle();

    return () => {
      clearTimeout(tA);
      clearTimeout(tB);
      clearTimeout(tC);
    };
  }, []);

  return (
    <div className="flex justify-center">
      {/* Cadre téléphone */}
      <div
        className="relative overflow-hidden rounded-[28px] border shadow-soft"
        style={{ width: 288, height: 560, background: "#F4F1EA" }}
        aria-label="Aperçu de la recherche d'artisan à proximité"
        role="img"
      >
        {/* Grille de rues stylisée */}
        <svg
          width="288"
          height="560"
          className="absolute left-0 top-0 opacity-50"
          aria-hidden="true"
        >
          <line x1="20" y1="0" x2="90" y2="560" stroke="#DAD5C6" strokeWidth="2" />
          <line x1="0" y1="120" x2="288" y2="90" stroke="#DAD5C6" strokeWidth="2" />
          <line x1="0" y1="320" x2="288" y2="300" stroke="#DAD5C6" strokeWidth="2" />
          <line x1="220" y1="0" x2="160" y2="560" stroke="#DAD5C6" strokeWidth="2" />
        </svg>

        {/* Barre de recherche haut */}
        <div
          className="absolute inset-x-4 top-4 flex items-center gap-2 rounded-full border bg-white px-3.5 py-2.5"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <ArrowLeft className="size-4" style={{ color: "#14201A" }} />
          <div>
            <p className="text-[13px] font-medium leading-tight" style={{ color: "#14201A" }}>
              Électricien
            </p>
            <p className="text-[11px] leading-tight" style={{ color: "#8A8378" }}>
              Cocody, Abidjan
            </p>
          </div>
        </div>

        {/* Ondes radar */}
        {[0, 0.8, 1.6].map((delay) => (
          <span
            key={delay}
            className="absolute left-1/2 top-1/2 animate-radar-pulse rounded-full"
            style={{
              width: 220,
              height: 220,
              marginLeft: -110,
              marginTop: -110,
              border: "2px dashed #0B8A3D",
              animationDelay: `${delay}s`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Position centrale (le client) */}
        <div
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full"
          style={{
            width: 34,
            height: 34,
            marginLeft: -17,
            marginTop: -17,
            background: "#FF7A00",
            border: "3px solid #FFFFFF",
          }}
        >
          <MapPin className="size-4 text-white" />
        </div>

        {/* Points « artisans trouvés » */}
        <span
          className="absolute rounded-full transition-opacity duration-500"
          style={{
            left: "38%",
            top: "32%",
            width: 10,
            height: 10,
            background: "#0B8A3D",
            border: "2px solid #FFFFFF",
            opacity: dots ? 1 : 0,
          }}
          aria-hidden="true"
        />
        <span
          className="absolute rounded-full transition-opacity duration-500"
          style={{
            left: "68%",
            top: "62%",
            width: 10,
            height: 10,
            background: "#0B8A3D",
            border: "2px solid #FFFFFF",
            opacity: dots ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Feuille du bas : recherche → résultats */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-t-[20px] border-t bg-white px-4 pb-5 pt-4.5"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          {!found ? (
            <div>
              <p className="mb-1 text-sm font-medium" style={{ color: "#14201A" }}>
                Recherche de professionnels…
              </p>
              <p className="text-xs" style={{ color: "#8A8378" }}>
                On cherche les électriciens disponibles près de Cocody
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2.5 text-sm font-medium" style={{ color: "#14201A" }}>
                3 électriciens trouvés à proximité
              </p>
              <ResultRow
                initials="YK"
                name="Yao K."
                meta="4.9 étoiles · 1.2 km · disponible maintenant"
              />
              <ResultRow
                initials="MD"
                name="Marie D."
                meta="4.8 étoiles · 2.1 km · disponible dans 20 min"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Ligne d'un artisan trouvé dans la feuille de résultats. */
function ResultRow({
  initials,
  name,
  meta,
}: {
  initials: string;
  name: string;
  meta: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 border-t py-2"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
        style={{ background: "#FCEBD8", color: "#C98A1F" }}
      >
        {initials}
      </div>
      <div className="flex-1">
        <p
          className="flex items-center gap-1 text-[13px] font-medium"
          style={{ color: "#14201A" }}
        >
          {name}
          <Check className="size-3" style={{ color: "#0B8A3D" }} />
        </p>
        <p className="text-[11px]" style={{ color: "#8A8378" }}>
          {meta}
        </p>
      </div>
      <button
        type="button"
        className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white"
        style={{ background: "#FF7A00" }}
      >
        Réserver
      </button>
    </div>
  );
}
