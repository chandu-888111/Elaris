import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-AqCW_hF-.mjs";
import { b as useSceneStore, p as playClick, a as playHover } from "./router-DT2A3-T4.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { c as useScroll, b as useTransform, m as motion, u as useMotionValue, d as useVelocity, a as useSpring, e as useAnimationFrame } from "../_libs/framer-motion.mjs";
import { a5 as ArrowRight, h as Sparkles, g as Brain, G as GraduationCap, M as MessageSquare, a7 as Compass, a8 as CodeXml, r as Check, R as Rocket, ah as Github } from "../_libs/lucide-react.mjs";
import { w as wrap } from "../_libs/motion-utils.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/react-three__fiber.mjs";
import "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/react-three__postprocessing.mjs";
import "../_libs/postprocessing.mjs";
import "../_libs/maath.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/react-three__drei.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
import "../_libs/troika-three-text.mjs";
import "../_libs/troika-worker-utils.mjs";
import "../_libs/webgl-sdf-generator.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/troika-three-utils.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/tunnel-rat.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const ITEMS = [
  { text: "React 19", color: "#38bdf8" },
  { text: "AI Agents", color: "#a78bfa" },
  { text: "System Design", color: "#f472b6" },
  { text: "Next.js", color: "#34d399" },
  { text: "Python", color: "#fbbf24" },
  { text: "Rust", color: "#f87171" },
  { text: "Neural Networks", color: "#60a5fa" },
  { text: "WebGL", color: "#c084fc" },
  { text: "Microservices", color: "#fb923c" },
  { text: "Three.js", color: "#2dd4bf" },
  { text: "Cybersecurity", color: "#818cf8" },
  { text: "Blockchain", color: "#e879f9" }
];
const DUP_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
function InfiniteMarquee() {
  const baseX = useMotionValue(0);
  const time = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  useAnimationFrame((t, delta) => {
    time.set(t);
    const velocity = smoothVelocity.get();
    if (Math.abs(velocity) > 1) {
      baseX.set(baseX.get() + velocity * -3e-4);
    }
  });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative py-32 flex flex-col items-center justify-center overflow-hidden w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group flex w-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "flex w-max", style: { x }, children: DUP_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RibbonItem, { item, i, time }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        /* Default state */
        .ribbon-card > div {
          filter: grayscale(100%);
          opacity: 0.6;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1);
        }
        
        /* Group hover dims all cards */
        .group:hover .ribbon-card > div {
          opacity: 0.2;
          filter: grayscale(100%) blur(2px);
        }
        
        /* Specific hovered card activates */
        .group .ribbon-card:hover > div {
          opacity: 1 !important;
          filter: grayscale(0%) blur(0) !important;
          transform: scale(1.15) !important;
          box-shadow: 0 0 60px -10px var(--glow-color), inset 0 0 20px -5px var(--glow-color) !important;
          border-color: var(--glow-color) !important;
          color: white;
        }
        
        /* Ensure hovered card is on top */
        .ribbon-card:hover {
          z-index: 50;
        }
      ` })
  ] });
}
function RibbonItem({
  item,
  i,
  time
}) {
  const yOffset = useTransform(time, (t) => Math.sin(t / 1e3 + i * 0.4) * 80);
  const rotOffset = useTransform(time, (t) => Math.cos(t / 1e3 + i * 0.4) * 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "mx-4 flex items-center justify-center shrink-0 transition-all duration-500 ease-out ribbon-card",
      style: {
        y: yOffset,
        rotate: rotOffset
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "px-6 py-4 rounded-full border border-white/30 backdrop-blur-md bg-black/60 text-white font-bold tracking-widest uppercase text-sm cursor-pointer"
          ),
          style: {
            boxShadow: `0 0 15px -5px ${item.color}33, inset 0 0 0 1px rgba(255,255,255,0.15)`,
            // @ts-expect-error setting CSS custom property
            "--glow-color": item.color
          },
          children: item.text
        }
      )
    }
  );
}
const features = [{
  icon: Sparkles,
  title: "Project Generator",
  desc: "AI-crafted, schema-validated project ideas across 10+ domains."
}, {
  icon: Brain,
  title: "AI Mentor",
  desc: "Step-by-step build guidance with milestones and checklists."
}, {
  icon: GraduationCap,
  title: "Study Guide",
  desc: "Personalized weekly roadmaps with mini-projects and quizzes."
}, {
  icon: MessageSquare,
  title: "Universal Chatbot",
  desc: "Streaming AI chat with markdown, code highlighting and memory."
}, {
  icon: Compass,
  title: "Roadmap Planner",
  desc: "Career timelines from junior to senior with skills & projects."
}, {
  icon: CodeXml,
  title: "AI Project Builder",
  desc: "Folder structure, starter code, schemas and deployment guides."
}];
const stats = [{
  n: "10+",
  l: "domains"
}, {
  n: "17",
  l: "modules"
}, {
  n: "∞",
  l: "ideas"
}, {
  n: "1",
  l: "OS"
}];
function Magnetic({
  children
}) {
  const ref = reactExports.useRef(null);
  const [position, setPosition] = reactExports.useState({
    x: 0,
    y: 0
  });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const {
      clientX,
      clientY
    } = e;
    const {
      left,
      top,
      width,
      height
    } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const reach = 100;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < reach) {
      const strength = 0.35;
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    } else {
      setPosition({
        x: 0,
        y: 0
      });
    }
  };
  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, animate: {
    x: position.x,
    y: position.y
  }, transition: {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.1
  }, className: "inline-block", children });
}
const containerVariants = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14
    }
  }
};
function Landing() {
  const {
    scrollYProgress
  } = useScroll();
  const {
    setScene,
    setState
  } = useSceneStore();
  reactExports.useEffect(() => {
    setScene("landing");
  }, [setScene]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1.25, 1.6, 0.95, 1.4, 1.15]);
  const particlesVal = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 1.6, 0.5, 1.3, 0.7]);
  const camZ = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [4, 3.4, 5, 4.2, 4]);
  const camY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -0.4, 0.6, -0.2, 0.1]);
  const colorVal = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["#c084fc", "#38bdf8", "#ec4899", "#818cf8"]);
  reactExports.useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      setState({
        coreScale: scaleVal.get(),
        particlesIntensity: particlesVal.get(),
        cameraPosition: [1.1 * (1 - latest), camY.get(), camZ.get()],
        glowColor: colorVal.get()
      });
    });
    return () => unsub();
  }, [scrollYProgress, scaleVal, particlesVal, camY, camZ, colorVal, setState]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground transition-colors", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pricing", className: "hover:text-foreground transition-colors", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#faq", className: "hover:text-foreground transition-colors", children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onMouseEnter: playHover, onClick: playClick, className: "hidden rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:inline-block transition-colors", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onMouseEnter: playHover, onClick: playClick, className: "rounded-xl bg-gradient-spark px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow block", children: "Get started" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pt-12 pb-24 lg:grid-cols-2 lg:pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-spark animate-pulse" }),
          "Now with AI Mentor & threaded chat"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.05
        }, className: "mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl", children: [
          "The AI operating system for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "builders & learners" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.15
        }, className: "mt-6 max-w-xl text-lg text-muted-foreground", children: "Generate project ideas, learn any technology, and build production apps with an AI mentor — all from one futuristic workspace." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.25
        }, className: "mt-10 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/generator", onMouseEnter: playHover, onClick: playClick, className: "group inline-flex items-center gap-2 rounded-2xl bg-gradient-spark px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:brightness-110", children: [
            "Generate project ideas",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", onMouseEnter: playHover, onClick: playClick, className: "rounded-2xl border border-border bg-card/50 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-spark/40 hover:bg-card block", children: "Talk with AI" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        scale: 0.9
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 1.2,
        delay: 0.2
      }, className: "relative aspect-square w-full max-w-[560px] mx-auto pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 rounded-full bg-gradient-spark opacity-25 blur-3xl" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 mx-auto max-w-7xl px-6 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
      once: true,
      margin: "-100px"
    }, variants: containerVariants, className: "glass grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: cardVariants, className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl font-semibold text-gradient", children: s.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs uppercase tracking-widest text-muted-foreground", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 my-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteMarquee, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "features", className: "relative z-10 mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h2, { initial: {
          opacity: 0,
          y: 15
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, className: "text-4xl font-semibold sm:text-5xl", children: "Everything you need to ship" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 15
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.1
        }, className: "mt-4 text-muted-foreground", children: "Seven tools in one. Built for the AI-native era." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true,
        margin: "-80px"
      }, variants: containerVariants, className: "mt-12 grid gap-4 md:grid-cols-3", children: features.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: cardVariants, whileHover: {
        y: -6,
        scale: 1.01
      }, className: `glass group rounded-3xl p-6 transition-shadow hover:shadow-glow ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-spark text-primary-foreground shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "pricing", className: "relative z-10 mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h2, { initial: {
          opacity: 0,
          y: 15
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, className: "text-4xl font-semibold sm:text-5xl", children: "Simple pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 15
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.1
        }, className: "mt-4 text-muted-foreground", children: "Start free. Upgrade when you ship." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true,
        margin: "-80px"
      }, variants: containerVariants, className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
        name: "Free",
        price: "$0",
        feats: ["10 ideas / month", "AI chat", "Basic mentor"]
      }, {
        name: "Pro",
        price: "$12",
        feats: ["Unlimited ideas", "All AI models", "Roadmaps & guides", "Priority speed"],
        hot: true
      }, {
        name: "Team",
        price: "$29",
        feats: ["Everything in Pro", "Team workspaces", "Shared projects", "SSO"]
      }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: cardVariants, whileHover: {
        y: -4
      }, className: `glass relative rounded-3xl p-8 ${p.hot ? "ring-spark border-spark/40" : ""}`, children: [
        p.hot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-6 rounded-full bg-gradient-spark px-3 py-1 text-xs font-medium text-primary-foreground", children: "Most popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-display text-5xl font-semibold", children: [
          p.price,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-muted-foreground", children: "/mo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2 text-sm", children: p.feats.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-spark" }),
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: `mt-8 inline-flex w-full justify-center rounded-xl px-4 py-2.5 text-sm font-medium ${p.hot ? "bg-gradient-spark text-primary-foreground shadow-glow" : "border border-border bg-card/50"} block text-center`, children: "Get started" }) })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "faq", className: "relative z-10 mx-auto max-w-3xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h2, { initial: {
        opacity: 0,
        y: 15
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "text-center text-4xl font-semibold sm:text-5xl", children: "Frequently asked" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: containerVariants, className: "mt-10 space-y-3", children: [["Is it free?", "Yes — you can use ProjectSpark free with monthly limits. Pro unlocks unlimited generations."], ["What AI models?", "We default to fast Gemini & GPT models via the Spark AI Gateway — no API keys required."], ["Can I export my projects?", "Yes — every generated idea can be saved, bookmarked and shared."]].map(([q, a]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.details, { variants: cardVariants, className: "glass group rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-medium", children: [
          q,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground transition group-open:rotate-45", children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: a })
      ] }, q)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 mx-auto max-w-7xl px-6 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.95
    }, whileInView: {
      opacity: 1,
      scale: 1
    }, viewport: {
      once: true
    }, transition: {
      type: "spring",
      stiffness: 70,
      damping: 14
    }, className: "glass-strong relative overflow-hidden rounded-3xl p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-spark opacity-15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "relative mx-auto h-10 w-10 text-spark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative mt-4 text-4xl font-semibold sm:text-5xl", children: "Ready to spark something?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mx-auto mt-4 max-w-xl text-muted-foreground", children: "Join builders generating their next portfolio project right now." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", className: "inline-flex items-center gap-2 rounded-2xl bg-gradient-spark px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow", children: [
        "Start free ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative z-10 mx-auto max-w-7xl px-6 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ProjectSpark — Powered by Spark Intelligence."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }) })
    ] }) })
  ] });
}
export {
  Landing as component
};
