"use client";

import { useEffect, useState } from "react";
import { CloudSun, Wind, Plant, Warning } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

type Data = {
  temp: number;
  wind: number;
  code: number;
  aqi: number | null;
  pollen: number | null;
};

type T = (en: string, hr: string) => string;

const weatherText = (c: number, t: T) =>
  c === 0
    ? t("Clear", "Vedro")
    : c <= 3
      ? t("Partly cloudy", "Djelomično oblačno")
      : c <= 48
        ? t("Fog", "Magla")
        : c <= 67
          ? t("Rain", "Kiša")
          : c <= 77
            ? t("Snow", "Snijeg")
            : c <= 82
              ? t("Showers", "Pljuskovi")
              : t("Storms", "Grmljavina");

const aqiText = (v: number, t: T) =>
  v <= 20 ? t("Good", "Dobra") : v <= 40 ? t("Fair", "Prihvatljiva") : v <= 60 ? t("Moderate", "Umjerena") : t("Poor", "Loša");

// Live data from Open-Meteo (free, no API key): weather and European air quality index.
export function LiveConditions({ lat, lon, place }: { lat: number; lon: number; place: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(false);
  const t = useT();

  useEffect(() => {
    const ctrl = new AbortController();
    Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe%2FZagreb`,
        { signal: ctrl.signal },
      ).then((r) => r.json()),
      fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,birch_pollen,grass_pollen,ragweed_pollen`,
        { signal: ctrl.signal },
      ).then((r) => r.json()),
    ])
      .then(([w, a]) => {
        const pollen = [a.current?.birch_pollen, a.current?.grass_pollen, a.current?.ragweed_pollen].filter(
          (v): v is number => typeof v === "number",
        );
        setData({
          temp: w.current.temperature_2m,
          wind: w.current.wind_speed_10m,
          code: w.current.weather_code,
          aqi: a.current?.european_aqi ?? null,
          pollen: pollen.length ? Math.max(...pollen) : null,
        });
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => ctrl.abort();
  }, [lat, lon]);

  if (error) {
    return (
      <p className="flex items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-ink-2">
        <Warning /> {t("Live conditions are unavailable right now. The plan uses the last forecast.", "Podaci uživo trenutno nisu dostupni. Plan koristi zadnju prognozu.")}
      </p>
    );
  }

  const cells = [
    { icon: CloudSun, label: t("Weather", "Vrijeme"), value: data ? `${Math.round(data.temp)} °C, ${weatherText(data.code, t)}` : null },
    {
      icon: Wind,
      label: t("Air quality", "Kvaliteta zraka"),
      value: data ? (data.aqi == null ? t("No reading", "Nema mjerenja") : `${aqiText(data.aqi, t)} (EAQI ${Math.round(data.aqi)})`) : null,
    },
    {
      icon: Plant,
      label: t("Pollen", "Pelud"),
      value: data
        ? data.pollen == null
          ? t("No reading", "Nema mjerenja")
          : data.pollen < 10
            ? t("Low", "Niska")
            : data.pollen < 50
              ? t("Moderate", "Umjerena")
              : t("High", "Visoka")
        : null,
    },
  ];

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm text-ink-3">{t(`Live now in ${place}, from Open-Meteo`, `Uživo sada: ${place}, izvor Open-Meteo`)}</p>
      <dl className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cells.map((c) => (
          <div key={c.label} className="flex items-start gap-3">
            <c.icon size={22} className="mt-0.5 text-accent" />
            <div>
              <dt className="text-sm text-ink-3">{c.label}</dt>
              <dd className="font-medium">
                {c.value ?? <span className="inline-block h-4 w-24 animate-pulse rounded bg-surface-2" />}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
