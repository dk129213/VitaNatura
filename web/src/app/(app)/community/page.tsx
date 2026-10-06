"use client";

import { Briefcase, Leaf, Handshake, Target, CheckCircle } from "@phosphor-icons/react";
import { PageHeader, SampleNote } from "@/components/ui";
import { audience, jobs, stakeholders, ecology } from "@/data/destination";
import { useT } from "@/lib/i18n";

export default function CommunityPage() {
  const t = useT();

  // The hackathon brief, point by point, and where the answer is.
  const brief = [
    [t("A need for the destination and the local community", "Potreba destinacije i lokalne zajednice"), t("Empty hotels and no work from October to May; summer overcrowding", "Prazni hoteli i nema posla od listopada do svibnja; ljetne gužve")],
    [t("Who is it for, all year", "Za koga je, cijele godine"), t("Empty nesters, 50 to 65, insured, travelling off-season", "Empty nesteri, 50 do 65 godina, osigurani, putuju izvan sezone")],
    [t("Realistic", "Realno"), t("Existing hotel, farms, boats and traditions; one hotel first, then grow", "Postojeći hotel, gospodarstva, lađe i tradicije; prvo jedan hotel, zatim rast")],
    [t("Ecological influence", "Utjecaj na okoliš"), t("Small groups, no new buildings, shared transport, see below", "Male grupe, bez nove gradnje, zajednički prijevoz, vidi niže")],
    [t("Inclusion of the local population", "Uključivanje lokalnog stanovništva"), t("Locals are the guides, hosts and staff; residents use the pool and paths", "Lokalni ljudi su vodiči, domaćini i osoblje; stanovnici koriste bazen i staze")],
    [t("Working and volunteering", "Rad i volontiranje"), t("New year-round jobs below; guests can join sea clean-ups and harvests", "Novi poslovi cijele godine niže; gosti se mogu priključiti čišćenju mora i berbama")],
    [t("Stakeholders", "Dionici"), t("Everyone with an activity on the itinerary, listed below", "Svatko tko ima aktivnost na itineraru, popis niže")],
    [t("The experience", "Iskustvo"), t("An active and health week with a safety net, see Marta's story", "Aktivni i zdravstveni tjedan sa sigurnosnom mrežom, vidi Martinu priču")],
    [t("Concrete enhancements, not marketing", "Konkretna poboljšanja, ne marketing"), t("Photo hides, launch points, salt room, winter pool, farm seating, stretched festivals", "Skrovišta za fotografiranje, mjesta za kanue, slana soba, zimski bazen, klupe na imanjima, produžene fešte")],
  ];

  return (
    <div>
      <PageHeader
        module={t("Destination 365", "Destinacija 365")}
        title={t("Local people, partners and nature", "Lokalni ljudi, partneri i priroda")}
        intro={t(
          "The plan only works if local people want it. They earn from it, they run it, and they get services that stay open for them in winter too.",
          "Plan radi samo ako ga lokalni ljudi žele. Od njega zarađuju, oni ga vode i dobivaju usluge koje su i njima otvorene zimi.",
        )}
      />

      <section className="mt-8 rounded-2xl bg-accent-soft p-6 md:p-8" aria-labelledby="aud-h">
        <div className="flex items-center gap-2">
          <Target size={24} className="text-accent" />
          <h2 id="aud-h" className="text-xl font-semibold">
            {t("Target audience: ", "Ciljana skupina: ")}
            {t.b(audience.title)}
          </h2>
        </div>
        <p className="mt-2 max-w-[70ch] text-ink-2">{t.b(audience.text)}</p>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {audience.facts.map((f) => (
            <li key={f.en} className="flex items-start gap-2">
              <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {t.b(f)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="jobs-h">
        <div className="flex items-center gap-2">
          <Briefcase size={24} className="text-accent" />
          <h2 id="jobs-h" className="text-xl font-semibold">
            {t("Jobs for local people", "Posao za lokalne ljude")}
          </h2>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((j) => (
            <li key={j.title.en} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-medium">{t.b(j.title)}</p>
              <p className="mt-1 text-ink-2">{t.b(j.who)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[70ch] text-ink-2">
          {t(
            "Residents also gain: the heated pool sells local passes, the birdwatching route and the benches on the Ston walls are public, and the stretched festivals are for them as much as for guests.",
            "Koristi imaju i stanovnici: grijani bazen prodaje karte lokalnima, staza za promatranje ptica i klupe na Stonskim zidinama su javne, a produžene fešte su jednako za njih kao i za goste.",
          )}
        </p>
      </section>

      <section className="mt-10" aria-labelledby="st-h">
        <div className="flex items-center gap-2">
          <Handshake size={24} className="text-accent" />
          <h2 id="st-h" className="text-xl font-semibold">
            {t("Stakeholders: everyone with an activity on the itinerary", "Dionici: svatko tko ima aktivnost na itineraru")}
          </h2>
        </div>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {stakeholders.map((s) => (
            <li key={s.name.en} className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-4">
              <p className="font-medium">{t.b(s.name)}</p>
              <p className="text-ink-2">{t.b(s.role)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="eco-h">
        <div className="flex items-center gap-2">
          <Leaf size={24} className="text-accent" />
          <h2 id="eco-h" className="text-xl font-semibold">
            {t("Effect on nature, and how we keep it low", "Utjecaj na prirodu i kako ga smanjujemo")}
          </h2>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {ecology.map((e) => (
            <li key={e.risk.en} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm text-ink-3">{t.b(e.risk)}</p>
              <p className="mt-1 font-medium">{t.b(e.answer)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-surface-2 p-6 md:p-8" aria-labelledby="brief-h">
        <h2 id="brief-h" className="text-xl font-semibold">
          {t("The hackathon brief, point by point", "Zadatak hackathona, točku po točku")}
        </h2>
        <dl className="mt-4 space-y-3">
          {brief.map(([q, a]) => (
            <div key={q} className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4">
              <dt className="flex items-start gap-2 font-medium">
                <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {q}
              </dt>
              <dd className="text-ink-2">{a}</dd>
            </div>
          ))}
        </dl>
        <SampleNote>
          {t(
            "Marketing is deliberately small: referrals from insurers and partner travel agencies for over-50s, and the partner hotel's own guests.",
            "Marketing je namjerno malen: preporuke osiguravatelja i partnerskih agencija za putnike 50+ te gosti samog partnerskog hotela.",
          )}
        </SampleNote>
      </section>
    </div>
  );
}
