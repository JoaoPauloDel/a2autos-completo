"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/data/site";
import { EVENTO_DEMONSTRACAO } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Segura os cliques de WhatsApp enquanto o site é um protótipo.
 *
 * Em vez de alterar cada botão, escuta o clique na fase de captura e pega
 * qualquer link para o wa.me, inclusive os que forem adicionados depois. Mostra
 * a mensagem que seria enviada, que é justamente o que convence quem está
 * vendo: o cliente chega no WhatsApp com o pedido já escrito.
 */
export function AvisoDemonstracao() {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const botaoFechar = useRef<HTMLButtonElement>(null);

  const fechar = useCallback(() => setMensagem(null), []);

  useEffect(() => {
    const aoClicar = (evento: MouseEvent) => {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const link = alvo.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;

      evento.preventDefault();
      evento.stopPropagation();

      let texto = "";
      try {
        texto = new URL(link.href).searchParams.get("text") ?? "";
      } catch {
        texto = "";
      }
      setMensagem(texto);
    };

    // formulários e calculadora abrem o WhatsApp por código, sem <a>
    const aoPedir = (evento: Event) => {
      setMensagem(String((evento as CustomEvent<string>).detail ?? ""));
    };

    document.addEventListener("click", aoClicar, true);
    window.addEventListener(EVENTO_DEMONSTRACAO, aoPedir);
    return () => {
      document.removeEventListener("click", aoClicar, true);
      window.removeEventListener(EVENTO_DEMONSTRACAO, aoPedir);
    };
  }, []);

  useEffect(() => {
    if (mensagem === null) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") fechar();
    };
    document.addEventListener("keydown", aoTeclar);

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botaoFechar.current?.focus();

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = anterior;
    };
  }, [mensagem, fechar]);

  return (
    <AnimatePresence>
      {mensagem !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={fechar}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-demonstracao"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(evento) => evento.stopPropagation()}
            className="relative w-full max-w-[32rem] rounded-lg bg-noite p-7 text-papel sm:p-9"
          >
            <button
              ref={botaoFechar}
              type="button"
              onClick={fechar}
              aria-label="Fechar aviso"
              className="absolute right-4 top-4 p-1.5 text-papel/60 transition-colors hover:text-papel"
            >
              <X className="size-5" />
            </button>

            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
              <WhatsAppIcon className="size-6" />
            </div>

            <h2
              id="titulo-demonstracao"
              className="font-display text-[1.6rem] font-bold uppercase italic leading-tight"
            >
              Aqui o cliente fala com vocês
            </h2>

            <p className="mt-3 text-[0.95rem] leading-relaxed text-papel/70">
              Este é um protótipo, então os botões não saem do site. No site
              publicado, este botão abre o WhatsApp da {site.nome} com a
              mensagem já escrita, e o cliente só aperta enviar.
            </p>

            {mensagem !== "" && (
              <div className="mt-5 rounded-md bg-noite-2 p-4">
                <p className="mb-2 font-display text-[0.75rem] uppercase tracking-[0.12em] text-papel/50">
                  Mensagem que o cliente enviaria
                </p>
                <p className="whitespace-pre-line text-[0.92rem] leading-relaxed text-papel">
                  {mensagem}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={fechar}
              className="mt-7 w-full rounded-md bg-vermelho px-6 py-3.5 font-display text-[1rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-vermelho-escuro"
            >
              Entendi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
