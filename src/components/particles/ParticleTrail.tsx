// src/components/particles/ParticleTrail.tsx
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/hooks/use-scene-store";
import { PARTICLE_COUNTS } from "@/constants/particleConstants";

/**
 * ParticleTrail renders a pool of particles using a single InstancedMesh.
 * It allocates one Float32Array per graphics mode (static) and re‑allocates only
 * when the graphics mode changes. No new arrays are created inside the render loop.
 */
export function ParticleTrail() {
  const graphicsMode = useSceneStore((s) => s.graphicsMode);
  const count = PARTICLE_COUNTS[graphicsMode];

  const { gl } = useThree();

  // Persistent buffers for positions and velocities.
  const positionsRef = useRef<Float32Array>(new Float32Array(count * 3));
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3));

  // Instanced mesh reference.
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Re‑allocate buffers when graphics mode changes.
  useEffect(() => {
    // Re‑create buffers sized for new count.
    positionsRef.current = new Float32Array(count * 3);
    velocitiesRef.current = new Float32Array(count * 3);

    // Initialise random positions inside a sphere of radius 5 and random velocities.
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = Math.random() * 5;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const idx = i * 3;
      positionsRef.current[idx] = x;
      positionsRef.current[idx + 1] = y;
      positionsRef.current[idx + 2] = z;

      // Small outward velocity.
      const speed = 0.5 + Math.random() * 0.5;
      velocitiesRef.current[idx] = (x / radius) * speed;
      velocitiesRef.current[idx + 1] = (y / radius) * speed;
      velocitiesRef.current[idx + 2] = (z / radius) * speed;
    }
  }, [count]);

  // Re‑use a single matrix object to avoid allocations inside the loop.
  const matrix = new THREE.Matrix4();

  useFrame((state, delta) => {
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Update position.
      positions[idx] += velocities[idx] * delta;
      positions[idx + 1] += velocities[idx + 1] * delta;
      positions[idx + 2] += velocities[idx + 2] * delta;

      // Simple bounds: reset when beyond radius 6.
      const x = positions[idx];
      const y = positions[idx + 1];
      const z = positions[idx + 2];
      const distSq = x * x + y * y + z * z;
      if (distSq > 36) {
        // Reset to origin with new random direction.
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * 5;
        positions[idx] = radius * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[idx + 2] = radius * Math.cos(phi);
        const speed = 0.5 + Math.random() * 0.5;
        velocities[idx] = (positions[idx] / radius) * speed;
        velocities[idx + 1] = (positions[idx + 1] / radius) * speed;
        velocities[idx + 2] = (positions[idx + 2] / radius) * speed;
      }

      // Apply matrix for this instance.
      matrix.makeTranslation(positions[idx], positions[idx + 1], positions[idx + 2]);
      meshRef.current?.setMatrixAt(i, matrix);
    }
    // Notify three.js that instance matrices have changed.
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Simple geometry for a particle – a small sphere.
  const geometry = new THREE.SphereGeometry(0.03, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />;
}

export default ParticleTrail;
