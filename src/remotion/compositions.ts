import { Main } from "./compositions/Main";

// Single composition configuration
// 6 scenes: 180+75+210+120+120+290 = 995 frames
// 5 transitions at 10 frames = 50 frames overlap
// Net: 995 - 50 = 945 frames (~31.5s)
// VO is 32.18s = ~966 frames → composition trimmed to end cleanly
export const composition = {
  id: "Main",
  component: Main,
  durationInFrames: 945,
  fps: 30,
  width: 1280,
  height: 720,
};
