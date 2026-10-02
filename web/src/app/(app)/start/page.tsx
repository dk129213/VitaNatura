"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FastForward } from "@phosphor-icons/react";
import { ChatPanel } from "@/components/ChatPanel";
import { PageHeader } from "@/components/ui";
import { intakeScript } from "@/lib/scripts";
import { useVita, demoProfile, type Profile } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

const fields: { key: keyof Profile; label: string }[] = [
  { key: "situation", label: "What happened" },
  { key: "location", label: "Where" },
  { key: "companion", label: "With" },
  { key: "injury", label: "Diagnosis from the hospital" },
  { key: "destination", label: "Wants treatment in" },
  { key: "weightBearing", label: "Weight bearing" },
  { key: "stairs", label: "Steps" },
  { key: "mobilityCode", label: "Mobility code" },
  { key: "conditions", label: "Conditions" },
  { key: "allergies", label: "Allergies" },
  { key: "medication", label: "Medication" },
];

export default function StartPage() {
  const hydrated = useHydrated();
  const reduce = useReducedMotion();
  const { profile, patch, setIntakeDone } = useVita();
  const shown = hydrated ? fields.filter((f) => profile[f.key]) : [];

  return (
    <div>
      <PageHeader
        module="Your profile"
        title="Tell Vita once. Every step uses it."
        intro="Describe the situation in your own words. Vita turns it into a structured profile: needs, mobility and health details. It never makes a diagnosis."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ChatPanel script={intakeScript} className="h-[640px]" onEnd={() => setIntakeDone(true)} />

        <section aria-labelledby="profile-h" className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="profile-h" className="text-xl font-semibold">
                Marta&apos;s profile
              </h2>
              <p className="mt-1 text-ink-3">Builds up while you talk.</p>
            </div>
            <button
              onClick={() => {
                patch(demoProfile);
                setIntakeDone(true);
              }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-2 hover:bg-surface-2"
            >
              <FastForward /> Fill for demo
            </button>
          </div>

          {shown.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-line p-6 text-ink-3">
              Nothing yet. Answer the first question on the left and details appear here.
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
                    <dt className="text-sm text-ink-3">{f.label}</dt>
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
              <span className="font-mono font-semibold text-ink">{profile.mobilityCode}</span> is the standard airline
              code for passengers who can walk short distances but cannot manage steps. Vita fills it into every
              assistance request automatically.
            </p>
          )}

          {hydrated && profile.allergies && (
            <Link href="/journey" className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink">
              Go to my plan
            </Link>
          )}
        </section>
      </div>
    </div>
  );
}
