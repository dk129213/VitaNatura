"use client";

import { useMemo, useState } from "react";
import { Phone, Translate, IdentificationCard } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { ChatPanel } from "@/components/ChatPanel";
import { useScripts } from "@/lib/useScripts";
import { healthPassport as passportEn, pileGate } from "@/data/scenario";
import { healthPassport as passportHrData } from "@/data/scenario.hr";
import { useScenario } from "@/data/useScenario";
import { facilities, typeLabel, osmSource } from "@/lib/geo";
import { useT } from "@/lib/i18n";

const filters = [
  { id: "care", en: "Hospitals and clinics", hr: "Bolnice i ambulante", types: ["hospital", "clinic", "doctors"] },
  { id: "pharmacy", en: "Pharmacies", hr: "Ljekarne", types: ["pharmacy"] },
  { id: "dentist", en: "Dentists", hr: "Stomatolozi", types: ["dentist"] },
];

// The passport is always shown to the doctor in Croatian, whatever the app language is.
const rows = [
  { key: "allergies", en: "Allergies", hr: "Alergije" },
  { key: "medication", en: "Medication", hr: "Lijekovi" },
  { key: "conditions", en: "Conditions", hr: "Bolesti" },
  { key: "bloodType", en: "Blood type", hr: "Krvna grupa" },
] as const;

const value = (p: typeof passportEn, k: (typeof rows)[number]["key"]) => (k === "bloodType" ? p.bloodType : p[k].join(", "));

export default function HelpPage() {
  const t = useT();
  const { emergencyNumbers, incident } = useScenario();
  const { triageScript } = useScripts();
  const [filter, setFilter] = useState("care");
  const [croatian, setCroatian] = useState(false);
  const showHr = croatian || t.lang === "hr";

  const nearby = useMemo(() => {
    const types = filters.find((f) => f.id === filter)!.types;
    return facilities
      .filter((f) => f.region === "dubrovnik" && types.includes(f.type))
      // Of the doctors' practices, keep public outpatient clinics (ambulanta), not private individuals.
      .filter((f) => f.type !== "doctors" || /ambulanta/i.test(f.name))
      .map((f) => ({ ...f, drive: (f as { driveMin?: number }).driveMin ?? 0 }))
      // Hospitals first: for anything serious they are where Marta needs to go.
      .sort((a, b) => Number(b.type === "hospital") - Number(a.type === "hospital") || a.drive - b.drive)
      .slice(0, 6);
  }, [filter]);

  const points: MapPoint[] = [
    { id: "you", lat: incident.lat, lon: incident.lon, title: t("Marta is here", "Marta je ovdje"), subtitle: incident.place, kind: "you" },
    {
      id: "pile",
      lat: pileGate.lat,
      lon: pileGate.lon,
      title: t("Pile Gate", "Vrata od Pila"),
      subtitle: t("Ambulance and taxi pick-up, the Old Town is car-free", "Mjesto za hitnu i taksi, Stari grad je bez automobila"),
      kind: "place",
    },
    ...nearby.map((f) => ({
      id: f.id,
      lat: f.lat,
      lon: f.lon,
      title: f.name,
      subtitle: t(`${typeLabel[f.type].en}, ${f.drive} min by car`, `${typeLabel[f.type].hr}, ${f.drive} min autom`),
      kind: f.type as MapPoint["kind"],
    })),
  ];

  return (
    <div>
      <PageHeader
        module={t("Module 6", "Modul 6")}
        title={t("Help on the road", "Pomoć na putu")}
        intro={t(
          "Active holidays carry some risk, so every guest gets the same safety net: who to call, where to go, and how to explain it in Croatian.",
          "Aktivni odmor nosi neki rizik, pa svaki gost ima istu sigurnosnu mrežu: koga nazvati, kamo ići i kako to objasniti na hrvatskom.",
        )}
      />

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {emergencyNumbers.map((n) => (
          <a
            key={n.number}
            href={`tel:${n.number}`}
            className="flex items-center gap-4 rounded-2xl border border-danger/30 bg-danger-soft p-5 transition active:scale-[0.99]"
          >
            <span className="grid size-12 place-items-center rounded-full bg-danger text-white">
              <Phone size={22} weight="fill" />
            </span>
            <span>
              <span className="block font-mono text-2xl font-semibold text-danger">{n.number}</span>
              <span className="block text-ink">{n.label}</span>
              <span className="block text-sm text-ink-2">{n.note}</span>
            </span>
          </a>
        ))}
      </div>

      <section className="mt-10" aria-labelledby="near-h">
        <h2 id="near-h" className="text-xl font-semibold">
          {t("Nearest help from the Old Town", "Najbliža pomoć od Starog grada")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label={t("Type of help", "Vrsta pomoći")}>
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === f.id ? "bg-accent text-accent-ink" : "border border-line bg-surface text-ink-2 hover:bg-surface-2"
              }`}
            >
              {t(f.en, f.hr)}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="h-[420px] overflow-hidden rounded-2xl border border-line">
            <MapView center={[42.648, 18.092]} zoom={14} points={points} />
          </div>
          <ul className="space-y-2">
            {nearby.map((f) => (
              <li key={f.id} className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{f.name}</p>
                  <span className="shrink-0 font-mono text-sm text-ink-2">{f.drive} min</span>
                </div>
                <p className="mt-0.5 text-sm text-ink-3">
                  {t.b(typeLabel[f.type])}
                  {f.emergency && <span className="font-medium text-danger">{t(" with emergency department", " s hitnim prijemom")}</span>}
                  {f.hours && <span>, {f.hours}</span>}
                </p>
                {f.name === "Opća bolnica Dubrovnik" && (
                  <p className="mt-2 text-sm text-ink-2">
                    {t("Nearest X-ray and emergency department for a suspected fracture.", "Najbliži rendgen i hitni prijem kod sumnje na prijelom.")}
                  </p>
                )}
                {f.name.startsWith("Turistička ambulanta") && (
                  <p className="mt-2 text-sm text-ink-2">
                    {t("Tourist clinic inside the Old Town, for problems that are not emergencies.", "Turistička ambulanta u Starom gradu, za tegobe koje nisu hitne.")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <SampleNote>
          {t(
            `Places, opening hours and phone numbers: ${osmSource}. Drive times from Pile Gate: OSRM routing on OpenStreetMap roads.`,
            `Mjesta, radno vrijeme i telefoni: ${osmSource}. Vrijeme vožnje od Vrata od Pila: OSRM rute po cestama iz OpenStreetMapa.`,
          )}
        </SampleNote>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section aria-labelledby="triage-h">
          <h2 id="triage-h" className="text-xl font-semibold">
            {t("Where should I go?", "Kamo trebam ići?")}
          </h2>
          <p className="mt-1 text-ink-2">
            {t("Triage in any language. Serious signs always lead to 112.", "Trijaža na bilo kojem jeziku. Ozbiljni znakovi uvijek vode na 112.")}
          </p>
          <ChatPanel script={triageScript} title={t("Vita triage", "Vita trijaža")} className="mt-4 h-[520px]" />
        </section>

        <section aria-labelledby="passport-h">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="passport-h" className="text-xl font-semibold">
                {t("Health passport", "Zdravstvena putovnica")}
              </h2>
              <p className="mt-1 text-ink-2">
                {t("Stored on Marta's phone. Shared only with her consent.", "Spremljena na Martinom mobitelu. Dijeli se samo uz njezin pristanak.")}
              </p>
            </div>
            {t.lang === "en" && (
              <button
                onClick={() => setCroatian((v) => !v)}
                aria-pressed={croatian}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
              >
                <Translate /> {croatian ? "Show English" : "Show to doctor in Croatian"}
              </button>
            )}
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-3">
              <IdentificationCard size={28} className="text-accent" />
              <p className="font-medium">{showHr ? "Zdravstvena putovnica: Marta, 54" : "Health passport: Marta, 54"}</p>
            </div>
            <dl className="mt-5 space-y-3">
              {rows.map((r) => (
                <div key={r.key} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[140px_1fr]">
                  <dt className="text-sm text-ink-3">{showHr ? r.hr : r.en}</dt>
                  <dd className={r.key === "allergies" ? "font-semibold text-danger" : ""}>
                    {value(showHr ? passportHrData : passportEn, r.key)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-medium">{t("Who pays?", "Tko plaća?")}</h3>
            <ul className="mt-2 space-y-2 text-ink-2">
              <li>
                <span className="text-ink">{t("Marta and other EU visitors", "Marta i drugi posjetitelji iz EU")}</span>{" "}
                {t(
                  "use the European Health Insurance Card (EHIC). Necessary care in public hospitals is covered on the same terms as for locals, including co-payments.",
                  "koriste Europsku karticu zdravstvenog osiguranja (EHIC). Nužna skrb u javnim bolnicama pokrivena je pod istim uvjetima kao za domaće, uključujući participaciju.",
                )}
              </li>
              <li>
                <span className="text-ink">{t("Visitors from outside the EU", "Posjetitelji izvan EU")}</span>{" "}
                {t(
                  "need travel insurance, unless their country has an agreement with Croatia. Vita checks this from the passport country.",
                  "trebaju putno osiguranje, osim ako njihova zemlja nema sporazum s Hrvatskom. Vita to provjerava prema državi putovnice.",
                )}
              </li>
              <li>
                <span className="text-ink">{t("Transport home, private clinics and rescue", "Prijevoz kući, privatne klinike i spašavanje")}</span>{" "}
                {t(
                  "usually need travel insurance. Vita keeps the policy and the insurer's number here.",
                  "obično traže putno osiguranje. Vita ovdje čuva policu i broj osiguravatelja.",
                )}
              </li>
            </ul>
          </div>
        </section>
      </div>

      <NextStep
        href="/clinic"
        label={t("See the surgery plan", "Pogledaj plan operacije")}
        hint={t(
          "The ankle is splinted. Next: where the surgery happens and where Marta can stay without steps.",
          "Gležanj je imobiliziran. Sljedeće: gdje će biti operacija i gdje Marta može boraviti bez stepenica.",
        )}
      />
    </div>
  );
}
