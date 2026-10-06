"use client";

import Image from "next/image";
import { Path, Ruler, TrendUp, UsersThree, Wheelchair } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { LiveConditions } from "@/components/LiveConditions";
import { useScenario } from "@/data/useScenario";
import { useT } from "@/lib/i18n";

export default function WellnessPage() {
  const t = useT();
  const { wellnessPlace, wellnessProgram, trails, otherRehab } = useScenario();
  return (
    <div>
      <PageHeader
        module={t("Module 4, wellness and nature", "Modul 4, wellness i priroda")}
        title={t("Rehabilitation by the sea, off-season", "Rehabilitacija uz more, izvan sezone")}
        intro={t(
          "A 14-day programme built from real treatments, flat paths and quiet November dates. It adapts every day to sleep, pain and the weather.",
          "Program od 14 dana složen od stvarnih terapija, ravnih staza i mirnih studenih datuma. Svaki dan se prilagođava snu, boli i vremenu.",
        )}
      />

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Image
          src={wellnessPlace.image}
          alt={t("The bay of Vela Luka on the island of Korčula", "Uvala Vela Luka na otoku Korčuli")}
          width={1920}
          height={1080}
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <p className="text-sm text-ink-3">{t("2 to 15 November", "2. do 15. studenoga")}, {wellnessPlace.island}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{wellnessPlace.name}</h2>
          <p className="mt-3 max-w-[55ch] text-ink-2">{wellnessPlace.summary}</p>
          <p className="mt-4 text-ink-2">
            {t(
              "Chosen for Marta because: rehabilitation after orthopaedic surgery, seawater pools for exercise without weight on the ankle, and 3 to 4 hours from Dubrovnik by adapted van, including the ferry.",
              "Odabrano za Martu jer: rehabilitacija nakon ortopedske operacije, bazeni s morskom vodom za vježbe bez opterećenja gležnja i 3 do 4 sata od Dubrovnika prilagođenim kombijem, uključujući trajekt.",
            )}
          </p>
        </div>
      </section>

      <div className="mt-6">
        <LiveConditions lat={wellnessPlace.lat} lon={wellnessPlace.lon} place="Vela Luka" />
        <SampleNote>{t("Vita uses these readings to move outdoor walks to the best part of the day, or indoors.", "Vita prema ovim podacima premješta šetnje u najbolji dio dana ili u zatvoreno.")}</SampleNote>
      </div>

      <section className="mt-10" aria-labelledby="prog-h">
        <h2 id="prog-h" className="text-xl font-semibold">
          {t("The programme", "Program")}
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {wellnessProgram.map((p, i) => (
            <li
              key={p.day}
              className={`rounded-2xl border border-line p-5 ${i === 0 ? "bg-accent-soft md:col-span-2" : "bg-surface"}`}
            >
              <p className="font-mono text-sm text-ink-3">{p.day}</p>
              <ul className="mt-2 space-y-1">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="trail-h">
        <h2 id="trail-h" className="text-xl font-semibold">
          {t("Paths Marta can actually walk", "Staze kojima Marta stvarno može hodati")}
        </h2>
        <p className="mt-1 max-w-[65ch] text-ink-2">
          {t(
            "Filtered by surface, slope and length from OpenStreetMap, plus ratings from other travellers with reduced mobility. Busy times come from the crowd forecast, including cruise ship days in Dubrovnik.",
            "Filtrirane po podlozi, nagibu i duljini iz OpenStreetMapa, uz ocjene drugih putnika smanjene pokretljivosti. Gužve dolaze iz prognoze, uključujući dane s kruzerima u Dubrovniku.",
          )}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {trails.map((tr, i) => (
            <li key={tr.name} className={`overflow-hidden rounded-2xl border border-line bg-surface ${i === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""}`}>
              <Image src={tr.image} alt={tr.name} width={1920} height={1280} className={`w-full object-cover ${i === 0 ? "h-56 lg:h-full" : "h-48"}`} />
              <div className="p-5">
                <p className="text-sm text-ink-3">{tr.park}</p>
                <h3 className="mt-0.5 text-lg font-medium">{tr.name}</h3>
                <dl className="mt-3 space-y-1.5 text-sm text-ink-2">
                  <div className="flex items-center gap-2">
                    <Path size={18} className="text-ink-3" /> <dt className="sr-only">{t("Surface", "Podloga")}</dt>
                    <dd>{tr.surface}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={18} className="text-ink-3" /> <dt className="sr-only">{t("Length", "Duljina")}</dt>
                    <dd>{tr.length}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendUp size={18} className="text-ink-3" /> <dt className="sr-only">{t("Slope", "Nagib")}</dt>
                    <dd>{tr.slope}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersThree size={18} className="text-ink-3" /> <dt className="sr-only">{t("Crowds", "Gužve")}</dt>
                    <dd>{tr.crowd}</dd>
                  </div>
                </dl>
                <p className="mt-3 flex items-start gap-2 font-medium text-accent">
                  <Wheelchair size={18} className="mt-0.5 shrink-0" /> {tr.fit}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <SampleNote>{t("Trail details and crowd notes are sample data for the demo.", "Podaci o stazama i gužvama su primjeri za demo.")}</SampleNote>
      </section>

      <section className="mt-10" aria-labelledby="more-h">
        <h2 id="more-h" className="text-xl font-semibold">
          {t("Spas and health resorts across Croatia", "Toplice i lječilišta diljem Hrvatske")}
        </h2>
        <p className="mt-1 max-w-[65ch] text-ink-2">
          {t(
            "The same planner works for guests who come for a health stay on purpose, from thermal spas to seaside rehabilitation.",
            "Isti planer radi i za goste koji namjerno dolaze na zdravstveni boravak, od termalnih toplica do rehabilitacije uz more.",
          )}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {otherRehab.map((r) => (
            <li key={r.name}>
              <Image src={r.image} alt={r.name} width={1200} height={900} className={`h-44 w-full rounded-2xl object-cover ${r.image.endsWith("spa.jpg") ? "object-[center_88%]" : ""}`} />
              <p className="mt-3 font-medium">{r.name}</p>
              <p className="text-sm text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <NextStep
        href="/explore"
        label={t("Something to look forward to", "Nešto čemu se radovati")}
        hint={t(
          "Recovery goes better with a goal. Vita suggests a reason to come back off-season.",
          "Oporavak ide bolje uz cilj. Vita predlaže razlog za povratak izvan sezone.",
        )}
      />
    </div>
  );
}
