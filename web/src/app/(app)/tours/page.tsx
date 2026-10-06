"use client";

import { useState } from "react";
import Image from "next/image";
import { Hammer, Users, Baby, Van, CheckCircle, Briefcase } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { LiveConditions } from "@/components/LiveConditions";
import { tours, transfers, weekPackage, priceSources, categoryLabel, type Category } from "@/data/tours";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Off-season months only: that is what these tours are for.
const offSeason = [10, 11, 12, 1, 2, 3, 4, 5];

export default function ToursPage() {
  const [month, setMonth] = useState<number | null>(null);
  const [cat, setCat] = useState<Category | null>(null);
  const shown = tours.filter((t) => (month == null || t.months.includes(month)) && (cat == null || t.category === cat));

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm transition ${active ? "bg-accent text-accent-ink" : "border border-line bg-surface text-ink-2 hover:bg-surface-2"}`;

  return (
    <div>
      <PageHeader
        module="Tours and prices"
        title="Ten tours around Dubrovnik, October to May"
        intro="Away from the Old Town: the Neretva delta, Ston, Konavle and the islands. Every tour welcomes children."
      />

      <section className="mt-8 rounded-2xl border border-line bg-surface p-5" aria-label="Filter tours">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-ink-3">Month</span>
          <button className={chip(month == null)} onClick={() => setMonth(null)}>
            Any
          </button>
          {offSeason.map((m) => (
            <button key={m} className={chip(month === m)} onClick={() => setMonth(m)} aria-pressed={month === m}>
              {months[m - 1]}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-ink-3">Type</span>
          <button className={chip(cat == null)} onClick={() => setCat(null)}>
            All
          </button>
          {(Object.keys(categoryLabel) as Category[]).map((c) => (
            <button key={c} className={chip(cat === c)} onClick={() => setCat(c)} aria-pressed={cat === c}>
              {categoryLabel[c]}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-ink-3">
            <tr>
              <th className="px-4 py-3 font-normal">Tour</th>
              <th className="px-4 py-3 font-normal">When</th>
              <th className="px-4 py-3 font-normal">Length</th>
              <th className="px-4 py-3 text-right font-normal">Adult</th>
              <th className="px-4 py-3 text-right font-normal">Child</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t.id} className="border-t border-line first:border-0">
                <td className="px-4 py-3">
                  <a href={`#${t.id}`} className="font-medium hover:text-accent">
                    {t.name}
                  </a>
                  <span className="block text-ink-3">{t.area}</span>
                </td>
                <td className="px-4 py-3 text-ink-2">{t.season}</td>
                <td className="px-4 py-3 text-ink-2">{t.duration}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold">€{t.adult}</td>
                <td className="px-4 py-3 text-right font-mono">€{t.child}</td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-ink-3">
                  Nothing matches. Try another month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ol className="mt-10 space-y-6">
        {shown.map((t) => (
          <li
            key={t.id}
            id={t.id}
            className="scroll-mt-6 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
          >
            <Image src={t.image} alt={t.name} width={1200} height={900} className="h-56 w-full object-cover md:h-full" />
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-ink-3">
                    {categoryLabel[t.category]} · {t.area}
                  </p>
                  <h2 className="mt-0.5 text-xl font-semibold">{t.name}</h2>
                </div>
                <p className="text-right">
                  <span className="block font-mono text-2xl font-semibold text-accent">€{t.adult}</span>
                  <span className="block text-sm text-ink-3">child €{t.child}</span>
                </p>
              </div>
              <p className="mt-2 text-ink-2">{t.pitch}</p>
              <p className="mt-3 text-sm text-ink-3">
                {t.season} · {t.duration} · meet at {t.meet} · max {t.groupMax} people
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {t.includes.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-sm">
                <Baby size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  <span className="font-medium">Kids ({t.childAges}): </span>
                  {t.kids}
                </span>
              </p>
              <div className="mt-4 rounded-xl bg-surface-2 p-3.5 text-sm">
                <p className="flex items-center gap-1.5 font-medium text-accent">
                  <Hammer /> What changes on the ground{t.isNew ? " (new tour)" : ""}
                </p>
                <p className="mt-1">{t.onGround}</p>
                <p className="mt-2 flex items-start gap-1.5 text-ink-2">
                  <Briefcase className="mt-0.5 shrink-0" /> Local income: {t.locals}
                </p>
              </div>
              <p className="mt-3 text-xs text-ink-3">Price check: {t.priceBasis}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-accent-soft p-6" aria-labelledby="pkg-h">
          <p className="text-sm font-medium text-accent">Best value</p>
          <h2 id="pkg-h" className="mt-1 text-xl font-semibold">
            {weekPackage.name}, {weekPackage.nights} nights
          </h2>
          <p className="mt-2 font-mono text-2xl font-semibold">
            €{weekPackage.adult} <span className="text-base font-normal text-ink-2">per adult</span> · €{weekPackage.child}{" "}
            <span className="text-base font-normal text-ink-2">per child</span>
          </p>
          <ul className="mt-4 space-y-1.5">
            {weekPackage.includes.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-2">{weekPackage.basis}</p>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="tr-h">
          <div className="flex items-center gap-2">
            <Van size={22} className="text-accent" />
            <h2 id="tr-h" className="font-semibold">
              Shared minibus from Dubrovnik (return)
            </h2>
          </div>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {transfers.map((x) => (
                <tr key={x.to} className="border-t border-line first:border-0">
                  <td className="py-2">{x.to}</td>
                  <td className="py-2 text-ink-3">{x.time}</td>
                  <td className="py-2 text-right font-mono">€{x.adult}</td>
                  <td className="py-2 text-right font-mono text-ink-3">child €{x.child}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 flex items-start gap-2 text-sm text-ink-2">
            <Users size={18} className="mt-0.5 shrink-0" /> Pick-up at the partner hotel in Lapad and at Gruž port.
          </p>
        </section>
      </div>

      <div className="mt-6">
        <LiveConditions lat={43.0141} lon={17.5636} place="the Neretva delta" />
      </div>

      <section className="mt-10" aria-labelledby="src-h">
        <h2 id="src-h" className="text-lg font-semibold">
          How we set the prices
        </h2>
        <p className="mt-1 max-w-[70ch] text-ink-2">
          Our prices are proposals, checked against what similar tours and tickets cost in October 2026. They are not
          live offers yet.
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
          {priceSources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <SampleNote>Farms, the partner hotel and outfitters are sample partners until contracts are signed.</SampleNote>
      </section>

      <NextStep href="/calendar" label="See Calendar 365" hint="Between the tours: festivals and traditions, stretched into whole seasons." />
    </div>
  );
}
