/**
 * Ponto único de configuração do site.
 * Trocou telefone, preço, serviço ou horário? É só editar aqui.
 *
 * ATENÇÃO: serviços e preços ainda são de exemplo (o protótipo foi montado
 * sem a tabela real da loja). Troque pelos valores reais antes de publicar.
 */

/**
 * Modo demonstração. Com NEXT_PUBLIC_MODO_DEMO=1 nenhum botão de WhatsApp sai
 * do site e o número real não entra nem no HTML nem no JavaScript da página.
 * Declarado antes de `site` porque o número depende dele.
 */
export const modoDemonstracao = process.env.NEXT_PUBLIC_MODO_DEMO === "1";

export const site = {
  nome: "A2 Autos",
  descricao:
    "Lava-jato em Fortaleza com elevador hidráulico, produtos Vonixx, sala de espera climatizada e orçamento na hora pelo WhatsApp.",
  // Em demonstração o número real fica no lado morto do ternário e some do build.
  whatsapp: modoDemonstracao ? "demonstracao" : "5585987886881",
  whatsappExibicao: modoDemonstracao ? "(85) 9 XXXX-XXXX" : "(85) 9 8788-6881",
  endereco: "Av. Edilson Brasil Soares, 2201, Fortaleza, CE",
  enderecoCurto: "Av. Edilson Brasil Soares, 2201",
  cidade: "Fortaleza",
  estado: "CE",
  url: "https://a2autos.com.br",
  notaGoogle: 4.4,
} as const;

/**
 * Horário de funcionamento, em horas cheias no fuso de Fortaleza.
 * Índice = dia da semana (0 domingo). null = fechado.
 */
export const horario: ({ abre: number; fecha: number } | null)[] = [
  null,
  { abre: 8, fecha: 18 },
  { abre: 8, fecha: 18 },
  { abre: 8, fecha: 18 },
  { abre: 8, fecha: 18 },
  { abre: 8, fecha: 18 },
  { abre: 8, fecha: 18 },
];
export const horarioTexto = "Segunda a sábado, 8h às 18h";
export const fusoHorario = "America/Fortaleza";

export const mensagemGenerica =
  "Olá! Vim pelo site da A2 Autos e queria saber mais sobre os serviços de lavagem.";

/** Porte do veículo. O exemplo ajuda o cliente a se encaixar; ajuste à regra da loja. */
export const portes = [
  { chave: "p", nome: "Pequeno", exemplo: "Hatch e compactos" },
  { chave: "m", nome: "Médio", exemplo: "Sedãs e SUVs compactos" },
  { chave: "g", nome: "Grande", exemplo: "SUVs grandes e picapes" },
] as const;

export type Porte = (typeof portes)[number]["chave"];
export type Precos = Record<Porte, number>;

export type Servico = {
  id: string;
  nome: string;
  resumo: string;
  itens: string[];
  precos: Precos;
  /** Destaque visual no card. Confirmar com a loja qual é o mais pedido. */
  destaque?: boolean;
};

export const servicos: Servico[] = [
  {
    id: "lavagem-simples",
    nome: "Lavagem simples",
    resumo: "Para o dia a dia, por fora.",
    itens: ["Carroceria completa", "Rodas e pneus", "Secagem"],
    precos: { p: 19.9, m: 24.9, g: 29.9 },
  },
  {
    id: "lavagem-completa",
    nome: "Lavagem completa",
    resumo: "Por dentro e por fora.",
    itens: ["Tudo da simples", "Aspiração interna", "Limpeza dos vidros"],
    precos: { p: 39.9, m: 49.9, g: 59.9 },
    destaque: true,
  },
  {
    id: "enceramento-vonixx",
    nome: "Enceramento Vonixx",
    resumo: "Brilho e proteção da pintura.",
    itens: ["Lavagem externa", "Cera automotiva Vonixx", "Proteção da pintura"],
    precos: { p: 69.9, m: 84.9, g: 99.9 },
  },
  {
    id: "higienizacao-interna",
    nome: "Higienização interna",
    resumo: "Limpeza profunda do interior.",
    itens: ["Bancos", "Carpete", "Forração do teto e portas"],
    precos: { p: 89.9, m: 109.9, g: 129.9 },
  },
];

export type Adicional = { id: string; nome: string; precos: Precos };

export const adicionais: Adicional[] = [
  {
    id: "plastico",
    nome: "Renovação de plástico",
    precos: { p: 29.9, m: 34.9, g: 39.9 },
  },
  {
    id: "chassi",
    nome: "Lavagem do chassi no elevador",
    precos: { p: 24.9, m: 29.9, g: 34.9 },
  },
];

export const plano = {
  nome: "Plano mensal ilimitado",
  preco: 125,
  legenda: "por mês, a partir de",
  itens: [
    "Lavagens ilimitadas no mês",
    "Aspiração interna inclusa",
    "Cera e lavagem do chassi",
    "Renovação de plástico",
  ],
};

export const diferenciais = [
  "Elevador hidráulico",
  "Produtos Vonixx",
  "Sala de espera climatizada",
  "Leva e traz",
];

/**
 * Depoimentos. Os três abaixo são EXEMPLOS para mostrar a seção e aparecem
 * marcados como exemplo no modo demonstração. Troque por avaliações reais,
 * com autorização de quem escreveu.
 */
export const avaliacoes = [
  {
    texto:
      "Deixei o carro de manhã, fiquei na sala de espera com ar-condicionado e saí com ele pronto. Atendimento rápido.",
    autor: "Nome do cliente",
    exemplo: true,
  },
  {
    texto:
      "Lavam o chassi no elevador, coisa que quase nenhum lava-jato faz. Dá pra ver a diferença embaixo do carro.",
    autor: "Nome do cliente",
    exemplo: true,
  },
  {
    texto:
      "Não tinha como levar o carro e eles buscaram e devolveram em casa. Resolveu minha semana.",
    autor: "Nome do cliente",
    exemplo: true,
  },
];

/** Respostas escritas só com o que se sabe da loja. Confirmar com o dono. */
export const perguntas = [
  {
    pergunta: "Preciso marcar horário?",
    resposta:
      "Não é obrigatório, mas mandando o pedido pelo WhatsApp você já chega sabendo que tem vaga e o carro entra mais rápido.",
  },
  {
    pergunta: "O preço muda conforme o carro?",
    resposta:
      "Sim. A tabela é dividida por porte: pequeno, médio e grande. No orçamento aqui do site você escolhe o porte e vê o valor certo.",
  },
  {
    pergunta: "Vocês buscam o carro?",
    resposta:
      "Sim, temos serviço de motorista: buscamos e devolvemos o carro para quem não pode vir até a loja. Combine pelo WhatsApp.",
  },
  {
    pergunta: "Tem onde esperar?",
    resposta:
      "Tem sala de espera climatizada, com TV e frigobar, para você ficar à vontade enquanto o carro fica pronto.",
  },
  {
    pergunta: "Que produtos vocês usam?",
    resposta:
      "Somos loja credenciada Vonixx e usamos produtos originais da marca na lavagem, no enceramento e na proteção.",
  },
  {
    pergunta: "Como funciona o plano mensal?",
    resposta:
      "Você paga um valor fixo por mês e lava quantas vezes quiser, com aspiração, cera, chassi e renovação de plástico inclusos.",
  },
  {
    pergunta: "Qual o horário de funcionamento?",
    resposta: "De segunda a sábado, das 8h às 18h. Domingo fechado.",
  },
];

export const galeria = [
  { src: "/fotos/carros.webp", alt: "Carros na área externa da A2 Autos", largura: 860, altura: 524, legenda: "O pátio" },
  { src: "/fotos/lavagem.webp", alt: "Lavagem no elevador hidráulico", largura: 495, altura: 503, legenda: "Elevador hidráulico" },
  { src: "/fotos/fusca.webp", alt: "Fusca branco no box de lavagem", largura: 648, altura: 814, legenda: "Setor 02" },
  { src: "/fotos/espera.webp", alt: "Sala de espera climatizada", largura: 678, altura: 699, legenda: "Sala de espera" },
];

export const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#orcamento", label: "Orçamento" },
  { href: "#plano", label: "Plano mensal" },
  { href: "#agendar", label: "Agendar" },
  { href: "#duvidas", label: "Dúvidas" },
];
