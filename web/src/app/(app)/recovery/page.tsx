"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle, LockSimple, LockSimpleOpen, Stethoscope, Table } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { LineChart } from "@/components/LineChart";
import { ChatPanel } from "@/components/ChatPanel";
import { checkinScript } from "@/lib/scripts";
import { recoveryDays, doctorSummaries, recoveryPhases } from "@/data/scenario";

const BASELINE_HR = 69;

const riskMeta = {
  green: { label: "On track", icon: CheckCircle, cls: "bg-accent-soft text-accent" },
  yellow: { label: "Watch", icon: WarningCircle, cls: "bg-warn-soft text-warn" },
  red: { label: "Act now", icon: WarningCircle, cls: "bg-danger-soft text-danger" },
};

export default function RecoveryPage() {
  const [day, setDay] = useState(6);
  const [showTable, setShowTable] = useState(false);
  const d = recoveryDays.find((r) => r.day === day)!;
  const risk = riskMeta[d.risk];
  const summary = doctorSummaries[day];

  return (
    <div>
      <PageHeader
        module="Module 3, RecoverWell"
        title="Recovery the clinic can see"
        intro="Watch data, a daily check-in and wound photos become one risk level and one short summary for the doctor. It supports the doctor; it does not diagnose."
      />

      <section className="mt-8" aria-labelledby="days-h">
        <h2 id="days-h" className="sr-only">
          Days after surgery
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Day after surgery">
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
                <span className="text-xs text-ink-3">Day</span>
                <span className="font-mono text-lg font-semibold">{r.day}</span>
                <m.icon size={18} weight="fill" className={r.risk === "green" ? "text-accent" : "text-warn"} aria-label={m.label} />
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Day {day} after surgery</h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${risk.cls}`}>
                <risk.icon weight="fill" /> {risk.label}
              </span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["Resting heart rate", `${d.restingHr} bpm`, d.restingHr - BASELINE_HR >= 8],
                ["Sleep", `${d.sleepH} h`, false],
                ["Steps", d.steps.toLocaleString("en"), false],
                ["Pain", `${d.pain} / 10`, d.pain >= 6],
              ].map(([k, v, flag]) => (
                <div key={k as string}>
                  <dt className="text-sm text-ink-3">{k}</dt>
                  <dd className={`font-mono text-xl font-semibold ${flag ? "text-warn" : ""}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-ink-2">
              Wound photo:{" "}
              <span className="text-ink">
                {d.wound === "calm" ? "no visible change" : d.wound === "watch" ? "mild redness at the lower edge, marked for review" : "needs review today"}
              </span>
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="hr-h">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="hr-h" className="font-semibold">
                  Resting heart rate, bpm
                </h2>
                <p className="text-sm text-ink-3">Vita learns Marta&apos;s normal and flags a jump with lower activity.</p>
              </div>
              <button
                onClick={() => setShowTable((v) => !v)}
                aria-pressed={showTable}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-2 hover:bg-surface-2"
              >
                <Table /> {showTable ? "Chart" : "Table"}
              </button>
            </div>
            {showTable ? (
              <table className="mt-4 w-full text-left text-sm">
                <thead className="text-ink-3">
                  <tr>
                    <th className="py-1.5 font-normal">Day</th>
                    <th className="py-1.5 font-normal">Resting HR</th>
                    <th className="py-1.5 font-normal">Pain</th>
                    <th className="py-1.5 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {recoveryDays.map((r) => (
                    <tr key={r.day} className="border-t border-line">
                      <td className="py-1.5">{r.day}</td>
                      <td>{r.restingHr}</td>
                      <td>{r.pain}</td>
                      <td className="font-sans">{riskMeta[r.risk].label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="mt-4">
                <LineChart
                  label="Resting heart rate by day after surgery"
                  data={recoveryDays.map((r) => ({ x: r.day, y: r.restingHr }))}
                  yMin={60}
                  yMax={90}
                  unit="bpm"
                  reference={{ y: BASELINE_HR, label: `Personal baseline ${BASELINE_HR}` }}
                  selected={day}
                  onSelect={setDay}
                />
              </div>
            )}
            <SampleNote>Scripted demo series. In the product this comes from the watch, with consent.</SampleNote>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="doc-h">
            <div className="flex items-center gap-2">
              <Stethoscope size={22} className="text-accent" />
              <h2 id="doc-h" className="font-semibold">
                Summary for Dr. Horvat&apos;s team
              </h2>
            </div>
            {summary ? (
              <p className="mt-3 max-w-[70ch] leading-relaxed text-ink-2">{summary}</p>
            ) : (
              <p className="mt-3 text-ink-3">Pick day 6 or day 10 to see a written summary. Other days: no changes worth reporting.</p>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section aria-labelledby="checkin-h">
            <h2 id="checkin-h" className="text-lg font-semibold">
              Morning check-in
            </h2>
            <ChatPanel script={checkinScript} title="Vita check-in" className="mt-3 h-[420px]" />
          </section>

          <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="phase-h">
            <h2 id="phase-h" className="font-semibold">
              What is unlocked
            </h2>
            <p className="text-sm text-ink-3">Always with the surgeon&apos;s approval.</p>
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
                        <span className="font-mono text-sm text-ink-3">From day {p.fromDay}</span> {p.title}
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

      <NextStep href="/wellness" label="Plan the rehabilitation" hint="Once the surgeon approves, the next stage is rehabilitation in thermal water and in nature." />
    </div>
  );
}
