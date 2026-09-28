"use client";

import { motion } from "framer-motion";
import { portes } from "@/data/site";
import { usePorte } from "./PorteContexto";

type Props = { escuro?: boolean; id: string };

/** Três botões P, M, G com o marcador deslizando entre eles. */
export function SeletorPorte({ escuro = false, id }: Props) {
  const { porte, setPorte } = usePorte();
  return (
    <div
      role="radiogroup"
      aria-label="Porte do veículo"
      className={`inline-grid grid-cols-3 gap-1 rounded-md p-1 ${escuro ? "bg-noite-2" : "bg-papel ring-1 ring-linha"}`}
    >
      {portes.map((p) => {
        const ativo = porte === p.chave;
        return (
          <button
            key={p.chave}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => setPorte(p.chave)}
            className={`relative min-h-11 rounded px-3 py-2 text-left transition-colors sm:px-4 ${
              ativo ? "text-white" : escuro ? "text-papel/70 hover:text-papel" : "text-tinta-2 hover:text-tinta"
            }`}
          >
            {ativo && (
              <motion.span
                layoutId={`marcador-${id}`}
                className="absolute inset-0 rounded bg-vermelho"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative block font-display text-[1.05rem] font-bold uppercase leading-none">
              {p.nome}
            </span>
            <span className={`relative mt-1 hidden text-[0.72rem] leading-tight sm:block ${ativo ? "text-white/80" : ""}`}>
              {p.exemplo}
            </span>
          </button>
        );
      })}
    </div>
  );
}
