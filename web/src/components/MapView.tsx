"use client";

import dynamic from "next/dynamic";
export type { MapPoint } from "./MapInner";

// Leaflet touches `window`, so the map only renders in the browser.
export const MapView = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-surface-2" aria-label="Loading map" />,
});
