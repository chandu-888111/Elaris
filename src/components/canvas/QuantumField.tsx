import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useLandingMemoryStore } from "@/store/LandingMemoryStore";

const EQUATIONS = [
  "∇ × E = -∂B/∂t",
  "∇ · D = ρ",
  "iℏ ∂Ψ/∂t = ĤΨ",
  "E = mc²",
  "S = k log W",
  "R_μν - 1/2 g_μν R = (8πG/c^4) T_μν",
  "F = dp/dt",
  "Δx Δp ≥ ℏ/2",
  "e^(iπ) + 1 = 0",
  "f(x) = ∫ F(k)e^(2πikx) dk",
];

export function QuantumField() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollProgress } = useLandingMemoryStore();

  const particles = useMemo(() => {
    const items = [];
    for (let i = 0; i < 50; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ),
        speed: Math.random() * 0.2 + 0.1,
        equation: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
        scale: Math.random() * 0.5 + 0.2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Only highly visible in Stage 6 (scrollProgress > 0.8)
    const targetOpacity = scrollProgress > 0.8 ? 1.0 : scrollProgress > 0.5 ? 0.2 : 0.0;

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      // Float upwards and spiral slightly
      child.position.y += p.speed * 0.05;
      child.position.x += Math.sin(time * p.speed + i) * 0.02;
      child.position.z += Math.cos(time * p.speed + i) * 0.02;

      // Wrap around
      if (child.position.y > 10) child.position.y = -10;

      // Face camera
      child.quaternion.copy(state.camera.quaternion);

      // Update opacity
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const mat = mesh.material as THREE.Material;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity * 0.5, 0.05);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={p.position}
          fontSize={p.scale}
          color="#00e5ff"
          anchorX="center"
          anchorY="middle"
          material-transparent={true}
          material-opacity={0}
          material-blending={THREE.AdditiveBlending}
        >
          {p.equation}
        </Text>
      ))}
    </group>
  );
}
