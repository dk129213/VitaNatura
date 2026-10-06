"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Tree,
  Binoculars,
  Drop,
  MapPin,
  CloudSun,
  Scales,
  CheckCircle,
  Hammer,
  CalendarDots,
  Buildings,
  UsersThree,
} from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";
import { LangToggle } from "@/components/LangToggle";
import { photoCredits } from "@/data/credits";
import { audience, calendar } from "@/data/destination";
import { useT } from "@/lib/i18n";

export default function Home() {
  const t = useT();

  const pillars = [
    {
      icon: Binoculars,
      href: "/active",
      image: "/img/neretva.jpg",
      title: t("Active", "Aktivno"),
      text: t(
        "Photo safari and canoe safari in the Neretva delta, birdwatching in winter, harvests, the walk on the Ston walls.",
        "Foto safari i kanu safari u delti Neretve, promatranje ptica zimi, berbe, šetnja Stonskim zidinama.",
      ),
    },
    {
      icon: Drop,
      href: "/health",
      image: "/img/lapad.jpg",
      title: t("Health", "Zdravlje"),
      text: t(
        "Salt therapy in Ston, heated hotel pools in Dubrovnik, preventive check-ups and a smartwatch plan, with a safety net if something goes wrong.",
        "Haloterapija u Stonu, grijani hotelski bazeni u Dubrovniku, preventivni pregledi i plan s pametnim satom, uz sigurnosnu mrežu ako nešto pođe po zlu.",
      ),
    },
  ];

  const changes = [
    t("Photo hides at 3 viewpoints in the Neretva delta", "Skrovišta za fotografiranje na 3 vidikovca u delti Neretve"),
    t("Canoe launch points with ramps, shared by local outfitters", "Mjesta za spuštanje kanua s rampama, zajednička za lokalne pružatelje"),
    t("Marked birdwatching route with boards in four languages", "Označena staza za promatranje ptica s pločama na četiri jezika"),
    t("A salt room next to the Ston salt pans", "Slana soba uz stonsku solanu"),
    t("Benches and water on the Ston walls, open all winter", "Klupe i voda na Stonskim zidinama, otvorene cijelu zimu"),
    t("Hotel pool heated and open October to May, with local passes", "Hotelski bazen grijan i otvoren od listopada do svibnja, s kartama za lokalne"),
    t("Shade, seating and step-free paths at partner farms", "Hladovina, klupe i staze bez stepenica na partnerskim gospodarstvima"),
    t("St. Blaise Week, oyster trail, Moreška in spring and autumn", "Tjedan sv. Vlaha, put kamenica, Moreška u proljeće i jesen"),
    t("Certified local guides: boatmen and young people from the valley", "Certificirani lokalni vodiči: lađari i mladi iz doline"),
  ];

  const highlights = calendar.filter((c) => ["Feast of St. Blaise (Festa sv. Vlaha)", "Ston oyster trail", "Moreška and Kumpanija sword dances", "Mandarin harvest"].includes(c.title.en));

  const sources = [
    { icon: MapPin, name: "OpenStreetMap", use: t("Hospitals, pharmacies and clinics on the map", "Bolnice, ljekarne i ambulante na karti") },
    { icon: CloudSun, name: "Open-Meteo", use: t("Live weather and air quality for each day's plan", "Vrijeme i kvaliteta zraka uživo za plan svakog dana") },
    { icon: Scales, name: t("EU passenger rights", "Prava putnika u EU"), use: t("Assistance rules for air (1107/2006) and coach travel (181/2011)", "Pravila asistencije za zračni (1107/2006) i autobusni prijevoz (181/2011)") },
  ];

  return (
    <div className="flex-1">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink">
            <Tree weight="fill" size={18} />
          </span>
          VitaNatura 365
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/calendar" className="hidden text-ink-2 hover:text-ink sm:inline">
            {t("Calendar 365", "Kalendar 365")}
          </Link>
          <LangToggle />
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
            {t("Active and health tourism, 365 days", "Aktivni i zdravstveni turizam, 365 dana")}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            {t("The Dubrovnik region, active and healthy all year.", "Dubrovačko-neretvanski kraj, aktivan i zdrav cijele godine.")}
          </h1>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-2">
            {t(
              "We adapt the destination itself for the months it stands empty: new places to watch birds and paddle, a salt room in Ston, a hotel pool open all winter, traditions stretched into seasons, and local people as the guides.",
              "Prilagođavamo samu destinaciju za mjesece kad stoji prazna: nova mjesta za promatranje ptica i veslanje, slana soba u Stonu, hotelski bazen otvoren cijelu zimu, tradicije produžene u sezone i lokalni ljudi kao vodiči.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calendar"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition active:scale-[0.98]"
            >
              {t("See the year", "Pogledaj godinu")} <ArrowRight weight="bold" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center rounded-full border border-line bg-surface px-6 py-3 font-medium transition hover:bg-surface-2 active:scale-[0.98]"
            >
              {t("Marta's story", "Martina priča")}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src="/img/neretva.jpg"
            alt={t("Mandarin orchards and channels in the Neretva delta", "Nasadi mandarina i kanali u delti Neretve")}
            width={1920}
            height={1280}
            priority
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft"
          />
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("Full for three months, empty for six.", "Puno tri mjeseca, prazno šest.")}
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              {t(
                "From June to September the Old Town is packed and cruise days are hard on everyone. From November to March many hotels close, seasonal staff leave, and the farms, boats and festivals of the county have no visitors.",
                "Od lipnja do rujna Stari grad je prepun, a dani s kruzerima teški su svima. Od studenoga do ožujka mnogi hoteli se zatvaraju, sezonski radnici odlaze, a gospodarstva, lađe i fešte u županiji ostaju bez posjetitelja.",
              )}
            </p>
            <p>
              {t(
                "Yet winter here is mild and sunny, birds arrive in the delta, mandarins and olives are picked, oysters are at their best and St. Blaise is celebrated. The reasons to come exist. The destination is just not set up for them.",
                "A zima je ovdje blaga i sunčana, ptice dolaze u deltu, beru se mandarine i masline, kamenice su najbolje, slavi se sv. Vlaho. Razlozi za dolazak postoje. Destinacija im samo nije prilagođena.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">{t("Two pillars.", "Dva stupa.")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.08}>
              <Link href={p.href} className="group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl p-6 text-[#f3faf6] md:p-8">
                <Image src={p.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0d1311]/90 via-[#0d1311]/45 to-transparent" />
                <span className="relative">
                  <p.icon size={30} weight="duotone" />
                  <span className="mt-3 block text-2xl font-semibold">{p.title}</span>
                  <span className="mt-2 block max-w-[46ch] text-[#d7e4dd]">{p.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-medium">
                    {t("See the offer", "Pogledaj ponudu")} <ArrowRight weight="bold" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="flex items-center gap-2 text-accent">
            <Hammer size={24} />
            <p className="text-sm font-medium uppercase tracking-[0.14em]">{t("Not marketing: changes on the ground", "Ne marketing: promjene na terenu")}</p>
          </div>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t("What actually changes in the destination", "Što se stvarno mijenja u destinaciji")}
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
            {changes.map((c) => (
              <li key={c} className="flex items-start gap-2 text-lg">
                <CheckCircle size={22} weight="fill" className="mt-1 shrink-0 text-accent" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:py-20">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">{t("Who it is for", "Za koga")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.b(audience.title)}</h2>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-2">{t.b(audience.text)}</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {audience.facts.map((f) => (
              <li key={f.en} className="flex items-start gap-2">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {t.b(f)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 md:py-20" aria-labelledby="cal-h">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="cal-h" className="text-3xl font-semibold tracking-tight md:text-4xl">
                {t("Traditions, stretched into seasons", "Tradicije produžene u sezone")}
              </h2>
              <p className="mt-3 max-w-[60ch] text-lg text-ink-2">
                {t(
                  "One-day festivals become weeks and months of reasons to visit.",
                  "Fešte od jednog dana postaju tjedni i mjeseci razloga za dolazak.",
                )}
              </p>
            </div>
            <Link href="/calendar" className="inline-flex items-center gap-1.5 font-medium text-accent">
              <CalendarDots size={20} /> {t("Full Calendar 365", "Cijeli Kalendar 365")} <ArrowRight />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((c) => (
              <li key={c.title.en} className="rounded-2xl border border-line bg-bg p-5">
                <p className="font-mono text-sm text-ink-3">{t.b(c.months)}</p>
                <p className="mt-2 font-medium">{t.b(c.title)}</p>
                <p className="mt-2 text-sm text-ink-2">{t.b(c.stretched)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
        <Link href="/hotel" className="group rounded-2xl border border-line bg-surface p-6 transition hover:shadow-soft md:p-8">
          <Buildings size={28} className="text-accent" />
          <h2 className="mt-3 text-2xl font-semibold">{t("One partner hotel to start", "Za početak jedan partnerski hotel")}</h2>
          <p className="mt-2 text-ink-2">
            {t(
              "A contract with one hotel in Lapad: guaranteed rooms and a heated pool for our guests, a better margin for us, and a safe first step into the off-season for the hotel.",
              "Ugovor s jednim hotelom u Lapadu: zajamčene sobe i grijani bazen za naše goste, veća zarada za nas i siguran prvi korak u rad izvan sezone za hotel.",
            )}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent">
            {t("The deal", "Ugovor")} <ArrowRight className="transition group-hover:translate-x-0.5" />
          </span>
        </Link>
        <Link href="/community" className="group rounded-2xl border border-line bg-surface p-6 transition hover:shadow-soft md:p-8">
          <UsersThree size={28} className="text-accent" />
          <h2 className="mt-3 text-2xl font-semibold">{t("Run by local people", "Vode ga lokalni ljudi")}</h2>
          <p className="mt-2 text-ink-2">
            {t(
              "Boatmen become photo-safari guides, farms host harvests, physiotherapists work through the winter. Every partner on the itinerary is a stakeholder.",
              "Lađari postaju vodiči foto safarija, gospodarstva ugošćuju berbe, fizioterapeuti rade i zimi. Svaki partner na itineraru je dionik.",
            )}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent">
            {t("Jobs, partners, nature", "Poslovi, partneri, priroda")} <ArrowRight className="transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      <section className="relative overflow-hidden">
        <Image src="/img/dubrovnik-walls.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0d1311]/65" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-[#f3faf6] sm:px-6 md:py-28">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#b8e6cf]">{t("You travel. We care.", "Vi putujete, mi brinemo.")}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            {t(
              "Marta's active week, and what happens when she falls on the city walls.",
              "Martin aktivni tjedan i što se dogodi kad padne na gradskim zidinama.",
            )}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg text-[#d7e4dd]">
            {t(
              "Marta, 54, and Thomas are empty nesters from Vienna. The demo follows her from the Neretva photo safari to the hospital, an adapted room in the partner hotel, rehab by the sea, and back next March for Ston.",
              "Marta (54) i Thomas iz Beča, djeca su im otišla od kuće. Demo je prati od foto safarija na Neretvi do bolnice, prilagođene sobe u partnerskom hotelu, rehabilitacije uz more i povratka idućeg ožujka zbog Stona.",
            )}
          </p>
          <Link
            href="/start"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f3faf6] px-6 py-3 font-medium text-[#15201b] transition active:scale-[0.98]"
          >
            {t("Start the demo", "Pokreni demo")} <ArrowRight weight="bold" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t("Built on open data", "Izgrađeno na otvorenim podacima")}</h2>
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
          {t(
            "Health features support guests and doctors; they never diagnose. Health data stays on the device unless the guest agrees to share it. Partners, prices and the hotel are sample data.",
            "Zdravstvene funkcije pomažu gostima i liječnicima, nikad ne postavljaju dijagnozu. Zdravstveni podaci ostaju na uređaju, osim ako gost pristane podijeliti ih. Partneri, cijene i hotel su primjeri.",
          )}
        </p>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 text-sm text-ink-3 sm:px-6">
          <p className="font-medium text-ink-2">{t("VitaNatura 365, Tourism 365 hackathon demo", "VitaNatura 365, demo za hackathon Turizam 365")}</p>
          <p className="mt-3">{t("Photos from Wikimedia Commons:", "Fotografije s Wikimedia Commonsa:")}</p>
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
          <p className="mt-3">
            {t(
              "Map data and places: OpenStreetMap contributors, ODbL. Weather: Open-Meteo, CC BY 4.0.",
              "Podaci karte i mjesta: OpenStreetMap contributors, ODbL. Vrijeme: Open-Meteo, CC BY 4.0.",
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
