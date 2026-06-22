import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

type PlanetType =
  | "ice"
  | "lava"
  | "gas"
  | "cyber"
  | "knowledge"
  | "builder"
  | "career"
  | "team"
  | "ai";

export function PlanetarySystem({
  type,
  position = [0, 0, 0],
  scale = 1,
}: {
  type: PlanetType;
  position?: [number, number, number];
  scale?: number;
}) {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const config = useMemo(() => {
    switch (type) {
      case "ice":
        return { color: "#00ffff", emissive: "#0055ff", hasRings: false, speed: 0.2 };
      case "lava":
        return { color: "#ff2200", emissive: "#550000", hasRings: false, speed: 0.5 };
      case "gas":
        return { color: "#ffaa00", emissive: "#221100", hasRings: true, speed: 0.1 };
      case "cyber":
        return { color: "#00ff00", emissive: "#004400", hasRings: true, speed: 1.0 };
      case "knowledge":
        return { color: "#8a2be2", emissive: "#330066", hasRings: false, speed: 0.3 };
      case "builder":
        return { color: "#ff00ff", emissive: "#660066", hasRings: true, speed: 0.4 };
      case "career":
        return { color: "#ffd700", emissive: "#664400", hasRings: false, speed: 0.2 };
      case "team":
        return { color: "#ff4444", emissive: "#660000", hasRings: true, speed: 0.6 };
      case "ai":
        return { color: "#ffffff", emissive: "#444444", hasRings: true, speed: 0.8 };
      default:
        return { color: "#ffffff", emissive: "#000000", hasRings: false, speed: 0.2 };
    }
  }, [type]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * config.speed;
    if (planetRef.current) planetRef.current.rotation.y = t;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y = t * 1.2;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.5;
  });

  return (
    <group position={new THREE.Vector3(...position)} scale={scale}>
      {/* Core Planet */}
      <Sphere ref={planetRef} args={[1, 32, 32]}>
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.5}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Atmosphere (Fresnel approximation) */}
      <Sphere ref={atmosphereRef} args={[1.05, 32, 32]}>
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Optional Planetary Rings */}
      {config.hasRings && (
        <group rotation={[Math.PI / 3, 0, 0]}>
          <Torus ref={ringRef} args={[1.8, 0.2, 2, 64]}>
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </Torus>
          <Torus args={[2.2, 0.05, 2, 64]}>
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
            />
          </Torus>
        </group>
      )}
    </group>
  );
}
