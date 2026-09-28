import { site } from "@/data/site";

/**
 * Endereço no formato que o Google entende bem na busca.
 * É a única string usada para montar todos os links e o mapa.
 */
export const consultaEndereco = `${site.enderecoCurto}, ${site.cidade}, ${site.estado}, Brasil`;

/** Abre a ficha do local no Google Maps. */
export function urlMapa() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultaEndereco)}`;
}

/** Abre o Google Maps já traçando a rota até o lava-jato. */
export function urlComoChegar() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(consultaEndereco)}`;
}

/**
 * Endereço do mapa embutido.
 *
 * Com a chave configurada (GOOGLE_MAPS_EMBED_KEY no .env.local) usa a
 * Maps Embed API, que é a forma oficial e não tem cobrança por carregamento.
 *
 * Sem chave, cai no embed público do Google, que funciona sem cadastro mas
 * não é documentado. Serve para rodar o projeto na hora; para produção,
 * configure a chave.
 */
export function urlMapaEmbutido() {
  const chave = process.env.GOOGLE_MAPS_EMBED_KEY;
  const consulta = encodeURIComponent(consultaEndereco);

  if (chave) {
    return `https://www.google.com/maps/embed/v1/place?key=${chave}&q=${consulta}&zoom=16&language=pt-BR&region=BR`;
  }

  return `https://www.google.com/maps?q=${consulta}&z=16&hl=pt-BR&output=embed`;
}
