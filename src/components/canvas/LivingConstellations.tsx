import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";

interface Star {
  id: number;
  position: THREE.Vector3;
  unlocked: boolean;
  connections: number[];
}

export function LivingConstellations() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a procedural constellation
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 10,
        ),
        unlocked: Math.random() > 0.5, // Randomly unlock for demo
        connections: [],
      });
    }

    // Generate connections based on distance
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (arr[i].position.distanceTo(arr[j].position) < 15) {
          arr[i].connections.push(j);
        }
      }
    }
    return arr;
  }, []);

  const lines = useMemo(() => {
    const lineArr: { start: THREE.Vector3; end: THREE.Vector3; active: boolean }[] = [];
    stars.forEach((star) => {
      star.connections.forEach((targetIndex) => {
        const target = stars[targetIndex];
        lineArr.push({
          start: star.position,
          end: target.position,
          active: star.unlocked && target.unlocked,
        });
      });
    });
    return lineArr;
  }, [stars]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stars */}
      {stars.map((star) => (
        <mesh key={star.id} position={star.position}>
          <sphereGeometry args={[star.unlocked ? 0.3 : 0.1, 16, 16]} />
          <meshBasicMaterial color={star.unlocked ? "#00e5ff" : "#444444"} />
          {star.unlocked && <pointLight distance={10} intensity={0.5} color="#00e5ff" />}
        </mesh>
      ))}

      {/* Constellation Lines */}
      {lines.map((line, idx) => (
        <Line
          key={idx}
          points={[line.start, line.end]}
          color={line.active ? "#00e5ff" : "#222222"}
          lineWidth={line.active ? 2 : 0.5}
          transparent
          opacity={line.active ? 0.6 : 0.1}
        />
      ))}
    </group>
  );
}
