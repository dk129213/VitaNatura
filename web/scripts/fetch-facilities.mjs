// Refreshes src/data/osm-facilities.json with real places from OpenStreetMap
// around the Neretva delta (where the photo safari runs), plus the hospitals in Dubrovnik,
// and drive times from the Opuzen boat jetty via the public OSRM router.
//
// Run from web/:  node scripts/fetch-facilities.mjs
// Needs Node 18+ (built-in fetch). Be gentle with the free APIs: run it rarely.

import { writeFileSync } from "node:fs";

const UA = { "User-Agent": "VitaNatura365-hackathon-demo/0.2" };
const OPUZEN_JETTY = [17.5636, 43.0141]; // lon, lat: lađa jetty on the Neretva in Opuzen
const NERETVA = { lat: 43.02, lon: 17.55, radius: 20000 };
const DUBROVNIK = { lat: 42.641, lon: 18.108, radius: 15000 };

const query = `[out:json][timeout:60];
(
  nwr["amenity"~"^(hospital|clinic|pharmacy|doctors)$"](around:${NERETVA.radius},${NERETVA.lat},${NERETVA.lon});
  nwr["amenity"="hospital"](around:${DUBROVNIK.radius},${DUBROVNIK.lat},${DUBROVNIK.lon});
);
out center tags;`;

// Overpass answers with an XML error page when it is busy, so retry a few times.
async function overpass(q, attempts = 4) {
  for (let i = 1; i <= attempts; i++) {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { ...UA, "Content-Type": "application/x-www-form-urlencoded" },
      body: "data=" + encodeURIComponent(q),
    });
    const text = await res.text();
    if (res.ok && text.trimStart().startsWith("{")) return JSON.parse(text);
    console.log(`Overpass busy (attempt ${i}/${attempts}), waiting...`);
    await new Promise((r) => setTimeout(r, 15000 * i));
  }
  throw new Error("Overpass is busy. Try again in a few minutes; the existing data file was not changed.");
}

const osm = await overpass(query);

const places = osm.elements
  .filter((e) => e.tags?.name)
  .map((e) => {
    const lat = e.lat ?? e.center.lat;
    const lon = e.lon ?? e.center.lon;
    const t = e.tags;
    return {
      id: e.type[0] + e.id,
      name: t.name,
      type: t.amenity,
      lat: +lat.toFixed(5),
      lon: +lon.toFixed(5),
      emergency: t.emergency === "yes",
      hours: t.opening_hours ?? null,
      phone: t.phone ?? t["contact:phone"] ?? null,
      wheelchair: t.wheelchair ?? null,
      city: t["addr:city"] ?? null,
      street: t["addr:street"] ? `${t["addr:street"]} ${t["addr:housenumber"] ?? ""}`.trim() : null,
      region: lat < 42.8 ? "dubrovnik" : "neretva",
    };
  });

// The 20 km circle reaches into Bosnia and Herzegovina (Čapljina, Neum, Ljubuški).
// Keep only Croatian places: north of 43.09 and the Neum corridor are across the border.
const inCroatia = (p) => p.lat <= 43.09 && !(p.lat < 42.95 && p.lon > 17.58 && p.lat > 42.88) && p.name !== "Apoteka";
places.splice(0, places.length, ...places.filter(inCroatia));

const coords = [OPUZEN_JETTY, ...places.map((p) => [p.lon, p.lat])].map((c) => c.join(",")).join(";");
const table = await fetch(
  `https://router.project-osrm.org/table/v1/driving/${coords}?sources=0&annotations=duration,distance`,
  { headers: UA },
).then((r) => r.json());
if (table.code !== "Ok") throw new Error("OSRM failed: " + JSON.stringify(table).slice(0, 200));

places.forEach((p, i) => {
  p.driveMin = Math.max(1, Math.round(table.durations[0][i + 1] / 60));
  p.driveKm = +(table.distances[0][i + 1] / 1000).toFixed(1);
});

const out = {
  source: "OpenStreetMap contributors (ODbL), fetched via Overpass API",
  fetchedAt: new Date().toISOString().slice(0, 10),
  driveTimesFrom: { place: "Lađa jetty, Opuzen", source: "OSRM (router.project-osrm.org), OpenStreetMap road data" },
  facilities: places.sort((a, b) => a.driveMin - b.driveMin),
};

writeFileSync(new URL("../src/data/osm-facilities.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(`Saved ${places.length} places (Neretva delta + Dubrovnik hospitals).`);
