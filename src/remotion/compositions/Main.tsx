import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  spring,
} from "remotion";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import {
  TransitionSeries,
  getPresentation,
  createTiming,
  StompStream,
  OutlineStream,
  BrowserMockup,
  Camera,
  Zoom,
  Glow,
  AnimatedGlow,
  LogoReveal,
  Particles,
  LinearGradient,
  Vignette,
  TextAnimation,
} from "../library";

// Load fonts
const { fontFamily: outfitFont } = loadOutfit();
const { fontFamily: interFont } = loadInter();

// Brand colors
const COLORS = {
  primary: "#F56B3D",
  primaryDark: "#D94F26",
  background: "#09090B",
  backgroundLight: "#F5F5F5",
  text: "#FFFFFF",
  textDark: "#09090B",
  textMuted: "#A1A1AA",
  gradientEnd: "#FF8F6B",
};

// Assets
const VOICEOVER_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/audio/1770717278685_9ojztobx8p_nPczCjzI_You_re_juggling_a_do.mp3";
const SCREENSHOT_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1770717322226_hr3orrahpd_superlinks_screenshot.png";
const AI_IMAGE_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1770717328176_yvwl5evow6_ai_network_visualization.png";

// ============================================
// Animated Text Helpers (GSAP-powered)
// ============================================

interface AnimatedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  startFrom?: number;
}

const FadeUpWords: React.FC<AnimatedTextProps> = ({
  children,
  className,
  style,
  startFrom = 0,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "words" });
      tl.from(split.words, {
        opacity: 0,
        y: 50,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const BounceChars: React.FC<AnimatedTextProps> = ({
  children,
  className,
  style,
  startFrom = 0,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl, SplitText }) => {
      const split = new SplitText(textRef.current, { type: "chars" });
      tl.from(split.chars, {
        opacity: 0,
        y: 80,
        scaleY: 0,
        stagger: 0.025,
        duration: 0.5,
        ease: "back.out(2)",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const BlurIn: React.FC<AnimatedTextProps> = ({
  children,
  className,
  style,
  startFrom = 0,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl }) => {
      tl.from(textRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        y: 15,
        duration: 0.7,
        ease: "power2.out",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const ScaleReveal: React.FC<AnimatedTextProps> = ({
  children,
  className,
  style,
  startFrom = 0,
}) => (
  <TextAnimation
    className={className}
    style={style}
    startFrom={startFrom}
    createTimeline={({ textRef, tl }) => {
      tl.from(textRef.current, {
        opacity: 0,
        scale: 0.7,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "back.out(1.7)",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

// ============================================
// Floating shapes for ambient motion
// ============================================

const FloatingShape: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  speed?: number;
}> = ({ x, y, size, color, delay, speed = 1 }) => {
  const frame = useCurrentFrame();
  const t = (frame - delay) * 0.02 * speed;
  const offsetY = Math.sin(t) * 12;
  const offsetX = Math.cos(t * 0.7) * 8;
  const rotate = Math.sin(t * 0.5) * 15;
  const opacity = interpolate(frame - delay, [0, 20], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: color,
        opacity,
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
      }}
    />
  );
};

// ============================================
// SCENE 1: Hook (0:00-0:06) — 180 frames
// VO: "You're juggling a dozen different tools,
//      landing pages here, checkout there, email lists somewhere else."
// ============================================

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily: outfitFont }}>
      <LinearGradient
        colors={["#09090B", "#1a0a05", "#09090B"]}
        direction="to-bottom-right"
        animate
        speed={0.2}
      />

      <Particles count={35} colors={["#F56B3D", "#FF8F6B"]} size={[2, 5]} speed={0.3} type="stars" />

      {/* Ambient floating shapes */}
      <FloatingShape x={100} y={120} size={60} color={COLORS.primary} delay={0} />
      <FloatingShape x={1050} y={500} size={45} color="#FF8F6B" delay={10} />
      <FloatingShape x={200} y={550} size={35} color={COLORS.primary} delay={20} speed={1.3} />
      <FloatingShape x={900} y={100} size={50} color="#FF8F6B" delay={5} speed={0.8} />

      <Camera
        keyframes={[
          { frame: 0, scale: 1.03 },
          { frame: 180, scale: 1.08 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center">
          <div className="text-center px-20">
            {/* Kinetic word cycling — sync with VO listing tools */}
            <StompStream
              text="Juggling Landing Pages Emails Checkouts Analytics"
              wordsPerGroup={1}
              fontSize={80}
              fontWeight={800}
              color={COLORS.text}
              transitionDuration={0.5}
            />

            {/* "Sound familiar?" fades in at ~4.5s */}
            <div
              style={{
                opacity: interpolate(frame, [130, 150], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame, [130, 150], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                marginTop: 32,
              }}
            >
              <span className="text-2xl" style={{ color: COLORS.textMuted, fontFamily: interFont }}>
                Sound familiar?
              </span>
            </div>
          </div>
        </AbsoluteFill>
      </Camera>

      <Vignette intensity={0.4} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 2: Problem / Better Way (0:06-0:08) — 75 frames
// VO: "Sound familiar? There's a better way."
// ============================================

const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  // More intentional, symmetrical tool card layout
  const tools = [
    { name: "Email", x: -240, y: -100, delay: 0 },
    { name: "Landing Pages", x: 240, y: -100, delay: 3 },
    { name: "Checkout", x: -240, y: 100, delay: 6 },
    { name: "Analytics", x: 240, y: 100, delay: 9 },
    { name: "CRM", x: -100, y: -180, delay: 12 },
    { name: "Social", x: 100, y: 180, delay: 15 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.backgroundLight, fontFamily: outfitFont }}>
      <Camera
        keyframes={[
          { frame: 0, scale: 1.0 },
          { frame: 75, scale: 1.05 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center">
          {/* Tool cards — appear fast, then shrink and fade to reveal center text */}
          {tools.map((tool, i) => {
            const toolFrame = frame - tool.delay;
            const appearOpacity = interpolate(toolFrame, [0, 8], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            // Cards fade and shrink after center text appears
            const fadeOut = interpolate(frame, [30, 50], [1, 0.2], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const toolScale = interpolate(toolFrame, [0, 10], [0.6, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            });
            const wiggle = Math.sin(frame * 0.04 + i * 1.5) * 2;

            return (
              <div
                key={tool.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${tool.x}px), calc(-50% + ${tool.y}px)) scale(${toolScale}) rotate(${wiggle}deg)`,
                  opacity: appearOpacity * fadeOut,
                  padding: "10px 22px",
                  background: "#ffffff",
                  borderRadius: 10,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid #e4e4e7",
                  fontFamily: interFont,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#71717a",
                }}
              >
                {tool.name}
              </div>
            );
          })}

          {/* "There's a better way." — center reveal */}
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              opacity: interpolate(frame, [25, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <FadeUpWords className="text-5xl font-bold text-zinc-900" startFrom={25}>
              There&apos;s a better way.
            </FadeUpWords>
          </div>
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 3: Solution Reveal (0:08-0:15) — 210 frames
// VO: "Meet Superlinks, the all-in-one AI platform
//      that lets creators build, launch, and monetize
//      digital products with zero coding."
// ============================================

const SolutionRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily: outfitFont }}>
      <LinearGradient
        colors={["#09090B", "#150808", "#09090B"]}
        direction="to-bottom"
      />

      <Particles count={40} colors={[COLORS.primary, "#FF8F6B"]} size={[1, 4]} speed={0.5} type="stars" />

      <FloatingShape x={150} y={100} size={50} color={COLORS.primary} delay={0} />
      <FloatingShape x={1000} y={550} size={40} color="#FF8F6B" delay={15} />
      <FloatingShape x={1100} y={120} size={35} color={COLORS.primary} delay={30} speed={0.7} />

      <Camera
        keyframes={[
          { frame: 0, scale: 1.08 },
          { frame: 120, scale: 1.0, easing: Easing.out(Easing.cubic) },
        ]}
      >
        <AbsoluteFill className="flex flex-col items-center justify-center gap-5">
          {/* "Meet" */}
          <div
            style={{
              opacity: interpolate(frame, [5, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [5, 25], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
            }}
          >
            <span className="text-3xl font-medium tracking-widest" style={{ color: COLORS.textMuted }}>
              Meet
            </span>
          </div>

          {/* Logo + Name — glow reveal */}
          <LogoReveal revealStyle="glow" glowColor={COLORS.primary} duration={1} delay={0.5}>
            <AnimatedGlow color={COLORS.primary} intensity={30} layers={3} duration={0.8} delay={0.6}>
              <div className="flex items-center gap-4">
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 50px ${COLORS.primary}50`,
                  }}
                >
                  <span className="text-3xl font-black text-white">S</span>
                </div>
                <span className="text-7xl font-black tracking-tight" style={{ color: COLORS.text }}>
                  Superlinks
                </span>
              </div>
            </AnimatedGlow>
          </LogoReveal>

          {/* Sub-tagline — syncs with "all-in-one AI platform..." */}
          <div
            style={{
              opacity: interpolate(frame, [60, 85], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 12,
            }}
          >
            <BlurIn
              className="text-xl tracking-wide"
              style={{ color: COLORS.textMuted }}
              startFrom={60}
            >
              The all-in-one AI platform for creators
            </BlurIn>
          </div>

          {/* "Zero Coding" emphasis — syncs with end of VO segment */}
          <div
            style={{
              opacity: interpolate(frame, [140, 165], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(frame, [140, 165], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) })})`,
              marginTop: 20,
            }}
          >
            <div
              style={{
                padding: "10px 28px",
                borderRadius: 999,
                border: `2px solid ${COLORS.primary}`,
                color: COLORS.primary,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 2,
              }}
            >
              ZERO CODING REQUIRED
            </div>
          </div>
        </AbsoluteFill>
      </Camera>

      <Vignette intensity={0.3} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 4: Product Demo (0:15-0:19) — 120 frames
// VO: "One intelligent dashboard, everything connected."
// ============================================

const ProductDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.backgroundLight, fontFamily: outfitFont }}>
      {/* Title text above the mockup */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          opacity: interpolate(frame, [5, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [5, 25], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
        }}
      >
        <ScaleReveal className="text-3xl font-bold text-zinc-800" startFrom={5}>
          One Intelligent Dashboard
        </ScaleReveal>
      </div>

      {/* Browser mockup with push-in camera */}
      <Camera
        keyframes={[
          { frame: 0, scale: 0.95, y: 20 },
          { frame: 40, scale: 1.0, y: 0, easing: Easing.out(Easing.cubic) },
          { frame: 120, scale: 1.08, y: -15 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center" style={{ paddingTop: 50 }}>
          <div
            style={{
              opacity: interpolate(frame, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `perspective(1200px) rotateX(${interpolate(frame, [0, 50], [6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)`,
            }}
          >
            <BrowserMockup
              browser="chrome"
              theme="dark"
              url="superlinks.ai/dashboard"
              tabTitle="Superlinks Dashboard"
              width={960}
              height={560}
              shadow
            >
              <Img
                src={SCREENSHOT_URL}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </BrowserMockup>
          </div>
        </AbsoluteFill>
      </Camera>

      {/* Floating badges — spring pop-in */}
      {[
        { text: "Products", x: -440, y: -150, delay: 25 },
        { text: "Analytics", x: 440, y: -130, delay: 35 },
        { text: "AI Engine", x: -420, y: 180, delay: 45 },
        { text: "Payments", x: 420, y: 200, delay: 55 },
      ].map((badge) => {
        const badgeProgress = spring({
          frame: frame - badge.delay,
          fps,
          config: { damping: 14, stiffness: 120 },
        });
        const badgeOpacity = interpolate(frame - badge.delay, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={badge.text}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${badge.x}px), calc(-50% + ${badge.y}px)) scale(${badgeProgress})`,
              opacity: badgeOpacity,
              padding: "8px 18px",
              background: COLORS.primary,
              borderRadius: 999,
              color: "white",
              fontWeight: 600,
              fontSize: 13,
              fontFamily: interFont,
              boxShadow: `0 4px 16px ${COLORS.primary}40`,
            }}
          >
            {badge.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 5: Benefits + Magic (0:19-0:23) — 120 frames
// VO: "Turn your knowledge into income,
//      build faster, launch easier, grow limitless."
// ============================================

const BenefitsMagicScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050508" }}>
      {/* AI background image fades in */}
      <Img
        src={AI_IMAGE_URL}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 25], [0, 0.65], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(5,5,8,0.5) 0%, rgba(5,5,8,0.85) 70%, rgba(5,5,8,0.97) 100%)",
        }}
      />

      <Zoom from={1.0} to={1.06}>
        <AbsoluteFill
          className="flex flex-col items-center justify-center gap-4"
          style={{ fontFamily: outfitFont }}
        >
          {/* "Turn Your Knowledge Into Income" */}
          <div
            style={{
              opacity: interpolate(frame, [5, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <Glow color={COLORS.primary} intensity={15} layers={2} pulsate pulseDuration={4}>
              <BounceChars className="text-6xl font-black text-white" startFrom={8}>
                Turn Your Knowledge Into Income
              </BounceChars>
            </Glow>
          </div>

          {/* "Build Faster. Launch Easier." */}
          <div
            style={{
              opacity: interpolate(frame, [45, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 16,
            }}
          >
            <FadeUpWords
              className="text-3xl font-bold"
              style={{ color: COLORS.gradientEnd }}
              startFrom={48}
            >
              Build Faster. Launch Easier.
            </FadeUpWords>
          </div>

          {/* "Grow Limitless." — appears earlier, fades out before transition */}
          <div
            style={{
              opacity: interpolate(frame, [55, 70, 105, 115], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(frame, [55, 75], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) })})`,
              marginTop: 20,
              padding: "12px 36px",
              background: `${COLORS.primary}25`,
              borderRadius: 16,
              border: `1px solid ${COLORS.primary}50`,
            }}
          >
            <span className="text-4xl font-black" style={{ color: COLORS.primary }}>
              Grow Limitless.
            </span>
          </div>
        </AbsoluteFill>
      </Zoom>

      <Vignette intensity={0.5} />
    </AbsoluteFill>
  );
};

// ============================================
// SCENE 6: Tagline + Logo CTA (0:23-0:30) — 240 frames
// VO: "Superlinks.ai, one platform, infinite possibilities."
// ============================================

const TaglineLogoCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: 0-110 frames → "One Platform, Infinite Possibilities" on light bg
  // Phase 2: 110-270 frames → Logo + CTA on dark bg
  const phase2Start = 110;
  const isPhase2 = frame >= phase2Start;

  // Background transition from light to dark
  const bgDarkness = interpolate(frame, [phase2Start - 8, phase2Start + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: outfitFont }}>
      {/* Light background */}
      <AbsoluteFill style={{ backgroundColor: COLORS.backgroundLight, opacity: 1 - bgDarkness }} />

      {/* Dark background + gradient */}
      <AbsoluteFill style={{ opacity: bgDarkness }}>
        <AbsoluteFill style={{ backgroundColor: COLORS.background }} />
        <LinearGradient
          colors={["#09090B", "#120808", "#09090B"]}
          direction="to-bottom"
        />
        <Particles count={50} colors={[COLORS.primary, "#FF8F6B"]} size={[1, 3]} speed={0.6} type="stars" />
      </AbsoluteFill>

      {/* PHASE 1: Tagline on light background */}
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [phase2Start - 5, phase2Start + 5], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Camera
          keyframes={[
            { frame: 0, scale: 1.0 },
            { frame: 110, scale: 1.04 },
          ]}
        >
          <AbsoluteFill className="flex items-center justify-center">
            <div className="text-center">
              <OutlineStream
                text="One Platform Infinite Possibilities"
                wordsPerGroup={2}
                fontSize={72}
                fontWeight={800}
                color={COLORS.textDark}
                transitionDuration={0.4}
                duration={3.5}
                delayAfterLastWord={0.5}
              />
            </div>
          </AbsoluteFill>
        </Camera>
      </AbsoluteFill>

      {/* PHASE 2: Logo + CTA on dark background */}
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [phase2Start, phase2Start + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AbsoluteFill className="flex flex-col items-center justify-center gap-7">
          {/* Logo reveal */}
          <LogoReveal revealStyle="elastic" duration={1} delay={phase2Start / 30}>
            <AnimatedGlow
              color={COLORS.primary}
              intensity={35}
              layers={3}
              duration={0.8}
              delay={phase2Start / 30 + 0.3}
              pulsateAfter
              pulseDuration={2.5}
            >
              <div className="flex items-center gap-5">
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 50px ${COLORS.primary}60`,
                  }}
                >
                  <span className="text-4xl font-black text-white">S</span>
                </div>
                <span className="text-8xl font-black tracking-tight" style={{ color: COLORS.text }}>
                  Superlinks
                </span>
              </div>
            </AnimatedGlow>
          </LogoReveal>

          {/* Tagline below logo */}
          {isPhase2 && (
            <div
              style={{
                opacity: interpolate(frame - phase2Start, [30, 50], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame - phase2Start, [30, 50], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <span className="text-2xl font-medium tracking-wide" style={{ color: COLORS.textMuted }}>
                Turn Your Knowledge Into Income
              </span>
            </div>
          )}

          {/* CTA Button */}
          {isPhase2 && (
            <div
              style={{
                opacity: interpolate(frame - phase2Start, [50, 70], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `scale(${spring({ frame: frame - phase2Start - 50, fps, config: { damping: 14, stiffness: 120 } })})`,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  padding: "16px 52px",
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
                  borderRadius: 999,
                  color: "white",
                  fontSize: 22,
                  fontWeight: 700,
                  boxShadow: `0 0 40px ${COLORS.primary}50, 0 8px 32px rgba(0,0,0,0.3)`,
                }}
              >
                Start for Free
              </div>
            </div>
          )}

          {/* URL */}
          {isPhase2 && (
            <div
              style={{
                opacity: interpolate(frame - phase2Start, [65, 85], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                marginTop: 6,
              }}
            >
              <span className="text-lg" style={{ color: COLORS.textMuted, fontFamily: interFont }}>
                superlinks.ai
              </span>
            </div>
          )}
        </AbsoluteFill>
      </AbsoluteFill>

      <Vignette intensity={isPhase2 ? 0.4 : 0} />
    </AbsoluteFill>
  );
};

// ============================================
// MAIN COMPOSITION
// ============================================

export const Main: React.FC = () => {
  /*
   * VO Timeline (at 30fps):
   * [0:00-0:06] Hook — 180 frames
   * [0:06-0:08] Problem — 75 frames
   * [0:08-0:15] Solution Reveal — 210 frames
   * [0:15-0:19] Product Demo — 120 frames
   * [0:19-0:23] Benefits + Magic — 120 frames
   * [0:23-0:30] Tagline + Logo CTA — 240 frames
   *
   * 6 scenes, 5 transitions at 10 frames each = 50 frames overlap
   * Gross: 945 frames | Net: ~895 frames (~29.8s)
   * Add +30 frame hold at end → composition = 975 frames (32.5s)
   */

  const T = 10; // transition duration in frames

  return (
    <AbsoluteFill>
      {/* Voiceover */}
      <Audio src={VOICEOVER_URL} volume={1} />

      <TransitionSeries>
        {/* Scene 1: Hook (0:00-0:06) */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("glitch")}
          timing={createTiming("snappy", T)}
        />

        {/* Scene 2: Problem (0:06-0:08) */}
        <TransitionSeries.Sequence durationInFrames={75}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("flashBlack")}
          timing={createTiming("snappy", T)}
        />

        {/* Scene 3: Solution Reveal (0:08-0:15) */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <SolutionRevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("zoomIn")}
          timing={createTiming("smooth", T)}
        />

        {/* Scene 4: Product Demo (0:15-0:19) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <ProductDemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("slideLeft")}
          timing={createTiming("snappy", T)}
        />

        {/* Scene 5: Benefits + Magic (0:19-0:23) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <BenefitsMagicScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("flashWhite")}
          timing={createTiming("snappy", T)}
        />

        {/* Scene 6: Tagline + Logo CTA (0:23-0:32) */}
        <TransitionSeries.Sequence durationInFrames={290}>
          <TaglineLogoCTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
