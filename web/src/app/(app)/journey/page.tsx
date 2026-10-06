"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle, CircleDashed, Circle, ArrowsClockwise } from "@phosphor-icons/react";
import { useVita } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { persona, week } from "@/data/scenario";

const icon = { done: CheckCircle, now: CircleDashed, next: Circle };

export default function JourneyPage() {
  const hydrated = useHydrated();
  const { intakeDone } = useVita();

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/img/opuzen-neretva.jpg"
          alt="The Neretva river at Opuzen"
          width={1920}
          height={1275}
          priority
          className="h-56 w-full object-cover md:h-64"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1311]/85 via-[#0d1311]/35 to-transparent" />
        <div className="absolute bottom-0 p-6 text-[#f3faf6] md:p-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Marta&apos;s week, rearranged</h1>
          <p className="mt-2 max-w-[60ch] text-[#d7e4dd]">{persona.role}. One fall, and the holiday goes on.</p>
        </div>
      </div>

      {hydrated && !intakeDone && (
        <p className="mt-6 rounded-2xl border border-warn/30 bg-warn-soft p-4 text-ink">
          This plan comes from Marta&apos;s chat.{" "}
          <Link href="/start" className="font-medium underline underline-offset-4">
            Start the chat
          </Link>{" "}
          to see how it is made.
        </p>
      )}

      <ol className="relative mt-10 space-y-3 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-line">
        {week.map((d, i) => {
          const Icon = icon[d.status];
          const body = (
            <>
              <p className="text-sm text-ink-3">
                <span className="font-mono">{d.date}</span>
                {d.status === "now" && <span className="ml-2 font-medium text-accent">Today</span>}
              </p>
              <p className={`mt-1 text-lg font-medium ${d.adapted ? "text-ink-3 line-through decoration-1" : ""}`}>{d.planned}</p>
              {d.adapted && (
                <p className="mt-1 flex items-start gap-2 text-ink">
                  <ArrowsClockwise size={18} className="mt-1 shrink-0 text-accent" /> {d.adapted}
                </p>
              )}
            </>
          );
          const cls = `block rounded-2xl border p-5 ${d.status === "now" ? "border-accent/50 bg-surface" : "border-line bg-surface"}`;
          return (
            <motion.li
              key={d.date}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-[40px_1fr] gap-4"
            >
              <span
                className={`relative z-10 mt-4 grid size-10 place-items-center rounded-full ${
                  d.status === "done"
                    ? "bg-accent text-accent-ink"
                    : d.status === "now"
                      ? "bg-accent-soft text-accent ring-2 ring-accent"
                      : "bg-surface text-ink-3 ring-1 ring-line"
                }`}
              >
                <Icon size={20} weight={d.status === "next" ? "regular" : "bold"} />
              </span>
              {d.href ? (
                <Link href={d.href} className={`${cls} transition hover:shadow-soft`}>
                  {body}
                </Link>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </motion.li>
          );
        })}
      </ol>

      <section className="mt-12 rounded-2xl bg-surface-2 p-6">
        <h2 className="text-lg font-semibold">Why this matters</h2>
        <p className="mt-2 max-w-[70ch] text-ink-2">
          Out in the countryside, a small accident can end a holiday: no address, no English, the clinic closed on Sunday,
          a child to look after. Our guides are trained in first aid, and Vita handles the rest, so the family stays,
          enjoys the week and comes back.
        </p>
      </section>
    </div>
  );
}
