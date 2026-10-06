"use client";

import { useState } from "react";
import Image from "next/image";
import { Wheelchair, Translate, CalendarBlank, Leaf, Boat, Recycle, CheckCircle, ArrowSquareOut } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { useScenario } from "@/data/useScenario";
import { useT } from "@/lib/i18n";

const effortLabel = {
  low: { en: "Light effort", hr: "Lagan napor" },
  medium: { en: "Moderate effort", hr: "Umjeren napor" },
  high: { en: "Demanding", hr: "Zahtjevno" },
};

export default function ExplorePage() {
  const t = useT();
  const { harvestCalendar, farmMatches } = useScenario();
  const [onlyFit, setOnlyFit] = useState(true);
  const farms = onlyFit ? farmMatches.filter((f) => f.accessible && f.effort === "low") : farmMatches;

  const harvests = [
    { image: "/img/mandarins.jpg", alt: t("Ripe mandarins on the tree", "Zrele mandarine na stablu"), title: t("Mandarins", "Mandarine"), where: t("Neretva valley, October to December", "Dolina Neretve, listopad do prosinac") },
    { image: "/img/grapes.jpg", alt: t("Freshly picked grapes poured from a crate", "Svježe ubrano grožđe iz gajbe"), title: t("Grapes", "Grožđe"), where: t("Pelješac and Konavle, September and October", "Pelješac i Konavle, rujan i listopad") },
    { image: "/img/olives.jpg", alt: t("Picked olives on a net", "Ubrane masline na mreži"), title: t("Olives", "Masline"), where: t("Pelješac and Korčula, October and November", "Pelješac i Korčula, listopad i studeni") },
  ];

  return (
    <div>
      <PageHeader
        module={t("Module 5, crowd-free trips", "Modul 5, izleti bez gužvi")}
        title={t("The Dubrovnik region without the crowds", "Dubrovačka regija bez gužvi")}
        intro={t(
          "For any traveller who prefers a family farm to the Old Town on a cruise day. Vita matches farms by activity, effort, languages and access.",
          "Za svakog putnika kojem je obiteljsko gospodarstvo draže od Starog grada na dan kruzera. Vita bira gospodarstva po aktivnosti, naporu, jezicima i pristupačnosti.",
        )}
      />

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {harvests.map((h) => (
          <li key={h.image}>
            <Image src={h.image} alt={h.alt} width={1920} height={1280} className="h-48 w-full rounded-2xl object-cover" />
            <p className="mt-3 font-medium">{h.title}</p>
            <p className="text-sm text-ink-2">{h.where}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-2xl border border-line bg-surface p-6 md:p-8" aria-labelledby="match-h">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="match-h" className="text-xl font-semibold">
            {t("Matched for Marta", "Odabrano za Martu")}
          </h2>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyFit}
              onChange={(e) => setOnlyFit(e.target.checked)}
              className="size-4 accent-[var(--accent)]"
            />
            {t("Only what fits her recovery", "Samo ono što odgovara njezinom oporavku")}
          </label>
        </div>
        <p className="mt-1 max-w-[65ch] text-ink-2">
          {t(
            "She asked for \"a reason to come back, something quiet with olives\". Vita keeps to step-free places where picking is optional.",
            "Tražila je \"razlog za povratak, nešto mirno s maslinama\". Vita bira mjesta bez stepenica gdje branje nije obavezno.",
          )}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {farms.map((f) => (
            <li key={f.name} className="overflow-hidden rounded-2xl border border-line sm:grid sm:grid-cols-[160px_1fr]">
              <Image src={f.image} alt="" width={640} height={480} className="h-40 w-full object-cover sm:h-full" />
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-sm text-ink-3">{f.region}</p>
                  </div>
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-sm">{t.b(effortLabel[f.effort])}</span>
                </div>
                <p className="mt-2">{f.activity}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-2">
                  <li className="flex items-center gap-1.5">
                    <CalendarBlank /> {f.when}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Translate /> {f.languages}
                  </li>
                  <li className={`flex items-center gap-1.5 ${f.accessible ? "text-accent" : "text-warn"}`}>
                    <Wheelchair /> {f.accessible ? t("Step-free", "Bez stepenica") : t("Not step-free", "Ima stepenica")}
                  </li>
                </ul>
                <p className="mt-2 text-sm text-ink-3">{f.note}</p>
              </div>
            </li>
          ))}
        </ul>
        <SampleNote>
          {t(
            "Farms are sample entries. Guests take part as a tourist experience, not as workers.",
            "Gospodarstva su primjeri. Gosti sudjeluju kao turističko iskustvo, ne kao radnici.",
          )}
        </SampleNote>
      </section>

      <section
        className="mt-10 overflow-hidden rounded-2xl border border-accent/40 bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
        aria-labelledby="gss-h"
      >
        <div className="p-6 md:order-first md:p-8">
          <Recycle size={26} className="text-accent" />
          <h2 id="gss-h" className="mt-3 text-xl font-semibold">
            {t("Give back to the sea with Green Sea Safari", "Vratite nešto moru s Green Sea Safari")}
          </h2>
          <p className="mt-2 max-w-[60ch] text-ink-2">
            {t(
              "A Dubrovnik project that takes guests by boat to isolated beaches and bays of the Elaphiti islands to collect plastic and other waste, with swimming and snorkelling on the way.",
              "Dubrovački projekt koji goste vodi brodom do izoliranih plaža i uvala Elafita da skupljaju plastiku i drugi otpad, uz kupanje i ronjenje na dah usput.",
            )}
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 2xl:grid-cols-2">
            {[
              t("Trips and membership are free", "Izleti i članstvo su besplatni"),
              t("Daily, 1 June to 30 September", "Svaki dan, od 1. lipnja do 30. rujna"),
              t("09:30 from the Batala pontoon, about 4 hours", "U 09:30 s pontona Batala, oko 4 sata"),
              t("Gloves and aqua shoes provided", "Rukavice i obuća za vodu osigurani"),
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-ink-2">
            <Wheelchair size={18} className="mt-0.5 shrink-0 text-warn" />
            {t(
              "Needs swimming and stepping into a boat, so Vita suggests it to Thomas next summer, and to Marta once she has fully recovered.",
              "Treba plivati i ući u brod, pa ga Vita predlaže Thomasu iduće ljeto, a Marti kad se potpuno oporavi.",
            )}
          </p>
          <a
            href="https://greenseasafari.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98]"
          >
            {t("Visit Green Sea Safari", "Posjeti Green Sea Safari")} <ArrowSquareOut weight="bold" />
          </a>
          <SampleNote>
            {t(
              "Trip details from greenseasafari.com, October 2026. Photo: Lopud, one of the Elaphiti islands.",
              "Podaci o izletu s greenseasafari.com, listopad 2026. Fotografija: Lopud, jedan od Elafita.",
            )}
          </SampleNote>
        </div>
        <Image
          src="/img/elaphiti.jpg"
          alt={t("A clear bay on Lopud, one of the Elaphiti islands near Dubrovnik", "Bistra uvala na Lopudu, jednom od Elafita kod Dubrovnika")}
          width={1920}
          height={1279}
          className="h-56 w-full object-cover md:h-full"
        />
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Image
          src="/img/neretva.jpg"
          alt={t("Mandarin orchards and channels in the Neretva delta", "Nasadi mandarina i kanali u delti Neretve")}
          width={1920}
          height={1280}
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <Boat size={26} className="text-accent" />
          <h2 className="mt-3 text-xl font-semibold">{t("Three cruise ships in port tomorrow?", "Sutra tri kruzera u luci?")}</h2>
          <p className="mt-2 text-ink-2">
            {t(
              "Vita sees the crowd forecast for the Old Town and suggests the Neretva delta, Ston or Lokrum instead, with a plain reason: shorter queues, local food, and money that stays with local families.",
              "Vita vidi prognozu gužve u Starom gradu i umjesto toga predlaže deltu Neretve, Ston ili Lokrum, s jasnim razlogom: kraći redovi, domaća hrana i novac koji ostaje lokalnim obiteljima.",
            )}
          </p>
          <SampleNote>{t("Example recommendation for the demo.", "Primjer preporuke za demo.")}</SampleNote>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="cal-h">
        <h2 id="cal-h" className="text-xl font-semibold">
          {t("What is happening when", "Što se događa i kada")}
        </h2>
        <p className="mt-1 text-ink-2">
          {t(
            "Real harvest dates move with the weather, so Vita confirms them with the farm a week ahead.",
            "Pravi datumi berbe ovise o vremenu, pa ih Vita tjedan ranije potvrđuje s gospodarstvom.",
          )}
        </p>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {harvestCalendar.map((h, i) => {
            const now = i === 4;
            return (
              <li
                key={h.months}
                className={`rounded-2xl border p-5 ${now ? "border-accent bg-accent-soft" : "border-line bg-surface"}`}
              >
                <p className="flex items-center gap-2 font-mono text-sm text-ink-2">
                  <Leaf className={now ? "text-accent" : "text-ink-3"} /> {h.months}
                  {now && <span className="font-sans font-medium text-accent">{t("Now", "Sada")}</span>}
                </p>
                <p className="mt-2 font-medium">{h.what}</p>
                <p className="mt-1 text-sm text-ink-3">{h.where}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <NextStep
        href="/calendar"
        label={t("See the full Calendar 365", "Pogledaj cijeli Kalendar 365")}
        hint={t(
          "Harvests are only part of it. Traditions like St. Blaise, the Ston oyster days and Moreška can fill the rest of the year.",
          "Berbe su samo dio. Tradicije poput Feste sv. Vlaha, Dana malostonskih kamenica i Moreške mogu ispuniti ostatak godine.",
        )}
      />
    </div>
  );
}
