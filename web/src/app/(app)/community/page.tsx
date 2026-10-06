import { Briefcase, Leaf, Handshake, Target, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, NextStep } from "@/components/ui";
import { audience, jobs, stakeholders, ecology } from "@/data/destination";

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        module="Locals and partners"
        title="Run by local people, light on nature"
        intro="Locals guide the tours, host the lunches and earn from them. The paths, hides and shows stay open for residents too."
      />

      <section className="mt-8 rounded-2xl bg-accent-soft p-6 md:p-8" aria-labelledby="aud-h">
        <div className="flex items-center gap-2">
          <Target size={24} className="text-accent" />
          <h2 id="aud-h" className="text-xl font-semibold">
            Who it is for: {audience.title.toLowerCase()}
          </h2>
        </div>
        <p className="mt-2 max-w-[70ch] text-ink-2">{audience.text}</p>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {audience.facts.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="jobs-h">
        <div className="flex items-center gap-2">
          <Briefcase size={24} className="text-accent" />
          <h2 id="jobs-h" className="text-xl font-semibold">
            Jobs for local people
          </h2>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((j) => (
            <li key={j.title} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-medium">{j.title}</p>
              <p className="mt-1 text-ink-2">{j.who}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[70ch] text-ink-2">
          Volunteering: guests can join the Green Sea Safari clean-up on the island walks, and local students help as
          junior guides on the photo safari.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="st-h">
        <div className="flex items-center gap-2">
          <Handshake size={24} className="text-accent" />
          <h2 id="st-h" className="text-xl font-semibold">
            Stakeholders: everyone with an activity on the route
          </h2>
        </div>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {stakeholders.map((s) => (
            <li key={s.name} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-4">
              <p className="font-medium">{s.name}</p>
              <p className="text-ink-2">{s.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="eco-h">
        <div className="flex items-center gap-2">
          <Leaf size={24} className="text-accent" />
          <h2 id="eco-h" className="text-xl font-semibold">
            Effect on nature, and how we keep it low
          </h2>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {ecology.map((e) => (
            <li key={e.risk} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm text-ink-3">{e.risk}</p>
              <p className="mt-1 font-medium">{e.answer}</p>
            </li>
          ))}
        </ul>
      </section>

      <NextStep href="/plan" label="Financing and marketing" hint="What it costs to start, who pays for it, and how guests find us." />
    </div>
  );
}
