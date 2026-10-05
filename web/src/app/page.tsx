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
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { photoCredits } from "@/data/credits";

const audiences = [
  {
    image: "/img/dubrovnik.jpg",
    pos: "object-center",
    alt: "Dubrovnik Old Town and its walls seen from above",
    title: "When something goes wrong on the trip",
    text: "A fall, a fever, a toothache. Vita finds help nearby, explains it in your language and rebuilds the rest of the trip.",
    points: ["Nearest hospital, clinic or pharmacy", "112 and 194 in one tap", "Insurance and costs explained"],
  },
  {
    image: "/img/spa.jpg",
    pos: "object-[center_88%]",
    alt: "A spa and wellness building with a ramp, below green cliffs",
    title: "When the trip is for your health",
    text: "Dental work, orthopaedics, rehabilitation or a spa programme, planned together with transport and a stay that fit.",
    points: ["Clinic matched to your needs", "Step-free transport and rooms", "Recovery followed after you leave"],
  },
];

const modules = [
  {
    icon: Wheelchair,
    title: "Accessible transport",
    text: "Flights, coaches and taxis checked for steps, with assistance booked ahead.",
    href: "/transport",
    image: "/img/plane.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  { icon: FirstAid, title: "Help on the road", text: "Nearest care, 112 in one tap, and a health passport in Croatian.", href: "/help", span: "" },
  { icon: Hospital, title: "Clinic and stay", text: "The right hospital and a step-free place to recover.", href: "/clinic", span: "" },
  { icon: Heartbeat, title: "Recovery", text: "Watch data and daily check-ins become one summary for the doctor.", href: "/recovery", span: "md:col-span-2" },
  {
    icon: Tree,
    title: "Rehab and nature",
    text: "Seaside rehabilitation and quiet islands, October to May.",
    href: "/wellness",
    image: "/img/vela-luka.jpg",
    span: "md:col-span-2",
  },
  { icon: Basket, title: "Crowd-free trips", text: "Mandarin, grape and olive harvests instead of packed streets.", href: "/explore", span: "md:col-span-2" },
];

const gallery = [
  { image: "/img/bus.jpg", caption: "Coach transfers" },
  { image: "/img/plane.jpg", caption: "Flights with assistance" },
  { image: "/img/thalasso-opatija.jpg", caption: "Seaside health resorts" },
  { image: "/img/spa.jpg", caption: "Thermal spas", pos: "object-[center_88%]" },
  { image: "/img/mandarins.jpg", caption: "Mandarin harvest" },
  { image: "/img/grapes.jpg", caption: "Grape harvest" },
  { image: "/img/olives.jpg", caption: "Olive picking" },
  { image: "/img/elaphiti.jpg", caption: "Sea clean-ups with Green Sea Safari" },
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
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Health in your pocket</p>
          <h1 className="mt-3 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            You travel.
            <br />
            We care.
          </h1>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-2">
            For every traveller in Croatia: help when something goes wrong, and planned treatment, recovery and spa stays.
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
            src="/img/dubrovnik-walls.jpg"
            alt="The walled Old Town of Dubrovnik and its harbour by the sea"
            width={1920}
            height={1235}
            priority
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">For every tourist, not only patients.</h2>
          <p className="mt-3 max-w-[60ch] text-lg text-ink-2">
            Including travellers with reduced mobility, seniors, and the people who travel with them.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <Image src={a.image} alt={a.alt} width={1600} height={1000} className={`aspect-[16/10] w-full rounded-2xl object-cover ${a.pos}`} />
                <h3 className="mt-5 text-xl font-semibold">{a.title}</h3>
                <p className="mt-2 max-w-[50ch] text-ink-2">{a.text}</p>
                <ul className="mt-4 space-y-2">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <CheckCircle size={18} weight="fill" className="text-accent" /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Today, the traveller is their own travel agent.</h2>
        <div className="space-y-4 text-lg leading-relaxed text-ink-2">
          <p>
            Hospital, transport, accommodation and recovery are arranged in dozens of places, often in a foreign
            language. Travellers in a wheelchair can&apos;t tell whether the trip is possible at all.
          </p>
          <p>
            Meanwhile hotels, spas and islands stand half empty from October to May, while the Old Town fills up on
            cruise days. VitaNatura connects both sides.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">Six modules, one profile.</h2>
        <p className="mt-3 max-w-[60ch] text-lg text-ink-2">
          What you say once in the chat is used everywhere: your mobility code books the airport assistance, your
          recovery stage unlocks the paths.
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

      <section className="border-y border-line bg-surface py-16 md:py-20" aria-labelledby="gallery-h">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <h2 id="gallery-h" className="text-3xl font-semibold tracking-tight md:text-4xl">Everything around the trip</h2>
          <p className="mt-3 max-w-[60ch] text-lg text-ink-2">
            Getting there, getting better, and a reason to come back outside the summer.
          </p>
        </div>
        <ul className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 sm:px-6 md:grid-cols-4">
          {gallery.map((g) => (
            <li key={g.caption}>
              <Image src={g.image} alt={g.caption} width={800} height={600} className={`aspect-[4/3] w-full rounded-2xl object-cover ${"pos" in g ? g.pos : ""}`} />
              <p className="mt-3 font-medium">{g.caption}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/img/lapad.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0d1311]/65" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-[#f3faf6] sm:px-6 md:py-28">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Follow Marta: from a fall on the Dubrovnik city walls back to the sea.
          </h2>
          <p className="mt-4 max-w-[55ch] text-lg text-[#d7e4dd]">
            The demo walks through one case with real hospitals, real routes and live conditions.
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
          VitaNatura supports decisions by travellers and doctors. It never diagnoses, and every recommendation shows its
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
