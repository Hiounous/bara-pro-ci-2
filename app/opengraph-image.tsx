import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Image Open Graph générée dynamiquement (1200×630) pour les partages sociaux.
 * Rendu au build/à la volée via next/og — aucun asset externe requis.
 */
export const alt = `${siteConfig.name} — ${siteConfig.slogan}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #FFFCF7 0%, #FFF3E0 55%, #FDEBD0 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* Tuile vidéo : bouton lecture + point rouge d'enregistrement */}
          <div
            style={{
              position: "relative",
              width: 104,
              height: 76,
              borderRadius: 22,
              background: "#F5811F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "17px 0 17px 28px",
                borderColor: "transparent transparent transparent #ffffff",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 14,
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#EE3E2E",
                border: "3px solid #ffffff",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 44, fontWeight: 800 }}>
            <span style={{ color: "#F5811F", fontStyle: "italic" }}>BARA</span>
            <span
              style={{
                display: "flex",
                background: "#0B8A3D",
                color: "#ffffff",
                borderRadius: 12,
                padding: "4px 16px",
                fontSize: 30,
              }}
            >
              CI
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: "#14201A",
              lineHeight: 1.05,
              letterSpacing: "-3px",
              maxWidth: 900,
            }}
          >
            Trouvez un pro, en un clic.
          </div>
          <div style={{ fontSize: 34, color: "#5E6A62", maxWidth: 850 }}>
            La première plateforme des artisans qualifiés de Côte d&apos;Ivoire.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 26,
            color: "#7A4E00",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              background: "rgba(255,122,0,0.12)",
              padding: "10px 24px",
              borderRadius: 999,
            }}
          >
            Électriciens · Plombiers · Peintres · Menuisiers · Mécaniciens
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
