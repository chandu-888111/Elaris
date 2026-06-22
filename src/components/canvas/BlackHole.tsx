import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

const LensDistortionShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      
      // Distortion logic simulating gravity
      vec2 distortedUv = vUv + normal.xy * rim * 0.5;
      gl_FragColor = vec4(0.0, 0.0, 0.0, rim);
    }
  `,
};

export function BlackHole({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const diskRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (diskRef.current) {
      diskRef.current.rotation.z = t * 2.0;
      diskRef.current.rotation.x = 1.2 + Math.sin(t * 0.5) * 0.1;
    }
    if (sphereRef.current) {
      // Pulsating event horizon
      sphereRef.current.scale.setScalar(1.0 + Math.sin(t * 5.0) * 0.02);
    }
  });

  return (
    <group position={new THREE.Vector3(...position)} scale={scale}>
      {/* Event Horizon */}
      <Sphere ref={sphereRef} args={[1, 64, 64]}>
        <meshBasicMaterial color="#000000" />
      </Sphere>

      {/* Gravitational Lens Distortion Aura */}
      <Sphere args={[1.5, 32, 32]}>
        <shaderMaterial
          vertexShader={LensDistortionShader.vertexShader}
          fragmentShader={LensDistortionShader.fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Accretion Disk */}
      <Torus ref={diskRef} args={[2.5, 0.5, 16, 100]}>
        <meshBasicMaterial
          color="#ff5500"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Torus>
      <Torus args={[2.0, 0.1, 16, 100]} rotation={[1.2, 0, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </Torus>
    </group>
  );
}
