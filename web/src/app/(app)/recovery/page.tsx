"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle, LockSimple, LockSimpleOpen, Stethoscope, Table } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { ChatPanel } from "@/components/ChatPanel";
import { useScripts } from "@/lib/useScripts";
import { useScenario } from "@/data/useScenario";
import { useT } from "@/lib/i18n";

const BASELINE_HR = 69;

const riskMeta = {
  green: { label: { en: "On track", hr: "Prema planu" }, icon: CheckCircle, cls: "bg-accent-soft text-accent" },
  yellow: { label: { en: "Watch", hr: "Pratiti" }, icon: WarningCircle, cls: "bg-warn-soft text-warn" },
  red: { label: { en: "Act now", hr: "Hitno djelovati" }, icon: WarningCircle, cls: "bg-danger-soft text-danger" },
};

export default function RecoveryPage() {
  const t = useT();
  const { recoveryDays, doctorSummaries, recoveryPhases } = useScenario();
  const { checkinScript } = useScripts();
  const [day, setDay] = useState(6);
  const [showTable, setShowTable] = useState(false);
  const d = recoveryDays.find((r) => r.day === day)!;
  const risk = riskMeta[d.risk];
  const summary = doctorSummaries[day];

  return (
    <div>
      <PageHeader
        module={t("Module 3, RecoverWell", "Modul 3, RecoverWell")}
        title={t("Recovery the clinic can see", "Oporavak koji klinika vidi")}
        intro={t(
          "The same smartwatch Marta used on her active week, a daily check-in and wound photos become one risk level and one short summary for the doctor. It supports the doctor; it does not diagnose.",
          "Isti pametni sat koji je Marta nosila na aktivnom tjednu, dnevna provjera i fotografije rane postaju jedna razina rizika i jedan kratki sažetak za liječnika. Pomaže liječniku, ne postavlja dijagnozu.",
        )}
      />

      <section className="mt-8" aria-labelledby="days-h">
        <h2 id="days-h" className="sr-only">
          {t("Days after surgery", "Dani nakon operacije")}
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label={t("Day after surgery", "Dan nakon operacije")}>
          {recoveryDays.map((r) => {
            const m = riskMeta[r.risk];
            return (
              <button
                key={r.day}
                role="tab"
                aria-selected={r.day === day}
                onClick={() => setDay(r.day)}
                className={`flex shrink-0 flex-col items-center gap-1 rounded-2xl border px-3.5 py-2.5 transition ${
                  r.day === day ? "border-accent bg-surface ring-1 ring-accent" : "border-line bg-surface hover:border-ink-3"
                }`}
              >
                <span className="text-xs text-ink-3">{t("Day", "Dan")}</span>
                <span className="font-mono text-lg font-semibold">{r.day}</span>
                <m.icon size={18} weight="fill" className={r.risk === "green" ? "text-accent" : "text-warn"} aria-label={t.b(m.label)} />
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{t(`Day ${day} after surgery`, `${day}. dan nakon operacije`)}</h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${risk.cls}`}>
                <risk.icon weight="fill" /> {t.b(risk.label)}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                [t("Resting heart rate", "Puls u mirovanju"), `${d.restingHr} ${t("bpm", "/min")}`, d.restingHr - BASELINE_HR >= 8],
                [t("Sleep", "San"), `${d.sleepH.toLocaleString(t.lang)} h`, false],
                [t("Steps", "Koraci"), d.steps.toLocaleString(t.lang), false],
                [t("Pain", "Bol"), `${d.pain} / 10`, d.pain >= 6],
              ].map(([k, v, flag]) => (
                <div key={k as string}>
                  <dt className="text-sm text-ink-3">{k}</dt>
                  <dd className={`font-mono text-xl font-semibold ${flag ? "text-warn" : ""}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-ink-2">
              {t("Wound photo:", "Fotografija rane:")}{" "}
              <span className="text-ink">
                {d.wound === "calm"
                  ? t("no visible change", "bez vidljive promjene")
                  : d.wound === "watch"
                    ? t("mild redness at the lower edge, marked for review", "blago crvenilo uz donji rub, označeno za pregled")
                    : t("needs review today", "treba pregled danas")}
              </span>
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="hr-h">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="hr-h" className="font-semibold">
                  {t("Resting heart rate, bpm", "Puls u mirovanju, otkucaja u minuti")}
                </h2>
                <p className="text-sm text-ink-3">
                  {t("Vita learns Marta's normal and flags a jump with lower activity.", "Vita uči Martine uobičajene vrijednosti i označi skok uz manju aktivnost.")}
                </p>
              </div>
              <button
                onClick={() => setShowTable((v) => !v)}
                aria-pressed={showTable}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-2 hover:bg-surface-2"
              >
                <Table /> {showTable ? t("Chart", "Grafikon") : t("Table", "Tablica")}
              </button>
            </div>
            {showTable ? (
              <table className="mt-4 w-full text-left text-sm">
                <thead className="text-ink-3">
                  <tr>
                    <th className="py-1.5 font-normal">{t("Day", "Dan")}</th>
                    <th className="py-1.5 font-normal">{t("Resting HR", "Puls u mirovanju")}</th>
                    <th className="py-1.5 font-normal">{t("Pain", "Bol")}</th>
                    <th className="py-1.5 font-normal">{t("Status", "Stanje")}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {recoveryDays.map((r) => (
                    <tr key={r.day} className="border-t border-line">
                      <td className="py-1.5">{r.day}</td>
                      <td>{r.restingHr}</td>
                      <td>{r.pain}</td>
                      <td className="font-sans">{t.b(riskMeta[r.risk].label)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="mt-4">
                <LineChart
                  label={t("Resting heart rate by day after surgery", "Puls u mirovanju po danima nakon operacije")}
                  data={recoveryDays.map((r) => ({ x: r.day, y: r.restingHr }))}
                  yMin={60}
                  yMax={90}
                  unit={t("bpm", "/min")}
                  reference={{ y: BASELINE_HR, label: t(`Personal baseline ${BASELINE_HR}`, `Osobna osnovica ${BASELINE_HR}`) }}
                  xLabel={(x) => t(`Day ${x}`, `${x}. dan`)}
                  selected={day}
                  onSelect={setDay}
                />
              </div>
            )}
            <SampleNote>{t("Scripted demo series. In the product this comes from the watch, with consent.", "Skriptirani demo podaci. U proizvodu dolaze sa sata, uz pristanak.")}</SampleNote>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="doc-h">
            <div className="flex items-center gap-2">
              <Stethoscope size={22} className="text-accent" />
              <h2 id="doc-h" className="font-semibold">
                {t("Summary for Dr. Horvat's team in Dubrovnik", "Sažetak za tim dr. Horvata u Dubrovniku")}
              </h2>
            </div>
            {summary ? (
              <p className="mt-3 max-w-[70ch] leading-relaxed text-ink-2">{summary}</p>
            ) : (
              <p className="mt-3 text-ink-3">
                {t(
                  "Pick day 6 or day 10 to see a written summary. Other days: no changes worth reporting.",
                  "Odaberite 6. ili 10. dan za pisani sažetak. Ostali dani: nema promjena vrijednih prijave.",
                )}
              </p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section aria-labelledby="checkin-h">
            <h2 id="checkin-h" className="text-lg font-semibold">
              {t("Morning check-in", "Jutarnja provjera")}
            </h2>
            <ChatPanel script={checkinScript} title={t("Vita check-in", "Vita provjera")} className="mt-3 h-[420px]" />
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="phase-h">
            <h2 id="phase-h" className="font-semibold">
              {t("What is unlocked", "Što je otključano")}
            </h2>
            <p className="text-sm text-ink-3">{t("Always with the surgeon's approval.", "Uvijek uz odobrenje kirurga.")}</p>
            <ol className="mt-4 space-y-4">
              {recoveryPhases.map((p) => {
                const open = p.unlocked;
                return (
                  <li key={p.title} className="flex gap-3">
                    {open ? (
                      <LockSimpleOpen size={22} className="mt-0.5 shrink-0 text-accent" />
                    ) : (
                      <LockSimple size={22} className="mt-0.5 shrink-0 text-ink-3" />
                    )}
                    <div>
                      <p className="font-medium">
                        <span className="font-mono text-sm text-ink-3">{t(`From day ${p.fromDay}`, `Od ${p.fromDay}. dana`)}</span> {p.title}
                      </p>
                      <p className="text-ink-2">{p.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>

      <NextStep
        href="/wellness"
        label={t("Plan the rehabilitation", "Planiraj rehabilitaciju")}
        hint={t(
          "Once the surgeon approves, the next stage is rehabilitation by the sea on the island of Korčula.",
          "Kad kirurg odobri, sljedeća faza je rehabilitacija uz more na otoku Korčuli.",
        )}
      />
    </div>
  );
}
