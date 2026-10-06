import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Camera, Boat, Bird, MapPin, Plant, Sparkle, UsersThree, Baby, FirstAid, ArrowsClockwise } from "@phosphor-icons/react";
import { COLORS, Eyebrow, KenBurns, Rise, Scrim, Stage } from "./ui";

const FADE = 15;
const URL = "dk129213.github.io/VitaNatura";

const Slogan: React.FC<{ size?: number }> = ({ size = 180 }) => (
  <div style={{ fontSize: size, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.03em" }}>
    You travel.
    <br />
    We care.
  </div>
);

const IconDot: React.FC<{ Icon: React.ElementType; size?: number }> = ({ Icon, size = 88 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: COLORS.pine,
      display: "grid",
      placeItems: "center",
      flexShrink: 0,
    }}
  >
    <Icon size={size * 0.5} weight="duotone" color={COLORS.ink} />
  </div>
);

// ---------- scenes ----------

const Title: React.FC = () => (
  <Stage>
    <KenBurns src="opuzen-neretva.jpg" />
    <Scrim strength={0.8} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise delay={8}>
        <Eyebrow>Around Dubrovnik · October to May</Eyebrow>
      </Rise>
      <Rise delay={18} style={{ marginTop: 24 }}>
        <Slogan />
      </Rise>
      <Rise delay={40}>
        <div style={{ fontSize: 44, color: COLORS.ink2, marginTop: 40 }}>VitaNatura 365</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

// Two numbers, counted up: the season problem in one line.
const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const full = Math.round(interpolate(frame, [10, 40], [0, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const empty = Math.round(interpolate(frame, [35, 65], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 120, alignItems: "flex-end" }}>
        <Rise>
          <div style={{ fontSize: 260, fontWeight: 700, lineHeight: 1, color: COLORS.ink3 }}>{full}</div>
          <div style={{ fontSize: 48, color: COLORS.ink3 }}>months full</div>
        </Rise>
        <Rise delay={25}>
          <div style={{ fontSize: 260, fontWeight: 700, lineHeight: 1, color: COLORS.accent }}>{empty}</div>
          <div style={{ fontSize: 48, color: COLORS.ink2 }}>months empty</div>
        </Rise>
      </div>
      <Rise delay={60}>
        <div style={{ fontSize: 56, fontWeight: 600, marginTop: 80, maxWidth: 1400, lineHeight: 1.15 }}>
          Hotels close, guides and farms lose their income. Yet the region is at its best.
        </div>
      </Rise>
    </Stage>
  );
};

const Nobody: React.FC = () => (
  <Stage>
    <KenBurns src="neretva.jpg" from={1.12} to={1.02} />
    <Scrim strength={0.75} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise>
        <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em", maxWidth: 1300 }}>
          The Dubrovnik nobody shows you.
        </div>
      </Rise>
      <Rise delay={20}>
        <div style={{ fontSize: 48, color: COLORS.ink2, marginTop: 36 }}>The Neretva delta, Ston, Konavle and quiet islands.</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

const tours = [
  { src: "opuzen-neretva.jpg", name: "Photo safari by lađa", where: "Neretva delta", price: 45, kids: 25 },
  { src: "neretva-birds.jpg", name: "Birdwatching", where: "Neretva delta, Oct to Apr", price: 30, kids: 15 },
  { src: "mandarins.jpg", name: "Mandarin harvest and lunch", where: "Neretva valley, Oct to Dec", price: 39, kids: 19 },
  { src: "ston-walls.jpg", name: "Ston walls, salt and oysters", where: "Pelješac", price: 65, kids: 30 },
  { src: "konavle.jpg", name: "Mills, folklore and silk", where: "Konavle", price: 45, kids: 22 },
  { src: "mljet-lake-road.jpg", name: "Mljet National Park by bike", where: "Island of Mljet", price: 79, kids: 39 },
];

const TourScene: React.FC<{ tour: (typeof tours)[number]; index: number }> = ({ tour, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 18, fps, config: { damping: 14 } });
  return (
    <Stage>
      <KenBurns src={tour.src} from={index % 2 ? 1.1 : 1.02} to={index % 2 ? 1.02 : 1.1} />
      <Scrim strength={0.8} direction="to top" />
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 140px 130px" }}>
        <Rise>
          <Eyebrow>
            Tour {index + 1} of 10 · {tour.where}
          </Eyebrow>
        </Rise>
        <Rise delay={8}>
          <div style={{ fontSize: 100, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.02em", marginTop: 18 }}>{tour.name}</div>
        </Rise>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 120,
          transform: `scale(${pop})`,
          background: COLORS.ink,
          color: COLORS.bg,
          borderRadius: 32,
          padding: "26px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1 }}>€{tour.price}</div>
        <div style={{ fontSize: 32, marginTop: 8, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
          <Baby size={34} weight="duotone" /> kids €{tour.kids}
        </div>
      </div>
    </Stage>
  );
};

const builds = [
  { Icon: Camera, text: "Photo hides in the Neretva delta" },
  { Icon: Boat, text: "Canoe launch points with ramps" },
  { Icon: Bird, text: "A marked birdwatching route" },
  { Icon: MapPin, text: "Benches and winter hours on the Ston walls" },
  { Icon: Plant, text: "Shade and seats at family farms" },
  { Icon: Sparkle, text: "Winter folklore shows in Konavle" },
];

const Ground: React.FC = () => (
  <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
    <Rise>
      <Eyebrow>Not an ad campaign</Eyebrow>
      <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 16 }}>What we build on the ground</div>
    </Rise>
    <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 80px" }}>
      {builds.map((b, i) => (
        <Rise key={b.text} delay={20 + i * 10}>
          <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 42, color: COLORS.ink2 }}>
            <IconDot Icon={b.Icon} />
            {b.text}
          </div>
        </Rise>
      ))}
    </div>
  </Stage>
);

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const SUMMER = [6, 7, 8, 9];

// The year fills up month by month: green for our season, grey for the summer that is already full.
const Year: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
      <Rise>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em" }}>A reason to come every month.</div>
      </Rise>
      <div style={{ display: "flex", gap: 18, marginTop: 90 }}>
        {MONTHS.map((m, i) => {
          const p = spring({ frame: frame - 20 - i * 5, fps, config: { damping: 200 } });
          const summer = SUMMER.includes(i + 1);
          return (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  height: 220,
                  borderRadius: 20,
                  background: summer ? COLORS.line : COLORS.pine,
                  opacity: p,
                  transform: `scaleY(${p})`,
                  transformOrigin: "bottom",
                }}
              />
              <div style={{ fontSize: 40, color: COLORS.ink3, marginTop: 18 }}>{m}</div>
            </div>
          );
        })}
      </div>
      <Rise delay={80}>
        <div style={{ fontSize: 44, color: COLORS.ink2, marginTop: 60 }}>
          St. Blaise · Ston oysters · Moreška · harvests · birds in winter
        </div>
      </Rise>
    </Stage>
  );
};

const care = [
  { Icon: FirstAid, text: "Marta slips on the jetty. Our guide gives first aid." },
  { Icon: MapPin, text: "No address, Sunday: Vita finds the right hospital and sends her GPS." },
  { Icon: ArrowsClockwise, text: "A sprain. The rest of the week is rearranged, not cancelled." },
];

const WeCare: React.FC = () => (
  <Stage>
    <KenBurns src="opuzen-neretva.jpg" from={1.15} to={1.05} position="left center" />
    <Scrim strength={0.88} />
    <AbsoluteFill style={{ backgroundColor: "rgba(13,19,17,0.45)" }} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise>
        <Eyebrow>We care</Eyebrow>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 16, maxWidth: 1400, lineHeight: 1.05 }}>
          Far from the city, you&apos;re not on your own.
        </div>
      </Rise>
      <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 36 }}>
        {care.map((c, i) => (
          <Rise key={c.text} delay={25 + i * 20}>
            <div style={{ display: "flex", alignItems: "center", gap: 32, fontSize: 44, color: COLORS.ink2 }}>
              <IconDot Icon={c.Icon} size={80} />
              {c.text}
            </div>
          </Rise>
        ))}
      </div>
    </AbsoluteFill>
  </Stage>
);

const Locals: React.FC = () => {
  const halves = [
    { src: "olives.jpg", title: "Run by local people", text: "Boatmen, farmers and young guides earn all year" },
    { src: "mali-ston.jpg", title: "Light on nature", text: "Small groups, no new buildings, one shared minibus" },
  ];
  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {halves.map((h, i) => (
          <div key={h.title} style={{ position: "relative", overflow: "hidden" }}>
            <KenBurns src={h.src} />
            <Scrim strength={0.85} direction="to top" />
            <AbsoluteFill style={{ justifyContent: "flex-end", padding: 90 }}>
              <Rise delay={10 + i * 15}>
                <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>{h.title}</div>
                <div style={{ fontSize: 40, color: COLORS.ink2, marginTop: 20, maxWidth: 760 }}>{h.text}</div>
              </Rise>
            </AbsoluteFill>
          </div>
        ))}
      </div>
    </Stage>
  );
};

const Package: React.FC = () => (
  <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
    <Rise>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <UsersThree size={72} weight="duotone" color={COLORS.accent} />
        <Eyebrow>Families, couples, grandparents</Eyebrow>
      </div>
    </Rise>
    <Rise delay={12}>
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em", marginTop: 24 }}>Neretva and Ston week</div>
    </Rise>
    <Rise delay={24}>
      <div style={{ fontSize: 48, color: COLORS.ink2, marginTop: 20 }}>7 nights · 4 tours · transfers · help on the road</div>
    </Rise>
    <Rise delay={40}>
      <div style={{ fontSize: 120, fontWeight: 700, color: COLORS.accent, marginTop: 50 }}>
        €790 <span style={{ fontSize: 56, color: COLORS.ink2, fontWeight: 500 }}>adult</span> · €350{" "}
        <span style={{ fontSize: 56, color: COLORS.ink2, fontWeight: 500 }}>child</span>
      </div>
    </Rise>
  </Stage>
);

const Closing: React.FC = () => (
  <Stage>
    <KenBurns src="ston-walls.jpg" />
    <Scrim strength={0.8} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise delay={6}>
        <Slogan size={170} />
      </Rise>
      <Rise delay={24}>
        <div style={{ fontSize: 46, color: COLORS.ink2, marginTop: 44 }}>Around Dubrovnik, October to May. Kids welcome.</div>
      </Rise>
      <Rise delay={40}>
        <div style={{ fontSize: 44, fontWeight: 600, color: COLORS.accent, marginTop: 56 }}>{URL}</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

// ---------- timeline ----------

const SCENES: { el: React.ReactNode; frames: number }[] = [
  { el: <Title />, frames: 120 },
  { el: <Problem />, frames: 150 },
  { el: <Nobody />, frames: 105 },
  ...tours.map((t, i) => ({ el: <TourScene tour={t} index={i} />, frames: 78 })),
  { el: <Ground />, frames: 165 },
  { el: <Year />, frames: 135 },
  { el: <Package />, frames: 120 },
  { el: <WeCare />, frames: 165 },
  { el: <Locals />, frames: 105 },
  { el: <Closing />, frames: 150 },
];

export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + s.frames, 0) - (SCENES.length - 1) * FADE;

export const VitaNatura: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <TransitionSeries>
      {SCENES.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />}
          <TransitionSeries.Sequence durationInFrames={s.frames}>{s.el}</TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
