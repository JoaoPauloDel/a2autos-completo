"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import { plano, servicos, site } from "@/data/site";
import { formatarPreco } from "@/lib/preco";
import { linkWhatsApp } from "@/lib/whatsapp";
import { StatusAberto } from "./StatusAberto";
import { WhatsAppIcon } from "./WhatsAppIcon";

const entrada = (atraso: number) => ({
  initial: { y: "105%" },
  animate: { y: "0%" },
  transition: { duration: 1, delay: atraso, ease: [0.16, 1, 0.3, 1] as const },
});

/**
 * "LAVA" e "JATO" gigantes, com a foto entre as duas palavras. Ao rolar, as
 * palavras se afastam para os lados e a foto cresce. A foto fica num painel
 * de ~400px porque o acervo tem no máximo 860px de largura: esticada na tela
 * inteira ela amoleceria.
 */
export function Topo() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const xEsquerda = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "-24%"]);
  const xDireita = useTransform(scrollYProgress, [0, 1], ["0%", reduzir ? "0%" : "24%"]);
  const escalaFoto = useTransform(scrollYProgress, [0, 1], [1, reduzir ? 1 : 1.18]);
  const giroFoto = useTransform(scrollYProgress, [0, 1], [-3, reduzir ? -3 : 0]);

  const simples = servicos[0];
  const completa = servicos[1];

  return (
    <section id="topo" ref={ref} className="relative overflow-hidden pb-10 pt-24 sm:pt-28">
      <h1 className="sr-only">
        {site.nome}, lava-jato em {site.cidade}: seu carro limpo sem complicação
      </h1>

      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="flex items-center gap-2 text-[0.9rem] font-medium text-tinta-2">
            <MapPin className="size-4 shrink-0 text-vermelho" />
            {site.endereco}
          </p>
          <StatusAberto className="text-tinta-2" />
        </div>

        <div className="relative mt-6 lg:mt-4" aria-hidden="true">
          <div className="overflow-y-clip">
            <motion.div style={{ x: xEsquerda }}>
              <motion.span
                {...entrada(0.05)}
                className="titulo-display block text-[clamp(6rem,29vw,11rem)] text-vermelho lg:text-[clamp(11rem,19vw,19rem)]"
              >
                Lava
              </motion.span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto -mt-[2vw] w-[78%] sm:w-[62%] lg:absolute lg:left-[37%] lg:top-[9%] lg:mt-0 lg:w-[34%]"
          >
            <motion.div
              style={{ scale: escalaFoto, rotate: giroFoto }}
              className="relative aspect-[5/4] overflow-hidden rounded-lg bg-papel shadow-[0_30px_60px_-20px_rgba(20,20,20,0.45)]"
            >
              <Image
                src="/fotos/audi.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 34vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <div className="relative z-20 -mt-[12vw] overflow-y-clip lg:mt-0">
            <motion.div style={{ x: xDireita }}>
              <motion.span
                {...entrada(0.18)}
                className="titulo-display contorno block pr-[0.06em] text-right text-[clamp(6rem,29vw,11rem)] lg:text-[clamp(11rem,19vw,19rem)]"
              >
                Jato
              </motion.span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.1fr_1fr] lg:items-end"
        >
          <div>
            <p className="font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-bold uppercase italic leading-[1.02]">
              Seu carro limpo
              <br />
              sem <span className="text-vermelho">complicação</span>.
            </p>
            <p className="mt-4 max-w-[44ch] text-[1.05rem] leading-relaxed text-tinta-2">
              Lavagem, higienização e enceramento com elevador hidráulico e
              produtos Vonixx. Monte o orçamento aqui e feche o horário direto no
              WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="#orcamento"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-md bg-vermelho px-6 py-3.5 font-display text-[1.05rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-vermelho-escuro"
            >
              Montar orçamento
              <ArrowDownRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-md border border-tinta/20 px-6 py-3.5 font-display text-[1.05rem] font-bold uppercase tracking-wide transition-colors hover:border-tinta"
            >
              <WhatsAppIcon className="size-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 grid grid-cols-2 border-t border-linha lg:grid-cols-4"
        >
          {[
            { rotulo: simples.nome, valor: `a partir de ${formatarPreco(simples.precos.p)}` },
            { rotulo: completa.nome, valor: `a partir de ${formatarPreco(completa.precos.p)}` },
            { rotulo: "Plano mensal", valor: `${formatarPreco(plano.preco)} por mês` },
            { rotulo: "Funcionamento", valor: "Seg a sáb, 8h às 18h" },
          ].map((item, i) => (
            <div
              key={item.rotulo}
              className={`py-4 pr-4 ${i % 2 === 1 ? "pl-4 border-l border-linha lg:pl-6" : ""} ${i === 2 ? "border-t border-linha lg:border-l lg:border-t-0 lg:pl-6" : ""} ${i === 3 ? "border-t border-linha lg:border-t-0" : ""}`}
            >
              <dt className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-tinta-2">{item.rotulo}</dt>
              <dd className="mt-1 font-display text-[1.25rem] font-bold uppercase italic">{item.valor}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
