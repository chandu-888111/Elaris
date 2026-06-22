import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame } from "@react-three/fiber";
import { Sphere, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function HolographicEntity({ isTyping }: { isTyping: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = isTyping ? 3.0 : 0.5;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2 * speedMultiplier;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

      const pulseFreq = isTyping ? 5.0 : 1.5;
      const pulseAmp = isTyping ? 0.05 : 0.02;
      const scale = 1.0 + Math.sin(time * pulseFreq) * pulseAmp;
      meshRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.2;
      ringRef.current.rotation.y = time * 0.1 * speedMultiplier;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={meshRef} args={[1.5, 32, 32]}>
        <meshPhysicalMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={isTyping ? 1.5 : 0.5}
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </Sphere>

      <Sphere args={[1.4, 64, 64]}>
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={isTyping ? 0.5 : 0.1}
          roughness={0.2}
          transmission={0.9}
          thickness={0.5}
        />
      </Sphere>

      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={isTyping ? 0.8 : 0.3} />
      </mesh>
    </group>
  );
}

export default function MentorChamberCanvas({ isTyping }: { isTyping: boolean }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#02000a] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#a78bfa" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#38bdf8" />
          <Stars radius={20} depth={10} count={1000} factor={2} saturation={1} fade speed={0.5} />

          <HolographicEntity isTyping={isTyping} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={isTyping ? 2.5 : 1.5}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
