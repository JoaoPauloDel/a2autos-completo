import { mensagemGenerica, site } from "@/data/site";

/** Link do WhatsApp com a mensagem pronta. */
export function linkWhatsApp(mensagem: string = mensagemGenerica) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
