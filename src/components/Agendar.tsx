import { Clock, MapPin, Phone } from "lucide-react";
import { horarioTexto, site } from "@/data/site";
import { FormularioHorario } from "./FormularioHorario";
import { Mapa } from "./Mapa";
import { Revelar } from "./Revelar";
import { StatusAberto } from "./StatusAberto";

/**
 * Componente de servidor de propósito: o Mapa lê a chave do Google só no
 * servidor. Se fosse importado por um componente de cliente, a chave não
 * existiria no navegador e o mapa renderizaria diferente nos dois lados.
 */
export function Agendar() {
  return (
    <section id="agendar" className="container-site py-20 sm:py-28">
      <Revelar>
        <span className="rotulo">Pedido de horário</span>
        <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
          Marca o <span className="text-vermelho">dia</span>
        </h2>
        <p className="mt-4 max-w-[46ch] text-[1.05rem] text-tinta-2">
          Escolha o dia e o horário que prefere. O pedido chega organizado no
          WhatsApp e a loja confirma.
        </p>
      </Revelar>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <Revelar>
          <FormularioHorario />
        </Revelar>

        <Revelar atraso={0.1} className="flex flex-col gap-6">
          <StatusAberto className="text-tinta" />
          <ul className="divide-y divide-linha border-y border-linha">
            {[
              { icone: MapPin, titulo: "Endereço", texto: site.endereco },
              { icone: Clock, titulo: "Horário", texto: horarioTexto },
              { icone: Phone, titulo: "WhatsApp", texto: site.whatsappExibicao },
            ].map(({ icone: Icone, titulo, texto }) => (
              <li key={titulo} className="flex gap-4 py-4">
                <Icone className="mt-0.5 size-5 shrink-0 text-vermelho" />
                <div>
                  <p className="font-display text-[1.05rem] font-bold uppercase italic leading-tight">{titulo}</p>
                  <p className="text-tinta-2">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
          <Mapa />
        </Revelar>
      </div>
    </section>
  );
}
