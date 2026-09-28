"use client";

import { motion } from "framer-motion";
import { Armchair, Check, Droplets, ShieldCheck, Waves } from "lucide-react";
import { modoDemonstracao, portes, servicos, type Servico } from "@/data/site";
import { formatarPreco } from "@/lib/preco";
import { linkWhatsApp } from "@/lib/whatsapp";
import { PrecoAnimado } from "./PrecoAnimado";
import { usePorte } from "./PorteContexto";
import { Revelar } from "./Revelar";
import { SeletorPorte } from "./SeletorPorte";

const icones: Record<string, typeof Droplets> = {
  "lavagem-simples": Droplets,
  "lavagem-completa": Waves,
  "enceramento-vonixx": ShieldCheck,
  "higienizacao-interna": Armchair,
};

function Cartao({ servico, indice }: { servico: Servico; indice: number }) {
  const { porte } = usePorte();
  const Icone = icones[servico.id] ?? Droplets;
  const nomePorte = portes.find((p) => p.chave === porte)?.nome.toLowerCase();
  const preco = servico.precos[porte];
  const mensagem = `Olá! Quero agendar *${servico.nome}* para carro de porte ${nomePorte} (${formatarPreco(preco)}). Quais horários vocês têm?`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: indice * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col rounded-lg p-6 ${
        servico.destaque ? "bg-noite text-papel shadow-[0_24px_50px_-24px_rgba(20,20,20,0.7)]" : "bg-papel ring-1 ring-linha"
      }`}
    >
      {servico.destaque && (
        <span className="absolute -top-3 left-6 rounded bg-vermelho px-2.5 py-1 font-display text-[0.8rem] font-bold uppercase tracking-wider text-white">
          Mais pedido
        </span>
      )}
      <Icone className="size-8 text-vermelho" strokeWidth={1.6} />
      <h3 className="mt-5 font-display text-[1.7rem] font-extrabold uppercase italic leading-none">{servico.nome}</h3>
      <p className={`mt-2 text-[0.95rem] ${servico.destaque ? "text-papel/65" : "text-tinta-2"}`}>{servico.resumo}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <PrecoAnimado valor={preco} className="font-display text-[2.6rem] font-extrabold italic leading-none" />
      </div>
      <p className={`mt-1 text-[0.8rem] ${servico.destaque ? "text-papel/50" : "text-tinta-2"}`}>porte {nomePorte}</p>

      <ul className={`mb-7 mt-6 space-y-2.5 border-t pt-5 ${servico.destaque ? "border-noite-linha" : "border-linha"}`}>
        {servico.itens.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[0.95rem]">
            <Check className="mt-0.5 size-4 shrink-0 text-vermelho" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </ul>

      <a
        href={linkWhatsApp(mensagem)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Agendar ${servico.nome} pelo WhatsApp`}
        className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 font-display text-[1rem] font-bold uppercase tracking-wide transition-colors ${
          servico.destaque ? "bg-vermelho text-white hover:bg-vermelho-escuro" : "bg-tinta text-papel hover:bg-vermelho"
        }`}
      >
        Agendar
      </a>
    </motion.article>
  );
}

export function Pacotes() {
  return (
    <section id="servicos" className="container-site py-20 sm:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Revelar>
          <span className="rotulo">Serviços</span>
          <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
            Escolha o <span className="text-vermelho">brilho</span>
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.05rem] text-tinta-2">
            O preço acompanha o tamanho do carro. Escolha o porte e os valores
            mudam em todos os pacotes.
          </p>
        </Revelar>
        <Revelar atraso={0.1}>
          <SeletorPorte id="pacotes" />
        </Revelar>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {servicos.map((s, i) => (
          <Cartao key={s.id} servico={s} indice={i} />
        ))}
      </div>

      {modoDemonstracao && (
        <p className="mt-5 text-[0.85rem] text-tinta-2">
          Preços de exemplo. No site publicado entram os valores reais da loja.
        </p>
      )}
    </section>
  );
}
