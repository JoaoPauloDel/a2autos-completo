import { Clock, MapPin, Phone } from "lucide-react";
import { horarioTexto, site } from "@/data/site";
import { Mapa } from "./Mapa";
import { Revelar } from "./Revelar";
import { StatusAberto } from "./StatusAberto";

/**
 * Componente de servidor de propósito: o Mapa lê a chave do Google só no
 * servidor. Se fosse importado por um componente de cliente, a chave não
 * existiria no navegador e o mapa renderizaria diferente nos dois lados.
 */
export function OndeEstamos() {
  return (
    <section id="local" className="container-site py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <Revelar className="flex flex-col gap-7">
          <div>
            <span className="rotulo">Onde estamos</span>
            <h2 className="titulo-display mt-4 text-[clamp(3rem,8vw,6rem)]">
              Passa <span className="text-vermelho">aqui</span>
            </h2>
          </div>
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
        </Revelar>

        <Revelar atraso={0.1}>
          <Mapa />
        </Revelar>
      </div>
    </section>
  );
}
