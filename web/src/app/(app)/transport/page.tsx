"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Bell, FileText, Van, AirplaneTilt, Ambulance, Bus } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { transportOptions, routeSegments } from "@/data/scenario";
import { useVita, demoProfile } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

const icons = { van: Van, medical: Ambulance, flight: AirplaneTilt, bus: Bus };

const verdictStyle = {
  recommended: "bg-accent text-accent-ink",
  possible: "bg-warn-soft text-warn",
  "not-suitable": "bg-danger-soft text-danger",
};
const verdictLabel = { recommended: "Recommended", possible: "Possible, with limits", "not-suitable": "Not suitable" };

const points: MapPoint[] = [
  { id: "zd", lat: 44.10747, lon: 15.23468, title: "Opća bolnica Zadar", subtitle: "Pick-up, 08:45", kind: "hospital" },
  { id: "r1", lat: 44.56, lon: 15.43, title: "A1 rest area in Lika", subtitle: "Accessible toilet", kind: "place" },
  { id: "r2", lat: 45.43, lon: 15.49, title: "A1 rest area near Karlovac", subtitle: "Short stop", kind: "place" },
  { id: "ap", lat: 45.8133, lon: 15.9877, title: "Step-free apartment", subtitle: "Martićeva ulica (sample)", kind: "you" },
];
const line: [number, number][] = [
  [44.10747, 15.23468],
  [44.25, 15.55],
  [44.56, 15.43],
  [45.0, 15.33],
  [45.43, 15.49],
  [45.65, 15.75],
  [45.8133, 15.9877],
];

export default function TransportPage() {
  const hydrated = useHydrated();
  const { profile, transportChoice, setTransport } = useVita();
  const [open, setOpen] = useState<string>("van");
  const p = hydrated && profile.mobilityCode ? profile : demoProfile;
  const chosen = hydrated ? transportChoice : undefined;

  return (
    <div>
      <PageHeader
        module="Module 2, AccessRoute"
        title="Zadar to Zagreb, every step checked"
        intro="Vita checks each option against Marta's mobility profile and the carriers' rules, then shows what is fine and what still needs confirming."
      />

      <section className="mt-8 rounded-2xl border border-line bg-surface p-6" aria-labelledby="mob-h">
        <h2 id="mob-h" className="font-semibold">
          Mobility profile used for this search
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["Code", p.mobilityCode],
            ["Weight bearing", p.weightBearing],
            ["Steps", p.stairs],
            ["Needs", "Leg elevated, wheelchair on loan"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm text-ink-3">{k}</dt>
              <dd className={k === "Code" ? "font-mono text-lg font-semibold text-accent" : ""}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8" aria-labelledby="opt-h">
        <h2 id="opt-h" className="text-xl font-semibold">
          Options compared
        </h2>
        <ul className="mt-4 space-y-3">
          {transportOptions.map((o) => {
            const Icon = icons[o.id as keyof typeof icons];
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
                    {verdictLabel[o.verdict]}
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
                        {chosen === o.id ? "Selected" : "Choose this option"}
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <SampleNote>
          Prices and the partner are sample data. Assistance rules come from EU Regulations 1107/2006 (air) and 181/2011
          (bus and coach).
        </SampleNote>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" aria-labelledby="route-h">
        <div>
          <h2 id="route-h" className="text-xl font-semibold">
            Door to door, 3 October
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
        <div className="h-[380px] overflow-hidden rounded-2xl border border-line">
          <MapView center={[45.0, 15.6]} zoom={7} points={points} line={line} />
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <FileText size={22} className="text-accent" />
            <h2 className="font-semibold">Booking request, filled in for you</h2>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            {[
              ["Passenger", "Marta, 54"],
              ["Assistance code", p.mobilityCode],
              ["Wheelchair", "Manual, folding, 14 kg (hospital loan)"],
              ["Seating", "Reclining, right leg elevated"],
              ["Medical note", "Splinted right ankle fracture, non-weight-bearing"],
              ["Escort", "Husband, 1 seat"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-2">
                <dt className="text-ink-3">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-ink-2">Marta only reviews and confirms. For flights Vita also drafts the MEDIF form for the doctor to sign.</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <Bell size={22} className="text-accent" />
            <h2 className="font-semibold">Reminders</h2>
          </div>
          <ul className="mt-4 space-y-3">
            <li>
              <p className="font-medium">Today, 18:00</p>
              <p className="text-ink-2">Ask the ward for a discharge letter and a wheelchair loan form.</p>
            </li>
            <li>
              <p className="font-medium">Tomorrow, 08:15</p>
              <p className="text-ink-2">Driver confirms arrival. If not confirmed by 08:20, Vita calls the backup partner.</p>
            </li>
            <li>
              <p className="font-medium">After the trip</p>
              <p className="text-ink-2">Rate each part of the trip. Ratings teach Vita which partners are really reliable.</p>
            </li>
          </ul>
        </div>
      </section>

      <NextStep href="/clinic" label="See the clinic plan" hint="Arriving in Zagreb at 12:20. Next: where the surgery happens and where Marta stays." />
    </div>
  );
}
