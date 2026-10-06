# VitaNatura 365

**You travel. We care.** Ten small-group tours in the countryside around Dubrovnik, from October to May,
open to children: a photo safari by lađa in the Neretva delta, birdwatching, mandarin and olive harvests,
Ston walls and oysters, Konavle folklore, Mljet and the car-free islands. Each tour comes with a concrete
change on the ground, one partner hotel is the base, and a safety net helps guests who get hurt far
from the city. Built for the Tourism 365 hackathon.

Concept and how it answers the brief: [`CONCEPT-365.md`](CONCEPT-365.md). Full handoff: [`HANDOFF.md`](HANDOFF.md).

Live site: https://dk129213.github.io/VitaNatura/

## Run it

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

## Data

- Health places near the Neretva delta and Dubrovnik: OpenStreetMap contributors (ODbL), via Overpass
- Drive times: OSRM routing on OpenStreetMap roads
- Live weather and air quality: Open-Meteo
- Photos: Wikimedia Commons, credited in the site footer
- Tour prices are our proposals, checked against similar tours and tickets (sources on the Tours page).
  Partners, costs and the chat are samples and are labelled as such.

## Put it online (GitHub Pages)

The workflow in `.github/workflows/deploy-pages.yml` builds the site and publishes it on every push to
`main`. One-time setup: **Settings > Pages > Build and deployment > Source: GitHub Actions**.

To test the Pages build locally:

```bash
cd web
PAGES_BASE_PATH=/VitaNatura npm run build
```

The finished site is in `web/out`.
