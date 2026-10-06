import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Tree,
  CheckCircle,
  Hammer,
  Compass,
  CalendarDots,
  Buildings,
  UsersThree,
  ChartLineUp,
  FirstAid,
  Baby,
} from "@phosphor-icons/react/dist/ssr";
import { TourCard } from "@/components/TourCard";
import { photoCredits } from "@/data/credits";
import { tours, weekPackage } from "@/data/tours";
import { changes } from "@/data/destination";

const contents = [
  { href: "/tours", icon: Compass, title: "Tours and prices", text: "Ten off-season tours, filters by month" },
  { href: "/calendar", icon: CalendarDots, title: "Calendar 365", text: "Festivals and harvests, month by month" },
  { href: "/hotel", icon: Buildings, title: "Partner hotel", text: "One hotel in Lapad, open all winter" },
  { href: "/community", icon: UsersThree, title: "Locals and partners", text: "Jobs, stakeholders and nature" },
  { href: "/plan", icon: ChartLineUp, title: "Financing and marketing", text: "Costs, funding, how guests find us" },
  { href: "/help", icon: FirstAid, title: "We care", text: "Help on the road, if something goes wrong" },
];

export default function Home() {
  return (
    <div className="flex-1">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
            <Tree weight="fill" size={18} />
          </span>
          VitaNatura 365
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-ink-2 md:flex">
          <Link href="/tours" className="hover:text-ink">
            Tours
          </Link>
          <Link href="/calendar" className="hover:text-ink">
            Calendar
          </Link>
          <Link href="/plan" className="hover:text-ink">
            Plan
          </Link>
          <Link href="/help" className="hover:text-ink">
            We care
          </Link>
        </nav>
      </header>

      <section className="relative mx-4 overflow-hidden rounded-3xl sm:mx-6 xl:mx-auto xl:max-w-7xl">
        <Image src="/img/opuzen-neretva.jpg" alt="The Neretva river and orchards at Opuzen" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1311]/85 via-[#0d1311]/55 to-[#0d1311]/10" />
        <div className="relative px-6 py-14 text-[#f3faf6] md:px-12 md:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#b8e6cf]">Around Dubrovnik · October to May</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
            You travel.
            <br />
            We care.
          </h1>
          <p className="mt-5 max-w-[42ch] text-lg text-[#d7e4dd]">
            The Dubrovnik nobody shows you: the Neretva delta, Ston, Konavle and quiet islands. Out of season, kids welcome.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#tours"
              className="inline-flex items-center gap-2 rounded-full bg-[#f3faf6] px-6 py-3 font-medium text-[#15201b] transition active:scale-[0.98]"
            >
              See the tours <ArrowRight weight="bold" />
            </a>
            <Link
              href="/help"
              className="inline-flex items-center rounded-full border border-[#f3faf6]/40 px-6 py-3 font-medium transition hover:bg-[#f3faf6]/10 active:scale-[0.98]"
            >
              If something goes wrong
            </Link>
          </div>
        </div>
      </section>

      <section id="tours" className="mx-auto w-full max-w-7xl scroll-mt-4 px-4 pb-16 pt-10 sm:px-6" aria-labelledby="tours-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="tours-h" className="text-3xl font-semibold tracking-tight md:text-4xl">
              Tours this season
            </h2>
            <p className="mt-2 flex items-center gap-2 text-ink-2">
              <Baby size={20} className="text-accent" /> Every tour welcomes children. Prices per person.
            </p>
          </div>
          <Link href="/tours" className="inline-flex items-center gap-1.5 font-medium text-accent">
            Full price list and filters <ArrowRight />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {tours.map((t, i) => (
            <li key={t.id}>
              <TourCard tour={t} priority={i < 5} />
            </li>
          ))}
        </ul>
        <Link
          href="/tours"
          className="mt-6 flex flex-col gap-2 rounded-2xl bg-accent-soft p-5 transition hover:shadow-soft sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="font-semibold">{weekPackage.name}:</span> 7 nights, 4 tours, transfers
          </span>
          <span className="font-mono text-lg font-semibold">
            €{weekPackage.adult} adult · €{weekPackage.child} child
          </span>
        </Link>
      </section>

      <section className="border-y border-line bg-surface" aria-labelledby="toc-h">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <h2 id="toc-h" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Contents
          </h2>
          <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map((c, i) => (
              <li key={c.href}>
                <Link href={c.href} className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-bg p-5 transition hover:shadow-soft">
                  <span className="font-mono text-sm text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 font-semibold">
                      <c.icon size={20} className="text-accent" /> {c.title}
                    </span>
                    <span className="mt-1 block text-sm text-ink-2">{c.text}</span>
                  </span>
                  <ArrowRight className="mt-1 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6" aria-labelledby="ch-h">
        <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-accent">
          <Hammer size={20} /> Not an ad campaign
        </p>
        <h2 id="ch-h" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
          What we change on the ground
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
          {changes.map((c) => (
            <li key={c.what} className="flex items-start gap-2">
              <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" />
              <span>
                {c.what} <span className="text-ink-3">· {c.where}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/img/neretva.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0d1311]/70" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-[#f3faf6] sm:px-6 md:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#b8e6cf]">We care</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Far from the city, you&apos;re not on your own.
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg text-[#d7e4dd]">
            Marta slips on a jetty on the photo safari. No address, Sunday, a granddaughter with her. See how we help, and
            how the holiday goes on.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f3faf6] px-6 py-3 font-medium text-[#15201b] transition active:scale-[0.98]"
          >
            Watch Marta&apos;s story <ArrowRight weight="bold" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 text-sm text-ink-3 sm:px-6">
          <p className="font-medium text-ink-2">VitaNatura 365 · Tourism 365 hackathon demo</p>
          <p className="mt-2">Tours, prices and partners are proposals, not live offers.</p>
          <p className="mt-3">Photos from Wikimedia Commons:</p>
          <ul className="mt-1 grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
            {photoCredits.map((c) => (
              <li key={c.file}>
                <a href={c.url} className="underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
                  {c.title}
                </a>
                , {c.author}, {c.license}
              </li>
            ))}
          </ul>
          <p className="mt-3">Map data and places: OpenStreetMap contributors, ODbL. Weather: Open-Meteo, CC BY 4.0.</p>
        </div>
      </footer>
    </div>
  );
}
