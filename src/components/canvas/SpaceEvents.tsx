import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEventScheduler } from "@/lib/DynamicEventScheduler";
import { BlackHole } from "./BlackHole";
import { WormholePortal } from "./WormholePortal";
import { PlanetarySystem } from "./PlanetarySystem";
import { AdvancedParticleSystem } from "./AdvancedParticleSystem";

export function SpaceEvents() {
  const { currentEvent } = useEventScheduler();
  const groupRef = useRef<THREE.Group>(null);

  // We can render different things based on the event
  return (
    <group ref={groupRef}>
      {currentEvent === "space_time_fracture" && (
        <WormholePortal position={[5, 2, -10]} color="#ff00ff" />
      )}

      {currentEvent === "supernova" && <BlackHole position={[-8, 4, -15]} scale={2} />}

      {currentEvent === "meteor_shower" && (
        <AdvancedParticleSystem type="meteor" count={200} color="#ffaa00" />
      )}

      {currentEvent === "quantum_rain" && (
        <AdvancedParticleSystem type="quantum" count={500} color="#00ffcc" />
      )}

      {/* Static planets scattered in the deep background */}
      <PlanetarySystem type="knowledge" position={[-15, 8, -25]} scale={2} />
      <PlanetarySystem type="builder" position={[18, -5, -30]} scale={3} />
      <PlanetarySystem type="ai" position={[0, -15, -40]} scale={5} />
    </group>
  );
}
