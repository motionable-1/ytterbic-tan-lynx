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
  PushStream,
  Counter,
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

// Brand colors from Superlinks.ai
const COLORS = {
  primary: "#F56B3D", // Orange accent
  background: "#09090B", // Near black
  backgroundLight: "#FAFAFA",
  text: "#FFFFFF",
  textMuted: "#A1A1AA",
  gradientStart: "#F56B3D",
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
// Animated Text Components (using TextAnimation with GSAP)
// ============================================

interface AnimatedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  startFrom?: number;
}

const FadeUpText: React.FC<AnimatedTextProps> = ({
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
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const BounceText: React.FC<AnimatedTextProps> = ({
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
        y: 60,
        scaleY: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "back.out(2)",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const BlurInText: React.FC<AnimatedTextProps> = ({
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
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

const SlideUpText: React.FC<AnimatedTextProps> = ({
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
        y: 50,
        duration: 0.7,
        ease: "power3.out",
      });
      return tl;
    }}
  >
    {children}
  </TextAnimation>
);

// ============================================
// Scene Components
// ============================================

/**
 * Scene 1: Hook - Pain point visualization
 * "You're juggling a dozen different tools..."
 */
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: outfitFont,
      }}
    >
      {/* Animated gradient background */}
      <LinearGradient
        colors={["#09090B", "#1a0a0a", "#09090B"]}
        direction="to-bottom-right"
        animate
        speed={0.25}
      />

      {/* Floating particles for depth */}
      <Particles
        count={30}
        colors={[COLORS.primary]}
        size={[2, 4]}
        speed={0.3}
        type="dust"
      />

      <Camera
        keyframes={[
          { frame: 0, scale: 1.02 },
          { frame: 90, scale: 1.06 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center">
          <div className="text-center px-16">
            <StompStream
              text="Juggling Landing Pages Emails Checkouts Analytics"
              wordsPerGroup={1}
              fontSize={72}
              fontWeight={800}
              color={COLORS.text}
              transitionDuration={0.35}
            />

            {/* Subtitle fade in */}
            <div
              style={{
                opacity: interpolate(frame, [60, 75], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame, [60, 75], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                marginTop: 24,
              }}
            >
              <span
                className="text-2xl"
                style={{ color: COLORS.textMuted, fontFamily: interFont }}
              >
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

/**
 * Scene 2: Problem amplification
 * "There's a better way..."
 */
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Scattered tool icons animation
  const tools = [
    { name: "Email", x: -280, y: -120, delay: 0 },
    { name: "Landing", x: 260, y: -80, delay: 5 },
    { name: "Checkout", x: -200, y: 100, delay: 10 },
    { name: "Analytics", x: 220, y: 130, delay: 15 },
    { name: "CRM", x: -50, y: -160, delay: 20 },
    { name: "Social", x: 100, y: 160, delay: 25 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundLight,
        fontFamily: outfitFont,
      }}
    >
      <Camera
        keyframes={[
          { frame: 0, scale: 1.0 },
          { frame: 90, scale: 1.04 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center">
          {/* Scattered tool cards */}
          {tools.map((tool, i) => {
            const toolFrame = frame - tool.delay;
            const opacity = interpolate(toolFrame, [0, 15], [0, 0.7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const scale = interpolate(toolFrame, [0, 15], [0.5, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            });
            const rotation = Math.sin(frame * 0.03 + i) * 3;

            return (
              <div
                key={tool.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${tool.x}px), calc(-50% + ${tool.y}px)) scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  padding: "12px 24px",
                  background: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e5e5",
                  fontFamily: interFont,
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#71717a",
                }}
              >
                {tool.name}
              </div>
            );
          })}

          {/* Center message */}
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              opacity: interpolate(frame, [40, 55], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <FadeUpText
              className="text-5xl font-bold text-zinc-900"
              startFrom={40}
            >
              There&apos;s a better way.
            </FadeUpText>
          </div>
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};

/**
 * Scene 3: Solution reveal
 * "Meet Superlinks..."
 */
const SolutionRevealScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: outfitFont,
      }}
    >
      <LinearGradient
        colors={["#09090B", "#150808", "#09090B"]}
        direction="to-bottom"
      />

      <Particles
        count={40}
        colors={[COLORS.primary]}
        size={[1, 3]}
        speed={0.5}
        type="stars"
      />

      <Camera
        keyframes={[
          { frame: 0, scale: 1.1 },
          { frame: 90, scale: 1.0, easing: Easing.out(Easing.cubic) },
        ]}
      >
        <AbsoluteFill className="flex flex-col items-center justify-center gap-6">
          {/* "Meet" text */}
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            <span
              className="text-3xl font-medium tracking-wide"
              style={{ color: COLORS.textMuted }}
            >
              Meet
            </span>
          </div>

          {/* Superlinks Logo/Name */}
          <LogoReveal
            revealStyle="glow"
            glowColor={COLORS.primary}
            duration={1}
            delay={0.3}
          >
            <AnimatedGlow
              color={COLORS.primary}
              intensity={30}
              layers={3}
              duration={0.8}
              delay={0.5}
            >
              <div className="flex items-center gap-4">
                {/* Logo mark */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 40px ${COLORS.primary}50`,
                  }}
                >
                  <span className="text-3xl font-black text-white">S</span>
                </div>

                {/* Text */}
                <span
                  className="text-7xl font-black tracking-tight"
                  style={{ color: COLORS.text }}
                >
                  Superlinks
                </span>
              </div>
            </AnimatedGlow>
          </LogoReveal>

          {/* Tagline */}
          <div
            style={{
              opacity: interpolate(frame, [50, 70], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 16,
            }}
          >
            <BlurInText
              className="text-xl tracking-wide"
              style={{ color: COLORS.textMuted }}
              startFrom={50}
            >
              The all-in-one AI platform for creators
            </BlurInText>
          </div>
        </AbsoluteFill>
      </Camera>

      <Vignette intensity={0.3} />
    </AbsoluteFill>
  );
};

/**
 * Scene 4: Product Demo
 * Showing the unified dashboard
 */
const ProductDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundLight,
        fontFamily: outfitFont,
      }}
    >
      <Camera
        keyframes={[
          { frame: 0, scale: 1.0, y: 0 },
          { frame: 60, scale: 1.1, y: -20 },
          { frame: 150, scale: 1.15, y: -30 },
        ]}
        defaultEasing={Easing.out(Easing.cubic)}
      >
        <AbsoluteFill className="flex items-center justify-center p-16">
          {/* Browser mockup with screenshot */}
          <div
            style={{
              opacity: interpolate(frame, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `translateY(${interpolate(frame, [0, 20], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px) perspective(1000px) rotateX(${interpolate(frame, [0, 60], [8, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg)`,
            }}
          >
            <BrowserMockup
              browser="chrome"
              theme="dark"
              url="superlinks.ai/dashboard"
              tabTitle="Superlinks Dashboard"
              width={1000}
              height={620}
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

      {/* Floating benefit badges */}
      {[
        { text: "Zero Coding", x: -420, y: -200, delay: 30 },
        { text: "AI-Powered", x: 420, y: -180, delay: 40 },
        { text: "All-in-One", x: -400, y: 200, delay: 50 },
      ].map((badge) => {
        const badgeFrame = frame - badge.delay;
        const opacity = interpolate(badgeFrame, [0, 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const badgeScale = spring({
          frame: badgeFrame,
          fps,
          config: { damping: 12, stiffness: 100 },
        });

        return (
          <div
            key={badge.text}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${badge.x}px), calc(-50% + ${badge.y}px)) scale(${badgeScale})`,
              opacity,
              padding: "10px 20px",
              background: COLORS.primary,
              borderRadius: 999,
              color: "white",
              fontWeight: 600,
              fontSize: 14,
              boxShadow: `0 4px 20px ${COLORS.primary}50`,
            }}
          >
            {badge.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/**
 * Scene 5: Benefits / Outcome
 * "Turn your knowledge into income"
 */
const BenefitsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: outfitFont,
      }}
    >
      <LinearGradient
        colors={["#09090B", "#0a1015", "#09090B"]}
        direction="to-bottom-right"
        animate
        speed={0.2}
      />

      <Particles
        count={25}
        colors={[COLORS.primary]}
        size={[1, 3]}
        speed={0.4}
        type="dust"
      />

      <Camera
        keyframes={[
          { frame: 0, scale: 1.02 },
          { frame: 120, scale: 1.06 },
        ]}
      >
        <AbsoluteFill className="flex flex-col items-center justify-center gap-8">
          {/* Main headline */}
          <div className="text-center">
            <PushStream
              text="Turn Your Knowledge Into Income"
              wordsPerGroup={2}
              fontSize={64}
              fontWeight={800}
              color={COLORS.text}
              transitionDuration={0.4}
            />
          </div>

          {/* Stats row */}
          <div
            className="flex gap-16 mt-8"
            style={{
              opacity: interpolate(frame, [50, 70], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {[
              { value: 10, suffix: "x", label: "Faster Launch" },
              { value: 0, suffix: "%", label: "Code Required", prefix: "" },
              { value: 100, suffix: "%", label: "Creator Freedom" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  transform: `translateY(${interpolate(frame - 50 - i * 5, [0, 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                }}
              >
                <div
                  className="text-5xl font-black"
                  style={{ color: COLORS.primary }}
                >
                  {stat.prefix}
                  <Counter
                    from={0}
                    to={stat.value}
                    duration={1.5}
                    delay={0.3 + i * 0.2}
                  />
                  {stat.suffix}
                </div>
                <div
                  className="text-lg mt-2"
                  style={{ color: COLORS.textMuted, fontFamily: interFont }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Camera>

      <Vignette intensity={0.35} />
    </AbsoluteFill>
  );
};

/**
 * Scene 6: Magic Moment - AI visualization
 */
const MagicMomentScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#050508" }}>
      {/* AI-generated background image */}
      <Img
        src={AI_IMAGE_URL}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 30], [0, 0.8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Overlay gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(5,5,8,0.7) 70%, rgba(5,5,8,0.95) 100%)",
        }}
      />

      <Zoom from={1.0} to={1.08}>
        <AbsoluteFill
          className="flex flex-col items-center justify-center"
          style={{ fontFamily: outfitFont }}
        >
          {/* Kinetic text */}
          <div
            style={{
              opacity: interpolate(frame, [20, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <Glow
              color={COLORS.primary}
              intensity={20}
              layers={2}
              pulsate
              pulseDuration={3}
            >
              <div className="text-center">
                <BounceText
                  className="text-6xl font-black text-white"
                  startFrom={25}
                >
                  Build Faster. Launch Easier.
                </BounceText>
              </div>
            </Glow>
          </div>

          <div
            style={{
              opacity: interpolate(frame, [60, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 24,
            }}
          >
            <SlideUpText
              className="text-3xl font-semibold"
              style={{ color: COLORS.primary }}
              startFrom={60}
            >
              Grow Limitless.
            </SlideUpText>
          </div>
        </AbsoluteFill>
      </Zoom>

      <Vignette intensity={0.5} />
    </AbsoluteFill>
  );
};

/**
 * Scene 7: Tagline
 */
const TaglineScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.backgroundLight,
        fontFamily: outfitFont,
      }}
    >
      <Camera
        keyframes={[
          { frame: 0, scale: 1.0 },
          { frame: 90, scale: 1.03 },
        ]}
      >
        <AbsoluteFill className="flex items-center justify-center">
          <div className="text-center">
            <PushStream
              text="One Platform Infinite Possibilities"
              wordsPerGroup={2}
              fontSize={72}
              fontWeight={800}
              color="#09090B"
              transitionDuration={0.5}
            />
          </div>
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};

/**
 * Scene 8: Logo + CTA
 */
const LogoCTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: outfitFont,
      }}
    >
      <LinearGradient
        colors={["#09090B", "#120808", "#09090B"]}
        direction="to-bottom"
      />

      <Particles
        count={50}
        colors={[COLORS.primary]}
        size={[1, 3]}
        speed={0.6}
        type="stars"
      />

      <AbsoluteFill className="flex flex-col items-center justify-center gap-8">
        {/* Logo */}
        <LogoReveal revealStyle="elastic" duration={1.2}>
          <AnimatedGlow
            color={COLORS.primary}
            intensity={40}
            layers={3}
            duration={1}
            pulsateAfter
            pulseDuration={2.5}
          >
            <div className="flex items-center gap-5">
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 60px ${COLORS.primary}60`,
                }}
              >
                <span className="text-4xl font-black text-white">S</span>
              </div>
              <span
                className="text-8xl font-black tracking-tight"
                style={{ color: COLORS.text }}
              >
                Superlinks
              </span>
            </div>
          </AnimatedGlow>
        </LogoReveal>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [40, 60], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
          }}
        >
          <span
            className="text-2xl font-medium tracking-wide"
            style={{ color: COLORS.textMuted }}
          >
            Turn Your Knowledge Into Income
          </span>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 12, stiffness: 100 } })})`,
            marginTop: 16,
          }}
        >
          <div
            style={{
              padding: "16px 48px",
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd})`,
              borderRadius: 999,
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              boxShadow: `0 0 30px ${COLORS.primary}50, 0 8px 32px rgba(0,0,0,0.3)`,
            }}
          >
            Start for Free
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: interpolate(frame, [80, 100], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            marginTop: 8,
          }}
        >
          <span
            className="text-lg"
            style={{ color: COLORS.textMuted, fontFamily: interFont }}
          >
            superlinks.ai
          </span>
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.4} />
    </AbsoluteFill>
  );
};

// ============================================
// Main Composition
// ============================================

export const Main: React.FC = () => {
  // Total duration: ~34s at 30fps = 1020 frames (with 1s buffer at end)
  // Voiceover is 32.18s

  // Scene durations (in frames at 30fps)
  const SCENE_DURATIONS = {
    hook: 120, // 4s - "You're juggling..."
    problem: 90, // 3s - "There's a better way"
    solutionReveal: 120, // 4s - "Meet Superlinks"
    productDemo: 180, // 6s - Dashboard showcase
    benefits: 150, // 5s - "Turn your knowledge..."
    magicMoment: 120, // 4s - AI visualization
    tagline: 90, // 3s - "One Platform..."
    logoCTA: 150, // 5s - Final logo + CTA
  };

  const TRANSITION_DURATION = 12;

  return (
    <AbsoluteFill>
      {/* Voiceover */}
      <Audio src={VOICEOVER_URL} volume={1} />

      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("glitch")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />

        {/* Scene 2: Problem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("flashBlack")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />

        {/* Scene 3: Solution Reveal */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.solutionReveal}
        >
          <SolutionRevealScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("zoomIn")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />

        {/* Scene 4: Product Demo */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.productDemo}
        >
          <ProductDemoScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("whipPan")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />

        {/* Scene 5: Benefits */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.benefits}>
          <BenefitsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("blurDissolve")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />

        {/* Scene 6: Magic Moment */}
        <TransitionSeries.Sequence
          durationInFrames={SCENE_DURATIONS.magicMoment}
        >
          <MagicMomentScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("flashWhite")}
          timing={createTiming("snappy", TRANSITION_DURATION)}
        />

        {/* Scene 7: Tagline */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.tagline}>
          <TaglineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={getPresentation("zoomOut")}
          timing={createTiming("smooth", TRANSITION_DURATION)}
        />

        {/* Scene 8: Logo + CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.logoCTA}>
          <LogoCTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
