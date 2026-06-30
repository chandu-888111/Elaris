import { PerformanceMonitor } from "@react-three/drei";
import { useCallback } from "react";
import { useSceneStore } from "@/hooks/use-scene-store";

/**
 * PerformanceThrottler – automatically monitors FPS inside R3F canvas
 * and downgrades or upgrades graphicsMode in the Zustand store dynamically.
 */
export function PerformanceThrottler() {
  const graphicsMode = useSceneStore((s) => s.graphicsMode);
  const setGraphicsMode = useSceneStore((s) => s.setGraphicsMode);

  const onDecline = useCallback(() => {
    console.warn(`[PerformanceThrottler] FPS decline detected. Current: ${graphicsMode}`);
    if (graphicsMode === "ultra") {
      setGraphicsMode("high");
    } else if (graphicsMode === "high") {
      setGraphicsMode("low");
    }
  }, [graphicsMode, setGraphicsMode]);

  const onIncline = useCallback(() => {
    console.log(`[PerformanceThrottler] FPS incline detected. Current: ${graphicsMode}`);
    if (graphicsMode === "low") {
      setGraphicsMode("high");
    } else if (graphicsMode === "high") {
      setGraphicsMode("ultra");
    }
  }, [graphicsMode, setGraphicsMode]);

  return (
    <PerformanceMonitor
      onDecline={onDecline}
      onIncline={onIncline}
      flipflops={3}
      onFallback={() => {
        console.warn("[PerformanceThrottler] Hard fallback triggered. Locking to low graphics.");
        setGraphicsMode("low");
      }}
    />
  );
}

export default PerformanceThrottler;
