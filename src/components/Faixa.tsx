"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { diferenciais } from "@/data/site";

const envolver = (min: number, max: number, v: number) => {
  const faixa = max - min;
  return ((((v - min) % faixa) + faixa) % faixa) + min;
};

/**
 * Letreiro que corre sozinho e acelera com a rolagem. Rolando para cima, ele
 * inverte o sentido. Duas fitas cruzadas, em sentidos opostos.
 */
function Fita({ sentido, className, textoClass, velocidade }: {
  sentido: 1 | -1;
  className: string;
  textoClass: string;
  velocidade: MotionValue<number>;
}) {
  const base = useMotionValue(0);
  const direcao = useRef<number>(sentido);
  const reduzir = useReducedMotion();
  // o conteúdo se repete 4 vezes, então dar a volta em -25% é invisível
  const x = useTransform(base, (v) => `${envolver(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduzir) return;
    const fator = velocidade.get();
    if (fator < 0) direcao.current = -sentido;
    else if (fator > 0) direcao.current = sentido;
    let passo = direcao.current * 1.6 * (delta / 1000);
    passo += passo * Math.abs(fator);
    base.set(base.get() + passo);
  });

  const itens = Array.from({ length: 4 }).flatMap(() => diferenciais);

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x }} className="flex shrink-0 items-center">
        {itens.map((d, i) => (
          <span key={i} className="flex items-center">
            <span className={`titulo-display px-6 text-[clamp(2rem,5vw,3.6rem)] ${textoClass}`}>{d}</span>
            <span className="block h-[0.9em] w-[3px] skew-x-[-18deg] bg-current opacity-60" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Faixa() {
  const { scrollY } = useScroll();
  const velocidade = useVelocity(scrollY);
  const suave = useSpring(velocidade, { damping: 50, stiffness: 400 });
  const fator = useTransform(suave, [0, 1000], [0, 4], { clamp: false });

  return (
    <section aria-label="Diferenciais da A2 Autos" className="relative overflow-hidden py-16 sm:py-20">
      <Fita
        sentido={1}
        velocidade={fator}
        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-noite py-3 text-papel"
        textoClass="contorno-claro"
      />
      <Fita
        sentido={-1}
        velocidade={fator}
        className="relative inset-x-[-5%] w-[110%] -ml-[5%] -rotate-[2deg] bg-vermelho py-3 text-white"
        textoClass=""
      />
    </section>
  );
}
