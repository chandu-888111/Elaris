import { Suspense, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, View } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, GodRays } from "@react-three/postprocessing";
import * as THREE from "three";

import { FloatingAICore } from "./canvas/FloatingAICore";
import { SpaceTravelCamera } from "./canvas/SpaceTravelCamera";
import { NebulaField } from "./canvas/NebulaField";
import { LivingConstellations } from "./canvas/LivingConstellations";
import { AdvancedParticleSystem } from "./canvas/AdvancedParticleSystem";
import { QuantumField } from "./canvas/QuantumField";
import { SpaceEvents } from "./canvas/SpaceEvents";
import { AsteroidField } from "./AsteroidBackground";
import { startEventScheduler } from "@/lib/DynamicEventScheduler";

import { useSceneStore } from "@/hooks/use-scene-store";

import { PerformanceThrottler } from "./canvas/PerformanceThrottler";

export default function GlobalCanvas() {
  const sunRef = useSceneStore((s) => s.sunRef);
  const glowColor = useSceneStore((s) => s.glowColor);
  const currentScene = useSceneStore((s) => s.currentScene);
  const particlesIntensity = useSceneStore((s) => s.particlesIntensity);
  const isLanding = currentScene === "landing" || currentScene === "default";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isLaptop =
    typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1200;

  const particleMultiplier = isMobile ? 0.2 : isLaptop ? 0.5 : 1;
  const actualIntensity = particlesIntensity * particleMultiplier;
  useEffect(() => {
    startEventScheduler();
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full bg-[#03000a] overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      >
        <fog attach="fog" args={[glowColor || "#03000a", 5, 40]} />
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[8, 8, 8]} intensity={2.5} color="#c084fc" />
          <pointLight position={[-8, -6, 4]} intensity={2.0} color="#00e5ff" />
          <pointLight position={[0, -2, -6]} intensity={1.5} color="#ec4899" />

          <SpaceTravelCamera />

          {/* Environment */}
          <Stars
            radius={100}
            depth={50}
            count={Math.floor(2000 * actualIntensity)}
            factor={3}
            saturation={0.8}
            fade
            speed={0.5}
          />
          {isLanding && <NebulaField position={[0, 0, -40]} />}
          {isLanding && <LivingConstellations />}

          {/* Advanced Particles */}
          <AdvancedParticleSystem
            type="dust"
            count={Math.floor(300 * actualIntensity)}
            color="#ffffff"
          />
          <AdvancedParticleSystem
            type="energy"
            count={Math.floor(150 * actualIntensity)}
            color="#00e5ff"
          />
          {isLanding && (
            <AdvancedParticleSystem
              type="meteor"
              count={Math.floor(50 * actualIntensity)}
              color="#ffaa00"
            />
          )}
          <AdvancedParticleSystem
            type="plasma"
            count={Math.floor(100 * actualIntensity)}
            color="#8a2be2"
          />
          {isLanding && <QuantumField />}

          {/* Hero Objects */}
          <AsteroidField count={Math.floor(100 * actualIntensity)} />
          <FloatingAICore />
          {isLanding && <SpaceEvents />}

          <PerformanceThrottler />

          {/* Post Processing */}
          <EffectComposer multisampling={0}>
            {sunRef ? (
              <GodRays
                sun={sunRef}
                samples={60}
                density={0.96}
                decay={0.9}
                weight={0.4}
                exposure={0.6}
                clampMax={1}
                blur
              />
            ) : (
              <></>
            )}
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          <View.Port />
        </Suspense>
      </Canvas>
    </div>
  );
}
