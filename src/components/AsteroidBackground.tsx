import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame } from "@react-three/fiber";
import { Stars, Icosahedron } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function AsteroidField({ count = 300 }) {
  const rockRef = useRef<THREE.InstancedMesh>(null);
  const metalRef = useRef<THREE.InstancedMesh>(null);
  const crystalRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Distribute asteroids into 3 categories
  const rockCount = Math.floor(count * 0.5);
  const metalCount = Math.floor(count * 0.3);
  const crystalCount = count - rockCount - metalCount;

  const generateBelt = (amount: number, radiusBase: number, radiusSpread: number) => {
    return Array.from({ length: amount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = radiusBase + (Math.random() - 0.5) * radiusSpread;
      const height = (Math.random() - 0.5) * (radiusSpread * 0.5);

      return {
        position: [Math.cos(angle) * radius, height, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.6 + 0.1,
        speed: {
          rX: (Math.random() - 0.5) * 0.02,
          rY: (Math.random() - 0.5) * 0.02,
          rZ: (Math.random() - 0.5) * 0.02,
        },
      };
    });
  };

  interface AsteroidBeltItem {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    speed: {
      rX: number;
      rY: number;
      rZ: number;
    };
  }

  const rocks = useMemo(() => generateBelt(rockCount, 15, 8), [rockCount]);
  const metals = useMemo(() => generateBelt(metalCount, 22, 5), [metalCount]);
  const crystals = useMemo(() => generateBelt(crystalCount, 28, 4), [crystalCount]);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the entire belt slowly
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }

    const updateInstances = (
      ref: React.RefObject<THREE.InstancedMesh | null>,
      data: AsteroidBeltItem[],
    ) => {
      const mesh = ref.current;
      if (!mesh) return;
      data.forEach((item, i) => {
        item.rotation[0] += item.speed.rX;
        item.rotation[1] += item.speed.rY;
        item.rotation[2] += item.speed.rZ;

        dummy.position.set(item.position[0], item.position[1], item.position[2]);
        dummy.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };

    updateInstances(rockRef, rocks);
    updateInstances(metalRef, metals);
    updateInstances(crystalRef, crystals);
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, -0.1]}>
      {/* Damaged Rocks */}
      <instancedMesh ref={rockRef} args={[undefined, undefined, rockCount]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#444444" roughness={0.9} metalness={0.1} />
      </instancedMesh>

      {/* Metallic Asteroids */}
      <instancedMesh ref={metalRef} args={[undefined, undefined, metalCount]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#8899aa" roughness={0.2} metalness={0.8} />
      </instancedMesh>

      {/* Crystal Asteroids */}
      <instancedMesh ref={crystalRef} args={[undefined, undefined, crystalCount]}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#00e5ff"
          transmission={0.9}
          opacity={1}
          metalness={0}
          roughness={0}
          ior={1.5}
          thickness={0.5}
        />
      </instancedMesh>
    </group>
  );
}

// Keeping AsteroidBackground as a standalone test/fallback canvas component
export function AsteroidBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-black overflow-hidden pointer-events-none"
      aria-hidden
    >
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#38bdf8" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <AsteroidField count={150} />
      </Canvas>
    </div>
  );
}
