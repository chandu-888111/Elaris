import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useLocation, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { Toaster, toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DwafHdRl.mjs";
import { C as Canvas, u as useThree, a as useFrame, b as createPortal } from "../_libs/react-three__fiber.mjs";
import { d as dt, w as wt, C as Ct, q as qt } from "../_libs/react-three__postprocessing.mjs";
import { b as create, d as devtools, p as persist } from "../_libs/zustand.mjs";
import { c as convertToModelMessages } from "../_libs/ai.mjs";
import { s as streamTextResilient } from "./ai-gateway-BOABUhLo.mjs";
import { R as Rocket, L as LoaderCircle, C as Cpu, a as LayoutGrid, K as Key, A as Award, U as Users, T as TrendingUp, D as DollarSign, S as ShieldAlert, F as Flame, b as TriangleAlert, c as SquareCheckBig, d as Skull, P as Presentation, N as Network, B as Briefcase, e as Newspaper, f as Bookmark, g as Brain, H as Heart, h as Sparkles, M as MessageSquare, i as FolderHeart, j as CloudUpload, k as Palette, l as Download, m as Monitor, X, n as FileCode, o as Copy, p as ShoppingBag, q as Plus, G as GraduationCap, r as Check, s as Send, t as Terminal, u as Building2, v as BookOpen, w as Search, x as ChevronRight, E as ExternalLink, y as Play, z as Hash, I as FilePen, J as Trophy, O as GitCommitHorizontal, Q as FileText, Z as Zap, V as Library, W as Icons, Y as CircleCheck, _ as ArrowUpRight, $ as Code, a0 as CircleCheckBig, a1 as ChevronsUp, a2 as ChevronsDown, a3 as ChevronDown, a4 as Funnel } from "../_libs/lucide-react.mjs";
import { u as useServerFn, c as createServerFn, a as createSsrRpc } from "./ai-DTqZfz-A.mjs";
import { M as MotionConfig, A as AnimatePresence, m as motion, u as useMotionValue, a as useSpring, b as useTransform } from "../_libs/framer-motion.mjs";
import { S as Stars, V as View, L as Line, u as useFBO, T as Text, a as Sphere, M as MeshTransmissionMaterial, b as Torus, C as Cylinder, P as PerformanceMonitor, c as PerspectiveCamera } from "../_libs/react-three__drei.mjs";
import { e as Vector3, s as BackSide, v as AdditiveBlending, g as Color, S as Scene, O as OrthographicCamera, am as DataTexture, i as RGBAFormat, F as FloatType, an as Object3D, D as DoubleSide, M as MathUtils, Q as Quaternion, ad as NearestFilter } from "../_libs/three.mjs";
import { i as objectType, k as stringType, m as arrayType, A as coerce } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/postprocessing.mjs";
import "../_libs/maath.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__google.mjs";
import "../_libs/ai-sdk__anthropic.mjs";
import "../_libs/ai-sdk__cohere.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
import "../_libs/troika-three-text.mjs";
import "../_libs/troika-worker-utils.mjs";
import "../_libs/webgl-sdf-generator.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/troika-three-utils.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/tunnel-rat.mjs";
const Ctx = reactExports.createContext({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {
  }
});
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        user,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const useCursorStore = create((set) => ({
  variant: "default",
  position: { x: 0, y: 0 },
  magneticTarget: null,
  textContext: "",
  setVariant: (variant) => set({ variant }),
  setPosition: (x, y) => set({ position: { x, y } }),
  setMagneticTarget: (rect) => {
    if (!rect) {
      set({ magneticTarget: null });
      return;
    }
    set({
      magneticTarget: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height
      }
    });
  },
  setTextContext: (textContext) => set({ textContext })
}));
function CursorTrail({
  mouseX,
  mouseY
}) {
  const [particles, setParticles] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let frame;
    let lastTime = performance.now();
    let idCounter = 0;
    let lastX = -999;
    let lastY = -999;
    const tick = (time) => {
      if (time - lastTime > 50) {
        const cx = mouseX.get();
        const cy = mouseY.get();
        const dist = Math.abs(cx - lastX) + Math.abs(cy - lastY);
        if (dist > 5) {
          lastTime = time;
          lastX = cx;
          lastY = cy;
          setParticles((prev) => [...prev.slice(-3), { id: idCounter++, x: cx, y: cy }]);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mouseX, mouseY]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0.8, scale: 1 },
      animate: { opacity: 0, scale: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 },
      className: "pointer-events-none fixed left-0 top-0 z-[9997] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400",
      style: { x: p.x, y: p.y, mixBlendMode: "screen" }
    },
    p.id
  )) }) });
}
function MagneticCursor() {
  const { variant, magneticTarget } = useCursorStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  reactExports.useEffect(() => {
    let frame;
    const handleMouseMove = (e) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!magneticTarget) {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [magneticTarget, mouseX, mouseY]);
  reactExports.useEffect(() => {
    if (magneticTarget) {
      mouseX.set(magneticTarget.x);
      mouseY.set(magneticTarget.y);
    }
  }, [magneticTarget, mouseX, mouseY]);
  if (variant === "hidden") return null;
  const isMagnetic = variant === "magnetic" && magneticTarget;
  const isPortal = variant === "portal";
  const isActive = variant === "active";
  let targetWidth = 40;
  let targetHeight = 40;
  let targetBorder = "rgba(0,229,255,0.4)";
  let targetRadius = "50%";
  let targetScale = 1;
  let targetBlur = "blur(0px)";
  if (isMagnetic && magneticTarget) {
    targetWidth = magneticTarget.width * 1.1;
    targetHeight = magneticTarget.height * 1.1;
    targetBorder = "rgba(0,229,255,0.8)";
    targetRadius = "12px";
  } else if (variant === "text") {
    targetWidth = 60;
    targetHeight = 60;
    targetScale = 1.5;
  } else if (isActive) {
    targetScale = 0.8;
    targetBorder = "rgba(255,255,255,1)";
  } else if (isPortal) {
    targetWidth = 100;
    targetHeight = 100;
    targetBorder = "rgba(138,43,226,0.8)";
    targetBlur = "blur(4px)";
    targetScale = 1.2;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CursorTrail, { mouseX, mouseY }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(0,229,255,1)]",
        style: { x: mouseX, y: mouseY, mixBlendMode: "difference" },
        animate: {
          scale: variant === "text" ? 0.5 : isMagnetic || isPortal ? 0 : isActive ? 1.5 : 1,
          opacity: isMagnetic || isPortal ? 0 : 1
        },
        transition: { duration: 0.15 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "pointer-events-none fixed left-0 top-0 z-[9998] border mix-blend-difference flex items-center justify-center",
        style: {
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        },
        animate: {
          width: targetWidth,
          height: targetHeight,
          borderColor: targetBorder,
          borderRadius: targetRadius,
          scale: targetScale,
          filter: targetBlur,
          boxShadow: isPortal ? "0 0 40px rgba(138,43,226,0.5)" : "none"
        },
        transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 }
      }
    )
  ] });
}
const useAudioStore = create((set, get) => ({
  isMuted: true,
  audioContext: null,
  ambientNode: null,
  droneOscillator: null,
  initAudio: () => {
    if (get().audioContext || get().isMuted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = 0.3;
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 45;
      osc.connect(droneGain);
      droneGain.connect(masterGain);
      osc.start();
      set({ audioContext: ctx, ambientNode: masterGain, droneOscillator: osc });
    } catch (e) {
      console.warn("Audio context failed to initialize", e);
    }
  },
  toggleMute: () => {
    const { isMuted, initAudio, ambientNode, audioContext } = get();
    const nextMuted = !isMuted;
    if (!nextMuted && !ambientNode) initAudio();
    if (ambientNode && audioContext) {
      ambientNode.gain.setTargetAtTime(nextMuted ? 0 : 0.3, audioContext.currentTime, 0.5);
    }
    set({ isMuted: nextMuted });
  },
  playHoverTick: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.05);
  },
  playClickPulse: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.2);
  },
  playGalaxyTransition: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const noise = audioContext.createBufferSource();
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3e3, audioContext.currentTime + 1);
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    noise.start();
  },
  playAchievementUnlock: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, audioContext.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + i * 0.1 + 1);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(audioContext.currentTime + i * 0.1);
      osc.stop(audioContext.currentTime + i * 0.1 + 1);
    });
  },
  playPortalOpen: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const bass = audioContext.createOscillator();
    const high = audioContext.createOscillator();
    const gain = audioContext.createGain();
    bass.type = "sine";
    bass.frequency.setValueAtTime(100, audioContext.currentTime);
    bass.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 2);
    high.type = "triangle";
    high.frequency.setValueAtTime(2e3, audioContext.currentTime);
    high.frequency.exponentialRampToValueAtTime(8e3, audioContext.currentTime + 2);
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + 3);
    bass.connect(gain);
    high.connect(gain);
    gain.connect(audioContext.destination);
    bass.start();
    high.start();
    bass.stop(audioContext.currentTime + 3);
    high.stop(audioContext.currentTime + 3);
  },
  setScrollProgression: (progress) => {
    const { droneOscillator, audioContext, isMuted } = get();
    if (isMuted || !droneOscillator || !audioContext) return;
    const newFreq = 45 + progress * 150;
    droneOscillator.frequency.setTargetAtTime(newFreq, audioContext.currentTime, 0.5);
  }
}));
function PageTransition({ location }) {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsVisible(true);
    const t = setTimeout(() => setIsVisible(false), 200);
    return () => clearTimeout(t);
  }, [location]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, backdropFilter: "blur(0px)" },
      animate: { opacity: 1, backdropFilter: "blur(12px)" },
      exit: { opacity: 0, backdropFilter: "blur(0px)" },
      transition: { duration: 0.15, ease: "easeOut" },
      className: "pointer-events-none fixed inset-0 z-[100] bg-black/60"
    }
  ) });
}
const useSceneStore = create()(
  devtools((set, get) => ({
    graphicsMode: "high",
    graphicsModeLocked: false,
    cameraMode: "chase",
    cameraPosition: [0, 0, 0],
    reduceMotion: false,
    prefersReducedTransparency: false,
    keyboardNavigation: false,
    screenReaderMode: false,
    cursorPos: { x: 0, y: 0 },
    scrollProgress: 0,
    activeChapterId: null,
    visitedChapters: [],
    unlockedEasterEggs: [],
    shipVelocity: 0,
    shipBankAngle: 0,
    shipMode: "idle",
    eventQueue: [],
    audioMuted: true,
    timeOfUniverse: 0,
    hudVisible: false,
    // New setters for global UI flags
    setPreloaderDismissed: (value) => set({ preloaderDismissed: value }),
    setHudVisible: (visible) => set({ hudVisible: visible }),
    // TODO: Temporary migration helper – replace with specific setters later
    setState: (partial) => set((state) => ({ ...state, ...partial })),
    // Shortcut for currentScene
    setScene: (scene) => set({ currentScene: scene }),
    preloaderDismissed: false,
    // New defaults
    sunRef: null,
    glowColor: "#00e5ff",
    currentScene: "default",
    particlesIntensity: 1,
    coreScale: 1,
    setCoreScale: (value) => set({ coreScale: value }),
    setGraphicsMode: (mode) => {
      const state = get();
      if (!state.graphicsModeLocked) set({ graphicsMode: mode });
    },
    lockGraphicsMode: (locked) => set({ graphicsModeLocked: locked }),
    setCameraMode: (mode) => set({ cameraMode: mode }),
    setSunRef: (ref) => set({ sunRef: ref }),
    setGlowColor: (color) => set({ glowColor: color }),
    setCurrentScene: (scene) => set({ currentScene: scene }),
    setParticlesIntensity: (intensity) => set({ particlesIntensity: intensity }),
    setReduceMotion: (value) => set({ reduceMotion: value }),
    setPrefersReducedTransparency: (value) => set({ prefersReducedTransparency: value }),
    setKeyboardNavigation: (value) => set({ keyboardNavigation: value }),
    setScreenReaderMode: (value) => set({ screenReaderMode: value }),
    setCursorPos: (x, y) => set({ cursorPos: { x, y } }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setActiveChapterId: (id) => set({ activeChapterId: id }),
    addVisitedChapter: (id) => {
      const list = get().visitedChapters;
      if (!list.includes(id)) set({ visitedChapters: [...list, id] });
    },
    addUnlockedEasterEgg: (id) => {
      const list = get().unlockedEasterEggs;
      if (!list.includes(id)) set({ unlockedEasterEggs: [...list, id] });
    },
    setShipVelocity: (v) => set({ shipVelocity: v }),
    setShipBankAngle: (a) => set({ shipBankAngle: a }),
    setShipMode: (mode) => set({ shipMode: mode }),
    enqueueEvent: (event) => set((state) => ({ eventQueue: [...state.eventQueue, event] })),
    dequeueEvent: (event) => set((state) => ({ eventQueue: state.eventQueue.filter((e) => e !== event) })),
    setAudioMuted: (m) => set({ audioMuted: m }),
    setTimeOfUniverse: (t) => set({ timeOfUniverse: t })
  }))
);
const useLandingMemoryStore = create()(
  persist(
    (set) => ({
      visitedChapters: [],
      scrollProgress: 0,
      motionIntensity: "high",
      // Default to premium experience
      markChapterVisited: (chapter) => set((state) => ({
        visitedChapters: state.visitedChapters.includes(chapter) ? state.visitedChapters : [...state.visitedChapters, chapter]
      })),
      setScrollProgress: (scrollProgress) => set({ scrollProgress }),
      setMotionIntensity: (motionIntensity) => set({ motionIntensity })
    }),
    {
      name: "projectspark-landing-memory"
    }
  )
);
const RimGlowShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform vec3 uColor;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float intensity = pow(0.75 - max(dot(normal, viewDir), 0.0), 2.5);
      gl_FragColor = vec4(uColor, 1.0) * intensity * 2.0;
    }
  `
};
function FloatingAICore() {
  const store = useSceneStore();
  const { setSunRef } = store;
  const { scrollProgress } = useLandingMemoryStore();
  const coreRef = reactExports.useRef(null);
  const glowRef = reactExports.useRef(null);
  const glowMaterialRef = reactExports.useRef(null);
  const dysonRef = reactExports.useRef(null);
  const ringsRef = reactExports.useRef(null);
  const { pointer } = useThree();
  const currentPos = reactExports.useRef(new Vector3(0, 0, 0));
  const [isDysonSphere] = reactExports.useState(() => Math.random() > 0.85);
  reactExports.useEffect(() => {
    if (glowRef.current) {
      setSunRef(glowRef.current);
    }
    return () => setSunRef(null);
  }, [setSunRef]);
  useFrame((state) => {
    if (!coreRef.current || !glowRef.current) return;
    const time = state.clock.elapsedTime;
    let stageScale = 1;
    let stageRoughness = 0.1;
    let stageIor = 1.5;
    let stageTransmission = 0.9;
    let colorHex = "#00e5ff";
    let ringsScale = 0;
    if (scrollProgress < 0.16) {
      stageScale = 0.8;
      stageRoughness = 0.4;
      stageTransmission = 0.5;
      colorHex = "#111111";
      ringsScale = 0;
    } else if (scrollProgress < 0.33) {
      stageScale = 1;
      stageRoughness = 0.2;
      stageTransmission = 0.8;
      colorHex = "#0077ff";
      ringsScale = 0.5;
    } else if (scrollProgress < 0.5) {
      stageScale = 1.2;
      stageRoughness = 0.1;
      stageTransmission = 0.9;
      colorHex = "#00e5ff";
      ringsScale = 0.8;
    } else if (scrollProgress < 0.66) {
      stageScale = 1.4;
      stageRoughness = 0.05;
      stageTransmission = 0.95;
      stageIor = 1.8;
      colorHex = "#8a2be2";
      ringsScale = 1.2;
    } else if (scrollProgress < 0.83) {
      stageScale = 0.5;
      stageRoughness = 0;
      stageTransmission = 1;
      stageIor = 2.5;
      colorHex = "#ffffff";
      ringsScale = 2;
    } else {
      stageScale = 2;
      stageRoughness = 0;
      stageTransmission = 1;
      stageIor = 1.2;
      colorHex = "#ff00ff";
      ringsScale = 3;
    }
    const basePos = new Vector3(1.1, 0, 0);
    basePos.x += pointer.x * 0.4;
    basePos.y += pointer.y * 0.4;
    currentPos.current.lerp(basePos, 0.05);
    coreRef.current.position.copy(currentPos.current);
    glowRef.current.position.copy(currentPos.current);
    if (ringsRef.current) ringsRef.current.position.copy(currentPos.current);
    if (dysonRef.current) dysonRef.current.position.copy(currentPos.current);
    const breathe = 1 + Math.sin(time * (1 + scrollProgress * 5)) * (0.05 + scrollProgress * 0.1);
    const finalScale = stageScale * breathe;
    const scaleLerp = MathUtils.lerp(coreRef.current.scale.x, finalScale, 0.05);
    coreRef.current.scale.setScalar(scaleLerp);
    const glowScale = scaleLerp * (1.1 + Math.sin(time * 3) * 0.02);
    glowRef.current.scale.setScalar(glowScale);
    if (ringsRef.current) {
      const currentRingScale = MathUtils.lerp(ringsRef.current.scale.x, ringsScale, 0.05);
      ringsRef.current.scale.setScalar(currentRingScale);
      ringsRef.current.rotation.x = time * 0.5;
      ringsRef.current.rotation.y = time * 0.3;
    }
    if (dysonRef.current) {
      dysonRef.current.rotation.z = time * 0.1;
      dysonRef.current.rotation.x = time * 0.05;
      const dysonTargetScale = stageScale > 1 ? stageScale * 1.5 : 0;
      dysonRef.current.scale.setScalar(
        MathUtils.lerp(dysonRef.current.scale.x, dysonTargetScale, 0.02)
      );
    }
    const mat = coreRef.current.material;
    if (mat && mat.roughness !== void 0 && mat.transmission !== void 0 && mat.ior !== void 0 && mat.color) {
      mat.roughness = MathUtils.lerp(mat.roughness, stageRoughness, 0.05);
      mat.transmission = MathUtils.lerp(mat.transmission, stageTransmission, 0.05);
      mat.ior = MathUtils.lerp(mat.ior, stageIor, 0.05);
      mat.color.lerp(new Color(colorHex), 0.05);
    }
    coreRef.current.rotation.y = time * 0.2 * (1 + scrollProgress * 2);
    coreRef.current.rotation.x = time * 0.1 * (1 + scrollProgress * 2);
    if (glowMaterialRef.current) {
      glowMaterialRef.current.uniforms.uColor.value.lerp(new Color(colorHex), 0.05);
    }
  });
  const uniforms = reactExports.useMemo(
    () => ({
      uColor: { value: new Color("#00e5ff") }
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: coreRef, args: [1, 64, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeshTransmissionMaterial,
      {
        samples: 16,
        resolution: 512,
        transmission: 0.9,
        roughness: 0.2,
        thickness: 1.5,
        ior: 1.5,
        chromaticAberration: 0.05,
        anisotropy: 0.1,
        color: "#00e5ff"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: glowRef, args: [1.05, 64, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "shaderMaterial",
      {
        ref: glowMaterialRef,
        vertexShader: RimGlowShader.vertexShader,
        fragmentShader: RimGlowShader.fragmentShader,
        uniforms,
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: ringsRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { args: [1.5, 0.02, 16, 100], rotation: [Math.PI / 2, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#ffffff",
          transparent: true,
          opacity: 0.4,
          blending: AdditiveBlending
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { args: [1.8, 0.01, 16, 100], rotation: [0, Math.PI / 2, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#00e5ff",
          transparent: true,
          opacity: 0.3,
          blending: AdditiveBlending
        }
      ) })
    ] }),
    isDysonSphere && /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: dysonRef, children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { rotation: [Math.PI * 2 * (i / 8), Math.PI / 4, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Cylinder,
        {
          args: [0.1, 0.1, 2, 4],
          position: [0, 2.5, 0],
          rotation: [Math.PI / 2, 0, 0],
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#222", metalness: 0.9, roughness: 0.1 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cylinder, { args: [0.01, 0.05, 2.5, 8], position: [0, 1.25, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#00e5ff",
          transparent: true,
          opacity: 0.5,
          blending: AdditiveBlending
        }
      ) })
    ] }, i)) })
  ] });
}
function SpaceTravelCamera() {
  const { camera } = useThree();
  const { cameraMode, graphicsMode, scrollProgress } = useSceneStore((s) => ({
    cameraMode: s.cameraMode,
    graphicsMode: s.graphicsMode,
    scrollProgress: s.scrollProgress
  }));
  const currentPos = reactExports.useRef(new Vector3());
  const currentLook = reactExports.useRef(new Vector3());
  const currentFov = reactExports.useRef(45);
  const flybyStage = reactExports.useRef("approach");
  const flybyTimer = reactExports.useRef(0);
  useFrame((state, delta) => {
    const smoothing = graphicsMode === "ultra" ? 0.2 : graphicsMode === "high" ? 0.1 : 0.05;
    const targetPos = new Vector3();
    const targetLook = new Vector3(0, 0, 0);
    const targetFov = 45;
    let lerpSpeed = 0.1;
    if (cameraMode === "orbit") {
      const radius = 8;
      const speed = 0.2;
      const elapsed = state.clock.getElapsedTime();
      const theta = elapsed * speed;
      const phi = Math.PI / 6;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const z2 = radius * Math.sin(theta) * Math.sin(phi);
      targetPos.set(x, y, z2);
      const lookQuat = new Quaternion();
      lookQuat.setFromUnitVectors(new Vector3(0, 0, -1), targetPos.clone().normalize());
      camera.quaternion.slerp(lookQuat, smoothing);
    } else if (cameraMode === "flyby") {
      const approachDuration = 1.5;
      const passDuration = 1;
      const pullbackDuration = 1.5;
      flybyTimer.current += delta;
      const stage = flybyStage.current;
      if (stage === "approach") {
        const t = Math.min(flybyTimer.current / approachDuration, 1);
        targetPos.set(0, 0, 8 - t * 12);
        if (t >= 1) {
          flybyStage.current = "pass";
          flybyTimer.current = 0;
        }
      } else if (stage === "pass") {
        const t = Math.min(flybyTimer.current / passDuration, 1);
        targetPos.set(0, 0, -4 + t * 8);
        if (t >= 1) {
          flybyStage.current = "pullback";
          flybyTimer.current = 0;
        }
      } else if (stage === "pullback") {
        const t = Math.min(flybyTimer.current / pullbackDuration, 1);
        targetPos.set(0, 0, 4 + t * 4);
        if (t >= 1) {
          flybyStage.current = "approach";
          flybyTimer.current = 0;
        }
      }
      lerpSpeed = 0.15;
    } else {
      const chapter = Math.floor(scrollProgress * 7);
      const baseZ = 8 - chapter * 2;
      targetPos.set(0, 0, baseZ);
      targetLook.set(0, 0, 0);
      const { pointer } = state;
      targetPos.x += pointer.x * 0.5;
      targetPos.y += pointer.y * 0.5;
      lerpSpeed = 0.02;
    }
    currentPos.current.lerp(targetPos, lerpSpeed);
    currentLook.current.lerp(targetLook, lerpSpeed);
    currentFov.current = MathUtils.lerp(currentFov.current, targetFov, lerpSpeed * 2);
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
    if (camera.fov !== void 0) {
      camera.fov = currentFov.current;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}
const NebulaShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    color1: { value: new Color("#8a2be2") },
    // Violet
    color2: { value: new Color("#00e5ff") },
    // Cyan
    opacity: { value: 0.15 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float opacity;
    varying vec2 vUv;
    varying vec3 vPosition;

    // 3D Simplex Noise by Inigo Quilez
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Create multi-octave noise for volumetric cloud look
      vec3 p = vPosition * 0.05;
      float noise = snoise(p + time * 0.05) * 0.5 + 0.5;
      noise += snoise(p * 2.0 - time * 0.08) * 0.25;
      
      // Mix colors based on noise
      vec3 finalColor = mix(color1, color2, noise);
      
      // Soften edges (sphere mask)
      float dist = length(vPosition) / 50.0; // Assume radius 50
      float mask = smoothstep(1.0, 0.5, dist);
      
      gl_FragColor = vec4(finalColor, noise * mask * opacity);
    }
  `
};
function NebulaField({ position = [0, 0, -30] }) {
  const materialRef = reactExports.useRef(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [50, 64, 64] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "shaderMaterial",
      {
        ref: materialRef,
        vertexShader: NebulaShaderMaterial.vertexShader,
        fragmentShader: NebulaShaderMaterial.fragmentShader,
        uniforms: NebulaShaderMaterial.uniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: BackSide
      }
    )
  ] });
}
function LivingConstellations() {
  const groupRef = reactExports.useRef(null);
  const stars = reactExports.useMemo(() => {
    const arr = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        position: new Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 10
        ),
        unlocked: Math.random() > 0.5,
        // Randomly unlock for demo
        connections: []
      });
    }
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (arr[i].position.distanceTo(arr[j].position) < 15) {
          arr[i].connections.push(j);
        }
      }
    }
    return arr;
  }, []);
  const lines = reactExports.useMemo(() => {
    const lineArr = [];
    stars.forEach((star) => {
      star.connections.forEach((targetIndex) => {
        const target = stars[targetIndex];
        lineArr.push({
          start: star.position,
          end: target.position,
          active: star.unlocked && target.unlocked
        });
      });
    });
    return lineArr;
  }, [stars]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    stars.map((star) => /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: star.position, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [star.unlocked ? 0.3 : 0.1, 16, 16] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: star.unlocked ? "#00e5ff" : "#444444" }),
      star.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { distance: 10, intensity: 0.5, color: "#00e5ff" })
    ] }, star.id)),
    lines.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        points: [line.start, line.end],
        color: line.active ? "#00e5ff" : "#222222",
        lineWidth: line.active ? 2 : 0.5,
        transparent: true,
        opacity: line.active ? 0.6 : 0.1
      },
      idx
    ))
  ] });
}
const FboSimulationMaterial = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D positions;
    uniform float uTime;
    uniform float uSpeed;
    uniform int uType;
    varying vec2 vUv;

    // Pseudo-random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec4 pos = texture2D(positions, vUv);
      
      // Basic movement simulation
      vec3 vel = vec3(0.0);
      
      if (uType == 0) { // dust
        vel = vec3(
          sin(uTime * 0.1 + pos.y) * 0.5,
          cos(uTime * 0.2 + pos.x) * 0.5,
          sin(uTime * 0.15 + pos.z) * 0.5
        );
      } else if (uType == 1) { // energy
        // Pull towards center
        vel = -normalize(pos.xyz) * 2.0;
      } else if (uType == 2) { // meteor
        vel = vec3(15.0, 0.0, 0.0);
      } else if (uType == 3) { // plasma
        vel = vec3(
          sin(uTime + pos.z) * 5.0,
          cos(uTime + pos.x) * 5.0,
          sin(uTime + pos.y) * 5.0
        );
      }

      pos.xyz += vel * uSpeed * 0.016; // Approx delta time

      // Wrap boundaries
      if (pos.x > 50.0) pos.x -= 100.0;
      if (pos.x < -50.0) pos.x += 100.0;
      if (pos.y > 50.0) pos.y -= 100.0;
      if (pos.y < -50.0) pos.y += 100.0;
      if (pos.z > 50.0) pos.z -= 100.0;
      if (pos.z < -50.0) pos.z += 100.0;

      gl_FragColor = pos;
    }
  `
};
const RenderShader = {
  uniforms: {
    uColor: { value: new Color() }
  },
  vertexShader: `
    uniform sampler2D positions;
    attribute vec2 instanceUv;
    varying vec2 vUv;
    void main() {
      vUv = instanceUv;
      vec4 pos = texture2D(positions, instanceUv);
      vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(uColor, 0.8);
    }
  `
};
function AdvancedParticleSystem({
  type,
  count,
  color
}) {
  const size = Math.ceil(Math.sqrt(count));
  const actualCount = size * size;
  const target1 = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    type: FloatType
  });
  const target2 = useFBO(size, size, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
    type: FloatType
  });
  const simMaterialRef = reactExports.useRef(null);
  const renderMaterialRef = reactExports.useRef(null);
  const instancedMeshRef = reactExports.useRef(null);
  const [scene, camera] = reactExports.useMemo(() => {
    const s = new Scene();
    const c = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
    return [s, c];
  }, []);
  const [initTexture, instanceUvs] = reactExports.useMemo(() => {
    const data = new Float32Array(size * size * 4);
    const uvs = new Float32Array(actualCount * 2);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i * size + j;
        const idx4 = index * 4;
        data[idx4] = (Math.random() - 0.5) * 100;
        data[idx4 + 1] = (Math.random() - 0.5) * 100;
        data[idx4 + 2] = (Math.random() - 0.5) * 100;
        data[idx4 + 3] = 1;
        uvs[index * 2] = i / size;
        uvs[index * 2 + 1] = j / size;
      }
    }
    const texture = new DataTexture(data, size, size, RGBAFormat, FloatType);
    texture.needsUpdate = true;
    return [texture, uvs];
  }, [size, actualCount]);
  const flip = reactExports.useRef(false);
  let typeId = 0;
  if (type === "energy") typeId = 1;
  if (type === "meteor") typeId = 2;
  if (type === "plasma") typeId = 3;
  const uniforms = reactExports.useMemo(
    () => ({
      positions: { value: initTexture },
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uType: { value: typeId }
    }),
    [initTexture, typeId]
  );
  useFrame((state) => {
    if (!simMaterialRef.current || !renderMaterialRef.current) return;
    const { gl, clock } = state;
    simMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    gl.setRenderTarget(flip.current ? target1 : target2);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    flip.current = !flip.current;
    const currentTarget = flip.current ? target1 : target2;
    simMaterialRef.current.uniforms.positions.value = currentTarget.texture;
    renderMaterialRef.current.uniforms.positions.value = currentTarget.texture;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    createPortal(
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [2, 2] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "shaderMaterial",
          {
            ref: simMaterialRef,
            vertexShader: FboSimulationMaterial.vertexShader,
            fragmentShader: FboSimulationMaterial.fragmentShader,
            uniforms
          }
        )
      ] }),
      scene
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("instancedMesh", { ref: instancedMeshRef, args: [void 0, void 0, actualCount], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [0.2, 0.2], children: /* @__PURE__ */ jsxRuntimeExports.jsx("instancedBufferAttribute", { attach: "attributes-instanceUv", args: [instanceUvs, 2] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "shaderMaterial",
        {
          ref: renderMaterialRef,
          vertexShader: RenderShader.vertexShader,
          fragmentShader: RenderShader.fragmentShader,
          uniforms: {
            positions: { value: null },
            uColor: { value: new Color(color) }
          },
          transparent: true,
          blending: AdditiveBlending,
          depthWrite: false
        }
      )
    ] })
  ] });
}
const EQUATIONS = [
  "∇ × E = -∂B/∂t",
  "∇ · D = ρ",
  "iℏ ∂Ψ/∂t = ĤΨ",
  "E = mc²",
  "S = k log W",
  "R_μν - 1/2 g_μν R = (8πG/c^4) T_μν",
  "F = dp/dt",
  "Δx Δp ≥ ℏ/2",
  "e^(iπ) + 1 = 0",
  "f(x) = ∫ F(k)e^(2πikx) dk"
];
function QuantumField() {
  const groupRef = reactExports.useRef(null);
  const { scrollProgress } = useLandingMemoryStore();
  const particles = reactExports.useMemo(() => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push({
        position: new Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        speed: Math.random() * 0.2 + 0.1,
        equation: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
        scale: Math.random() * 0.5 + 0.2
      });
    }
    return items;
  }, []);
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const targetOpacity = scrollProgress > 0.8 ? 1 : scrollProgress > 0.5 ? 0.2 : 0;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      child.position.y += p.speed * 0.05;
      child.position.x += Math.sin(time * p.speed + i) * 0.02;
      child.position.z += Math.cos(time * p.speed + i) * 0.02;
      if (child.position.y > 10) child.position.y = -10;
      child.quaternion.copy(state.camera.quaternion);
      const mesh = child;
      if (mesh.material) {
        const mat = mesh.material;
        mat.opacity = MathUtils.lerp(mat.opacity, targetOpacity * 0.5, 0.05);
      }
    });
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: particles.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Text,
    {
      position: p.position,
      fontSize: p.scale,
      color: "#00e5ff",
      anchorX: "center",
      anchorY: "middle",
      "material-transparent": true,
      "material-opacity": 0,
      "material-blending": AdditiveBlending,
      children: p.equation
    },
    i
  )) });
}
const useEventScheduler = create((set) => ({
  currentEvent: "none",
  eventIntensity: 0,
  triggerEvent: (event, durationMs = 5e3) => {
    set({ currentEvent: event, eventIntensity: 1 });
    if (durationMs > 0) {
      setTimeout(() => {
        set({ currentEvent: "none", eventIntensity: 0 });
      }, durationMs);
    }
  },
  clearEvent: () => set({ currentEvent: "none", eventIntensity: 0 })
}));
function startEventScheduler() {
  const events = [
    "meteor_shower",
    "comet_flyby",
    "solar_flare",
    "nebula_storm",
    "space_time_fracture",
    "supernova",
    "neural_storm",
    "quantum_rain"
  ];
  setInterval(() => {
    const isEvent = Math.random() > 0.7;
    if (isEvent) {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      useEventScheduler.getState().triggerEvent(randomEvent, 8e3);
    }
  }, 15e3);
}
const LensDistortionShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      
      // Distortion logic simulating gravity
      vec2 distortedUv = vUv + normal.xy * rim * 0.5;
      gl_FragColor = vec4(0.0, 0.0, 0.0, rim);
    }
  `
};
function BlackHole({
  position = [0, 0, 0],
  scale = 1
}) {
  const diskRef = reactExports.useRef(null);
  const sphereRef = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (diskRef.current) {
      diskRef.current.rotation.z = t * 2;
      diskRef.current.rotation.x = 1.2 + Math.sin(t * 0.5) * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(t * 5) * 0.02);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: new Vector3(...position), scale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: sphereRef, args: [1, 64, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#000000" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [1.5, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "shaderMaterial",
      {
        vertexShader: LensDistortionShader.vertexShader,
        fragmentShader: LensDistortionShader.fragmentShader,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { ref: diskRef, args: [2.5, 0.5, 16, 100], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshBasicMaterial",
      {
        color: "#ff5500",
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { args: [2, 0.1, 16, 100], rotation: [1.2, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshBasicMaterial",
      {
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
        blending: AdditiveBlending
      }
    ) })
  ] });
}
const WormholeShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Create a swirling vortex effect
      vec2 uv = vUv;
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float radius = length(uv - vec2(0.5));
      
      float spiral = sin(angle * 10.0 - uTime * 5.0 + radius * 20.0);
      float alpha = smoothstep(0.5, 0.0, radius) * (spiral * 0.5 + 0.5);
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `
};
function WormholePortal({
  position = [0, 0, 0],
  color = "#8a2be2"
}) {
  const tunnelRef = reactExports.useRef(null);
  const uniforms = reactExports.useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color(color) }
    }),
    [color]
  );
  useFrame((state) => {
    if (tunnelRef.current) {
      const mat = tunnelRef.current.material;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: new Vector3(...position), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cylinder, { ref: tunnelRef, args: [2, 0.1, 10, 64, 1, true], rotation: [Math.PI / 2, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "shaderMaterial",
    {
      vertexShader: WormholeShader.vertexShader,
      fragmentShader: WormholeShader.fragmentShader,
      uniforms,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      side: DoubleSide
    }
  ) }) });
}
function PlanetarySystem({
  type,
  position = [0, 0, 0],
  scale = 1
}) {
  const planetRef = reactExports.useRef(null);
  const atmosphereRef = reactExports.useRef(null);
  const ringRef = reactExports.useRef(null);
  const config = reactExports.useMemo(() => {
    switch (type) {
      case "ice":
        return { color: "#00ffff", emissive: "#0055ff", hasRings: false, speed: 0.2 };
      case "lava":
        return { color: "#ff2200", emissive: "#550000", hasRings: false, speed: 0.5 };
      case "gas":
        return { color: "#ffaa00", emissive: "#221100", hasRings: true, speed: 0.1 };
      case "cyber":
        return { color: "#00ff00", emissive: "#004400", hasRings: true, speed: 1 };
      case "knowledge":
        return { color: "#8a2be2", emissive: "#330066", hasRings: false, speed: 0.3 };
      case "builder":
        return { color: "#ff00ff", emissive: "#660066", hasRings: true, speed: 0.4 };
      case "career":
        return { color: "#ffd700", emissive: "#664400", hasRings: false, speed: 0.2 };
      case "team":
        return { color: "#ff4444", emissive: "#660000", hasRings: true, speed: 0.6 };
      case "ai":
        return { color: "#ffffff", emissive: "#444444", hasRings: true, speed: 0.8 };
      default:
        return { color: "#ffffff", emissive: "#000000", hasRings: false, speed: 0.2 };
    }
  }, [type]);
  useFrame((state) => {
    const t = state.clock.elapsedTime * config.speed;
    if (planetRef.current) planetRef.current.rotation.y = t;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y = t * 1.2;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.5;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: new Vector3(...position), scale, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: planetRef, args: [1, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color: config.color,
        emissive: config.emissive,
        emissiveIntensity: 0.5,
        roughness: 0.8,
        metalness: 0.2
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: atmosphereRef, args: [1.05, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshBasicMaterial",
      {
        color: config.color,
        transparent: true,
        opacity: 0.15,
        blending: AdditiveBlending,
        side: BackSide
      }
    ) }),
    config.hasRings && /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { rotation: [Math.PI / 3, 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { ref: ringRef, args: [1.8, 0.2, 2, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: config.color,
          transparent: true,
          opacity: 0.3,
          blending: AdditiveBlending
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Torus, { args: [2.2, 0.05, 2, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#ffffff",
          transparent: true,
          opacity: 0.5,
          blending: AdditiveBlending
        }
      ) })
    ] })
  ] });
}
function SpaceEvents() {
  const { currentEvent } = useEventScheduler();
  const groupRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    currentEvent === "space_time_fracture" && /* @__PURE__ */ jsxRuntimeExports.jsx(WormholePortal, { position: [5, 2, -10], color: "#ff00ff" }),
    currentEvent === "supernova" && /* @__PURE__ */ jsxRuntimeExports.jsx(BlackHole, { position: [-8, 4, -15], scale: 2 }),
    currentEvent === "meteor_shower" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdvancedParticleSystem, { type: "meteor", count: 200, color: "#ffaa00" }),
    currentEvent === "quantum_rain" && /* @__PURE__ */ jsxRuntimeExports.jsx(AdvancedParticleSystem, { type: "quantum", count: 500, color: "#00ffcc" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlanetarySystem, { type: "knowledge", position: [-15, 8, -25], scale: 2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlanetarySystem, { type: "builder", position: [18, -5, -30], scale: 3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlanetarySystem, { type: "ai", position: [0, -15, -40], scale: 5 })
  ] });
}
function SharedCanvas({ children, camera }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: "w-full h-full", children: [
    camera && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PerspectiveCamera,
      {
        makeDefault: true,
        position: camera.position || [0, 0, 8],
        fov: camera.fov || 45,
        near: camera.near || 0.1,
        far: camera.far || 1e3
      }
    ),
    !camera && /* @__PURE__ */ jsxRuntimeExports.jsx(PerspectiveCamera, { makeDefault: true, position: [0, 0, 8], fov: 45 }),
    children
  ] });
}
function AsteroidField({ count = 300 }) {
  const rockRef = reactExports.useRef(null);
  const metalRef = reactExports.useRef(null);
  const crystalRef = reactExports.useRef(null);
  const groupRef = reactExports.useRef(null);
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  const rockCount = Math.floor(count * 0.5);
  const metalCount = Math.floor(count * 0.3);
  const crystalCount = count - rockCount - metalCount;
  const generateBelt = (amount, radiusBase, radiusSpread) => {
    return Array.from({ length: amount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = radiusBase + (Math.random() - 0.5) * radiusSpread;
      const height = (Math.random() - 0.5) * (radiusSpread * 0.5);
      return {
        position: [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.6 + 0.1,
        speed: {
          rX: (Math.random() - 0.5) * 0.02,
          rY: (Math.random() - 0.5) * 0.02,
          rZ: (Math.random() - 0.5) * 0.02
        }
      };
    });
  };
  const rocks = reactExports.useMemo(() => generateBelt(rockCount, 15, 8), [rockCount]);
  const metals = reactExports.useMemo(() => generateBelt(metalCount, 22, 5), [metalCount]);
  const crystals = reactExports.useMemo(() => generateBelt(crystalCount, 28, 4), [crystalCount]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
    const updateInstances = (ref, data) => {
      const mesh = ref.current;
      if (!mesh) return;
      data.forEach((item, i) => {
        item.rotation[0] += item.speed.rX;
        item.rotation[1] += item.speed.rY;
        item.rotation[2] += item.speed.rZ;
        dummy.position.set(item.position[0], item.position[1], item.position[2]);
        dummy.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };
    updateInstances(rockRef, rocks);
    updateInstances(metalRef, metals);
    updateInstances(crystalRef, crystals);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, rotation: [0.2, 0, -0.1], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("instancedMesh", { ref: rockRef, args: [void 0, void 0, rockCount], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dodecahedronGeometry", { args: [1, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#444444", roughness: 0.9, metalness: 0.1 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("instancedMesh", { ref: metalRef, args: [void 0, void 0, metalCount], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1, 1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#8899aa", roughness: 0.2, metalness: 0.8 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("instancedMesh", { ref: crystalRef, args: [void 0, void 0, crystalCount], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [1, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhysicalMaterial",
        {
          color: "#00e5ff",
          transmission: 0.9,
          opacity: 1,
          metalness: 0,
          roughness: 0,
          ior: 1.5,
          thickness: 0.5
        }
      )
    ] })
  ] });
}
function AsteroidBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 -z-20 h-full w-full bg-black overflow-hidden pointer-events-none",
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SharedCanvas, { camera: { position: [0, 5, 20], fov: 60 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 5, 5], intensity: 1, color: "#38bdf8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -5, -5], intensity: 1, color: "#8b5cf6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 50, depth: 50, count: 3e3, factor: 4, saturation: 0, fade: true, speed: 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AsteroidField, { count: 150 })
      ] })
    }
  );
}
function PerformanceThrottler() {
  const onDecline = reactExports.useCallback(() => {
    console.warn("[PerformanceThrottler] FPS dropped. Throttling graphics.");
  }, []);
  const onIncline = reactExports.useCallback(() => {
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PerformanceMonitor,
    {
      onDecline,
      onIncline,
      flipflops: 3,
      onFallback: () => console.warn("[PerformanceThrottler] Hit fallback threshold")
    }
  );
}
function GlobalCanvas() {
  const { sunRef, glowColor, currentScene, particlesIntensity } = useSceneStore((s) => ({
    sunRef: s.sunRef,
    glowColor: s.glowColor,
    currentScene: s.currentScene,
    particlesIntensity: s.particlesIntensity
  }));
  const isLanding = currentScene === "landing" || currentScene === "default";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isLaptop = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1200;
  const particleMultiplier = isMobile ? 0.2 : isLaptop ? 0.5 : 1;
  const actualIntensity = particlesIntensity * particleMultiplier;
  reactExports.useEffect(() => {
    startEventScheduler();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 -z-10 h-full w-full bg-[#03000a] overflow-hidden",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          dpr: [1, 1.5],
          camera: { position: [0, 0, 8], fov: 45 },
          gl: { antialias: false, powerPreference: "high-performance", alpha: false },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("fog", { attach: "fog", args: [glowColor || "#03000a", 5, 40] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [8, 8, 8], intensity: 2.5, color: "#c084fc" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-8, -6, 4], intensity: 2, color: "#00e5ff" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, -2, -6], intensity: 1.5, color: "#ec4899" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SpaceTravelCamera, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Stars,
                {
                  radius: 100,
                  depth: 50,
                  count: Math.floor(2e3 * actualIntensity),
                  factor: 3,
                  saturation: 0.8,
                  fade: true,
                  speed: 0.5
                }
              ),
              isLanding && /* @__PURE__ */ jsxRuntimeExports.jsx(NebulaField, { position: [0, 0, -40] }),
              isLanding && /* @__PURE__ */ jsxRuntimeExports.jsx(LivingConstellations, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AdvancedParticleSystem,
                {
                  type: "dust",
                  count: Math.floor(300 * actualIntensity),
                  color: "#ffffff"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AdvancedParticleSystem,
                {
                  type: "energy",
                  count: Math.floor(150 * actualIntensity),
                  color: "#00e5ff"
                }
              ),
              isLanding && /* @__PURE__ */ jsxRuntimeExports.jsx(
                AdvancedParticleSystem,
                {
                  type: "meteor",
                  count: Math.floor(50 * actualIntensity),
                  color: "#ffaa00"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AdvancedParticleSystem,
                {
                  type: "plasma",
                  count: Math.floor(100 * actualIntensity),
                  color: "#8a2be2"
                }
              ),
              isLanding && /* @__PURE__ */ jsxRuntimeExports.jsx(QuantumField, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AsteroidField, { count: Math.floor(100 * actualIntensity) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingAICore, {}),
              isLanding && /* @__PURE__ */ jsxRuntimeExports.jsx(SpaceEvents, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceThrottler, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(dt, { multisampling: 0, children: [
                sunRef ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Ct,
                  {
                    sun: sunRef,
                    samples: 60,
                    density: 0.96,
                    decay: 0.9,
                    weight: 0.4,
                    exposure: 0.6,
                    clampMax: 1,
                    blur: true
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(wt, { luminanceThreshold: 0.2, luminanceSmoothing: 0.9, intensity: 1.5, mipmapBlur: true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(qt, { eskil: false, offset: 0.1, darkness: 1.1 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(View.Port, {})
            ] })
          ]
        }
      )
    }
  );
}
const LandingCanvas = () => {
  const graphicsMode = useSceneStore((state) => state.graphicsMode);
  const enableBloom = graphicsMode !== "low";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      gl: { antialias: true, preserveDrawingBuffer: true },
      style: { position: "fixed", inset: 0, zIndex: -1 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(dt, { children: enableBloom ? /* @__PURE__ */ jsxRuntimeExports.jsx(wt, { luminanceThreshold: 0, luminanceSmoothing: 0.9, intensity: 0.2 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {}) })
      ]
    }
  );
};
const appCss = "/assets/styles-DyTkw-tK.css";
let audioCtx = null;
function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}
function isSoundsEnabled() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("spark-sound-effects-enabled");
  return stored !== "false";
}
function playHover() {
  if (!isSoundsEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === "suspended") return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.015, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}
function playClick() {
  if (!isSoundsEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === "suspended") return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}
function playSuccess() {
  if (!isSoundsEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === "suspended") return;
  const playNote = (freq, delay, duration, volume = 0.04) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.03);
    gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };
  playNote(523.25, 0, 0.25);
  playNote(659.25, 0.08, 0.25);
  playNote(783.99, 0.16, 0.35);
  playNote(1046.5, 0.24, 0.45);
}
function playSweep() {
  if (!isSoundsEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === "suspended") return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.45);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.45);
  gain.gain.setValueAtTime(0.025, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.45);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.45);
}
function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume();
  }
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass max-w-md rounded-3xl p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Lost in the matrix" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "That page doesn't exist — let's get you back on track." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-spark px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass max-w-md rounded-3xl p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-xl bg-gradient-spark px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$z = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "ProjectSpark — AI Innovation & Learning OS" },
      {
        name: "description",
        content: "ProjectSpark — generate project ideas, learn with an AI mentor, build with AI, and ship faster. The futuristic AI OS for students, devs, and founders."
      },
      { property: "og:title", content: "ProjectSpark — AI Innovation & Learning OS" },
      {
        property: "og:description",
        content: "Generate ideas. Learn anything. Build with AI. All in one futuristic workspace."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$z.useRouteContext();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const initAudio = useAudioStore((state) => state.initAudio);
  reactExports.useEffect(() => {
    const unlock = () => {
      unlockAudio();
      initAudio();
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [initAudio]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    isLanding ? /* @__PURE__ */ jsxRuntimeExports.jsx(LandingCanvas, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalCanvas, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticCursor, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { location: location.pathname }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MotionConfig, { reducedMotion: "user", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10, scale: 0.995 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        className: "min-h-screen",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
      },
      location.pathname
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right", richColors: true })
  ] }) });
}
const $$splitComponentImporter$o = () => import("./verified-CEYHB-LT.mjs");
const Route$y = createFileRoute("/verified")({
  head: () => ({
    meta: [{
      title: "Email Verified | ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./login-CR70OJPQ.mjs");
const Route$x = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_app-C8y1AMv2.mjs");
const Route$w = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./index-DBD2hkSZ.mjs");
const Route$v = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "ProjectSpark — Generate ideas, learn anything, build with AI"
    }, {
      name: "description",
      content: "The futuristic AI OS combining ChatGPT, GitHub, Coursera & Notion AI for students, developers and founders."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const Route$u = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();
        if (!Array.isArray(messages)) {
          return new Response("messages required", { status: 400 });
        }
        const validMessages = messages.filter((m) => {
          if (typeof m.content === "string") return m.content.trim().length > 0;
          if (Array.isArray(m.parts)) {
            return m.parts.some((p) => p.type === "text" && p.text && p.text.trim().length > 0) || m.parts.some((p) => p.type !== "text");
          }
          return false;
        });
        try {
          const result = await streamTextResilient({
            system: "You are ProjectSpark AI — a brilliant, encouraging mentor for students, developers, and engineers. Help with project ideas, learning roadmaps, code, and architecture. Use markdown with code blocks when helpful.",
            messages: await convertToModelMessages(validMessages),
            abortSignal: request.signal
          });
          return result.toUIMessageStreamResponse({
            originalMessages: validMessages
          });
        } catch (error) {
          console.warn("[api/chat] LLM streaming failed, falling back to mock response:", error);
          let lastUserMessage = "";
          try {
            const userMsgs = messages.filter((m) => m.role === "user");
            const lastMsg = userMsgs[userMsgs.length - 1];
            if (lastMsg) {
              if (typeof lastMsg.content === "string" && lastMsg.content) {
                lastUserMessage = lastMsg.content;
              } else if (Array.isArray(lastMsg.parts)) {
                lastUserMessage = lastMsg.parts.filter(
                  (p) => typeof p === "object" && p !== null && p.type === "text" && typeof p.text === "string"
                ).map((p) => p.text).join("\n");
              }
            }
          } catch (e) {
            console.error("[api/chat] error parsing user message:", e);
          }
          let reply = "";
          const text = lastUserMessage.toLowerCase();
          if (text.includes("hello") || text.includes("hi ") || text === "hi" || text.includes("hey")) {
            reply = `Hello! I am ProjectSpark AI, your developer growth mentor. 🚀

How can I help you today? Ask me about:
1. **Interactive Roadmaps** in the Roadmap Planner.
2. **LeetCode Interview questions** from 650+ companies.
3. **Free programming reference books** & CLI cheat sheets.
4. **Build Your Own X challenges** for building databases, Git, or Web Servers.
5. **Portfolio Website Builder** from your resume.`;
          } else if (text.includes("roadmap") || text.includes("curriculum") || text.includes("study plan")) {
            reply = `You can explore our **Roadmap Planner** to design custom learning paths for Web Dev, AI/ML, Cybersecurity, Cloud, and more! 

Each roadmap node lets you generate structured study plans, solve practice tasks, take quizzes, and access free textbooks. Tasks containing keywords (like Git or SQLite) will show a special badge linking you directly to practical **Build Your Own X** coding guides!`;
          } else if (text.includes("interview") || text.includes("leetcode") || text.includes("company")) {
            reply = `Our **Interview Prep** section compiles real interview questions from over 650+ tech companies (like Google, Amazon, Netflix, Citadel) loaded dynamically from LeetCode.

You can filter by company and select timeframes (Last 30 Days, Last 6 Months, or All Time) to see the most frequent problems. Click any problem to open it directly on LeetCode!`;
          } else if (text.includes("book") || text.includes("textbook") || text.includes("secret knowledge")) {
            reply = `Our **Books & Docs Hub** gives you:
1. **Free Programming Books:** Over 2,200+ curated programming textbooks across all major languages and frameworks.
2. **Secret Knowledge CLI:** A cheatsheet reference of security tools, one-liner bash utilities, and Docker guides.

Recommended books will also show up dynamically in your Roadmap Node Drawers under the Resources tab!`;
          } else if (text.includes("build") || text.includes("byox") || text.includes("challenge") || text.includes("redis") || text.includes("git")) {
            reply = `In **Build Your Own X**, you can:
1. **Build Projects:** Follow structured templates in Go, Rust, Python, or Node.js to build Redis, Git, SQLite, or a DNS server from scratch.
2. **Dynamic Guides:** Browse, filter, and search a full dynamic catalog of step-by-step guides parsed directly from the popular CodeCrafters list.
3. **Earn XP:** Check off implementation milestones to claim gamified experience points!`;
          } else if (text.includes("portfolio") || text.includes("resume") || text.includes("template")) {
            reply = `Our **Portfolio Builder** lets you paste or drag-and-drop a resume to parse your contact info, education, skills, experience, and hobbies automatically. 

You can preview your website in three high-end templates (Cyber, Retro, Minimalist), or use the **AI Custom Style Generator** to create a custom HTML page from a style prompt!`;
          } else {
            reply = `I am ProjectSpark AI, your virtual pairing partner! 💻

I am currently running in offline/resilient mode because the external LLM provider keys are offline or unconfigured. 

However, you can still fully use all of ProjectSpark's core interactive modules:
- 🗺️ **Roadmaps:** Choose a node and complete study tasks.
- 🎓 **Study Guide:** Generate curriculum schedules.
- 💻 **Build Your Own X:** Build databases, Git, or Web Servers.
- 🏢 **Interview Prep:** Solve company-wise LeetCode problems.
- 📚 **Books Hub:** Read thousands of free programming books.
- 💼 **Portfolio Builder:** Scan resumes and export HTML web designs.`;
          }
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              const chunks = reply.match(/.{1,8}/g) || [reply];
              for (const chunk of chunks) {
                const line = `0:${JSON.stringify(chunk)}
`;
                controller.enqueue(encoder.encode(line));
                await new Promise((r) => setTimeout(r, 15));
              }
              controller.close();
            }
          });
          return new Response(stream, {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "x-vercel-ai-data-stream": "v1"
            }
          });
        }
      }
    }
  }
});
function HolographicPanel({
  children,
  className = "",
  innerClassName = "",
  onClick
}) {
  const cardRef = reactExports.useRef(null);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateXSpring = useSpring(rotateXVal, springConfig);
  const rotateYSpring = useSpring(rotateYVal, springConfig);
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-10, 10]);
  const highlightXVal = useMotionValue(-100);
  const highlightYVal = useMotionValue(-100);
  const highlightX = useSpring(highlightXVal, springConfig);
  const highlightY = useSpring(highlightYVal, springConfig);
  const rectRef = reactExports.useRef(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };
  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateXVal.set(y);
    rotateYVal.set(x);
    highlightXVal.set(e.clientX - rect.left);
    highlightYVal.set(e.clientY - rect.top);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
    rotateXVal.set(0);
    rotateYVal.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref: cardRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      },
      animate: {
        z: isHovered ? 20 : 0
      },
      transition: { type: "spring", stiffness: 150, damping: 18 },
      className: `glass relative overflow-hidden rounded-3xl transition-colors duration-300 ${isHovered ? "bg-card/75 border-white/20" : "bg-card/45 border-white/10"} ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            style: {
              left: highlightX,
              top: highlightY,
              translateX: "-50%",
              translateY: "-50%"
            },
            className: "pointer-events-none absolute -z-10 h-64 w-64 rounded-full bg-gradient-radial from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            animate: {
              opacity: isHovered ? 1 : 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 -z-20 pointer-events-none rounded-3xl",
            style: {
              background: isHovered ? "radial-gradient(110% 75% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)" : "radial-gradient(100% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 50%)",
              transition: "background 0.5s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: innerClassName,
            style: { transform: "translateZ(30px)", transformStyle: "preserve-3d" },
            children
          }
        )
      ]
    }
  );
}
const $$splitComponentImporter$k = () => import("../_app.study-guide-BcIGPNoi.mjs");
const studySearchSchema = objectType({
  node: stringType().optional(),
  restoreId: stringType().optional()
});
const Route$t = createFileRoute("/_app/study-guide")({
  validateSearch: studySearchSchema,
  head: () => ({
    meta: [{
      title: "Study Guide — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
function PageHeader({
  title,
  description,
  icon: Icon,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-spark text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: description })
      ] })
    ] }),
    actions
  ] });
}
function PageShell({ children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative mx-auto max-w-6xl px-6 py-10 ${className || ""}`, children });
}
const PLANETARY_LEVELS = [
  { xp: 0, name: "Earth", color: "#3b82f6", type: "Planet" },
  { xp: 1e3, name: "Moon", color: "#9ca3af", type: "Satellite" },
  { xp: 3e3, name: "Mars", color: "#ef4444", type: "Planet" },
  { xp: 1e4, name: "Jupiter", color: "#f59e0b", type: "Gas Giant" },
  { xp: 25e3, name: "Saturn", color: "#fbbf24", type: "Gas Giant" },
  { xp: 5e4, name: "Neptune", color: "#3b82f6", type: "Ice Giant" },
  { xp: 1e5, name: "Galaxy Explorer", color: "#fde047", type: "Title" },
  { xp: 25e4, name: "Cosmic Architect", color: "#c084fc", type: "Title" },
  { xp: 5e5, name: "Universal Builder", color: "#f87171", type: "Title" }
];
function getPlanetForXP(xp) {
  let current = PLANETARY_LEVELS[0];
  let next = PLANETARY_LEVELS[1];
  for (let i = 0; i < PLANETARY_LEVELS.length; i++) {
    if (xp >= PLANETARY_LEVELS[i].xp) {
      current = PLANETARY_LEVELS[i];
      next = PLANETARY_LEVELS[Math.min(i + 1, PLANETARY_LEVELS.length - 1)];
    } else {
      break;
    }
  }
  return { current, next };
}
async function awardXP(amount, reason) {
  try {
    const { data, error } = await supabase.rpc("award_xp_and_streak", {
      amount,
      reason
    });
    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.error("[xp] award failed", error);
      return null;
    }
    const row = data[0];
    const reward = {
      newXp: row.new_xp,
      newStreak: row.new_streak,
      newLevel: row.new_level
      // We keep the base level logic for database compatibility
    };
    const { current, next } = getPlanetForXP(reward.newXp);
    toast.success(`+${amount} XP — ${reason}`, {
      description: `🔥 ${reward.newStreak}-day streak · ${current.name} Orbit · ${reward.newXp} XP`,
      duration: 3500,
      icon: "🚀"
    });
    return reward;
  } catch (e) {
    console.error("[xp]", e);
    return null;
  }
}
async function unlockAchievement(opts) {
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return;
  const xp = opts.xp ?? 50;
  const { error } = await supabase.from("achievements").insert({
    user_id: u.user.id,
    code: opts.code,
    title: opts.title,
    description: opts.description ?? "",
    icon: opts.icon ?? "trophy",
    xp_awarded: xp
  });
  if (error && !error.message.includes("duplicate")) {
    console.error("[achievement]", error);
    return;
  }
  if (!error) {
    await awardXP(xp, `Constellation Unlocked: ${opts.title}`);
  }
}
const XP = {
  SAVE_ROADMAP: 50,
  SAVE_STUDY: 50,
  SAVE_BLUEPRINT: 75,
  SAVE_MENTOR: 40,
  SAVE_PROJECT: 60,
  SAVE_RESUME: 80,
  RUN_ATS: 30,
  CHAT_MESSAGE: 5
};
const Route$s = createFileRoute("/_app/startup")({
  head: () => ({ meta: [{ title: "Startup Incubator — ProjectSpark" }] }),
  component: StartupIncubator
});
function StartupIncubator() {
  const [activeTab, setActiveTab] = reactExports.useState("validation");
  const [ideaText, setIdeaText] = reactExports.useState("");
  const [validating, setValidating] = reactExports.useState(false);
  const [validated, setValidated] = reactExports.useState(false);
  const [canvas, setCanvas] = reactExports.useState({
    valueProp: "Provide automated clinical diagnostics dashboards for radiography clinics.",
    customers: "Radiology departments, local medical clinics.",
    channels: "Direct sales reps, medical software distribution partners.",
    revenue: "SaaS licensing per scanning hub unit ($500/mo).",
    partners: "Hospitals, medical hardware suppliers."
  });
  const [swot, setSwot] = reactExports.useState({
    strengths: "Proprietary vision transformers model, instant analytics.",
    weaknesses: "High compute requirements, medical compliance verification hurdles.",
    opportunities: "Expansion to MRI scanning fields, partnership with local clinics.",
    threats: "Large established healthcare legacy software vendors."
  });
  const handleValidate = () => {
    if (!ideaText.trim()) {
      toast.error("Please describe your startup idea first.");
      return;
    }
    playClick();
    setValidating(true);
    setValidated(false);
    setTimeout(() => {
      playSuccess();
      setValidating(false);
      setValidated(true);
      setCanvas({
        valueProp: `Decentralized AI evaluation engine for ${ideaText.substring(0, 30)}...`,
        customers: "Early adopter tech-savvy developers, corporate integrations.",
        channels: "API integrations, GitHub marketplace widgets.",
        revenue: "Pay-per-token API requests + monthly subscription model.",
        partners: "Cloud computing hosts, security compliance providers."
      });
      setSwot({
        strengths: "First mover advantage, localized learning models.",
        weaknesses: "Bootstrap funding, code auditing limits.",
        opportunities: "Global SaaS developer distribution.",
        threats: "Hyperscalers launching similar built-in tooling."
      });
      awardXP(60, "Validated Startup Idea");
      toast.success("Startup idea validated! Business Model & SWOT matrix compiled.");
    }, 1500);
  };
  const handleSaveCanvas = () => {
    playSuccess();
    awardXP(25, "Saved Business Canvas");
    toast.success("Business Model Canvas updated and synced with advisors.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Rocket,
        title: "Startup Incubator & Launchpad",
        description: "Transform engineering projects into high-growth businesses. Run idea validations, compile business models, map SWOT matrices, and compile pitch decks."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-white/5 mb-6 text-xs font-semibold overflow-x-auto", children: ["validation", "swot", "pitch"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          playClick();
          setActiveTab(tab);
        },
        className: `px-6 py-2.5 capitalize transition ${activeTab === tab ? "border-b-2 border-spark text-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: tab === "validation" ? "Idea Validation & Canvas" : tab === "swot" ? "Competitor SWOT" : "Pitch Deck Builder"
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      activeTab === "validation" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Validate Startup Concept" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Describe your startup idea to generate a simulated market analysis and Business Model Canvas." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: ideaText,
                onChange: (e) => setIdeaText(e.target.value),
                placeholder: "e.g. Automated clinical scans platform powered by machine learning...",
                className: "flex-1 rounded-xl border border-white/10 bg-background px-3 py-2.5 text-xs text-foreground outline-none focus:border-spark"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleValidate,
                disabled: validating,
                className: "rounded-xl bg-gradient-spark px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition disabled:opacity-50 flex items-center gap-1.5",
                children: [
                  validating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: validating ? "Analyzing Market..." : "AI Validate Idea" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
              " Business Model Canvas"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSaveCanvas, className: "text-xs text-spark hover:underline", children: "Save Changes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-3.5 w-3.5 text-spark" }),
                " Key Partners"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: canvas.partners,
                  onChange: (e) => setCanvas({ ...canvas, partners: e.target.value }),
                  rows: 3,
                  className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5 text-aurora" }),
                " Value Propositions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: canvas.valueProp,
                  onChange: (e) => setCanvas({ ...canvas, valueProp: e.target.value }),
                  rows: 3,
                  className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-violet-glow" }),
                " Customer Segments"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: canvas.customers,
                  onChange: (e) => setCanvas({ ...canvas, customers: e.target.value }),
                  rows: 3,
                  className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-blue-400" }),
                " Channels"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: canvas.channels,
                  onChange: (e) => setCanvas({ ...canvas, channels: e.target.value }),
                  rows: 3,
                  className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-2 lg:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3.5 w-3.5 text-emerald-400" }),
                " Revenue Streams"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: canvas.revenue,
                  onChange: (e) => setCanvas({ ...canvas, revenue: e.target.value }),
                  rows: 2,
                  className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      activeTab === "swot" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3.5 w-3.5" }),
          " Competitive SWOT Analysis Matrix"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 border-blue-500/20 bg-blue-500/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold uppercase text-blue-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Strengths (Internal)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: swot.strengths,
                onChange: (e) => setSwot({ ...swot, strengths: e.target.value }),
                rows: 3,
                className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 border-amber-500/20 bg-amber-500/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Weaknesses (Internal)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: swot.weaknesses,
                onChange: (e) => setSwot({ ...swot, weaknesses: e.target.value }),
                rows: 3,
                className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 border-emerald-500/20 bg-emerald-500/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Opportunities (External)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: swot.opportunities,
                onChange: (e) => setSwot({ ...swot, opportunities: e.target.value }),
                rows: 3,
                className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 border-red-500/20 bg-red-500/5 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold uppercase text-red-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Threats (External)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: swot.threats,
                onChange: (e) => setSwot({ ...swot, threats: e.target.value }),
                rows: 3,
                className: "w-full bg-transparent border-0 resize-none outline-none text-xs text-muted-foreground leading-relaxed"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              playSuccess();
              toast.success("SWOT Matrix saved!");
            },
            className: "px-4 py-2 rounded-xl bg-gradient-spark text-primary-foreground text-xs font-semibold shadow-glow",
            children: "Save Competitor Matrix"
          }
        ) })
      ] }),
      activeTab === "pitch" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Pitch Deck Slides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
            {
              num: 1,
              title: "Problem Definition",
              desc: "Why current healthcare diagnostic frameworks take hours for chest scans."
            },
            {
              num: 2,
              title: "Solution & Architecture",
              desc: "AI-powered vision transformer scanning in 3D circles."
            },
            {
              num: 3,
              title: "Market Potential",
              desc: "Estimated radiology clinics total addressable market of $12B."
            },
            {
              num: 4,
              title: "Business & Subscription Models",
              desc: "$500/mo SaaS pricing per dashboard instance."
            }
          ].map((slide) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 flex gap-4 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-spark/10 border border-spark/20 grid place-items-center text-xs font-bold font-mono text-spark shrink-0", children: slide.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-xs text-foreground", children: slide.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-normal", children: slide.desc })
            ] })
          ] }, slide.num)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between h-[240px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Pitch Deck Generator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Export slides into a clean PowerPoint/PDF config format." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                playSuccess();
                awardXP(40, "Generated startup pitch deck");
                toast.success("Pitch Deck exported! Check downloads directory.");
              },
              className: "w-full py-2.5 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition flex items-center justify-center gap-1.5 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Presentation, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generate PDF Presentation" })
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
const Route$r = createFileRoute("/_app/skills")({
  head: () => ({ meta: [{ title: "Skill Graph — ProjectSpark" }] }),
  component: SkillGraph
});
const INITIAL_NODES = [
  {
    id: "html",
    label: "HTML5 & Semantic Web",
    category: "Frontend",
    progress: 95,
    prereqs: [],
    info: "Foundational structure of web pages and document layout.",
    x: -180,
    y: -100,
    connections: ["css", "js"],
    jobs: ["Frontend Dev", "Full Stack Dev"]
  },
  {
    id: "css",
    label: "CSS3 & Responsive Layouts",
    category: "Frontend",
    progress: 85,
    prereqs: ["html"],
    info: "Styling layout architectures, Flexbox, Grid, animations, and TailwindCSS.",
    x: -80,
    y: -130,
    connections: ["js", "react"],
    jobs: ["UI Engineer", "Frontend Dev"]
  },
  {
    id: "js",
    label: "Advanced JavaScript",
    category: "Frontend",
    progress: 80,
    prereqs: ["html"],
    info: "Asynchronous programming, closures, ES6 syntax, and web DOM controls.",
    x: -80,
    y: -50,
    connections: ["react", "nodejs"],
    jobs: ["Frontend Dev", "JS Architect"]
  },
  {
    id: "react",
    label: "React JS Meta-Framework",
    category: "Frontend",
    progress: 75,
    prereqs: ["css", "js"],
    info: "Component lifecycle, Virtual DOM diffing, and state hook flows.",
    x: 20,
    y: -90,
    connections: ["nextjs"],
    jobs: ["React Engineer", "Frontend Dev"]
  },
  {
    id: "nextjs",
    label: "Next.js App Router",
    category: "Frontend",
    progress: 60,
    prereqs: ["react"],
    info: "Server-side rendering (SSR), Static Generation (SSG), and API routes.",
    x: 120,
    y: -90,
    connections: [],
    jobs: ["Next.js Developer", "Full Stack Dev"]
  },
  {
    id: "python",
    label: "Python Core",
    category: "Backend",
    progress: 90,
    prereqs: [],
    info: "Object-oriented scripting, data structures, and basic automation.",
    x: -180,
    y: 100,
    connections: ["django", "ml"],
    jobs: ["Python Dev", "Backend Dev"]
  },
  {
    id: "django",
    label: "Django Framework",
    category: "Backend",
    progress: 70,
    prereqs: ["python"],
    info: "Batteries-included backend web engine, ORMs, and secure REST APIs.",
    x: -80,
    y: 130,
    connections: ["postgresql"],
    jobs: ["Backend Engineer", "Django Dev"]
  },
  {
    id: "nodejs",
    label: "NodeJS & Express",
    category: "Backend",
    progress: 65,
    prereqs: ["js"],
    info: "Server event loop architecture, middleware, routers, and streaming.",
    x: 20,
    y: 50,
    connections: ["postgresql"],
    jobs: ["Node Developer", "Backend Dev"]
  },
  {
    id: "postgresql",
    label: "PostgreSQL & SQL database",
    category: "Backend",
    progress: 75,
    prereqs: ["django", "nodejs"],
    info: "Relational database constraints, indexing, aggregate queries, and pooling.",
    x: 120,
    y: 70,
    connections: ["aws"],
    jobs: ["Database Admin", "Backend Dev"]
  },
  {
    id: "ml",
    label: "Machine Learning (Scikit)",
    category: "Data Science",
    progress: 50,
    prereqs: ["python"],
    info: "Regression algorithms, decision trees, feature engineering, and validation.",
    x: -20,
    y: 160,
    connections: ["dl"],
    jobs: ["ML Engineer", "Data Scientist"]
  },
  {
    id: "dl",
    label: "Deep Learning (PyTorch)",
    category: "Data Science",
    progress: 30,
    prereqs: ["ml"],
    info: "Neural network backpropagation, convolution grids, and transformer weights.",
    x: 80,
    y: 160,
    connections: [],
    jobs: ["Computer Vision Dev", "AI Research Scientist"]
  },
  {
    id: "aws",
    label: "Amazon Web Services (AWS)",
    category: "DevOps",
    progress: 40,
    prereqs: ["postgresql"],
    info: "Cloud computing instances (EC2), object store buckets (S3), and network VPC bridges.",
    x: 200,
    y: 0,
    connections: [],
    jobs: ["Cloud Solutions Architect", "DevOps Engineer"]
  }
];
function SkillGraph() {
  const [nodes, setNodes] = reactExports.useState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = reactExports.useState(null);
  const [hoveredNode, setHoveredNode] = reactExports.useState(null);
  const handleNodeClick = (node) => {
    playClick();
    setSelectedNode(node);
  };
  const handleStudySkill = (nodeId) => {
    playSuccess();
    setNodes(
      (prev) => prev.map((n) => {
        if (n.id === nodeId) {
          const nextProgress = Math.min(100, n.progress + 10);
          if (nextProgress === 100) {
            awardXP(100, `Fully Mastered Skill: ${n.label}`);
          } else {
            awardXP(20, `Studied Skill: ${n.label}`);
          }
          return { ...n, progress: nextProgress };
        }
        return n;
      })
    );
    if (selectedNode?.id === nodeId) {
      setSelectedNode(
        (prev) => prev ? { ...prev, progress: Math.min(100, prev.progress + 10) } : null
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Network,
        title: "Unified Knowledge Graph",
        description: "Visual skill tree representing prerequisites, progression maps, and targeted job opportunities."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "relative p-4 overflow-hidden min-h-[460px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-10 text-[10px] text-muted-foreground bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none", children: "💡 Click nodes to review dependencies & career options" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "-260 -200 520 400", className: "w-full h-[400px] overflow-visible", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "node-glow", cx: "50%", cy: "50%", r: "50%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 295)", stopOpacity: "0.3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 295)", stopOpacity: "0" })
          ] }) }),
          nodes.map((n) => {
            return n.connections.map((targetId) => {
              const target = nodes.find((t) => t.id === targetId);
              if (!target) return null;
              const isHighlighted = selectedNode?.id === n.id || selectedNode?.id === targetId;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: n.x,
                  y1: n.y,
                  x2: target.x,
                  y2: target.y,
                  stroke: isHighlighted ? "oklch(0.78 0.18 295)" : "rgba(255, 255, 255, 0.08)",
                  strokeWidth: isHighlighted ? "2" : "1.2",
                  strokeDasharray: isHighlighted ? "none" : "3,3",
                  className: "transition-all duration-300"
                },
                `${n.id}-${targetId}`
              );
            });
          }),
          nodes.map((n) => {
            const isSelected = selectedNode?.id === n.id;
            const isHovered = hoveredNode?.id === n.id;
            const categoryColors = {
              Frontend: "oklch(0.80 0.16 140)",
              // emerald
              Backend: "oklch(0.74 0.16 230)",
              // blue
              "Data Science": "oklch(0.84 0.13 85)",
              // yellow
              DevOps: "oklch(0.76 0.17 340)"
              // pink
            };
            const color = categoryColors[n.category] || "#fff";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "g",
              {
                className: "cursor-pointer",
                transform: `translate(${n.x}, ${n.y})`,
                onClick: () => handleNodeClick(n),
                onMouseEnter: () => {
                  playHover();
                  setHoveredNode(n);
                },
                onMouseLeave: () => setHoveredNode(null),
                children: [
                  (isSelected || isHovered) && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "26", fill: "url(#node-glow)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "16", fill: "none", stroke: "rgba(255,255,255,0.05)", strokeWidth: "3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      r: "16",
                      fill: "none",
                      stroke: color,
                      strokeWidth: "3.5",
                      strokeDasharray: 2 * Math.PI * 16,
                      strokeDashoffset: 2 * Math.PI * 16 * (1 - n.progress / 100),
                      strokeLinecap: "round",
                      className: "rotate-[-90deg] origin-center transition-all duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      r: "12",
                      fill: "oklch(0.16 0.02 270)",
                      stroke: isSelected ? "#fff" : "rgba(255,255,255,0.15)",
                      strokeWidth: isSelected ? "1.8" : "1",
                      className: "transition-all duration-300"
                    }
                  ),
                  n.progress === 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { r: "4", fill: "oklch(0.86 0.1 140)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "text",
                    {
                      y: "26",
                      textAnchor: "middle",
                      fill: isSelected || isHovered ? "#fff" : "rgba(255,255,255,0.7)",
                      className: "font-display text-[8.5px] font-semibold select-none transition-all duration-300",
                      children: n.label.split(" ")[0]
                    }
                  )
                ]
              },
              n.id
            );
          })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { className: "p-5", children: selectedNode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-right-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block rounded-md bg-spark/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-spark", children: [
              selectedNode.category,
              " Node"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground mt-1", children: selectedNode.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-spark", children: [
              selectedNode.progress,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider text-muted-foreground", children: "Progress" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: selectedNode.info }),
        selectedNode.prereqs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3 w-3 text-red-400" }),
            " Prerequisites"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedNode.prereqs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[9px] text-red-400 font-semibold uppercase",
              children: p
            },
            p
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 text-spark" }),
            " Career Pathways"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedNode.jobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded bg-white/5 border border-white/5 px-2.5 py-0.5 text-[9px] text-foreground font-semibold",
              children: j
            },
            j
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleStudySkill(selectedNode.id),
            disabled: selectedNode.progress >= 100,
            className: "w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedNode.progress >= 100 ? "Fully Mastered!" : "Study Concept (+20 XP)" })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "h-8 w-8 mx-auto text-spark/40 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-muted-foreground mt-2", children: "No Node Selected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1 px-4 leading-relaxed", children: "Click on any technology node on the visual graph to inspect credentials, prerequisites, and pathways." })
      ] }) }) })
    ] })
  ] });
}
const $$splitComponentImporter$j = () => import("../_app.settings-DK8zr5-9.mjs");
const Route$q = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [{
      title: "Settings — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("../_app.roadmap-BFsOu0JM.mjs");
const Route$p = createFileRoute("/_app/roadmap")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("../_app.resume-OpjKCjBi.mjs");
const Route$o = createFileRoute("/_app/resume")({
  head: () => ({
    meta: [{
      title: "Resume Builder & ATS — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("../_app.resources-trd5vSYr.mjs");
const Route$n = createFileRoute("/_app/resources")({
  head: () => ({
    meta: [{
      title: "Resources Hub — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const Route$m = createFileRoute("/_app/research")({
  head: () => ({ meta: [{ title: "Research Hub — ProjectSpark" }] }),
  component: ResearchHub
});
const PAPERS = [
  {
    id: "paper-1",
    title: "Attention Is All You Need",
    authors: "Vaswani et al. (Google Research)",
    source: "NeurIPS 2017",
    category: "AI/ML",
    abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms.",
    summary: {
      contributions: [
        "Replaced RNNs and CNNs with self-attention layers.",
        "Introduced multi-head attention for parallel sequence modeling.",
        "Significantly reduced training time while achieving SOTA translation results."
      ],
      impact: "Laid the foundation for modern LLMs (GPT, Gemini, Claude)."
    },
    comments: [
      {
        user: "ml_dev_99",
        text: "Truly seminal. The multi-head attention model is still the gold standard.",
        date: "2 hours ago"
      },
      {
        user: "quantum_coder",
        text: "Agreed, though scaling costs are getting quadratic on long contexts.",
        date: "1 hour ago"
      }
    ],
    likes: 142
  },
  {
    id: "paper-2",
    title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
    authors: "Dosovitskiy et al. (Google Brain)",
    source: "ICLR 2021",
    category: "AI/ML",
    abstract: "While the Transformer architecture has become the de-facto standard for natural language processing, its applications to computer vision remain limited. We show that a pure transformer applied directly to patches of images performs very well.",
    comments: [
      {
        user: "vision_pioneer",
        text: "Vision Transformers (ViT) changed everything in medical imaging benchmarks.",
        date: "Yesterday"
      }
    ],
    likes: 98
  },
  {
    id: "paper-3",
    title: "Resilient Distributed Datasets: A Fault-Tolerant Abstraction for In-Memory Cluster Computing",
    authors: "Zaharia et al. (UC Berkeley)",
    source: "NSDI 2012",
    category: "Systems",
    abstract: "We present Resilient Distributed Datasets (RDDs), a distributed memory abstraction that lets programmers perform in-memory computations on large clusters in a fault-tolerant manner.",
    comments: [],
    likes: 56
  }
];
function ResearchHub() {
  const [papers, setPapers] = reactExports.useState(PAPERS);
  const [selectedPaper, setSelectedPaper] = reactExports.useState(null);
  const [commentText, setCommentText] = reactExports.useState("");
  const handleLike = (id, e) => {
    e.stopPropagation();
    playClick();
    setPapers(
      (prev) => prev.map((p) => {
        if (p.id === id) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      })
    );
  };
  const handleBookmark = (id, e) => {
    e.stopPropagation();
    playClick();
    setPapers(
      (prev) => prev.map((p) => {
        if (p.id === id) {
          const bookmarked = !p.bookmarked;
          if (bookmarked) {
            awardXP(15, "Bookmarked research paper");
            toast.success("Paper added to study repository.");
          }
          return { ...p, bookmarked };
        }
        return p;
      })
    );
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedPaper) return;
    playClick();
    const newComment = {
      user: "you",
      text: commentText,
      date: "Just now"
    };
    setPapers(
      (prev) => prev.map((p) => {
        if (p.id === selectedPaper.id) {
          const updated = {
            ...p,
            comments: [...p.comments, newComment]
          };
          setSelectedPaper(updated);
          return updated;
        }
        return p;
      })
    );
    setCommentText("");
    awardXP(10, "Commented on research paper");
    toast.success("Discussion posted!");
  };
  const generateAISummary = (id, e) => {
    e.stopPropagation();
    playSuccess();
    setPapers(
      (prev) => prev.map((p) => {
        if (p.id === id) {
          const updated = {
            ...p,
            summary: p.summary || {
              contributions: [
                "Formulated novel representations mapping patch networks.",
                "Introduced modular layers allowing linear scalability.",
                "Established benchmark validations surpassing traditional architectures."
              ],
              impact: "Enabled high fidelity deployments under low latency constraints."
            }
          };
          if (selectedPaper?.id === id) setSelectedPaper(updated);
          awardXP(25, "Generated paper AI summary");
          toast.success("AI Summary generated successfully!");
          return updated;
        }
        return p;
      })
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Newspaper,
        title: "AI Research Hub",
        description: "Explore pioneering engineering research. View abstract summaries, trigger AI digests, and participate in peer discussions."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Recommended papers feed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3.5", children: papers.map((p) => {
          const isSelected = selectedPaper?.id === p.id;
          const catColors = {
            "AI/ML": "bg-purple-500/10 border-purple-500/20 text-purple-400",
            Systems: "bg-blue-500/10 border-blue-500/20 text-blue-400",
            Security: "bg-red-500/10 border-red-500/20 text-red-400"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            HolographicPanel,
            {
              className: `p-5 space-y-4 cursor-pointer transition ${isSelected ? "border-spark/50 bg-spark/5" : "hover:border-white/10"}`,
              onClick: () => {
                playClick();
                setSelectedPaper(p);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${catColors[p.category]}`,
                          children: p.category
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold", children: p.source })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground mt-2", children: p.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                      "Authors: ",
                      p.authors
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => handleBookmark(p.id, e),
                      className: `rounded-lg p-1.5 border transition ${p.bookmarked ? "bg-spark/10 border-spark/20 text-spark" : "border-white/5 text-muted-foreground hover:text-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-3", children: p.abstract }),
                p.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-spark/20 bg-spark/5 p-3 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-spark flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }),
                    " AI Summary & Key Contributions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-4 text-[11px] leading-relaxed text-muted-foreground space-y-1", children: p.summary.contributions.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: c }, i)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Future Impact: " }),
                    " ",
                    p.summary.impact
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs pt-2 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: (e) => handleLike(p.id, e),
                      className: "flex items-center gap-1 text-muted-foreground hover:text-red-400 transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          p.likes,
                          " Likes"
                        ] })
                      ]
                    }
                  ),
                  !p.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: (e) => generateAISummary(p.id, e),
                      className: "px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider font-semibold text-foreground hover:bg-white/10 transition flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-spark" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generate AI Summary" })
                      ]
                    }
                  )
                ] })
              ]
            },
            p.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { className: "p-5 min-h-[460px] flex flex-col justify-between", children: selectedPaper ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between h-full flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-bold text-foreground", children: [
            "Discussions: ",
            selectedPaper.title.substring(0, 30),
            "..."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Participate in peer discussions & notes exchange." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-4 pt-4 border-t border-white/5 space-y-3 max-h-[220px] overflow-y-auto",
              "data-lenis-prevent": true,
              children: [
                selectedPaper.comments.map((comment, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-white/2 border border-white/5 rounded-xl p-3 text-xs space-y-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
                          "@",
                          comment.user
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: comment.date })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: comment.text })
                    ]
                  },
                  i
                )),
                selectedPaper.comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-xs text-muted-foreground", children: "No discussions yet. Be the first to start the thread!" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleAddComment,
            className: "mt-4 pt-4 border-t border-white/5 flex gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: commentText,
                  onChange: (e) => setCommentText(e.target.value),
                  placeholder: "Ask a question or comment...",
                  className: "flex-1 rounded-xl border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark",
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "rounded-xl bg-gradient-spark px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition",
                  children: "Comment"
                }
              )
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 flex-1 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-8 w-8 text-spark/40 animate-pulse mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-xs text-muted-foreground", children: "No Paper Selected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 px-4 leading-relaxed", children: "Select a research paper from the feed to load discussion threads and draft AI summaries." })
      ] }) }) })
    ] })
  ] });
}
const $$splitComponentImporter$f = () => import("../_app.progress-4Lm20J7_.mjs");
const Route$l = createFileRoute("/_app/progress")({
  head: () => ({
    meta: [{
      title: "Daily Progress — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("../_app.profile-DicfN73B.mjs");
const Route$k = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [{
      title: "Profile — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
objectType({
  name: stringType(),
  headline: stringType(),
  contact: objectType({
    email: stringType(),
    location: stringType(),
    website: stringType(),
    github: stringType(),
    linkedin: stringType()
  }),
  summary: stringType(),
  skills: arrayType(stringType()),
  experience: arrayType(objectType({
    role: stringType(),
    company: stringType(),
    period: stringType(),
    bullets: arrayType(stringType())
  })),
  projects: arrayType(objectType({
    name: stringType(),
    description: stringType(),
    tech: arrayType(stringType()),
    link: stringType()
  })),
  education: arrayType(objectType({
    degree: stringType(),
    school: stringType(),
    period: stringType()
  })),
  certifications: arrayType(stringType()),
  achievements: arrayType(stringType())
});
objectType({
  overallScore: coerce.number().min(0).max(100),
  scores: objectType({
    keywords: coerce.number().min(0).max(100),
    formatting: coerce.number().min(0).max(100),
    impact: coerce.number().min(0).max(100),
    relevance: coerce.number().min(0).max(100),
    clarity: coerce.number().min(0).max(100),
    skills: coerce.number().min(0).max(100)
  }),
  matchedKeywords: arrayType(stringType()),
  missingKeywords: arrayType(stringType()),
  strengths: arrayType(stringType()),
  improvements: arrayType(stringType()),
  recruiterTake: stringType()
});
const generateResume = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("bc231beed22e65e331ebc5607ce260d8ec7de0c889e0aa3742415d4ba5258a36"));
const analyzeResumeATS = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("ee645837cc1fdb1a9586f6fd6c82fc038cd1fd13a82bf21f88be750d2bc4a3bb"));
objectType({
  fullName: stringType(),
  focusTitle: stringType(),
  email: stringType(),
  github: stringType(),
  linkedin: stringType(),
  skills: stringType(),
  education: stringType(),
  experience: stringType(),
  projects: stringType(),
  achievements: stringType(),
  hobbies: stringType()
});
const parseResumeForPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("dda3a9b435078d7ae55a9af2267bcbcf5f20b7d79084fa3053d24a433ad53543"));
const generateCustomPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("b05cdd6f691664cc831b21a6a6fea5fb1e776570b95ccd1cca976ec769cbf40c"));
const updateCustomPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("a2f7b9497b8e2ad7e33309e68afeecc1fd98c8974930aa73098a69308cfdf334"));
const portfolioSearchSchema = objectType({
  restoreId: stringType().optional()
});
const Route$j = createFileRoute("/_app/portfolio")({
  validateSearch: portfolioSearchSchema,
  head: () => ({ meta: [{ title: "Portfolio Builder — ProjectSpark" }] }),
  component: PortfolioBuilder
});
function PortfolioBuilder() {
  const { restoreId } = Route$j.useSearch();
  const { user } = useAuth();
  const [selectedTheme, setSelectedTheme] = reactExports.useState("Cyber");
  const [showExportModal, setShowExportModal] = reactExports.useState(false);
  const [parsing, setParsing] = reactExports.useState(false);
  const [generatingCustom, setGeneratingCustom] = reactExports.useState(false);
  const [fullName, setFullName] = reactExports.useState("Arun Singh");
  const [focusTitle, setFocusTitle] = reactExports.useState("AI Solutions Engineer");
  const [email, setEmail] = reactExports.useState("arun.singh@sparklabs.ai");
  const [github, setGithub] = reactExports.useState("github.com/arunsingh-ai");
  const [linkedin, setLinkedin] = reactExports.useState("linkedin.com/in/arun-spark");
  const [skills, setSkills] = reactExports.useState("TypeScript, React, Node.js, PyTorch, Python, Docker");
  const [education, setEducation] = reactExports.useState(
    "B.S. in Computer Science, Stanford University (2025)"
  );
  const [experience, setExperience] = reactExports.useState(
    "ML Engineer Intern at SparkLabs AI (Implemented vision transformer diagnostic pipelines)"
  );
  const [projects, setProjects] = reactExports.useState(
    "Custom RESP Engine (Rust) - in-memory key-value store, Interactive Mindmap (React) - visual graphs"
  );
  const [achievements, setAchievements] = reactExports.useState(
    "Hackathon Winner 2026, Dean's List (GPA 3.9/4.0)"
  );
  const [hobbies, setHobbies] = reactExports.useState("Chess, Watching Cricket, Hiking");
  const [generatedDetails, setGeneratedDetails] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (restoreId && user) {
      const loadSaved = async () => {
        const { data, error } = await supabase.from("build_blueprints").select("*").eq("id", restoreId).single();
        if (error) {
          toast.error("Failed to load saved portfolio");
          return;
        }
        if (data && data.blueprint) {
          const bp = data.blueprint;
          if (bp.category === "portfolio") {
            setFullName(bp.fullName || "");
            setFocusTitle(bp.focusTitle || "");
            setEmail(bp.email || "");
            setGithub(bp.github || "");
            setLinkedin(bp.linkedin || "");
            setSkills(bp.skills || "");
            setEducation(bp.education || "");
            setExperience(bp.experience || "");
            setProjects(bp.projects || "");
            setAchievements(bp.achievements || "");
            setHobbies(bp.hobbies || "");
            setCustomHtml(bp.customHtml || null);
            setSelectedTheme(bp.selectedTheme || "Cyber");
            setGeneratedDetails({
              fullName: bp.fullName || "",
              focusTitle: bp.focusTitle || "",
              email: bp.email || "",
              github: bp.github || "",
              linkedin: bp.linkedin || "",
              skills: bp.skills || "",
              education: bp.education || "",
              experience: bp.experience || "",
              projects: bp.projects || "",
              achievements: bp.achievements || "",
              hobbies: bp.hobbies || ""
            });
            toast.success("Restored saved portfolio!");
          }
        }
      };
      loadSaved();
    }
  }, [restoreId, user]);
  const [customPrompt, setCustomPrompt] = reactExports.useState("");
  const [customHtml, setCustomHtml] = reactExports.useState(null);
  const [rawResumeText, setRawResumeText] = reactExports.useState("");
  const parseResume = useServerFn(parseResumeForPortfolio);
  const generateCustom = useServerFn(generateCustomPortfolio);
  const updateCustom = useServerFn(updateCustomPortfolio);
  const parseResumeHeuristic = (text) => {
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const parsedEmail = emailMatch ? emailMatch[0] : "";
    const ghMatch = text.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
    const parsedGithub = ghMatch ? ghMatch[0] : "";
    const liMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
    const parsedLinkedin = liMatch ? liMatch[0] : "";
    let parsedName = "";
    if (lines.length > 0) {
      const firstLine = lines[0];
      if (firstLine.length < 30 && /^[a-zA-Z\s.]+$/.test(firstLine)) {
        parsedName = firstLine;
      }
    }
    const commonTitles = [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "AI Engineer",
      "ML Engineer",
      "Data Scientist",
      "DevOps Engineer",
      "Cloud Solutions Architect",
      "Systems Programmer",
      "Security Analyst"
    ];
    let parsedTitle = "";
    for (const title of commonTitles) {
      if (text.toLowerCase().includes(title.toLowerCase())) {
        parsedTitle = title;
        break;
      }
    }
    if (!parsedTitle && lines.length > 1) {
      const secondLine = lines[1];
      if (secondLine.length < 40) parsedTitle = secondLine;
    }
    let parsedSkills = "";
    const skillsKeywords = ["skills", "technologies", "languages", "core tools", "expertise"];
    let skillsIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const lineLower = lines[i].toLowerCase();
      if (skillsKeywords.some((k) => lineLower.startsWith(k) || lineLower.endsWith(k + ":"))) {
        skillsIndex = i;
        break;
      }
    }
    if (skillsIndex !== -1 && skillsIndex + 1 < lines.length) {
      parsedSkills = lines[skillsIndex + 1];
    } else {
      const knownSkills = [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "Go",
        "Rust",
        "C++",
        "Java",
        "Docker",
        "Kubernetes",
        "AWS",
        "GCP",
        "SQL",
        "PostgreSQL",
        "MongoDB",
        "PyTorch",
        "TensorFlow",
        "HTML",
        "CSS",
        "Git",
        "Next.js",
        "Vue"
      ];
      const foundSkills = knownSkills.filter((s) => new RegExp(`\\b${s}\\b`, "i").test(text));
      parsedSkills = foundSkills.join(", ");
    }
    let parsedEducation = "";
    const eduIndex = lines.findIndex((l) => /education|university|college|degree/i.test(l));
    if (eduIndex !== -1 && eduIndex + 1 < lines.length) {
      parsedEducation = lines[eduIndex] + " - " + lines[eduIndex + 1];
    } else {
      const eduMatch = text.match(
        /(Bachelor|Master|B\.S\.|M\.S\.|B\.Tech|M\.Tech|Ph\.D\.)[^.\n]+/i
      );
      parsedEducation = eduMatch ? eduMatch[0].trim() : "";
    }
    let parsedExperience = "";
    const expIndex = lines.findIndex((l) => /experience|work|employment/i.test(l));
    if (expIndex !== -1 && expIndex + 1 < lines.length) {
      parsedExperience = lines.slice(expIndex + 1, expIndex + 4).join(" ");
    } else {
      parsedExperience = "Professional developer focusing on building high-performance web systems.";
    }
    let parsedProjects = "";
    const projectKeywords = [
      "project",
      "projects",
      "personal projects",
      "portfolio projects",
      "challenges"
    ];
    let projIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const lineLower = lines[i].toLowerCase();
      if (projectKeywords.some((k) => lineLower.startsWith(k) || lineLower.endsWith(k + ":"))) {
        projIndex = i;
        break;
      }
    }
    if (projIndex !== -1 && projIndex + 1 < lines.length) {
      parsedProjects = lines[projIndex + 1];
    } else {
      const knownProjects = text.match(
        /(?:built|created|developed|implemented)\s+([a-zA-Z0-9\s-]+(?:\bserver\b|\bapp\b|\bwebsite\b|\bengine\b|\bdatabase\b))/gi
      );
      parsedProjects = knownProjects ? knownProjects.slice(0, 3).map((p) => p.trim()).join(", ") : "Custom RESP Engine (Rust), Interactive Mindmap (React)";
    }
    let parsedHobbies = "";
    const hobbyKeywords = [
      "hobby",
      "hobbies",
      "interests",
      "personal interests",
      "activities",
      "leisure"
    ];
    let hobbyIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const lineLower = lines[i].toLowerCase();
      if (hobbyKeywords.some((k) => lineLower.startsWith(k) || lineLower.endsWith(k + ":"))) {
        hobbyIndex = i;
        break;
      }
    }
    if (hobbyIndex !== -1 && hobbyIndex + 1 < lines.length) {
      parsedHobbies = lines[hobbyIndex + 1];
    } else {
      const knownHobbies = [
        "chess",
        "cricket",
        "football",
        "reading",
        "gaming",
        "music",
        "traveling",
        "swimming",
        "sports"
      ];
      const foundHobbies = knownHobbies.filter((h) => new RegExp(`\\b${h}\\b`, "i").test(text));
      parsedHobbies = foundHobbies.join(", ") || "Chess, Watching Cricket";
    }
    let parsedAchievements = "";
    const achIndex = lines.findIndex((l) => /achievement|award|honor|badge/i.test(l));
    if (achIndex !== -1 && achIndex + 1 < lines.length) {
      parsedAchievements = lines[achIndex + 1];
    } else {
      const parsedAwards = lines.filter(
        (l) => /award|winner|first place|hackathon|scholarship/i.test(l) && !/cricket|chess/i.test(l)
      );
      parsedAchievements = parsedAwards.slice(0, 2).join(", ") || "Hackathon Competitor, Certified Developer";
    }
    return {
      fullName: parsedName || "Developer Candidate",
      focusTitle: parsedTitle || "Full Stack Engineer",
      email: parsedEmail || "developer@projectspark.ai",
      github: parsedGithub || "github.com",
      linkedin: parsedLinkedin || "linkedin.com",
      skills: parsedSkills || "JavaScript, TypeScript, React, Git",
      education: parsedEducation || "B.S. in Computer Science",
      experience: parsedExperience || "Software Developer at Spark Labs",
      projects: parsedProjects,
      achievements: parsedAchievements || "Ecosystem Contributor",
      hobbies: parsedHobbies
    };
  };
  const runResumeParser = async (textToParse) => {
    if (!textToParse.trim()) {
      toast.error("Please paste resume text or drag a file first.");
      return;
    }
    playClick();
    setParsing(true);
    toast.info("AI Scanner analyzing resume layers...");
    try {
      const parsed = await parseResume({ data: { resumeText: textToParse } });
      if (parsed) {
        setFullName(parsed.fullName);
        setFocusTitle(parsed.focusTitle);
        setEmail(parsed.email);
        setGithub(parsed.github);
        setLinkedin(parsed.linkedin);
        setSkills(parsed.skills);
        setEducation(parsed.education);
        setExperience(parsed.experience);
        setProjects(parsed.projects);
        setAchievements(parsed.achievements);
        setHobbies(parsed.hobbies);
        awardXP(50, "Used AI Resume Parser");
        toast.success("AI parsed resume and populated all fields successfully!");
      }
    } catch (err) {
      console.warn("AI resume parser failed, falling back to local client-side regex engine:", err);
      const fallbackData = parseResumeHeuristic(textToParse);
      setFullName(fallbackData.fullName);
      setFocusTitle(fallbackData.focusTitle);
      setEmail(fallbackData.email);
      setGithub(fallbackData.github);
      setLinkedin(fallbackData.linkedin);
      setSkills(fallbackData.skills);
      setEducation(fallbackData.education);
      setExperience(fallbackData.experience);
      setProjects(fallbackData.projects);
      setAchievements(fallbackData.achievements);
      setHobbies(fallbackData.hobbies);
      awardXP(30, "Parsed resume with local client engine");
      toast.success("Local regex engine extracted all fields successfully!");
    } finally {
      setParsing(false);
    }
  };
  const runCustomGenerator = async () => {
    if (!customPrompt.trim()) {
      toast.error("Please enter a style design prompt.");
      return;
    }
    playClick();
    setGeneratingCustom(true);
    toast.info(
      customHtml ? "AI Custom Designer updating layout..." : "AI Custom Designer composing layout files..."
    );
    const details = {
      fullName,
      focusTitle,
      email,
      github,
      linkedin,
      skills,
      education,
      experience,
      projects,
      achievements,
      hobbies
    };
    try {
      let result;
      if (customHtml) {
        result = await updateCustom({
          data: {
            html: customHtml,
            details,
            prompt: customPrompt
          }
        });
      } else {
        result = await generateCustom({
          data: {
            details,
            prompt: customPrompt
          }
        });
      }
      if (result && result.html) {
        setCustomHtml(result.html);
        setGeneratedDetails(details);
        setSelectedTheme("AI-Custom");
        awardXP(
          60,
          customHtml ? "Iterated custom AI portfolio styling" : "Generated custom AI portfolio styling"
        );
        toast.success(
          customHtml ? "Custom portfolio layout updated!" : "Custom portfolio layout ready!"
        );
        setCustomPrompt("");
      }
    } catch (err) {
      console.error(err);
      toast.error("AI custom designer failed. Try checking your API key configurations.");
    } finally {
      setGeneratingCustom(false);
    }
  };
  const getProcessedHtml = () => {
    if (selectedTheme !== "AI-Custom" || !customHtml) {
      return getExportCodeInternal();
    }
    if (!generatedDetails) return customHtml;
    let html = customHtml;
    const fields = [
      "fullName",
      "focusTitle",
      "email",
      "github",
      "linkedin",
      "skills",
      "education",
      "experience",
      "projects",
      "achievements",
      "hobbies"
    ];
    const currentDetails = {
      fullName,
      focusTitle,
      email,
      github,
      linkedin,
      skills,
      education,
      experience,
      projects,
      achievements,
      hobbies
    };
    const replacePlaceholder = (htmlText, search, replacement) => {
      if (!search || !replacement) return htmlText;
      const escaped = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      return htmlText.replace(new RegExp(escaped, "gi"), replacement);
    };
    for (const field of fields) {
      const oldVal = generatedDetails[field];
      const newVal = currentDetails[field];
      if (oldVal && newVal && oldVal !== newVal) {
        html = replacePlaceholder(html, oldVal, newVal);
      }
    }
    return html;
  };
  const handleSavePortfolio = async () => {
    if (!user) {
      toast.error("Please login to save portfolios");
      return;
    }
    const blueprintPayload = {
      category: "portfolio",
      fullName,
      focusTitle,
      email,
      github,
      linkedin,
      skills,
      education,
      experience,
      projects,
      achievements,
      hobbies,
      customHtml: getProcessedHtml(),
      selectedTheme
    };
    const { error } = await supabase.from("build_blueprints").insert({
      user_id: user.id,
      title: `Portfolio: ${fullName}`,
      description: focusTitle || "Developer Portfolio",
      technologies: skills.split(",").map((s) => s.trim()).filter(Boolean),
      blueprint: blueprintPayload
    });
    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success(`Saved portfolio for ${fullName} to your Saved items!`);
      awardXP(25, `Saved portfolio: ${fullName}`);
    }
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.name.endsWith(".txt") || file.name.endsWith(".md") || file.name.endsWith(".json")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result;
          if (text) {
            setRawResumeText(text);
            runResumeParser(text);
          }
        };
        reader.readAsText(file);
      } else {
        toast.error(
          "For PDFs or Word files, please copy and paste the text directly into the text area below!"
        );
      }
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (text) {
          setRawResumeText(text);
          runResumeParser(text);
        }
      };
      reader.readAsText(file);
    }
  };
  const triggerExport = () => {
    playSuccess();
    setShowExportModal(true);
    awardXP(40, "Exported portfolio template");
    toast.success("Portfolio website generated!");
  };
  const getExportCode = () => {
    if (selectedTheme === "AI-Custom" && customHtml) {
      return getProcessedHtml();
    }
    return getExportCodeInternal();
  };
  const getExportCodeInternal = () => {
    const themeCSS = selectedTheme === "Cyber" ? `body { background: #0a0a16; color: #f3f4f6; font-family: 'Space Grotesk', sans-serif; padding-bottom: 50px; }
         .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(167,139,250,0.2); box-shadow: 0 0 15px rgba(167,139,250,0.1); padding: 20px; border-radius: 12px; margin-bottom: 20px; }
         .accent-text { color: #a78bfa; text-shadow: 0 0 5px #a78bfa; font-weight: bold; }
         a { color: #818cf8; text-decoration: none; }
         .pill { background: rgba(167,139,250,0.15); border: 1px solid rgba(167,139,250,0.3); color: #a78bfa; padding: 4px 10px; border-radius: 8px; font-size: 11px; display: inline-block; margin: 4px; }` : selectedTheme === "Retro" ? `body { background: #0c0f0a; color: #4af626; font-family: monospace; padding-bottom: 50px; }
         .card { border: 1px solid #4af626; padding: 20px; margin-bottom: 20px; }
         .accent-text { color: #4af626; font-weight: bold; }
         a { color: #4af626; text-decoration: underline; }
         .pill { border: 1px dashed #4af626; color: #4af626; padding: 2px 8px; display: inline-block; margin: 4px; }` : `body { background: #ffffff; color: #1f2937; font-family: sans-serif; padding-bottom: 50px; }
         .card { border: 1px solid #e5e7eb; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
         .accent-text { color: #2563eb; font-weight: bold; }
         a { color: #2563eb; text-decoration: none; }
         .pill { background: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 6px; font-size: 11px; display: inline-block; margin: 4px; }`;
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${fullName} | Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    ${themeCSS}
    .container { max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    p { line-height: 1.6; }
    .contact-links { margin: 15px 0; }
    .contact-links a { margin-right: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1>${fullName}</h1>
      <p class="accent-text">${focusTitle}</p>
      <div class="contact-links">
        <a href="mailto:${email}">${email}</a>
        <a href="https://${github}">${github}</a>
        <a href="https://${linkedin}">${linkedin}</a>
      </div>
    </div>
    
    <div class="card">
      <h3>Core Expertise</h3>
      <div style="margin-top: 10px;">
        ${skills.split(",").map((s) => `<span class="pill">${s.trim()}</span>`).join("")}
      </div>
    </div>

    <div class="card">
      <h3>Education</h3>
      <p>${education}</p>
    </div>

    <div class="card">
      <h3>Professional Experience</h3>
      <p>${experience}</p>
    </div>

    <div class="card">
      <h3>Key Projects</h3>
      <p>${projects}</p>
    </div>

    <div class="card">
      <h3>Achievements</h3>
      <p>${achievements}</p>
    </div>

    <div class="card">
      <h3>Hobbies & Interests</h3>
      <p>${hobbies}</p>
    </div>
  </div>
</body>
</html>`;
  };
  const handleCopyCode = () => {
    playSuccess();
    navigator.clipboard.writeText(getExportCode());
    toast.success("HTML code copied to clipboard!");
  };
  const getThemePreviewStyles = () => {
    switch (selectedTheme) {
      case "Retro":
        return {
          bg: "bg-[#0b0d08] border-[#4af626]/20",
          text: "text-[#4af626] font-mono",
          card: "border border-[#4af626]/30 bg-black/60",
          accent: "text-[#4af626]",
          pill: "bg-[#4af626]/10 border border-[#4af626]/30 text-[#4af626]"
        };
      case "Minimalist":
        return {
          bg: "bg-white border-zinc-200",
          text: "text-zinc-800 font-sans",
          card: "border border-zinc-200 bg-zinc-50",
          accent: "text-blue-600",
          pill: "bg-zinc-200 text-zinc-700"
        };
      default:
        return {
          bg: "bg-[#0c0d21] border-[#c084fc]/15",
          text: "text-foreground font-display",
          card: "glass-panel bg-white/2 border-white/5 shadow-glow",
          accent: "text-spark",
          pill: "bg-spark/10 border border-spark/20 text-spark"
        };
    }
  };
  const styles = getThemePreviewStyles();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: FolderHeart,
        title: "AI Portfolio Builder & Resume Parser",
        description: "Craft a high-performance developer portfolio website from form fields or automatically parse your existing resume using AI.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSavePortfolio,
            className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60 bg-gradient-spark text-primary-foreground font-semibold",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Portfolio" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-h-[85vh] overflow-y-auto pr-1", "data-lenis-prevent": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative overflow-hidden rounded-3xl bg-card/45 border-white/10 p-4 space-y-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xs font-bold text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-spark animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Resume Parser" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onDragOver: (e) => e.preventDefault(),
              onDrop: handleFileDrop,
              onClick: () => document.getElementById("resume-file-input")?.click(),
              className: "border border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-spark/50 transition bg-white/2 text-[11px] text-muted-foreground relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "file",
                    id: "resume-file-input",
                    accept: ".txt,.md,.json",
                    onChange: handleFileSelect,
                    className: "hidden"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-6 w-6 mx-auto mb-2 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Drag & Drop Resume TXT/MD/JSON here" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] opacity-60 mt-1", children: "Or click to select a file (PDF/Word? Paste below)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: rawResumeText,
              onChange: (e) => setRawResumeText(e.target.value),
              placeholder: "Paste raw resume text here to parse...",
              rows: 2,
              className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-[10px] text-foreground outline-none focus:border-spark resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => runResumeParser(rawResumeText),
              disabled: parsing,
              className: "w-full py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-purple-500/20 transition disabled:opacity-50",
              children: [
                parsing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parsing ? "Parsing Resume..." : "Run AI Resume Parser" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative overflow-hidden rounded-3xl bg-card/45 border-white/10 p-4 space-y-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xs font-bold text-foreground flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Custom Layout Prompt" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: customPrompt,
              onChange: (e) => setCustomPrompt(e.target.value),
              placeholder: "Describe a design (e.g. 'Vaporwave theme with neon purple borders and a Space Invader feel' or 'Minimalist green warm card layout')...",
              rows: 2,
              className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-[10px] text-foreground outline-none focus:border-spark resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: runCustomGenerator,
                disabled: generatingCustom,
                className: "flex-1 py-1.5 rounded-lg bg-gradient-spark text-primary-foreground font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-[1.02] transition disabled:opacity-50 shadow-glow",
                children: [
                  generatingCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-3.5 w-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: generatingCustom ? "Designing..." : customHtml ? "Update Design" : "Generate Custom Page" })
                ]
              }
            ),
            customHtml && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  playClick();
                  setCustomHtml(null);
                  setCustomPrompt("");
                  setSelectedTheme("Cyber");
                  toast.success("AI Custom design reset to default templates!");
                },
                className: "py-1.5 px-3 rounded-lg border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-muted-foreground hover:text-red-400 font-semibold text-[10px] uppercase tracking-wider transition",
                title: "Reset Layout",
                children: "Reset"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative overflow-hidden rounded-3xl bg-card/45 border-white/10 p-4 space-y-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xs font-bold text-foreground", children: "Developer Details Form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: fullName,
                  onChange: (e) => setFullName(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Focus Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: focusTitle,
                  onChange: (e) => setFocusTitle(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Contact Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "GitHub Link" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: github,
                    onChange: (e) => setGithub(e.target.value),
                    className: "w-full rounded-lg border border-white/10 bg-background px-2 py-1 text-[10px] text-foreground outline-none focus:border-spark"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "LinkedIn Link" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: linkedin,
                    onChange: (e) => setLinkedin(e.target.value),
                    className: "w-full rounded-lg border border-white/10 bg-background px-2 py-1 text-[10px] text-foreground outline-none focus:border-spark"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Technical Skills (comma list)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: skills,
                  onChange: (e) => setSkills(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Education" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: education,
                  onChange: (e) => setEducation(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Experience Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: experience,
                  onChange: (e) => setExperience(e.target.value),
                  rows: 2,
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Key Projects" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: projects,
                  onChange: (e) => setProjects(e.target.value),
                  rows: 2,
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Achievements & Awards" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: achievements,
                  onChange: (e) => setAchievements(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground mb-1", children: "Personal Hobbies & Interests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: hobbies,
                  onChange: (e) => setHobbies(e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass relative overflow-hidden rounded-3xl bg-card/45 border-white/10 p-4 space-y-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[9px] uppercase tracking-wider text-muted-foreground", children: "Theme Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1 font-semibold", children: ["Cyber", "Retro", "Minimalist", "AI-Custom"].map((theme) => {
            const disabled = theme === "AI-Custom" && !customHtml;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                disabled,
                onClick: () => {
                  playClick();
                  setSelectedTheme(theme);
                },
                className: `py-1.5 px-0.5 rounded-lg border text-[9px] uppercase tracking-wider text-center transition ${selectedTheme === theme ? "border-spark bg-spark/10 text-spark" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground disabled:opacity-30"}`,
                children: theme
              },
              theme
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: triggerExport,
              className: "w-full py-2 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition mt-2 text-xs flex items-center justify-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export Website Bundle" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex flex-col h-[85vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "h-3.5 w-3.5 text-spark" }),
            " Interactive Preview (Simulated browser)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] opacity-60 font-mono", children: [
            "Theme: ",
            selectedTheme
          ] })
        ] }),
        selectedTheme === "AI-Custom" && customHtml ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-3xl border border-white/10 overflow-hidden bg-white/5 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-2 border-b border-white/5 bg-black/40 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-red-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider opacity-60 font-mono text-spark", children: "http://localhost:3000/portfolio (AI CUSTOM LAYOUT)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setShowExportModal(true),
                className: "rounded bg-spark/20 border border-spark/30 px-2 py-0.5 text-spark hover:bg-spark/30 transition text-[9px]",
                children: "Code View"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              title: "AI Custom Portfolio Preview",
              srcDoc: getProcessedHtml(),
              className: "flex-1 w-full bg-white border-0"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex-1 rounded-3xl border p-6 overflow-y-auto flex flex-col justify-between transition-colors duration-500 ${styles.bg} ${styles.text}`,
            "data-lenis-prevent": true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-current/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-red-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider opacity-60 font-mono", children: "http://localhost:3000/portfolio" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display tracking-tight", children: fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xs font-semibold uppercase tracking-widest mt-1.5 ${styles.accent}`,
                      children: focusTitle
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 text-[10px] mt-2 opacity-85", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: email }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: github }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: linkedin })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-2.5", children: "Core Technical Skills" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: skills.split(",").map((skill) => skill.trim()).filter(Boolean).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-2 py-0.5 rounded text-[10px] font-semibold ${styles.pill}`,
                      children: skill
                    },
                    skill
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-1.5", children: "Education" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-normal", children: education })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-1.5", children: "Professional Experience" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-normal", children: experience })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-1.5", children: "Key Projects" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-normal", children: projects })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-2.5", children: "Ecosystem Achievements" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 text-[10px] font-mono", children: achievements.split(",").map((ach) => ach.trim()).filter(Boolean).map((ach, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-lg",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ach })
                      ]
                    },
                    i
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 rounded-2xl ${styles.card}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider mb-1.5", children: "Hobbies & Interests" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-normal", children: hobbies })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-[9px] opacity-50 pt-4 border-t border-current/10 mt-6", children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " ",
                fullName,
                ". Built using ProjectSpark OS."
              ] })
            ]
          }
        )
      ] })
    ] }),
    showExportModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[540px] rounded-3xl border border-white/10 bg-card p-6 shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setShowExportModal(false),
          className: "absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-bold text-foreground mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "h-5 w-5 text-spark" }),
        " Export HTML/CSS Code Bundle"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Paste this code inside an index.html file to launch your website on any static server." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          readOnly: true,
          value: getExportCode(),
          rows: 12,
          className: "w-full rounded-xl border border-white/10 bg-background/50 p-4 font-mono text-[10px] leading-relaxed text-spark outline-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowExportModal(false),
            className: "px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-foreground transition",
            children: "Close"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleCopyCode,
            className: "px-4.5 py-2 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition text-xs flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copy Code" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter$d = () => import("../_app.mentor-DsF-VBHs.mjs");
const mentorSearchSchema = objectType({
  node: stringType().optional(),
  restoreId: stringType().optional()
});
const Route$i = createFileRoute("/_app/mentor")({
  validateSearch: mentorSearchSchema,
  head: () => ({
    meta: [{
      title: "AI Mentor — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const Route$h = createFileRoute("/_app/marketplace")({
  head: () => ({ meta: [{ title: "Project Marketplace — ProjectSpark" }] }),
  component: ProjectMarketplace
});
const INITIAL_POSTS = [
  {
    id: "post-1",
    type: "Startup",
    title: "AI Healthcare Diagnostics Portal",
    domain: "Artificial Intelligence & Health",
    description: "Building an automated chest X-ray scanner using vision transformers and React dashboard, offering doctor assistance.",
    author: "arun_singh",
    roles: ["ML Engineer", "Frontend Dev", "UI Designer"],
    suggestedRoles: [
      {
        role: "ML Engineer (Vision)",
        matchPct: 98,
        reason: "Requires PyTorch & Vision Transformers experience."
      },
      {
        role: "Frontend Dev (React)",
        matchPct: 92,
        reason: "Requires clean UI, responsive cards, and state synchronization."
      },
      { role: "UI Designer", matchPct: 85, reason: "Requires glassmorphism dashboards design." }
    ],
    likes: 24,
    applicants: 5
  },
  {
    id: "post-2",
    type: "Research",
    title: "Zero-Knowledge Proofs for IoT Hubs",
    domain: "Cybersecurity & Blockchain",
    description: "Developing cryptography protocols for small embedded devices to assert authenticity without leaking device IDs.",
    author: "lisa_m",
    roles: ["Crypto Specialist", "IoT dev"],
    suggestedRoles: [
      {
        role: "Crypto Specialist",
        matchPct: 95,
        reason: "Deep mathematical ZK protocol alignment."
      },
      { role: "IoT Firmware Dev", matchPct: 88, reason: "C/Rust embedded hardware constraints." }
    ],
    likes: 18,
    applicants: 2
  },
  {
    id: "post-3",
    type: "Idea",
    title: "EcoSpark Carbon Tracker extension",
    domain: "SaaS & Sustainability",
    description: "Browser extension that audits your cloud resources and estimates real-time carbon footprints of hosting servers.",
    author: "dan_code",
    roles: ["Extension Specialist", "Backend Dev"],
    suggestedRoles: [
      {
        role: "Extension Specialist",
        matchPct: 90,
        reason: "Manifest v3 Chrome extensions skills."
      },
      { role: "Backend Engineer", matchPct: 84, reason: "AWS/GCP API cost reporting parser." }
    ],
    likes: 12,
    applicants: 3
  }
];
function ProjectMarketplace() {
  const [posts, setPosts] = reactExports.useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [formType, setFormType] = reactExports.useState("Idea");
  const [formTitle, setFormTitle] = reactExports.useState("");
  const [formDomain, setFormDomain] = reactExports.useState("");
  const [formDesc, setFormDesc] = reactExports.useState("");
  const [formRoles, setFormRoles] = reactExports.useState("");
  const [matchingRoles, setMatchingRoles] = reactExports.useState(null);
  const [matchRunning, setMatchRunning] = reactExports.useState(false);
  const runMatchmaker = () => {
    if (!formTitle || !formDesc) {
      toast.error("Please enter a title and description first.");
      return;
    }
    playClick();
    setMatchRunning(true);
    setMatchingRoles(null);
    setTimeout(() => {
      playSuccess();
      const mockMatches = [
        {
          role: `${formType === "Research" ? "Research Assistant" : "Product Manager"}`,
          matchPct: 94,
          reason: `Matches scope of "${formTitle}" description.`
        },
        {
          role: "Full Stack Engineer",
          matchPct: 90,
          reason: "Required to construct the functional prototype."
        },
        {
          role: `${formDomain.includes("AI") || formDesc.toLowerCase().includes("ai") ? "ML Engineer" : "UI/UX Developer"}`,
          matchPct: 88,
          reason: "Matches key tech stack requirements."
        }
      ];
      setMatchingRoles(mockMatches);
      setMatchRunning(false);
      awardXP(25, "Used AI Matchmaker");
      toast.success("AI suggested matching team structure!");
    }, 1500);
  };
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formDesc || !formDomain) {
      toast.error("Please fill out all fields.");
      return;
    }
    playSuccess();
    const newPost = {
      id: `post-${Date.now()}`,
      type: formType,
      title: formTitle,
      domain: formDomain,
      description: formDesc,
      author: "you (Growth Builder)",
      roles: formRoles.split(",").map((r) => r.trim()).filter(Boolean),
      suggestedRoles: matchingRoles || [
        { role: "General Collaborator", matchPct: 85, reason: "Help kickstart the repository." }
      ],
      likes: 0,
      applicants: 0
    };
    setPosts([newPost, ...posts]);
    setShowAddForm(false);
    setFormTitle("");
    setFormDomain("");
    setFormDesc("");
    setFormRoles("");
    setMatchingRoles(null);
    awardXP(50, `Posted a ${formType}`);
    toast.success(`${formType} posted to the marketplace!`);
  };
  const handleApply = (postId) => {
    playSuccess();
    setPosts(
      (prev) => prev.map((p) => {
        if (p.id === postId) {
          const already = !!p.hasApplied;
          return {
            ...p,
            applicants: p.applicants + (already ? -1 : 1),
            hasApplied: !already
          };
        }
        return p;
      })
    );
    toast.success("Application submitted! The team creator has been notified.");
    awardXP(15, "Applied to collaborate");
  };
  const handleLike = (postId) => {
    playClick();
    setPosts(
      (prev) => prev.map((p) => {
        if (p.id === postId) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      })
    );
  };
  const filteredPosts = posts.filter((p) => {
    if (activeFilter === "All") return true;
    return p.type === activeFilter;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: ShoppingBag,
        title: "Project Marketplace & Matchmaker",
        description: "Launch startup prototypes, post problem statements, form teams, and use AI Matchmaking to find the perfect collaborators.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              playClick();
              setShowAddForm(!showAddForm);
            },
            onMouseEnter: playHover,
            className: "inline-flex items-center gap-2 rounded-xl bg-gradient-spark px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Post Project / Idea" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: showAddForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 space-y-4 animate-in fade-in duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Post to Ecosystem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowAddForm(false),
              className: "text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePostSubmit, className: "space-y-3.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Ecosystem Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: ["Idea", "Problem", "Startup", "Research"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  playClick();
                  setFormType(t);
                },
                className: `py-1.5 px-2 rounded-lg border text-center font-medium transition ${formType === t ? "border-spark bg-spark/10 text-spark" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground"}`,
                children: t
              },
              t
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: formTitle,
                onChange: (e) => setFormTitle(e.target.value),
                placeholder: "e.g. Decentralized Voting app",
                className: "w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: formDomain,
                onChange: (e) => setFormDomain(e.target.value),
                placeholder: "e.g. Web3, Cybersecurity",
                className: "w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Brief Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: formDesc,
                onChange: (e) => setFormDesc(e.target.value),
                placeholder: "Describe your goal, tech stack, and what you aim to build.",
                rows: 3,
                className: "w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark resize-none",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Roles Needed (comma-separated)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: formRoles,
                onChange: (e) => setFormRoles(e.target.value),
                placeholder: "e.g. React Developer, UI Designer",
                className: "w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: runMatchmaker,
              disabled: matchRunning,
              className: "w-full py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold flex items-center justify-center gap-1.5 hover:bg-purple-500/20 transition disabled:opacity-50",
              children: [
                matchRunning ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: matchRunning ? "Running Matchmaker..." : "AI Team Matchmaker" })
              ]
            }
          ),
          matchingRoles && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 space-y-2 animate-in slide-in-from-top-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3 w-3 animate-pulse" }),
              " AI Matchmaker Recommendations"
            ] }),
            matchingRoles.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: match.role }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-purple-400 font-mono", children: [
                  match.matchPct,
                  "% match"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px]", children: match.reason })
            ] }, i))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "w-full py-2 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition mt-2",
              children: "Publish to Marketplace"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Ecosystem Matchmaking Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "ProjectSpark scans domain, required skills, and study records to pair you with the best collaborators. Generate role recommendations instantly with the AI tool." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/5 bg-white/2 p-3 space-y-2.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Match score multiplier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Based on current roadmap nodes." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-orange-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Active team boost" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Collaborators with high XP are bumped." })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto pb-1", "data-lenis-prevent": true, children: ["All", "Idea", "Problem", "Startup", "Research"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              playClick();
              setActiveFilter(f);
            },
            className: `px-4 py-1.5 rounded-full text-xs font-semibold border transition ${activeFilter === f ? "border-spark bg-spark/15 text-foreground" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground"}`,
            children: f === "All" ? "All Posts" : f
          },
          f
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: filteredPosts.map((post) => {
          const typeColors = {
            Idea: "bg-blue-500/10 border-blue-500/20 text-blue-400",
            Problem: "bg-red-500/10 border-red-500/20 text-red-400",
            Startup: "bg-purple-500/10 border-purple-500/20 text-purple-400",
            Research: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${typeColors[post.type]}`,
                      children: post.type
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
                    "Posted by @",
                    post.author
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold text-foreground mt-2", children: post.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-spark font-medium uppercase tracking-wider mt-0.5", children: post.domain })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  post.applicants,
                  " applied"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: post.description }),
            post.suggestedRoles && post.suggestedRoles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/5 bg-white/2 p-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5 text-spark" }),
                " Suggested Team Matchmaking"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3", children: post.suggestedRoles.map((roleObj, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-lg border border-white/5 bg-black/20 p-2 flex flex-col justify-between",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-[10px] font-semibold text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: roleObj.role }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400", children: [
                        roleObj.matchPct,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground leading-tight mt-1", children: roleObj.reason })
                  ] })
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-2 border-t border-white/5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleLike(post.id),
                  className: "flex items-center gap-1.5 text-muted-foreground hover:text-red-400 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      post.likes,
                      " Likes"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleApply(post.id),
                  className: `px-4.5 py-1.5 rounded-xl font-semibold border transition flex items-center gap-1.5 ${post.hasApplied ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-gradient-spark text-primary-foreground shadow-glow hover:opacity-95"}`,
                  children: post.hasApplied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Applied" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Apply to Team" })
                  ] })
                }
              )
            ] })
          ] }, post.id);
        }) })
      ] })
    ] })
  ] });
}
const DSA_SHEET_TOPICS = [
  // ─── Arrays ──────────────────────────────────────────────────────────────
  {
    id: "arrays-1",
    name: "Arrays (Part 1)",
    color: "blue",
    questions: [
      {
        id: 1,
        title: "Maximum and Minimum Element in an Array",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/",
        companies: [
          "Amazon",
          "Microsoft",
          "Google",
          "Adobe",
          "Cisco",
          "Hike",
          "Snapdeal",
          "VMware",
          "Accolite",
          "ABCO"
        ]
      },
      {
        id: 2,
        title: "Reverse the Array",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/",
        companies: ["Infosys", "Moonfrog Labs", "Microsoft"]
      },
      {
        id: 3,
        title: "Maximum Subarray (Kadane's Algorithm)",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/maximum-subarray/",
        companies: ["Microsoft", "Facebook", "Amazon", "Google", "Samsung"]
      },
      {
        id: 4,
        title: "Contains Duplicate",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/contains-duplicate/",
        companies: ["Amazon", "Google", "Apple"]
      },
      {
        id: 5,
        title: "Chocolate Distribution Problem",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/chocolate-distribution-problem/",
        companies: ["Amazon", "Directi"]
      },
      {
        id: 6,
        title: "Search an Element in a Sorted and Pivoted Array",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/",
        companies: [
          "Microsoft",
          "Google",
          "Adobe",
          "Amazon",
          "D-E-Shaw",
          "Flipkart",
          "Hike",
          "Intuit",
          "MakeMyTrip",
          "Paytm"
        ]
      },
      {
        id: 7,
        title: "Next Permutation",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/next-permutation/",
        companies: ["Uber", "Goldman Sachs", "Adobe", "Google", "Microsoft", "infoBEADS"]
      },
      {
        id: 8,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        companies: [
          "Amazon",
          "D-E-Shaw",
          "Directi",
          "Flipkart",
          "Goldman Sachs",
          "Intuit",
          "MakeMyTrip",
          "Microsoft",
          "Ola",
          "Oracle",
          "Paytm",
          "Pubmatic",
          "Quikr",
          "Salesforce",
          "Sapient",
          "Swiggy",
          "Walmart",
          "Media.net",
          "Google"
        ]
      },
      {
        id: 9,
        title: "Repeat and Missing Number Array",
        difficulty: "Medium",
        url: "https://www.interviewbit.com/problems/repeat-and-missing-number-array/",
        companies: ["Amazon", "Paytm", "OYO Rooms"]
      },
      {
        id: 10,
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        companies: ["Amazon", "Microsoft", "Walmart", "Adobe", "Facebook"]
      },
      {
        id: 11,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/trapping-rain-water/",
        companies: ["Samsung", "Amazon", "Google", "Microsoft", "Facebook", "Adobe"]
      },
      {
        id: 12,
        title: "Product of Array Except Self",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/product-of-array-except-self/",
        companies: ["Microsoft", "Facebook", "Amazon", "Lyft", "Asana"]
      },
      {
        id: 13,
        title: "Maximum Product Subarray",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/maximum-product-subarray/",
        companies: [
          "Amazon",
          "D-E-Shaw",
          "Microsoft",
          "Morgan Stanley",
          "OYO Rooms",
          "Google",
          "Flipkart"
        ]
      }
    ]
  },
  {
    id: "arrays-2",
    name: "Arrays (Part 2)",
    color: "blue",
    questions: [
      {
        id: 14,
        title: "Find Minimum in Rotated Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        companies: [
          "Adobe",
          "Amazon",
          "Microsoft",
          "Morgan Stanley",
          "Samsung",
          "Snapdeal",
          "Times Internet"
        ]
      },
      {
        id: 15,
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        companies: ["Microsoft", "Google", "Apple", "Amazon", "Facebook"]
      },
      {
        id: 16,
        title: "3Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/3sum/",
        companies: [
          "Adobe",
          "Amazon",
          "Microsoft",
          "Morgan Stanley",
          "Samsung",
          "Snapdeal",
          "Times Internet",
          "Google"
        ]
      },
      {
        id: 17,
        title: "Container With Most Water",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/container-with-most-water/",
        companies: ["Flipkart", "Dunzo", "Google", "Amazon"]
      },
      {
        id: 18,
        title: "Given Sum Pair",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/given-a-sorted-and-rotated-array-find-if-there-is-a-pair-with-a-given-sum/",
        companies: ["Infosys", "Amazon", "Flipkart"]
      },
      {
        id: 19,
        title: "Kth Smallest Element",
        difficulty: "Medium",
        url: "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1",
        companies: [
          "Amazon",
          "Microsoft",
          "Google",
          "Adobe",
          "Cisco",
          "ABCO",
          "Accolite",
          "Hike",
          "Snapdeal",
          "VMware"
        ]
      },
      {
        id: 20,
        title: "Merge Overlapping Intervals",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/merging-intervals/",
        companies: ["Google", "Amazon", "Microsoft", "Facebook", "Bloomberg"]
      },
      {
        id: 21,
        title: "Find Minimum Number of Merge Operations to Make an Array Palindrome",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/find-minimum-number-of-merge-operations-to-make-an-array-palindrome/",
        companies: ["Amazon"]
      },
      {
        id: 22,
        title: "Given an Array of Numbers Arrange the Numbers to Form the Biggest Number",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/",
        companies: ["Barclays", "Amazon"]
      },
      {
        id: 23,
        title: "Space Optimization Using Bit Manipulations",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/space-optimization-using-bit-manipulations/",
        companies: ["Amazon"]
      },
      {
        id: 24,
        title: "Subarray Sum Divisible by K",
        difficulty: "Hard",
        url: "https://www.geeksforgeeks.org/longest-subarray-sum-divisible-k/",
        companies: ["Snapdeal", "Microsoft"]
      },
      {
        id: 25,
        title: "Print all Possible Combinations of r Elements in a Given Array of Size n",
        difficulty: "Hard",
        url: "https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/",
        companies: ["Amazon"]
      },
      {
        id: 26,
        title: "Mo's Algorithm",
        difficulty: "Hard",
        url: "https://www.geeksforgeeks.org/mos-algorithm-query-square-root-decomposition-set-1-introduction/",
        companies: ["Microsoft"]
      }
    ]
  },
  // ─── Strings ─────────────────────────────────────────────────────────────
  {
    id: "strings",
    name: "Strings",
    color: "purple",
    questions: [
      {
        id: 27,
        title: "Valid Palindrome",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-palindrome/",
        companies: [
          "Amazon",
          "Cisco",
          "D-E-Shaw",
          "Facebook",
          "FactSet",
          "Morgan Stanley",
          "Paytm",
          "Zoho",
          "Capgemini"
        ]
      },
      {
        id: 28,
        title: "Valid Anagram",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-anagram/",
        companies: ["Nagarro", "Media.net", "Directi", "Google", "Adobe", "Flipkart"]
      },
      {
        id: 29,
        title: "Valid Parentheses",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-parentheses/",
        companies: ["Google", "Amazon", "Microsoft", "Facebook", "Adobe"]
      },
      {
        id: 30,
        title: "Remove Consecutive Characters",
        difficulty: "Easy",
        url: "https://practice.geeksforgeeks.org/problems/consecutive-elements2306/1",
        companies: ["Samsung", "Adobe"]
      },
      {
        id: 31,
        title: "Longest Common Prefix",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/longest-common-prefix/",
        companies: ["Adobe", "Grofers", "Dunzo", "Google"]
      },
      {
        id: 32,
        title: "Convert a Sentence into its Equivalent Mobile Numeric Keypad Sequence",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/convert-sentence-equivalent-mobile-numeric-keypad-sequence/",
        companies: ["Adobe"]
      },
      {
        id: 33,
        title: "Print all the Duplicates in the Input String",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string/",
        companies: ["Ola", "Amdocs"]
      },
      {
        id: 34,
        title: "Longest Substring without Repeating Characters",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        companies: ["Morgan Stanley", "Amazon", "Google", "Facebook", "Microsoft", "Uber"]
      },
      {
        id: 35,
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
        companies: ["Amazon", "Google"]
      },
      {
        id: 36,
        title: "Group Anagrams",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/group-anagrams/",
        companies: ["Samsung", "Adobe", "Amazon", "Google", "Facebook"]
      },
      {
        id: 37,
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-palindromic-substring/",
        companies: ["Microsoft", "Google", "Samsung", "Visa"]
      },
      {
        id: 38,
        title: "Palindromic Substrings",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/palindromic-substrings/",
        companies: ["Microsoft", "Facebook"]
      },
      {
        id: 39,
        title: "Next Permutation (Strings)",
        difficulty: "Medium",
        url: "https://practice.geeksforgeeks.org/problems/next-permutation5226/1",
        companies: ["Adobe", "Goldman Sachs", "Uber"]
      }
    ]
  },
  // ─── Linked List ─────────────────────────────────────────────────────────
  {
    id: "linked-list-1",
    name: "Linked List (Part 1)",
    color: "green",
    questions: [
      {
        id: 40,
        title: "Reverse a Linked List",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/reverse-linked-list/",
        companies: [
          "Amazon",
          "Adobe",
          "Microsoft",
          "Facebook",
          "Apple",
          "Uber",
          "Google",
          "Paytm",
          "Zoho"
        ]
      },
      {
        id: 41,
        title: "Middle of the Linked List",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/middle-of-the-linked-list/",
        companies: ["Amazon", "Microsoft", "Google", "Adobe"]
      },
      {
        id: 42,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/merge-two-sorted-lists/",
        companies: ["Amazon", "Microsoft", "Apple", "Google", "Bloomberg", "Accolite"]
      },
      {
        id: 43,
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        companies: ["Amazon", "Microsoft", "Apple", "Bloomberg", "Facebook"]
      },
      {
        id: 44,
        title: "Linked List Cycle",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/linked-list-cycle/",
        companies: ["Amazon", "Bloomberg", "Microsoft", "Adobe", "Belzabar"]
      },
      {
        id: 45,
        title: "Linked List Cycle II (Floyd's Algorithm)",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/linked-list-cycle-ii/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Hike"]
      },
      {
        id: 46,
        title: "Palindrome Linked List",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/palindrome-linked-list/",
        companies: ["Amazon", "Facebook", "Uber", "Microsoft"]
      },
      {
        id: 47,
        title: "Reorder List",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/reorder-list/",
        companies: ["Amazon", "Bloomberg"]
      },
      {
        id: 48,
        title: "LRU Cache",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/lru-cache/",
        companies: [
          "Amazon",
          "Microsoft",
          "Bloomberg",
          "Google",
          "Uber",
          "Facebook",
          "Paytm",
          "Oracle"
        ]
      }
    ]
  },
  {
    id: "linked-list-2",
    name: "Linked List (Part 2)",
    color: "green",
    questions: [
      {
        id: 49,
        title: "Copy List with Random Pointer",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/copy-list-with-random-pointer/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Google"]
      },
      {
        id: 50,
        title: "Sort List",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/sort-list/",
        companies: ["Facebook", "Amazon", "Google"]
      },
      {
        id: 51,
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/merge-k-sorted-lists/",
        companies: ["Amazon", "Microsoft", "Uber", "Google", "Facebook", "LinkedIn", "Airbnb"]
      },
      {
        id: 52,
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
        companies: ["Microsoft", "Amazon", "Facebook", "Google"]
      },
      {
        id: 53,
        title: "Remove Duplicates from Sorted List",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
        companies: ["Microsoft", "Amazon", "Qualcomm", "Cognizant"]
      },
      {
        id: 54,
        title: "Add Two Numbers",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/add-two-numbers/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Airbnb", "Facebook", "Google"]
      },
      {
        id: 55,
        title: "Intersection of Two Linked Lists",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Airbnb"]
      }
    ]
  },
  // ─── Binary Trees ────────────────────────────────────────────────────────
  {
    id: "trees-1",
    name: "Binary Trees (Part 1)",
    color: "teal",
    questions: [
      {
        id: 56,
        title: "Inorder Traversal",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Facebook", "Adobe", "Samsung"]
      },
      {
        id: 57,
        title: "Preorder Traversal",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
        companies: ["Amazon", "Microsoft", "Adobe"]
      },
      {
        id: 58,
        title: "Postorder Traversal",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
        companies: ["Amazon", "Microsoft", "Adobe"]
      },
      {
        id: 59,
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        companies: ["Amazon", "LinkedIn", "Apple", "Facebook", "Adobe"]
      },
      {
        id: 60,
        title: "Same Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/same-tree/",
        companies: ["Bloomberg", "Amazon", "Microsoft"]
      },
      {
        id: 61,
        title: "Symmetric Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/symmetric-tree/",
        companies: ["LinkedIn", "Bloomberg", "Microsoft", "Adobe"]
      },
      {
        id: 62,
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        companies: ["Amazon", "Facebook", "Bloomberg", "Microsoft", "Uber", "ByteDance"]
      },
      {
        id: 63,
        title: "Binary Tree Zigzag Level Order Traversal",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
        companies: ["Amazon", "LinkedIn", "Bloomberg", "Microsoft"]
      },
      {
        id: 64,
        title: "Path Sum",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/path-sum/",
        companies: ["Amazon", "Microsoft", "Bloomberg"]
      },
      {
        id: 65,
        title: "Binary Tree Maximum Path Sum",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
        companies: ["Amazon", "Microsoft", "Facebook", "Google", "Baidu"]
      }
    ]
  },
  {
    id: "trees-2",
    name: "Binary Trees (Part 2)",
    color: "teal",
    questions: [
      {
        id: 66,
        title: "Lowest Common Ancestor of Binary Tree",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        companies: ["Facebook", "Amazon", "Microsoft", "LinkedIn", "Uber", "Coursera"]
      },
      {
        id: 67,
        title: "Binary Tree Right Side View",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/binary-tree-right-side-view/",
        companies: ["Facebook", "Amazon", "Microsoft", "Google"]
      },
      {
        id: 68,
        title: "Count Good Nodes in Binary Tree",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
        companies: ["Microsoft", "Google"]
      },
      {
        id: 69,
        title: "Validate Binary Search Tree",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/validate-binary-search-tree/",
        companies: ["Amazon", "Bloomberg", "Facebook", "Microsoft", "Adobe", "Apple"]
      },
      {
        id: 70,
        title: "Kth Smallest Element in a BST",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        companies: ["Facebook", "Amazon", "Bloomberg", "Microsoft", "Uber", "Zillow"]
      },
      {
        id: 71,
        title: "Construct Binary Tree from Preorder and Inorder",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Facebook", "Apple"]
      },
      {
        id: 72,
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
        companies: ["Amazon", "Microsoft", "Facebook", "Google", "LinkedIn", "Palantir"]
      },
      {
        id: 73,
        title: "Convert Sorted Array to Binary Search Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
        companies: ["Airbnb", "Amazon", "Microsoft"]
      },
      {
        id: 74,
        title: "Invert Binary Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/invert-binary-tree/",
        companies: ["Amazon", "Google", "Uber", "Apple"]
      }
    ]
  },
  {
    id: "trees-3",
    name: "Binary Trees (Part 3 — BST)",
    color: "teal",
    questions: [
      {
        id: 75,
        title: "Insert into a Binary Search Tree",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
        companies: ["Amazon", "Microsoft", "Bloomberg"]
      },
      {
        id: 76,
        title: "Delete Node in a BST",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/delete-node-in-a-bst/",
        companies: ["Amazon", "Facebook", "Bloomberg"]
      },
      {
        id: 77,
        title: "Search in a Binary Search Tree",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
        companies: ["Amazon", "Oracle", "Microsoft"]
      },
      {
        id: 78,
        title: "Lowest Common Ancestor of BST",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
        companies: ["Amazon", "Facebook", "Bloomberg", "LinkedIn", "Adobe"]
      },
      {
        id: 79,
        title: "Two Sum IV - Input is a BST",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
        companies: ["Amazon", "Facebook"]
      },
      {
        id: 80,
        title: "Flatten Binary Tree to Linked List",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
        companies: ["Microsoft", "Amazon", "Mathworks"]
      },
      {
        id: 81,
        title: "Binary Tree from Inorder and Postorder",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
        companies: ["Amazon", "Microsoft"]
      }
    ]
  },
  // ─── Graph ───────────────────────────────────────────────────────────────
  {
    id: "graphs-1",
    name: "Graphs (Part 1)",
    color: "pink",
    questions: [
      {
        id: 82,
        title: "Number of Islands",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-islands/",
        companies: ["Amazon", "Bloomberg", "Facebook", "Google", "Microsoft", "Uber", "DoorDash"]
      },
      {
        id: 83,
        title: "Clone Graph",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/clone-graph/",
        companies: ["Facebook", "Amazon", "Bloomberg", "Google"]
      },
      {
        id: 84,
        title: "Max Area of Island",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/max-area-of-island/",
        companies: ["Amazon", "Facebook", "DoorDash", "Google"]
      },
      {
        id: 85,
        title: "Pacific Atlantic Water Flow",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
        companies: ["Google", "Amazon", "Goldman Sachs"]
      },
      {
        id: 86,
        title: "Surrounded Regions",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/surrounded-regions/",
        companies: ["Amazon", "Snapchat"]
      },
      {
        id: 87,
        title: "Rotting Oranges",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/rotting-oranges/",
        companies: ["Amazon", "Bloomberg", "Facebook", "Adobe"]
      },
      {
        id: 88,
        title: "Course Schedule",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/course-schedule/",
        companies: ["Amazon", "Apple", "Airbnb", "Bloomberg", "Facebook", "Zenefits", "Robinhood"]
      },
      {
        id: 89,
        title: "Course Schedule II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/course-schedule-ii/",
        companies: ["Amazon", "Facebook", "Bloomberg", "Google", "Uber", "Quora"]
      },
      {
        id: 90,
        title: "Detect Cycle in Directed Graph",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/",
        companies: ["Samsung", "Microsoft", "Amazon"]
      }
    ]
  },
  {
    id: "graphs-2",
    name: "Graphs (Part 2 — Shortest Path)",
    color: "pink",
    questions: [
      {
        id: 91,
        title: "Number of Connected Components in Undirected Graph",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        companies: ["LinkedIn", "Google", "Amazon", "Facebook"]
      },
      {
        id: 92,
        title: "Graph Valid Tree",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/graph-valid-tree/",
        companies: ["LinkedIn", "Google", "Apple"]
      },
      {
        id: 93,
        title: "Word Ladder",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/word-ladder/",
        companies: ["Amazon", "Facebook", "Bloomberg", "LinkedIn", "Snapchat", "Yelp"]
      },
      {
        id: 94,
        title: "Alien Dictionary",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/alien-dictionary/",
        companies: ["Google", "Facebook", "Airbnb", "Snapchat", "Pocket Gems", "Uber"]
      },
      {
        id: 95,
        title: "Dijkstra's Algorithm (Shortest Path)",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
        companies: ["Amazon", "Google", "Microsoft", "Uber", "LinkedIn", "Flipkart"]
      },
      {
        id: 96,
        title: "Redundant Connection",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/redundant-connection/",
        companies: ["Amazon", "Google"]
      },
      {
        id: 97,
        title: "Network Delay Time",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/network-delay-time/",
        companies: ["Google", "Amazon", "Bloomberg"]
      },
      {
        id: 98,
        title: "Cheapest Flights Within K Stops",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        companies: ["Amazon", "Google", "Facebook", "Booking.com", "Grab"]
      }
    ]
  },
  // ─── Stacks ──────────────────────────────────────────────────────────────
  {
    id: "stacks",
    name: "Stacks",
    color: "orange",
    questions: [
      {
        id: 99,
        title: "Valid Parentheses",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/valid-parentheses/",
        companies: ["Amazon", "Bloomberg", "Microsoft", "Facebook", "Google", "Adobe"]
      },
      {
        id: 100,
        title: "Min Stack",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/min-stack/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Uber", "Apple"]
      },
      {
        id: 101,
        title: "Next Greater Element I",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/next-greater-element-i/",
        companies: ["Google", "Amazon", "Microsoft", "Bloomberg"]
      },
      {
        id: 102,
        title: "Daily Temperatures",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/daily-temperatures/",
        companies: ["Google", "Amazon", "Uber", "Bloomberg"]
      },
      {
        id: 103,
        title: "Evaluate Reverse Polish Notation",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
        companies: ["LinkedIn", "Amazon", "eBay", "Google"]
      },
      {
        id: 104,
        title: "Generate Parentheses",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/generate-parentheses/",
        companies: ["Google", "Amazon", "Microsoft", "Facebook", "Twitter"]
      },
      {
        id: 105,
        title: "Largest Rectangle in Histogram",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        companies: ["Amazon", "Google", "Microsoft", "Nvidia"]
      },
      {
        id: 106,
        title: "Sliding Window Maximum",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/sliding-window-maximum/",
        companies: ["Amazon", "Google", "Microsoft", "LinkedIn", "Zenefits"]
      },
      {
        id: 107,
        title: "Implement Stack using Queues",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/implement-stack-using-queues/",
        companies: ["Amazon", "Microsoft", "Bloomberg"]
      }
    ]
  },
  // ─── Queues ──────────────────────────────────────────────────────────────
  {
    id: "queues",
    name: "Queues",
    color: "orange",
    questions: [
      {
        id: 108,
        title: "Implement Queue using Stacks",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/implement-queue-using-stacks/",
        companies: ["Microsoft", "Amazon", "Bloomberg"]
      },
      {
        id: 109,
        title: "Design Circular Queue",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/design-circular-queue/",
        companies: ["Microsoft", "Google", "Apple"]
      },
      {
        id: 110,
        title: "Number of Recent Calls",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/number-of-recent-calls/",
        companies: ["Google", "Amazon"]
      },
      {
        id: 111,
        title: "Walls and Gates",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/walls-and-gates/",
        companies: ["Facebook", "Google", "Amazon"]
      },
      {
        id: 112,
        title: "Shortest Path in Binary Matrix",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        companies: ["Amazon", "Google", "Facebook", "Bloomberg"]
      }
    ]
  },
  // ─── Binary Heaps ────────────────────────────────────────────────────────
  {
    id: "binary-heaps",
    name: "Binary Heaps",
    color: "rose",
    questions: [
      {
        id: 113,
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        companies: ["Amazon", "Facebook", "Google", "Microsoft", "Walmart", "Adobe"]
      },
      {
        id: 114,
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/top-k-frequent-elements/",
        companies: ["Amazon", "Facebook", "Google", "Yelp", "Roblox"]
      },
      {
        id: 115,
        title: "Find Median from Data Stream",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/find-median-from-data-stream/",
        companies: ["Amazon", "Microsoft", "Bloomberg", "Google", "Twitter"]
      },
      {
        id: 116,
        title: "Task Scheduler",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/task-scheduler/",
        companies: ["Facebook", "Microsoft", "Amazon", "Coupang"]
      },
      {
        id: 117,
        title: "Design Twitter",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/design-twitter/",
        companies: ["Amazon", "Facebook", "Twitter", "Bloomberg"]
      },
      {
        id: 118,
        title: "K Closest Points to Origin",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/k-closest-points-to-origin/",
        companies: ["Amazon", "Facebook", "Google", "LinkedIn", "Asana"]
      }
    ]
  },
  // ─── Hashmaps ────────────────────────────────────────────────────────────
  {
    id: "hashmaps",
    name: "Hashmaps",
    color: "amber",
    questions: [
      {
        id: 119,
        title: "Two Sum",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/two-sum/",
        companies: [
          "Amazon",
          "Adobe",
          "Apple",
          "Bloomberg",
          "Facebook",
          "Google",
          "Microsoft",
          "Uber",
          "Yahoo",
          "Dropbox",
          "Airbnb"
        ]
      },
      {
        id: 120,
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-consecutive-sequence/",
        companies: ["Google", "Amazon", "Microsoft", "Facebook", "Wish", "Bloomberg"]
      },
      {
        id: 121,
        title: "Subarray Sum Equals K",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/subarray-sum-equals-k/",
        companies: ["Facebook", "Amazon", "Google", "Microsoft", "Snapchat"]
      },
      {
        id: 122,
        title: "Four Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/4sum/",
        companies: ["Amazon", "Google", "Yahoo", "Adobe"]
      },
      {
        id: 123,
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/encode-and-decode-strings/",
        companies: ["Google", "Facebook", "Amazon", "Snapchat"]
      },
      {
        id: 124,
        title: "Valid Sudoku",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/valid-sudoku/",
        companies: ["Amazon", "Uber", "Apple", "Bloomberg"]
      },
      {
        id: 125,
        title: "First Missing Positive",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/first-missing-positive/",
        companies: ["Amazon", "Microsoft", "Apple", "Airbnb", "Bloomberg"]
      }
    ]
  },
  // ─── Tries ───────────────────────────────────────────────────────────────
  {
    id: "tries",
    name: "Tries",
    color: "emerald",
    questions: [
      {
        id: 126,
        title: "Implement Trie (Prefix Tree)",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        companies: ["Amazon", "Facebook", "Google", "Microsoft", "Uber", "Twitter", "Bloomberg"]
      },
      {
        id: 127,
        title: "Design Add and Search Words Data Structure",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        companies: ["Facebook", "Amazon", "Google", "Dropbox"]
      },
      {
        id: 128,
        title: "Word Search II",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/word-search-ii/",
        companies: ["Amazon", "Airbnb", "Google", "Microsoft", "Yelp"]
      },
      {
        id: 129,
        title: "Replace Words",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/replace-words/",
        companies: ["Amazon", "Google"]
      },
      {
        id: 130,
        title: "Maximum XOR of Two Numbers in Array",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        companies: ["Facebook", "Amazon", "Google"]
      }
    ]
  },
  // ─── Backtracking ────────────────────────────────────────────────────────
  {
    id: "backtracking",
    name: "Backtracking",
    color: "red",
    questions: [
      {
        id: 131,
        title: "Subsets",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/subsets/",
        companies: ["Amazon", "Facebook", "Bloomberg", "Google"]
      },
      {
        id: 132,
        title: "Combination Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/combination-sum/",
        companies: ["Amazon", "Facebook", "Snapchat", "Microsoft"]
      },
      {
        id: 133,
        title: "Combination Sum II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/combination-sum-ii/",
        companies: ["Amazon", "Facebook"]
      },
      {
        id: 134,
        title: "Permutations",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/permutations/",
        companies: ["LinkedIn", "Amazon", "Google", "Microsoft", "Bloomberg", "Facebook"]
      },
      {
        id: 135,
        title: "Permutations II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/permutations-ii/",
        companies: ["LinkedIn", "Google", "Amazon"]
      },
      {
        id: 136,
        title: "Word Search",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/word-search/",
        companies: ["Amazon", "Airbnb", "Bloomberg", "Facebook", "Microsoft", "Snap"]
      },
      {
        id: 137,
        title: "N-Queens",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/n-queens/",
        companies: ["Amazon", "Bloomberg", "Microsoft", "Airbnb"]
      },
      {
        id: 138,
        title: "Sudoku Solver",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/sudoku-solver/",
        companies: ["Apple", "Uber", "Google"]
      },
      {
        id: 139,
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
        companies: ["Amazon", "Facebook", "Uber", "Google", "Bloomberg"]
      },
      {
        id: 140,
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/palindrome-partitioning/",
        companies: ["Amazon", "Apple", "Google", "Uber"]
      },
      {
        id: 141,
        title: "Rat in a Maze Problem",
        difficulty: "Medium",
        url: "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
        companies: ["Amazon", "Microsoft", "Samsung"]
      }
    ]
  },
  // ─── Dynamic Programming ─────────────────────────────────────────────────
  {
    id: "dp-1",
    name: "Dynamic Programming (Part 1)",
    color: "yellow",
    questions: [
      {
        id: 142,
        title: "Climbing Stairs",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/climbing-stairs/",
        companies: ["Amazon", "Google", "Apple", "Adobe", "Microsoft"]
      },
      {
        id: 143,
        title: "Min Cost Climbing Stairs",
        difficulty: "Easy",
        url: "https://leetcode.com/problems/min-cost-climbing-stairs/",
        companies: ["Amazon", "Google", "Microsoft"]
      },
      {
        id: 144,
        title: "House Robber",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/house-robber/",
        companies: ["Amazon", "Airbnb", "Bloomberg", "Yelp"]
      },
      {
        id: 145,
        title: "House Robber II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/house-robber-ii/",
        companies: ["Amazon", "Bloomberg", "Airbnb"]
      },
      {
        id: 146,
        title: "Coin Change",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/coin-change/",
        companies: ["Amazon", "Bloomberg", "Google", "Microsoft", "Uber", "Apple"]
      },
      {
        id: 147,
        title: "Longest Increasing Subsequence",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-increasing-subsequence/",
        companies: ["Amazon", "Google", "Microsoft", "Facebook", "Walmart", "Adobe"]
      },
      {
        id: 148,
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/longest-common-subsequence/",
        companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Apple", "Oracle"]
      },
      {
        id: 149,
        title: "0/1 Knapsack Problem",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
        companies: ["Amazon", "Google", "Uber", "Microsoft"]
      },
      {
        id: 150,
        title: "Unique Paths",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/unique-paths/",
        companies: ["Amazon", "Bloomberg", "Microsoft", "Google", "LinkedIn"]
      }
    ]
  },
  {
    id: "dp-2",
    name: "Dynamic Programming (Part 2)",
    color: "yellow",
    questions: [
      {
        id: 151,
        title: "Word Break",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/word-break/",
        companies: ["Amazon", "Bloomberg", "Facebook", "Google", "Microsoft", "Apple"]
      },
      {
        id: 152,
        title: "Combination Sum IV",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/combination-sum-iv/",
        companies: ["Google", "Facebook", "Amazon"]
      },
      {
        id: 153,
        title: "Jump Game",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/jump-game/",
        companies: ["Amazon", "Microsoft", "Bloomberg"]
      },
      {
        id: 154,
        title: "Partition Equal Subset Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/partition-equal-subset-sum/",
        companies: ["Amazon", "Facebook", "Google"]
      },
      {
        id: 155,
        title: "Target Sum",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/target-sum/",
        companies: ["Facebook", "Amazon", "Google"]
      },
      {
        id: 156,
        title: "Decode Ways",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/decode-ways/",
        companies: ["Facebook", "Amazon", "Microsoft", "Google"]
      },
      {
        id: 157,
        title: "Edit Distance (Levenshtein)",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/edit-distance/",
        companies: ["Amazon", "Google", "Microsoft", "Yahoo", "Baidu", "Bloomberg"]
      },
      {
        id: 158,
        title: "Burst Balloons",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/burst-balloons/",
        companies: ["Google", "Amazon"]
      },
      {
        id: 159,
        title: "Regular Expression Matching",
        difficulty: "Hard",
        url: "https://leetcode.com/problems/regular-expression-matching/",
        companies: ["Amazon", "Google", "Microsoft", "Facebook", "Airbnb"]
      }
    ]
  },
  // ─── Searching & Sorting ─────────────────────────────────────────────────
  {
    id: "searching-sorting",
    name: "Searching & Sorting",
    color: "indigo",
    questions: [
      {
        id: 160,
        title: "Bubble Sort",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/bubble-sort/",
        companies: ["Samsung", "Wipro", "TCS", "Infosys"]
      },
      {
        id: 161,
        title: "Selection Sort",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/selection-sort/",
        companies: ["Samsung", "Wipro"]
      },
      {
        id: 162,
        title: "Insertion Sort",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/insertion-sort/",
        companies: ["Microsoft", "Samsung"]
      },
      {
        id: 163,
        title: "Merge Sort",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/merge-sort/",
        companies: ["Amazon", "Microsoft", "Google", "Adobe"]
      },
      {
        id: 164,
        title: "Quick Sort",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/quick-sort/",
        companies: ["Amazon", "Google", "Samsung", "Cisco"]
      },
      {
        id: 165,
        title: "Counting Sort",
        difficulty: "Easy",
        url: "https://www.geeksforgeeks.org/counting-sort/",
        companies: ["Amazon", "Google"]
      },
      {
        id: 166,
        title: "Radix Sort",
        difficulty: "Medium",
        url: "https://www.geeksforgeeks.org/radix-sort/",
        companies: ["Amazon", "Google"]
      },
      {
        id: 167,
        title: "Sort Colors (Dutch National Flag)",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/sort-colors/",
        companies: ["Facebook", "Microsoft", "Amazon", "Bloomberg"]
      },
      {
        id: 168,
        title: "Meeting Rooms II",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/meeting-rooms-ii/",
        companies: ["Amazon", "Facebook", "Google", "Microsoft", "Uber", "Snapchat", "Lyft"]
      },
      {
        id: 169,
        title: "Largest Number",
        difficulty: "Medium",
        url: "https://leetcode.com/problems/largest-number/",
        companies: ["Airbnb", "Amazon", "Bloomberg"]
      }
    ]
  }
];
const DSA_COMPANIES = Array.from(
  new Set(DSA_SHEET_TOPICS.flatMap((topic) => topic.questions.flatMap((q) => q.companies)))
).sort();
const DSA_TOTAL_QUESTIONS = DSA_SHEET_TOPICS.reduce(
  (sum, topic) => sum + topic.questions.length,
  0
);
function MobileCollapsible$2({
  label,
  children,
  className = ""
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "md:hidden w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-foreground mb-2",
        onClick: () => setOpen((o) => !o),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5 text-spark" }),
            label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${open ? "flex flex-col gap-2" : "hidden"} md:flex md:flex-col md:gap-3 md:h-full`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-[9px] uppercase tracking-widest font-bold text-muted-foreground", children: label }),
          children
        ]
      }
    )
  ] });
}
const jobPrepSearchSchema = objectType({
  company: stringType().optional(),
  timeframe: stringType().optional()
});
const Route$g = createFileRoute("/_app/job-prep")({
  validateSearch: jobPrepSearchSchema,
  head: () => ({ meta: [{ title: "Interview Prep — ProjectSpark" }] }),
  component: InterviewPrep
});
function formatCompanyName(name) {
  if (!name) return "";
  if (name === "1kosmos") return "1Kosmos";
  if (name === "6sense") return "6sense";
  if (name === "c3-ai") return "C3 AI";
  if (name === "bcg") return "BCG";
  if (name === "hrt") return "HRT";
  if (name === "jpmorgan") return "JPMorgan Chase";
  if (name === "tcs") return "TCS";
  if (name === "l&t" || name === "larsen-toubro") return "Larsen & Toubro";
  return name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function parseCSV(csvText) {
  const lines = csvText.split(/\r?\n/);
  if (lines.length <= 1) return [];
  const questions = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const row = [];
    let inQuotes = false;
    let currentToken = "";
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(currentToken.trim());
        currentToken = "";
      } else {
        currentToken += char;
      }
    }
    row.push(currentToken.trim());
    if (row.length < 6) continue;
    const id = parseInt(row[0], 10);
    const url = row[1];
    const title = row[2].replace(/^"(.*)"$/, "$1");
    const diffRaw = row[3];
    const difficulty = diffRaw === "Easy" || diffRaw === "Medium" || diffRaw === "Hard" ? diffRaw : "Easy";
    const acceptance = row[4];
    const freqRaw = row[5].replace("%", "");
    const frequency = parseFloat(freqRaw);
    if (isNaN(id)) continue;
    questions.push({
      id,
      url: url || `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")}`,
      title,
      difficulty,
      acceptance,
      frequency: isNaN(frequency) ? 0 : frequency
    });
  }
  return questions;
}
const COMPANIES = [
  "1kosmos",
  "6sense",
  "accelya",
  "accenture",
  "accolite",
  "acko",
  "acorns",
  "activision",
  "adobe",
  "adp",
  "aetion",
  "affinity",
  "affirm",
  "agoda",
  "airbnb",
  "airbus",
  "airtel",
  "airwallex",
  "akamai",
  "akuna-capital",
  "alibaba",
  "allincall",
  "alphonso",
  "alten",
  "altimetrik",
  "amadeus",
  "amazon",
  "amd",
  "amdocs",
  "american-airlines",
  "american-express",
  "amplitude",
  "analytics-quotient",
  "andela",
  "anduril",
  "anthropic",
  "anyscale",
  "aon",
  "apolloio",
  "appdynamics",
  "appfolio",
  "apple",
  "applied-intuition",
  "aqr-capital-management",
  "arcesium",
  "argo-ai",
  "arista-networks",
  "asana",
  "ascend",
  "athenahealth",
  "atlassian",
  "att",
  "attentive",
  "audible",
  "auriga",
  "aurora",
  "autodesk",
  "avalara",
  "avito",
  "axis-bank",
  "axon",
  "baidu",
  "bank-of-america",
  "barclays",
  "bcg",
  "bending-spoons",
  "bill-com",
  "bitgo",
  "blackbuck",
  "blackrock",
  "blackstone",
  "blend",
  "blinkit",
  "bloomberg",
  "bloomreach",
  "blue-origin",
  "bnp-paribas",
  "bny-mellon",
  "boeing",
  "bolt",
  "bookingcom",
  "box",
  "bp",
  "braze",
  "bridgewater-associates",
  "brillio",
  "broadcom",
  "browserstack",
  "bt-group",
  "buyhatke",
  "bytedance",
  "c3-ai",
  "cadence",
  "canonical",
  "canva",
  "capgemini",
  "capital-one",
  "careem",
  "cars24",
  "carwale",
  "cashfree",
  "caterpillar",
  "cerner",
  "chalo",
  "chargebee",
  "checkpoint",
  "chewy",
  "chime",
  "chubb",
  "ciena",
  "circle",
  "cisco",
  "citadel",
  "citi",
  "citrix",
  "clari",
  "cleartrip",
  "clevertap",
  "cloudera",
  "cloudflare",
  "clutter",
  "cme-group",
  "cockroach-labs",
  "code-studio",
  "coditas",
  "cognizant",
  "cohesity",
  "coinbase",
  "coindcx",
  "coinswitch-kuber",
  "comcast",
  "commvault",
  "compass",
  "confluent",
  "couchbase",
  "coupa",
  "coupang",
  "coursera",
  "coveo",
  "cred",
  "criteo",
  "crowdstrike",
  "cruise-automation",
  "ctc",
  "curefit",
  "cvent",
  "cyntexa",
  "cyware",
  "dailyhunt",
  "darwinbox",
  "dassault-sysetmes",
  "dataart",
  "databricks",
  "datadog",
  "dataminr",
  "de-shaw",
  "deepmind",
  "delhivery",
  "deliveroo",
  "dell",
  "deloitte",
  "deltax",
  "deutsche-bank",
  "devrev",
  "dialpad",
  "directi",
  "discord",
  "discovery",
  "disney",
  "dji",
  "docusign",
  "doordash",
  "dp-world",
  "drawbridge",
  "dream11",
  "dropbox",
  "druva",
  "drw",
  "dtcc",
  "dunzo",
  "duolingo",
  "earnin",
  "ebay",
  "edelweiss",
  "electronic-arts",
  "elitmus",
  "envoy",
  "epam-systems",
  "epic-games",
  "epic-systems",
  "epifi",
  "equinix",
  "ericsson",
  "etsy",
  "exl",
  "expedia",
  "ey",
  "f5-networks",
  "factset",
  "faire",
  "fallible",
  "fanatics",
  "fast",
  "fastenal",
  "fico",
  "fidelity",
  "fidessa",
  "figma",
  "fiverr",
  "fivetran",
  "flatiron-health",
  "fleetx",
  "flexera",
  "flexport",
  "flipkart",
  "fortinet",
  "forusall",
  "fourkites",
  "fpt",
  "fractal-analytics",
  "freecharge",
  "freshworks",
  "fynd",
  "gainsight",
  "gameskraft",
  "garena",
  "garmin",
  "gartner",
  "ge-digital",
  "ge-healthcare",
  "geico",
  "general-electric",
  "general-motors",
  "gilt-groupe",
  "github",
  "glassdoor",
  "globallogic",
  "glovo",
  "godaddy",
  "gojek",
  "goldman-sachs",
  "google",
  "gopuff",
  "goto",
  "grab",
  "grammarly",
  "graviton",
  "groupon",
  "groww",
  "grubhub",
  "gsa-capital",
  "gsn-games",
  "guidewire",
  "gusto",
  "harness",
  "hashedin",
  "hbo",
  "hcl",
  "helix",
  "highspot",
  "hilabs",
  "hive",
  "honey",
  "honeywell",
  "hopper",
  "hotstar",
  "houzz",
  "hp",
  "hpe",
  "hrt",
  "hsbc",
  "htc",
  "huawei",
  "hubspot",
  "hulu",
  "ibm",
  "iit-bombay",
  "imc",
  "impact-analytics",
  "impetus",
  "increff",
  "indeed",
  "info-edge",
  "informatica",
  "infosys",
  "inmobi",
  "innovaccer",
  "instabase",
  "instacart",
  "intel",
  "interactive-brokers",
  "intercom",
  "intuit",
  "ivp",
  "ixigo",
  "ixl",
  "jane-street",
  "jd",
  "jeavio",
  "jingchi",
  "jio",
  "josh-technology",
  "jpmorgan",
  "jtg",
  "jump-trading",
  "juspay",
  "kakao",
  "karat",
  "kickdrum",
  "kla",
  "kla-tencor",
  "kotak-mahindra-bank",
  "kpmg",
  "larsen-toubro",
  "leap-motion",
  "lendingkart",
  "lenskart",
  "lg-electronics",
  "liberty-mutual",
  "liftoff",
  "lime",
  "line",
  "linkedin",
  "liveramp",
  "livspace",
  "lowe",
  "lti",
  "lucid",
  "luxoft",
  "lyft",
  "machine-zone",
  "machinezone",
  "maersk",
  "makemytrip",
  "mapbox",
  "maq-software",
  "marqeta",
  "mastercard",
  "mathworks",
  "mcafee",
  "mcdonalds",
  "mckinsey",
  "medianet",
  "meesho",
  "meituan",
  "mercari",
  "meta",
  "micro1",
  "microsoft",
  "microstrategy",
  "millennium",
  "mindtickle",
  "mindtree",
  "mishipay",
  "mitsogo",
  "mixpanel",
  "mobileye",
  "mobisy",
  "moengage",
  "moloco",
  "moneylion",
  "mongodb",
  "morgan-stanley",
  "motive",
  "moveworks",
  "mphasis",
  "msci",
  "murex",
  "mykaarma",
  "myntra",
  "nagarro",
  "nasdaq",
  "national-instruments",
  "national-payments-coorperation-india",
  "natwest",
  "navan",
  "naver",
  "navi",
  "ncr",
  "nerdwallet",
  "netapp",
  "netcracker-technology",
  "netease",
  "netflix",
  "netskope",
  "netsuite",
  "newsbreak",
  "nextdoor",
  "nextjump",
  "niantic",
  "nielsen",
  "nike",
  "nokia",
  "noon",
  "nordstrom",
  "notion",
  "npci",
  "nuro",
  "nutanix",
  "nvidia",
  "nykaa",
  "observeai",
  "odoo",
  "okta",
  "okx",
  "ola",
  "olx",
  "openai",
  "opentext",
  "oppo",
  "optiver",
  "optum",
  "oracle",
  "oscar-health",
  "otterai",
  "oyo",
  "ozon",
  "palantir",
  "palo-alto-networks",
  "park",
  "patreon",
  "paycom",
  "paypal",
  "paypay",
  "paytm",
  "payu",
  "peak6",
  "pega",
  "peloton",
  "persistent-systems",
  "philips",
  "phonepe",
  "pickrr",
  "pinterest",
  "plaid",
  "playsimple",
  "pocket-gems",
  "point72",
  "polar",
  "ponyai",
  "pornhub",
  "porter",
  "poshmark",
  "postman",
  "postmates",
  "poynt",
  "practo",
  "publicis-sapient",
  "pubmatic",
  "pure",
  "pure-storage",
  "purplle",
  "pwc",
  "qualcomm",
  "qualtrics",
  "qualys",
  "quantcast",
  "quantiphi",
  "quince",
  "quora",
  "rackspace",
  "radius",
  "rakuten",
  "rally-health",
  "ramp-2",
  "razorpay",
  "rbc",
  "redbus",
  "reddit",
  "redfin",
  "reliance-retails",
  "remitly",
  "retailmenot",
  "revolut",
  "riot-games",
  "ripple",
  "rippling",
  "rivian",
  "robinhood",
  "roblox",
  "rokt",
  "roku",
  "rubrik",
  "salesforce",
  "sambanova",
  "samsara",
  "samsung",
  "sap",
  "scale-ai",
  "scaler",
  "schlumberger",
  "schneider-electric",
  "schrodinger",
  "sentry",
  "servicenow",
  "sharechat",
  "shift-technology",
  "shipsy",
  "shopback",
  "shopee",
  "shopify",
  "shopup",
  "siemens",
  "sig",
  "sigmoid",
  "singlestore",
  "sixt",
  "slice",
  "smartnews",
  "smartsheet",
  "snapchat",
  "snapdeal",
  "snowflake",
  "societe-generale",
  "sofi",
  "softwire",
  "sonatus",
  "sony",
  "soti",
  "soundhound",
  "spacex",
  "spinny",
  "splunk",
  "spotify",
  "sprinklr",
  "square",
  "squarepoint-capital",
  "squarespace",
  "stackadapt",
  "stackline",
  "starbucks",
  "state-farm",
  "strava",
  "stripe",
  "sumologic",
  "swiggy",
  "syfe",
  "symantec",
  "synopsys",
  "ta-digital",
  "tableau",
  "tanium",
  "target",
  "tcs",
  "tech-mahindra",
  "tekion",
  "tencent",
  "teradata",
  "tesco",
  "tesla",
  "texas-instruments",
  "the-trade-desk",
  "thomson-reuters",
  "thoughtspot",
  "thoughtworks",
  "thousandeyes",
  "thumbtack",
  "tiaa",
  "tiger-analytics",
  "tiktok",
  "tinder",
  "tinkoff",
  "toast",
  "tokopedia",
  "tomtom",
  "toptal",
  "tower-research",
  "tracxn",
  "traveloka",
  "trend-micro",
  "trexquant",
  "trilogy",
  "tripactions",
  "tripadvisor",
  "triplebyte",
  "turing",
  "turvo",
  "tusimple",
  "twilio",
  "twitch",
  "twitter",
  "two-sigma",
  "uber",
  "ubisoft",
  "ubs",
  "udemy",
  "uipath",
  "ukg",
  "unbxd",
  "unity",
  "unstop",
  "upstart",
  "urban-company",
  "ust",
  "valve",
  "veeva",
  "verily",
  "veritas",
  "verizon",
  "verkada",
  "viasat",
  "vimeo",
  "virtu",
  "virtusa",
  "visa",
  "vk",
  "vmware",
  "walmart-labs",
  "warnermedia",
  "wayfair",
  "waymo",
  "wayve",
  "wealthfront",
  "wells-fargo",
  "weride",
  "western-digital",
  "whatfix",
  "whatnot",
  "winzo",
  "wipro",
  "wise",
  "wish",
  "wissen",
  "wix",
  "workday",
  "works-applications",
  "worldquant",
  "woven-by-toyota",
  "xing",
  "yahoo",
  "yandex",
  "yatra",
  "yelp",
  "yugabyte",
  "zalando",
  "zappos",
  "zemoso",
  "zendesk",
  "zenefits",
  "zepto",
  "zeta",
  "zeta-suite",
  "zillow",
  "zip",
  "ziprecruiter",
  "zluri",
  "zocdoc",
  "zoho",
  "zomato",
  "zoom",
  "zoox",
  "zopsmart",
  "zs-associates",
  "zscaler",
  "zulily",
  "zynga"
];
function InterviewPrep() {
  const { company, timeframe } = Route$g.useSearch();
  const { user } = useAuth();
  const isValidTimeframe = (tf) => {
    return tf === "30days" || tf === "3months" || tf === "6months" || tf === "all";
  };
  const [activeSection, setActiveSection] = reactExports.useState("company");
  const [selectedCompany, setSelectedCompany] = reactExports.useState(company || "google");
  const [selectedTimeframe, setSelectedTimeframe] = reactExports.useState(isValidTimeframe(timeframe) ? timeframe : "all");
  const [companyQuery, setCompanyQuery] = reactExports.useState("");
  const [lcSearch, setLcSearch] = reactExports.useState("");
  const [questions, setQuestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (company) setSelectedCompany(company);
    if (timeframe && isValidTimeframe(timeframe)) {
      setSelectedTimeframe(timeframe);
    }
  }, [company, timeframe]);
  const handleSaveCompany = async () => {
    if (!user) {
      toast.error("Please login to save interview prep lists");
      return;
    }
    const companyTitle = formatCompanyName(selectedCompany);
    const blueprintPayload = {
      category: "interview_prep",
      company: selectedCompany,
      timeframe: selectedTimeframe,
      companyName: companyTitle,
      questionsCount: questions.length,
      questions: questions.slice(0, 50).map((q) => ({
        id: q.id,
        title: q.title,
        difficulty: q.difficulty,
        acceptance: q.acceptance,
        frequency: q.frequency,
        url: q.url
      }))
    };
    const { error: error2 } = await supabase.from("build_blueprints").insert({
      user_id: user.id,
      title: `${companyTitle} LeetCode Questions`,
      description: `Interview Prep questions for ${companyTitle} (${selectedTimeframe === "all" ? "All Time" : selectedTimeframe === "30days" ? "Last 30 Days" : selectedTimeframe === "3months" ? "Last 3 Months" : "Last 6 Months"})`,
      technologies: [selectedCompany],
      blueprint: blueprintPayload
    });
    if (error2) {
      toast.error("Save failed: " + error2.message);
    } else {
      toast.success(`Saved ${companyTitle} questions to Saved items!`);
      awardXP(20, `Saved interview prep: ${companyTitle}`);
    }
  };
  reactExports.useEffect(() => {
    let active = true;
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const tfFile = {
          "30days": "thirty-days.csv",
          "3months": "three-months.csv",
          "6months": "six-months.csv",
          all: "all.csv"
        }[selectedTimeframe];
        const url = `https://raw.githubusercontent.com/snehasishroy/leetcode-companywise-interview-questions/master/${selectedCompany}/${tfFile}`;
        const res = await fetch(url);
        if (!res.ok) {
          if (selectedTimeframe !== "all") {
            const fallbackUrl = `https://raw.githubusercontent.com/snehasishroy/leetcode-companywise-interview-questions/master/${selectedCompany}/all.csv`;
            const fallbackRes = await fetch(fallbackUrl);
            if (fallbackRes.ok && active) {
              const csvText = await fallbackRes.text();
              const parsed = parseCSV(csvText);
              setQuestions(parsed);
              return;
            }
          }
          throw new Error(
            `Failed to fetch interview questions (${res.status}). This company may not have data for ${selectedTimeframe}.`
          );
        }
        if (active) {
          const csvText = await res.text();
          const parsed = parseCSV(csvText);
          setQuestions(parsed);
        }
      } catch (err) {
        if (active) {
          console.error(err);
          const msg = err instanceof Error ? err.message : "Failed to load questions from GitHub.";
          setError(msg);
          setQuestions([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadQuestions();
    return () => {
      active = false;
    };
  }, [selectedCompany, selectedTimeframe]);
  const filteredCompanies = COMPANIES.filter(
    (c) => c.toLowerCase().includes(companyQuery.toLowerCase()) || formatCompanyName(c).toLowerCase().includes(companyQuery.toLowerCase())
  );
  const filteredQuestions = questions.filter(
    (q) => q.title.toLowerCase().includes(lcSearch.toLowerCase()) || q.id.toString().includes(lcSearch)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Terminal,
        title: "Interview Prep",
        description: "Company-wise LeetCode interview questions and a comprehensive topic-wise DSA sheet with 375+ curated problems and company tags.",
        actions: activeSection === "company" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleSaveCompany,
            className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60 bg-gradient-spark text-primary-foreground font-semibold cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Save Company List" })
            ]
          }
        ) : null
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 border-b border-white/5 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            playClick();
            setActiveSection("company");
          },
          className: `flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition border-b-2 ${activeSection === "company" ? "border-spark text-foreground bg-spark/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/3"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5" }),
            "Company-Wise (LeetCode)"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            playClick();
            setActiveSection("topic");
          },
          className: `flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition border-b-2 ${activeSection === "topic" ? "border-spark text-foreground bg-spark/5" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/3"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
            "Topic-Wise (DSA Sheet)",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] px-1.5 py-0.5 rounded-full bg-spark/20 text-spark font-bold", children: [
              DSA_TOTAL_QUESTIONS,
              "+"
            ] })
          ]
        }
      )
    ] }),
    activeSection === "topic" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TopicWiseDSASheet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 text-spark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Company-Wise LeetCode Interview Bank" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search questions by title or ID...",
              value: lcSearch,
              onChange: (e) => setLcSearch(e.target.value),
              className: "w-full rounded-xl border border-white/10 bg-background/50 pl-9 pr-4 py-1.5 text-xs text-foreground outline-none focus:border-spark focus:ring-1 focus:ring-spark/30 transition-all"
            }
          ),
          lcSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLcSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-[240px_1fr] items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          MobileCollapsible$2,
          {
            label: `Companies (${filteredCompanies.length})`,
            className: "md:sticky md:top-6 md:h-[calc(100vh-48px)] md:flex-col glass rounded-3xl bg-card/45 border-white/10 p-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search 650+ companies...",
                    value: companyQuery,
                    onChange: (e) => setCompanyQuery(e.target.value),
                    className: "w-full rounded-lg border border-white/5 bg-background/30 pl-7 pr-3 py-1 text-[11px] text-foreground outline-none focus:border-spark transition-all"
                  }
                ),
                companyQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setCompanyQuery(""),
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-2.5 w-2.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "md:flex-1 md:min-h-0 md:overflow-y-auto flex flex-col gap-2 pr-1 font-semibold [&::-webkit-scrollbar]:hidden max-h-64 overflow-y-auto md:max-h-none",
                  style: { scrollbarWidth: "none" },
                  "data-lenis-prevent": true,
                  children: filteredCompanies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] text-muted-foreground py-10", children: "No companies found" }) : filteredCompanies.map((company2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      onClick: () => {
                        playClick();
                        setSelectedCompany(company2);
                      },
                      className: `py-2.5 px-3 rounded-lg border text-xs text-left flex items-center justify-between gap-2 ${selectedCompany === company2 ? "border-spark bg-spark/10 text-spark font-bold" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
                      whileHover: {
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        transition: { type: "spring", stiffness: 200 }
                      },
                      whileTap: { scale: 0.97 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: formatCompanyName(company2) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ChevronRight,
                          {
                            className: `h-3 w-3 shrink-0 ${selectedCompany === company2 ? "translate-x-0.5" : "opacity-40"}`
                          }
                        )
                      ]
                    },
                    company2
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-muted-foreground text-center py-1.5 shrink-0 border-t border-white/5 bg-white/1 rounded-lg", children: [
                filteredCompanies.length,
                " companies available"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:sticky md:top-6 md:h-[calc(100vh-48px)] w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 overflow-x-auto pb-4 shrink-0",
              "data-lenis-prevent": true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest font-bold text-muted-foreground mr-2 hidden sm:inline", children: "Timeframe:" }),
                ["30days", "3months", "6months", "all"].map((tf) => {
                  const labels = {
                    "30days": "Last 30 Days",
                    "3months": "Last 3 Months",
                    "6months": "Last 6 Months",
                    all: "All Time"
                  };
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        playClick();
                        setSelectedTimeframe(tf);
                      },
                      className: `px-4 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition ${selectedTimeframe === tf ? "border-spark bg-spark/15 text-spark" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
                      children: labels[tf]
                    },
                    tf
                  );
                })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HolographicPanel,
            {
              className: "p-0 overflow-hidden border-white/5 flex-1 flex flex-col min-h-0",
              innerClassName: "flex flex-col h-full w-full",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-full flex-1 overflow-auto [&::-webkit-scrollbar]:hidden",
                  style: { scrollbarWidth: "none", msOverflowStyle: "none" },
                  "data-lenis-prevent": true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse text-xs table-fixed", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "sticky top-0 bg-card/95 backdrop-blur z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/5 bg-white/2 text-[9px] uppercase tracking-wider text-muted-foreground font-bold", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-20", children: "ID" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-2/5", children: "Problem Title" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-24", children: "Difficulty" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-24", children: "Acceptance" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-28", children: "Frequency" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 w-16 text-center", children: "Solve" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "py-24 text-center text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 mx-auto mb-2 text-spark animate-spin" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Streaming ",
                          formatCompanyName(selectedCompany),
                          " LeetCode questions..."
                        ] })
                      ] }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "py-24 text-center text-muted-foreground px-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8 mx-auto mb-2 text-amber-500" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-foreground mb-1", children: "Could not fetch exact timeframe data" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] leading-relaxed opacity-80", children: error })
                      ] }) }) : filteredQuestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 6, className: "py-24 text-center text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground/30" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No questions found matching the criteria." })
                      ] }) }) : filteredQuestions.slice(0, 200).map((q) => {
                        const diffStyles = {
                          Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                          Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                          Hard: "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        }[q.difficulty];
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "tr",
                          {
                            className: "border-b border-white/5 hover:bg-white/1 transition-colors",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-muted-foreground", children: [
                                "#",
                                q.id
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-semibold text-foreground truncate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "a",
                                {
                                  href: q.url,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  onMouseEnter: playHover,
                                  onClick: () => {
                                    playClick();
                                    awardXP(10, `Explored LeetCode problem: ${q.title}`);
                                  },
                                  className: "flex items-center gap-1.5 hover:text-spark hover:underline transition group truncate",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: q.title }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" })
                                  ]
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `px-2 py-0.5 rounded text-[10px] font-bold border ${diffStyles}`,
                                  children: q.difficulty
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-muted-foreground", children: q.acceptance }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "h-full bg-gradient-spark shadow-glow rounded-full",
                                    style: { width: `${q.frequency}%` }
                                  }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground w-8 text-right shrink-0", children: [
                                  q.frequency.toFixed(1),
                                  "%"
                                ] })
                              ] }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "a",
                                {
                                  href: q.url,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className: "inline-flex items-center justify-center p-1.5 rounded-lg border border-white/5 bg-white/2 hover:border-spark/50 hover:bg-spark/10 text-muted-foreground hover:text-spark transition",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-current" })
                                }
                              ) })
                            ]
                          },
                          q.id
                        );
                      }) })
                    ] }),
                    filteredQuestions.length > 200 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-muted-foreground text-center py-2 shrink-0 border-t border-white/5 bg-white/1 rounded-lg", children: [
                      "Showing top 200 of ",
                      filteredQuestions.length,
                      " questions. Search to refine."
                    ] })
                  ]
                }
              )
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function CompanyTooltip({ companies }) {
  const [open, setOpen] = reactExports.useState(false);
  const preview = companies.slice(0, 3);
  const rest = companies.slice(3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative inline-flex items-center gap-1 flex-wrap",
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      children: [
        preview.map((co) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-1.5 py-0.5 rounded text-[9px] bg-white/5 border border-white/10 text-muted-foreground whitespace-nowrap",
            children: co
          },
          co
        )),
        rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-1.5 py-0.5 rounded text-[9px] bg-spark/10 border border-spark/20 text-spark font-semibold cursor-default whitespace-nowrap", children: [
          "+",
          rest.length,
          " more"
        ] }),
        open && rest.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-0 top-full mt-1 z-50 rounded-xl border border-white/15 bg-card/98 backdrop-blur-md p-3 shadow-2xl min-w-max max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2", children: [
            "All Companies (",
            companies.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: companies.map((co) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-1.5 py-0.5 rounded text-[9px] bg-white/8 border border-white/10 text-foreground whitespace-nowrap",
              children: co
            },
            co
          )) })
        ] })
      ]
    }
  );
}
function TopicWiseDSASheet() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState(
    "All"
  );
  const [companyFilter, setCompanyFilter] = reactExports.useState("All");
  const [expandedTopics, setExpandedTopics] = reactExports.useState(/* @__PURE__ */ new Set(["arrays-1"]));
  const [solved, setSolved] = reactExports.useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("dsa_solved") || "[]"));
    } catch {
      return /* @__PURE__ */ new Set();
    }
  });
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const colorBar = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    cyan: "bg-cyan-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    lime: "bg-lime-500",
    emerald: "bg-emerald-500",
    violet: "bg-violet-500"
  };
  const colorBadge = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    green: "text-green-400 bg-green-500/10 border-green-500/25",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/25",
    teal: "text-teal-400 bg-teal-500/10 border-teal-500/25",
    pink: "text-pink-400 bg-pink-500/10 border-pink-500/25",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
    red: "text-red-400 bg-red-500/10 border-red-500/25",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    lime: "text-lime-400 bg-lime-500/10 border-lime-500/25",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/25"
  };
  const diffBadge = {
    Easy: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
    Medium: "text-amber-400  bg-amber-500/10  border border-amber-500/20",
    Hard: "text-rose-400   bg-rose-500/10   border border-rose-500/20"
  };
  const toggleSolved = (id) => {
    playClick();
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.add(id);
        awardXP(15, "Marked DSA problem solved");
      }
      try {
        localStorage.setItem("dsa_solved", JSON.stringify([...next]));
      } catch {
      }
      return next;
    });
  };
  const copyLink = (url, id) => {
    navigator.clipboard.writeText(url).then(() => {
      playSuccess();
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };
  const toggleTopic = (id) => {
    playClick();
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const getFilteredQs = (topic) => topic.questions.filter((q) => {
    const ms = !searchQuery || q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const md = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const mc = companyFilter === "All" || q.companies.includes(companyFilter);
    return ms && md && mc;
  });
  const solvedCount = solved.size;
  const solvedPct = DSA_TOTAL_QUESTIONS > 0 ? Math.round(solvedCount / DSA_TOTAL_QUESTIONS * 100) : 0;
  const totalFiltered = DSA_SHEET_TOPICS.reduce((s, t) => s + getFilteredQs(t).length, 0);
  const topCompanies = [
    "All",
    "Amazon",
    "Google",
    "Microsoft",
    "Facebook",
    "Apple",
    "Adobe",
    "Uber",
    "Bloomberg",
    "Samsung",
    "Flipkart",
    "Goldman Sachs",
    "LinkedIn",
    "Airbnb"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 shrink-0 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
        { label: "Total", value: DSA_TOTAL_QUESTIONS, cls: "text-spark" },
        { label: "Solved", value: solvedCount, cls: "text-emerald-400" },
        { label: "Remaining", value: DSA_TOTAL_QUESTIONS - solvedCount, cls: "text-amber-400" },
        { label: "Progress", value: `${solvedPct}%`, cls: "text-violet-400" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/8 bg-card/40 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xl font-black font-display ${s.cls}`, children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 font-medium", children: s.label })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/8 bg-card/40 px-5 py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground shrink-0 w-28", children: "Overall Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-gradient-spark rounded-full transition-all duration-700",
            style: { width: `${solvedPct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-spark shrink-0", children: [
          solvedCount,
          "/",
          DSA_TOTAL_QUESTIONS
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/8 bg-card/40 px-5 py-3.5 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search questions...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "rounded-xl border border-white/10 bg-background/50 pl-7 pr-7 py-1.5 text-xs text-foreground outline-none focus:border-spark transition-all w-52"
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSearchQuery(""),
              className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10" }),
        ["All", "Easy", "Medium", "Hard"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              playClick();
              setDifficultyFilter(d);
            },
            className: `px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition ${difficultyFilter === d ? d === "All" ? "border-spark bg-spark/15 text-spark" : d === "Easy" ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-400" : d === "Medium" ? "border-amber-500/50 bg-amber-500/15 text-amber-400" : "border-rose-500/50 bg-rose-500/15 text-rose-400" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
            children: d
          },
          d
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: companyFilter,
            onChange: (e) => {
              playClick();
              setCompanyFilter(e.target.value);
            },
            className: "rounded-xl border border-white/10 bg-background/50 px-3 py-1.5 text-xs text-foreground outline-none focus:border-spark transition-all",
            children: [
              topCompanies.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "─── More Companies ───", children: DSA_COMPANIES.filter((c) => !topCompanies.includes(c)).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          (searchQuery || difficultyFilter !== "All" || companyFilter !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-spark font-semibold", children: [
            totalFiltered,
            " results"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                playClick();
                setExpandedTopics(
                  expandedTopics.size === DSA_SHEET_TOPICS.length ? /* @__PURE__ */ new Set() : new Set(DSA_SHEET_TOPICS.map((t) => t.id))
                );
              },
              className: "flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 bg-background/50 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition",
              children: expandedTopics.size === DSA_SHEET_TOPICS.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUp, { className: "h-3 w-3" }),
                "Collapse All"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsDown, { className: "h-3 w-3" }),
                "Expand All"
              ] })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-2 overflow-y-auto flex-1 min-h-0 pb-10 pr-1 [&::-webkit-scrollbar]:hidden",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        "data-lenis-prevent": true,
        children: DSA_SHEET_TOPICS.map((topic) => {
          const fqs = getFilteredQs(topic);
          const isExpanded = expandedTopics.has(topic.id);
          const topicSolved = topic.questions.filter((q) => solved.has(q.id)).length;
          const topicPct = topic.questions.length > 0 ? Math.round(topicSolved / topic.questions.length * 100) : 0;
          const badge = colorBadge[topic.color] ?? colorBadge.blue;
          const bar = colorBar[topic.color] ?? "bg-blue-500";
          if ((searchQuery || difficultyFilter !== "All" || companyFilter !== "All") && fqs.length === 0)
            return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-white/8 overflow-hidden bg-card/35",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-0.5 w-full ${bar} opacity-40` }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => toggleTopic(topic.id),
                    className: "w-full flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition text-left",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-2.5 w-2.5 rounded-full ${bar} opacity-80 shrink-0` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-[13px] text-foreground", children: topic.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: `px-2 py-0.5 rounded-full text-[9px] font-bold border ${badge}`,
                                children: [
                                  fqs.length,
                                  "Q"
                                ]
                              }
                            ),
                            topicSolved > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full text-[9px] font-bold border border-emerald-500/20 bg-emerald-500/10 text-emerald-400", children: [
                              topicSolved,
                              " done"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `h-full ${bar} opacity-70 rounded-full transition-all`,
                                style: { width: `${topicPct}%` }
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground", children: [
                              topicPct,
                              "%"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-emerald-400", children: [
                              topic.questions.filter((q) => q.difficulty === "Easy").length,
                              "E"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-amber-400", children: [
                              topic.questions.filter((q) => q.difficulty === "Medium").length,
                              "M"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-rose-400", children: [
                              topic.questions.filter((q) => q.difficulty === "Hard").length,
                              "H"
                            ] })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ChevronDown,
                        {
                          className: `h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isExpanded ? "rotate-180" : ""}`
                        }
                      )
                    ]
                  }
                ),
                isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/5 overflow-x-auto", children: fqs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-xs text-muted-foreground", children: "No questions match current filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-white/2 text-[9px] uppercase tracking-wider text-muted-foreground font-bold border-b border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 w-10", children: "✓" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-10", children: "#" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "Problem" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-24", children: "Difficulty" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3", children: "Companies" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-3 w-20 text-center", children: "Actions" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: fqs.map((q) => {
                    const isSolved = solved.has(q.id);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: `border-b border-white/3 transition-colors group ${isSolved ? "bg-emerald-500/4 hover:bg-emerald-500/6" : "hover:bg-white/2"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => toggleSolved(q.id),
                              title: isSolved ? "Mark unsolved" : "Mark solved",
                              className: `h-4 w-4 rounded border flex items-center justify-center transition-all ${isSolved ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-white/20 bg-white/3 hover:border-emerald-500/50 text-transparent"}`,
                              children: isSolved && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5" })
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-mono text-muted-foreground text-[10px]", children: q.id }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 max-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: q.url,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              onMouseEnter: playHover,
                              onClick: () => {
                                playClick();
                                awardXP(10, `Opened: ${q.title}`);
                              },
                              className: `flex items-center gap-1.5 group/link transition font-semibold truncate ${isSolved ? "line-through text-muted-foreground/50 hover:text-muted-foreground" : "text-foreground hover:text-spark"}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: q.title }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-0 group-hover/link:opacity-50 transition shrink-0" })
                              ]
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `px-2 py-0.5 rounded text-[10px] font-bold ${diffBadge[q.difficulty]}`,
                              children: q.difficulty
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyTooltip, { companies: q.companies }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                onClick: () => copyLink(q.url, q.id),
                                title: "Copy link",
                                className: `p-1.5 rounded-lg border transition ${copiedId === q.id ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-white/5 bg-white/2 text-muted-foreground hover:border-spark/40 hover:bg-spark/8 hover:text-spark"}`,
                                children: copiedId === q.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "a",
                              {
                                href: q.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "p-1.5 rounded-lg border border-white/5 bg-white/2 hover:border-spark/50 hover:bg-spark/10 text-muted-foreground hover:text-spark transition",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-current" })
                              }
                            )
                          ] }) })
                        ]
                      },
                      q.id
                    );
                  }) })
                ] }) })
              ]
            },
            topic.id
          );
        })
      }
    )
  ] });
}
const $$splitComponentImporter$c = () => import("../_app.generator-CfpiRUCo.mjs");
const Route$f = createFileRoute("/_app/generator")({
  head: () => ({
    meta: [{
      title: "Project Generator — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_app.dashboard-BE1zfdMB.mjs");
const Route$e = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{
      title: "Mission Control — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const Route$d = createFileRoute("/_app/collaboration")({
  head: () => ({ meta: [{ title: "Collaboration Hub — ProjectSpark" }] }),
  component: CollaborationHub
});
const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Train vision transformer model backbone",
    assignee: "ML Engineer",
    stage: "InProgress",
    priority: "High"
  },
  {
    id: "task-2",
    title: "Design Figma mockups for clinical dashboard",
    assignee: "UI Designer",
    stage: "Review",
    priority: "Medium"
  },
  {
    id: "task-3",
    title: "Configure Docker environment and compose files",
    assignee: "You (Backend Dev)",
    stage: "Todo",
    priority: "High"
  },
  {
    id: "task-4",
    title: "Set up Supabase authentication hooks",
    assignee: "You (Backend Dev)",
    stage: "Done",
    priority: "Medium"
  }
];
const INITIAL_CHAT = [
  {
    id: "msg-1",
    sender: "arun_singh",
    role: "ML Engineer",
    content: "Vision model validation accuracy hit 92.4%! Pushing checkpoint now.",
    timestamp: "10:14 AM"
  },
  {
    id: "msg-2",
    sender: "lisa_m",
    role: "UI Designer",
    content: "Awesome! I'll update the Figma frames to reflect diagnostics analytics.",
    timestamp: "10:18 AM"
  }
];
const INITIAL_CONTRIBUTIONS = [
  {
    id: "c-1",
    type: "Commit",
    detail: "Feat: implement token validation middleware",
    date: "June 2",
    xpGained: 50
  },
  {
    id: "c-2",
    type: "Documentation",
    detail: "Doc: update API response schema markdown",
    date: "June 2",
    xpGained: 30
  },
  {
    id: "c-3",
    type: "Design",
    detail: "Design: layout skeleton wireframes",
    date: "June 1",
    xpGained: 40
  }
];
function CollaborationHub() {
  const [activeTab, setActiveTab] = reactExports.useState("kanban");
  const [tasks, setTasks] = reactExports.useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = reactExports.useState("");
  const [newTaskAssignee, setNewTaskAssignee] = reactExports.useState("You (Backend Dev)");
  const [newTaskPriority, setNewTaskPriority] = reactExports.useState("Medium");
  const [messages, setMessages] = reactExports.useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [notesText, setNotesText] = reactExports.useState(
    `# Project Spark Diagnostics Sync notes

**Date:** ${(/* @__PURE__ */ new Date()).toLocaleDateString()}
**Attendees:** You, arun_singh, lisa_m

## Action Items
- [ ] Configure local Docker development environments.
- [ ] Complete clinical metrics UI mocks.
- [ ] Optimize transformer learning rates.`
  );
  const [contributions, setContributions] = reactExports.useState(INITIAL_CONTRIBUTIONS);
  const [contrScore, setContrScore] = reactExports.useState(120);
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    playSuccess();
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      stage: "Todo",
      priority: newTaskPriority
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    toast.success("Task added to Kanban Board!");
    awardXP(10, "Added collaboration task");
  };
  const shiftTaskStage = (taskId, nextStage) => {
    playClick();
    setTasks(
      (prev) => prev.map((t) => {
        if (t.id === taskId) {
          if (nextStage === "Done" && t.stage !== "Done") {
            awardXP(30, `Completed task: ${t.title}`);
            const newContr = {
              id: `c-${Date.now()}`,
              type: "Task",
              detail: `Task: ${t.title}`,
              date: "Today",
              xpGained: 30
            };
            setContributions((c) => [newContr, ...c]);
            setContrScore((score) => score + 30);
            toast.success("Task completed! Contribution recorded.");
          }
          return { ...t, stage: nextStage };
        }
        return t;
      })
    );
  };
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playClick();
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "you",
      role: "Growth Builder",
      content: chatInput,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages([...messages, userMsg]);
    setChatInput("");
    setTimeout(() => {
      playSuccess();
      const replies = [
        "Good call! I will sync my code and test it locally.",
        "Perfect, let's discuss this in tomorrow's standup sync.",
        "Already on it. Pushing design components shortly."
      ];
      const botMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "arun_singh",
        role: "ML Engineer",
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };
  const addManualContribution = (type) => {
    playSuccess();
    let detail = "";
    let xp = 0;
    if (type === "Commit") {
      detail = `Commit: Feat: optimize cache index pipelines`;
      xp = 40;
    } else if (type === "Research") {
      detail = `Research: Audited Vision Transformers scalability paper`;
      xp = 50;
    } else if (type === "Documentation") {
      detail = `Doc: drafted project setup guides`;
      xp = 25;
    } else if (type === "Design") {
      detail = `Design: optimized theme palette structures`;
      xp = 35;
    }
    const newContr = {
      id: `c-${Date.now()}`,
      type,
      detail,
      date: "Today",
      xpGained: xp
    };
    setContributions((prev) => [newContr, ...prev]);
    setContrScore((prev) => prev + xp);
    awardXP(xp, `Contribution: ${type}`);
    toast.success(`Contribution recorded: +${xp} Score`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Users,
        title: "Team Collaboration Hub",
        description: "Task allocation pipelines, file share channels, multi-user chat sync, meeting logs, and contribution analytics."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-white/5 mb-6 text-xs font-semibold overflow-x-auto", children: ["kanban", "chat", "notes", "tracking"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          playClick();
          setActiveTab(tab);
        },
        className: `px-6 py-2.5 capitalize transition ${activeTab === tab ? "border-b-2 border-spark text-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: tab === "kanban" ? "Kanban Board" : tab === "tracking" ? "Contribution Tracking" : tab === "notes" ? "Sync Notes" : "Team Chat"
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      activeTab === "kanban" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddTask, className: "flex flex-wrap items-end gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Task Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: newTaskTitle,
                onChange: (e) => setNewTaskTitle(e.target.value),
                placeholder: "Enter task item detail...",
                className: "w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Assignee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: newTaskAssignee,
                onChange: (e) => setNewTaskAssignee(e.target.value),
                className: "rounded-lg border border-white/10 bg-card px-2 py-2 text-xs text-foreground outline-none focus:border-spark",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "You (Backend Dev)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "ML Engineer" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "UI Designer" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: newTaskPriority,
                onChange: (e) => setNewTaskPriority(e.target.value),
                className: "rounded-lg border border-white/10 bg-card px-2 py-2 text-xs text-foreground outline-none focus:border-spark",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Low" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Medium" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "High" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "rounded-xl bg-gradient-spark px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition",
              children: "Create Task"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: ["Todo", "InProgress", "Review", "Done"].map((stage) => {
          const stageTasks = tasks.filter((t) => t.stage === stage);
          const headerColors = {
            Todo: "text-muted-foreground",
            InProgress: "text-blue-400",
            Review: "text-amber-400",
            Done: "text-emerald-400"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 flex flex-col h-[calc(100vh-210px)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `text-xs font-bold uppercase tracking-wider flex justify-between items-center mb-4 ${headerColors[stage]}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: stage === "InProgress" ? "In Progress" : stage }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded-full", children: stageTasks.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 flex-1 overflow-y-auto", "data-lenis-prevent": true, children: stageTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl border border-white/5 bg-white/2 p-3.5 space-y-3 flex flex-col justify-between transition hover:border-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${task.priority === "High" ? "bg-red-500/10 border-red-500/20 text-red-400" : task.priority === "Medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"}`,
                          children: task.priority
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground", children: [
                        "@",
                        task.assignee.split(" ")[0]
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground font-semibold mt-2.5 leading-snug", children: task.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 pt-2 border-t border-white/5 text-[9px] uppercase tracking-wider font-semibold", children: [
                    stage !== "Todo" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => shiftTaskStage(
                          task.id,
                          stage === "InProgress" ? "Todo" : stage === "Review" ? "InProgress" : "Review"
                        ),
                        className: "text-muted-foreground hover:text-foreground",
                        children: "← Back"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
                    stage !== "Done" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => shiftTaskStage(
                          task.id,
                          stage === "Todo" ? "InProgress" : stage === "InProgress" ? "Review" : "Done"
                        ),
                        className: "text-spark hover:text-spark-glow",
                        children: "Next →"
                      }
                    )
                  ] })
                ]
              },
              task.id
            )) })
          ] }, stage);
        }) })
      ] }),
      activeTab === "chat" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[240px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-4 space-y-3 h-[calc(100vh-130px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Sync channels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold bg-spark/10 text-spark flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5" }),
              " general-sync"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-white/5 hover:text-foreground flex items-center gap-1.5 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5" }),
              " code-blueprints"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-white/5 hover:text-foreground flex items-center gap-1.5 transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5" }),
              " clinical-design"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col h-[calc(100vh-130px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-4 pr-1 mb-4", "data-lenis-prevent": true, children: messages.map((msg) => {
            const isYou = msg.sender === "you";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex gap-3 text-xs ${isYou ? "justify-end" : "justify-start"}`,
                children: [
                  !isYou && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-gradient-spark flex items-center justify-center font-bold text-primary-foreground self-start shrink-0", children: msg.sender[0].toUpperCase() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `max-w-[70%] rounded-2xl p-3 border ${isYou ? "bg-spark/10 border-spark/20 rounded-tr-none text-foreground" : "bg-card border-white/5 rounded-tl-none text-muted-foreground"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-4 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: isYou ? "You" : `@${msg.sender}` }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-muted-foreground font-mono", children: msg.timestamp })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: msg.content })
                      ]
                    }
                  )
                ]
              },
              msg.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendChat, className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: chatInput,
                onChange: (e) => setChatInput(e.target.value),
                placeholder: "Sync with team members...",
                className: "flex-1 rounded-xl border border-white/10 bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-spark"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "rounded-xl bg-gradient-spark px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition",
                children: "Send"
              }
            )
          ] })
        ] })
      ] }),
      activeTab === "notes" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        HolographicPanel,
        {
          className: "p-5 space-y-4 h-[calc(100vh-130px)] flex flex-col justify-between",
          innerClassName: "flex flex-col h-full gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FilePen, { className: "h-4 w-4 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Sync Meeting Notes Canvas" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    playSuccess();
                    awardXP(20, "Recorded standup sync notes");
                    toast.success("Notes saved and synced to team dashboard!");
                  },
                  className: "px-3.5 py-1.5 rounded-lg bg-gradient-spark text-primary-foreground text-[10px] uppercase tracking-wider font-semibold shadow-glow",
                  children: "Save & Broadcast Sync"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: notesText,
                onChange: (e) => setNotesText(e.target.value),
                className: "flex-1 w-full rounded-xl border border-white/10 bg-background/50 p-4 font-mono text-xs leading-relaxed text-foreground outline-none focus:border-spark resize-none"
              }
            )
          ]
        }
      ),
      activeTab === "tracking" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3 h-[calc(100vh-130px)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between items-center text-center h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-spark mx-auto mb-3 animate-bounce" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Team Contribution Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-1", children: "Growth Tier: Tier-A Builder" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold font-display text-foreground", children: contrScore }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono block mt-1", children: "Total score points recorded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress to Tier-S" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                contrScore,
                " / 300"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-gradient-spark",
                style: { width: `${Math.min(100, contrScore / 300 * 100)}%` }
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          HolographicPanel,
          {
            className: "p-5 space-y-4 md:col-span-2 h-full flex flex-col justify-between",
            innerClassName: "flex flex-col h-full",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-foreground", children: "Record Team Contribution Logs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Record a mock activity to update your contribution score and feed logs." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => addManualContribution("Commit"),
                    className: "py-2.5 rounded-xl border border-white/5 bg-white/2 hover:border-spark/50 flex items-center justify-center gap-1.5 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(GitCommitHorizontal, { className: "h-4 w-4 text-purple-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Push Git Commit" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => addManualContribution("Design"),
                    className: "py-2.5 rounded-xl border border-white/5 bg-white/2 hover:border-spark/50 flex items-center justify-center gap-1.5 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4 w-4 text-emerald-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Submit Figma Mock" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => addManualContribution("Research"),
                    className: "py-2.5 rounded-xl border border-white/5 bg-white/2 hover:border-spark/50 flex items-center justify-center gap-1.5 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-blue-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Log Research Audit" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => addManualContribution("Documentation"),
                    className: "py-2.5 rounded-xl border border-white/5 bg-white/2 hover:border-spark/50 flex items-center justify-center gap-1.5 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-amber-400" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Log Dev API Docs" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5 flex-1 flex flex-col min-h-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 shrink-0", children: "Contribution history log" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1 overflow-y-auto pr-1", "data-lenis-prevent": true, children: contributions.map((contr) => {
                  const icons = {
                    Commit: GitCommitHorizontal,
                    Task: SquareCheckBig,
                    Research: Search,
                    Documentation: FileText,
                    Design: Palette
                  };
                  const IconC = icons[contr.type] || Zap;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between items-center text-xs p-2 rounded-lg border border-white/5 bg-white/2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(IconC, { className: "h-3.5 w-3.5 text-spark" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: contr.detail })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-spark font-mono font-bold", children: [
                          "+",
                          contr.xpGained,
                          " XP"
                        ] })
                      ]
                    },
                    contr.id
                  );
                }) })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("../_app.chat-QQ8jlZFF.mjs");
const Route$c = createFileRoute("/_app/chat")({
  head: () => ({
    meta: [{
      title: "AI Chat — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_app.builder-DlsToCVM.mjs");
const builderSearchSchema = objectType({
  seed: stringType().optional(),
  restoreId: stringType().optional()
});
const Route$b = createFileRoute("/_app/builder")({
  validateSearch: builderSearchSchema,
  head: () => ({
    meta: [{
      title: "AI Project Builder — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
function MobileCollapsible$1({
  label,
  children,
  className = ""
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "md:hidden w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-foreground mb-2",
        onClick: () => setOpen((o) => !o),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5 text-spark" }),
            label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${open ? "flex flex-col gap-2" : "hidden"} md:flex md:flex-col md:gap-3 md:h-full`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-[9px] uppercase tracking-widest font-bold text-muted-foreground", children: label }),
          children
        ]
      }
    )
  ] });
}
const byoxSearchSchema = objectType({
  query: stringType().optional()
});
const Route$a = createFileRoute("/_app/build-your-own-x")({
  validateSearch: byoxSearchSchema,
  head: () => ({ meta: [{ title: "Build Your Own X — ProjectSpark" }] }),
  component: BuildYourOwnX
});
const CATEGORY_ICONS = {
  Databases: "Database",
  Git: "GitBranch",
  Networks: "Network",
  "Distributed Systems": "Cpu",
  "3D Renderer": "Image",
  "AI Model": "Brain",
  "Blockchain / Cryptocurrency": "Coins",
  Bot: "MessageSquare",
  "Command-Line Tool": "Terminal",
  Docker: "Box",
  "Emulator / Virtual Machine": "Monitor",
  "Front-end Framework / Library": "Layers",
  Game: "Gamepad2",
  "Operating System": "HardDrive",
  "Programming Language": "Code",
  "Regex Engine": "Search",
  "Search Engine": "Search",
  Shell: "ChevronRightSquare",
  "Text Editor": "FileText",
  "Web Server": "Globe"
};
const PROJECTS = [
  {
    id: "redis",
    title: "Build Your Own Redis",
    category: "Databases",
    difficulty: "Medium",
    iconName: "Database",
    description: "Build an in-memory, key-value store implementing the Redis Serialization Protocol (RESP).",
    xpValue: 400,
    steps: [
      {
        id: "r1",
        title: "Respond to PING",
        desc: "Bind a TCP socket on port 6379, parse the RESP array format and reply with +PONG\\r\\n."
      },
      {
        id: "r2",
        title: "Handle Concurrency",
        desc: "Enable multiple clients to connect simultaneously by spawning a thread per connection or using async I/O."
      },
      {
        id: "r3",
        title: "SET & GET Commands",
        desc: "Store string values in a hash table in memory. Return bulk string RESP responses."
      },
      {
        id: "r4",
        title: "Key Expirations (TTL)",
        desc: "Implement active and passive key expiration. Clear expired keys on access or via a background loop."
      }
    ],
    languages: ["Go", "Rust", "Python", "Node.js"],
    resources: [
      {
        title: "Redis RESP Protocol Specification",
        url: "https://redis.io/docs/reference/protocol-spec/"
      },
      {
        title: "TCP Socket Programming Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"
      }
    ],
    snippets: {
      Go: `package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	l, err := net.Listen("tcp", "0.0.0.0:6379")
	if err != nil {
		fmt.Println("Failed to bind to port 6379")
		os.Exit(1)
	}
	defer l.Close()

	for {
		conn, err := l.Accept()
		if err != nil {
			fmt.Println("Error accepting connection: ", err.Error())
			continue
		}
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()
	conn.Write([]byte("+PONG\\r\\n"))
}`,
      Rust: `use std::net::TcpListener;
use std::io::{Read, Write};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:6379").unwrap();
    println!("Server listening on port 6379");

    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                let mut buffer = [0; 512];
                stream.read(&mut buffer).unwrap();
                stream.write_all(b"+PONG\\r\\n").unwrap();
            }
            Err(e) => { println!("Error: {}", e); }
        }
    }
}`,
      Python: `import socket

def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(("127.0.0.1", 6379))
    server.listen()
    print("Redis listener activated on port 6379")
    
    while True:
        conn, addr = server.accept()
        data = conn.recv(1024)
        conn.sendall(b"+PONG\\r\\n")
        conn.close()

if __name__ == "__main__":
    main()`,
      "Node.js": `const net = require("net");
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    socket.write("+PONG\\r\\n");
  });
});
server.listen(6379, "127.0.0.1", () => {
  console.log("RESP Engine listening on 6379");
});`
    }
  },
  {
    id: "git",
    title: "Build Your Own Git",
    category: "Git",
    difficulty: "Hard",
    iconName: "GitBranch",
    description: "Write a version control tracker that initializes a repository, builds object hashes, compresses content, and reconstructs commit trees.",
    xpValue: 500,
    steps: [
      {
        id: "g1",
        title: "Initialize .git structure",
        desc: "Create the standard structure: objects, refs/heads, and a HEAD file targeting refs/heads/master."
      },
      {
        id: "g2",
        title: "Read and write blob objects",
        desc: "Compress file content using zlib, calculate the SHA-1 hash, and write objects to .git/objects/xx/yyyy."
      },
      {
        id: "g3",
        title: "Build Git Trees",
        desc: "Generate commit trees from directories containing file references and nested subdirectory pointers."
      },
      {
        id: "g4",
        title: "Write Commit Logs",
        desc: "Format commit objects detailing author, timestamp, parent trees, and commit messages."
      }
    ],
    languages: ["Rust", "Go", "Python", "Node.js"],
    resources: [
      {
        title: "Git Internals - Plumbling and Porcelain",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects"
      },
      { title: "Zlib Compression Documentation", url: "https://www.zlib.net/" }
    ],
    snippets: {
      Rust: `use std::fs;
use std::path::Path;

fn init_repository() {
    let git_dir = Path::new(".git");
    fs::create_dir_all(git_dir.join("objects")).unwrap();
    fs::create_dir_all(git_dir.join("refs/heads")).unwrap();
    fs::write(git_dir.join("HEAD"), "ref: refs/heads/master\\n").unwrap();
    println!("Initialized empty Git repository");
}`,
      Go: `package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func initRepository() {
	os.MkdirAll(filepath.Join(".git", "objects"), 0755)
	os.MkdirAll(filepath.Join(".git", "refs", "heads"), 0755)
	os.WriteFile(filepath.Join(".git", "HEAD"), []byte("ref: refs/heads/master\\n"), 0644)
	fmt.Println("Initialized empty Git repository")
}`,
      Python: `import os

def init_repository():
    os.makedirs(".git/objects", exist_ok=True)
    os.makedirs(".git/refs/heads", exist_ok=True)
    with open(".git/HEAD", "w") as f:
        f.write("ref: refs/heads/master\\n")
    print("Initialized empty Git repository")`,
      "Node.js": `const fs = require("fs");
const path = require("path");
function initRepository() {
  fs.mkdirSync(path.join(".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(".git", "refs", "heads"), { recursive: true });
  fs.writeFileSync(path.join(".git", "HEAD"), "ref: refs/heads/master\\n");
  console.log("Initialized empty Git repository");
}`
    }
  },
  {
    id: "sqlite",
    title: "Build Your Own SQLite",
    category: "Databases",
    difficulty: "Hard",
    iconName: "Table",
    description: "Implement a SQL parser, virtual machine compiler, and file-serialized B-Tree layout to retrieve and persist database rows.",
    xpValue: 600,
    steps: [
      {
        id: "s1",
        title: "Build REPL Loop",
        desc: "Design a CLI prompt that accepts SQL statements (.exit, select, insert) and triggers command routers."
      },
      {
        id: "s2",
        title: "SQL Parser & Tokenizer",
        desc: "Tokenize input strings and compile statements into a binary virtual machine instructions tree."
      },
      {
        id: "s3",
        title: "B-Tree Row Indexing",
        desc: "Implement key-value lookups inside binary page blocks using nested B-Tree structures."
      },
      {
        id: "s4",
        title: "Page Storage Serialization",
        desc: "Write pages directly to disk blocks and read them back safely on query startup."
      }
    ],
    languages: ["Go", "Rust", "Python"],
    resources: [
      { title: "Database System Concepts - Silberschatz", url: "https://db-book.com/" },
      { title: "B-Tree Data Structure Overview", url: "https://en.wikipedia.org/wiki/B-tree" }
    ],
    snippets: {
      Go: `package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("spark-sql> ")
		input, _ := reader.ReadString('\\n')
		input = strings.TrimSpace(input)
		if input == ".exit" {
			break
		}
		executeStatement(input)
	}
}
func executeStatement(input string) { fmt.Printf("Executing statement: %s\\n", input) }`,
      Rust: `use std::io::{self, Write};

fn main() {
    loop {
        print!("spark-sql> ");
        io::stdout().flush().unwrap();
        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let trimmed = input.trim();
        if trimmed == ".exit" { break; }
        println!("Executing statement: {}", trimmed);
    }
}`,
      Python: `import sys
def main():
    while True:
        sys.stdout.write("spark-sql> ")
        sys.stdout.flush()
        line = sys.stdin.readline().strip()
        if not line: continue
        if line == ".exit": break
        print(f"Executing: {line}")
if __name__ == "__main__": main()`
    }
  },
  {
    id: "dns",
    title: "Build Your Own DNS Server",
    category: "Networks",
    difficulty: "Medium",
    iconName: "Network",
    description: "Write a UDP server that binds to port 53, parses query packet payloads, indexes domains, and delegates recursive lookup requests.",
    xpValue: 350,
    steps: [
      {
        id: "d1",
        title: "Bind UDP socket",
        desc: "Bind a socket to port 53 using UDP transport, and receive binary network buffer packets."
      },
      {
        id: "d2",
        title: "Parse DNS Headers",
        desc: "Interpret the 12-byte header details: Transaction ID, Flags, Question Count, Answer Count."
      },
      {
        id: "d3",
        title: "Parse DNS Question",
        desc: "Extract the queried domain name (encoded as labels length tags) and record query type (A, AAAA, MX)."
      },
      {
        id: "d4",
        title: "Cache Resolution",
        desc: "Formulate answer packets mapped from a local config dictionary and return a complete UDP response."
      }
    ],
    languages: ["Go", "Rust", "Node.js"],
    resources: [
      {
        title: "RFC 1035 - Domain Names - Implementation Spec",
        url: "https://datatracker.ietf.org/doc/html/rfc1035"
      },
      { title: "DNS Packet Anatomy", url: "https://www.netburner.com/learn/dns-packet-anatomy/" }
    ],
    snippets: {
      Go: `package main

import (
	"fmt"
	"net"
)

func main() {
	conn, err := net.ListenUDP("udp", &net.UDPAddr{Port: 53, IP: net.ParseIP("0.0.0.0")})
	if err != nil { fmt.Printf("UDP Bind failed: %v\\n", err); return }
	defer conn.Close()
	buf := make([]byte, 512)
	for {
		n, addr, _ := conn.ReadFromUDP(buf)
		fmt.Printf("Received %d bytes from %v\\n", n, addr)
		conn.WriteToUDP([]byte{0x00, 0x00, 0x81, 0x80}, addr)
	}
}`,
      Rust: `use std::net::UdpSocket;
fn main() {
    let socket = UdpSocket::bind("0.0.0.0:53").expect("Failed to bind UDP port 53");
    let mut buf = [0; 512];
    loop {
        let (amt, src) = socket.recv_from(&mut buf).unwrap();
        println!("Received {} bytes from {}", amt, src);
        socket.send_to(&[0; 12], &src).unwrap();
    }
}`,
      "Node.js": `const dgram = require("dgram");
const server = dgram.createSocket("udp4");
server.on("message", (msg, rinfo) => {
  server.send(Buffer.alloc(12), rinfo.port, rinfo.address);
});
server.bind(53);`
    }
  }
];
function BuildYourOwnX() {
  const { query } = Route$a.useSearch();
  const [selectedProj, setSelectedProj] = reactExports.useState(PROJECTS[0]);
  const [selectedLang, setSelectedLang] = reactExports.useState(PROJECTS[0].languages[0]);
  const [liveTutorials, setLiveTutorials] = reactExports.useState([]);
  const [categories, setCategories] = reactExports.useState(["All", "Databases", "Git", "Networks"]);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [searchVal, setSearchVal] = reactExports.useState(query || "");
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedTutorial, setSelectedTutorial] = reactExports.useState(null);
  const [checkedSteps, setCheckedSteps] = reactExports.useState({});
  const [completedTutorials, setCompletedTutorials] = reactExports.useState({});
  reactExports.useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/codecrafters-io/build-your-own-x/master/README.md"
        );
        if (!res.ok) throw new Error("Catalog fetch failed");
        const markdown = await res.text();
        const lines = markdown.split(/\r?\n/);
        const tutorialsList = [];
        const cats = /* @__PURE__ */ new Set(["All", "Databases", "Git", "Networks"]);
        let currentCat = "";
        lines.forEach((line) => {
          const l = line.trim();
          if (!l) return;
          const catHeaderMatch = l.match(/^####\s*Build\s+your\s+own\s+[`']?([^`'\n]+)[`']?/i);
          if (catHeaderMatch) {
            let catName = catHeaderMatch[1].trim();
            if (catName.toLowerCase() === "database") catName = "Databases";
            if (catName.toLowerCase() === "network stack" || catName.toLowerCase() === "web server")
              catName = "Networks";
            if (catName.toLowerCase() === "git") catName = "Git";
            currentCat = catName;
            cats.add(catName);
            return;
          }
          if (l.startsWith("* ") && currentCat) {
            let lang = "Unknown";
            let title = "";
            let url = "";
            const langMatch = l.match(/\*\*([^*]+)\*\*/);
            if (langMatch) {
              lang = langMatch[1].trim();
            }
            const titleMatch = l.match(/_(.*?)_/);
            if (titleMatch) {
              title = titleMatch[1].trim();
            } else {
              const linkMatch = l.match(/\[([^\]]+)\]/);
              if (linkMatch) {
                title = linkMatch[1].replace(/\*\*.*?\*\*/g, "").replace(/^[:\s-]+/, "").replace(/^[_\s-]+/, "").trim();
              }
            }
            const urlMatch = l.match(/\((https?:\/\/[^\s)]+)\)/);
            if (urlMatch) {
              url = urlMatch[1].trim();
            }
            if (title && url) {
              tutorialsList.push({
                id: `live-${tutorialsList.length}`,
                title: `${title} (${lang})`,
                category: currentCat,
                languages: lang.split(/\s*[/,]\s*/).map((s) => s.trim()),
                url
              });
            }
          }
        });
        setLiveTutorials(tutorialsList);
        const uniqueCats = Array.from(cats).filter((c) => c.toLowerCase() !== "all");
        setCategories(["All", ...uniqueCats.sort()]);
      } catch (err) {
        console.warn("Failed to load dynamic tutorials catalog, using offline defaults:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);
  reactExports.useEffect(() => {
    try {
      const storedSteps = localStorage.getItem("spark-byox-checked-steps");
      if (storedSteps) setCheckedSteps(JSON.parse(storedSteps));
      const storedTuts = localStorage.getItem("spark-completed-byox-tutorials");
      if (storedTuts) setCompletedTutorials(JSON.parse(storedTuts));
    } catch (e) {
      console.error(e);
    }
  }, []);
  reactExports.useEffect(() => {
    if (query) {
      setSearchVal(query);
      setSelectedCategory("All");
      const customMatch = PROJECTS.find(
        (p) => p.id.toLowerCase().includes(query.toLowerCase()) || p.title.toLowerCase().includes(query.toLowerCase())
      );
      if (customMatch) {
        setSelectedProj(customMatch);
        setSelectedLang(customMatch.languages[0]);
        setSelectedTutorial(null);
      }
    }
  }, [query]);
  const toggleStep = (stepId, xpValue) => {
    const isChecked = !checkedSteps[stepId];
    const next = { ...checkedSteps, [stepId]: isChecked };
    setCheckedSteps(next);
    localStorage.setItem("spark-byox-checked-steps", JSON.stringify(next));
    if (isChecked) {
      playSuccess();
      awardXP(xpValue, `Step completed in ${selectedProj?.title}`);
      toast.success(`Completed step! +${xpValue} XP`);
    } else {
      playClick();
    }
  };
  const claimTutorialXP = (tut) => {
    if (completedTutorials[tut.id]) {
      toast.info("Opened guide (XP already claimed).");
      return;
    }
    const next = { ...completedTutorials, [tut.id]: true };
    setCompletedTutorials(next);
    localStorage.setItem("spark-completed-byox-tutorials", JSON.stringify(next));
    playSuccess();
    awardXP(100, `Completed BYOX tutorial: ${tut.title}`);
    toast.success(`Completed! +100 XP awarded.`);
  };
  const getProjProgress = (proj) => {
    const total = proj.steps.length;
    const completed = proj.steps.filter((s) => checkedSteps[s.id]).length;
    return total > 0 ? Math.round(completed / total * 100) : 0;
  };
  const getFilteredCustomProjects = () => {
    return PROJECTS.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchVal.toLowerCase()) || p.category.toLowerCase().includes(searchVal.toLowerCase()) || p.languages.some((l) => l.toLowerCase().includes(searchVal.toLowerCase()));
      return matchCat && matchSearch;
    });
  };
  const getFilteredLiveTutorials = () => {
    return liveTutorials.filter((t) => {
      const matchCat = selectedCategory === "All" || t.category === selectedCategory;
      const matchSearch = t.title.toLowerCase().includes(searchVal.toLowerCase()) || t.category.toLowerCase().includes(searchVal.toLowerCase()) || t.languages.some((l) => l.toLowerCase().includes(searchVal.toLowerCase()));
      return matchCat && matchSearch;
    });
  };
  const currentSnippet = selectedProj ? selectedProj.snippets[selectedLang] || "// No snippet available for this language." : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: Cpu,
        title: "Build Your Own X Challenges",
        description: "Step-by-step interactive coding challenges alongside a dynamically compiled directory of build-your-own-x tutorials from GitHub."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "h-3.5 w-3.5 text-spark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Parsed Catalog (",
            getFilteredCustomProjects().length + getFilteredLiveTutorials().length,
            " guides)"
          ] }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-spark" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search tutorials by language or title...",
              value: searchVal,
              onChange: (e) => setSearchVal(e.target.value),
              className: "w-full rounded-xl border border-white/10 bg-background/50 pl-9 pr-4 py-1.5 text-xs text-foreground outline-none focus:border-spark focus:ring-1 focus:ring-spark/30 transition-all"
            }
          ),
          searchVal && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSearchVal(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-[260px_1fr] items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileCollapsible$1,
          {
            label: "Topics",
            className: "md:sticky md:top-6 md:h-[calc(100vh-48px)] md:flex-col glass rounded-3xl bg-card/45 border-white/10 p-4",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex flex-col gap-2.5 md:flex-1 md:min-h-0 md:overflow-y-auto pr-1 font-semibold text-xs [&::-webkit-scrollbar]:hidden max-h-64 overflow-y-auto md:max-h-none",
                style: { scrollbarWidth: "none" },
                "data-lenis-prevent": true,
                children: categories.map((cat) => {
                  const IconComp = Icons[CATEGORY_ICONS[cat] || "Cpu"] || Cpu;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => {
                        playClick();
                        setSelectedCategory(cat);
                      },
                      className: `w-full py-2.5 px-3.5 rounded-xl border text-left transition flex items-center gap-2.5 shrink-0 ${selectedCategory === cat ? "border-spark bg-spark/10 text-spark font-bold" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground hover:bg-white/3"}`,
                      title: cat,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: "h-4 w-4 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-left break-words leading-tight flex-1", children: cat })
                      ]
                    },
                    cat
                  );
                })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr] items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:sticky md:top-6 md:h-[calc(100vh-48px)] w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest font-bold text-muted-foreground shrink-0 mb-4", children: "Tutorial Guides" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 pb-10 [&::-webkit-scrollbar]:hidden",
                style: { scrollbarWidth: "none", msOverflowStyle: "none" },
                "data-lenis-prevent": true,
                children: [
                  getFilteredCustomProjects().map((proj) => {
                    const active = selectedProj?.id === proj.id && !selectedTutorial;
                    const progress = getProjProgress(proj);
                    const ChallengeIcon = Icons[proj.iconName] || Cpu;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        onClick: () => {
                          playClick();
                          setSelectedProj(proj);
                          setSelectedTutorial(null);
                        },
                        className: `p-3.5 rounded-2xl border cursor-pointer hover:border-spark/30 transition-all shrink-0 ${active ? "border-spark bg-spark/5" : "border-white/5 bg-white/2"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: `p-1.5 rounded-lg ${active ? "bg-spark/20 text-spark" : "bg-white/5 text-muted-foreground"}`,
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeIcon, { className: "h-4 w-4" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs text-foreground truncate", children: proj.title }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.2 rounded mt-1 inline-block uppercase", children: "Interactive" })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 space-y-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[9px] font-mono text-muted-foreground", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Checklist" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                progress,
                                "%"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "h-full bg-gradient-spark shadow-glow transition-all duration-300",
                                style: { width: `${progress}%` }
                              }
                            ) })
                          ] })
                        ]
                      },
                      proj.id
                    );
                  }),
                  getFilteredLiveTutorials().map((tut) => {
                    const active = selectedTutorial?.id === tut.id;
                    const isDone = !!completedTutorials[tut.id];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        onClick: () => {
                          playClick();
                          setSelectedTutorial(tut);
                          setSelectedProj(null);
                        },
                        className: `p-3 rounded-2xl border cursor-pointer hover:border-white/10 transition-all flex items-center justify-between gap-3 shrink-0 ${active ? "border-white/25 bg-white/5" : "border-white/5 bg-white/1"} ${isDone ? "border-emerald-500/20 bg-emerald-500/5" : ""}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h4",
                              {
                                className: `text-xs font-semibold truncate ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`,
                                children: tut.title
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground block mt-0.5", children: tut.category })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400 fill-emerald-500/10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5 text-muted-foreground opacity-60" }) })
                        ]
                      },
                      tut.id
                    );
                  }),
                  getFilteredCustomProjects().length === 0 && getFilteredLiveTutorials().length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-xs text-muted-foreground py-20", children: "No matching guides found." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto w-full", children: [
            selectedTutorial && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              HolographicPanel,
              {
                className: "p-6 flex flex-col justify-between",
                innerClassName: "flex flex-col h-full",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pr-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border border-white/10 text-muted-foreground uppercase tracking-wider", children: selectedCategory === "All" ? selectedTutorial.category : selectedCategory }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mt-2 leading-snug", children: selectedTutorial.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mt-2", children: "This is a step-by-step programming tutorial parsed from the official codecrafters Build Your Own X library. Follow this external repository guide to construct this software component from scratch." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1.5 rounded-lg text-purple-400 font-mono font-bold text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+100 XP Completion Reward" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/5 bg-background/40 p-4 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Languages Utilized" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedTutorial.languages.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-semibold text-foreground",
                          children: l
                        },
                        l
                      )) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-white/5 shrink-0 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: selectedTutorial.url,
                      onClick: () => claimTutorialXP(selectedTutorial),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex-1 py-2.5 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow text-center text-xs flex items-center justify-center gap-1.5 hover:scale-[1.01] transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Launch Guide & Claim XP" })
                      ]
                    }
                  ) })
                ]
              }
            ),
            selectedProj && !selectedTutorial && /* @__PURE__ */ jsxRuntimeExports.jsx(
              HolographicPanel,
              {
                className: "p-6 flex flex-col justify-between",
                innerClassName: "flex flex-col h-full",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pr-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 pb-4 border-b border-white/5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded text-[9px] font-bold bg-spark/10 border border-spark/20 text-spark uppercase tracking-wider", children: selectedProj.category }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground mt-1", children: selectedProj.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mt-1", children: selectedProj.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 px-2 py-0.8 rounded text-purple-400 font-mono font-bold text-[10px]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "+",
                        selectedProj.xpValue,
                        " XP"
                      ] })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "h-3.5 w-3.5 text-spark" }),
                        " Getting Started Code"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: selectedProj.languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => {
                            playClick();
                            setSelectedLang(lang);
                          },
                          className: `px-2.5 py-1 rounded-lg border text-[9px] uppercase tracking-wider font-semibold transition ${selectedLang === lang ? "border-spark bg-spark/10 text-spark" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground"}`,
                          children: lang
                        },
                        lang
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl border border-white/5 bg-background/50 overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => {
                            playSuccess();
                            navigator.clipboard.writeText(currentSnippet);
                            toast.success("Copied template to clipboard!");
                          },
                          className: "absolute right-3 top-3 z-10 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-muted-foreground hover:text-foreground transition",
                          title: "Copy Code",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "p-3.5 font-mono text-[10px] leading-relaxed text-spark overflow-x-auto max-h-[150px] select-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: currentSnippet }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-3.5 w-3.5 text-spark" }),
                      " Implementation Checklist"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: selectedProj.steps.map((step, idx) => {
                      const isDone = !!checkedSteps[step.id];
                      const stepXp = Math.round(
                        selectedProj.xpValue / selectedProj.steps.length
                      );
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          onClick: () => toggleStep(step.id, stepXp),
                          className: `flex gap-3 p-2.5 rounded-xl border cursor-pointer transition ${isDone ? "bg-emerald-500/5 border-emerald-500/20" : "bg-white/1 border-white/5 hover:border-white/10"}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pt-0.5", children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-emerald-400 fill-emerald-500/10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded-full border border-white/20 hover:border-spark" }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-xs text-foreground", children: [
                                  "Step ",
                                  idx + 1,
                                  ": ",
                                  step.title
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/10 px-1 rounded", children: [
                                  "+",
                                  stepXp,
                                  " XP"
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-normal", children: step.desc })
                            ] })
                          ]
                        },
                        step.id
                      );
                    }) })
                  ] })
                ] })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function MobileCollapsible({
  label,
  children,
  className = ""
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "md:hidden w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-foreground mb-2",
        onClick: () => setOpen((o) => !o),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3.5 w-3.5 text-spark" }),
            label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${open ? "flex flex-col gap-2" : "hidden"} md:flex md:flex-col md:gap-3 md:h-full`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-[9px] uppercase tracking-widest font-bold text-muted-foreground", children: label }),
          children
        ]
      }
    )
  ] });
}
const booksSearchSchema = objectType({
  restoreId: stringType().optional()
});
const Route$9 = createFileRoute("/_app/books")({
  validateSearch: booksSearchSchema,
  head: () => ({ meta: [{ title: "Books & Docs Hub — ProjectSpark" }] }),
  component: BooksDocsHub
});
const FALLBACK_BOOKS = [
  {
    id: "f1",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "JavaScript",
    format: "HTML",
    url: "https://eloquentjavascript.net/",
    description: "A modern introduction to programming, JavaScript, and the wonders of the digital world."
  },
  {
    id: "f2",
    title: "The Rust Programming Language",
    author: "Steve Klabnik & Carol Nichols",
    category: "Rust",
    format: "HTML",
    url: "https://doc.rust-lang.org/book/",
    description: "The official guide to programming in Rust, teaching safe, concurrent, and highly optimized code systems."
  },
  {
    id: "f3",
    title: "Go 101",
    author: "Tapir Liu",
    category: "Go",
    format: "HTML",
    url: "https://go101.org/",
    description: "A book focusing on Go syntax, semantics, and runtime Go architecture. Perfect for deep Go understanding."
  },
  {
    id: "f4",
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    category: "Python",
    format: "HTML",
    url: "https://automatetheboringstuff.com/",
    description: "Learn practical Python programming for complete beginners. Automate boring tasks in minutes."
  },
  {
    id: "f5",
    title: "Algorithms, 4th Edition",
    author: "Robert Sedgewick & Kevin Wayne",
    category: "Algorithms",
    format: "PDF",
    url: "https://algs4.cs.princeton.edu/home/",
    description: "The leading textbook on algorithms and data structures, cataloging sorting, graphs, and string processes."
  },
  {
    id: "f6",
    title: "Open Data Structures",
    author: "Pat Morin",
    category: "Algorithms",
    format: "PDF",
    url: "https://opendatastructures.org/",
    description: "An open source textbook covering standard sequences, queues, hashes, BSTs, and external memory sorting."
  },
  {
    id: "f7",
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
    category: "AI/ML",
    format: "HTML",
    url: "https://www.deeplearningbook.org/",
    description: "The definitive textbook on Deep Learning algorithms, covering CNNs, RNNs, optimizer engines, and generative modeling."
  },
  {
    id: "f8",
    title: "The Book of Secret Knowledge",
    author: "Trimstray",
    category: "Security",
    format: "GitHub",
    url: "https://github.com/trimstray/the-book-of-secret-knowledge",
    description: "An extensive curated list of libraries, security tools, cheatsheets, and CLI shell one-liners."
  },
  {
    id: "f9",
    title: "Computer Security: Art and Science",
    author: "Matt Bishop",
    category: "Security",
    format: "PDF",
    url: "https://nob.cs.ucdavis.edu/book/",
    description: "Learn foundational access control structures, cryptography protocols, security audits, and intrusion models."
  }
];
const COMMANDS = [
  {
    id: "c1",
    title: "Regex search file content (ripgrep)",
    desc: "Search directory files recursively for a string pattern with high performance.",
    command: "rg 'target_pattern' src/",
    category: "CLI Tools"
  },
  {
    id: "c2",
    title: "Parse & filter JSON responses (jq)",
    desc: "Query properties, format arrays, and filter fields from raw JSON logs.",
    command: "cat logs.json | jq '.logs[0].message'",
    category: "CLI Tools"
  },
  {
    id: "c3",
    title: "Interactive Fuzzy File Finder (fzf)",
    desc: "Quick search and match directory files fuzzily in the terminal.",
    command: "find . -type f | fzf",
    category: "CLI Tools"
  },
  {
    id: "c4",
    title: "Find ports usage (lsof)",
    desc: "List file descriptors and processes occupying a specific network port.",
    command: "lsof -i :8080",
    category: "CLI Tools"
  },
  {
    id: "c4_2",
    title: "Interactive process viewer (htop)",
    desc: "Monitor system resource usage, processes, threads, and CPU load in real time.",
    command: "htop",
    category: "CLI Tools"
  },
  {
    id: "c4_3",
    title: "Simplified CLI manuals (tldr)",
    desc: "Retrieve clean, simplified, community-driven markdown manuals and command examples.",
    command: "tldr tar",
    category: "CLI Tools"
  },
  {
    id: "c4_4",
    title: "Disk space analyzer (ncdu)",
    desc: "Explore disk usage per directory with an interactive ncurses terminal client.",
    command: "ncdu /var/log",
    category: "CLI Tools"
  },
  {
    id: "c5",
    title: "Prune Docker system structures",
    desc: "Purge all unused containers, volumes, dangling image caches, and networks.",
    command: "docker system prune -a --volumes",
    category: "Docker"
  },
  {
    id: "c6",
    title: "Live Container Stats Dashboard",
    desc: "Display continuous CPU, memory, and networking stats per container.",
    command: 'docker stats --format "table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"',
    category: "Docker"
  },
  {
    id: "c7",
    title: "Debug network container hook",
    desc: "Spin up a temporary alpine container directly on the host network for utilities.",
    command: "docker run -it --rm --network host alpine sh",
    category: "Docker"
  },
  {
    id: "c7_2",
    title: "Inspect Container IP Address",
    desc: "Extract the private bridge network IP address of a running Docker container.",
    command: "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name",
    category: "Docker"
  },
  {
    id: "c7_3",
    title: "Clean Docker volume leakages",
    desc: "Wipe out all unlinked orphaned volumes to reclaim disk capacity.",
    command: "docker volume prune -f",
    category: "Docker"
  },
  {
    id: "c8",
    title: "Stealth SYN Port Scanning (nmap)",
    desc: "Run a stealthy TCP port scan on target nodes without full handshakes.",
    command: "nmap -sS -p 1-65535 target_ip",
    category: "Network Security"
  },
  {
    id: "c9",
    title: "Configure Firewall rules (ufw)",
    desc: "Explicitly authorize incoming traffic to TCP port 22 in Ubuntu systems.",
    command: "sudo ufw allow proto tcp from any to any port 22",
    category: "Network Security"
  },
  {
    id: "c10",
    title: "Capture port 80 traffic (tcpdump)",
    desc: "Intercept and print the first 100 packets related to HTTP requests on interface eth0.",
    command: "sudo tcpdump -i eth0 -n -s 0 -c 100 'tcp port 80'",
    category: "Network Security"
  },
  {
    id: "c10_2",
    title: "Query DNS Server Records (dig)",
    desc: "Retrieve address resolution records, nameservers, and SOA tags for domains.",
    command: "dig +nocmd example.com mx +noall +answer",
    category: "Network Security"
  },
  {
    id: "c10_3",
    title: "Test open socket port (nc)",
    desc: "Check if a target host is listening on a specific TCP port with netcat.",
    command: "nc -zv target_ip 443",
    category: "Network Security"
  },
  {
    id: "c11",
    title: "Find top 10 largest files",
    desc: "Perform a folder lookup compiling and sorting files by disk volume size.",
    command: "find . -type f -exec du -h {} + | sort -hr | head -n 10",
    category: "One-Liners"
  },
  {
    id: "c12",
    title: "Prune journal logs time limit",
    desc: "Clear journald log segments keeping only logs written in the last 3 days.",
    command: "sudo journalctl --vacuum-time=3d",
    category: "One-Liners"
  },
  {
    id: "c12_2",
    title: "Find and replace text recursively",
    desc: "Substitute a query string in all files under a directory using sed.",
    command: "find . -type f -name '*.txt' -exec sed -i 's/old_text/new_text/g' {} +",
    category: "One-Liners"
  },
  {
    id: "c12_3",
    title: "Generate secure random password",
    desc: "Construct a 16-character alphanumeric password with special characters from dev/urandom.",
    command: "tr -dc 'A-Za-z0-9!@#$%' < /dev/urandom | head -c 16; echo",
    category: "One-Liners"
  }
];
function BooksDocsHub() {
  const { restoreId } = Route$9.useSearch();
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = reactExports.useState("books");
  reactExports.useEffect(() => {
    if (restoreId && user) {
      const loadSaved = async () => {
        const { data, error } = await supabase.from("build_blueprints").select("*").eq("id", restoreId).single();
        if (error) {
          toast.error("Failed to load saved book");
          return;
        }
        if (data && data.blueprint) {
          const bp = data.blueprint;
          if (bp.category === "book") {
            setBookSearch(bp.title || "");
            setSelectedBookCat("All");
            toast.success(`Found saved book: "${bp.title}"!`);
          }
        }
      };
      loadSaved();
    }
  }, [restoreId, user]);
  const handleSaveBook = async (book) => {
    if (!user) {
      toast.error("Please login to save books");
      return;
    }
    const { error } = await supabase.from("build_blueprints").insert({
      user_id: user.id,
      title: book.title,
      description: book.author,
      technologies: [book.category],
      blueprint: {
        category: "book",
        id: book.id,
        title: book.title,
        author: book.author,
        url: book.url,
        categoryName: book.category,
        format: book.format,
        description: book.description || `Read this free reference book to master topics related to ${book.category}.`
      }
    });
    if (error) {
      toast.error("Save failed: " + error.message);
    } else {
      toast.success(`Saved "${book.title}" to Saved items!`);
      awardXP(10, `Saved book: ${book.title}`);
    }
  };
  const [booksList, setBooksList] = reactExports.useState(FALLBACK_BOOKS);
  const [categories, setCategories] = reactExports.useState([
    "All",
    "JavaScript",
    "Rust",
    "Go",
    "Python",
    "Algorithms",
    "Security"
  ]);
  const [loading, setLoading] = reactExports.useState(false);
  const [bookSearch, setBookSearch] = reactExports.useState("");
  const [selectedBookCat, setSelectedBookCat] = reactExports.useState("All");
  const [cliSearch, setCliSearch] = reactExports.useState("");
  const [selectedCliCat, setSelectedCliCat] = reactExports.useState("All");
  reactExports.useEffect(() => {
    const fetchLiveBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/EbookFoundation/free-programming-books-search/master/fpb.json"
        );
        const data = await res.json();
        if (data && Array.isArray(data.children) && data.children[0] && Array.isArray(data.children[0].children)) {
          const enBlocks = data.children[0].children.filter(
            (l) => l.language && l.language.code === "en"
          );
          const list = [];
          enBlocks.forEach((enLang) => {
            enLang.sections.forEach((s) => {
              const secName = s.section;
              if (Array.isArray(s.entries)) {
                s.entries.forEach((e) => {
                  list.push({
                    id: `live-${list.length}`,
                    title: e.title,
                    url: e.url,
                    author: e.author || "Unknown",
                    category: secName,
                    format: e.notes ? e.notes.join(", ") : "HTML"
                  });
                });
              }
              if (Array.isArray(s.subsections)) {
                s.subsections.forEach((sub) => {
                  const subName = sub.section;
                  if (Array.isArray(sub.entries)) {
                    sub.entries.forEach((e) => {
                      list.push({
                        id: `live-${list.length}`,
                        title: e.title,
                        url: e.url,
                        author: e.author || "Unknown",
                        category: `${secName} - ${subName}`,
                        format: e.notes ? e.notes.join(", ") : "HTML"
                      });
                    });
                  }
                });
              }
            });
          });
          if (list.length > 0) {
            setBooksList(list);
            const cats = /* @__PURE__ */ new Set();
            list.forEach((b) => {
              if (b.category) {
                const trimmed = b.category.trim();
                const lower = trimmed.toLowerCase();
                if (trimmed && lower !== "all" && lower !== "") {
                  cats.add(trimmed);
                }
              }
            });
            const sortedCats = Array.from(cats).sort((a, b) => a.localeCompare(b));
            setCategories(["All", ...sortedCats]);
          }
        }
      } catch (err) {
        console.warn("Failed to load live books catalog, using offline fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveBooks();
  }, []);
  const handleCopyCommand = (command) => {
    playSuccess();
    navigator.clipboard.writeText(command);
    toast.success("Command copied to clipboard!");
    awardXP(10, "Copied reference CLI command");
  };
  const getFilteredBooks = () => {
    return booksList.filter((book) => {
      const matchCat = selectedBookCat === "All" || book.category === selectedBookCat;
      const matchText = book.title.toLowerCase().includes(bookSearch.toLowerCase()) || book.author.toLowerCase().includes(bookSearch.toLowerCase()) || book.category.toLowerCase().includes(bookSearch.toLowerCase());
      return matchCat && matchText;
    });
  };
  const getFilteredCommands = () => {
    return COMMANDS.filter((cmd) => {
      const matchCat = selectedCliCat === "All" || cmd.category === selectedCliCat;
      const matchText = cmd.title.toLowerCase().includes(cliSearch.toLowerCase()) || cmd.desc.toLowerCase().includes(cliSearch.toLowerCase()) || cmd.command.toLowerCase().includes(cliSearch.toLowerCase());
      return matchCat && matchText;
    });
  };
  const getCategoryColor = (category) => {
    const gradients = [
      "from-amber-500/20 to-yellow-500/20",
      "from-orange-600/20 to-amber-700/20",
      "from-cyan-500/20 to-blue-600/20",
      "from-blue-500/20 to-indigo-600/20",
      "from-purple-500/20 to-indigo-700/20",
      "from-emerald-500/20 to-teal-700/20",
      "from-pink-500/20 to-purple-600/20",
      "from-rose-500/20 to-red-700/20"
    ];
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % gradients.length;
    return gradients[idx];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        icon: BookOpen,
        title: "Books & Docs Hub",
        description: "Search EbookFoundation's free computer science reference books or browse Trimstray's Book of Secret Knowledge CLI cheatsheets."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-white/5 mb-6 text-xs font-semibold overflow-x-auto", children: ["books", "secret-knowledge"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          playClick();
          setActiveSubTab(tab);
        },
        className: `px-6 py-2.5 capitalize transition ${activeSubTab === tab ? "border-b-2 border-spark text-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: tab === "books" ? "Free Programming Books" : "Secret Knowledge CLI"
      },
      tab
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
      activeSubTab === "books" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search books by title, author, category...",
              value: bookSearch,
              onChange: (e) => setBookSearch(e.target.value),
              className: "w-full rounded-xl border border-white/10 bg-background/50 pl-9 pr-4 py-2 text-xs text-foreground outline-none focus:border-spark focus:ring-1 focus:ring-spark/30 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "h-3.5 w-3.5 text-spark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Reference Catalog (",
            getFilteredBooks().length,
            " books)"
          ] }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-spark" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-[220px_1fr] items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MobileCollapsible,
            {
              label: "Categories",
              className: "md:sticky md:top-6 md:h-[calc(100vh-48px)] md:flex-col glass rounded-3xl bg-card/45 border-white/10 p-4",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-2 font-semibold text-xs md:overflow-y-auto md:flex-1 md:min-h-0 md:pr-1 [&::-webkit-scrollbar]:hidden",
                  style: { scrollbarWidth: "none" },
                  "data-lenis-prevent": true,
                  children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        playClick();
                        setSelectedBookCat(cat);
                      },
                      className: `flex items-center justify-start text-left w-full py-2 px-3 rounded-lg border transition shrink-0 ${selectedBookCat === cat ? "border-spark bg-spark/10 text-spark font-bold" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground"}`,
                      title: cat,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-left break-words leading-tight w-full", children: cat })
                    },
                    cat
                  ))
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:flex md:flex-col md:sticky md:top-6 md:h-[calc(100vh-48px)] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "md:flex-1 md:min-h-0 md:overflow-y-auto md:pr-1 pb-4 [&::-webkit-scrollbar]:hidden",
              style: { scrollbarWidth: "none" },
              "data-lenis-prevent": true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: [
                getFilteredBooks().slice(0, 100).map((book) => {
                  const gradient = book.color || getCategoryColor(book.category);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    HolographicPanel,
                    {
                      className: "p-4 flex flex-col justify-between min-h-[190px]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: `h-20 w-full bg-gradient-to-br ${gradient} rounded-xl border border-white/5 flex flex-col justify-end p-3 relative overflow-hidden`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 text-spark opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8" }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.2 rounded bg-background/70 border border-white/10 text-[8px] text-spark font-bold w-fit uppercase mb-1 truncate max-w-full", children: book.category }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs text-foreground truncate", children: book.title }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground truncate", children: book.author })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] leading-relaxed text-muted-foreground line-clamp-3", children: book.description || `Read this free reference book to master topics related to ${book.category}. Accessible online immediately.` })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/5 mt-3 text-[11px]", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-purple-400 bg-purple-500/10 border border-purple-500/10 px-2 py-0.5 rounded text-[8px] font-bold", children: book.format }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                onClick: () => handleSaveBook(book),
                                className: "text-muted-foreground hover:text-spark p-1 rounded hover:bg-white/5 transition flex items-center gap-1 cursor-pointer",
                                title: "Save Book",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "a",
                              {
                                href: book.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onMouseEnter: playHover,
                                onClick: () => {
                                  playClick();
                                  awardXP(15, `Opened reference book: ${book.title}`);
                                },
                                className: "text-xs font-semibold text-spark hover:underline flex items-center gap-1",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Read Book" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
                                ]
                              }
                            )
                          ] })
                        ] })
                      ]
                    },
                    book.id
                  );
                }),
                getFilteredBooks().length > 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 xl:col-span-3 p-4 text-center text-xs text-muted-foreground bg-white/2 rounded-2xl border border-white/5", children: [
                  "Showing top 100 of ",
                  getFilteredBooks().length,
                  " books. Use search to refine."
                ] })
              ] })
            }
          ) })
        ] })
      ] }),
      activeSubTab === "secret-knowledge" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-in fade-in duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search commands, flags, descriptions...",
              value: cliSearch,
              onChange: (e) => setCliSearch(e.target.value),
              className: "w-full rounded-xl border border-white/10 bg-background/50 pl-9 pr-4 py-2 text-xs text-foreground outline-none focus:border-spark focus:ring-1 focus:ring-spark/30 transition-all"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-3.5 w-3.5 text-spark" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Command Shell Reference (",
            getFilteredCommands().length,
            " entries)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-[200px_1fr] items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MobileCollapsible,
            {
              label: "CLI Contexts",
              className: "md:sticky md:top-6 md:h-[calc(100vh-48px)] md:flex-col glass rounded-3xl bg-card/45 border-white/10 p-4",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-2 font-semibold text-xs md:overflow-y-auto md:flex-1 md:min-h-0 md:pr-1 [&::-webkit-scrollbar]:hidden",
                  style: { scrollbarWidth: "none" },
                  "data-lenis-prevent": true,
                  children: ["All", "CLI Tools", "Docker", "Network Security", "One-Liners"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        playClick();
                        setSelectedCliCat(cat);
                      },
                      className: `flex items-center justify-start text-left w-full py-2 px-3 rounded-lg border transition shrink-0 ${selectedCliCat === cat ? "border-spark bg-spark/10 text-spark font-bold" : "border-white/5 bg-white/2 text-muted-foreground hover:text-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-left break-words leading-tight w-full", children: cat })
                    },
                    cat
                  ))
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:flex md:flex-col md:sticky md:top-6 md:h-[calc(100vh-48px)] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "md:flex-1 md:min-h-0 md:overflow-y-auto space-y-3.5 md:pr-1 pb-4 [&::-webkit-scrollbar]:hidden",
              style: { scrollbarWidth: "none" },
              "data-lenis-prevent": true,
              children: getFilteredCommands().map((cmd) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                HolographicPanel,
                {
                  className: "p-4 flex flex-col md:flex-row md:items-center justify-between gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[8px] font-bold uppercase tracking-wider", children: cmd.category }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs text-foreground truncate", children: cmd.title })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-normal max-w-2xl", children: cmd.desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "p-3 font-mono text-[11px] text-spark bg-background/50 rounded-xl border border-white/5 overflow-x-auto select-text w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: cmd.command }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => handleCopyCommand(cmd.command),
                        className: "shrink-0 py-2 px-3 rounded-xl border border-white/5 bg-white/2 hover:border-spark/50 hover:bg-spark/10 hover:text-spark text-muted-foreground font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition self-end md:self-center cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copy command" })
                        ]
                      }
                    )
                  ]
                },
                cmd.id
              ))
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
const $$splitComponentImporter$8 = () => import("../_app.analytics-DAssuTjT.mjs");
const Route$8 = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_app.about-CbfiTS0K.mjs");
const Route$7 = createFileRoute("/_app/about")({
  head: () => ({
    meta: [{
      title: "About — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_app._-D1O-3pLc.mjs");
const Route$6 = createFileRoute("/_app/$")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_app.saved.index-CrHqNa4V.mjs");
const Route$5 = createFileRoute("/_app/saved/")({
  head: () => ({
    meta: [{
      title: "Saved Items — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_app.roadmap.index-TgT8xAVK.mjs");
const Route$4 = createFileRoute("/_app/roadmap/")({
  head: () => ({
    meta: [{
      title: "Roadmap Planner — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_app.chat.index-Dzmqyp6R.mjs");
const Route$3 = createFileRoute("/_app/chat/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_app.saved._projectId-U_UrU33X.mjs");
const Route$2 = createFileRoute("/_app/saved/$projectId")({
  head: () => ({
    meta: [{
      title: "Project Details — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_app.roadmap._slug-CsjeHhdK.mjs");
const Route$1 = createFileRoute("/_app/roadmap/$slug")({
  head: () => ({
    meta: [{
      title: "Interactive Roadmap — ProjectSpark"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_app.chat._threadId-CauZYvW6.mjs");
reactExports.lazy(() => import("./MentorHologram-BKhhPMAa.mjs").then((m) => ({
  default: m.MentorHologram
})));
const Route = createFileRoute("/_app/chat/$threadId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VerifiedRoute = Route$y.update({
  id: "/verified",
  path: "/verified",
  getParentRoute: () => Route$z
});
const LoginRoute = Route$x.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$z
});
const AppRoute = Route$w.update({
  id: "/_app",
  getParentRoute: () => Route$z
});
const IndexRoute = Route$v.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$z
});
const ApiChatRoute = Route$u.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$z
});
const AppStudyGuideRoute = Route$t.update({
  id: "/study-guide",
  path: "/study-guide",
  getParentRoute: () => AppRoute
});
const AppStartupRoute = Route$s.update({
  id: "/startup",
  path: "/startup",
  getParentRoute: () => AppRoute
});
const AppSkillsRoute = Route$r.update({
  id: "/skills",
  path: "/skills",
  getParentRoute: () => AppRoute
});
const AppSettingsRoute = Route$q.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AppRoute
});
const AppRoadmapRoute = Route$p.update({
  id: "/roadmap",
  path: "/roadmap",
  getParentRoute: () => AppRoute
});
const AppResumeRoute = Route$o.update({
  id: "/resume",
  path: "/resume",
  getParentRoute: () => AppRoute
});
const AppResourcesRoute = Route$n.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => AppRoute
});
const AppResearchRoute = Route$m.update({
  id: "/research",
  path: "/research",
  getParentRoute: () => AppRoute
});
const AppProgressRoute = Route$l.update({
  id: "/progress",
  path: "/progress",
  getParentRoute: () => AppRoute
});
const AppProfileRoute = Route$k.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AppRoute
});
const AppPortfolioRoute = Route$j.update({
  id: "/portfolio",
  path: "/portfolio",
  getParentRoute: () => AppRoute
});
const AppMentorRoute = Route$i.update({
  id: "/mentor",
  path: "/mentor",
  getParentRoute: () => AppRoute
});
const AppMarketplaceRoute = Route$h.update({
  id: "/marketplace",
  path: "/marketplace",
  getParentRoute: () => AppRoute
});
const AppJobPrepRoute = Route$g.update({
  id: "/job-prep",
  path: "/job-prep",
  getParentRoute: () => AppRoute
});
const AppGeneratorRoute = Route$f.update({
  id: "/generator",
  path: "/generator",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$e.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppCollaborationRoute = Route$d.update({
  id: "/collaboration",
  path: "/collaboration",
  getParentRoute: () => AppRoute
});
const AppChatRoute = Route$c.update({
  id: "/chat",
  path: "/chat",
  getParentRoute: () => AppRoute
});
const AppBuilderRoute = Route$b.update({
  id: "/builder",
  path: "/builder",
  getParentRoute: () => AppRoute
});
const AppBuildYourOwnXRoute = Route$a.update({
  id: "/build-your-own-x",
  path: "/build-your-own-x",
  getParentRoute: () => AppRoute
});
const AppBooksRoute = Route$9.update({
  id: "/books",
  path: "/books",
  getParentRoute: () => AppRoute
});
const AppAnalyticsRoute = Route$8.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AppRoute
});
const AppAboutRoute = Route$7.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => AppRoute
});
const AppSplatRoute = Route$6.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => AppRoute
});
const AppSavedIndexRoute = Route$5.update({
  id: "/saved/",
  path: "/saved/",
  getParentRoute: () => AppRoute
});
const AppRoadmapIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoadmapRoute
});
const AppChatIndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppChatRoute
});
const AppSavedProjectIdRoute = Route$2.update({
  id: "/saved/$projectId",
  path: "/saved/$projectId",
  getParentRoute: () => AppRoute
});
const AppRoadmapSlugRoute = Route$1.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => AppRoadmapRoute
});
const AppChatThreadIdRoute = Route.update({
  id: "/$threadId",
  path: "/$threadId",
  getParentRoute: () => AppChatRoute
});
const AppChatRouteChildren = {
  AppChatThreadIdRoute,
  AppChatIndexRoute
};
const AppChatRouteWithChildren = AppChatRoute._addFileChildren(AppChatRouteChildren);
const AppRoadmapRouteChildren = {
  AppRoadmapSlugRoute,
  AppRoadmapIndexRoute
};
const AppRoadmapRouteWithChildren = AppRoadmapRoute._addFileChildren(
  AppRoadmapRouteChildren
);
const AppRouteChildren = {
  AppSplatRoute,
  AppAboutRoute,
  AppAnalyticsRoute,
  AppBooksRoute,
  AppBuildYourOwnXRoute,
  AppBuilderRoute,
  AppChatRoute: AppChatRouteWithChildren,
  AppCollaborationRoute,
  AppDashboardRoute,
  AppGeneratorRoute,
  AppJobPrepRoute,
  AppMarketplaceRoute,
  AppMentorRoute,
  AppPortfolioRoute,
  AppProfileRoute,
  AppProgressRoute,
  AppResearchRoute,
  AppResourcesRoute,
  AppResumeRoute,
  AppRoadmapRoute: AppRoadmapRouteWithChildren,
  AppSettingsRoute,
  AppSkillsRoute,
  AppStartupRoute,
  AppStudyGuideRoute,
  AppSavedProjectIdRoute,
  AppSavedIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute,
  VerifiedRoute,
  ApiChatRoute
};
const routeTree = Route$z._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AsteroidBackground as A,
  HolographicPanel as H,
  PageTransition as P,
  Route$t as R,
  SharedCanvas as S,
  XP as X,
  playHover as a,
  useSceneStore as b,
  playSweep as c,
  PageShell as d,
  PageHeader as e,
  awardXP as f,
  unlockAchievement as g,
  generateResume as h,
  analyzeResumeATS as i,
  Route$i as j,
  getPlanetForXP as k,
  PLANETARY_LEVELS as l,
  Route$b as m,
  playSuccess as n,
  Route$2 as o,
  playClick as p,
  Route$1 as q,
  router as r,
  useAuth as u
};
