"use client";

import { useCallback, useState } from "react";

type Point = { x: number; y: number };

// Single-series line with an optional reference line, crosshair and tooltip.
// One series, so no legend: the title above the chart names it.
export function LineChart({
  data,
  yMin,
  yMax,
  unit,
  reference,
  selected,
  onSelect,
  label,
  xLabel = (x: number) => `Day ${x}`,
}: {
  data: Point[];
  yMin: number;
  yMax: number;
  unit: string;
  reference?: { y: number; label: string };
  selected?: number;
  onSelect?: (x: number) => void;
  label: string;
  xLabel?: (x: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  // Draw at the real pixel width so labels keep their size on phones.
  const [W, setW] = useState(600);
  const box = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const fit = (w: number) => setW(Math.max(280, Math.round(w)));
    fit(el.clientWidth);
    const ro = new ResizeObserver(([e]) => fit(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = 200;
  const pad = { l: 36, r: 12, t: 12, b: 26 };
  const xs = data.map((d) => d.x);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const sx = (x: number) => pad.l + ((x - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const sy = (y: number) => pad.t + (1 - (y - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const path = data.map((d, i) => `${i ? "L" : "M"}${sx(d.x)},${sy(d.y)}`).join(" ");
  const ticks = [yMin, (yMin + yMax) / 2, yMax];
  const active = hover ?? selected ?? null;
  const activePoint = data.find((d) => d.x === active);

  return (
    <div ref={box} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={label}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={sy(t)} y2={sy(t)} stroke="var(--line)" strokeWidth={1} />
            <text x={pad.l - 8} y={sy(t) + 4} textAnchor="end" fontSize={12} fill="var(--ink-3)">
              {Math.round(t)}
            </text>
          </g>
        ))}
        {data.map((d) => (
          <text key={d.x} x={sx(d.x)} y={H - 6} textAnchor="middle" fontSize={12} fill="var(--ink-3)">
            {d.x}
          </text>
        ))}
        {reference && (
          <g>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={sy(reference.y)}
              y2={sy(reference.y)}
              stroke="var(--ink-3)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <text x={pad.l + 4} y={sy(reference.y) + 16} textAnchor="start" fontSize={12} fill="var(--ink-2)">
              {reference.label}
            </text>
          </g>
        )}
        {activePoint && (
          <line
            x1={sx(activePoint.x)}
            x2={sx(activePoint.x)}
            y1={pad.t}
            y2={H - pad.b}
            stroke="var(--ink-3)"
            strokeWidth={1}
          />
        )}
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" />
        {data.map((d) => (
          <circle
            key={d.x}
            cx={sx(d.x)}
            cy={sy(d.y)}
            r={d.x === active ? 5 : 4}
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth={2}
          />
        ))}
        {/* Hit targets wider than the marks */}
        {data.map((d) => (
          <rect
            key={`hit${d.x}`}
            x={sx(d.x) - (W - pad.l - pad.r) / (data.length - 1) / 2}
            y={0}
            width={(W - pad.l - pad.r) / (data.length - 1)}
            height={H}
            fill="transparent"
            onMouseEnter={() => setHover(d.x)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect?.(d.x)}
            style={{ cursor: onSelect ? "pointer" : "default" }}
          />
        ))}
      </svg>
      {activePoint && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-sm shadow-soft"
          style={{ left: `${(sx(activePoint.x) / W) * 100}%` }}
        >
          <span className="text-ink-3">{xLabel(activePoint.x)}: </span>
          <span className="font-mono font-medium">
            {activePoint.y} {unit}
          </span>
        </div>
      )}
    </div>
  );
}
