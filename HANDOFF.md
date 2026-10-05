# VitaNatura 365: handoff

Everything you need to pick this project up on any computer, alone or with Claude.
Last updated: 5 October 2026.

## 1. What this is

**VitaNatura 365** is a hackathon project (Tourism 365) about health tourism and recovery in nature.
Slogans: **"You travel. We care."** and **"Health in your pocket."**

One user profile connects six modules:

| # | Module (app page) | What it does in the demo |
|---|---|---|
| 6 | Help on the road (`/help`) | 112/194 buttons, real nearby hospitals and pharmacies on a map, triage chat, health passport in Croatian, who pays (EHIC) |
| 1 | Clinic and stay (`/clinic`) | Where to have surgery (Dubrovnik vs Zagreb vs home), step-free apartment in Lapad |
| 2 | Accessible transport (`/transport`) | Every transfer checked for steps, flight home with WCHS assistance, MEDIF, reminders |
| 3 | Recovery (`/recovery`) | Heart-rate chart, daily check-in chat, doctor summary, activities unlocked by day |
| 4 | Rehab and nature (`/wellness`) | 14 days at Kalos (Vela Luka), live weather and air quality, flat paths, other spas |
| 5 | Crowd-free trips (`/explore`) | Mandarin, grape and olive harvests, family farms, Green Sea Safari, cruise-day tip |

Plus `/start` (profile chat that builds the profile) and `/journey` (Marta's whole plan as a timeline).

**Demo story:** Marta, 54, a teacher from Vienna, slips on the Dubrovnik city walls on 4 October.
Carry chair to Pile Gate, Opća bolnica Dubrovnik, surgery on 6 October (EHIC), step-free apartment in
Lapad, monitored recovery, rehab at Kalos on Korčula (2 to 15 Nov), flight home 17 Nov.

## 2. Links

| What | Where |
|---|---|
| Live app | https://dk129213.github.io/VitaNatura/ |
| Code | https://github.com/dk129213/VitaNatura |
| Deploy runs | https://github.com/dk129213/VitaNatura/actions |
| Pages settings | https://github.com/dk129213/VitaNatura/settings/pages (Source must be **GitHub Actions**) |
| Original concept doc | `VitaNatura365.docx` (Croatian, kept outside the repo) |

## 3. Run it on a new computer

Needs [Node.js](https://nodejs.org) 20 or newer and Git.

```bash
git clone https://github.com/dk129213/VitaNatura.git
cd VitaNatura/web
npm install
npm run dev
```

Open http://localhost:3000. Every push to `main` redeploys the live site in about 2 minutes.

## 4. Where things are

```
VitaNatura/
├─ HANDOFF.md                 this file
├─ README.md                  short project intro
├─ .github/workflows/         deploy-pages.yml: builds web/ and publishes to GitHub Pages
├─ .claude/launch.json        lets Claude start the dev server in its preview browser
├─ presentation/              pitch deck VitaNatura365-pitch.pptx + build-deck.js (see its README)
├─ video/                     promo video VitaNatura365.mp4 + Remotion project (see its README)
└─ web/                       the app (Next.js 16, Tailwind 4, Motion, Leaflet, zustand)
   ├─ scripts/fetch-facilities.mjs   refreshes real hospitals + drive times
   ├─ public/img/                    photos (Wikimedia Commons, credited in the footer)
   └─ src/
      ├─ app/page.tsx                landing page
      ├─ app/(app)/<module>/page.tsx one folder per module page
      ├─ components/                 AppShell (sidebar), ChatPanel, MapView, LineChart, LiveConditions
      ├─ data/scenario.ts            ALL demo story data: change the story here
      ├─ data/osm-facilities.json    real places from OpenStreetMap
      ├─ data/credits.ts             photo credits (required by the licences)
      └─ lib/scripts.ts              the scripted chat conversations
```

**Most edits happen in two files:** `web/src/data/scenario.ts` (story, prices, farms, trails) and
`web/src/lib/scripts.ts` (what the chatbots say).

## 5. Real data vs sample data

Be ready to answer this in the pitch.

| Real | Sample (labelled in the app) |
|---|---|
| Hospitals, clinics, pharmacies, addresses (OpenStreetMap) | Match scores, prices, fares, flight times |
| Drive times from Pile Gate (OSRM) | Apartment in Lapad, partner taxis and vans |
| Live weather, air quality, pollen (Open-Meteo) | Family farms (OPG Matić, Bralić, Vukelić) |
| EU passenger rights rules (1107/2006 air, 181/2011 coach) | Recovery data, doctor (Dr. Horvat) |
| Kalos rehab hospital, Green Sea Safari trip details | Appointment slots, trail crowd notes |

The chatbots are **scripted** (no live AI), so the demo works offline and the same way every time.

Refresh the real places (rarely, free APIs):

```bash
cd web
node scripts/fetch-facilities.mjs
```

## 6. Decisions so far (and why)

- **English UI only** for now. Croatian later.
- **Scripted chat**, no API key needed. A real Claude API chatbot is a possible next step.
- **No scraping of eSky or other booking sites**: against their terms, and it breaks during a live demo.
- **Dubrovnik instead of Paklenica** (mentor feedback): easier to sell, and RIT has a Dubrovnik campus.
- **Marta is a foreign tourist** (EHIC) to show the app is for *any* tourist, not only patients.
- **Photos only from Wikimedia Commons** with credits. Green Sea Safari's own photos are not used
  without their permission.

## 7. Mentor feedback (4 Oct) and status

| Feedback | Status |
|---|---|
| Set it in Dubrovnik, not Paklenica | Done |
| App walkthrough is the centre of the pitch, a few slides for intro and end | Deck in `presentation/` is built that way |
| Slogans "Vi putujete, mi brinemo" and "Zdravlje u vašem džepu/mobu" | Done ("You travel. We care.", "Health in your pocket") |
| For every tourist: something goes wrong, or a planned health trip | Done, landing page section |
| Photos: Dubrovnik, buses, planes, mandarins, grapes, olives, spas, health resorts | Done |
| Add Green Sea Safari | Done, Crowd-free trips page |

## 8. Pitch walkthrough (about 4 minutes of the demo)

1. **Landing** (`/`): slogan, "For every tourist" section. 20 s.
2. **Profile chat** (`/start`): click the answers. The profile fills on the right, WCHS appears. 60 s.
   Shortcut: "Fill for demo".
3. **My plan** (`/journey`): the whole trip on one screen. 20 s.
4. **Help on the road** (`/help`): real map, tourist clinic in the Old Town, Croatian passport toggle. 40 s.
5. **Transport** (`/transport`): flight home compared, assistance request filled in. 30 s.
6. **Recovery** (`/recovery`): click day 6 (yellow), show the doctor summary. 30 s.
7. **Rehab** (`/wellness`): live weather at Vela Luka, paths unlocked by recovery stage. 20 s.
8. **Crowd-free trips** (`/explore`): harvests and Green Sea Safari. 20 s.

Before presenting: open the live link once (warms the cache), click **Restart demo** in the sidebar,
and keep a local copy running (`npm run dev`) in case the venue Wi-Fi is bad.

### Rebuild the deck or the video

```bash
cd presentation && npm install && node build-deck.js      # VitaNatura365-pitch.pptx
cd video && npm install && npm run render                  # out/VitaNatura365.mp4
```

## 9. Ideas for next steps

- Real Claude API chatbot for intake and triage (needs an API key and a small backend).
- Croatian and German UI.
- Real flight data through an official API (for example Duffel or Kiwi Tequila, with a key).
- Partner list: adapted taxis in Dubrovnik, Kalos, Green Sea Safari, local OPGs.
- Clinic dashboard for doctors (the recovery summaries in one place).
- Business model: commission from clinics and partners, B2B for insurers and hotels.

## 10. Gotchas (things that already bit us)

- **GitHub Pages needs Source = GitHub Actions.** On "Deploy from a branch" it shows the README instead of the app.
- The app is served from `/VitaNatura/`. `web/next.config.ts` adds that path in the build, and
  `web/src/lib/image-loader.ts` adds it to images. Don't link to `/img/...` with a plain `<img>`; use `next/image`.
- URLs end with a slash (`/help/`). The sidebar strips it before comparing.
- In Git Bash on Windows, `PAGES_BASE_PATH=/VitaNatura` gets rewritten to a Windows path. Prefix with
  `MSYS_NO_PATHCONV=1` when testing the Pages build locally.
- Overpass (OpenStreetMap API) is sometimes busy; the fetch script retries.
- Old demo data can stick in the browser: click **Restart demo**.

## 11. Continuing with Claude Code

Open the `VitaNatura` folder in Claude Code and say: *"Read HANDOFF.md and continue."*

Plugins used for this project (install once per computer, in a terminal running `claude`):

```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
/plugin marketplace add leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

Design rules followed in the app (from taste-skill): one accent colour (pine green), no em dashes in
any text, light and dark mode, real photos only, every invented number labelled as sample.
