import { adicionais, horario, modoDemonstracao, plano, servicos, site } from "@/data/site";
import { urlMapa } from "@/lib/maps";

const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

/** schema.org para o Google entender que é um lava-jato local. */
export function DadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: site.nome,
    description: site.descricao,
    url: site.url,
    image: `${site.url}/fotos/audi.webp`,
    logo: `${site.url}/logo-a2.png`,
    ...(modoDemonstracao ? {} : { telephone: `+${site.whatsapp}` }),
    hasMap: urlMapa(),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.enderecoCurto,
      addressLocality: site.cidade,
      addressRegion: site.estado,
      addressCountry: "BR",
    },
    openingHoursSpecification: horario.flatMap((h, i) =>
      h ? [{ "@type": "OpeningHoursSpecification", dayOfWeek: DIAS[i], opens: hh(h.abre), closes: hh(h.fecha) }] : [],
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: [...servicos, ...adicionais].map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nome },
        priceSpecification: { "@type": "PriceSpecification", minPrice: s.precos.p, priceCurrency: "BRL" },
      })).concat({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: plano.nome },
        priceSpecification: { "@type": "PriceSpecification", minPrice: plano.preco, priceCurrency: "BRL" },
      }),
    },
  };

  // escapa "<" para o JSON nunca conseguir fechar a tag <script> antes da hora
  const json = JSON.stringify(dados).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
