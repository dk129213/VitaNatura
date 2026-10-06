"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  CalendarDots,
  Buildings,
  UsersThree,
  ChartLineUp,
  FirstAid,
  ChatCircleText,
  MapTrifold,
  Tree,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { useVita } from "@/lib/store";

// The site's table of contents: the destination first, help on the road second.
export const navGroups = [
  {
    label: "Explore",
    items: [
      { href: "/tours", label: "Tours and prices", icon: Compass },
      { href: "/calendar", label: "Calendar 365", icon: CalendarDots },
      { href: "/hotel", label: "Partner hotel", icon: Buildings },
      { href: "/community", label: "Locals and partners", icon: UsersThree },
      { href: "/plan", label: "Funding and marketing", icon: ChartLineUp },
    ],
  },
  {
    label: "We care",
    items: [
      { href: "/help", label: "Help on the road", icon: FirstAid },
      { href: "/start", label: "Marta's chat (demo)", icon: ChatCircleText },
      { href: "/journey", label: "Marta's new plan", icon: MapTrifold },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  // Static export uses trailing slashes ("/help/"), nav hrefs do not.
  const path = usePathname().replace(/(.)\/$/, "$1");
  const reset = useVita((s) => s.reset);
  const navRef = useRef<HTMLUListElement>(null);

  // On phones the menu is a sideways strip: keep the current page visible in it.
  useEffect(() => {
    const strip = navRef.current;
    const active = strip?.querySelector<HTMLElement>("[aria-current=page]");
    if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2 });
  }, [path]);

  return (
    <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col border-b border-line px-4 py-4 lg:sticky lg:top-0 lg:h-[100dvh] lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
            <Tree weight="fill" size={18} />
          </span>
          VitaNatura 365
        </Link>

        <nav aria-label="Pages" className="mt-4 lg:mt-8">
          <ul
            ref={navRef}
            className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:[mask-image:none]"
          >
            {navGroups.map((g, gi) => (
              <li key={g.label} className="contents">
                <span className={`hidden px-3 pb-1 text-xs font-medium uppercase tracking-[0.12em] text-ink-3 lg:block ${gi ? "mt-5" : ""}`}>
                  {g.label}
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
                            active ? "bg-accent-soft font-medium text-accent" : "text-ink-2 hover:bg-surface-2"
                          }`}
                        >
                          <n.icon size={20} weight={active ? "fill" : "regular"} className="shrink-0" />
                          <span className="whitespace-nowrap">{n.label}</span>
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
          <button onClick={reset} className="flex items-center gap-2 px-1 text-sm text-ink-3 hover:text-ink">
            <ArrowCounterClockwise /> Restart demo
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
