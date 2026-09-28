"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { horario, portes, servicos, type Porte } from "@/data/site";
import { agoraNaLoja, hojeNaLoja } from "@/lib/horario";
import { abrirWhatsApp, limparTexto } from "@/lib/whatsapp";
import { usePorte } from "./PorteContexto";

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/** Dia da semana de uma data AAAA-MM-DD, sem depender do fuso de quem acessa. */
const diaDaSemana = (data: string) => new Date(`${data}T12:00:00Z`).getUTCDay();

const semAssinatura = () => () => {};

const campo =
  "mt-2 block min-h-12 w-full rounded-md bg-fundo px-4 py-3 text-[1rem] ring-1 ring-linha transition-shadow focus:outline-none focus:ring-2 focus:ring-vermelho";

/**
 * Pedido de horário. Não é agenda de verdade (sem banco, o site não sabe o que
 * está livre): monta o pedido organizado e manda pelo WhatsApp, e a loja
 * confirma. Todo texto digitado passa por limparTexto e só vira parâmetro de
 * URL codificado.
 */
export function FormularioHorario() {
  const id = useId();
  const { porte, setPorte } = usePorte();
  const [nome, setNome] = useState("");
  const [servicoId, setServicoId] = useState(servicos[1].id);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");

  // "hoje" só existe no navegador; no build (servidor) fica vazio
  const hoje = useSyncExternalStore(semAssinatura, hojeNaLoja, () => "");

  const expediente = data ? horario[diaDaSemana(data)] : null;

  const horas = useMemo(() => {
    if (!expediente) return [];
    const lista: number[] = [];
    for (let h = expediente.abre; h < expediente.fecha; h++) lista.push(h);
    // hoje: só horários com pelo menos 1h de antecedência
    if (data === hoje) {
      const agora = agoraNaLoja().hora;
      return lista.filter((h) => h >= agora + 1);
    }
    return lista;
  }, [expediente, data, hoje]);

  // se o dia mudou e o horário escolhido não existe mais nele, ignora a escolha
  const horaValida = horas.includes(Number(hora)) ? hora : "";

  function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setErro("");

    if (!data || (hoje && data < hoje)) return setErro("Escolha uma data a partir de hoje.");
    if (!expediente) return setErro(`A loja não abre no ${DIAS[diaDaSemana(data)]}. Escolha outro dia.`);
    if (!horas.length) return setErro("Não sobrou horário nesse dia. Escolha outra data.");
    if (!horaValida) return setErro("Escolha um horário.");

    const servico = servicos.find((s) => s.id === servicoId) ?? servicos[0];
    const nomePorte = portes.find((p) => p.chave === porte)?.nome ?? "";
    const [ano, mes, dia] = data.split("-");
    const nomeLimpo = limparTexto(nome, 60);
    const obsLimpa = limparTexto(obs, 200);

    abrirWhatsApp(
      [
        "Olá! Quero pedir um horário pelo site:",
        "",
        ...(nomeLimpo ? [`Nome: ${nomeLimpo}`] : []),
        `Serviço: ${servico.nome}`,
        `Porte: ${nomePorte}`,
        `Dia: ${DIAS[diaDaSemana(data)]}, ${dia}/${mes}/${ano}`,
        `Horário: ${horaValida}h`,
        ...(obsLimpa ? [`Observação: ${obsLimpa}`] : []),
        "",
        "Pode confirmar?",
      ].join("\n"),
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="rounded-lg bg-papel p-6 ring-1 ring-linha sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="font-medium">Seu nome <span className="font-normal text-tinta-2">(opcional)</span></span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            maxLength={60}
            autoComplete="given-name"
            className={campo}
          />
        </label>

        <label>
          <span className="font-medium">Serviço</span>
          <select value={servicoId} onChange={(e) => setServicoId(e.target.value)} className={campo}>
            {servicos.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
          </select>
        </label>

        <label>
          <span className="font-medium">Porte do carro</span>
          <select value={porte} onChange={(e) => setPorte(e.target.value as Porte)} className={campo}>
            {portes.map((p) => <option key={p.chave} value={p.chave}>{p.nome} ({p.exemplo.toLowerCase()})</option>)}
          </select>
        </label>

        <label>
          <span className="font-medium">Dia</span>
          <input
            type="date"
            required
            value={data}
            min={hoje || undefined}
            onChange={(e) => setData(e.target.value)}
            className={campo}
          />
        </label>

        <label>
          <span className="font-medium">Horário</span>
          <select
            required
            value={horaValida}
            onChange={(e) => setHora(e.target.value)}
            disabled={!horas.length}
            className={`${campo} disabled:opacity-50`}
          >
            <option value="">{data ? (horas.length ? "Escolha" : "Sem horário nesse dia") : "Escolha o dia antes"}</option>
            {horas.map((h) => <option key={h} value={h}>{h}h</option>)}
          </select>
        </label>

        <label className="sm:col-span-2">
          <span className="font-medium">Observação <span className="font-normal text-tinta-2">(opcional)</span></span>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Ex.: quero que busquem o carro em casa"
            className={`${campo} resize-none`}
          />
        </label>
      </div>

      <p id={`${id}-erro`} role="alert" aria-live="assertive" className="mt-4 min-h-6 text-[0.95rem] font-medium text-vermelho">
        {erro}
      </p>

      <button
        type="submit"
        className="group mt-2 inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-md bg-vermelho px-6 py-4 font-display text-[1.1rem] font-bold uppercase tracking-wide text-white transition-colors hover:bg-vermelho-escuro sm:w-auto"
      >
        Pedir horário no WhatsApp
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-3 text-[0.85rem] text-tinta-2">
        A loja responde confirmando o horário. Nenhum dado fica guardado no site.
      </p>
    </form>
  );
}
