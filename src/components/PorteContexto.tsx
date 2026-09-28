"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Porte } from "@/data/site";

/**
 * O porte escolhido nos pacotes segue para o orçamento e para o pedido de
 * horário, para o visitante não ter que escolher três vezes.
 */
const Contexto = createContext<{ porte: Porte; setPorte: (p: Porte) => void } | null>(null);

export function PorteProvider({ children }: { children: ReactNode }) {
  const [porte, setPorte] = useState<Porte>("p");
  return <Contexto.Provider value={{ porte, setPorte }}>{children}</Contexto.Provider>;
}

export function usePorte() {
  const valor = useContext(Contexto);
  if (!valor) throw new Error("usePorte precisa estar dentro de PorteProvider");
  return valor;
}
