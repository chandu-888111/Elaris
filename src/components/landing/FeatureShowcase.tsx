import { motion, useScroll, useTransform, MotionValue, type MotionStyle } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Code, LayoutDashboard } from "lucide-react";

const SHOWCASES = [
  {
    id: "chat",
    title: "AI Command Center",
    subtitle: "Your intelligent co-pilot.",
    desc: "Stream responses, generate full files, and orchestrate complex deployments with an AI that understands your entire workspace context.",
    icon: MessageSquare,
    Mockup: () => (
      <div className="w-full h-full rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-spark/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex gap-3 items-center border-b border-white/5 pb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-white/40 font-mono">ai-command-center.exe</span>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          <div className="self-end glass px-4 py-2 rounded-2xl rounded-tr-sm text-sm text-white max-w-[80%]">
            Build a Next.js landing page with 3D elements.
          </div>
          <div className="self-start glass px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-white/80 max-w-[90%] border border-spark/20 bg-spark/5">
            <span className="text-spark font-bold mb-2 block">ProjectSpark AI</span>
            I'll set up a Next.js project with Three.js and Framer Motion. Here is the
            architecture...
            <div className="mt-3 bg-black/50 p-3 rounded-xl border border-white/5 font-mono text-[10px] text-emerald-400">
              npx create-next-app@latest ./ <br />
              npm i three @react-three/fiber framer-motion
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "roadmap",
    title: "Galaxy Roadmaps",
    subtitle: "Navigate your career.",
    desc: "Stop reading 2D lists. Explore your learning journey as a fully interactive 3D solar system where every skill is a planet you must conquer.",
    icon: LayoutDashboard,
    Mockup: () => (
      <div className="w-full h-full rounded-2xl bg-[#050510] border border-aurora/20 p-6 flex items-center justify-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-aurora/10 via-transparent to-transparent" />
        <div className="relative w-48 h-48 rounded-full border border-aurora/30 animate-[spin_20s_linear_infinite] flex items-center justify-center">
          <div className="absolute -top-3 w-6 h-6 rounded-full bg-aurora shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
          <div className="w-32 h-32 rounded-full border border-aurora/20 animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center">
            <div className="absolute -bottom-2 w-4 h-4 rounded-full bg-spark shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/50 shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      </div>
    ),
  },
];

function ShowcaseItem({
  showcase,
  i,
  total,
  scrollYProgress,
}: {
  showcase: (typeof SHOWCASES)[0];
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const targetScroll = i / Math.max(1, total - 1);

  const opacity = useTransform(scrollYProgress, (val) => {
    const diff = Math.abs(val - targetScroll);
    if (diff > 0.3) return 0;
    return 1 - diff / 0.3;
  });

  const filter = useTransform(scrollYProgress, (val) => {
    const diff = Math.abs(val - targetScroll);
    if (diff > 0.3) return "blur(10px) brightness(0.5)";
    const ratio = diff / 0.3;
    const blur = ratio * 10;
    const brightness = 1 - ratio * 0.5;
    return `blur(${blur}px) brightness(${brightness})`;
  });

  const scale = useTransform(scrollYProgress, (val) => {
    const diff = Math.abs(val - targetScroll);
    if (diff > 0.3) return 0.9;
    const ratio = diff / 0.3;
    return 1 - ratio * 0.1;
  });

  const zIndex = useTransform(scrollYProgress, (val) =>
    Math.abs(val - targetScroll) < 0.2 ? 10 : 0,
  );

  const pointerEvents = useTransform(scrollYProgress, (val) =>
    Math.abs(val - targetScroll) < 0.2 ? "auto" : "none",
  );

  return (
    <motion.div
      style={{ opacity, filter, scale, zIndex, pointerEvents } as MotionStyle}
      className="absolute inset-0 flex items-center px-6 md:px-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Side */}
        <div className="flex flex-col gap-6">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <showcase.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight drop-shadow-md">
            {showcase.title}
          </h2>
          <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-spark to-aurora font-medium drop-shadow-sm">
            {showcase.subtitle}
          </h3>
          <p className="text-lg text-white/50 max-w-md leading-relaxed">{showcase.desc}</p>
        </div>

        {/* Mockup Side */}
        <div className="h-[500px] w-full relative perspective-[1000px]">
          <motion.div
            initial={{ rotateY: -5, rotateX: 5 }}
            className="w-full h-full transform-style-3d shadow-2xl rounded-2xl"
          >
            <showcase.Mockup />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${SHOWCASES.length * 75}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {SHOWCASES.map((showcase, i) => (
          <ShowcaseItem
            key={showcase.id}
            showcase={showcase}
            i={i}
            total={SHOWCASES.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
