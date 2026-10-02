import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Tree,
  FirstAid,
  Wheelchair,
  Hospital,
  Heartbeat,
  Basket,
  MapPin,
  CloudSun,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { photoCredits } from "@/data/credits";

const modules = [
  {
    icon: FirstAid,
    title: "Help on the road",
    text: "Nearest emergency care, 112 in one tap, and a health passport in Croatian.",
    href: "/help",
    image: "/img/paklenica.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  { icon: Wheelchair, title: "Accessible transport", text: "Door-to-door routes checked against each carrier's rules.", href: "/transport", span: "" },
  { icon: Hospital, title: "Clinic and stay", text: "The right clinic and a step-free place to recover.", href: "/clinic", span: "" },
  { icon: Heartbeat, title: "Recovery", text: "Watch data and daily check-ins become one summary for the doctor.", href: "/recovery", span: "md:col-span-2" },
  {
    icon: Tree,
    title: "Rehab and nature",
    text: "Thermal spas and quiet protected areas, October to May.",
    href: "/wellness",
    image: "/img/medvednica-forest.jpg",
    span: "md:col-span-2",
  },
  { icon: Basket, title: "Crowd-free trips", text: "Family farms and harvests instead of packed old towns.", href: "/explore", span: "md:col-span-2" },
];

const sources = [
  { icon: MapPin, name: "OpenStreetMap", use: "Hospitals, pharmacies and clinics on the map, with access tags" },
  { icon: CloudSun, name: "Open-Meteo", use: "Live weather, air quality and pollen for each day's plan" },
  { icon: Scales, name: "EU passenger rights", use: "Assistance rules for air (1107/2006) and coach travel (181/2011)" },
];

export default function Home() {
  return (
    <div className="flex-1">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
            <Tree weight="fill" size={18} />
          </span>
          VitaNatura 365
        </Link>
        <Link href="/journey" className="text-ink-2 hover:text-ink">
          See Marta&apos;s plan
        </Link>
      </header>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Care, transport and nature, planned as one trip.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-2">
            For travellers who need treatment, recovery or simply a quieter Croatia. Tell us once, we organise the rest.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition active:scale-[0.98]"
            >
              Start the demo <ArrowRight weight="bold" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center rounded-full border border-line bg-surface px-6 py-3 font-medium transition hover:bg-surface-2 active:scale-[0.98]"
            >
              See Marta&apos;s plan
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/img/kopacki-boardwalk.jpg"
            alt="A wooden boardwalk with railings crossing the wetlands of Kopački rit"
            width={1920}
            height={1280}
            priority
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Today, the patient is their own travel agent.</h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              Clinic, transport, accommodation and recovery are booked in dozens of places. Travellers in a wheelchair
              often can&apos;t tell whether the trip is possible at all, and the clinic loses sight of the patient the
              day they go home.
            </p>
            <p>
              Meanwhile spas, coastal hotels and national parks stand half empty from October to May. VitaNatura connects
              both sides.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">Six modules, one profile.</h2>
        <p className="mt-3 max-w-[60ch] text-lg text-ink-2">
          What you say once in the chat is used everywhere: your mobility code books the van, your recovery stage
          unlocks the trails.
        </p>
        <div className="mt-10 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.04} className={m.span}>
              <Link
                href={m.href}
                className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-line p-6 transition hover:shadow-soft ${
                  m.image ? "text-[#f3faf6]" : i === 3 ? "bg-accent-soft" : "bg-surface"
                }`}
              >
                {m.image && (
                  <>
                    <Image src={m.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0d1311]/85 via-[#0d1311]/40 to-transparent" />
                  </>
                )}
                <span className="relative">
                  <m.icon size={28} weight="duotone" className={m.image ? "" : "text-accent"} />
                  <span className="mt-3 block text-xl font-semibold">{m.title}</span>
                  <span className={`mt-1 block max-w-[40ch] ${m.image ? "text-[#d7e4dd]" : "text-ink-2"}`}>{m.text}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/img/medvednica-fog.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0d1311]/70" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-[#f3faf6] sm:px-6 md:py-28">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Follow Marta: from a fall in Paklenica back to the forest.
          </h2>
          <p className="mt-4 max-w-[55ch] text-lg text-[#d7e4dd]">
            The demo walks through one real-feeling case, using real hospitals, real routes and live conditions.
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f3faf6] px-6 py-3 font-medium text-[#15201b] transition active:scale-[0.98]"
          >
            Start the demo <ArrowRight weight="bold" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Built on open data</h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-3">
          {sources.map((s) => (
            <li key={s.name} className="flex gap-4">
              <s.icon size={26} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-ink-2">{s.use}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[70ch] text-ink-3">
          VitaNatura supports decisions by patients and doctors. It never diagnoses, and every recommendation shows its
          reason and source. Health data stays on the device unless the user agrees to share it.
        </p>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 text-sm text-ink-3 sm:px-6">
          <p className="font-medium text-ink-2">VitaNatura 365, Tourism 365 hackathon demo</p>
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
