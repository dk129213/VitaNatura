"use client";

import Link from "next/link";
import { Watch, ShieldCheck, ArrowRight } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { OfferCard } from "@/components/OfferCard";
import { healthOffers } from "@/data/destination";
import { useT } from "@/lib/i18n";

export default function HealthPage() {
  const t = useT();
  const watchDays = [
    {
      when: t("Good night, low resting heart rate", "Dobra noć, nizak puls u mirovanju"),
      plan: t("Longer canoe tour, walk on the Ston walls", "Dulja kanu tura, šetnja Stonskim zidinama"),
    },
    {
      when: t("Short sleep, heart rate above normal", "Kratak san, puls iznad uobičajenog"),
      plan: t("Heated pool, salt room, rest in the afternoon", "Grijani bazen, slana soba, odmor poslijepodne"),
    },
    {
      when: t("Rain and wind in the delta", "Kiša i vjetar u delti"),
      plan: t("Oil mill visit and Konavle silk workshop indoors", "Posjet uljari i radionica konavoske svile u zatvorenom"),
    },
  ];

  return (
    <div>
      <PageHeader
        module={t("Destination 365, pillar 2", "Destinacija 365, stup 2")}
        title={t("Health tourism that fits an active week", "Zdravstveni turizam uz aktivni tjedan")}
        intro={t(
          "Empty nesters are usually insured and care about staying healthy. We add health services that already make sense here in winter: the Ston salt pans, hotel pools that stand idle, local polyclinics with free slots, and a safety net if something goes wrong.",
          "Gosti kojima su djeca otišla od kuće uglavnom su osigurani i žele ostati zdravi. Dodajemo zdravstvene usluge koje ovdje zimi imaju smisla: stonska solana, hotelski bazeni koji stoje prazni, lokalne poliklinike sa slobodnim terminima i sigurnosna mreža ako nešto pođe po zlu.",
        )}
      />

      <ul className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {healthOffers.map((o) => (
          <OfferCard key={o.id} o={o} />
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-line bg-surface p-6 md:p-8" aria-labelledby="watch-h">
        <div className="flex items-center gap-2">
          <Watch size={24} className="text-accent" />
          <h2 id="watch-h" className="text-xl font-semibold">
            {t("How the smartwatch changes the day", "Kako pametni sat mijenja dan")}
          </h2>
        </div>
        <p className="mt-2 max-w-[65ch] text-ink-2">
          {t(
            "The plan is not fixed. Each morning the guest's own watch data and the weather pick the right version of the day.",
            "Plan nije fiksan. Svako jutro podaci s gostova sata i vremenska prognoza biraju pravu verziju dana.",
          )}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {watchDays.map((d) => (
            <li key={d.when} className="rounded-xl bg-surface-2 p-4">
              <p className="text-sm text-ink-3">{d.when}</p>
              <p className="mt-1 font-medium">{d.plan}</p>
            </li>
          ))}
        </ul>
        <SampleNote>
          {t(
            "Supports the guest's decisions; never a diagnosis. Data stays on the guest's phone unless they share it.",
            "Pomaže gostu u odlukama, nikad ne postavlja dijagnozu. Podaci ostaju na gostovom mobitelu, osim ako ih sam ne podijeli.",
          )}
        </SampleNote>
      </section>

      <section className="mt-6 rounded-2xl bg-accent-soft p-6 md:p-8">
        <div className="flex items-center gap-2">
          <ShieldCheck size={24} className="text-accent" />
          <h2 className="text-xl font-semibold">{t("When something goes wrong: Marta's story", "Kad nešto pođe po zlu: Martina priča")}</h2>
        </div>
        <p className="mt-2 max-w-[70ch] text-ink-2">
          {t(
            "On day 4 of her week, Marta falls on the Dubrovnik city walls. The demo shows how the same programme takes her through the hospital, an adapted room in the partner hotel, monitored recovery, rehab at Kalos and the flight home.",
            "4. dan svog tjedna Marta padne na dubrovačkim gradskim zidinama. Demo pokazuje kako je isti program vodi kroz bolnicu, prilagođenu sobu u partnerskom hotelu, praćeni oporavak, rehabilitaciju u Kalosu i let kući.",
          )}
        </p>
        <Link
          href="/start"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98]"
        >
          {t("Start Marta's story", "Pokreni Martinu priču")} <ArrowRight weight="bold" />
        </Link>
      </section>

      <NextStep
        href="/hotel"
        label={t("See the partner hotel deal", "Pogledaj ugovor s hotelom")}
        hint={t(
          "Everything starts from one partner hotel that keeps its pool heated and its rooms open in winter.",
          "Sve kreće od jednog partnerskog hotela koji zimi drži bazen grijanim i sobe otvorenima.",
        )}
      />
    </div>
  );
}
