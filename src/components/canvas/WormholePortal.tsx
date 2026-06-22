import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";
import * as THREE from "three";

const WormholeShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Create a swirling vortex effect
      vec2 uv = vUv;
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float radius = length(uv - vec2(0.5));
      
      float spiral = sin(angle * 10.0 - uTime * 5.0 + radius * 20.0);
      float alpha = smoothstep(0.5, 0.0, radius) * (spiral * 0.5 + 0.5);
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
};

export function WormholePortal({
  position = [0, 0, 0],
  color = "#8a2be2",
}: {
  position?: [number, number, number];
  color?: string;
}) {
  const tunnelRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color],
  );

  useFrame((state) => {
    if (tunnelRef.current) {
      const mat = tunnelRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
      tunnelRef.current.rotation.z = state.clock.elapsedTime * 2.0;
    }
  });

  return (
    <group position={new THREE.Vector3(...position)}>
      <Cylinder ref={tunnelRef} args={[2, 0.1, 10, 64, 1, true]} rotation={[Math.PI / 2, 0, 0]}>
        <shaderMaterial
          vertexShader={WormholeShader.vertexShader}
          fragmentShader={WormholeShader.fragmentShader}
          uniforms={uniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </Cylinder>
    </group>
  );
}
