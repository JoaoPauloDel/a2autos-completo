/*
 * Confere 11 tamanhos de tela (320px a TV 4K) procurando rolagem lateral.
 * Quando acha, aponta o elemento que escapa sem nenhum ancestral cortando.
 *
 * Uso (com o site rodando):
 *   mkdir -p /tmp/pw && cd /tmp/pw && npm init -y >/dev/null && npm i playwright
 *   node <caminho>/responsivo.mjs http://localhost:3000
 */
import { createRequire } from "node:module";
const require = createRequire(process.cwd() + "/");
const { chromium } = require("playwright");

const url = process.argv[2] ?? "http://localhost:3000";
const tamanhos = [
  [320, 568], [360, 740], [390, 844], [430, 932], [768, 1024], [1024, 768],
  [1280, 800], [1440, 900], [1920, 1080], [2560, 1440], [3840, 2160],
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
let falhas = 0;
for (const [w, h] of tamanhos) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle" });
  // rola até o fim e volta, para disparar animações e carregamento tardio
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const culpados = [];
    for (const el of document.querySelectorAll("body *")) {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.right <= W + 1) continue;
      let pai = el.parentElement, cortado = false;
      while (pai && pai !== document.body) {
        if (/(hidden|clip|auto|scroll)/.test(getComputedStyle(pai).overflowX)) { cortado = true; break; }
        pai = pai.parentElement;
      }
      if (!cortado) culpados.push(`<${el.tagName.toLowerCase()} class="${String(el.className).slice(0, 60)}"> até ${Math.round(b.right)}px`);
    }
    return { scrollW: document.documentElement.scrollWidth, W, culpados: culpados.slice(0, 3) };
  });
  const ok = r.scrollW <= r.W;
  if (!ok) falhas++;
  console.log(`${String(w).padStart(4)}x${h}  ${ok ? "ok" : `ROLAGEM LATERAL de ${r.scrollW - r.W}px`}`);
  for (const c of ok ? [] : r.culpados) console.log(`        culpado: ${c}`);
  await ctx.close();
}
await browser.close();
process.exit(falhas ? 1 : 0);
