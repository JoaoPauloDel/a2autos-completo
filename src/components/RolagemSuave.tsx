"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Rolagem suavizada. É o que dá a sensação de peso às animações de scroll.
 * O Lenis já respeita "reduzir movimento" do sistema (respectReducedMotion),
 * e cuida dos links de âncora com o deslocamento do cabeçalho fixo.
 */
export function RolagemSuave() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: { offset: -72 },
      respectReducedMotion: true,
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
