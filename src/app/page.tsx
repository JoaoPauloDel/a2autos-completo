/*
 * Tela de site indisponível (gerada por scripts/indisponivel.sh).
 * O site original está guardado em src/app/_original/page.tsx.
 * Para reativar: mover src/app/_original/page.tsx de volta para src/app/page.tsx
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site indisponível",
  description: "Site disponível apenas para desenvolvedores no momento.",
  robots: { index: false, follow: false },
  // o cartão do link (WhatsApp, redes) também não mostra nada do cliente
  keywords: null,
  openGraph: {
    title: "Site indisponível",
    description: "Site disponível apenas para desenvolvedores no momento.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Site indisponível",
    description: "Site disponível apenas para desenvolvedores no momento.",
    images: [],
  },
};

export default function Indisponivel() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f3efe8",
        color: "#2b2622",
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "460px", display: "grid", gap: "14px", justifyItems: "center" }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#8a7d70" strokeWidth="1.6" aria-hidden="true">
          <rect x="4" y="10" width="16" height="11" rx="2.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
        </svg>
        <h1 style={{ margin: 0, fontSize: "clamp(22px, 5vw, 30px)", lineHeight: 1.2, fontWeight: 650 }}>
          Site disponível apenas para desenvolvedores no momento
        </h1>
        <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.6, color: "#5e554d" }}>Obrigado pela visita.</p>
      </div>
    </main>
  );
}
