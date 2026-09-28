"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { plano } from "@/data/site";
import { formatarPreco } from "@/lib/preco";
import { linkWhatsApp } from "@/lib/whatsapp";
import { Revelar } from "./Revelar";

export function Plano() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xFrase = useTransform(scrollYProgress, [0, 1], reduzir ? ["0%", "0%"] : ["12%", "-38%"]);
  const yFoto = useTransform(scrollYProgress, [0, 1], reduzir ? ["0%", "0%"] : ["-8%", "8%"]);

  const mensagem = `Olá! Tenho interesse no *${plano.nome}* (${plano.legenda} ${formatarPreco(plano.preco)}). Pode me explicar como funciona?`;

  return (
    <section id="plano" ref={ref} className="relative overflow-hidden bg-noite py-20 text-papel sm:py-28">
      <div aria-hidden="true" className="pointer-events-none select-none">
        <motion.p style={{ x: xFrase }} className="titulo-display whitespace-nowrap text-[clamp(5rem,15vw,14rem)] text-noite-2">
          Lave quantas vezes quiser
        </motion.p>
      </div>

      <div className="container-site relative -mt-[clamp(3rem,8vw,7rem)] grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <Revelar className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <motion.div style={{ y: yFoto }} className="absolute inset-[-8%]">
              <Image src="/fotos/fusca.webp" alt="Fusca branco lavado no box da A2 Autos" fill sizes="(max-width: 1024px) 26rem, 40vw" className="object-cover" />
            </motion.div>
          </div>
        </Revelar>

        <div>
          <Revelar>
            <span className="rotulo">Plano por assinatura</span>
            <h2 className="titulo-display mt-4 text-[clamp(3rem,7vw,5.5rem)]">
              Carro limpo <br />
              <span className="text-vermelho">o mês inteiro</span>
            </h2>
          </Revelar>

          <Revelar atraso={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {plano.itens.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.05rem]">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-vermelho">
                    <Check className="size-3.5 text-white" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Revelar>

          <Revelar atraso={0.2}>
            <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6 border-t border-noite-linha pt-8">
              <div>
                <p className="text-[0.9rem] text-papel/55">{plano.legenda}</p>
                <p className="font-display text-[clamp(3.5rem,8vw,5.5rem)] font-extrabold italic leading-[0.9]">
                  {formatarPreco(plano.preco)}
                </p>
              </div>
              <a
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center rounded-md bg-papel px-7 py-4 font-display text-[1.1rem] font-bold uppercase tracking-wide text-tinta transition-colors hover:bg-vermelho hover:text-white"
              >
                Quero assinar
              </a>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
