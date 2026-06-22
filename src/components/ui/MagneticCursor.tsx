import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useCursorStore } from "@/store/CursorStore";

// Minimal particle trail system
function CursorTrail({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    let idCounter = 0;

    let lastX = -999;
    let lastY = -999;
    const tick = (time: number) => {
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

  return (
    <>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed left-0 top-0 z-[9997] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
            style={{ x: p.x, y: p.y, mixBlendMode: "screen" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

export function MagneticCursor() {
  const { variant, magneticTarget } = useCursorStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring (Inertia effect)
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
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

  useEffect(() => {
    if (magneticTarget) {
      mouseX.set(magneticTarget.x);
      mouseY.set(magneticTarget.y);
    }
  }, [magneticTarget, mouseX, mouseY]);

  if (variant === "hidden") return null;

  const isMagnetic = variant === "magnetic" && magneticTarget;
  const isPortal = variant === "portal";
  const isActive = variant === "active";

  // Calculate outer ring properties based on state
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
    targetBorder = "rgba(138,43,226,0.8)"; // Violet portal glow
    targetBlur = "blur(4px)";
    targetScale = 1.2;
  }

  return (
    <>
      <CursorTrail mouseX={mouseX} mouseY={mouseY} />

      {/* Center glowing dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(0,229,255,1)]"
        style={{ x: mouseX, y: mouseY, mixBlendMode: "difference" }}
        animate={{
          scale: variant === "text" ? 0.5 : isMagnetic || isPortal ? 0 : isActive ? 1.5 : 1,
          opacity: isMagnetic || isPortal ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Outer Ring / Shape Morph */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] border mix-blend-difference flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: targetWidth,
          height: targetHeight,
          borderColor: targetBorder,
          borderRadius: targetRadius,
          scale: targetScale,
          filter: targetBlur,
          boxShadow: isPortal ? "0 0 40px rgba(138,43,226,0.5)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
      />
    </>
  );
}
