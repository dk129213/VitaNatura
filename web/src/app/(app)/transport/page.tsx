"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Bell, FileText, AirplaneTilt, Car, Bus, Train, Wheelchair } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { apartment, airport, pileGate } from "@/data/scenario";
import { useScenario } from "@/data/useScenario";
import { useVita, demoProfile, demoProfileHr } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT } from "@/lib/i18n";

const icons = { flight: AirplaneTilt, car: Car, bus: Bus, train: Train };

const verdictStyle = {
  recommended: "bg-accent text-accent-ink",
  possible: "bg-warn-soft text-warn",
  "not-suitable": "bg-danger-soft text-danger",
};
const verdictLabel = {
  recommended: { en: "Recommended", hr: "Preporučeno" },
  possible: { en: "Possible, with limits", hr: "Moguće, uz ograničenja" },
  "not-suitable": { en: "Not suitable", hr: "Nije prikladno" },
};

const line: [number, number][] = [
  [apartment.lat, apartment.lon],
  [42.6475, 18.0905],
  [42.6418, 18.1135],
  [42.627, 18.145],
  [42.6, 18.2],
  [airport.lat, airport.lon],
];

export default function TransportPage() {
  const hydrated = useHydrated();
  const t = useT();
  const { transportOptions, routeSegments, arrangedMoves } = useScenario();
  const { profile, transportChoice, setTransport } = useVita();
  const [open, setOpen] = useState<string>("flight");
  const p = hydrated && profile.mobilityCode ? profile : t.lang === "hr" ? demoProfileHr : demoProfile;
  const chosen = hydrated ? transportChoice : undefined;

  const points: MapPoint[] = [
    { id: "pile", ...pileGate, title: t("Pile Gate", "Vrata od Pila"), subtitle: t("Pick-up point for the Old Town", "Mjesto preuzimanja za Stari grad"), kind: "place" },
    { id: "ap", ...apartment, title: t("Partner hotel", "Partnerski hotel"), subtitle: t("Lapad (sample)", "Lapad (primjer)"), kind: "you" },
    {
      id: "dbv",
      ...airport,
      title: t("Dubrovnik Airport", "Zračna luka Dubrovnik"),
      subtitle: t("Assistance desk, 25 min by adapted taxi", "Šalter za asistenciju, 25 min prilagođenim taksijem"),
      kind: "place",
    },
  ];

  return (
    <div>
      <PageHeader
        module={t("Module 2, AccessRoute", "Modul 2, AccessRoute")}
        title={t("Every move, checked for steps", "Svaki prijevoz, provjeren na stepenice")}
        intro={t(
          "Vita checks each transfer against Marta's mobility profile and the carriers' rules, then shows what is fine and what still needs confirming.",
          "Vita provjerava svaki prijevoz prema Martinom profilu pokretljivosti i pravilima prijevoznika, pa pokazuje što je u redu, a što još treba potvrditi.",
        )}
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <figure>
          <Image src="/img/plane.jpg" alt={t("Croatia Airlines aircraft on the apron", "Zrakoplov Croatia Airlinesa na stajanci")} width={1920} height={1080} className="h-48 w-full rounded-2xl object-cover" />
          <figcaption className="mt-2 text-sm text-ink-3">{t("Flights: assistance booked under EU passenger rights", "Letovi: asistencija prema pravima putnika u EU")}</figcaption>
        </figure>
        <figure>
          <Image src="/img/bus.jpg" alt={t("An intercity coach bound for Dubrovnik", "Međugradski autobus za Dubrovnik")} width={1920} height={1280} className="h-48 w-full rounded-2xl object-cover" />
          <figcaption className="mt-2 text-sm text-ink-3">{t("Coaches, vans and taxis: checked for ramps and space", "Autobusi, kombiji i taksiji: provjereni na rampe i prostor")}</figcaption>
        </figure>
      </div>

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6" aria-labelledby="mob-h">
        <h2 id="mob-h" className="font-semibold">
          {t("Mobility profile used for every search", "Profil pokretljivosti za svaku pretragu")}
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            [t("Code", "Oznaka"), p.mobilityCode, true],
            [t("Weight bearing", "Opterećenje noge"), p.weightBearing, false],
            [t("Steps", "Stepenice"), p.stairs, false],
            [t("Needs", "Potrebe"), t("Leg raised, wheelchair on loan", "Podignuta noga, posuđena kolica"), false],
          ].map(([k, v, code]) => (
            <div key={k as string}>
              <dt className="text-sm text-ink-3">{k}</dt>
              <dd className={code ? "font-mono text-lg font-semibold text-accent" : ""}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8" aria-labelledby="moves-h">
        <h2 id="moves-h" className="text-xl font-semibold">
          {t("Already arranged", "Već dogovoreno")}
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {arrangedMoves.map((m) => (
            <li key={m.title} className="rounded-2xl border border-line bg-surface p-5">
              <p className="flex items-center gap-2 font-mono text-sm text-ink-3">
                <Wheelchair size={18} className="text-accent" /> {m.date}
              </p>
              <p className="mt-2 font-medium">{m.title}</p>
              <p className="mt-1 text-ink-2">{m.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="opt-h">
        <h2 id="opt-h" className="text-xl font-semibold">
          {t("Getting home to Vienna, compared", "Povratak u Beč, usporedba")}
        </h2>
        <ul className="mt-4 space-y-3">
          {transportOptions.map((o) => {
            const Icon = icons[o.id];
            const isOpen = open === o.id;
            return (
              <li key={o.id} className={`rounded-2xl border bg-surface ${chosen === o.id ? "border-accent" : "border-line"}`}>
                <button
                  onClick={() => setOpen(isOpen ? "" : o.id)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-ink-2">
                    <Icon size={22} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{o.title}</span>
                    <span className="block text-sm text-ink-3">
                      {o.duration}. {o.priceNote}
                    </span>
                  </span>
                  <span className={`self-start rounded-full px-3 py-1 text-sm font-medium sm:self-center ${verdictStyle[o.verdict]}`}>
                    {t.b(verdictLabel[o.verdict])}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-line px-5 pb-5 pt-4">
                    <p className="max-w-[65ch] text-ink-2">{o.summary}</p>
                    <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
                      {o.checks.map((c) => (
                        <li key={c.text} className="flex items-start gap-2">
                          {c.ok ? (
                            <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                          ) : (
                            <XCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-warn" />
                          )}
                          <span>{c.text}</span>
                        </li>
                      ))}
                    </ul>
                    {o.verdict !== "not-suitable" && (
                      <button
                        onClick={() => setTransport(o.id)}
                        className="mt-5 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98]"
                      >
                        {chosen === o.id ? t("Selected", "Odabrano") : t("Choose this option", "Odaberi ovu mogućnost")}
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <SampleNote>
          {t(
            "Fares, times and partners are sample data. Assistance rules come from EU Regulations 1107/2006 (air) and 181/2011 (bus and coach).",
            "Cijene, vremena i partneri su primjeri. Pravila asistencije su iz uredbi EU 1107/2006 (zračni prijevoz) i 181/2011 (autobusni prijevoz).",
          )}
        </SampleNote>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" aria-labelledby="route-h">
        <div>
          <h2 id="route-h" className="text-xl font-semibold">
            {t("Door to door, 17 November", "Od vrata do vrata, 17. studenoga")}
          </h2>
          <ol className="mt-4 space-y-3">
            {routeSegments.map((s) => (
              <li key={s.time} className="grid grid-cols-[110px_1fr] gap-3">
                <span className="pt-0.5 font-mono text-sm text-ink-2">{s.time}</span>
                <div className="border-l-2 border-accent pl-4">
                  <p className="font-medium">{s.to}</p>
                  <p className="text-sm text-ink-3">{s.mode}</p>
                  {s.risk && <p className="mt-1 text-sm text-warn">{s.risk}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="h-[340px] overflow-hidden rounded-2xl border border-line">
          <MapView center={[42.61, 18.16]} zoom={11} points={points} line={line} />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <FileText size={22} className="text-accent" />
            <h2 className="font-semibold">{t("Assistance request, filled in for you", "Zahtjev za asistenciju, već ispunjen")}</h2>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {[
              [t("Passenger", "Putnica"), "Marta, 54"],
              [t("Assistance code", "Oznaka asistencije"), p.mobilityCode],
              [t("Wheelchair", "Invalidska kolica"), t("Manual, folding, 14 kg", "Ručna, sklopiva, 14 kg")],
              [t("Seating", "Sjedalo"), t("Front row, right leg raised", "Prvi red, desna noga podignuta")],
              [t("Medical note", "Medicinska napomena"), t("Right ankle fixed by surgery, non-weight-bearing", "Desni gležanj operativno fiksiran, bez opterećenja")],
              [t("Escort", "Pratnja"), t("Thomas (husband), 1 seat", "Thomas (suprug), 1 sjedalo")],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-2">
                <dt className="text-ink-3">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-ink-2">
            {t(
              "Marta only reviews and confirms. Vita also drafts the MEDIF form for the surgeon to sign.",
              "Marta samo pregleda i potvrdi. Vita priprema i MEDIF obrazac koji potpisuje kirurg.",
            )}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-accent" />
            <h2 className="font-semibold">{t("Reminders", "Podsjetnici")}</h2>
          </div>
          <ul className="mt-4 space-y-3">
            <li>
              <p className="font-medium">{t("15 November, 10:00", "15. studenoga, 10:00")}</p>
              <p className="text-ink-2">
                {t(
                  "Last moment to request airport assistance with the 48-hour guarantee.",
                  "Zadnji trenutak za zahtjev za asistenciju u zračnoj luci uz jamstvo od 48 sati.",
                )}
              </p>
            </li>
            <li>
              <p className="font-medium">{t("16 November", "16. studenoga")}</p>
              <p className="text-ink-2">
                {t(
                  "Surgeon signs the MEDIF form. If the airline has not confirmed by 18:00, Vita calls them.",
                  "Kirurg potpisuje MEDIF obrazac. Ako zrakoplovna tvrtka ne potvrdi do 18:00, Vita ih zove.",
                )}
              </p>
            </li>
            <li>
              <p className="font-medium">{t("After the trip", "Nakon putovanja")}</p>
              <p className="text-ink-2">
                {t(
                  "Rate each part of the trip. Ratings teach Vita which partners are really reliable.",
                  "Ocijenite svaki dio putovanja. Ocjene uče Vitu koji su partneri stvarno pouzdani.",
                )}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <NextStep
        href="/recovery"
        label={t("Follow the recovery", "Prati oporavak")}
        hint={t(
          "Between the moves, Vita keeps watching the recovery so the hospital does not lose sight of Marta.",
          "Između prijevoza Vita prati oporavak, da bolnica ne izgubi Martu iz vida.",
        )}
      />
    </div>
  );
}
