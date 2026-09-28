"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { horarioTexto, navLinks, site } from "@/data/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Chamada final e rodapé. A frase abre as letras conforme entra na tela. */
export function Final() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const espaco = useTransform(scrollYProgress, [0, 1], reduzir ? ["0em", "0em"] : ["-0.06em", "0.02em"]);
  const escala = useTransform(scrollYProgress, [0, 1], reduzir ? [1, 1] : [0.9, 1]);

  return (
    <footer ref={ref} className="bg-noite text-papel">
      <div className="container-site py-20 text-center sm:py-28">
        <motion.p
          style={{ letterSpacing: espaco, scale: escala }}
          className="titulo-display text-[clamp(4.5rem,17vw,15rem)]"
        >
          Bora <span className="text-vermelho">lavar?</span>
        </motion.p>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-13 items-center gap-2.5 rounded-md bg-vermelho px-8 py-4 font-display text-[1.15rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-papel hover:text-tinta"
        >
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </a>
      </div>

      <div className="border-t border-noite-linha">
        <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo-a2.png" alt="" width={44} height={44} className="size-11" />
              <span className="font-display text-[1.6rem] font-extrabold uppercase italic leading-none">
                A2 <span className="text-vermelho">Autos</span>
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-papel/55">{site.endereco}</p>
          </div>
          <nav aria-label="Rodapé">
            <p className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-papel/45">Navegue</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-papel/75 transition-colors hover:text-papel">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-papel/45">Horário</p>
            <p className="mt-4 text-papel/75">{horarioTexto}</p>
            <p className="text-papel/75">Domingo fechado</p>
          </div>
        </div>
        <div className="container-site">
          <p className="border-t border-noite-linha py-6 text-[0.85rem] text-papel/40">
            © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
