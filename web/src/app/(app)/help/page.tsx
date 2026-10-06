"use client";

import { useState } from "react";
import { Phone, Translate, IdentificationCard, NavigationArrow } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { ChatPanel } from "@/components/ChatPanel";
import { triageScript } from "@/lib/scripts";
import { emergencyNumbers, healthPassport, healthPassportHr, incident, firstHour } from "@/data/scenario";
import { facilities, typeLabel, osmSource } from "@/lib/geo";

const rows = [
  { key: "allergies", en: "Allergies", hr: "Alergije" },
  { key: "medication", en: "Medication", hr: "Lijekovi" },
  { key: "conditions", en: "Conditions", hr: "Bolesti" },
  { key: "bloodType", en: "Blood type", hr: "Krvna grupa" },
] as const;

const value = (p: typeof healthPassport, k: (typeof rows)[number]["key"]) => (k === "bloodType" ? p.bloodType : p[k].join(", "));

// Places near the jetty, plus the hospital in Dubrovnik. One of each pharmacy chain is enough.
const nearby = facilities.filter((f, i, all) => all.findIndex((g) => g.name === f.name) === i);

export default function HelpPage() {
  const [croatian, setCroatian] = useState(false);

  const points: MapPoint[] = [
    { id: "you", lat: incident.lat, lon: incident.lon, title: "Marta is here", subtitle: `${incident.place}, no street address`, kind: "you" },
    ...nearby.map((f) => ({
      id: f.id,
      lat: f.lat,
      lon: f.lon,
      title: f.name,
      subtitle: `${typeLabel[f.type]}, ${f.driveMin} min by car`,
      kind: f.type as MapPoint["kind"],
    })),
  ];

  return (
    <div>
      <PageHeader
        module="We care"
        title="Help on the road, far from the city"
        intro="Our tours go where there are no street names and few English speakers. If someone gets hurt, our guide and Vita find the right help and rearrange the rest of the trip."
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

      <section className="mt-10" aria-labelledby="hour-h">
        <h2 id="hour-h" className="text-xl font-semibold">
          Marta&apos;s first hour, on the photo safari
        </h2>
        <p className="mt-1 text-ink-2">{incident.when}</p>
        <ol className="mt-4 space-y-3">
          {firstHour.map((s) => (
            <li key={s.time} className="grid grid-cols-[64px_1fr] gap-3">
              <span className="pt-0.5 font-mono text-sm text-ink-2">{s.time}</span>
              <p className="border-l-2 border-accent pl-4">{s.what}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="near-h">
        <h2 id="near-h" className="text-xl font-semibold">
          Nearest help from the jetty in Opuzen
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="h-[420px] overflow-hidden rounded-2xl border border-line">
            <MapView center={[42.9, 17.75]} zoom={9} points={points} />
          </div>
          <ul className="space-y-2">
            {nearby.map((f) => (
              <li key={f.id} className="rounded-2xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{f.name}</p>
                  <span className="shrink-0 font-mono text-sm text-ink-2">{f.driveMin} min</span>
                </div>
                <p className="mt-0.5 text-sm text-ink-3">
                  {typeLabel[f.type]}
                  {f.emergency && <span className="font-medium text-danger"> with emergency department</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 flex items-start gap-2 text-sm text-ink-2">
          <NavigationArrow size={18} className="mt-0.5 shrink-0 text-accent" />
          The jetty has no address, so Vita shares the exact GPS position ({incident.lat}, {incident.lon}) with 112 and the
          driver.
        </p>
        <SampleNote>Places: {osmSource}. Drive times from the jetty in Opuzen: OSRM routing on OpenStreetMap roads.</SampleNote>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section aria-labelledby="triage-h">
          <h2 id="triage-h" className="text-xl font-semibold">
            Where should I go?
          </h2>
          <p className="mt-1 text-ink-2">Triage in any language. Serious signs always lead to 112.</p>
          <ChatPanel script={triageScript} title="Vita triage" className="mt-4 h-[500px]" />
        </section>

        <section aria-labelledby="passport-h">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="passport-h" className="text-xl font-semibold">
                Health passport
              </h2>
              <p className="mt-1 text-ink-2">On the guest&apos;s phone, shared only with consent.</p>
            </div>
            <button
              onClick={() => setCroatian((v) => !v)}
              aria-pressed={croatian}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
            >
              <Translate /> {croatian ? "Show English" : "Show the doctor in Croatian"}
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-3">
              <IdentificationCard size={28} className="text-accent" />
              <p className="font-medium">Marta, 54</p>
            </div>
            <dl className="mt-5 space-y-3">
              {rows.map((r) => (
                <div key={r.key} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[140px_1fr]">
                  <dt className="text-sm text-ink-3">{croatian ? r.hr : r.en}</dt>
                  <dd className={r.key === "allergies" ? "font-semibold text-danger" : ""}>
                    {value(croatian ? healthPassportHr : healthPassport, r.key)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-medium">Who pays?</h3>
            <ul className="mt-2 space-y-2 text-ink-2">
              <li>
                <span className="text-ink">EU visitors</span> use the European Health Insurance Card: necessary care in
                public hospitals on the same terms as for locals.
              </li>
              <li>
                <span className="text-ink">Everyone else</span> needs travel insurance. Every booking reminds guests to bring
                it.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <NextStep href="/start" label="Try Marta's chat" hint="See how Vita turns one message into help, and a new plan for the rest of the week." />
    </div>
  );
}
