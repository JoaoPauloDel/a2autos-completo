const formatador = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number) {
  return formatador.format(valor);
}

/** Menor preço conhecido de um serviço, para a chamada "a partir de". */
export function menorPreco(precos: Record<string, number | null>) {
  const valores = Object.values(precos).filter(
    (v): v is number => typeof v === "number",
  );
  return valores.length ? Math.min(...valores) : null;
}
