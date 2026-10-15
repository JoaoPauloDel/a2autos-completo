import { AvisoDemonstracao } from "@/components/AvisoDemonstracao";
import { Avaliacoes } from "@/components/Avaliacoes";
import { BotaoFlutuante } from "@/components/BotaoFlutuante";
import { Cabecalho } from "@/components/Cabecalho";
import { ComoFunciona } from "@/components/ComoFunciona";
import { DadosEstruturados } from "@/components/DadosEstruturados";
import { Duvidas } from "@/components/Duvidas";
import { Faixa } from "@/components/Faixa";
import { Final } from "@/components/Final";
import { Galeria } from "@/components/Galeria";
import { Orcamento } from "@/components/Orcamento";
import { OndeEstamos } from "@/components/OndeEstamos";
import { Pacotes } from "@/components/Pacotes";
import { Plano } from "@/components/Plano";
import { PorteProvider } from "@/components/PorteContexto";
import { RolagemSuave } from "@/components/RolagemSuave";
import { Topo } from "@/components/Topo";
import { modoDemonstracao } from "@/data/site";

export default function Home() {
  return (
    <PorteProvider>
      <DadosEstruturados />
      <RolagemSuave />
      <Cabecalho />
      <main>
        <Topo />
        <Faixa />
        <Pacotes />
        <Orcamento />
        <Plano />
        <ComoFunciona />
        <Galeria />
        <Avaliacoes />
        <OndeEstamos />
        <Duvidas />
      </main>
      <Final />
      <BotaoFlutuante />
      {modoDemonstracao && <AvisoDemonstracao />}
    </PorteProvider>
  );
}
