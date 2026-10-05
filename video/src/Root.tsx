import { Composition } from "remotion";
import { VitaNatura, TOTAL_FRAMES } from "./Video";

export const RemotionRoot: React.FC = () => (
  <Composition id="VitaNatura" component={VitaNatura} durationInFrames={TOTAL_FRAMES} fps={30} width={1920} height={1080} />
);
