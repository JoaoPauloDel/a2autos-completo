"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { avaliacoes, modoDemonstracao, site } from "@/data/site";
import { urlMapa } from "@/lib/maps";
import { Revelar } from "./Revelar";

function Estrelas({ nota, tamanho = "size-5" }: { nota: number; tamanho?: string }) {
  return (
    <span className="relative inline-flex" aria-label={`Nota ${nota.toLocaleString("pt-BR")} de 5`}>
      <span className="flex gap-0.5 text-tinta/15">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${tamanho} fill-current`} strokeWidth={0} />)}
      </span>
      {/* camada preenchida cortada na proporção exata da nota */}
      <span className="absolute inset-0 flex gap-0.5 overflow-hidden text-vermelho" style={{ width: `${(nota / 5) * 100}%` }}>
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`${tamanho} shrink-0 fill-current`} strokeWidth={0} />)}
      </span>
    </span>
  );
}

export function Avaliacoes() {
  const nota = site.notaGoogle;
  return (
    <section className="overflow-x-clip bg-papel py-20 sm:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Revelar>
          <span className="rotulo">Avaliações</span>
          <p className="titulo-display mt-5 text-[clamp(6rem,16vw,10rem)] leading-[0.8]">
            {nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Estrelas nota={nota} tamanho="size-6" />
            <span className="font-medium text-tinta-2">no Google</span>
          </div>
          <a
            href={urlMapa()}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-1.5 font-display text-[1.05rem] font-bold uppercase tracking-wide underline decoration-vermelho decoration-2 underline-offset-[6px] transition-colors hover:text-vermelho"
          >
            Ver avaliações no Google
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Revelar>

        <div className="grid gap-4">
          {avaliacoes.map((a, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg bg-fundo p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <Estrelas nota={5} tamanho="size-4" />
                {modoDemonstracao && a.exemplo && (
                  <span className="text-[0.75rem] font-medium uppercase tracking-wider text-tinta-2">Exemplo</span>
                )}
              </div>
              <blockquote className="mt-4 text-[1.1rem] leading-relaxed">{a.texto}</blockquote>
              <figcaption className="mt-4 font-display text-[1rem] font-bold uppercase italic text-tinta-2">{a.autor}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
