"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { linkWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);
  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
