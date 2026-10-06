import Image from "next/image";
import { MaskHappy, Leaf, Bird, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { calendar, yearRound, type CalendarItem } from "@/data/destination";

const kindMeta: Record<CalendarItem["kind"], { icon: typeof Leaf; label: string }> = {
  tradition: { icon: MaskHappy, label: "Tradition" },
  harvest: { icon: Leaf, label: "Harvest" },
  nature: { icon: Bird, label: "Nature" },
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        module="Calendar 365"
        title="One-day festivals, stretched into seasons"
        intro="The region already has feasts, harvests and dances worth travelling for. Most last a day or a summer week. We stretch them, so there is a reason to come every month."
      />

      <section className="mt-8 overflow-x-auto rounded-2xl border border-line bg-surface p-5 md:p-6" aria-labelledby="year-h">
        <h2 id="year-h" className="font-semibold">
          Something to do in every month
        </h2>
        <table className="mt-4 w-full min-w-[640px] border-separate border-spacing-1 text-sm">
          <thead>
            <tr>
              <th className="w-[32%]" />
              {months.map((m) => (
                <th key={m} className="font-normal text-ink-3">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {yearRound.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="pr-2 text-left font-normal text-ink-2">
                  {r.label}
                </th>
                {months.map((m, i) => {
                  const on = r.months.includes(i + 1);
                  return (
                    <td key={m} className="h-7">
                      <span
                        className={`block h-full rounded ${on ? (r.summer ? "bg-ink-3/40" : "bg-accent") : "bg-surface-2"}`}
                        aria-label={on ? "yes" : "no"}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <SampleNote>Planned calendar. Feast and harvest dates are confirmed each year with organisers and farms.</SampleNote>
      </section>

      <ol className="mt-10 space-y-4">
        {calendar.map((c) => {
          const k = kindMeta[c.kind];
          return (
            <li
              key={c.title}
              className={`overflow-hidden rounded-2xl border border-line bg-surface ${c.image ? "md:grid md:grid-cols-[220px_1fr]" : ""}`}
            >
              {c.image && <Image src={c.image} alt={c.title} width={800} height={600} className="h-40 w-full object-cover md:h-full" />}
              <div className="p-5 md:p-6">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3">
                  <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                    <k.icon size={18} /> {k.label}
                  </span>
                  <span className="font-mono">{c.months}</span>
                </p>
                <h2 className="mt-1 text-lg font-semibold">{c.title}</h2>
                <p className="text-sm text-ink-3">{c.place}</p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-ink-3">Today</p>
                    <p className="mt-1 text-ink-2">{c.today}</p>
                  </div>
                  <ArrowRight className="hidden text-ink-3 md:mt-6 md:block" size={20} />
                  <div className="rounded-xl bg-accent-soft p-3.5">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent">Stretched</p>
                    <p className="mt-1">{c.stretched}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <NextStep href="/hotel" label="See the partner hotel" hint="Every tour starts from one partner hotel that stays open all winter." />
    </div>
  );
}
