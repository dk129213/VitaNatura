import Image from "next/image";
import { Handshake, CheckCircle, Buildings, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { PageHeader, NextStep, SampleNote } from "@/components/ui";
import { hotelDeal } from "@/data/destination";
import { weekPackage } from "@/data/tours";

export default function HotelPage() {
  return (
    <div>
      <PageHeader
        module="Partner hotel"
        title="One partner hotel, open all winter"
        intro="We sign one contract with one hotel in Lapad instead of booking room by room. We earn more and always have safe rooms; the hotel learns to work off-season with guests guaranteed."
      />

      <section className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Image src="/img/lapad.jpg" alt="Lapad bay in Dubrovnik at sunset" width={1920} height={1194} className="h-56 w-full object-cover md:h-full" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Handshake size={24} className="text-accent" />
            <h2 className="text-xl font-semibold">What the contract says</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {hotelDeal.terms.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" /> {x}
              </li>
            ))}
          </ul>
          <SampleNote>Sample partner. We name the hotel once the contract is signed.</SampleNote>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <UsersThree size={22} className="text-accent" />
            <h2 className="font-semibold">What we get</h2>
          </div>
          <ul className="mt-3 space-y-2 text-ink-2">
            {hotelDeal.weGet.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center gap-2">
            <Buildings size={22} className="text-accent" />
            <h2 className="font-semibold">What the hotel gets</h2>
          </div>
          <ul className="mt-3 space-y-2 text-ink-2">
            {hotelDeal.hotelGets.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl bg-accent-soft p-6">
        <h2 className="font-semibold">
          Sold as the {weekPackage.name}: €{weekPackage.adult} per adult, €{weekPackage.child} per child
        </h2>
        <p className="mt-1 text-ink-2">{weekPackage.basis}</p>
      </section>

      <section className="mt-10" aria-labelledby="phase-h">
        <h2 id="phase-h" className="text-xl font-semibold">
          Step by step into the off-season
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {hotelDeal.phases.map((p, i) => (
            <li key={p.when} className={`rounded-2xl border p-5 ${i === 0 ? "border-accent bg-accent-soft" : "border-line bg-surface"}`}>
              <p className="font-mono text-sm text-ink-3">{p.when}</p>
              <p className="mt-2 font-medium">{p.what}</p>
            </li>
          ))}
        </ol>
      </section>

      <NextStep href="/community" label="Who takes part" hint="Every farm, boatman, guide and museum on the route is a partner." />
    </div>
  );
}
