import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function PageHeader({ module, title, intro }: { module?: string; title: string; intro: string }) {
  return (
    <header className="max-w-3xl">
      {module && <p className="text-sm font-medium text-accent">{module}</p>}
      <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-ink-2">{intro}</p>
    </header>
  );
}

export function NextStep({ href, label, hint }: { href: string; label: string; hint: string }) {
  return (
    <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-ink-2">{hint}</p>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98] sm:self-auto"
      >
        {label} <ArrowRight weight="bold" />
      </Link>
    </div>
  );
}

export function SampleNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm text-ink-3">{children}</p>;
}
