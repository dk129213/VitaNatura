"use client";

import Image from "next/image";
import { MaskHappy, Leaf, Bird, Drop, ArrowRight } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { calendar, type CalendarItem } from "@/data/destination";
import { useT } from "@/lib/i18n";

const kindMeta: Record<CalendarItem["kind"], { icon: typeof MaskHappy; en: string; hr: string }> = {
  tradition: { icon: MaskHappy, en: "Tradition", hr: "Tradicija" },
  harvest: { icon: Leaf, en: "Harvest", hr: "Berba" },
  nature: { icon: Bird, en: "Nature", hr: "Priroda" },
  health: { icon: Drop, en: "Health", hr: "Zdravlje" },
};

const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsHr = ["Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"];

// What runs in each month once the traditions are stretched (1 = Jan). Summer is already full.
const yearRound: { label: { en: string; hr: string }; months: number[] }[] = [
  { label: { en: "Traditions", hr: "Tradicije" }, months: [2, 3, 4, 5, 6, 9, 10, 11, 12, 1] },
  { label: { en: "Harvests and farm work", hr: "Berbe i rad na imanju" }, months: [1, 2, 3, 9, 10, 11, 12] },
  { label: { en: "Photo safari, canoe, birds", hr: "Foto safari, kanu, ptice" }, months: [1, 2, 3, 4, 5, 6, 9, 10, 11, 12] },
  { label: { en: "Health: pool, salt room, check-ups", hr: "Zdravlje: bazen, slana soba, pregledi" }, months: [1, 2, 3, 4, 5, 10, 11, 12] },
  { label: { en: "Summer tourism (already full)", hr: "Ljetni turizam (već pun)" }, months: [6, 7, 8, 9] },
];

export default function CalendarPage() {
  const t = useT();
  const months = t.lang === "hr" ? monthsHr : monthsEn;

  return (
    <div>
      <PageHeader
        module={t("Destination 365", "Destinacija 365")}
        title={t("Calendar 365: stretching traditions into seasons", "Kalendar 365: tradicije koje traju cijelu sezonu")}
        intro={t(
          "The county already has festivals, harvests and dances that people would travel for. Most last one day or one summer week. We stretch each one into weeks or months, so there is a reason to come in every month.",
          "Županija već ima fešte, berbe i plesove zbog kojih bi ljudi putovali. Većina traje jedan dan ili jedan ljetni tjedan. Svaku produžujemo na tjedne ili mjesece, da postoji razlog za dolazak svaki mjesec.",
        )}
      />

      <section className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface p-5 md:p-6" aria-labelledby="year-h">
        <h2 id="year-h" className="font-semibold">
          {t("Something to do in every month", "Nešto za raditi svaki mjesec")}
        </h2>
        <table className="mt-4 w-full min-w-[640px] border-separate border-spacing-1 text-sm">
          <thead>
            <tr>
              <th className="w-[34%]" />
              {months.map((m) => (
                <th key={m} className="font-normal text-ink-3">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yearRound.map((r, i) => {
              const summer = i === yearRound.length - 1;
              return (
                <tr key={r.label.en}>
                  <th scope="row" className="pr-2 text-left font-normal text-ink-2">
                    {t.b(r.label)}
                  </th>
                  {months.map((m, mi) => {
                    const on = r.months.includes(mi + 1);
                    return (
                      <td key={m} className="h-7">
                        <span
                          className={`block h-full rounded ${on ? (summer ? "bg-ink-3/40" : "bg-accent") : "bg-surface-2"}`}
                          aria-label={on ? t("yes", "da") : t("no", "ne")}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <SampleNote>
          {t(
            "Planned calendar. Exact dates of feasts and harvests are confirmed each year with the organisers and farms.",
            "Planirani kalendar. Točni datumi fešta i berbi svake se godine potvrđuju s organizatorima i gospodarstvima.",
          )}
        </SampleNote>
      </section>

      <ol className="mt-10 space-y-4">
        {calendar.map((c) => {
          const k = kindMeta[c.kind];
          return (
            <li
              key={c.title.en}
              className={`overflow-hidden rounded-2xl border border-line bg-surface ${c.image ? "md:grid md:grid-cols-[220px_1fr]" : ""}`}
            >
              {c.image && <Image src={c.image} alt="" width={800} height={600} className="h-40 w-full object-cover md:h-full" />}
              <div className="p-5 md:p-6">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3">
                  <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                    <k.icon size={18} /> {t(k.en, k.hr)}
                  </span>
                  <span className="font-mono">{t.b(c.months)}</span>
                </p>
                <h2 className="mt-1 text-lg font-semibold">{t.b(c.title)}</h2>
                <p className="text-sm text-ink-3">{t.b(c.place)}</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-3">{t("Today", "Danas")}</p>
                    <p className="mt-1 text-ink-2">{t.b(c.today)}</p>
                  </div>
                  <ArrowRight className="hidden text-ink-3 md:mt-6 md:block" size={20} />
                  <div className="rounded-xl bg-accent-soft p-3.5">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent">{t("Stretched", "Produženo")}</p>
                    <p className="mt-1">{t.b(c.stretched)}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <NextStep
        href="/active"
        label={t("See the active offer", "Pogledaj aktivnu ponudu")}
        hint={t(
          "Between the traditions, guests stay active: photo safari, canoe safari, birdwatching and harvests.",
          "Između tradicija gosti ostaju aktivni: foto safari, kanu safari, promatranje ptica i berbe.",
        )}
      />
    </div>
  );
}
