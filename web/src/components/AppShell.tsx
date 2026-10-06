"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChatCircleText,
  MapTrifold,
  FirstAid,
  Wheelchair,
  Hospital,
  Heartbeat,
  Tree,
  Basket,
  ArrowCounterClockwise,
  CalendarDots,
  Binoculars,
  Drop,
  Buildings,
  UsersThree,
} from "@phosphor-icons/react";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";

// Two groups: the destination plan (what changes on the ground) and Marta's story (the demo).
export const navGroups = [
  {
    label: { en: "Destination 365", hr: "Destinacija 365" },
    items: [
      { href: "/calendar", label: { en: "Calendar 365", hr: "Kalendar 365" }, icon: CalendarDots },
      { href: "/active", label: { en: "Active tourism", hr: "Aktivni turizam" }, icon: Binoculars },
      { href: "/health", label: { en: "Health tourism", hr: "Zdravstveni turizam" }, icon: Drop },
      { href: "/hotel", label: { en: "Partner hotel", hr: "Partnerski hotel" }, icon: Buildings },
      { href: "/community", label: { en: "Community and partners", hr: "Zajednica i partneri" }, icon: UsersThree },
    ],
  },
  {
    label: { en: "Marta's story (demo)", hr: "Martina priča (demo)" },
    items: [
      { href: "/start", label: { en: "Profile chat", hr: "Razgovor za profil" }, icon: ChatCircleText },
      { href: "/journey", label: { en: "My plan", hr: "Moj plan" }, icon: MapTrifold },
      { href: "/help", label: { en: "Help on the road", hr: "Pomoć na putu" }, icon: FirstAid },
      { href: "/clinic", label: { en: "Clinic and stay", hr: "Klinika i smještaj" }, icon: Hospital },
      { href: "/transport", label: { en: "Accessible transport", hr: "Pristupačan prijevoz" }, icon: Wheelchair },
      { href: "/recovery", label: { en: "Recovery", hr: "Oporavak" }, icon: Heartbeat },
      { href: "/wellness", label: { en: "Rehab and nature", hr: "Rehabilitacija i priroda" }, icon: Tree },
      { href: "/explore", label: { en: "Crowd-free trips", hr: "Izleti bez gužvi" }, icon: Basket },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  // Static export uses trailing slashes ("/help/"), nav hrefs do not.
  const path = usePathname().replace(/(.)\/$/, "$1");
  const hydrated = useHydrated();
  const { profile, reset } = useVita();
  const navRef = useRef<HTMLUListElement>(null);
  const t = useT();

  // On phones the module menu is a sideways strip: keep the current page visible in it.
  useEffect(() => {
    const strip = navRef.current;
    const active = strip?.querySelector<HTMLElement>("[aria-current=page]");
    if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2 });
  }, [path]);

  const filled = hydrated ? Object.values(profile).filter(Boolean).length : 0;

  return (
    <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-line px-4 py-4 lg:sticky lg:top-0 lg:h-[100dvh] lg:border-b-0 lg:border-r lg:px-5 lg:py-6 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
              <Tree weight="fill" size={18} />
            </span>
            VitaNatura 365
          </Link>
          <LangToggle />
        </div>

        <nav aria-label={t("Pages", "Stranice")} className="mt-4 lg:mt-8">
          <ul
            ref={navRef}
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:[mask-image:none]"
          >
            {navGroups.map((g, gi) => (
              <li key={g.label.en} className="contents">
                <span
                  className={`hidden px-3 pb-1 text-xs font-medium uppercase tracking-[0.12em] text-ink-3 lg:block ${gi ? "mt-5" : ""}`}
                >
                  {t.b(g.label)}
                </span>
                <ul className="contents">
                  {g.items.map((n) => {
                    const active = path === n.href;
                    return (
                      <li key={n.href} className="shrink-0">
                        <Link
                          href={n.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                            active ? "bg-accent-soft text-accent font-medium" : "text-ink-2 hover:bg-surface-2"
                          }`}
                        >
                          <n.icon size={20} weight={active ? "fill" : "regular"} />
                          <span className="whitespace-nowrap">{t.b(n.label)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto hidden pt-6 lg:block">
          <div className="rounded-2xl border border-line bg-surface p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-surface-2 font-semibold">M</span>
              <div className="leading-tight">
                <p className="font-medium">Marta, 54</p>
                <p className="text-sm text-ink-3">
                  {filled ? t(`${filled} profile details`, `${filled} podataka u profilu`) : t("Profile not started", "Profil nije započet")}
                </p>
              </div>
            </div>
            {hydrated && profile.mobilityCode && (
              <p className="mt-3 text-sm text-ink-2">
                {t("Mobility code", "Oznaka pokretljivosti")} <span className="font-mono font-medium text-ink">{profile.mobilityCode}</span>
              </p>
            )}
          </div>
          <button
            onClick={reset}
            className="mt-3 flex items-center gap-2 px-1 text-sm text-ink-3 hover:text-ink"
          >
            <ArrowCounterClockwise /> {t("Restart demo", "Ponovo pokreni demo")}
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
