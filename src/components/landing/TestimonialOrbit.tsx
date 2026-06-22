import { useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { useCursorStore } from "@/store/CursorStore";

const TESTIMONIALS = [
  {
    id: 1,
    text: "The AI Mentor feels like pair programming with a senior engineer who knows my exact context.",
    author: "Frontend Lead",
  },
  {
    id: 2,
    text: "I generated a full backend architecture in minutes, not days. The velocity is insane.",
    author: "Startup Founder",
  },
  {
    id: 3,
    text: "The roadmap visualizations completely changed how I learn complex systems.",
    author: "CS Student",
  },
  {
    id: 4,
    text: "This isn't just a tool, it's an entire developer operating system.",
    author: "Open Source Contributor",
  },
  {
    id: 5,
    text: "The UI alone is a masterclass in modern web design. Absolutely stunning.",
    author: "UI/UX Architect",
  },
];

const RADIUS = 400; // Orbit radius
const ORBIT_SPEED = 0.001; // Speed of rotation

export function TestimonialOrbit() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const rotationRef = useRef(0);
  const setCursorVariant = useCursorStore((state) => state.setVariant);

  // We rotate the parent container, and counter-rotate the children to keep them facing the camera
  useAnimationFrame((t, delta) => {
    if (hoveredId === null) {
      rotationRef.current += ORBIT_SPEED * delta;
    }
  });

  return (
    <section className="relative w-full h-[800px] bg-black overflow-hidden flex items-center justify-center perspective-[1200px]">
      {/* Central Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {TESTIMONIALS.map((t, i) => {
          const angle = (i / TESTIMONIALS.length) * Math.PI * 2;
          const isHovered = hoveredId === t.id;
          const isAnyHovered = hoveredId !== null;

          return (
            <motion.div
              key={t.id}
              className="absolute flex items-center justify-center"
              // Manually animate the orbit in a useAnimationFrame-driven style via style updates,
              // but since we want to animate *to* center on hover, Framer Motion animate prop is better.
              // To combine continuous orbit with snap-to-center, we calculate the continuous position dynamically
              // or just use Framer Motion's complex animation capabilities.
              // Here we calculate the X and Z based on the angle, then override if hovered.
              initial={false}
              animate={{
                // If hovered, snap to center. If another is hovered, push away/fade. If none hovered, orbit state handled below.
                x: isHovered
                  ? 0
                  : Math.cos(angle + (hoveredId === null ? rotationRef.current : 0)) * RADIUS,
                z: isHovered
                  ? 200
                  : Math.sin(angle + (hoveredId === null ? rotationRef.current : 0)) * RADIUS,
                scale: isHovered ? 1.5 : isAnyHovered ? 0.8 : 1,
                opacity: isHovered ? 1 : isAnyHovered ? 0.3 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: isAnyHovered ? 300 : 0, // Spring when snapping, instant when orbiting (orbit handled by useAnimationFrame loop)
                damping: 30,
                duration: isAnyHovered ? undefined : 0, // Instant update during orbit to avoid lag
              }}
              style={{
                width: 300,
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={() => {
                setHoveredId(t.id);
                setCursorVariant("hidden");
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setCursorVariant("default");
              }}
              // We need a hack to force the continuous animation to update via state or ref.
              // For a purely React way with Framer Motion, we can tie the orbit to a motion value.
            >
              <OrbitCard t={t} rotationRef={rotationRef} angle={angle} hoveredId={hoveredId} />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

interface OrbitCardProps {
  t: { id: number; text: string; author: string };
  rotationRef: React.MutableRefObject<number>;
  angle: number;
  hoveredId: number | null;
}

// Separate component to handle the continuous updates via useAnimationFrame for smooth orbit
function OrbitCard({ t, rotationRef, angle, hoveredId }: OrbitCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === t.id;
  const isAnyHovered = hoveredId !== null;

  useAnimationFrame(() => {
    if (!ref.current || isAnyHovered) return;
    // Calculate current orbit position
    const currentAngle = angle + rotationRef.current;
    const x = Math.cos(currentAngle) * RADIUS;
    const z = Math.sin(currentAngle) * RADIUS;

    // Apply transform directly for 60fps orbit without React re-renders
    ref.current.style.transform = `translate3d(${x}px, 0px, ${z}px) scale(1)`;
    ref.current.style.opacity = "1";
  });

  // When hovered, we let Framer Motion handle the snap animation via the parent.
  // We just reset the local transform so it doesn't conflict.
  if (isAnyHovered && ref.current) {
    ref.current.style.transform = "none";
  }

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 cursor-pointer ${isHovered ? "shadow-[0_0_50px_rgba(0,229,255,0.3)] border-cyan-500/50" : ""}`}
    >
      <p className="text-white/80 text-lg leading-relaxed mb-4">"{t.text}"</p>
      <p className="text-cyan-400 font-bold tracking-widest text-sm uppercase">{t.author}</p>
    </div>
  );
}
