"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FastForward } from "@phosphor-icons/react";
import { ChatPanel } from "@/components/ChatPanel";
import { PageHeader } from "@/components/ui";
import { useScripts } from "@/lib/useScripts";
import { useVita, demoProfile, demoProfileHr, type Profile } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { useT } from "@/lib/i18n";

const fields: { key: keyof Profile; en: string; hr: string }[] = [
  { key: "situation", en: "What happened", hr: "Što se dogodilo" },
  { key: "location", en: "Where", hr: "Gdje" },
  { key: "companion", en: "With", hr: "S kim" },
  { key: "injury", en: "Diagnosis from the hospital", hr: "Dijagnoza iz bolnice" },
  { key: "destination", en: "Plan", hr: "Plan" },
  { key: "weightBearing", en: "Weight bearing", hr: "Opterećenje noge" },
  { key: "stairs", en: "Steps", hr: "Stepenice" },
  { key: "mobilityCode", en: "Mobility code", hr: "Oznaka pokretljivosti" },
  { key: "conditions", en: "Conditions", hr: "Bolesti" },
  { key: "allergies", en: "Allergies", hr: "Alergije" },
  { key: "medication", en: "Medication", hr: "Lijekovi" },
];

export default function StartPage() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const t = useT();
  const { intakeScript } = useScripts();
  const { profile, patch, setIntakeDone } = useVita();
  const shown = hydrated ? fields.filter((f) => profile[f.key]) : [];

  return (
    <div>
      <PageHeader
        module={t("Your profile", "Vaš profil")}
        title={t("Tell Vita once. Every step uses it.", "Recite Viti jednom. Svaki korak to koristi.")}
        intro={t(
          "Marta is on day 4 of her active and health week when she falls on the city walls. She describes it in her own words, and Vita turns it into a structured profile: needs, mobility and health details. It never makes a diagnosis.",
          "Marta je 4. dan svog aktivnog i zdravstvenog tjedna kad padne na gradskim zidinama. Opiše to svojim riječima, a Vita od toga složi profil: potrebe, pokretljivost i zdravstvene podatke. Nikad ne postavlja dijagnozu.",
        )}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ChatPanel script={intakeScript} className="h-[640px]" onEnd={() => setIntakeDone(true)} />

        <section aria-labelledby="profile-h" className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="profile-h" className="text-xl font-semibold">
                {t("Marta's profile", "Martin profil")}
              </h2>
              <p className="mt-1 text-ink-3">{t("Builds up while you talk.", "Puni se dok razgovarate.")}</p>
            </div>
            <button
              onClick={() => {
                patch(t.lang === "hr" ? demoProfileHr : demoProfile);
                setIntakeDone(true);
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2 hover:bg-surface-2"
            >
              <FastForward /> {t("Fill for demo", "Popuni za demo")}
            </button>
          </div>

          {shown.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-line p-6 text-ink-3">
              {t(
                "Nothing yet. Answer the first question on the left and details appear here.",
                "Još ništa. Odgovorite na prvo pitanje lijevo i podaci će se pojaviti ovdje.",
              )}
            </div>
          ) : (
            <dl className="mt-6 space-y-4">
              <AnimatePresence initial={false}>
                {shown.map((f) => (
                  <motion.div
                    key={f.key}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="grid grid-cols-1 gap-0.5 sm:grid-cols-[170px_1fr]"
                  >
                    <dt className="text-sm text-ink-3">{t(f.en, f.hr)}</dt>
                    <dd className={f.key === "mobilityCode" ? "font-mono font-semibold text-accent" : ""}>
                      {profile[f.key]}
                    </dd>
                  </motion.div>
                ))}
              </AnimatePresence>
            </dl>
          )}

          {hydrated && profile.mobilityCode && (
            <p className="mt-6 rounded-xl bg-surface-2 p-4 text-sm text-ink-2">
              <span className="font-mono font-semibold text-ink">{profile.mobilityCode}</span>{" "}
              {t(
                "is the standard airline code for passengers who can walk short distances but cannot manage steps. Vita fills it into every assistance request automatically.",
                "je standardna oznaka zrakoplovnih tvrtki za putnike koji mogu hodati na kratke udaljenosti, ali ne mogu svladati stepenice. Vita je sama upisuje u svaki zahtjev za asistenciju.",
              )}
            </p>
          )}

          {hydrated && profile.allergies && (
            <Link href="/journey" className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink">
              {t("Go to my plan", "Idi na moj plan")}
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
