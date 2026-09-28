"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { galeria } from "@/data/site";
import { urlComoChegar } from "@/lib/maps";
import { useMidia } from "@/lib/useMidia";

/**
 * No computador a seção trava na tela e a rolagem vertical empurra as fotos
 * para o lado. A altura da seção é calculada pela largura do trilho, então a
 * rolagem casa 1 para 1 com o deslocamento. No celular (e com "reduzir
 * movimento") vira um carrossel comum de arrastar.
 */
export function Galeria() {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);
  const desktop = useMidia("(min-width: 1024px)");
  const reduzir = useReducedMotion();
  const fixar = desktop && !reduzir;

  useEffect(() => {
    if (!fixar || !trilho.current) return;
    const el = trilho.current;
    const medir = () => setDistancia(Math.max(0, el.scrollWidth - window.innerWidth));
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [fixar]);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distancia]);
  const barra = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={secao}
      id="galeria"
      aria-label="Galeria de fotos da A2 Autos"
      className="relative bg-fundo"
      style={fixar ? { height: `calc(100vh + ${distancia}px)` } : undefined}
    >
      <div className={fixar ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-20"}>
        <motion.div
          ref={trilho}
          style={fixar ? { x } : undefined}
          className={
            fixar
              ? "flex w-max items-center gap-6 pl-[max(2rem,calc((100vw-1200px)/2+2rem))] pr-[10vw]"
              : "flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8"
          }
        >
          <div className="w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[26rem]">
            <span className="rotulo">A casa</span>
            <h2 className="titulo-display mt-4 text-[clamp(3.4rem,8vw,6.5rem)]">
              Por dentro <br />
              <span className="contorno">da A2</span>
            </h2>
            <p className="mt-5 max-w-[34ch] text-[1.05rem] leading-relaxed text-tinta-2">
              Elevador hidráulico, box coberto e uma sala de espera de verdade.
              {fixar ? " Continue rolando." : " Arraste para o lado."}
            </p>
          </div>

          {galeria.map((foto, i) => (
            <figure
              key={foto.src}
              className={`group relative shrink-0 snap-start overflow-hidden rounded-lg bg-papel ${
                fixar ? "h-[min(64vh,600px)]" : "aspect-[4/5] w-[78vw] sm:w-[22rem]"
              }`}
              style={fixar ? { aspectRatio: `${foto.largura} / ${foto.altura}` } : undefined}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 1024px) 78vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-papel">
                <span className="font-display text-[1.5rem] font-extrabold uppercase italic leading-none">{foto.legenda}</span>
                <span className="font-display text-[0.95rem] font-semibold tabular-nums text-papel/70">
                  0{i + 1}/0{galeria.length}
                </span>
              </figcaption>
            </figure>
          ))}

          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center sm:w-[22rem] lg:w-[24rem]">
            <p className="titulo-display text-[clamp(3rem,7vw,5.5rem)]">
              Vem <br />
              <span className="text-vermelho">conhecer</span>
            </p>
            <a
              href={urlComoChegar()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-tinta px-6 py-3.5 font-display text-[1.05rem] font-bold uppercase tracking-wide text-papel transition-colors hover:bg-vermelho"
            >
              Traçar rota
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {fixar && (
          <div className="container-site mt-10">
            <div className="h-[2px] w-full bg-linha">
              <motion.div style={{ scaleX: barra }} className="h-full origin-left bg-vermelho" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
