import type { NextConfig } from "next";
import { cabecalhosDeSeguranca } from "./seguranca.mjs";

/*
 * EXPORTAR_ESTATICO=1 gera a pasta out/ para hosts estáticos (Cloudflare).
 * Nesse modo o Next não aplica headers(), e os cabeçalhos de segurança vão no
 * arquivo _headers, gravado pelo scripts/build-cloudflare.mjs.
 */
const estatico = process.env.EXPORTAR_ESTATICO === "1";
const dev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(estatico ? { output: "export" as const } : {}),
  images: estatico
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  ...(estatico
    ? {}
    : {
        async headers() {
          return [{ source: "/:path*", headers: cabecalhosDeSeguranca({ dev }) }];
        },
      }),
};

export default nextConfig;
