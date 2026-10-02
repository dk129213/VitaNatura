# VitaNatura 365

AI platform for health tourism and recovery in nature, built for the Tourism 365 hackathon.
One user profile connects six modules: help on the road, accessible transport, clinic and stay,
recovery monitoring, rehab in nature, and crowd-free trips.

The demo follows Marta, who breaks her ankle in Paklenica National Park, from emergency care in
Zadar to surgery and recovery in Zagreb and rehabilitation in Varaždinske Toplice.

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
