# A2 Autos: Site Completo

Versão completa da landing page do lava-jato A2 Autos (Fortaleza/CE), com
orçamento na hora e animações de scroll. A versão Essencial
fica no repositório `A2auots-lavajato`.

## Rodando

```bash
npm i
npm run dev
```

Abra <http://localhost:3000>.

## O que tem aqui

| Seção | O que faz |
| --- | --- |
| Topo | "LAVA" e "JATO" gigantes que se afastam ao rolar, com a foto crescendo entre as palavras |
| Faixa | Duas fitas cruzadas com os diferenciais, que aceleram com a velocidade da rolagem e invertem ao subir |
| Serviços | Cards com seletor de porte (P, M, G); os preços trocam animados |
| Orçamento | Porte, serviço e adicionais somados na hora; o resultado vira mensagem de WhatsApp |
| Plano mensal | Bloco escuro com frase gigante que atravessa a tela na rolagem |
| Como funciona | Quatro passos com uma linha que se preenche ao rolar |
| Galeria | No computador trava a tela e anda de lado; no celular vira carrossel de arrastar |
| Avaliações | Nota do Google com estrelas proporcionais e depoimentos |
| Onde estamos | Endereço, horário e mapa que abre o Google Maps |
| Dúvidas | Perguntas frequentes em acordeão |
| "Aberto agora" | Calculado no fuso de Fortaleza, independente de onde o visitante está |

O porte escolhido em uma seção segue para as outras.

Tudo respeita "reduzir movimento" do sistema: sem parallax, sem galeria travada
e sem rolagem suavizada.

## Onde mexer

Quase tudo está em **`src/data/site.ts`**: serviços, preços por porte,
adicionais, plano, horário de funcionamento, perguntas, depoimentos e fotos.

**Antes de publicar de verdade:**

- Troque os preços. Hoje são de exemplo.
- Troque os depoimentos. Os três atuais são exemplos, marcados como tal.
  Use avaliações reais, com autorização de quem escreveu.
- Confirme com a loja qual serviço é o "Mais pedido".
- Confirme as respostas das perguntas frequentes.

## Modo demonstração

Para mandar o protótipo a um cliente:

```
NEXT_PUBLIC_MODO_DEMO=1
```

Nenhum botão de WhatsApp sai do site: o clique abre um aviso com a mensagem que
seria enviada. O número real não entra nem no HTML nem no JavaScript da página.

Variáveis `NEXT_PUBLIC_` são gravadas no build. Mudou a variável, precisa
**rebuildar** (na Vercel: Redeploy). Só salvar não basta.

## Hospedagem

**Vercel:** importe o repositório. Nada a configurar além das variáveis.
O relatório de visitas liga sozinho lá.

**Cloudflare Pages** (uso comercial liberado no plano gratuito):

- Comando de build: `npm run build:cloudflare`
- Diretório de saída: `out`

Esse comando gera o site estático e o arquivo `_headers` com os mesmos
cabeçalhos de segurança da Vercel.

## Segurança

Os cabeçalhos ficam em `seguranca.mjs`, usados pelos dois hosts:

- **Content-Security-Policy**: só carrega recursos do próprio site, com exceção
  do mapa do Google
- **X-Frame-Options / frame-ancestors**: ninguém coloca o site dentro de um
  iframe
- **Strict-Transport-Security**: força HTTPS
- **Referrer-Policy, Permissions-Policy, X-Content-Type-Options**
- Cabeçalho `X-Powered-By` removido

O site não tem nenhum campo de texto livre: o visitante só escolhe opções, e as
mensagens de WhatsApp são montadas com dados do próprio site. Nada é guardado.

Risco residual conhecido: a CSP permite `'unsafe-inline'` em scripts, porque
os scripts de hidratação do Next vêm inline e a alternativa (nonce) exigiria
renderizar a página a cada acesso, acabando com o site estático.
