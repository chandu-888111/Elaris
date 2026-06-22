import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ITEMS = [
  "React",
  "TypeScript",
  "Three.js",
  "WebGL",
  "Framer Motion",
  "GSAP",
  "Tailwind CSS",
  "Zustand",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Redis",
];

// Duplicate items for seamless infinite scroll
const DUPLICATED_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS];

export function InfiniteMarquee3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll to manipulate velocity and wave path
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(scrollY, { damping: 50, stiffness: 400 });

  // Map scroll velocity to a horizontal translation
  const xTranslate = useTransform(scrollVelocity, (v) => {
    // This creates a continuous right-to-left motion that speeds up on scroll
    const baseSpeed = Date.now() * 0.05; // Constant slow move
    return -((baseSpeed + v) % (ITEMS.length * 200)); // 200px per item approx
  });

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full py-32 overflow-hidden bg-black/20 backdrop-blur-sm border-y border-white/5"
      style={{ perspective: "1000px" }}
    >
      <div className="flex w-[200vw] items-center">
        <motion.div className="flex space-x-12" style={{ x: xTranslate }}>
          {DUPLICATED_ITEMS.map((item, idx) => {
            // Calculate a static sine wave offset based on index for the ribbon effect
            const waveY = Math.sin(idx * 0.5) * 50;
            const waveZ = Math.cos(idx * 0.5) * 100;
            const rotateX = Math.sin(idx * 0.5) * 15;

            return (
              <motion.div
                key={idx}
                className="group flex-shrink-0 cursor-pointer"
                style={{
                  y: waveY,
                  z: waveZ,
                  rotateX: rotateX,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  scale: 1.2,
                  z: 50,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <div className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-500 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                  <span className="text-2xl font-bold tracking-wider text-white/50 group-hover:text-white transition-colors duration-500">
                    {item}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
