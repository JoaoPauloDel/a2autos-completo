"use client";

import { useEffect, useState } from "react";
import { situacaoAgora, type Situacao } from "@/lib/horario";

/**
 * "Aberto agora" calculado no fuso de Fortaleza. Só roda no navegador: o site
 * é gerado uma vez no build, então no servidor não existe "agora".
 */
export function StatusAberto({ className = "", escuro = false }: { className?: string; escuro?: boolean }) {
  const [situacao, setSituacao] = useState<Situacao | null>(null);

  useEffect(() => {
    const atualizar = () => setSituacao(situacaoAgora());
    atualizar();
    const id = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!situacao) return <span className={`inline-block h-5 ${className}`} aria-hidden="true" />;

  return (
    <span className={`inline-flex items-center gap-2 text-[0.9rem] font-medium ${className}`}>
      <span className="relative flex size-2.5">
        {situacao.aberto && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        )}
        <span className={`relative inline-flex size-2.5 rounded-full ${situacao.aberto ? "bg-emerald-500" : escuro ? "bg-papel/40" : "bg-tinta-2/50"}`} />
      </span>
      {situacao.texto}
    </span>
  );
}
