"use client";

import { useEffect } from "react";
import { useLang, useSetLang, type Lang } from "@/lib/i18n";

const langs: { id: Lang; label: string; name: string }[] = [
  { id: "hr", label: "HR", name: "Hrvatski" },
  { id: "en", label: "EN", name: "English" },
];

export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const setLang = useSetLang();
  return (
    <div role="group" aria-label="Jezik / Language" className={`inline-flex rounded-full border border-line bg-surface p-0.5 text-sm ${className}`}>
      {langs.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          title={l.name}
          className={`rounded-full px-3 py-1 font-medium transition ${lang === l.id ? "bg-accent text-accent-ink" : "text-ink-2 hover:text-ink"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

// Keeps <html lang> in step with the chosen language.
export function LangSync() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
