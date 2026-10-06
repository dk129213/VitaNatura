"use client";

import Image from "next/image";
import { Handshake, CheckCircle, Buildings, UsersThree } from "@phosphor-icons/react";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { hotelDeal } from "@/data/destination";
import { useT } from "@/lib/i18n";

export default function HotelPage() {
  const t = useT();
  return (
    <div>
      <PageHeader
        module={t("Destination 365", "Destinacija 365")}
        title={t("One partner hotel, open all winter", "Jedan partnerski hotel, otvoren cijelu zimu")}
        intro={t(
          "Instead of booking rooms one by one, we sign a contract with one hotel in Lapad. We earn more per guest and always have a safe place for clients; the hotel gets used to working off-season step by step, with guests guaranteed.",
          "Umjesto da sobe rezerviramo jednu po jednu, potpisujemo ugovor s jednim hotelom u Lapadu. Zarađujemo više po gostu i uvijek imamo siguran smještaj za klijente, a hotel se korak po korak navikava raditi izvan sezone, uz zajamčene goste.",
        )}
      />

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Image
          src="/img/lapad.jpg"
          alt={t("Lapad bay in Dubrovnik at sunset", "Uvala Lapad u Dubrovniku u zalazak sunca")}
          width={1920}
          height={1194}
          className="h-56 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Handshake size={24} className="text-accent" />
            <h2 className="text-xl font-semibold">{t("What the contract says", "Što piše u ugovoru")}</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {hotelDeal.terms.map((x) => (
              <li key={x.en} className="flex items-start gap-2">
                <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {t.b(x)}
              </li>
            ))}
          </ul>
          <SampleNote>{t("Sample partner. The hotel is not named until a contract is signed.", "Primjer partnera. Hotel ne imenujemo dok ugovor nije potpisan.")}</SampleNote>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <UsersThree size={22} className="text-accent" />
            <h2 className="font-semibold">{t("What we get", "Što dobivamo mi")}</h2>
          </div>
          <ul className="mt-3 space-y-2 text-ink-2">
            {hotelDeal.weGet.map((x) => (
              <li key={x.en}>{t.b(x)}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <Buildings size={22} className="text-accent" />
            <h2 className="font-semibold">{t("What the hotel gets", "Što dobiva hotel")}</h2>
          </div>
          <ul className="mt-3 space-y-2 text-ink-2">
            {hotelDeal.hotelGets.map((x) => (
              <li key={x.en}>{t.b(x)}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="phase-h">
        <h2 id="phase-h" className="text-xl font-semibold">
          {t("Getting the hotel used to the off-season", "Kako se hotel navikava na rad izvan sezone")}
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {hotelDeal.phases.map((p, i) => (
            <li key={p.when.en} className={`rounded-2xl border p-5 ${i === 0 ? "border-accent bg-accent-soft" : "border-line bg-surface"}`}>
              <p className="font-mono text-sm text-ink-3">{t.b(p.when)}</p>
              <p className="mt-2 font-medium">{t.b(p.what)}</p>
            </li>
          ))}
        </ol>
        <SampleNote>{t("Planned phases, to be agreed with the hotel.", "Planirane faze, dogovaraju se s hotelom.")}</SampleNote>
      </section>

      <NextStep
        href="/community"
        label={t("Who takes part", "Tko sudjeluje")}
        hint={t(
          "The hotel is the base. Every farm, boatman, guide and clinic on the itinerary is a partner too.",
          "Hotel je polazište. Svako gospodarstvo, lađar, vodič i klinika na itineraru također je partner.",
        )}
      />
    </div>
  );
}
