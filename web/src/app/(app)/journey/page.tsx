"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle, CircleDashed, ArrowRight, Circle } from "@phosphor-icons/react";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT, type Bi } from "@/lib/i18n";

type Status = "done" | "now" | "next";

const b = (en: string, hr: string): Bi => ({ en, hr });

const steps: { date: Bi; title: Bi; detail: Bi; href: string; module: Bi; status: Status }[] = [
  {
    date: b("1 - 3 Oct", "1. - 3. lis."),
    title: b("Active and health week begins", "Počinje aktivni i zdravstveni tjedan"),
    detail: b(
      "Marta and Thomas, both empty nesters, arrive at the partner hotel in Lapad. Check-up on day 2, sunrise photo safari and mandarin picking in the Neretva valley on day 3.",
      "Marta i Thomas, čija su djeca otišla od kuće, stižu u partnerski hotel u Lapadu. Pregled 2. dan, foto safari u zoru i branje mandarina u dolini Neretve 3. dan.",
    ),
    href: "/active",
    module: b("Active tourism", "Aktivni turizam"),
    status: "done",
  },
  {
    date: b("4 Oct", "4. lis."),
    title: b("Fall on the city walls, emergency care in Dubrovnik", "Pad na gradskim zidinama, hitna skrb u Dubrovniku"),
    detail: b(
      "Triage pointed to the emergency department. Carry chair to Pile Gate, health passport sent ahead in Croatian.",
      "Trijaža je uputila na hitni prijem. Stolica za nošenje do Vrata od Pila, zdravstvena putovnica poslana unaprijed na hrvatskom.",
    ),
    href: "/help",
    module: b("Help on the road", "Pomoć na putu"),
    status: "done",
  },
  {
    date: b("6 Oct", "6. lis."),
    title: b("Surgery at Opća bolnica Dubrovnik", "Operacija u Općoj bolnici Dubrovnik"),
    detail: b(
      "Compared with Zagreb and Vienna, operating here was safest. Covered by her European Health Insurance Card.",
      "U usporedbi sa Zagrebom i Bečom, operacija ovdje bila je najsigurnija. Pokriva je Europska kartica zdravstvenog osiguranja.",
    ),
    href: "/clinic",
    module: b("Clinic and stay", "Klinika i smještaj"),
    status: "now",
  },
  {
    date: b("8 Oct", "8. lis."),
    title: b("Back to the partner hotel, in an adapted room", "Natrag u partnerski hotel, u prilagođenu sobu"),
    detail: b(
      "Under the contract the hotel keeps adapted ground-floor rooms free, so they stay where they were, without steps.",
      "Po ugovoru hotel drži prilagođene sobe u prizemlju slobodnima, pa ostaju gdje su i bili, bez stepenica.",
    ),
    href: "/hotel",
    module: b("Partner hotel", "Partnerski hotel"),
    status: "next",
  },
  {
    date: b("6 Oct - 1 Nov", "6. lis. - 1. stu."),
    title: b("Recovery in Lapad, monitored", "Oporavak u Lapadu, uz praćenje"),
    detail: b(
      "The same smartwatch from her active week, a daily check-in and wound photos give the hospital one summary a day.",
      "Isti pametni sat iz aktivnog tjedna, dnevna provjera i fotografije rane daju bolnici jedan sažetak dnevno.",
    ),
    href: "/recovery",
    module: b("Recovery", "Oporavak"),
    status: "next",
  },
  {
    date: b("2 - 15 Nov", "2. - 15. stu."),
    title: b("Rehabilitation by the sea at Kalos, Vela Luka", "Rehabilitacija uz more u Kalosu, Vela Luka"),
    detail: b("Seawater pool, physiotherapy and flat island paths, unlocked step by step.", "Bazen s morskom vodom, fizioterapija i ravne otočne staze, otključavaju se korak po korak."),
    href: "/wellness",
    module: b("Rehab and nature", "Rehabilitacija i priroda"),
    status: "next",
  },
  {
    date: b("17 Nov", "17. stu."),
    title: b("Flight home to Vienna with assistance", "Let kući u Beč s asistencijom"),
    detail: b(
      "Wheelchair at both airports, front-row seat, medical form signed by the surgeon.",
      "Invalidska kolica u obje zračne luke, sjedalo u prvom redu, medicinski obrazac potpisan od kirurga.",
    ),
    href: "/transport",
    module: b("Accessible transport", "Pristupačan prijevoz"),
    status: "next",
  },
  {
    date: b("March 2027", "Ožujak 2027."),
    title: b("Back to finish the week: Ston and the Neretva", "Povratak da završe tjedan: Ston i Neretva"),
    detail: b(
      "The oyster trail, a walk on the Ston walls, the salt room, and the canoe safari she missed. Off-season, on purpose.",
      "Put kamenica, šetnja Stonskim zidinama, slana soba i kanu safari koji je propustila. Izvan sezone, namjerno.",
    ),
    href: "/calendar",
    module: b("Calendar 365", "Kalendar 365"),
    status: "next",
  },
];

const icon = { done: CheckCircle, now: CircleDashed, next: Circle };

export default function JourneyPage() {
  const hydrated = useHydrated();
  const t = useT();
  const { intakeDone } = useVita();

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/img/dubrovnik.jpg"
          alt={t("Dubrovnik Old Town and its walls seen from above", "Stari grad Dubrovnik i zidine iz zraka")}
          width={1920}
          height={1182}
          priority
          className="h-56 w-full object-cover md:h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1311]/85 via-[#0d1311]/35 to-transparent" />
        <div className="absolute bottom-0 p-6 text-[#f3faf6] md:p-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("Marta's plan", "Martin plan")}</h1>
          <p className="mt-2 max-w-[60ch] text-[#d7e4dd]">
            {t(
              "An active and health week that turns into six weeks of recovery, and a reason to come back in March.",
              "Aktivni i zdravstveni tjedan koji postaje šest tjedana oporavka i razlog za povratak u ožujku.",
            )}
          </p>
        </div>
      </div>

      {hydrated && !intakeDone && (
        <p className="mt-6 rounded-2xl border border-warn/30 bg-warn-soft p-4 text-ink">
          {t("This plan is built from Marta's profile.", "Ovaj plan složen je iz Martinog profila.")}{" "}
          <Link href="/start" className="font-medium underline underline-offset-4">
            {t("Start the profile chat", "Pokreni razgovor za profil")}
          </Link>{" "}
          {t("to see how it is created.", "da vidite kako nastaje.")}
        </p>
      )}

      <ol className="relative mt-10 space-y-3 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-line">
        {steps.map((s, i) => {
          const Icon = icon[s.status];
          return (
            <motion.li
              key={s.title.en}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-[40px_1fr] gap-4"
            >
              <span
                className={`relative z-10 mt-4 grid size-10 place-items-center rounded-full ${
                  s.status === "done"
                    ? "bg-accent text-accent-ink"
                    : s.status === "now"
                      ? "bg-accent-soft text-accent ring-2 ring-accent"
                      : "bg-surface text-ink-3 ring-1 ring-line"
                }`}
              >
                <Icon size={20} weight={s.status === "next" ? "regular" : "bold"} />
              </span>
              <Link
                href={s.href}
                className={`group flex flex-col gap-3 rounded-2xl border p-5 transition hover:shadow-soft sm:flex-row sm:items-center sm:justify-between ${
                  s.status === "now" ? "border-accent/50 bg-surface" : "border-line bg-surface"
                }`}
              >
                <div>
                  <p className="text-sm text-ink-3">
                    <span className="font-mono">{t.b(s.date)}</span>
                    <span className="mx-2">|</span>
                    {t.b(s.module)}
                    {s.status === "now" && <span className="ml-2 font-medium text-accent">{t("Today", "Danas")}</span>}
                  </p>
                  <p className="mt-1 text-lg font-medium">{t.b(s.title)}</p>
                  <p className="mt-1 max-w-[65ch] text-ink-2">{t.b(s.detail)}</p>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            </motion.li>
          );
        })}
      </ol>

      <section className="mt-12 rounded-2xl bg-surface-2 p-6">
        <h2 className="text-lg font-semibold">{t("Why one profile matters", "Zašto je važan jedan profil")}</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 text-ink-2 md:grid-cols-2">
          <li>{t("The mobility code from the chat (WCHS) fills every transport assistance request.", "Oznaka pokretljivosti iz razgovora (WCHS) upisuje se u svaki zahtjev za asistenciju u prijevozu.")}</li>
          <li>{t("The recovery stage decides which pools and trails are unlocked later.", "Faza oporavka određuje koji se bazeni i staze kasnije otključavaju.")}</li>
          <li>{t("The penicillin allergy reaches the emergency team, the surgeon and the spa doctor.", "Alergija na penicilin stiže do hitne, kirurga i liječnika u lječilištu.")}</li>
          <li>{t("\"No steps\" filters the hotel room, the spa room and the farm visits.", "\"Bez stepenica\" filtrira hotelsku sobu, sobu u lječilištu i posjete gospodarstvima.")}</li>
        </ul>
      </section>
    </div>
  );
}
