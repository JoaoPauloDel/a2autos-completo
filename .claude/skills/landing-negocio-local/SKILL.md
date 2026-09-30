---
name: landing-negocio-local
description: Padrão do João Paulo para landing pages de negócio local (lava-jato, barbearia, oficina, clínica, restaurante...), no estilo do site A2 Autos Completo. Use SEMPRE que pedirem um site, landing page ou protótipo para um negócio, uma versão "Essencial" ou "Completa", uma proposta de preço para cliente, ou ajustes num site feito nesse padrão. Cobre stack, visual, seções, animações de scroll, regras de texto contra cara de IA, segurança, modo demonstração, testes e deploy.
---

# Landing page de negócio local, padrão A2 Autos

Referência viva: este repositório (`a2autos-completo`, versão Completa) e
`A2auots-lavajato` (versão Essencial). Na dúvida, copie a solução de lá em vez
de reinventar.

**Antes de desenhar qualquer site, leia `referencias/REFERENCIAS.md` e abra
as imagens**: as inspirações originais, o que foi tirado de cada uma e prints
de como os dois sites ficaram, seção por seção.

O cliente final é dono de negócio pequeno, que chega pelo celular. O site é
protótipo feito por conta para vender, então sai primeiro em modo
demonstração.

## Regras de texto e visual (inegociáveis, pedidas pelo João)

- **Sem travessão** (— ou –) em nenhum texto: site, README, mensagem. Use
  vírgula ou dois-pontos.
- **Sem emoji.** Ícone é SVG (lucide-react).
- **Sem gradiente azul/roxo** nem gradiente decorativo. Gradiente só funcional:
  escurecer foto para dar leitura ao texto, sempre preto.
- **Sem pílula genérica** na primeira dobra ("NEW", "AI-POWERED", "LAUNCH").
- **Sem número inventado.** Nada de "268% mais produtividade". Só número real
  do negócio (nota do Google, preço, horário, endereço).
- **Nada fabricado apresentado como real.** Preço e depoimento de exemplo
  ficam marcados como exemplo no código e aparecem marcados no modo demo.
  Depoimento de exemplo leva autor "Nome do cliente".
- **Responsivo de 320px a TV 4K**, sem rolagem lateral em nenhum tamanho.
- Texto em pt-BR, voz do dono do negócio, frases curtas. Sem "Bem-vindo ao
  nosso site", sem filler.

## Stack

Next.js (App Router, versão atual) + TypeScript + Tailwind CSS 4 +
framer-motion + lenis + lucide-react + @vercel/analytics. Nada mais sem
motivo.

- **Site 100% estático.** Sem banco de dados, sem rota de API, sem campo de
  texto livre. O "backend" é o WhatsApp: todo botão abre `wa.me` com mensagem
  pronta. Isso mantém o custo em só o domínio (~R$ 40/ano).
- Antes de mexer em config do Next, leia `node_modules/next/dist/docs/`
  (o AGENTS.md gerado pelo Next pede isso, e a API muda entre versões).

## Arquitetura (copiar deste repo)

```
src/data/site.ts        TUDO que muda por cliente: nome, número, endereço,
                        horário, serviços, preços, perguntas, depoimentos, fotos
src/lib/whatsapp.ts     linkWhatsApp(mensagem)
src/lib/maps.ts         urlMapa, urlComoChegar, urlMapaEmbutido (Embed API)
src/lib/horario.ts      "aberto agora" no fuso da loja
src/lib/preco.ts        formatarPreco (Intl pt-BR), menorPreco
seguranca.mjs           cabeçalhos de segurança, fonte única
scripts/build-cloudflare.mjs  export estático + out/_headers
```

Para um negócio novo: reescreva `src/data/site.ts` inteiro, troque fotos e
logo, ajuste a paleta em `globals.css`. Os componentes quase não mudam.

## Visual

- **Fundo claro quente** (`#ecebe7`), superfície `#f7f6f3`, tinta `#141414`.
  **Uma cor de destaque**, tirada da marca do cliente (logo, fachada,
  uniforme). A2 usou vermelho `#c8202c`.
- **Blocos escuros** (`#121212`) para dar ritmo: plano/destaque e rodapé.
- **Tipografia:** display gigante, condensada, **itálica, 800, maiúscula**
  (Barlow Condensed) + texto em Barlow. Classe `.titulo-display`. Palavra em
  contorno com `.contorno`. Rótulo de seção com traço: `.rotulo`.
  Troque a família se o negócio pedir outro tom, mas mantenha a lógica:
  display com personalidade + texto legível. Nada de Inter/Roboto/Arial.
- Raio discreto (`rounded-md`/`rounded-lg`). Sombra só em foto flutuante.
- `.container-site` cresce em degraus até 2500px e a fonte base sobe em
  2000/2600/3400px: o site escala em TV porque tudo é `rem`.
- **Fotos do cliente costumam vir do Instagram, com no máximo ~860px.**
  Converta para WebP com sharp (`quality 82`, largura ≤ 1800). Nunca estique
  foto na tela inteira sem tratamento: use painel contido (≤ largura nativa)
  ou, se for fundo, trate (preto e branco, escurecida, grão) para a moleza
  virar textura.

## Seções (Completo). Adapte a ordem e os nomes ao negócio

1. **Cabeçalho** fixo, transparente no topo, vidro fosco ao rolar; logo + nome
   + menu + CTA WhatsApp; menu de celular animado.
2. **Topo:** duas palavras gigantes do negócio ("LAVA" / "JATO"), foto num
   painel entre elas. Ao rolar, as palavras se afastam e a foto cresce.
   Endereço + "aberto agora" em cima; faixa de preços reais embaixo.
3. **Faixa:** duas fitas cruzadas com os diferenciais, que aceleram com a
   velocidade da rolagem e invertem ao subir.
4. **Serviços/pacotes:** cards com seletor de variante (porte do carro,
   tamanho, duração...) que troca o preço animado. Contexto compartilhado
   entre seções.
5. **Orçamento na hora:** escolhas → total somado no navegador → mensagem de
   WhatsApp itemizada. É o que mais vende a versão Completa.
6. **Destaque escuro:** plano/assinatura/combo, com frase gigante
   atravessando o fundo na rolagem e foto com parallax.
7. **Como funciona:** 3 a 4 passos com linha de progresso ligada ao scroll.
8. **Galeria:** no desktop a seção trava e a rolagem anda de lado (altura =
   100vh + largura do trilho); no celular vira carrossel com snap.
9. **Avaliações:** nota real do Google com estrelas proporcionais + link.
10. **Onde estamos:** status aberto, endereço, horário, WhatsApp, mapa.
11. **Dúvidas:** acordeão, respostas só com fatos que o dono confirmou.
12. **Final:** frase gigante ("BORA LAVAR?") + CTA, e rodapé.

**Essencial** (tier barato): tema escuro, sem calculadora, sem galeria
travada, sem fitas. Topo, diferenciais, tabela de preços, galeria em grade,
mapa, CTA. Ver `A2auots-lavajato`.

## Animação: como fazer e onde já errei

- Scroll: `useScroll({ target, offset })` + `useTransform`. Entrada:
  `whileInView` com `viewport={{ once: true }}` (componente `Revelar`).
- Rolagem suave: Lenis com `respectReducedMotion: true` e
  `anchors: { offset: -72 }`.
- **Sempre** dar alternativa com `useReducedMotion()`: sem parallax, sem
  trava de galeria.
- **Erro que já cometi:** elemento que entra de lado (`initial={{ x: 40 }}`)
  fica fora da tela antes de aparecer e cria rolagem lateral. Coloque
  `overflow-x-clip` na seção.
- **Erro que já cometi:** texto itálico cortado pelo `overflow-hidden` da
  animação de entrada. Use `overflow-y-clip` (corta só na vertical) e um
  `pr-[0.06em]`.
- **Erro que já cometi:** carrossel com `snap-start` ignora o padding e cola
  o primeiro item na borda. Use `scroll-px-*` igual ao `px-*`.
- `setState` dentro de `useEffect` quebra o lint do React. "Agora/hoje" do
  navegador: `useSyncExternalStore` com snapshot de servidor vazio.
- Componente que lê variável de ambiente só do servidor (chave do Maps) não
  pode ser importado por componente `"use client"`.
- `<body suppressHydrationWarning>`: extensões (ColorZilla, Grammarly)
  escrevem atributos no body e geram erro falso de hidratação.

## Modo demonstração

`NEXT_PUBLIC_MODO_DEMO=1`:
- `AvisoDemonstracao` intercepta clique em qualquer `a[href*="wa.me"]` (fase
  de captura) e mostra a mensagem que seria enviada. Isso vende o produto.
- O número real fica no lado morto de um ternário em `site.ts`
  (`modoDemonstracao ? "demonstracao" : "55..."`), então some do HTML **e do
  JavaScript**. Verificar os dois (já errei checando só o HTML).
- Telefone exibido mascarado; JSON-LD sem `telephone`.
- Variáveis `NEXT_PUBLIC_` são gravadas no build: mudou, tem que rebuildar.

## Segurança

- `seguranca.mjs`: CSP (`default-src 'self'`, só o Google Maps em
  `frame-src`, `frame-ancestors 'none'`), X-Frame-Options, HSTS,
  Referrer-Policy, Permissions-Policy, nosniff. `poweredByHeader: false`.
- CSP sem nonce de propósito (nonce exige render por requisição e mata o site
  estático). Documente o `'unsafe-inline'` como risco residual.
- Todo `target="_blank"` com `rel="noopener noreferrer"`.
- Único `dangerouslySetInnerHTML` permitido: JSON-LD com `<` escapado.
- Preferir não ter campo de texto livre. Se tiver: limitar tamanho, tirar
  caracteres de controle, só usar como parâmetro de URL codificado.
- `npm audit` zerado; nunca subir `.env.local`.

## Verificação antes de dizer que está pronto

1. `npm run lint` e `npx tsc --noEmit`
2. `NEXT_PUBLIC_MODO_DEMO=1 npm run build` e `npm run build:cloudflare`
3. `bash .claude/skills/landing-negocio-local/scripts/numero-vazou.sh <numero>`
   depois do build com demo ligado: tem que dar zero
4. Responsividade em 11 tamanhos (320 a 3840) sem rolagem lateral:
   `scripts/responsivo.mjs` (instruções no arquivo). Se falhar, ele aponta o
   elemento culpado.
5. Testes funcionais do que o site faz (soma do orçamento, seletor
   compartilhado, acordeão), com Playwright, e `reducedMotion: "reduce"`
6. Olhar prints de desktop e celular de verdade, seção por seção.
7. Rodar teste com caso de controle quando possível (ex.: demo desligado
   tem que mostrar o número), senão o teste não prova nada.

Chromium já vem no ambiente: `executablePath: "/opt/pw-browsers/chromium"`.
Este ambiente bloqueia `google.com` e `vercel.app`: o mapa aparece vazio nos
prints e não dá para abrir o site publicado; peça para o João conferir os
sinais do modo demo no link.

## Negócio (o que o João vende)

- **Essencial R$ 499** e **Completo R$ 799**, pagamento único, metade para
  começar e metade no ar. Domínio e hospedagem no 1º ano; depois R$ 150/ano.
  Alterações: 1/mês no Essencial, 3/mês no Completo (trocar preço, texto,
  foto, horário, serviço; página ou seção nova é à parte).
- Domínio `.com.br` no registro.br, **no CNPJ do cliente**.
- Protótipo na Vercel (Hobby). Cliente pagante: Cloudflare Pages (uso
  comercial grátis) com `npm run build:cloudflare`, saída `out`.
- Mensagem de prospecção: apresenta o João, cita nota do Google real, diz que
  não achou site, manda o protótipo, avisa que fotos vieram do Instagram e
  serviços/preços são de exemplo, que os botões mostram aviso, que tudo é
  ajustável, sem compromisso. Linhas em branco entre parágrafos, nome do
  negócio em `*negrito*`, sem travessão.
- Nome de projeto na Vercel sem erro de digitação: vira a URL que o cliente vê.
