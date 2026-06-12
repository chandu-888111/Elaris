import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Component, type ReactNode, lazy, Suspense, useRef, useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { useSceneStore } from "@/hooks/use-scene-store";
import { playHover, playClick } from "@/lib/sounds";
import { ArrowRight, Rocket } from "lucide-react";
import gsap from "gsap";

// Lazy load GlobalCanvas
const GlobalCanvas = lazy(() => import("@/components/GlobalCanvas"));

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Lazy-load all expansion components for performance
const AntigravityText = lazy(() =>
  import("@/components/landing/AntigravityText").then((m) => ({ default: m.AntigravityText })),
);
const BentoGrid = lazy(() =>
  import("@/components/landing/BentoGrid").then((m) => ({ default: m.BentoGrid })),
);
const InfiniteMarquee = lazy(() =>
  import("@/components/landing/InfiniteMarquee").then((m) => ({ default: m.InfiniteMarquee })),
);
const FeatureShowcase = lazy(() =>
  import("@/components/landing/FeatureShowcase").then((m) => ({ default: m.FeatureShowcase })),
);
const LiveStats = lazy(() =>
  import("@/components/landing/LiveStats").then((m) => ({ default: m.LiveStats })),
);
const DeveloperEcosystem = lazy(() =>
  import("@/components/landing/DeveloperEcosystem").then((m) => ({
    default: m.DeveloperEcosystem,
  })),
);
const UniverseFooter = lazy(() =>
  import("@/components/landing/UniverseFooter").then((m) => ({ default: m.UniverseFooter })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "ProjectSpark — AI Innovation & Learning OS" }],
  }),
  component: LandingPage,
});

// Using Framer Motion for magnetic button effect
function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) < 100) {
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function PortalButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const navigate = useNavigate();
  const store = useSceneStore();

  const handlePortalEntry = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();

    // Trigger the camera dive into the AI Core
    gsap.to(store.cameraPosition, {
      0: 0, // x
      1: 0, // y
      2: -0.5, // z (deep inside the core)
      duration: 1.5,
      ease: "power4.in",
    });

    // Create a white-out flash overlay
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.backgroundColor = "white";
    flash.style.opacity = "0";
    flash.style.zIndex = "9999";
    flash.style.pointerEvents = "none";
    document.body.appendChild(flash);

    gsap.to(flash, {
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        // Hard navigate when fully white
        navigate({ to: "/login" });
        setTimeout(() => {
          gsap.to(flash, { opacity: 0, duration: 1, onComplete: () => flash.remove() });
        }, 500);
      },
    });
  };

  return (
    <button onClick={handlePortalEntry} onMouseEnter={playHover} className={className}>
      {children}
    </button>
  );
}

const SCENES = [
  {
    id: 1,
    title: "The Primordial Spark",
    subtitle: "The Heart.",
    desc: "A massive procedural AI entity built from liquid glass and neural noise. It breathes, learns, and reacts to your presence.",
    action: "Initialize Sequence",
  },
  {
    id: 2,
    title: "Knowledge Galaxy",
    subtitle: "Orbiting Technologies.",
    desc: "Navigate the universe of learning. Technologies become planets, concepts become moons, and resources orbit as high-speed satellites.",
    action: "Explore Universe",
  },
  {
    id: 3,
    title: "Developer Ecosystem",
    subtitle: "Orbiting Technologies.",
    desc: "Navigate the universe of learning. Technologies become planets, concepts become moons, and resources orbit as high-speed satellites.",
    action: "Explore Ecosystem",
  },
  {
    id: 4,
    title: "AI Project Generator",
    subtitle: "Code flows like water.",
    desc: "Watch as the AI dynamically forms your architectures, compiling directories and infrastructure directly into your workspace.",
    action: "Deploy Architectures",
  },
  {
    id: 5,
    title: "Team Collaboration Universe",
    subtitle: "Global Sync.",
    desc: "Form alliances with developers across the globe. The AI matches complementary skills instantly in a visual 3D hub.",
    action: "Sync Network",
  },
  {
    id: 6,
    title: "Learning & Career Engine",
    subtitle: "Ascension.",
    desc: "Your achievements unlock new trajectories. Your resume, interview readiness, and streak scores form a holographic identity.",
    action: "View Trajectory",
  },
  {
    id: 7,
    title: "Future Developer Identity",
    subtitle: "Vision 2050.",
    desc: "ProjectSpark is not a website. It is a full AI Operating System. Are you ready to step through the portal?",
    action: "Enter The Portal",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [showGetStarted, setShowGetStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowGetStarted(window.scrollY > window.innerHeight * 7 + window.innerHeight * 0.2);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <FixedHeader />
      <div className="relative text-foreground overflow-x-clip">
        <LandingMovie />

        {/* Antigravity Expansion Sections */}
        <Suspense
          fallback={<div className="py-24 text-center text-white/50">Loading Ecosystem...</div>}
        >
          <AntigravityText />
          <DeveloperEcosystem />
          <InfiniteMarquee />
          <BentoGrid />
          <LiveStats />
          <FeatureShowcase />
          <UniverseFooter />
        </Suspense>
        <BackToTop />

        {/* Floating Get Started button — persistent above BackToTop after core reveal */}
        <AnimatePresence>
          {showGetStarted && (
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.8 }}
              onClick={() => navigate({ to: "/login" })}
              className="fixed bottom-24 right-8 z-50 group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium tracking-wider backdrop-blur-xl transition-all hover:bg-white hover:text-black shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span>Get Started</span>
              <Rocket className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function FixedHeader() {
  const [activeScene, setActiveScene] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const v = scrollY / (window.innerHeight * 7);
      setActiveScene(Math.min(6, Math.max(0, Math.floor(v * 7))));
      setHidden(scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showNav = activeScene < 6;

  return (
    <motion.header
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -20 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 pointer-events-none"
    >
      <div className="pointer-events-auto">
        <Logo />
      </div>
      {!showNav && (
        <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-white/40 pointer-events-auto">
          Core Access
        </span>
      )}
      <Magnetic>
        <PortalButton className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:scale-105 transition-transform pointer-events-auto">
          {activeScene < 6 ? "Initialize Portal" : "Enter The Core"}
        </PortalButton>
      </Magnetic>
    </motion.header>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
        >
          <Rocket className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const SCENE_BOUNDARY = 0.823; // 700/850 — scenes occupy first 700vh of 850vh
const SCENE_STEP = SCENE_BOUNDARY / 7; // 0.1176 per scene

function getPostPhase(v: number): number {
  if (v < SCENE_BOUNDARY) return 0;
  const t = (v - SCENE_BOUNDARY) / (1 - SCENE_BOUNDARY); // 0..1 in post-zone
  if (t < 0.25) return 1;
  if (t < 0.5) return 2;
  if (t < 0.75) return 3;
  return 4;
}

function PostSceneOverlay({ postPhase }: { postPhase: number }) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 pointer-events-none">
      {postPhase >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 12 }}
          className="pointer-events-auto"
        >
          <Magnetic>
            <button
              onClick={() => navigate({ to: "/login" })}
              className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-10 py-4 text-base font-medium backdrop-blur-xl transition-all hover:bg-white hover:text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105"
            >
              <span className="tracking-wider">Get Started</span>
              <Rocket className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </div>
  );
}

function LandingMovie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { setScene, setState } = useSceneStore();
  const [activeScene, setActiveScene] = useState(0);
  const [scrollVal, setScrollVal] = useState(0);

  useEffect(() => {
    setScene("landing");
  }, [setScene]);

  // Update global 3D canvas state based on scroll
  const camZ = useTransform(
    scrollYProgress,
    [0, 0.1176, 0.2353, 0.3529, 0.4706, 0.5882, 0.7059, 0.823, 1],
    [10.0, 7.0, 12.0, 8.0, 15.0, 5.0, 3.0, 3.0, 0.5],
  );
  const camX = useTransform(
    scrollYProgress,
    [0, 0.1176, 0.2353, 0.3529, 0.4706, 0.5882, 0.7059, 0.823, 1],
    [0, 3, -4, 2, -3, 1, 0, 0, 0],
  );
  const particles = useTransform(scrollYProgress, [0, 0.4115, 0.823, 1], [1.0, 4.0, 8.0, 12.0]);
  const colors = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.823, 1],
    ["#ffffff", "#60a5fa", "#c084fc", "#fcd34d", "#ff6b6b"],
  );

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollVal(v);
      const sceneIndex = v < SCENE_BOUNDARY ? Math.min(6, Math.floor(v / SCENE_STEP)) : 6;
      setActiveScene(sceneIndex);
      const phase = getPostPhase(v);
      setState({
        cameraPosition: [camX.get(), 0, camZ.get()],
        particlesIntensity: particles.get(),
        glowColor: colors.get(),
        coreScale:
          v < SCENE_BOUNDARY
            ? 1 + v * 0.5
            : 1 + SCENE_BOUNDARY * 0.5 + ((v - SCENE_BOUNDARY) / (1 - SCENE_BOUNDARY)) * 1.2,
        postScenePhase: phase,
      });
    });
    return () => unsub();
  }, [scrollYProgress, camX, camZ, particles, colors, setState]);

  const postPhase = getPostPhase(scrollVal);

  return (
    <div ref={containerRef} className="relative h-[850vh] bg-transparent pointer-events-none">
      {/* Fixed Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pointer-events-auto">
        {/* --- Global Cinematic 3D Background --- */}
        <Suspense fallback={<div className="fixed inset-0 bg-[#000510]" />}>
          <CanvasErrorBoundary>
            <GlobalCanvas />
          </CanvasErrorBoundary>
        </Suspense>

        {/* Cinematic Text Overlay — visible during scenes */}
        {scrollVal < SCENE_BOUNDARY && (
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            {SCENES.map((scene, i) => {
              const isActive = activeScene === i;
              let alignClass = "";
              let xOffset = 0;
              let yOffset = 0;
              if (i === 0 || i === 6) {
                alignClass = "justify-center text-center";
                yOffset = 40;
              } else if (i % 2 !== 0) {
                alignClass = "justify-end text-right";
                xOffset = 100;
              } else {
                alignClass = "justify-start text-left";
                xOffset = -100;
              }
              return (
                <div
                  key={scene.id}
                  className={`absolute inset-0 flex items-center pointer-events-none ${alignClass}`}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : xOffset,
                      y: isActive ? 0 : yOffset,
                      filter: isActive ? "blur(0px)" : "blur(10px)",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 md:px-24 w-full max-w-3xl flex flex-col pointer-events-auto"
                    style={{
                      alignItems:
                        i === 0 || i === 6 ? "center" : i % 2 !== 0 ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${i === 0 || i === 6 ? "flex-row" : i % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="h-[1px] w-12 bg-spark" />
                      <span className="text-sm font-semibold tracking-[0.3em] uppercase text-spark">
                        Scene 0{scene.id}
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                      {scene.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-white/70 mb-6 font-display">
                      {scene.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-xl">
                      {scene.desc}
                    </p>
                    <Magnetic>
                      <PortalButton className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium backdrop-blur-xl transition-all hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        {scene.action}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </PortalButton>
                    </Magnetic>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

        {/* Post-Scene-7 Core Reveal Overlay */}
        {scrollVal >= SCENE_BOUNDARY && <PostSceneOverlay postPhase={postPhase} />}

        {/* Scene Progress Dots */}
        {scrollVal < SCENE_BOUNDARY && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  window.scrollTo({ top: i * window.innerHeight, behavior: "smooth" });
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  activeScene === i
                    ? "bg-white scale-150 shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Scene ${s.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
