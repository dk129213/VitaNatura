# VitaNatura 365

**Aktivni i zdravstveni turizam, 365 dana. Active and health tourism, all year.** A plan to adapt
Dubrovnik-Neretva County for the months it stands empty: photo and canoe safaris in the Neretva delta,
birdwatching, harvests, a salt room in Ston, a hotel pool open all winter, local traditions stretched
into seasons, and one partner hotel as the base. Built for the Tourism 365 hackathon, for empty
nesters. The site is in Croatian and English.

The demo follows Marta, an empty nester from Vienna on an active and health week, who falls on the
Dubrovnik city walls: emergency care and surgery at Opća bolnica Dubrovnik, an adapted room in the
partner hotel, rehabilitation at Kalos in Vela Luka, and a flight home with assistance.

Concept and how it answers the brief: [`CONCEPT-365.md`](CONCEPT-365.md).

## Run it

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

## Data

- Hospitals, clinics and pharmacies: OpenStreetMap contributors (ODbL), via Overpass
- Drive times: OSRM routing on OpenStreetMap roads
- Live weather, air quality and pollen: Open-Meteo
- Photos: Wikimedia Commons, credited in the site footer
- Chat responses are scripted for the demo (no live AI). Prices, farms, appointments and
  recovery data are sample data and are labeled as such in the app.

## Put it online (GitHub Pages)

The workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes it on every
push to `main`.

One-time setup: in the GitHub repo go to **Settings > Pages > Build and deployment > Source** and
pick **GitHub Actions**. The site then appears at https://dk129213.github.io/VitaNatura/.

How it fits together:

| File | What it does |
|---|---|
| `.github/workflows/deploy-pages.yml` | Installs, builds `web/` and deploys `web/out` to Pages |
| `web/next.config.ts` | Static export (`output: "export"`) and the `/VitaNatura` base path |
| `web/src/lib/image-loader.ts` | Adds the base path to images, since Pages has no image server |

To test the Pages build locally:

```bash
cd web
PAGES_BASE_PATH=/VitaNatura npm run build
```

The finished site is in `web/out`.
