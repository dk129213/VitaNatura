import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Geist";

// Same look as the app: Geist, pine green on near-black, one accent.
export const { fontFamily } = loadFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] });

export const COLORS = {
  bg: "#0d1311",
  surface: "#141c19",
  line: "#29352f",
  ink: "#f3faf6",
  ink2: "#c9d6cf",
  ink3: "#8d9a93",
  accent: "#5cc49a",
  pine: "#1d6b4f",
};

// Slow zoom on a photo, so stills never feel frozen.
export const KenBurns: React.FC<{ src: string; from?: number; to?: number; position?: string }> = ({
  src,
  from = 1.02,
  to = 1.12,
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(`img/${src}`)}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position, transform: `scale(${scale})` }}
      />
    </AbsoluteFill>
  );
};

export const Scrim: React.FC<{ strength?: number; direction?: string }> = ({ strength = 0.75, direction = "to right" }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(${direction}, rgba(13,19,17,${strength}) 0%, rgba(13,19,17,${strength * 0.6}) 45%, rgba(13,19,17,0.1) 100%)`,
    }}
  />
);

// Text that rises in with a spring. `delay` in frames.
export const Rise: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px)`, ...style }}>
      {children}
    </div>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.accent }}>
    {children}
  </div>
);

export const Stage: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg, color: COLORS.ink, fontFamily, ...style }}>{children}</AbsoluteFill>
);
