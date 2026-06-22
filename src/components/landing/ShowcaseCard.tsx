import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { View } from "@react-three/drei";
import { useCursorStore } from "@/store/CursorStore";

interface ShowcaseCardProps {
  title: string;
  description: string;
  children?: React.ReactNode; // 3D content for the View
}

export function ShowcaseCard({ title, description, children }: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setVariant, setMagneticTarget } = useCursorStore();

  // Track cursor position for the hover shading system
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics-based springs for object-level physics
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const scale = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate rotation based on cursor position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -10); // Tilt up/down (inverted)
    rotateY.set(((x - centerX) / centerX) * 10); // Tilt left/right
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    setVariant("active");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    setVariant("default");
    setMagneticTarget(null);
  };

  // Advanced Hover Shader System

  // 1. Energy Border (Moves around edge)
  const energyBorder = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(0, 229, 255, 0.4),
    transparent 40%
  )`;

  // 2. Reflection Layer
  const reflection = useMotionTemplate`radial-gradient(
    300px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.15),
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex h-[400px] flex-col overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/5 shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(0,229,255,0.15)]"
    >
      {/* Aurora Layer (Slow animated gradient background) */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-screen pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -inset-[100%] animate-[spin_20s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(138,43,226,0.3)_360deg)] opacity-30" />
      </div>

      {/* Energy Border Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl"
        style={{ background: energyBorder }}
      />

      {/* Inner glass border definition */}
      <div className="pointer-events-none absolute inset-[1px] z-20 rounded-[23px] bg-gradient-to-b from-white/10 to-white/0" />

      {/* Reflection Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-3xl mix-blend-overlay"
        style={{ background: reflection }}
      />

      {/* 3D Viewport (Refraction Layer context) */}
      <div className="relative h-2/3 w-full overflow-hidden z-40">
        <div ref={viewRef} className="absolute inset-0">
          {children && (
            <View track={viewRef as React.RefObject<HTMLElement>} className="absolute inset-0">
              {children}
            </View>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-50 flex flex-1 flex-col gap-2 p-6 bg-gradient-to-t from-black/80 to-transparent translate-z-[30px]">
        <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
          {title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed font-light">{description}</p>
      </div>
    </motion.div>
  );
}
