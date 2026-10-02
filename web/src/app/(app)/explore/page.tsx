"use client";

import { useState } from "react";
import Image from "next/image";
import { Wheelchair, Translate, CalendarBlank, Leaf } from "@phosphor-icons/react";
import { PageHeader, SampleNote } from "@/components/ui";
import { harvestCalendar, farmMatches } from "@/data/scenario";

const effortLabel = { low: "Light", medium: "Moderate", high: "Demanding" };

export default function ExplorePage() {
  const [onlyFit, setOnlyFit] = useState(true);
  const farms = onlyFit ? farmMatches.filter((f) => f.accessible && f.effort === "low") : farmMatches;

  return (
    <div>
      <PageHeader
        module="Module 5, crowd-free trips"
        title="Croatia without the crowds, all year"
        intro="For any traveller who prefers a family farm to a cruise-day old town. Vita matches farms by activity, effort, languages and access."
      />

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <Image
          src="/img/olive-tree.jpg"
          alt="An old olive tree in Kaštela"
          width={800}
          height={1067}
          className="h-64 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Matched for Marta</h2>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={onlyFit}
                onChange={(e) => setOnlyFit(e.target.checked)}
                className="size-4 accent-[var(--accent)]"
              />
              Only what fits her recovery
            </label>
          </div>
          <p className="mt-1 text-ink-2">
            She asked for &quot;a quiet week with olives, nothing strenuous&quot;. For next autumn, Vita keeps to step-free places where picking is optional.
          </p>

          <ul className="mt-5 space-y-3">
            {farms.map((f) => (
              <li key={f.name} className="rounded-2xl border border-line p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-sm text-ink-3">{f.region}</p>
                  </div>
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-sm">{effortLabel[f.effort]} effort</span>
                </div>
                <p className="mt-2">{f.activity}</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-2">
                  <li className="flex items-center gap-1.5">
                    <CalendarBlank /> {f.when}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Translate /> {f.languages}
                  </li>
                  <li className={`flex items-center gap-1.5 ${f.accessible ? "text-accent" : "text-warn"}`}>
                    <Wheelchair /> {f.accessible ? "Step-free" : "Not step-free"}
                  </li>
                </ul>
                <p className="mt-2 text-sm text-ink-3">{f.note}</p>
              </li>
            ))}
          </ul>
          <SampleNote>Farms are sample entries. Guests take part as a tourist experience, not as workers.</SampleNote>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="cal-h">
        <h2 id="cal-h" className="text-xl font-semibold">
          What is happening when
        </h2>
        <p className="mt-1 text-ink-2">Real harvest dates move with the weather, so Vita confirms them with the farm a week ahead.</p>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {harvestCalendar.map((h) => {
            const now = h.months === "Sep - Oct";
            return (
              <li
                key={h.months}
                className={`rounded-2xl border p-5 ${now ? "border-accent bg-accent-soft" : "border-line bg-surface"}`}
              >
                <p className="flex items-center gap-2 font-mono text-sm text-ink-2">
                  <Leaf className={now ? "text-accent" : "text-ink-3"} /> {h.months}
                  {now && <span className="font-sans font-medium text-accent">Now</span>}
                </p>
                <p className="mt-2 font-medium">{h.what}</p>
                <p className="mt-1 text-sm text-ink-3">{h.where}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-10 rounded-2xl bg-surface-2 p-6">
        <h2 className="text-lg font-semibold">Why this matters for Croatia</h2>
        <p className="mt-2 max-w-[70ch] text-ink-2">
          Guests like Marta stay longer, travel outside July and August, and spend with local families instead of in
          the busiest old towns. Each trip report shows the local spend and the crowds avoided.
        </p>
      </section>
    </div>
  );
}
