#!/usr/bin/env bash
# Confere se o número real do WhatsApp sobrou no build de demonstração.
# Rode depois de: NEXT_PUBLIC_MODO_DEMO=1 npm run build
# Uso: bash numero-vazou.sh 5585987886881
set -u
numero="${1:?informe o número só com dígitos, ex.: 5585987886881}"
final="${numero: -4}"   # também pega o formato de exibição (…-6881)
achou=$(grep -rlE "${numero}|-${final}\b" .next/static .next/server/app 2>/dev/null | grep -v '\.map$' | wc -l)
if [ "$achou" -eq 0 ]; then
  echo "ok: número fora do HTML e do JavaScript"
else
  echo "VAZOU em $achou arquivo(s):"
  grep -rlE "${numero}|-${final}\b" .next/static .next/server/app | grep -v '\.map$'
  exit 1
fi
