/*
 * Build para a Cloudflare Pages: gera o site estático em out/ e grava o
 * out/_headers com os mesmos cabeçalhos de segurança da Vercel.
 *
 * Na Cloudflare, use como comando de build: npm run build:cloudflare
 * Diretório de saída: out
 */
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { cabecalhosDeSeguranca } from "../seguranca.mjs";

const build = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, EXPORTAR_ESTATICO: "1" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

const linhas = cabecalhosDeSeguranca().map(({ key, value }) => `  ${key}: ${value}`);
writeFileSync("out/_headers", `/*\n${linhas.join("\n")}\n`);
console.log("out/_headers gravado com os cabeçalhos de segurança");
