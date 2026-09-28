"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { adicionais, modoDemonstracao, portes, servicos } from "@/data/site";
import { formatarPreco } from "@/lib/preco";
import { linkWhatsApp } from "@/lib/whatsapp";
import { PrecoAnimado } from "./PrecoAnimado";
import { usePorte } from "./PorteContexto";
import { Revelar } from "./Revelar";
import { SeletorPorte } from "./SeletorPorte";
import { WhatsAppIcon } from "./WhatsAppIcon";

function Passo({ numero, titulo, children }: { numero: number; titulo: string; children: React.ReactNode }) {
  return (
    <Revelar className="border-t border-linha pt-7">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-[1rem] font-bold italic text-vermelho">0{numero}</span>
        <h3 className="font-display text-[1.6rem] font-extrabold uppercase italic leading-none">{titulo}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </Revelar>
  );
}

/**
 * Orçamento na hora: porte, serviço e adicionais, somados no navegador. Nada
 * é enviado para servidor nenhum; o resultado vira a mensagem do WhatsApp.
 */
export function Orcamento() {
  const { porte } = usePorte();
  const [servicoId, setServicoId] = useState(servicos[1].id);
  const [extras, setExtras] = useState<string[]>([]);

  const servico = servicos.find((s) => s.id === servicoId) ?? servicos[0];
  const escolhidos = adicionais.filter((a) => extras.includes(a.id));
  const nomePorte = portes.find((p) => p.chave === porte)?.nome ?? "";

  const total = useMemo(
    () => servico.precos[porte] + escolhidos.reduce((soma, a) => soma + a.precos[porte], 0),
    [servico, escolhidos, porte],
  );

  const mensagem = [
    "Olá! Montei um orçamento pelo site:",
    "",
    `Porte: ${nomePorte}`,
    `Serviço: ${servico.nome} (${formatarPreco(servico.precos[porte])})`,
    ...(escolhidos.length
      ? ["Adicionais:", ...escolhidos.map((a) => `+ ${a.nome} (${formatarPreco(a.precos[porte])})`)]
      : []),
    "",
    `Total: ${formatarPreco(total)}`,
    "",
    "Pode confirmar o valor e me passar os horários?",
  ].join("\n");

  const alternar = (id: string) =>
    setExtras((atual) => (atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]));

  return (
    <section id="orcamento" className="bg-papel py-20 sm:py-28">
      <div className="container-site">
        <Revelar>
          <span className="rotulo">Orçamento na hora</span>
          <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
            Monte o seu, <span className="contorno">veja o valor</span>
          </h2>
          <p className="mt-4 max-w-[48ch] text-[1.05rem] text-tinta-2">
            Três escolhas e o total aparece na hora. Depois é só mandar: a
            mensagem chega pronta no WhatsApp da loja.
          </p>
        </Revelar>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="space-y-10">
            <Passo numero={1} titulo="Porte do carro">
              <SeletorPorte id="orcamento" />
            </Passo>

            <Passo numero={2} titulo="Serviço">
              <fieldset>
                <legend className="sr-only">Escolha o serviço</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {servicos.map((s) => {
                    const ativo = s.id === servicoId;
                    return (
                      <label
                        key={s.id}
                        className={`relative flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-md px-4 py-3.5 ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vermelho ${
                          ativo ? "bg-tinta text-papel ring-tinta" : "bg-fundo ring-linha hover:ring-tinta/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="servico"
                          value={s.id}
                          checked={ativo}
                          onChange={() => setServicoId(s.id)}
                          className="sr-only"
                        />
                        <span className="font-display text-[1.15rem] font-bold uppercase italic leading-tight">{s.nome}</span>
                        <span className={`shrink-0 text-[0.95rem] font-semibold tabular-nums ${ativo ? "text-papel" : "text-tinta-2"}`}>
                          {formatarPreco(s.precos[porte])}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </Passo>

            <Passo numero={3} titulo="Adicionais">
              <fieldset>
                <legend className="sr-only">Escolha os adicionais</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {adicionais.map((a) => {
                    const ativo = extras.includes(a.id);
                    return (
                      <label
                        key={a.id}
                        className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-md px-4 py-3.5 ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-vermelho ${
                          ativo ? "bg-vermelho/10 ring-vermelho" : "bg-fundo ring-linha hover:ring-tinta/40"
                        }`}
                      >
                        <input type="checkbox" checked={ativo} onChange={() => alternar(a.id)} className="sr-only" />
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded transition-colors ${
                            ativo ? "bg-vermelho text-white" : "bg-papel ring-1 ring-linha"
                          }`}
                        >
                          {ativo ? <Check className="size-4" strokeWidth={3} /> : <Plus className="size-3.5 text-tinta-2" />}
                        </span>
                        <span className="flex-1 font-medium leading-tight">{a.nome}</span>
                        <span className="shrink-0 text-[0.95rem] font-semibold tabular-nums text-tinta-2">
                          {formatarPreco(a.precos[porte])}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </Passo>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Revelar atraso={0.1}>
              <div className="rounded-lg bg-noite p-7 text-papel sm:p-8">
                <p className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-papel/50">
                  Seu orçamento
                </p>
                <dl className="mt-5 space-y-3 text-[0.95rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-papel/60">Porte</dt>
                    <dd className="font-medium">{nomePorte}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>{servico.nome}</dt>
                    <dd className="tabular-nums">{formatarPreco(servico.precos[porte])}</dd>
                  </div>
                  <AnimatePresence initial={false}>
                    {escolhidos.map((a) => (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between gap-4 overflow-hidden"
                      >
                        <dt className="text-papel/80">+ {a.nome}</dt>
                        <dd className="tabular-nums">{formatarPreco(a.precos[porte])}</dd>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </dl>

                <div className="mt-6 flex items-end justify-between gap-4 border-t border-noite-linha pt-5">
                  <span className="font-display text-[1.1rem] font-bold uppercase italic">Total</span>
                  <PrecoAnimado valor={total} className="font-display text-[clamp(2.4rem,5vw,3.2rem)] font-extrabold italic leading-none" />
                </div>
                <p className="mt-3 text-[0.8rem] leading-snug text-papel/45">
                  Valor de referência. A loja confirma pelo WhatsApp.
                  {modoDemonstracao && " Preços de exemplo neste protótipo."}
                </p>

                <a
                  href={linkWhatsApp(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex min-h-13 items-center justify-center gap-2.5 rounded-md bg-vermelho px-6 py-4 font-display text-[1.1rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-vermelho-escuro"
                >
                  <WhatsAppIcon className="size-5" />
                  Enviar orçamento
                </a>
              </div>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}
