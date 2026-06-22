import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useSceneStore } from "../hooks/use-scene-store";

/**
 * LandingCanvas – root canvas component.
 * Renders a <Canvas> that fills the viewport and provides the global EffectComposer.
 * All 3‑D scene components will be added as children of this component.
 */
export const LandingCanvas: React.FC = () => {
  const graphicsMode = useSceneStore((state) => state.graphicsMode);

  // Enable Bloom only for High and Ultra modes (per‑performance budget).
  const enableBloom = graphicsMode !== "low";

  return (
    <Canvas
      gl={{ antialias: true, preserveDrawingBuffer: true }}
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
    >
      <Suspense fallback={null}>{/* Core scene components will be added here later */}</Suspense>
      <EffectComposer>
        {enableBloom ? (
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.2} />
        ) : (
          <></>
        )}
      </EffectComposer>
    </Canvas>
  );
};

export default LandingCanvas;
