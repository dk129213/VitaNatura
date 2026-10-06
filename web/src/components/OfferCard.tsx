"use client";

import Image from "next/image";
import { CalendarBlank, MapPin, Hammer, Briefcase } from "@phosphor-icons/react";
import type { Offer } from "@/data/destination";
import { useT } from "@/lib/i18n";

// One activity or service, with the concrete change it needs on the ground.
export function OfferCard({ o, wide = false }: { o: Offer; wide?: boolean }) {
  const t = useT();
  return (
    <li
      className={`overflow-hidden rounded-2xl border border-line bg-surface ${
        wide && o.image ? "lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]" : ""
      }`}
    >
      {o.image && (
        <Image
          src={o.image}
          alt=""
          width={1200}
          height={800}
          className={`w-full object-cover ${wide ? "h-52 lg:h-full" : "h-44"}`}
        />
      )}
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{t.b(o.title)}</h3>
          {o.proposal && (
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">
              {t("New on the ground", "Novo na terenu")}
            </span>
          )}
        </div>
        <ul className="mt-2 space-y-1 text-sm text-ink-3">
          <li className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 shrink-0" /> {t.b(o.place)}
          </li>
          <li className="flex items-start gap-1.5">
            <CalendarBlank className="mt-0.5 shrink-0" /> {t.b(o.when)}
          </li>
        </ul>
        <p className="mt-3 text-ink-2">{t.b(o.text)}</p>
        <div className="mt-4 rounded-xl bg-surface-2 p-3.5">
          <p className="flex items-center gap-1.5 text-sm font-medium text-accent">
            <Hammer /> {t("What changes in the destination", "Što se mijenja u destinaciji")}
          </p>
          <p className="mt-1 text-sm">{t.b(o.onGround)}</p>
        </div>
        {o.jobs && (
          <p className="mt-3 flex items-start gap-1.5 text-sm text-ink-2">
            <Briefcase className="mt-0.5 shrink-0 text-ink-3" />
            <span>
              <span className="font-medium text-ink">{t("Local jobs: ", "Lokalni posao: ")}</span>
              {t.b(o.jobs)}
            </span>
          </p>
        )}
      </div>
    </li>
  );
}
