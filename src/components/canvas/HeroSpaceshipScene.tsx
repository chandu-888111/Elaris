import { useRef, useMemo, Suspense } from "react";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame, useThree } from "@react-three/fiber";
import { InstancedMesh, Object3D, Vector3, MathUtils, PointLight } from "three";
import * as THREE from "three";
import { useCursorStore } from "@/store/CursorStore";
import { useSceneStore } from "@/hooks/use-scene-store";

// Procedural Planet Shader with Atmospheric Scattering Glow
const PlanetShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    color: { value: new Vector3(0.0, 0.5, 0.5) }, // Deep Teal / Cyan
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex noise function for planet surface
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Create noisy texture
      float noise = snoise(vPosition * 1.5 + time * 0.05);
      vec3 baseColor = mix(vec3(0.01, 0.02, 0.05), color, noise * 0.5 + 0.5);
      
      // Edge glow (fresnel)
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = dot(viewDir, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.0);
      
      vec3 finalColor = baseColor + (color * fresnel * 1.5);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

function ProceduralPlanet() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[4, 1, -15]} rotation={[0.2, 0.1, 0]}>
      <sphereGeometry args={[8, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={PlanetShaderMaterial.vertexShader}
        fragmentShader={PlanetShaderMaterial.fragmentShader}
        uniforms={PlanetShaderMaterial.uniforms}
      />
      {/* Outer atmosphere halo */}
      <mesh>
        <sphereGeometry args={[8.4, 64, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} blending={2} side={1} />
      </mesh>
    </mesh>
  );
}

function HeroSpaceship() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree(); // Normalized -1 to +1
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Continuous slow sine-wave bobbing
    const bobY = Math.sin(time * 1.5) * 0.2;
    const bobX = Math.cos(time * 0.8) * 0.1;

    // Extreme mouse-reactive parallax & banking
    const targetBankX = pointer.y * 0.3;
    const targetBankZ = pointer.x * -0.5;
    const targetBankY = pointer.x * 0.2;

    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, bobY, 0.1);
    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x,
      bobX + pointer.x * 2,
      0.05,
    );

    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetBankX, 0.05);
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetBankZ, 0.05);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetBankY, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {/* Composite primitive placeholder for the high-fidelity 3D Spaceship */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.5, 3, 32]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Wings */}
      <mesh castShadow receiveShadow position={[0, -0.5, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial color="#111" roughness={0.6} metalness={0.9} />
      </mesh>
      {/* Engine Glow */}
      <mesh position={[0, -0.8, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <pointLight position={[0, -0.8, 1.8]} color="#00e5ff" intensity={2} distance={5} />
    </group>
  );
}

function CursorLight() {
  const lightRef = useRef<PointLight>(null);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    // Map normalized pointer coordinates to 3D world space
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;

    // Smoothly move the light to follow the cursor (slightly closer to camera)
    lightRef.current.position.lerp(new Vector3(x, y, 2), 0.1);
  });

  return <pointLight ref={lightRef} color="#00e5ff" intensity={3} distance={15} decay={2} />;
}

function Starfield() {
  const count = 3000;
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  // Pre-compute star positions
  const stars = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = MathUtils.randFloatSpread(100);
      const y = MathUtils.randFloatSpread(100);
      const z = MathUtils.randFloat(-50, -10);
      const scale = MathUtils.randFloat(0.02, 0.1);
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { pointer } = state;

    // Starfield parallax layer shifting
    stars.forEach((star, i) => {
      dummy.position.set(
        star.x + pointer.x * star.z * 0.1,
        star.y + pointer.y * star.z * 0.1,
        star.z,
      );
      dummy.scale.setScalar(star.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={true}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function HeroSpaceshipScene() {
  return (
    <div
      className="fixed inset-0 z-0 h-screen w-full bg-[#05050A] overflow-hidden"
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />

          <CursorLight />
          <Starfield />
          <ProceduralPlanet />
          <HeroSpaceship />
        </Suspense>
      </Canvas>
    </div>
  );
}
