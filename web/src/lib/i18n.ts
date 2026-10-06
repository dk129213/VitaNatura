"use client";

import { useCallback } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useHydrated } from "./useHydrated";

// Two languages, switched in the browser. The static HTML is rendered in DEFAULT_LANG;
// after hydration the visitor's saved choice takes over.
export type Lang = "hr" | "en";
export const DEFAULT_LANG: Lang = "hr";

// A text in both languages, used by the bilingual data files.
export type Bi = { en: string; hr: string };

const useLangStore = create<{ lang: Lang; setLang: (l: Lang) => void }>()(
  persist(
    (set) => ({ lang: DEFAULT_LANG, setLang: (lang) => set({ lang }) }),
    {
      name: "vitanatura-lang",
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch {
          const mem = new Map<string, string>();
          return {
            getItem: (k) => mem.get(k) ?? null,
            setItem: (k, v) => void mem.set(k, v),
            removeItem: (k) => void mem.delete(k),
          };
        }
      }),
    },
  ),
);

export function useLang(): Lang {
  const hydrated = useHydrated();
  const lang = useLangStore((s) => s.lang);
  return hydrated ? lang : DEFAULT_LANG;
}

export const useSetLang = () => useLangStore((s) => s.setLang);

// t("English", "Hrvatski") for inline text, t.b(bi) for a Bi object from the data files.
export function useT() {
  const lang = useLang();
  const t = useCallback((en: string, hr: string) => (lang === "hr" ? hr : en), [lang]);
  return Object.assign(t, { lang, b: (x: Bi) => x[lang] });
}
