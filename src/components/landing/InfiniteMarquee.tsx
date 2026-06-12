import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion";
import { cn } from "@/lib/utils";

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
  { text: "Blockchain", color: "#e879f9" },
];

// Duplicate items enough times to fill screen and wrap seamlessly
const DUP_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export function InfiniteMarquee() {
  const baseX = useMotionValue(0);
  const time = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  useAnimationFrame((t, delta) => {
    time.set(t);
    const velocity = smoothVelocity.get();
    if (Math.abs(velocity) > 1) {
      baseX.set(baseX.get() + velocity * -0.0003);
    }
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="relative py-32 flex flex-col items-center justify-center overflow-hidden w-full">
      <div className="group flex w-full relative">
        <motion.div className="flex w-max" style={{ x }}>
          {DUP_ITEMS.map((item, i) => (
            <RibbonItem key={i} item={item} i={i} time={time} />
          ))}
        </motion.div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

function RibbonItem({
  item,
  i,
  time,
}: {
  item: { text: string; color: string };
  i: number;
  time: import("framer-motion").MotionValue<number>;
}) {
  // Compute y and rotation dynamically based on time and index
  const yOffset = useTransform(time, (t: number) => Math.sin(t / 1000 + i * 0.4) * 80);
  const rotOffset = useTransform(time, (t: number) => Math.cos(t / 1000 + i * 0.4) * 10);

  return (
    <motion.div
      className="mx-4 flex items-center justify-center shrink-0 transition-all duration-500 ease-out ribbon-card"
      style={{
        y: yOffset,
        rotate: rotOffset,
      }}
    >
      <div
        className={cn(
          "px-6 py-4 rounded-full border border-white/30 backdrop-blur-xl bg-black/60 text-white font-bold tracking-widest uppercase text-sm cursor-pointer",
        )}
        style={{
          boxShadow: `0 0 15px -5px ${item.color}33, inset 0 0 0 1px rgba(255,255,255,0.15)`,
          // @ts-expect-error setting CSS custom property
          "--glow-color": item.color,
        }}
      >
        {item.text}
      </div>
    </motion.div>
  );
}
