import { Coins, Bank, TrendUp, Megaphone, Globe, CalendarDots } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { startCosts, funding, revenue, targets, marketing } from "@/data/destination";

const eur = (n: number) => "€" + n.toLocaleString("en");

// A simple horizontal bar for shares that add up to 100.
function Bar({ share }: { share: number }) {
  return (
    <span className="block h-2 w-full overflow-hidden rounded-full bg-surface-2" aria-hidden>
      <span className="block h-full rounded-full bg-accent" style={{ width: `${share}%` }} />
    </span>
  );
}

export default function PlanPage() {
  const total = startCosts.reduce((s, c) => s + c.eur, 0);

  return (
    <div>
      <PageHeader
        module="Financing and marketing"
        title="What it costs, who pays, how guests find us"
        intro={`About ${eur(total)} to start the pilot, mostly from grants and partners. Break-even in the second season.`}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="cost-h">
          <div className="flex items-center gap-2">
            <Coins size={22} className="text-accent" />
            <h2 id="cost-h" className="font-semibold">
              Start-up costs, pilot year
            </h2>
          </div>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {startCosts.map((c) => (
                <tr key={c.item} className="border-t border-line first:border-0">
                  <td className="py-2">{c.item}</td>
                  <td className="py-2 text-right font-mono">{eur(c.eur)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-ink">
                <td className="py-2 font-semibold">Total</td>
                <td className="py-2 text-right font-mono font-semibold">{eur(total)}</td>
              </tr>
            </tbody>
          </table>
          <SampleNote>Our estimates, to be confirmed with suppliers.</SampleNote>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-6" aria-labelledby="fund-h">
          <div className="flex items-center gap-2">
            <Bank size={22} className="text-accent" />
            <h2 id="fund-h" className="font-semibold">
              Who pays for it
            </h2>
          </div>
          <ul className="mt-4 space-y-4">
            {funding.map((f) => (
              <li key={f.source}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium">{f.source}</p>
                  <p className="font-mono text-sm">
                    {f.share}% · {eur(Math.round((total * f.share) / 100 / 100) * 100)}
                  </p>
                </div>
                <p className="mb-1.5 text-sm text-ink-3">{f.note}</p>
                <Bar share={f.share} />
              </li>
            ))}
          </ul>
          <SampleNote>Grant calls change every year; we check the open ones before applying.</SampleNote>
        </section>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <TrendUp size={22} className="text-accent" />
            <h2 className="font-semibold">How it earns</h2>
          </div>
          <ul className="mt-3 space-y-2">
            {revenue.map((r) => (
              <li key={r.stream}>
                <span className="font-medium">{r.stream}: </span>
                <span className="text-ink-2">{r.how}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold">Targets</h2>
          <ol className="mt-3 space-y-3">
            {targets.map((t) => (
              <li key={t.year} className="grid grid-cols-[120px_1fr] gap-3">
                <span className="font-mono text-sm text-ink-3">{t.year}</span>
                <span>
                  <span className="font-medium">{t.guests}</span> <span className="text-ink-2">· {t.note}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="mkt-h">
        <div className="flex items-center gap-2">
          <Megaphone size={24} className="text-accent" />
          <h2 id="mkt-h" className="text-xl font-semibold">
            Marketing plan
          </h2>
        </div>
        <div className="mt-4 rounded-2xl bg-accent-soft p-5">
          <p className="flex items-center gap-2 font-medium">
            <Globe size={20} className="text-accent" /> Who we sell to
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-1 text-ink-2 md:grid-cols-3">
            {marketing.markets.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {marketing.channels.map((c) => (
            <li key={c.name} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-medium">{c.name}</p>
              <p className="mt-1 text-ink-2">{c.how}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-semibold">Marketing budget, year 1: {eur(20000)}</h3>
            <ul className="mt-4 space-y-3">
              {marketing.budget.map((b) => (
                <li key={b.item}>
                  <div className="flex justify-between text-sm">
                    <span>{b.item}</span>
                    <span className="font-mono">{b.share}%</span>
                  </div>
                  <Bar share={b.share} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="flex items-center gap-2 font-semibold">
              <CalendarDots size={20} className="text-accent" /> Timeline
            </h3>
            <ol className="mt-3 space-y-3">
              {marketing.timeline.map((t) => (
                <li key={t.when} className="grid grid-cols-[130px_1fr] gap-3">
                  <span className="font-mono text-sm text-ink-3">{t.when}</span>
                  <span>{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <NextStep href="/help" label="We care: help on the road" hint="And if something goes wrong on a tour, far from the city, we help." />
    </div>
  );
}
