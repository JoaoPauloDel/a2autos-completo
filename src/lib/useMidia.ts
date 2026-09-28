"use client";

import { useSyncExternalStore } from "react";

/** true quando a media query casa. No servidor, sempre false. */
export function useMidia(query: string) {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
