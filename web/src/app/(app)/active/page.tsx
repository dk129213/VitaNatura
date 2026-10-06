"use client";

import { Binoculars, Drop, MaskHappy } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { OfferCard } from "@/components/OfferCard";
import { activeOffers, sampleWeek } from "@/data/destination";
import { useT } from "@/lib/i18n";

const pillarMeta = {
  active: { icon: Binoculars, en: "Active", hr: "Aktivno", cls: "bg-accent text-accent-ink" },
  health: { icon: Drop, en: "Health", hr: "Zdravlje", cls: "bg-accent-soft text-accent" },
  culture: { icon: MaskHappy, en: "Culture", hr: "Kultura", cls: "bg-surface-2 text-ink-2" },
};

export default function ActivePage() {
  const t = useT();
  return (
    <div>
      <PageHeader
        module={t("Destination 365, pillar 1", "Destinacija 365, stup 1")}
        title={t("Active tourism outside the summer", "Aktivni turizam izvan ljeta")}
        intro={t(
          "The Neretva delta, Pelješac and Konavle are at their best when the coast is empty: birds in winter, orchards in spring, harvests in autumn. We adapt what is already there so small groups can join in, with local people as guides.",
          "Delta Neretve, Pelješac i Konavle najljepši su kad je obala prazna: ptice zimi, voćnjaci u proljeće, berbe u jesen. Prilagođavamo ono što već postoji da se male grupe mogu uključiti, a vodiči su lokalni ljudi.",
        )}
      />

      <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {activeOffers.map((o, i) => (
          <OfferCard key={o.id} o={o} wide={i === 0} />
        ))}
      </ul>
      <SampleNote>
        {t(
          "\"New on the ground\" marks our proposals: things that do not exist yet and that we would build or organise with local partners.",
          "\"Novo na terenu\" označava naše prijedloge: stvari koje još ne postoje, a koje bismo izgradili ili organizirali s lokalnim partnerima.",
        )}
      </SampleNote>

      <section className="mt-12" aria-labelledby="week-h">
        <h2 id="week-h" className="text-xl font-semibold">
          {t("A sample Active and Health week", "Primjer aktivnog i zdravstvenog tjedna")}
        </h2>
        <p className="mt-1 max-w-[65ch] text-ink-2">
          {t(
            "This is the week Marta and Thomas booked for early October. Every day starts and ends at the partner hotel.",
            "Ovo je tjedan koji su Marta i Thomas rezervirali za početak listopada. Svaki dan počinje i završava u partnerskom hotelu.",
          )}
        </p>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {sampleWeek.map((d) => {
            const m = pillarMeta[d.pillar];
            return (
              <li key={d.day.en} className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-sm text-ink-3">{t.b(d.day)}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${m.cls}`}>
                    <m.icon /> {t(m.en, m.hr)}
                  </span>
                </div>
                <p className="mt-2">{t.b(d.plan)}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <NextStep
        href="/health"
        label={t("See the health offer", "Pogledaj zdravstvenu ponudu")}
        hint={t(
          "The second pillar keeps guests healthy on the way: salt room in Ston, heated pools, check-ups and a smartwatch plan.",
          "Drugi stup brine o zdravlju gostiju: slana soba u Stonu, grijani bazeni, pregledi i plan s pametnim satom.",
        )}
      />
    </div>
  );
}
