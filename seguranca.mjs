/*
 * Cabeçalhos de segurança, em um lugar só.
 *
 * Usado pelo next.config.ts (quando o site roda na Vercel) e pelo
 * scripts/build-cloudflare.mjs, que grava o arquivo _headers do build
 * estático. O build estático não aceita headers() do Next, por isso os dois
 * caminhos leem daqui em vez de repetir a lista.
 *
 * CSP sem nonce: nonce exige renderizar a página a cada acesso, e o site é
 * estático. Por isso script-src precisa de 'unsafe-inline' (os scripts de
 * hidratação do Next vêm inline). Com default-src 'self' e nenhum campo que
 * vire HTML, o risco que sobra é pequeno.
 */

export function politicaDeConteudo({ dev = false } = {}) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    // único conteúdo de fora: o mapa do Google
    "frame-src https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function cabecalhosDeSeguranca({ dev = false } = {}) {
  return [
    { key: "Content-Security-Policy", value: politicaDeConteudo({ dev }) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];
}
