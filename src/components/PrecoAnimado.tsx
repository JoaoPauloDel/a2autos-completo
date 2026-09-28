"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatarPreco } from "@/lib/preco";

/** Preço que troca deslizando na vertical quando o valor muda. */
export function PrecoAnimado({ valor, className }: { valor: number; className?: string }) {
  const texto = formatarPreco(valor);
  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={texto}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block tabular-nums"
        >
          {texto}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
