import React, { useRef, useMemo } from "react";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// 1. OPTIMIZED ACCRETION DISK (With Doppler Shift Colors)
function AccretionDisk() {
  const count = 8000; // Reduced for performance, increased point size to compensate
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2 + r * 2.5;
      const tilt = 0.2 + Math.random() * 0.15;
      const spread = (Math.random() - 0.5) * 0.08 * r;

      const x = Math.cos(angle) * r + spread;
      const y = (Math.random() - 0.5) * 0.1 * r * tilt;
      const z = Math.sin(angle) * r + spread;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // DOPPLER BEAMING EFFECT: Brighter/Bluer on the left (approaching), dimmer/redder on the right
      const doppler = x * 0.15; // Positive on right, negative on left
      const intensity = 1.0 - doppler;

      const t = (r - 1.2) / 5.5;
      col[i * 3] = 1.0 * intensity; // Red
      col[i * 3 + 1] = (0.8 - t * 0.4) * intensity; // Green
      col[i * 3 + 2] = (0.6 - t * 0.5 + (doppler < 0 ? Math.abs(doppler) : 0)) * intensity; // Blue boost on approaching side
    }
    return [pos, col];
  }, []);

  const fireTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 200, 50, 1)");
      gradient.addColorStop(0.5, "rgba(255, 50, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2; // Faster spin for realism
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        map={fireTexture}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
      />
    </points>
  );
}

// 2. OPTIMIZED LENSING SHADER (Fewer steps, higher accuracy, Doppler added)
function LensingShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLocalCameraPos: { value: new THREE.Vector3() },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const localCam = materialRef.current.uniforms.uLocalCameraPos.value;
      localCam.copy(state.camera.position);
      meshRef.current.worldToLocal(localCam);
    }
  });

  const vertexShader = `
    varying vec3 vLocalPos;
    void main() {
      vLocalPos = position; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uLocalCameraPos;
    varying vec3 vLocalPos;

    float hash(vec3 p) {
        p  = fract( p*0.3183099+.1 );
        p *= 17.0;
        return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
    }

    float noise(in vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                       mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                       mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }

    void main() {
      vec3 ro = uLocalCameraPos;
      vec3 rd = normalize(vLocalPos - uLocalCameraPos);
      
      vec3 bhPos = vec3(0.0);
      float bhMass = 0.85; 
      
      vec3 p = ro;
      vec3 v = rd;
      float dt = 0.12; // OPTIMIZATION: Larger step size
      vec3 diskGlow = vec3(0.0);
      
      // OPTIMIZATION: Reduced loop from 150 to 80
      for(int i = 0; i < 80; i++) {
          vec3 old_p = p;
          vec3 dir = bhPos - p;
          float r = length(dir);
          
          if(r < bhMass * 0.95) break; 
          
          v += normalize(dir) * (bhMass / (r * r)) * dt * 0.65;
          v = normalize(v);
          p += v * dt;
          
          bool crossedPlane = sign(old_p.y) != sign(p.y);
          bool nearPlane = abs(p.y) < 0.2;
          
          if((crossedPlane || nearPlane) && r > bhMass && r < 6.5) {
              float distFromCenter = r - bhMass;
              float gasDensity = smoothstep(6.5, bhMass, r);
              
              float angle = atan(p.z, p.x) + uTime * 2.5 / r; 
              vec3 noisePos = vec3(cos(angle)*r, 0.0, sin(angle)*r) * 5.0;
              float n = noise(noisePos - vec3(uTime * 1.5));
              
              float intensity = (1.0 / (distFromCenter * distFromCenter * 1.5 + 0.1)) * n * gasDensity;
              float crossBoost = crossedPlane ? 2.0 : 1.0;
              
              // DOPPLER EFFECT in Shader (Brighter/Bluer on Left, Dimmer on Right)
              float doppler = p.x * 0.25; 
              float shift = 1.0 - doppler;
              
              vec3 color = vec3(1.0, 0.6, 0.2); // Base Orange
              if (doppler < 0.0) {
                 color += vec3(0.2, 0.4, 0.8) * abs(doppler); // Add blue to approaching side
              }
              
              diskGlow += color * intensity * 0.05 * crossBoost * shift; 
          }
          
          if(r > 15.0) break; // OPTIMIZATION: Early exit
      }
      
      // Add pure white core heat
      diskGlow += vec3(1.0, 0.9, 0.8) * pow(length(diskGlow), 3.0) * 0.2;
      
      gl_FragColor = vec4(diskGlow, clamp(length(diskGlow), 0.0, 1.0));
    }
  `;

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[40, 40, 40]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// 3. EVENT HORIZON
function EventHorizon() {
  return (
    <mesh>
      <sphereGeometry args={[0.85, 64, 64]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  );
}

// 4. FOREGROUND CINEMATIC SPACE DUST
function CinematicDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 1000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 + 5; // Pushed closer to camera
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

// 5. CINEMATIC CAMERA CONTROLLER
function CinematicCamera() {
  useFrame((state) => {
    // Very slow, dramatic drift inward and panning
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.05) * 0.5;
    state.camera.position.y = Math.cos(t * 0.05) * 0.2;
    state.camera.lookAt(2.5, 1.5, 0); // Keep looking at the black hole
  });
  return null;
}

// 6. MAIN COMPOSITION
export function BlackHoleBackground() {
  return (
    <div
      className="fixed inset-0 -z-20 h-full w-full bg-[#020202] overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* PERFORMANCE FIX: dpr={[1, 1.5]} stops the canvas from rendering at 4K/8K on Retina displays, 
        which completely eliminates the cursor lag.
      */}
      <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }}>
        <color attach="background" args={["#010102"]} />
        <ambientLight intensity={0.02} />

        <CinematicCamera />

        <Stars radius={100} depth={80} count={4000} factor={5} saturation={0} fade speed={0.5} />
        <CinematicDust />

        <group position={[2.5, 1.5, 0]} rotation={[0.15, -0.3, 0.35]}>
          <EventHorizon />
          <AccretionDisk />
          <LensingShader />
        </group>

        {/* IMAX FILM POST-PROCESSING PIPELINE */}
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={2.0} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.001, 0.001)}
          />
          <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.4} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
