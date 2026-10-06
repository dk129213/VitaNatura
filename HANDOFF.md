# VitaNatura 365: handoff

Everything you need to pick this project up on any computer, alone or with Claude.
Last updated: 6 October 2026.

## 1. What this is

**VitaNatura 365** is our Tourism 365 hackathon project. Theme: year-round tourism.
Slogan: **You travel. We care.** ("Vi putujete, mi brinemo.")

Ten small-group tours in the countryside around Dubrovnik (the Neretva delta, Ston, Konavle, Mljet,
the Elaphiti islands, Trsteno), from October to May, open to children, with realistic prices. Each tour
comes with a concrete change on the ground (photo hides, canoe launch points, a birdwatching route,
farm seating...). One partner hotel in Lapad is the base. "We care" is the safety net: if someone gets
hurt far from the city, our guide and the Vita assistant find help and rearrange the trip.

The concept and how it answers the brief and the jury criteria: **`CONCEPT-365.md`**.

## 2. Links

| What | Where |
|---|---|
| Live site | https://dk129213.github.io/VitaNatura/ |
| Code | https://github.com/dk129213/VitaNatura |
| Deploy runs | https://github.com/dk129213/VitaNatura/actions |
| Pages settings | https://github.com/dk129213/VitaNatura/settings/pages (Source must be **GitHub Actions**) |

## 3. Run it on a new computer

Needs [Node.js](https://nodejs.org) 20 or newer and Git.

```bash
git clone https://github.com/dk129213/VitaNatura.git
cd VitaNatura/web
npm install
npm run dev
```

Open http://localhost:3000. Every push to `main` redeploys the live site in about 2 minutes.

## 4. The site

| Page | What it shows |
|---|---|
| `/` | Slogan, then all 10 tours with prices right away, the contents, what we build, "We care" |
| `/tours` | Price table with month and type filters, every tour in detail, week package, transfers, price sources |
| `/calendar` | Calendar 365: traditions and harvests stretched into seasons |
| `/hotel` | The partner hotel contract and its phases |
| `/community` | Audience, local jobs, stakeholders, nature |
| `/plan` | Start-up costs, funding, revenue, targets, marketing plan |
| `/help` | We care: Marta's first hour, real health places near the Neretva jetty, triage chat, health passport |
| `/start` | Marta's chat (scripted demo) |
| `/journey` | Marta's week, before and after the fall |

## 5. Where things are

```
VitaNatura/
├─ HANDOFF.md, CONCEPT-365.md, README.md
├─ .github/workflows/         deploy-pages.yml: builds web/ and publishes to GitHub Pages
├─ presentation/              VitaNatura365-pitch.pptx + build-deck.js (see its README)
├─ video/                     VitaNatura365.mp4 + Remotion project (see its README)
└─ web/                       the site (Next.js 16, Tailwind 4, Motion, Leaflet, zustand)
   ├─ scripts/fetch-facilities.mjs   refreshes real health places around the Neretva delta
   ├─ public/img/                    photos (Wikimedia Commons, credited in the footer)
   └─ src/
      ├─ app/page.tsx                landing page
      ├─ app/(app)/<page>/page.tsx   one folder per page
      ├─ data/tours.ts               THE TOURS AND PRICES: edit here
      ├─ data/destination.ts         changes on the ground, calendar, hotel, partners, funding, marketing
      ├─ data/scenario.ts            Marta's story
      ├─ data/credits.ts             photo credits (required by the licences)
      └─ lib/scripts.ts              the scripted chat conversations
```

## 6. Real data vs sample data

| Real | Ours / sample |
|---|---|
| Health places near Opuzen and Dubrovnik (OpenStreetMap), drive times (OSRM) | Our tour prices (checked against real ones, see `/tours`) |
| Ticket prices used to set ours: Ston walls, salt works, Mljet NP, Trsteno, ferries | Partner hotel, farms, outfitters |
| Live weather in the Neretva delta (Open-Meteo) | Start-up costs, funding split, guest targets |
| Traditions and their dates (St. Blaise, Ston Oyster Days, Moreška, Maraton lađa) | Marta's story, the chat (scripted, no live AI) |

## 7. Pitch (6 minutes, timer)

The deck has 11 slides, about 30 seconds each, with speaker notes. Before presenting: open the live
site once, click **Restart demo** in the sidebar, keep `npm run dev` running locally in case the Wi-Fi is bad.

## 8. Gotchas (things that already bit us)

- **GitHub Pages needs Source = GitHub Actions.** On "Deploy from a branch" it shows the README instead of the app.
- The app is served from `/VitaNatura/`. `web/next.config.ts` adds that path in the build, and
  `web/src/lib/image-loader.ts` adds it to images. Don't link to `/img/...` with a plain `<img>`; use `next/image`.
- URLs end with a slash (`/help/`). The sidebar strips it before comparing.
- In Git Bash on Windows, `PAGES_BASE_PATH=/VitaNatura` gets rewritten to a Windows path. Prefix with
  `MSYS_NO_PATHCONV=1` when testing the Pages build locally.
- Overpass (OpenStreetMap API) is sometimes busy; the fetch script retries. It also drops places across
  the border in Bosnia and Herzegovina.
- Wikimedia Commons rate-limits fast requests: wait a minute between searches.
- Old demo data can stick in the browser: click **Restart demo**.

## 9. Continuing with Claude Code

Open the `VitaNatura` folder in Claude Code and say: *"Read HANDOFF.md and continue."*

Design rules: one accent colour (pine green), no em dashes in any text, light and dark mode, real photos
only, every invented number labelled.
