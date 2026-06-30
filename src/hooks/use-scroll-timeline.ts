import { useEffect } from "react";
import { useTransform, type MotionValue } from "framer-motion";
import { useSceneStore } from "@/hooks/use-scene-store";

export interface TimelineValues {
  coreScale: MotionValue<number>;
  particlesIntensity: MotionValue<number>;
  camZ: MotionValue<number>;
  camY: MotionValue<number>;
  camX: MotionValue<number>;
  glowColor: MotionValue<string>;
}

/**
 * Hook to centralize scroll-driven transformations for the 3D scene.
 * Automatically synchronizes computed values to the global scene store.
 */
export function useScrollTimeline(scrollYProgress: MotionValue<number>): TimelineValues {
  const setCoreScale = useSceneStore((s) => s.setCoreScale);
  const setCameraPosition = useSceneStore((s) => s.setCameraPosition);

  const coreScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.25, 1.6, 0.95, 1.4, 1.15],
  );

  const particlesIntensity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, 1.6, 0.5, 1.3, 0.7],
  );

  const camZ = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [4.0, 3.4, 5.0, 4.2, 4.0]);

  const camY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.0, -0.4, 0.6, -0.2, 0.1]);

  const camX = useTransform(scrollYProgress, [0, 1], [1.1, 0.0]);

  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    ["#c084fc", "#38bdf8", "#ec4899", "#818cf8"],
  );

  // Sync scroll values to Zustand store for 3D elements to consume
  useEffect(() => {
    const handleSync = () => {
      setCoreScale(coreScale.get());
      setCameraPosition([camX.get(), camY.get(), camZ.get()]);
    };

    // Initial sync
    handleSync();

    const unsub = scrollYProgress.on("change", handleSync);
    return () => unsub();
  }, [scrollYProgress, coreScale, camX, camY, camZ, setCoreScale, setCameraPosition]);

  return {
    coreScale,
    particlesIntensity,
    camZ,
    camY,
    camX,
    glowColor,
  };
}
