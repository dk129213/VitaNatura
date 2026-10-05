"use client";

import { useState } from "react";
import Image from "next/image";
import { Wheelchair, Translate, CalendarBlank, Leaf, Boat, Recycle, CheckCircle, ArrowSquareOut } from "@phosphor-icons/react";
import { PageHeader, SampleNote } from "@/components/ui";
import { harvestCalendar, farmMatches } from "@/data/scenario";

const effortLabel = { low: "Light", medium: "Moderate", high: "Demanding" };

const harvests = [
  { image: "/img/mandarins.jpg", alt: "Ripe mandarins on the tree", title: "Mandarins", where: "Neretva valley, October to December" },
  { image: "/img/grapes.jpg", alt: "Freshly picked grapes poured from a crate", title: "Grapes", where: "Pelješac and Konavle, September and October" },
  { image: "/img/olives.jpg", alt: "Picked olives on a net", title: "Olives", where: "Pelješac and Korčula, October and November" },
];

export default function ExplorePage() {
  const [onlyFit, setOnlyFit] = useState(true);
  const farms = onlyFit ? farmMatches.filter((f) => f.accessible && f.effort === "low") : farmMatches;

  return (
    <div>
      <PageHeader
        module="Module 5, crowd-free trips"
        title="The Dubrovnik region without the crowds"
        intro="For any traveller who prefers a family farm to the Old Town on a cruise day. Vita matches farms by activity, effort, languages and access."
      />

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {harvests.map((h) => (
          <li key={h.title}>
            <Image src={h.image} alt={h.alt} width={1920} height={1280} className="h-48 w-full rounded-2xl object-cover" />
            <p className="mt-3 font-medium">{h.title}</p>
            <p className="text-sm text-ink-2">{h.where}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-2xl border border-line bg-surface p-6 md:p-8" aria-labelledby="match-h">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="match-h" className="text-xl font-semibold">
            Matched for Marta
          </h2>
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
        <p className="mt-1 max-w-[65ch] text-ink-2">
          She asked for &quot;a reason to come back, something quiet with olives&quot;. For next autumn, Vita keeps to
          step-free places where picking is optional.
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {farms.map((f) => (
            <li key={f.name} className="overflow-hidden rounded-2xl border border-line sm:grid sm:grid-cols-[160px_1fr]">
              <Image src={f.image} alt="" width={640} height={480} className="h-40 w-full object-cover sm:h-full" />
              <div className="p-5">
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
              </div>
            </li>
          ))}
        </ul>
        <SampleNote>Farms are sample entries. Guests take part as a tourist experience, not as workers.</SampleNote>
      </section>

      <section
        className="mt-10 overflow-hidden rounded-2xl border border-accent/40 bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
        aria-labelledby="gss-h"
      >
        <div className="p-6 md:order-first md:p-8">
          <Recycle size={26} className="text-accent" />
          <h2 id="gss-h" className="mt-3 text-xl font-semibold">
            Give back to the sea with Green Sea Safari
          </h2>
          <p className="mt-2 max-w-[60ch] text-ink-2">
            A Dubrovnik project that takes guests by boat to isolated beaches and bays of the Elaphiti islands to collect
            plastic and other waste, with swimming and snorkelling on the way.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 2xl:grid-cols-2">
            {[
              "Trips and membership are free",
              "Daily, 1 June to 30 September",
              "09:30 from the Batala pontoon, about 4 hours",
              "Gloves and aqua shoes provided",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2 text-ink-2">
            <Wheelchair size={18} className="mt-0.5 shrink-0 text-warn" />
            Needs swimming and stepping into a boat, so Vita suggests it to Thomas next summer, and to Marta once she
            has fully recovered.
          </p>
          <a
            href="https://greenseasafari.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98]"
          >
            Visit Green Sea Safari <ArrowSquareOut weight="bold" />
          </a>
          <SampleNote>Trip details from greenseasafari.com, October 2026. Photo: Lopud, one of the Elaphiti islands.</SampleNote>
        </div>
        <Image
          src="/img/elaphiti.jpg"
          alt="A clear bay on Lopud, one of the Elaphiti islands near Dubrovnik"
          width={1920}
          height={1279}
          className="h-56 w-full object-cover md:h-full"
        />
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Image src="/img/neretva.jpg" alt="Mandarin orchards and channels in the Neretva delta" width={1920} height={1280} className="h-56 w-full object-cover md:h-full" />
        <div className="p-6 md:p-8">
          <Boat size={26} className="text-accent" />
          <h2 className="mt-3 text-xl font-semibold">Three cruise ships in port tomorrow?</h2>
          <p className="mt-2 text-ink-2">
            Vita sees the crowd forecast for the Old Town and suggests the Neretva delta, Ston or Lokrum instead, with
            a plain reason: shorter queues, local food, and money that stays with local families.
          </p>
          <SampleNote>Example recommendation for the demo.</SampleNote>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="cal-h">
        <h2 id="cal-h" className="text-xl font-semibold">
          What is happening when
        </h2>
        <p className="mt-1 text-ink-2">Real harvest dates move with the weather, so Vita confirms them with the farm a week ahead.</p>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {harvestCalendar.map((h) => {
            const now = h.months === "Oct - Dec";
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
        <h2 className="text-lg font-semibold">Why this matters for Dubrovnik</h2>
        <p className="mt-2 max-w-[70ch] text-ink-2">
          Guests like Marta stay longer, travel outside July and August, and spend with local families instead of only
          in the busiest streets. Each trip report shows the local spend and the crowds avoided.
        </p>
      </section>
    </div>
  );
}
