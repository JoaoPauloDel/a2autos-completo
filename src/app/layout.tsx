import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/data/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const titulo = `${site.nome} Lava-Jato em ${site.cidade}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: titulo, template: `%s | ${site.nome}` },
  description: site.descricao,
  keywords: ["lava jato", "lava jato Fortaleza", "lavagem automotiva", "higienização interna", "enceramento Vonixx", site.nome],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: titulo,
    description: site.descricao,
    images: [{ url: "/fotos/audi.webp", width: 860, height: 709, alt: `Carro lavado na ${site.nome}` }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: site.descricao, images: ["/fotos/audi.webp"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ecebe7" };

// Relatório de visitas: só liga na Vercel, onde o serviço existe.
const comAnalytics = process.env.VERCEL === "1";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      {/* extensões de navegador escrevem atributos no body antes da hidratação */}
      <body className="antialiased" suppressHydrationWarning>
        {children}
        {comAnalytics && <Analytics />}
      </body>
    </html>
  );
}
