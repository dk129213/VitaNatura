# Promo video (Remotion)

`VitaNatura365.mp4`: 1920x1080, 30 fps, about 49 seconds, no audio (add music in any editor if needed).

Scenes: slogan, 3 months full / 6 empty, the Dubrovnik nobody shows you, six tours with prices,
what we build, a reason to come every month, the week package, We care, locals and nature, closing.

```bash
cd video
npm install
npm run studio    # preview and edit in the browser
npm run render    # writes VitaNatura365.mp4
```

Everything is in `src/Video.tsx` (scenes and timings) and `src/ui.tsx` (colours, font, animations).
Remotion is free for individuals and teams of up to 3; bigger companies need a licence (remotion.dev/license).
