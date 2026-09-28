"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { perguntas } from "@/data/site";
import { Revelar } from "./Revelar";

function Item({ pergunta, resposta, aberto, alternar }: {
  pergunta: string; resposta: string; aberto: boolean; alternar: () => void;
}) {
  const id = useId();
  return (
    <div className="border-b border-linha">
      <h3>
        <button
          type="button"
          onClick={alternar}
          aria-expanded={aberto}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold uppercase italic leading-tight">{pergunta}</span>
          <motion.span
            animate={{ rotate: aberto ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${aberto ? "bg-vermelho text-white" : "bg-papel ring-1 ring-linha"}`}
          >
            <Plus className="size-5" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] pb-6 text-[1.05rem] leading-relaxed text-tinta-2">{resposta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Duvidas() {
  const [aberto, setAberto] = useState(0);
  return (
    <section id="duvidas" className="container-site py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Revelar className="lg:sticky lg:top-28 lg:self-start">
          <span className="rotulo">Dúvidas</span>
          <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
            Pergunta <br />
            <span className="contorno">que a gente</span> <br />
            responde
          </h2>
        </Revelar>
        <Revelar atraso={0.1} className="border-t border-linha">
          {perguntas.map((p, i) => (
            <Item
              key={p.pergunta}
              pergunta={p.pergunta}
              resposta={p.resposta}
              aberto={aberto === i}
              alternar={() => setAberto(aberto === i ? -1 : i)}
            />
          ))}
        </Revelar>
      </div>
    </section>
  );
}
