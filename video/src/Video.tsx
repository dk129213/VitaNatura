import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  FirstAid,
  Hospital,
  Wheelchair,
  Heartbeat,
  Tree,
  Basket,
  UserCircle,
  MapPin,
  CloudSun,
  Scales,
  Translate,
} from "@phosphor-icons/react";
import { COLORS, Eyebrow, KenBurns, Rise, Scrim, Stage } from "./ui";

const FADE = 15;
const URL = "dk129213.github.io/VitaNatura";

// ---------- scenes ----------

const Title: React.FC = () => (
  <Stage>
    <KenBurns src="dubrovnik-walls.jpg" />
    <Scrim strength={0.82} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise delay={8}>
        <Eyebrow>Health in your pocket</Eyebrow>
      </Rise>
      <Rise delay={18}>
        <div style={{ fontSize: 180, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.03em", marginTop: 24 }}>
          You travel.
          <br />
          We care.
        </div>
      </Rise>
      <Rise delay={40}>
        <div style={{ fontSize: 44, color: COLORS.ink2, marginTop: 40 }}>VitaNatura 365</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

const problems = [
  { Icon: Translate, text: "Dozens of bookings, often in a foreign language" },
  { Icon: Wheelchair, text: "No way to tell if the trip is even possible" },
  { Icon: Hospital, text: "Nobody follows the recovery after the hospital" },
];

const Problem: React.FC = () => (
  <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
    <Rise>
      <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 1400, lineHeight: 1.05 }}>
        Today, the traveller is their own travel agent.
      </div>
    </Rise>
    <div style={{ marginTop: 80, display: "flex", flexDirection: "column", gap: 40 }}>
      {problems.map((p, i) => (
        <Rise key={p.text} delay={25 + i * 18}>
          <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 48, color: COLORS.ink2 }}>
            <IconDot Icon={p.Icon} />
            {p.text}
          </div>
        </Rise>
      ))}
    </div>
  </Stage>
);

const IconDot: React.FC<{ Icon: React.ElementType; size?: number }> = ({ Icon, size = 96 }) => (
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

const Audience: React.FC = () => {
  const halves = [
    { src: "dubrovnik.jpg", pos: "center", title: "When something goes wrong on the trip", text: "A fall, a fever, a toothache" },
    { src: "spa.jpg", pos: "center 88%", title: "When the trip is for your health", text: "Treatment, rehab, spa stays" },
  ];
  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {halves.map((h, i) => (
          <div key={h.title} style={{ position: "relative", overflow: "hidden" }}>
            <KenBurns src={h.src} position={h.pos} />
            <Scrim strength={0.85} direction="to top" />
            <AbsoluteFill style={{ justifyContent: "flex-end", padding: 90 }}>
              <Rise delay={15 + i * 15}>
                <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 760 }}>{h.title}</div>
                <div style={{ fontSize: 40, color: COLORS.ink2, marginTop: 20 }}>{h.text}</div>
              </Rise>
            </AbsoluteFill>
          </div>
        ))}
      </div>
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 90 }}>
        <Rise>
          <div
            style={{
              fontSize: 52,
              fontWeight: 600,
              background: COLORS.bg,
              padding: "18px 44px",
              borderRadius: 999,
              border: `2px solid ${COLORS.accent}`,
            }}
          >
            For every tourist, not only patients
          </div>
        </Rise>
      </AbsoluteFill>
    </Stage>
  );
};

const Marta: React.FC = () => (
  <Stage>
    <KenBurns src="dubrovnik.jpg" from={1.12} to={1.02} />
    <Scrim strength={0.85} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise>
        <Eyebrow>Meet Marta</Eyebrow>
      </Rise>
      <Rise delay={12}>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.02em", maxWidth: 1250, marginTop: 24 }}>
          54, a teacher from Vienna. A fall on the Dubrovnik city walls.
        </div>
      </Rise>
      <Rise delay={34}>
        <div style={{ fontSize: 44, color: COLORS.ink2, marginTop: 36 }}>One profile plans everything that follows.</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

type Step = {
  module: string;
  Icon: React.ElementType;
  date: string;
  title: string;
  text: string;
  src?: string;
  pos?: string;
};

const steps: Step[] = [
  { module: "Help on the road", Icon: FirstAid, date: "4 Oct", title: "Emergency care, 6 minutes away", text: "Carry chair to Pile Gate, health passport sent ahead in Croatian.", src: "dubrovnik-walls.jpg" },
  { module: "Clinic and stay", Icon: Hospital, date: "6 Oct", title: "Surgery in Dubrovnik", text: "Covered by her EHIC card. A step-free apartment in Lapad.", src: "lapad.jpg" },
  { module: "Recovery", Icon: Heartbeat, date: "October", title: "Watched every day", text: "Watch data and a daily check-in become one summary for the doctor." },
  { module: "Rehab and nature", Icon: Tree, date: "2 - 15 Nov", title: "Rehab by the sea", text: "Seawater pool at Kalos, Vela Luka, on the island of Korčula.", src: "vela-luka.jpg" },
  { module: "Accessible transport", Icon: Wheelchair, date: "17 Nov", title: "Flight home, assisted", text: "Wheelchair at both airports, booked 48 hours ahead.", src: "plane.jpg" },
  { module: "Crowd-free trips", Icon: Basket, date: "Next autumn", title: "A reason to come back", text: "Olive harvest on Pelješac, or a sea clean-up with Green Sea Safari.", src: "olives.jpg" },
];

// Resting heart rate after surgery, drawn on screen for the recovery step.
const HR = [74, 72, 70, 69, 76, 81, 74, 70, 68, 67];

const HeartChart: React.FC = () => {
  const frame = useCurrentFrame();
  const w = 760;
  const h = 420;
  const pts = HR.map((v, i) => [40 + (i * (w - 80)) / (HR.length - 1), h - 40 - ((v - 60) / 30) * (h - 80)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const progress = interpolate(frame, [10, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const baseY = h - 40 - ((69 - 60) / 30) * (h - 80);
  const flag = pts[5];
  return (
    <AbsoluteFill style={{ background: COLORS.surface, alignItems: "center", justifyContent: "center" }}>
      <svg width={w} height={h}>
        <line x1={40} x2={w - 40} y1={baseY} y2={baseY} stroke={COLORS.ink3} strokeDasharray="8 8" strokeWidth={2} />
        <text x={44} y={baseY + 34} fill={COLORS.ink3} fontSize={24}>
          Personal baseline
        </text>
        <path d={d} fill="none" stroke={COLORS.accent} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - progress} />
        {progress > 0.55 && (
          <g opacity={interpolate(progress, [0.55, 0.7], [0, 1], { extrapolateRight: "clamp" })}>
            <circle cx={flag[0]} cy={flag[1]} r={14} fill="#f0b75c" />
            <text x={flag[0] + 24} y={flag[1] + 8} fill="#f0b75c" fontSize={28} fontWeight={600}>
              Day 6: doctor alerted
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

const StepScene: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slide = spring({ frame, fps, config: { damping: 200 } });
  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          {step.src ? <KenBurns src={step.src} position={step.pos} /> : <HeartChart />}
        </div>
        <div style={{ padding: "0 110px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ transform: `translateX(${(1 - slide) * 60}px)`, opacity: slide }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <IconDot Icon={step.Icon} size={84} />
              <div style={{ fontSize: 36, fontWeight: 600, color: COLORS.accent }}>{step.module}</div>
            </div>
            <div style={{ fontSize: 34, color: COLORS.ink3, marginTop: 48, fontWeight: 500 }}>{step.date}</div>
          </div>
          <Rise delay={8}>
            <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.02em", marginTop: 12 }}>{step.title}</div>
          </Rise>
          <Rise delay={18}>
            <div style={{ fontSize: 40, color: COLORS.ink2, lineHeight: 1.35, marginTop: 28, maxWidth: 720 }}>{step.text}</div>
          </Rise>
          <div style={{ display: "flex", gap: 14, marginTop: 70 }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === index ? 64 : 18,
                  height: 18,
                  borderRadius: 18,
                  background: i <= index ? COLORS.accent : COLORS.line,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
};

const modules = [
  { Icon: FirstAid, name: "Help on the road" },
  { Icon: Hospital, name: "Clinic and stay" },
  { Icon: Wheelchair, name: "Accessible transport" },
  { Icon: Heartbeat, name: "Recovery" },
  { Icon: Tree, name: "Rehab and nature" },
  { Icon: Basket, name: "Crowd-free trips" },
];

const Modules: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage style={{ padding: "0 140px", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 120 }}>
        <Rise>
          <div
            style={{
              width: 440,
              height: 440,
              borderRadius: 440,
              background: COLORS.pine,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <UserCircle size={120} weight="duotone" color={COLORS.ink} />
            <div style={{ fontSize: 56, fontWeight: 700, marginTop: 16 }}>One profile</div>
            <div style={{ fontSize: 30, color: COLORS.ink2, marginTop: 10, maxWidth: 300 }}>told once, used everywhere</div>
          </div>
        </Rise>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, flex: 1 }}>
          {modules.map((m, i) => {
            const p = spring({ frame: frame - 15 - i * 6, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div
                key={m.name}
                style={{
                  background: COLORS.surface,
                  border: `2px solid ${COLORS.line}`,
                  borderRadius: 28,
                  padding: 36,
                  height: 230,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transform: `scale(${0.85 + 0.15 * p})`,
                  opacity: Math.min(1, p),
                }}
              >
                <m.Icon size={64} weight="duotone" color={COLORS.accent} />
                <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.1 }}>{m.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

const data = [
  { Icon: MapPin, name: "OpenStreetMap", text: "Real hospitals, clinics and pharmacies" },
  { Icon: Wheelchair, name: "OSRM routing", text: "Real drive times, checked for steps" },
  { Icon: CloudSun, name: "Open-Meteo", text: "Live weather, air quality and pollen" },
  { Icon: Scales, name: "EU passenger rights", text: "Assistance rules for flights and coaches" },
];

const Data: React.FC = () => (
  <Stage style={{ padding: "0 160px", justifyContent: "center" }}>
    <Rise>
      <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.02em" }}>Built on real, open data.</div>
    </Rise>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px 80px", marginTop: 80 }}>
      {data.map((d, i) => (
        <Rise key={d.name} delay={20 + i * 10}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
            <IconDot Icon={d.Icon} size={88} />
            <div>
              <div style={{ fontSize: 44, fontWeight: 600 }}>{d.name}</div>
              <div style={{ fontSize: 34, color: COLORS.ink2, marginTop: 8 }}>{d.text}</div>
            </div>
          </div>
        </Rise>
      ))}
    </div>
    <Rise delay={70}>
      <div style={{ fontSize: 32, color: COLORS.ink3, marginTop: 80 }}>
        It supports travellers and doctors. It never diagnoses, and every answer shows its source.
      </div>
    </Rise>
  </Stage>
);

const Gallery: React.FC = () => {
  const tiles = ["mandarins.jpg", "grapes.jpg", "olives.jpg", "elaphiti.jpg", "bus.jpg", "thalasso-opatija.jpg"];
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage style={{ padding: 90 }}>
      <Rise>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>Croatia all year, not only in August.</div>
      </Rise>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, minmax(0, 1fr))", gap: 28, marginTop: 56, flex: 1, minHeight: 0 }}>
        {tiles.map((t, i) => {
          const p = spring({ frame: frame - 12 - i * 5, fps, config: { damping: 200 } });
          return (
            <div key={t} style={{ borderRadius: 28, overflow: "hidden", minHeight: 0, opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>
              <Img src={staticFile(`img/${t}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

const Closing: React.FC = () => (
  <Stage>
    <KenBurns src="lapad.jpg" />
    <Scrim strength={0.8} />
    <AbsoluteFill style={{ padding: "0 140px", justifyContent: "center" }}>
      <Rise delay={6}>
        <div style={{ fontSize: 170, fontWeight: 700, lineHeight: 0.98, letterSpacing: "-0.03em" }}>
          You travel.
          <br />
          We care.
        </div>
      </Rise>
      <Rise delay={24}>
        <div style={{ fontSize: 46, color: COLORS.ink2, marginTop: 44 }}>Health in your pocket, for every traveller in Croatia.</div>
      </Rise>
      <Rise delay={40}>
        <div style={{ fontSize: 40, fontWeight: 600, color: COLORS.accent, marginTop: 56 }}>{URL}</div>
      </Rise>
    </AbsoluteFill>
  </Stage>
);

// ---------- timeline ----------

const SCENES: { el: React.ReactNode; frames: number }[] = [
  { el: <Title />, frames: 120 },
  { el: <Problem />, frames: 150 },
  { el: <Audience />, frames: 135 },
  { el: <Marta />, frames: 120 },
  ...steps.map((s, i) => ({ el: <StepScene step={s} index={i} />, frames: 105 })),
  { el: <Modules />, frames: 135 },
  { el: <Gallery />, frames: 105 },
  { el: <Data />, frames: 150 },
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
