import { fusoHorario, horario } from "@/data/site";

/** Dia da semana e hora atuais no fuso da loja, independente de onde o visitante está. */
export function agoraNaLoja(data = new Date()) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: fusoHorario,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(data);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    dia: dias.indexOf(valor("weekday")),
    hora: Number(valor("hour")) + Number(valor("minute")) / 60,
  };
}

/** Data de hoje (AAAA-MM-DD) no fuso da loja, para o mínimo do campo de data. */
export function hojeNaLoja(data = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: fusoHorario }).format(data);
}

export type Situacao = { aberto: boolean; texto: string };

export function situacaoAgora(data = new Date()): Situacao {
  const { dia, hora } = agoraNaLoja(data);
  const hoje = horario[dia];
  if (hoje && hora >= hoje.abre && hora < hoje.fecha) {
    return { aberto: true, texto: `Aberto agora, fecha às ${hoje.fecha}h` };
  }
  // procura o próximo dia com expediente
  for (let i = 0; i < 7; i++) {
    const d = (dia + i) % 7;
    const h = horario[d];
    if (!h) continue;
    if (i === 0 && hora < h.abre) return { aberto: false, texto: `Fechado, abre hoje às ${h.abre}h` };
    if (i === 1) return { aberto: false, texto: `Fechado, abre amanhã às ${h.abre}h` };
    if (i > 1) {
      const nome = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"][d];
      return { aberto: false, texto: `Fechado, abre ${nome} às ${h.abre}h` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}
