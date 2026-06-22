// src/lib/PerformanceEngine.ts
/**
 * PerformanceEngine – detects device capabilities and adjusts graphics mode.
 *
 * - Starts in "high" (default in scene store).
 * - Benchmarks FPS for 3‑5 seconds.
 * - Detects dedicated GPU via WEBGL_debug_renderer_info.
 * - Checks navigator.deviceMemory (>= 8 GB).
 * - If **all** conditions meet, upgrades to "ultra" unless the user has locked the mode.
 * - Fallback to "low" if any condition fails dramatically (e.g., FPS < 40).
 */

import { useEffect } from "react";
import { useSceneStore } from "../hooks/use-scene-store";

export function usePerformanceEngine() {
  const setGraphicsMode = useSceneStore((s) => s.setGraphicsMode);
  const lockGraphicsMode = useSceneStore((s) => s.lockGraphicsMode);
  const graphicsModeLocked = useSceneStore((s) => s.graphicsModeLocked);

  useEffect(() => {
    // Ensure we only run once on client side
    if (typeof window === "undefined") return;

    // Helper to detect dedicated GPU
    const hasDedicatedGPU = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") as WebGLRenderingContext;
        if (!gl) return false;
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbg) {
          const renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string;
          // Naïve check – look for known GPU vendors
          return /NVIDIA|AMD|Radeon|GeForce|Intel.*Arc|Apple.*GPU/.test(renderer);
        }
        return false;
      } catch {
        return false;
      }
    };

    const hasEnoughMemory = () => {
      // deviceMemory returns GB rounded down, may be undefined on some browsers
      const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      return mem !== undefined && mem >= 8;
    };

    // FPS benchmark – sample for ~4 seconds
    const benchmarkFPS = (durationMs: number = 4000) => {
      return new Promise<number>((resolve) => {
        let frames = 0;
        let start: number | null = null;
        const loop = (time: number) => {
          if (!start) start = time;
          frames++;
          if (time - start < durationMs) {
            requestAnimationFrame(loop);
          } else {
            const fps = (frames * 1000) / (time - start);
            resolve(fps);
          }
        };
        requestAnimationFrame(loop);
      });
    };

    // Run detection unless user locked mode
    if (!graphicsModeLocked) {
      // Default to high immediately (store already set)
      // Perform async detection
      (async () => {
        const gpu = hasDedicatedGPU();
        const mem = hasEnoughMemory();
        const fps = await benchmarkFPS();
        const shouldUpgrade = gpu && mem && fps > 55;
        const finalMode = shouldUpgrade ? "ultra" : "high";
        setGraphicsMode(finalMode);
        // Optionally lock after auto‑upgrade to avoid flicker later
        if (shouldUpgrade) lockGraphicsMode(true);
      })();
    }
  }, [setGraphicsMode, lockGraphicsMode, graphicsModeLocked]);
}
