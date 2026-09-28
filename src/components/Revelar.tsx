"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; atraso?: number; className?: string; distancia?: number };

/** Sobe e aparece quando entra na tela. */
export function Revelar({ children, atraso = 0, className, distancia = 32 }: Props) {
  const reduzir = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduzir ? { opacity: 0 } : { opacity: 0, y: distancia }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
