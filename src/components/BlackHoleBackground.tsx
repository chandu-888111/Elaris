import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function AccretionDisk() {
  const count = 12000;
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2 + r * 2.5;
      const tilt = 0.25 + Math.random() * 0.1;
      const spread = (Math.random() - 0.5) * 0.06 * r;
      pos[i * 3] = Math.cos(angle) * r + spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1 * r * tilt;
      pos[i * 3 + 2] = Math.sin(angle) * r + spread;
      const t = (r - 1.1) / 5;
      // Inner: hot orange/white, Outer: cooler blue/purple (redshift/blueshift effect)
      col[i * 3] = 1 - t * 0.4;
      col[i * 3 + 1] = (0.8 - t * 0.6) * (1 - t * 0.3);
      col[i * 3 + 2] = 0.1 + t * 0.7;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.06;
  });

  return (
    <points ref={ref} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
      />
    </points>
  );
}

function PhotonRing() {
  const ref = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.z = t * 0.25;
    if (innerRef.current) innerRef.current.rotation.z = -t * 0.2;
    if (glowRef.current) glowRef.current.rotation.z = t * 0.1;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer photon ring glow */}
      <mesh ref={glowRef} rotation={[Math.PI * 0.35, 0, 0]}>
        <ringGeometry args={[1.0, 1.5, 128]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Bright inner ring */}
      <mesh ref={ref} rotation={[Math.PI * 0.35, 0, 0]}>
        <ringGeometry args={[1.08, 1.2, 128]} />
        <meshBasicMaterial
          color="#ffaa44"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Hot inner edge */}
      <mesh ref={innerRef} rotation={[Math.PI * 0.35, 0, 0]}>
        <ringGeometry args={[0.98, 1.06, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function EventHorizon() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = Math.sin(t * 0.02) * 0.1;
      ref.current.rotation.y = t * 0.05;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.01;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshBasicMaterial color="#ff4400" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function WarpedStars() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 20;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function BlackHoleBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-black overflow-hidden pointer-events-none"
      aria-hidden
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.02} />

        <Stars radius={100} depth={80} count={6000} factor={6} saturation={0} fade speed={0.5} />

        {/* Black hole in upper-right quadrant, tilted for dramatic angle */}
        <group position={[2.5, 1.5, 0]} rotation={[0.15, -0.3, 0.35]}>
          <WarpedStars />
          <AccretionDisk />
          <PhotonRing />
          <EventHorizon />
        </group>

        <EffectComposer multisampling={2}>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.6} intensity={2.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
