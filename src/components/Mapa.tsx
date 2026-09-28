import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { consultaEndereco, urlMapa, urlMapaEmbutido } from "@/lib/maps";

/**
 * O iframe é só visual (pointer-events desligado): o clique vai para o link em
 * volta e abre o Google Maps. Assim o mapa não prende a rolagem no celular.
 */
export function Mapa() {
  return (
    <a
      href={urlMapa()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir a localização da ${site.nome} no Google Maps`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-papel ring-1 ring-linha"
    >
      <iframe
        src={urlMapaEmbutido()}
        title={`Mapa: ${consultaEndereco}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[0.6] transition-[filter] duration-500 group-hover:grayscale-0"
      />
      <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-tinta px-3 py-2 font-display text-[0.9rem] font-bold uppercase tracking-wide text-papel">
        Abrir no Maps
        <ExternalLink className="size-3.5" />
      </span>
    </a>
  );
}
