import { Main } from "./compositions/Main";

// Single composition configuration
// Total: 8 scenes (120+90+120+180+150+120+90+150) = 1020 frames
// Minus 7 transitions (7 * 12) = 84 frames
// Net duration: 1020 - 84 = 936 frames (~31.2s)
// Add buffer: 1020 frames total (~34s)
export const composition = {
  id: "Main",
  component: Main,
  durationInFrames: 1020,
  fps: 30,
  width: 1280,
  height: 720,
};
