import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame } from "@react-three/fiber";
import { Sphere, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function AIOrb({ isStreaming }: { isStreaming: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speed = isStreaming ? 3.0 : 1.0;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5 * speed;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      const scale = 1.0 + Math.sin(time * (isStreaming ? 8 : 2)) * (isStreaming ? 0.08 : 0.02);
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.2) * 0.1;
      ringRef.current.rotation.z = time * 0.2 * speed;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <Sphere ref={meshRef} args={[0.8, 32, 32]}>
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive={isStreaming ? "#38bdf8" : "#0284c7"}
          emissiveIntensity={isStreaming ? 2.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </Sphere>
      <mesh ref={ringRef}>
        <ringGeometry args={[1.2, 1.22, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={isStreaming ? 0.8 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function ChatCommandCanvas({ isStreaming }: { isStreaming: boolean }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#000510] pointer-events-none">
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <Grid
            position={[0, -2, 0]}
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={1}
            cellColor="#38bdf8"
            sectionSize={2.5}
            sectionThickness={1.5}
            sectionColor="#38bdf8"
            fadeDistance={15}
            fadeStrength={2}
          />
          <AIOrb isStreaming={isStreaming} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={isStreaming ? 2.0 : 0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
