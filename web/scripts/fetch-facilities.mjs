// Refreshes src/data/osm-facilities.json with real places from OpenStreetMap
// and drive times from Pile Gate (Dubrovnik) via the public OSRM router.
//
// Run from web/:  node scripts/fetch-facilities.mjs
// Needs Node 18+ (built-in fetch). Be gentle with the free APIs: run it rarely.

import { writeFileSync } from "node:fs";

const UA = { "User-Agent": "VitaNatura365-hackathon-demo/0.1" };
const PILE_GATE = [18.1058, 42.6416]; // lon, lat
const RADIUS_M = 15000;

// Kalos rehab hospital in Vela Luka is outside the radius, so it is added by hand (OSM way 1266792453).
const KALOS = {
  id: "w1266792453",
  name: "Specijalna bolnica za medicinsku rehabilitaciju Kalos",
  type: "hospital",
  lat: 42.9682,
  lon: 16.7129,
  emergency: false,
  hours: null,
  phone: null,
  wheelchair: null,
  city: "Vela Luka",
  street: "Ulica 3 3",
  region: "korcula",
};

const query = `[out:json][timeout:60];
(nwr["amenity"~"^(hospital|clinic|pharmacy|doctors|dentist)$"](around:${RADIUS_M},42.6410,18.1080););
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
      region: "dubrovnik",
    };
  });

const coords = [PILE_GATE, ...places.map((p) => [p.lon, p.lat])].map((c) => c.join(",")).join(";");
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
  driveTimesFrom: { place: "Pile Gate, Dubrovnik", source: "OSRM (router.project-osrm.org), OpenStreetMap road data" },
  facilities: [...places, KALOS],
};

writeFileSync(new URL("../src/data/osm-facilities.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(`Saved ${places.length} places around Dubrovnik (+ Kalos).`);
