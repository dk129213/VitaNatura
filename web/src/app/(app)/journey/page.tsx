"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle, CircleDashed, ArrowRight, Circle } from "@phosphor-icons/react";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

type Status = "done" | "now" | "next";

const steps: { date: string; title: string; detail: string; href: string; module: string; status: Status }[] = [
  {
    date: "2 Oct",
    title: "Fall on the trail, emergency care in Zadar",
    detail: "Triage pointed to the emergency department. Health passport sent ahead in Croatian.",
    href: "/help",
    module: "Help on the road",
    status: "done",
  },
  {
    date: "3 Oct",
    title: "Adapted van from Zadar to Zagreb",
    detail: "Door to door with the leg elevated. Arrives at a step-free apartment near the clinic.",
    href: "/transport",
    module: "Accessible transport",
    status: "now",
  },
  {
    date: "5 Oct",
    title: "Surgery at Klinika za traumatologiju",
    detail: "Matched on specialty, emergency department and distance. Records translated and shared.",
    href: "/clinic",
    module: "Clinic and stay",
    status: "next",
  },
  {
    date: "5 Oct - 26 Oct",
    title: "Recovery at home, monitored",
    detail: "Smartwatch data, daily check-in and wound photos give the doctor one summary a day.",
    href: "/recovery",
    module: "Recovery",
    status: "next",
  },
  {
    date: "Mid November",
    title: "14 days of rehabilitation in Varaždinske Toplice",
    detail: "Thermal pool, physiotherapy and paved forest walks, unlocked step by step.",
    href: "/wellness",
    module: "Rehab and nature",
    status: "next",
  },
  {
    date: "Autumn 2027",
    title: "A quiet week at an olive mill",
    detail: "A family farm matched to what Marta can do by then. Picking is optional, the mill is step-free.",
    href: "/explore",
    module: "Crowd-free trips",
    status: "next",
  },
];

const icon = { done: CheckCircle, now: CircleDashed, next: Circle };

export default function JourneyPage() {
  const hydrated = useHydrated();
  const { intakeDone } = useVita();

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/img/paklenica.jpg"
          alt="Limestone walls of the Velika Paklenica canyon"
          width={1920}
          height={1440}
          priority
          className="h-56 w-full object-cover md:h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1311]/85 via-[#0d1311]/35 to-transparent" />
        <div className="absolute bottom-0 p-6 text-[#f3faf6] md:p-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Marta&apos;s plan</h1>
          <p className="mt-2 max-w-[60ch] text-[#d7e4dd]">
            From a fall in Paklenica to walking in the forest again. One profile, six connected steps.
          </p>
        </div>
      </div>

      {hydrated && !intakeDone && (
        <p className="mt-6 rounded-2xl border border-warn/30 bg-warn-soft p-4 text-ink">
          This plan is built from Marta&apos;s profile.{" "}
          <Link href="/start" className="font-medium underline underline-offset-4">
            Start the profile chat
          </Link>{" "}
          to see how it is created.
        </p>
      )}

      <ol className="relative mt-10 space-y-3 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-line">
        {steps.map((s, i) => {
          const Icon = icon[s.status];
          return (
            <motion.li
              key={s.title}
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
                    <span className="font-mono">{s.date}</span>
                    <span className="mx-2">|</span>
                    {s.module}
                    {s.status === "now" && <span className="ml-2 font-medium text-accent">Today</span>}
                  </p>
                  <p className="mt-1 text-lg font-medium">{s.title}</p>
                  <p className="mt-1 max-w-[65ch] text-ink-2">{s.detail}</p>
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
        <h2 className="text-lg font-semibold">Why one profile matters</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 text-ink-2 md:grid-cols-2">
          <li>The mobility code from the chat (WCHS) fills every transport assistance request.</li>
          <li>The recovery stage decides which pools and trails are unlocked later.</li>
          <li>The penicillin allergy reaches the emergency team, the surgeon and the spa doctor.</li>
          <li>&quot;No steps&quot; filters the apartment, the spa room and the farm stays.</li>
        </ul>
      </section>
    </div>
  );
}
