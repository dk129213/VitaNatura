"use client";

import { useMemo, useState } from "react";
import { Phone, Translate, IdentificationCard } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { ChatPanel } from "@/components/ChatPanel";
import { triageScript } from "@/lib/scripts";
import { emergencyNumbers, healthPassport, incident, pileGate } from "@/data/scenario";
import { facilities, typeLabel, osmSource } from "@/lib/geo";

const filters = [
  { id: "care", label: "Hospitals and clinics", types: ["hospital", "clinic", "doctors"] },
  { id: "pharmacy", label: "Pharmacies", types: ["pharmacy"] },
  { id: "dentist", label: "Dentists", types: ["dentist"] },
];

const passportHr = {
  Allergies: ["Alergije", "Penicilin"],
  Medication: ["Lijekovi", "Levotiroksin 75 mcg, svako jutro"],
  Conditions: ["Bolesti", "Hipotireoza, dobro regulirana"],
  "Blood type": ["Krvna grupa", "A+"],
};

export default function HelpPage() {
  const [filter, setFilter] = useState("care");
  const [croatian, setCroatian] = useState(false);

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
    { id: "you", lat: incident.lat, lon: incident.lon, title: "Marta is here", subtitle: incident.place, kind: "you" },
    { id: "pile", lat: pileGate.lat, lon: pileGate.lon, title: "Pile Gate", subtitle: "Ambulance and taxi pick-up, the Old Town is car-free", kind: "place" },
    ...nearby.map((f) => ({
      id: f.id,
      lat: f.lat,
      lon: f.lon,
      title: f.name,
      subtitle: `${typeLabel[f.type]}, ${f.drive} min by car`,
      kind: f.type as MapPoint["kind"],
    })),
  ];

  return (
    <div>
      <PageHeader
        module="Module 6"
        title="Help on the road"
        intro="Every traveller gets the same safety net: who to call, where to go, and how to explain it in Croatian."
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
          Nearest help from the Old Town
        </h2>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Type of help">
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
              {f.label}
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
                  {typeLabel[f.type]}
                  {f.emergency && <span className="font-medium text-danger"> with emergency department</span>}
                  {f.hours && <span>, {f.hours}</span>}
                </p>
                {f.name === "Opća bolnica Dubrovnik" && (
                  <p className="mt-2 text-sm text-ink-2">Nearest X-ray and emergency department for a suspected fracture.</p>
                )}
                {f.name.startsWith("Turistička ambulanta") && (
                  <p className="mt-2 text-sm text-ink-2">Tourist clinic inside the Old Town, for problems that are not emergencies.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <SampleNote>Places, opening hours and phone numbers: {osmSource}. Drive times from Pile Gate: OSRM routing on OpenStreetMap roads.</SampleNote>
      </section>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section aria-labelledby="triage-h">
          <h2 id="triage-h" className="text-xl font-semibold">
            Where should I go?
          </h2>
          <p className="mt-1 text-ink-2">Triage in any language. Serious signs always lead to 112.</p>
          <ChatPanel script={triageScript} title="Vita triage" className="mt-4 h-[520px]" />
        </section>

        <section aria-labelledby="passport-h">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="passport-h" className="text-xl font-semibold">
                Health passport
              </h2>
              <p className="mt-1 text-ink-2">Stored on Marta&apos;s phone. Shared only with her consent.</p>
            </div>
            <button
              onClick={() => setCroatian((v) => !v)}
              aria-pressed={croatian}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
            >
              <Translate /> {croatian ? "Show English" : "Show to doctor in Croatian"}
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-3">
              <IdentificationCard size={28} className="text-accent" />
              <p className="font-medium">{croatian ? "Zdravstvena putovnica: Marta, 54" : "Health passport: Marta, 54"}</p>
            </div>
            <dl className="mt-5 space-y-3">
              {(Object.keys(passportHr) as (keyof typeof passportHr)[]).map((k) => {
                const en =
                  k === "Allergies"
                    ? healthPassport.allergies.join(", ")
                    : k === "Medication"
                      ? healthPassport.medication.join(", ")
                      : k === "Conditions"
                        ? healthPassport.conditions.join(", ")
                        : healthPassport.bloodType;
                return (
                  <div key={k} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[140px_1fr]">
                    <dt className="text-sm text-ink-3">{croatian ? passportHr[k][0] : k}</dt>
                    <dd className={k === "Allergies" ? "font-semibold text-danger" : ""}>
                      {croatian ? passportHr[k][1] : en}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-medium">Who pays?</h3>
            <ul className="mt-2 space-y-2 text-ink-2">
              <li>
                <span className="text-ink">Marta and other EU visitors</span> use the European Health Insurance Card (EHIC).
                Necessary care in public hospitals is covered on the same terms as for locals, including co-payments.
              </li>
              <li>
                <span className="text-ink">Visitors from outside the EU</span> need travel insurance, unless their country has an
                agreement with Croatia. Vita checks this from the passport country.
              </li>
              <li>
                <span className="text-ink">Transport home, private clinics and rescue</span> usually need travel
                insurance. Vita keeps the policy and the insurer&apos;s number here.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <NextStep
        href="/clinic"
        label="See the surgery plan"
        hint="The ankle is splinted. Next: where the surgery happens and where Marta can stay without steps."
      />
    </div>
  );
}
