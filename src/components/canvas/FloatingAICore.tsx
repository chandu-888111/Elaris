import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshTransmissionMaterial, Torus, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { useLandingMemoryStore } from "@/store/LandingMemoryStore";
import React from "react";

export interface FloatingAICoreProps {
  intensity?: number;
  glow?: boolean;
}

// Glowing outer rim shader for the AI Core
const RimGlowShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform vec3 uColor;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float intensity = pow(0.75 - max(dot(normal, viewDir), 0.0), 2.5);
      gl_FragColor = vec4(uColor, 1.0) * intensity * 2.0;
    }
  `,
};

export const FloatingAICore = React.forwardRef<THREE.Mesh, FloatingAICoreProps>((props, ref) => {
  const { scrollProgress } = useLandingMemoryStore();
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const dysonRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  const { pointer } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));

  // Rare Dyson Sphere Event (15% chance to be active this session)
  const [isDysonSphere] = useState(() => Math.random() > 0.85);

  useFrame((state) => {
    if (!coreRef.current || !glowRef.current) return;
    const time = state.clock.elapsedTime;

    // AI Core 6-Stage Evolution
    let stageScale = 1.0;
    let stageRoughness = 0.1;
    let stageIor = 1.5;
    let stageTransmission = 0.9;
    let colorHex = "#00e5ff"; // Default cyan
    let ringsScale = 0.0;

    if (scrollProgress < 0.16) {
      // Stage 1: Dormant Core
      stageScale = 0.8;
      stageRoughness = 0.4;
      stageTransmission = 0.5;
      colorHex = "#111111";
      ringsScale = 0.0;
    } else if (scrollProgress < 0.33) {
      // Stage 2: Awakening Core
      stageScale = 1.0;
      stageRoughness = 0.2;
      stageTransmission = 0.8;
      colorHex = "#0077ff";
      ringsScale = 0.5;
    } else if (scrollProgress < 0.5) {
      // Stage 3: Learning Core
      stageScale = 1.2;
      stageRoughness = 0.1;
      stageTransmission = 0.9;
      colorHex = "#00e5ff";
      ringsScale = 0.8;
    } else if (scrollProgress < 0.66) {
      // Stage 4: Intelligence Core
      stageScale = 1.4;
      stageRoughness = 0.05;
      stageTransmission = 0.95;
      stageIor = 1.8;
      colorHex = "#8a2be2";
      ringsScale = 1.2;
    } else if (scrollProgress < 0.83) {
      // Stage 5: Singularity Core
      stageScale = 0.5; // Collapses
      stageRoughness = 0.0;
      stageTransmission = 1.0;
      stageIor = 2.5; // Extreme distortion
      colorHex = "#ffffff";
      ringsScale = 2.0; // Rings expand aggressively
    } else {
      // Stage 6: Cosmic Consciousness
      stageScale = 2.0; // Expands massively
      stageRoughness = 0.0;
      stageTransmission = 1.0;
      stageIor = 1.2;
      colorHex = "#ff00ff"; // Blinding magenta/cosmic
      ringsScale = 3.0;
    }

    // Floating animation
    const basePos = new THREE.Vector3(1.1, 0, 0);
    basePos.x += pointer.x * 0.4;
    basePos.y += pointer.y * 0.4;

    currentPos.current.lerp(basePos, 0.05);
    coreRef.current.position.copy(currentPos.current);
    glowRef.current.position.copy(currentPos.current);
    if (ringsRef.current) ringsRef.current.position.copy(currentPos.current);
    if (dysonRef.current) dysonRef.current.position.copy(currentPos.current);

    // Dynamic breathing based on stage
    const breathe =
      1.0 + Math.sin(time * (1.0 + scrollProgress * 5)) * (0.05 + scrollProgress * 0.1);
    const finalScale = stageScale * breathe;
    const scaleLerp = THREE.MathUtils.lerp(coreRef.current.scale.x, finalScale, 0.05);
    coreRef.current.scale.setScalar(scaleLerp);

    const glowScale = scaleLerp * (1.1 + Math.sin(time * 3) * 0.02);
    glowRef.current.scale.setScalar(glowScale);

    // Update rings scale
    if (ringsRef.current) {
      const currentRingScale = THREE.MathUtils.lerp(ringsRef.current.scale.x, ringsScale, 0.05);
      ringsRef.current.scale.setScalar(currentRingScale);
      ringsRef.current.rotation.x = time * 0.5;
      ringsRef.current.rotation.y = time * 0.3;
    }

    // Update Dyson Sphere
    if (dysonRef.current) {
      dysonRef.current.rotation.z = time * 0.1;
      dysonRef.current.rotation.x = time * 0.05;
      const dysonTargetScale = stageScale > 1.0 ? stageScale * 1.5 : 0;
      dysonRef.current.scale.setScalar(
        THREE.MathUtils.lerp(dysonRef.current.scale.x, dysonTargetScale, 0.02),
      );
    }

    // Update material properties dynamically
    const mat = coreRef.current.material as THREE.Material & {
      roughness?: number;
      transmission?: number;
      ior?: number;
      color?: THREE.Color;
    };
    if (
      mat &&
      mat.roughness !== undefined &&
      mat.transmission !== undefined &&
      mat.ior !== undefined &&
      mat.color
    ) {
      mat.roughness = THREE.MathUtils.lerp(mat.roughness, stageRoughness, 0.05);
      mat.transmission = THREE.MathUtils.lerp(mat.transmission, stageTransmission, 0.05);
      mat.ior = THREE.MathUtils.lerp(mat.ior, stageIor, 0.05);
      mat.color.lerp(new THREE.Color(colorHex), 0.05);
    }

    coreRef.current.rotation.y = time * 0.2 * (1 + scrollProgress * 2);
    coreRef.current.rotation.x = time * 0.1 * (1 + scrollProgress * 2);

    if (glowMaterialRef.current) {
      glowMaterialRef.current.uniforms.uColor.value.lerp(new THREE.Color(colorHex), 0.05);
    }
  });

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#00e5ff") },
    }),
    [],
  );

  return (
    <group>
      {/* High-end MeshTransmissionMaterial for the Core */}
      <Sphere ref={coreRef} args={[1.0, 64, 64]}>
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          transmission={0.9}
          roughness={0.2}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          color="#00e5ff"
        />
      </Sphere>

      {/* Outer shader glowing aura mesh */}
      <Sphere
        ref={(node) => {
          glowRef.current = node as THREE.Mesh;
          if (typeof ref === "function") {
            ref(node as THREE.Mesh);
          } else if (ref) {
            ref.current = node as THREE.Mesh;
          }
        }}
        args={[1.05, 64, 64]}
      >
        <shaderMaterial
          ref={glowMaterialRef}
          vertexShader={RimGlowShader.vertexShader}
          fragmentShader={RimGlowShader.fragmentShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </Sphere>

      {/* Energy Rings (Stages 2-6) */}
      <group ref={ringsRef}>
        <Torus args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Torus>
        <Torus args={[1.8, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </Torus>
      </group>

      {/* Rare Dyson Sphere Event */}
      {isDysonSphere && (
        <group ref={dysonRef}>
          {/* Rotating panels */}
          {[...Array(8)].map((_, i) => (
            <group key={i} rotation={[Math.PI * 2 * (i / 8), Math.PI / 4, 0]}>
              <Cylinder
                args={[0.1, 0.1, 2, 4]}
                position={[0, 2.5, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
              </Cylinder>
              {/* Light beams */}
              <Cylinder args={[0.01, 0.05, 2.5, 8]} position={[0, 1.25, 0]}>
                <meshBasicMaterial
                  color="#00e5ff"
                  transparent
                  opacity={0.5}
                  blending={THREE.AdditiveBlending}
                />
              </Cylinder>
            </group>
          ))}
        </group>
      )}
    </group>
  );
});
