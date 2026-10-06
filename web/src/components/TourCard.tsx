import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, CalendarBlank, Baby } from "@phosphor-icons/react/dist/ssr";
import { type Tour, categoryLabel } from "@/data/tours";

// Compact card for the offer grid: photo, price, when, how long.
export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <Link
      href={`/tours#${tour.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:shadow-soft"
    >
      <div className="relative">
        <Image
          src={tour.image}
          alt={tour.name}
          width={800}
          height={560}
          priority={priority}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#0d1311]/70 px-2.5 py-1 text-xs font-medium text-[#f3faf6]">
          {categoryLabel[tour.category]}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-surface px-3 py-1 text-sm font-semibold shadow-soft">
          from €{tour.adult}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug">{tour.name}</h3>
        <p className="mt-1 text-sm text-ink-2">{tour.pitch}</p>
        <ul className="mt-auto space-y-1 pt-3 text-sm text-ink-3">
          <li className="flex items-center gap-1.5">
            <MapPin className="shrink-0" /> {tour.area}
          </li>
          <li className="flex items-center gap-1.5">
            <CalendarBlank className="shrink-0" /> {tour.season}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="shrink-0" /> {tour.duration}
          </li>
          <li className="flex items-center gap-1.5 text-accent">
            <Baby className="shrink-0" /> Kids €{tour.child} ({tour.childAges})
          </li>
        </ul>
      </div>
    </Link>
  );
}
