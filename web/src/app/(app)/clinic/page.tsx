"use client";

import Image from "next/image";
import { CheckCircle, Info, CalendarCheck, FileText } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { MapView, type MapPoint } from "@/components/MapView";
import { useScenario } from "@/data/useScenario";
import { facilities, osmSource } from "@/lib/geo";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT } from "@/lib/i18n";

export default function ClinicPage() {
  const hydrated = useHydrated();
  const t = useT();
  const { clinicMatches, stayOption, apartment } = useScenario();
  const { clinicChoice, setClinic } = useVita();
  // Stored by index, so the choice survives a language switch.
  const chosen = hydrated ? (clinicChoice ?? "0") : "0";

  const hospital = facilities.find((x) => x.id === clinicMatches[0].osmId);
  const points: MapPoint[] = [
    { id: "ap", ...apartment, title: t("Partner hotel", "Partnerski hotel"), subtitle: t("Lapad (sample)", "Lapad (primjer)"), kind: "you" },
    ...(hospital
      ? [{ id: hospital.id, lat: hospital.lat, lon: hospital.lon, title: hospital.name, subtitle: t("Emergency and surgery", "Hitni prijem i kirurgija"), kind: "hospital" as const }]
      : []),
  ];

  const appointments = [
    [t("5 Oct, 10:30", "5. lis., 10:30"), t("Surgical consultation and pre-op tests", "Kirurški pregled i pretrage prije operacije")],
    [t("6 Oct, 08:00", "6. lis., 08:00"), t("Surgery, fixation of the right ankle", "Operacija, fiksacija desnog gležnja")],
    [t("20 Oct", "20. lis."), t("Stitch removal and first check-up", "Vađenje šavova i prva kontrola")],
  ];

  return (
    <div>
      <PageHeader
        module={t("Module 1, trip planner", "Modul 1, planer putovanja")}
        title={t("The right hospital, and a place to recover", "Prava bolnica i mjesto za oporavak")}
        intro={t(
          "Vita compares where the surgery can happen against Marta's profile: the injury, mobility, insurance and the trip itself. Every reason is shown.",
          "Vita uspoređuje gdje se operacija može obaviti prema Martinom profilu: ozljeda, pokretljivost, osiguranje i samo putovanje. Svaki razlog je prikazan.",
        )}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section aria-labelledby="match-h">
          <h2 id="match-h" className="text-xl font-semibold">
            {t("Where to have the surgery", "Gdje obaviti operaciju")}
          </h2>
          <ul className="mt-4 space-y-3">
            {clinicMatches.map((c, i) => {
              const active = chosen === String(i);
              return (
                <li key={c.name}>
                  <button
                    onClick={() => setClinic(String(i))}
                    aria-pressed={active}
                    className={`w-full rounded-2xl border bg-surface p-5 text-left transition ${
                      active ? "border-accent ring-1 ring-accent" : "border-line hover:border-ink-3"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-ink-3">{i === 0 ? t("Best match", "Najbolji izbor") : t(`Option ${i + 1}`, `Mogućnost ${i + 1}`)}</p>
                        <p className="mt-0.5 text-lg font-medium">{c.name}</p>
                        <p className="text-sm text-ink-3">{c.address}</p>
                      </div>
                      <p className="text-right">
                        <span className="block font-mono text-2xl font-semibold text-accent">{c.match}</span>
                        <span className="block text-xs text-ink-3">{t("match", "podudarnost")}</span>
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
            {t(
              `Hospital locations: ${osmSource}. The match score is a demo ranking, not a quality rating.`,
              `Lokacije bolnica: ${osmSource}. Podudarnost je demo poredak, a ne ocjena kvalitete.`,
            )}
          </SampleNote>
        </section>

        <div className="space-y-6">
          <div className="h-[300px] overflow-hidden rounded-2xl border border-line">
            <MapView center={[42.652, 18.074]} zoom={15} points={points} />
          </div>

          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <CalendarCheck size={22} className="text-accent" />
              <h2 className="font-semibold">{t("Appointments", "Termini")}</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {appointments.map(([d, what]) => (
                <li key={d} className="grid grid-cols-[96px_1fr] gap-3">
                  <span className="font-mono text-sm text-ink-2">{d}</span>
                  <span>{what}</span>
                </li>
              ))}
            </ul>
            <SampleNote>{t("Sample slots for the demo.", "Primjeri termina za demo.")}</SampleNote>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-2">
              <FileText size={22} className="text-accent" />
              <h2 className="font-semibold">{t("Records, both ways", "Nalazi u oba smjera")}</h2>
            </div>
            <p className="mt-3 text-ink-2">
              {t(
                "The X-ray report is summarised in German for Marta and her doctor in Vienna. Her own records reach the surgeon in Croatian, with the penicillin allergy at the top.",
                "Nalaz rendgena sažet je na njemačkom za Martu i njezinog liječnika u Beču. Njezini podaci stižu kirurgu na hrvatskom, s alergijom na penicilin na vrhu.",
              )}
            </p>
          </section>
        </div>
      </div>

      <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" aria-labelledby="stay-h">
        <Image
          src="/img/lapad.jpg"
          alt={t("Lapad bay in Dubrovnik at sunset", "Uvala Lapad u Dubrovniku u zalazak sunca")}
          width={1920}
          height={1194}
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <p className="text-sm text-ink-3">
            {t("Where Marta stays", "Gdje Marta boravi")}, {stayOption.tag}
          </p>
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

      <NextStep
        href="/transport"
        label={t("See every move", "Pogledaj svaki prijevoz")}
        hint={t(
          "From the city walls to the flight home: every transfer is checked for steps before it is booked.",
          "Od gradskih zidina do leta kući: svaki prijevoz provjerava se na stepenice prije rezervacije.",
        )}
      />
    </div>
  );
}
