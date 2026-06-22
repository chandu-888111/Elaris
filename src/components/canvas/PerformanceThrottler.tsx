import { PerformanceMonitor } from "@react-three/drei";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader.js";
import { useCallback } from "react";

export function PerformanceThrottler() {
  const onDecline = useCallback(() => {
    // If FPS drops below 50, could reduce graphics settings here
    console.warn("[PerformanceThrottler] FPS dropped. Throttling graphics.");
  }, []);

  const onIncline = useCallback(() => {
    // If FPS recovers, could increase graphics settings here
  }, []);

  return (
    <PerformanceMonitor
      onDecline={onDecline}
      onIncline={onIncline}
      flipflops={3}
      onFallback={() => console.warn("[PerformanceThrottler] Hit fallback threshold")}
    />
  );
}
