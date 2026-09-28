import { mensagemGenerica, modoDemonstracao, site } from "@/data/site";

/** Link do WhatsApp com a mensagem pronta. */
export function linkWhatsApp(mensagem: string = mensagemGenerica) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const EVENTO_DEMONSTRACAO = "a2:whatsapp-demo";

/**
 * Abre o WhatsApp a partir de código (formulários, calculadora), onde não há
 * um <a> para o AvisoDemonstracao interceptar. Em demonstração, avisa o
 * componente por evento em vez de navegar.
 */
export function abrirWhatsApp(mensagem: string) {
  if (modoDemonstracao) {
    window.dispatchEvent(
      new CustomEvent(EVENTO_DEMONSTRACAO, { detail: mensagem }),
    );
    return;
  }
  window.open(linkWhatsApp(mensagem), "_blank", "noopener,noreferrer");
}

/**
 * Limpa texto digitado pelo visitante antes de ir para a mensagem: tira
 * caracteres de controle, junta espaços e corta no tamanho máximo. O texto só
 * vira parâmetro de URL codificado, nunca HTML, mas não custa entrar limpo.
 */
export function limparTexto(valor: string, maximo: number) {
  return valor
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maximo);
}
