# Promo video (Remotion)

`VitaNatura365.mp4`: 1920x1080, 30 fps, about 50 seconds, no audio (add music in any editor if needed).

Scenes: slogan, problem, for every tourist, Marta, her six steps through the app, one profile,
Croatia all year, real data, closing with the link.

```bash
cd video
npm install
npm run studio    # preview and edit in the browser
npm run render    # writes out/VitaNatura365.mp4
```

Everything is in `src/Video.tsx` (scenes and timings) and `src/ui.tsx` (colours, font, animations).
Remotion is free for individuals and teams of up to 3; bigger companies need a licence (remotion.dev/license).
