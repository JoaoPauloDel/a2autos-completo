"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { linkWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        rolou || aberto ? "bg-fundo/85 shadow-[0_1px_0_var(--color-linha)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#topo" className="flex items-center gap-2.5" onClick={() => setAberto(false)}>
          <Image src="/logo-a2.png" alt="" width={38} height={38} priority className="size-[2.375rem]" />
          <span className="font-display text-[1.35rem] font-extrabold uppercase italic leading-none">
            A2 <span className="text-vermelho">Autos</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Seções">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-[0.95rem] font-medium text-tinta-2 transition-colors hover:text-tinta">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-vermelho transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-tinta px-4 py-2.5 font-display text-[0.95rem] font-bold uppercase tracking-wide text-papel transition-colors hover:bg-vermelho sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Chamar no Whats
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            className="grid size-11 place-items-center rounded-md lg:hidden"
          >
            {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-celular"
            aria-label="Seções"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-linha bg-fundo lg:hidden"
          >
            <div className="container-site flex flex-col py-3">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAberto(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-linha py-4 font-display text-[1.6rem] font-bold uppercase italic"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="my-4 inline-flex items-center justify-center gap-2 rounded-md bg-vermelho px-5 py-4 font-display text-[1.05rem] font-bold uppercase text-white"
              >
                <WhatsAppIcon className="size-5" />
                Chamar no WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
