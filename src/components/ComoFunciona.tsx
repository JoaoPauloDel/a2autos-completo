"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Revelar } from "./Revelar";

const passos = [
  { titulo: "Escolhe aqui", texto: "Porte, serviço e adicionais. O valor aparece na hora." },
  { titulo: "Manda no Whats", texto: "A mensagem vai pronta. A loja confirma o valor e o horário." },
  { titulo: "Traz o carro", texto: "Ou a gente busca e devolve, com o serviço de motorista." },
  { titulo: "Sai brilhando", texto: "Enquanto isso, você espera na sala climatizada." },
];

/** Quatro passos com uma linha que se preenche conforme a seção passa na tela. */
export function ComoFunciona() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progresso = useTransform(scrollYProgress, [0, 1], [reduzir ? 1 : 0, 1]);

  return (
    <section className="container-site py-20 sm:py-28">
      <Revelar>
        <span className="rotulo">Como funciona</span>
        <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
          Quatro passos, <span className="text-vermelho">zero fila</span>
        </h2>
      </Revelar>

      <div ref={ref} className="relative mt-16">
        {/* trilho: vertical no celular, horizontal no computador */}
        <div className="absolute left-[1.15rem] top-2 bottom-2 w-[2px] bg-linha lg:left-0 lg:right-0 lg:top-[1.15rem] lg:bottom-auto lg:h-[2px] lg:w-auto" />
        <motion.div
          style={{ scaleY: progresso }}
          className="absolute left-[1.15rem] top-2 bottom-2 w-[2px] origin-top bg-vermelho lg:hidden"
        />
        <motion.div
          style={{ scaleX: progresso }}
          className="absolute left-0 right-0 top-[1.15rem] hidden h-[2px] origin-left bg-vermelho lg:block"
        />

        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {passos.map((p, i) => (
            <li key={p.titulo} className="relative list-none pl-14 lg:pl-0 lg:pt-14">
              <span className="absolute left-0 top-0 grid size-[2.35rem] place-items-center rounded-full bg-tinta font-display text-[1.05rem] font-bold italic text-papel ring-4 ring-fundo">
                {i + 1}
              </span>
              <Revelar atraso={i * 0.1}>
                <h3 className="font-display text-[1.8rem] font-extrabold uppercase italic leading-none">{p.titulo}</h3>
                <p className="mt-3 max-w-[30ch] text-[1rem] leading-relaxed text-tinta-2">{p.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
