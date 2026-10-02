"use client";

import Image from "next/image";
import { CheckCircle, Info, CalendarCheck, FileText } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { clinicMatches, stayOption } from "@/data/scenario";
import { facilities, osmSource } from "@/lib/geo";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

const apartment = { lat: 45.8133, lon: 15.9877 };

export default function ClinicPage() {
  const hydrated = useHydrated();
  const { clinicChoice, setClinic } = useVita();
  const chosen = hydrated ? (clinicChoice ?? clinicMatches[0].osmId) : clinicMatches[0].osmId;

  const points: MapPoint[] = [
    { id: "ap", ...apartment, title: "Step-free apartment", subtitle: "Martićeva ulica (sample)", kind: "you" },
    ...clinicMatches.flatMap((c) => {
      const f = facilities.find((x) => x.id === c.osmId);
      return f ? [{ id: f.id, lat: f.lat, lon: f.lon, title: c.name, subtitle: `Match ${c.match}`, kind: "hospital" as const }] : [];
    }),
  ];

  return (
    <div>
      <PageHeader
        module="Module 1, trip planner"
        title="The right clinic, and a place to recover"
        intro="Vita compares clinics against Marta's profile: the injury, mobility, distance and coverage. It answers only from the clinic database and shows why."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section aria-labelledby="match-h">
          <h2 id="match-h" className="text-xl font-semibold">
            Ranked for Marta
          </h2>
          <ul className="mt-4 space-y-3">
            {clinicMatches.map((c, i) => {
              const active = chosen === c.osmId;
              return (
                <li key={c.osmId}>
                  <button
                    onClick={() => setClinic(c.osmId)}
                    aria-pressed={active}
                    className={`w-full rounded-2xl border bg-surface p-5 text-left transition ${
                      active ? "border-accent ring-1 ring-accent" : "border-line hover:border-ink-3"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-ink-3">
                          {i === 0 ? "Best match" : `Option ${i + 1}`}, {c.kind === "public" ? "public hospital" : "private"}
                        </p>
                        <p className="mt-0.5 text-lg font-medium">{c.name}</p>
                        <p className="text-sm text-ink-3">{c.address}</p>
                      </div>
                      <p className="text-right">
                        <span className="block font-mono text-2xl font-semibold text-accent">{c.match}</span>
                        <span className="block text-xs text-ink-3">match</span>
                      </p>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {c.reasons.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-ink-2">
                          <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                          {r}
                        </li>
                      ))}
                      {c.caution && (
                        <li className="flex items-start gap-2 text-ink-2">
                          <Info size={18} weight="fill" className="mt-0.5 shrink-0 text-warn" />
                          {c.caution}
                        </li>
                      )}
                    </ul>
                  </button>
                </li>
              );
            })}
          </ul>
          <SampleNote>
            Hospitals and addresses: {osmSource}. The match score is a demo ranking, not a quality rating.
          </SampleNote>
        </section>

        <div className="space-y-6">
          <div className="h-[340px] overflow-hidden rounded-2xl border border-line">
            <MapView center={[45.818, 15.985]} zoom={12} points={points} />
          </div>

          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <CalendarCheck size={22} className="text-accent" />
              <h2 className="font-semibold">Appointments</h2>
            </div>
            <ul className="mt-4 space-y-3">
              <li className="grid grid-cols-[96px_1fr] gap-3">
                <span className="font-mono text-sm text-ink-2">4 Oct, 10:30</span>
                <span>Surgical consultation and pre-op tests</span>
              </li>
              <li className="grid grid-cols-[96px_1fr] gap-3">
                <span className="font-mono text-sm text-ink-2">5 Oct, 08:00</span>
                <span>Surgery, fixation of the right ankle</span>
              </li>
              <li className="grid grid-cols-[96px_1fr] gap-3">
                <span className="font-mono text-sm text-ink-2">19 Oct</span>
                <span>Stitch removal and first check-up</span>
              </li>
            </ul>
            <SampleNote>Sample slots for the demo.</SampleNote>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <FileText size={22} className="text-accent" />
              <h2 className="font-semibold">Records sent ahead</h2>
            </div>
            <p className="mt-3 text-ink-2">
              Discharge letter and X-ray report from Zadar, with a one-paragraph summary for the surgeon. Penicillin
              allergy highlighted at the top.
            </p>
          </section>
        </div>
      </div>

      <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" aria-labelledby="stay-h">
        <Image
          src="/img/zagreb.jpg"
          alt="Rooftops of central Zagreb"
          width={1920}
          height={1440}
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <p className="text-sm text-ink-3">Where Marta stays, {stayOption.tag}</p>
          <h2 id="stay-h" className="mt-1 text-xl font-semibold">
            {stayOption.title}
          </h2>
          <p className="mt-3 max-w-[60ch] text-ink-2">{stayOption.reason}</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {stayOption.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-accent" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextStep href="/recovery" label="Follow the recovery" hint="After surgery, Vita keeps watching so the clinic does not lose sight of Marta once she leaves." />
    </div>
  );
}
