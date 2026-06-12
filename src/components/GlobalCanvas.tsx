import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  Sphere,
  MeshTransmissionMaterial,
  Stars,
  Html,
  Icosahedron,
  Line,
  Points,
  PointMaterial,
  PerformanceMonitor,
} from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, GodRays, Noise, Vignette } from "@react-three/postprocessing";
import { useSceneStore, sceneStore } from "@/hooks/use-scene-store";
import { supabase } from "@/integrations/supabase/client";

// Custom Shader for the AI Core displacement
const DisplaceShader = {
  vertex: `
    uniform float uTime;
    uniform float uDistortion;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    // Simplex 3D Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
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
      vNormal = normalize(normalMatrix * normal);
      // Displace vertices based on noise and time
      float noiseVal = snoise(position * 1.5 + uTime * 0.5);
      vec3 newPosition = position + normal * noiseVal * uDistortion;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
};

// --- Custom Components ---

function CameraController() {
  const store = useSceneStore();
  const currentPos = useRef(new THREE.Vector3(0, 0, 10));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    // We smooth the camera
    const targetPos = new THREE.Vector3(...store.cameraPosition);
    const targetLook = new THREE.Vector3(...store.cameraLookAt);

    currentPos.current.lerp(targetPos, 0.04);
    currentLook.current.lerp(targetLook, 0.05);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

function ProceduralNeuralBrain() {
  const store = useSceneStore();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const numNodes = 600;

  // Generate brain-like point cloud (two hemispheres)
  const { positions, lines } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < numNodes; i++) {
      // Ellipsoid distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const rX = 6.0 + Math.random() * 2.0;
      const rY = 4.5 + Math.random() * 1.5;
      const rZ = 5.0 + Math.random() * 2.0;

      let x = rX * Math.sin(phi) * Math.cos(theta);
      const y = rY * Math.sin(phi) * Math.sin(theta);
      const z = rZ * Math.cos(phi);

      // Split into hemispheres
      if (x > 0) x += 0.5;
      else x -= 0.5;

      pts.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearby nodes
    const linePositions = [];
    for (let i = 0; i < pts.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.8 && connections < 4) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z);
          linePositions.push(pts[j].x, pts[j].y, pts[j].z);
          connections++;
        }
      }
    }

    const posArray = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      posArray[i * 3] = pts[i].x;
      posArray[i * 3 + 1] = pts[i].y;
      posArray[i * 3 + 2] = pts[i].z;
    }

    return {
      positions: posArray,
      lines: new Float32Array(linePositions),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (pointsRef.current && linesRef.current) {
      pointsRef.current.rotation.y = Math.sin(t * 0.05) * 0.2;
      linesRef.current.rotation.y = Math.sin(t * 0.05) * 0.2;

      // Pulse opacity based on scene
      const targetOpacity = store.currentScene === "landing" ? 0.3 + Math.sin(t * 2) * 0.1 : 0.05;
      (pointsRef.current.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(
        (pointsRef.current.material as THREE.PointsMaterial).opacity,
        targetOpacity,
        0.05,
      );
      (linesRef.current.material as THREE.LineBasicMaterial).opacity = THREE.MathUtils.lerp(
        (linesRef.current.material as THREE.LineBasicMaterial).opacity,
        targetOpacity * 0.5,
        0.05,
      );
    }
  });

  return (
    <group position={[0, 0, -8]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={store.glowColor}
          size={0.08}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={store.glowColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function InfiniteParticleField() {
  const store = useSceneStore();
  const count = 2000;
  const { mouse } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  const [particles, pointsArray] = useMemo(() => {
    const pts = [];
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 30;
      pts.push({ x, y, z, origX: x, origY: y, origZ: z, speed: Math.random() * 0.2 });
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return [pts, arr];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const t = state.clock.elapsedTime;

    // Convert mouse to world roughly
    const mouseX = (mouse.x * state.viewport.width) / 2;
    const mouseY = (mouse.y * state.viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      // Float
      p.y = p.origY + Math.sin(t * p.speed + p.origX) * 0.5;

      // Cursor repulsion
      const dx = p.origX - mouseX;
      const dy = p.origY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let pushX = 0;
      let pushY = 0;
      if (dist < 4.0) {
        const force = (4.0 - dist) * 0.5;
        pushX = (dx / dist) * force;
        pushY = (dy / dist) * force;
      }

      pos.setXYZ(i, p.origX + pushX, p.y + pushY, p.origZ);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pointsArray, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TechnologySatellites() {
  const store = useSceneStore();
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(1);

  const techs = ["AI", "Cloud", "Web3", "Systems", "Security"];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
    const target = store.postScenePhase >= 1 ? 0 : 1;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, target, 0.03);
    groupRef.current?.children.forEach((child) => {
      child.children.forEach((c) => {
        if (c.type === "Mesh") {
          (c as THREE.Mesh).material = (c as THREE.Mesh).material as THREE.Material;
          const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat.opacity !== undefined) mat.opacity = opacityRef.current;
        }
      });
    });
  });

  if (store.currentScene !== "landing") return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {techs.map((tech, i) => {
        const angle = (i / techs.length) * Math.PI * 2;
        const radius = 3.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={tech} position={[x, Math.sin(angle * 2) * 0.5, z]}>
            <Sphere args={[0.15, 32, 32]}>
              <meshBasicMaterial color="#38bdf8" transparent opacity={1} />
            </Sphere>
            <Html distanceFactor={10} center position={[0, -0.3, 0]}>
              <div
                className="text-[8px] font-bold tracking-widest text-white/80 uppercase whitespace-nowrap bg-black/40 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md"
                style={{ opacity: opacityRef.current }}
              >
                {tech}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export function TheHeartCore({ setSunRef }: { setSunRef: (ref: THREE.Mesh | null) => void }) {
  const store = useSceneStore();
  const coreRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();

  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetDistort = useRef(0.15);

  useEffect(() => {
    if (lightRef.current) {
      setSunRef(lightRef.current);
    }
  }, [setSunRef]);

  useFrame((state) => {
    if (!coreRef.current) return;
    const t = state.clock.elapsedTime;

    const basePos = new THREE.Vector3(0, 0, 0);
    switch (store.currentScene) {
      case "landing":
        // Base is center, but mouse attracts it slightly
        basePos.set(mouse.x * 0.8, mouse.y * 0.8, 0);
        break;
      case "dashboard":
        basePos.set(2.5, 1.0, -1);
        break;
      case "roadmap":
        // Move core out of the way for RoadmapGalaxy
        basePos.set(0, -10, 0);
        break;
      default:
        basePos.set(0, 0, -2);
    }

    currentPos.current.lerp(basePos, 0.05);
    coreRef.current.position.copy(currentPos.current);
    if (lightRef.current) lightRef.current.position.copy(currentPos.current);

    // Pulse scale — use coreScale from store so it grows during zoom-in
    const baseScale = store.currentScene === "landing" ? store.coreScale : 0.8;
    const breathe = baseScale + Math.sin(t * 2.0) * 0.05;
    coreRef.current.scale.setScalar(breathe);

    // Mouse distortion interaction
    const distToMouse = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
    const isHovering = store.currentScene === "landing" && distToMouse < 0.5;
    targetDistort.current = THREE.MathUtils.lerp(
      targetDistort.current,
      isHovering ? 0.4 : 0.15,
      0.1,
    );

    // Custom shader uniforms updating (We use MeshTransmissionMaterial, but we could hook onBeforeCompile.
    // For pure awwwards icosahedron morphing, we use a custom shader material for the core, and standard transmission on top?
    // Let's just use Icosahedron with MeshTransmissionMaterial and let the user's browser handle the standard displacement map, or we just rotate and scale it to simulate breathing, keeping it physically beautiful glass.)

    coreRef.current.rotation.y = t * 0.2;
    coreRef.current.rotation.x = t * 0.1;
  });

  return (
    <group>
      {/* Hidden intense light source for God Rays */}
      <Sphere ref={lightRef} args={[0.5, 16, 16]}>
        <meshBasicMaterial color={store.glowColor} />
      </Sphere>

      {/* Massive Icosahedron Glass Core */}
      <Icosahedron ref={coreRef} args={[1, 6]}>
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          transmission={1.0}
          roughness={0.15}
          thickness={1.5}
          ior={1.4}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.6}
          distortionScale={0.4}
          temporalDistortion={0.3}
          color="#ffffff"
          attenuationColor={store.glowColor}
          attenuationDistance={2}
        />
      </Icosahedron>
    </group>
  );
}

function FallingStars() {
  const store = useSceneStore();
  const count = 1000;
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 30 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      spd[i] = 0.3 + Math.random() * 1.2;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const active = useRef(false);

  useFrame((state) => {
    if (!ref.current) return;
    if (store.postScenePhase >= 1) active.current = true;
    if (!active.current) return;

    const pos = ref.current.geometry.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i);
      y -= speeds[i] * 0.03;
      if (y < -15) {
        y = 15;
        pos.setX(i, (Math.random() - 0.5) * 50);
        pos.setZ(i, (Math.random() - 0.5) * 50);
      }
      pos.setY(i, y + Math.sin(t * speeds[i] + i) * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#b4c6e7"
        size={0.06}
        transparent
        opacity={active.current ? 0.6 : 0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TravelingAsteroids() {
  const store = useSceneStore();
  const count = 40;
  const collisionFired = useRef(false);
  const activated = useRef(false);
  const groupRef = useRef<THREE.Group>(null);

  type ObjState = {
    pos: THREE.Vector3;
    vel: THREE.Vector3;
    angle: number;
    orbitRadius: number;
    orbitSpeed: number;
    ySpeed: number;
    type: number; // 0=asteroid, 1=comet, 2=meteor
    scale: number;
    hue: number;
    collider: boolean;
    colliding: boolean;
    collided: boolean;
  };

  const objects = useRef<ObjState[]>([]);
  const collisionTimer = useRef(0);
  const phase2Start = useRef(0);

  useEffect(() => {
    const arr: ObjState[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitR = 6 + Math.random() * 12;
      const tilt = (Math.random() - 0.5) * 0.5;
      arr.push({
        pos: new THREE.Vector3(
          Math.cos(angle) * orbitR,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * orbitR,
        ),
        vel: new THREE.Vector3(),
        angle: angle,
        orbitRadius: orbitR,
        orbitSpeed: 0.003 + Math.random() * 0.008,
        ySpeed: (Math.random() - 0.5) * 0.005,
        type: i % 3,
        scale: 0.1 + Math.random() * 0.25,
        hue: 0.03 + Math.random() * 0.15,
        collider: i < 2,
        colliding: false,
        collided: false,
      });
    }
    objects.current = arr;
  }, []);

  useFrame((state) => {
    if (store.postScenePhase >= 2) {
      if (!activated.current) {
        activated.current = true;
        phase2Start.current = state.clock.elapsedTime;
      }
    }
    if (!activated.current) return;

    const elapsed = state.clock.elapsedTime - phase2Start.current;
    const phase2Progress = Math.min(elapsed / 5, 1); // phase 2 lasts ~5s before collision

    let allCollided = true;

    for (let i = 0; i < count; i++) {
      const o = objects.current[i];
      if (!o) continue;

      if (o.collider && !o.collided) {
        // Colliders: initially orbit, then converge on center
        const convergeStart = 0.6;
        if (phase2Progress < convergeStart) {
          // Orbit freely
          o.angle += o.orbitSpeed;
          o.pos.set(
            Math.cos(o.angle) * o.orbitRadius,
            (Math.random() - 0.5) * 0.02,
            Math.sin(o.angle) * o.orbitRadius,
          );
        } else {
          // Converge on origin at increasing speed
          const convergeT = (phase2Progress - convergeStart) / (1 - convergeStart);
          const speed = 0.02 + convergeT * 0.06;
          const dir = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), o.pos).normalize();
          o.pos.add(dir.multiplyScalar(speed));
          if (o.pos.length() < 0.3 && !o.collided) {
            o.collided = true;
            o.colliding = false;
          }
        }
      } else if (!o.collided) {
        // Non-colliders: orbit freely forever
        o.angle += o.orbitSpeed;
        o.pos.set(
          Math.cos(o.angle) * o.orbitRadius,
          Math.sin(elapsed * o.ySpeed * 2) * 1.5,
          Math.sin(o.angle) * o.orbitRadius,
        );
      }

      if (!o.collided) allCollided = false;
    }

    // When both colliders meet, trigger phase 3
    if (allCollided && !collisionFired.current) {
      collisionFired.current = true;
      sceneStore.setState({ postScenePhase: 3 });
      setTimeout(() => {
        sceneStore.setState({ postScenePhase: 4 });
      }, 2500);
    }
  });

  const meshes: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const o = objects.current[i];
    if (!o || !activated.current) continue;
    const pos = o.pos;
    const dir = new THREE.Vector3().subVectors(new THREE.Vector3(0, 0, 0), pos).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const color = new THREE.Color().setHSL(o.hue, 0.8, 0.5);

    meshes.push(
      <group key={i} position={pos}>
        {o.type === 0 && (
          <mesh scale={o.scale} quaternion={q}>
            <coneGeometry args={[0.5, 1.2, 6]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              roughness={0.4}
              metalness={0.2}
            />
            <sprite scale={o.scale * 3}>
              <spriteMaterial
                color={color}
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </sprite>
          </mesh>
        )}
        {o.type === 1 && (
          <mesh scale={o.scale}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial
              color="#aaddff"
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
            <sprite scale={o.scale * 4}>
              <spriteMaterial
                color="#4488ff"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </sprite>
          </mesh>
        )}
        {o.type === 2 && (
          <mesh scale={o.scale * 0.8} quaternion={q}>
            <icosahedronGeometry args={[0.4, 1]} />
            <meshStandardMaterial
              color="#887766"
              emissive="#443322"
              emissiveIntensity={0.3}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        )}
      </group>,
    );
  }

  return <group ref={groupRef}>{meshes}</group>;
}

function ShockwaveRing() {
  const store = useSceneStore();
  const ref = useRef<THREE.Mesh>(null);
  const triggered = useRef(false);
  const scaleRef = useRef(0);

  useFrame(() => {
    if (store.postScenePhase >= 3) triggered.current = true;
    if (!triggered.current || !ref.current) return;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, 8, 0.04);
    ref.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    const opacity = Math.max(0, 1 - scaleRef.current / 8);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  if (store.postScenePhase < 3) return null;

  return (
    <mesh ref={ref} scale={0.01}>
      <ringGeometry args={[0.5, 1, 64]} />
      <meshBasicMaterial
        color="#ff8844"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CoreEnergyPulse() {
  const store = useSceneStore();
  const ref = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  useFrame((state) => {
    if (!ref.current) return;
    const phase = store.postScenePhase;
    if (phase === 2) {
      pulseRef.current = Math.min(pulseRef.current + 0.02, 1);
      const intensity = pulseRef.current;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1 * intensity;
      ref.current.scale.setScalar(scale);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 * intensity;
    } else if (phase >= 3) {
      pulseRef.current = Math.max(pulseRef.current - 0.05, 0);
      ref.current.scale.setScalar(1 + pulseRef.current * 0.1);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 * pulseRef.current;
    } else {
      ref.current.scale.setScalar(1);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial
        color="#ff6600"
        transparent
        opacity={0}
        wireframe
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function CollisionExplosion() {
  const store = useSceneStore();
  const starCount = 6000;
  const sparkCount = 300;
  const starRef = useRef<THREE.Points>(null);
  const sparkRef = useRef<THREE.Points>(null);
  const triggered = useRef(false);
  const progressRef = useRef(0);
  const bloomFlash = useRef(0);
  const flashRef = useRef<THREE.Mesh>(null);

  const stars = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const vel = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.5 + Math.random() * 2.5;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
      const tint = Math.random();
      if (tint < 0.5) {
        col[i * 3] = 1;
        col[i * 3 + 1] = 1;
        col[i * 3 + 2] = 1;
      } else if (tint < 0.75) {
        col[i * 3] = 0.6;
        col[i * 3 + 1] = 0.8;
        col[i * 3 + 2] = 1;
      } else {
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.7;
        col[i * 3 + 2] = 0.4;
      }
    }
    return { positions: pos, velocities: vel, colors: col };
  }, []);

  const sparks = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3);
    const vel = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 2.0 + Math.random() * 5.0;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (store.postScenePhase >= 3) triggered.current = true;
    if (!triggered.current) return;

    bloomFlash.current = Math.min(bloomFlash.current + 0.03, 1);
    progressRef.current = Math.min(progressRef.current + 0.008, 1);
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    if (starRef.current) {
      const pos = starRef.current.geometry.attributes.position;
      const sizes = starRef.current.geometry.attributes.size;
      for (let i = 0; i < starCount; i++) {
        const decay = Math.max(0, 1 - p * 1.5);
        const idx = i * 3;
        pos.setXYZ(
          i,
          stars.velocities[idx] * p * 12 * decay,
          stars.velocities[idx + 1] * p * 12 * decay,
          stars.velocities[idx + 2] * p * 12 * decay,
        );
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 3 + i * 1.7));
        sizes.setXYZ(i, (0.06 * decay + 0.02) * twinkle, (0.06 * decay + 0.02) * twinkle, 1);
      }
      pos.needsUpdate = true;
      sizes.needsUpdate = true;
    }

    if (sparkRef.current) {
      const pos = sparkRef.current.geometry.attributes.position;
      for (let i = 0; i < sparkCount; i++) {
        const decay = Math.max(0, 1 - p * 1.1);
        const idx = i * 3;
        pos.setXYZ(
          i,
          sparks.velocities[idx] * p * 15 * decay,
          sparks.velocities[idx + 1] * p * 15 * decay,
          sparks.velocities[idx + 2] * p * 15 * decay,
        );
      }
      pos.needsUpdate = true;
    }

    if (flashRef.current) {
      const flashP = Math.min(bloomFlash.current * 2, 1);
      (flashRef.current.material as THREE.MeshBasicMaterial).opacity =
        flashP < 0.5 ? flashP * 2 : 2 - flashP * 2;
      flashRef.current.scale.setScalar(1 + bloomFlash.current * 3);
    }
  });

  return (
    <>
      <mesh ref={flashRef} scale={0.01}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[stars.colors, 3]} />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(starCount * 3).fill(0.06), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          transparent
          opacity={triggered.current ? Math.max(0, 1 - progressRef.current * 1.5) : 0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors
          sizeAttenuation
        />
      </points>
      <points ref={sparkRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparks.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          transparent
          opacity={triggered.current ? Math.max(0, 1 - progressRef.current * 1.1) : 0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color="#ffffff"
          sizeAttenuation
        />
      </points>
    </>
  );
}
function GalaxyFromDebris() {
  const store = useSceneStore();
  const ref = useRef<THREE.Points>(null);
  const count = 6000;
  const activated = useRef(false);
  const progress = useRef(0);

  const particles = useMemo(() => {
    const start = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Explosion spray start positions (matching CollisionExplosion spread)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const sprayDist = 3 + Math.random() * 8;
      start[i * 3] = Math.sin(phi) * Math.cos(theta) * sprayDist;
      start[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * sprayDist;
      start[i * 3 + 2] = Math.cos(phi) * sprayDist;

      // Spiral galaxy target
      const arm = Math.floor(Math.random() * 5);
      const armAngle = (arm / 5) * Math.PI * 2;
      const dist = 0.5 + Math.random() * 4;
      const spread = (Math.random() - 0.5) * 0.35 * dist;
      const angle = armAngle + dist * 0.7 + spread;
      const height = (Math.random() - 0.5) * 0.5 * (1 - dist / 5);
      targets[i * 3] = Math.cos(angle) * dist;
      targets[i * 3 + 1] = height;
      targets[i * 3 + 2] = Math.sin(angle) * dist;

      // Galaxy colors (cool nebula tones)
      const tint = Math.random();
      col[i * 3] = 0.4 + 0.6 * (tint < 0.33 ? 1 : tint < 0.66 ? 0.3 : 0.6);
      col[i * 3 + 1] = 0.3 + 0.4 * (tint < 0.33 ? 0.2 : tint < 0.66 ? 0.8 : 0.3);
      col[i * 3 + 2] = 0.6 + 0.4 * (tint < 0.33 ? 0.8 : tint < 0.66 ? 0.4 : 1);
    }
    return { start, col, targets };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    if (store.postScenePhase >= 4) {
      activated.current = true;
      progress.current = Math.min(progress.current + 0.005, 1);
    }
    const p = activated.current ? progress.current : 0;
    const ep = 1 - Math.cos(p * Math.PI * 0.5); // ease-out-cubic

    ref.current.rotation.y = state.clock.elapsedTime * 0.04;

    const position = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      position.setXYZ(
        i,
        particles.start[idx] + (particles.targets[idx] - particles.start[idx]) * ep,
        particles.start[idx + 1] + (particles.targets[idx + 1] - particles.start[idx + 1]) * ep,
        particles.start[idx + 2] + (particles.targets[idx + 2] - particles.start[idx + 2]) * ep,
      );
    }
    position.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = Math.min(p * 1.5, 1) * 0.8;
    (ref.current.material as THREE.PointsMaterial).size = 0.04 + p * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.start, 3]} />
        <bufferAttribute attach="attributes-color" args={[particles.col, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

function CometSystem() {
  const store = useSceneStore();
  const groupRef = useRef<THREE.Group>(null);
  const comets = useRef<
    {
      progress: number;
      active: boolean;
      angle: number;
      speed: number;
      tilt: number;
      seed: number;
    }[]
  >([]);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const trailRefs = useRef<(THREE.Points | null)[]>([]);
  const timer = useRef(0);
  const maxComets = 3;
  const trailLength = 30;

  const trailPositions = useMemo(() => new Float32Array(trailLength * 3), []);

  useEffect(() => {
    comets.current = Array.from({ length: maxComets }, () => ({
      progress: 0,
      active: false,
      angle: 0,
      speed: 0,
      tilt: 0,
      seed: Math.random() * 100,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (store.postScenePhase < 3) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    timer.current += state.clock.getDelta();
    if (timer.current > 8 + Math.random() * 12) {
      timer.current = 0;
      const inactive = comets.current.findIndex((c) => !c.active);
      if (inactive >= 0) {
        comets.current[inactive] = {
          progress: 0,
          active: true,
          angle: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.006,
          tilt: (Math.random() - 0.5) * 0.3,
          seed: Math.random() * 100,
        };
      }
    }

    for (let i = 0; i < maxComets; i++) {
      const c = comets.current[i];
      if (!c.active) continue;
      c.progress += c.speed;
      if (c.progress > 1) {
        c.active = false;
        continue;
      }

      const dist = c.progress * 12;
      const x = Math.cos(c.angle + c.progress * 0.5) * dist;
      const z = Math.sin(c.angle + c.progress * 0.5) * dist;
      const y = Math.sin(c.progress * Math.PI * 2) * 0.5 + c.tilt * dist;

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(x, y, z);
        mesh.lookAt(0, 0, 0);
        const opacity =
          c.progress < 0.05 ? c.progress / 0.05 : c.progress > 0.9 ? (1 - c.progress) / 0.1 : 1;
        (mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
      }

      const trail = trailRefs.current[i];
      if (trail) {
        const pos = trail.geometry.attributes.position;
        const trailDist = 0.3;
        for (let j = trailLength - 1; j > 0; j--) {
          const idx = j * 3;
          const prev = (j - 1) * 3;
          pos.array[idx] = pos.array[prev];
          pos.array[idx + 1] = pos.array[prev + 1];
          pos.array[idx + 2] = pos.array[prev + 2];
        }
        pos.array[0] = x;
        pos.array[1] = y;
        pos.array[2] = z;
        pos.needsUpdate = true;
        (trail.material as THREE.PointsMaterial).opacity = Math.min(1, c.progress * 3) * 0.6;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: maxComets }, (_, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            position={[0, 0, 0]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color="#aaddff"
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <points
            ref={(el) => {
              trailRefs.current[i] = el as unknown as THREE.Points | null;
            }}
          >
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[trailPositions.slice(), 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.03}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              color="#88ccff"
            />
          </points>
        </group>
      ))}
    </group>
  );
}

function FeaturePlanets() {
  const store = useSceneStore();
  const groupRef = useRef<THREE.Group>(null);
  const activated = useRef(false);

  const planets = useMemo(
    () => [
      { dist: 3.5, size: 0.15, speed: 0.3, color: "#ff6b6b", tilt: 0.1 },
      { dist: 4.8, size: 0.12, speed: 0.2, color: "#48dbfb", tilt: -0.15 },
      { dist: 2.2, size: 0.08, speed: 0.5, color: "#ff9ff3", tilt: 0.2 },
      { dist: 6.0, size: 0.2, speed: 0.15, color: "#feca57", tilt: -0.08 },
      { dist: 7.5, size: 0.1, speed: 0.12, color: "#a29bfe", tilt: 0.05 },
    ],
    [],
  );

  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (store.postScenePhase >= 4) {
      activated.current = true;
      groupRef.current.visible = true;
      const target = 1;
      for (let i = 0; i < groupRef.current.children.length; i++) {
        const child = groupRef.current.children[i];
        child.visible = true;
      }
    }
    if (!activated.current) return;

    const elapsed = state.clock.elapsedTime;
    for (let i = 0; i < planets.length; i++) {
      const p = planets[i];
      const idx = i * 2;
      const planet = groupRef.current.children[idx];
      const ring = ringRefs.current[i];
      if (planet) {
        const angle = elapsed * p.speed + i * 1.5;
        planet.position.set(
          Math.cos(angle) * p.dist,
          Math.sin(angle) * p.tilt,
          Math.sin(angle) * p.dist,
        );
        planet.rotation.x = elapsed * 2;
        planet.rotation.y = elapsed * 3;
      }
      if (ring) {
        const angle = elapsed * p.speed + i * 1.5;
        ring.position.set(
          Math.cos(angle) * p.dist,
          Math.sin(angle) * p.tilt,
          Math.sin(angle) * p.dist,
        );
        ring.rotation.x = Math.PI * 0.5;
        ring.rotation.z = elapsed * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      {planets.map((p, i) => (
        <group key={i}>
          <mesh>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.3} />
          </mesh>
          <mesh
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            rotation-x={Math.PI * 0.5}
          >
            <ringGeometry args={[p.size * 1.8, p.size * 2.5, 24]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export default function GlobalCanvas() {
  const store = useSceneStore();
  const [sunRef, setSunRef] = useState<THREE.Mesh | null>(null);
  const fallbackSunRef = useRef<THREE.Mesh>(null);
  const [dpr, setDpr] = useState(1.5);

  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full bg-black overflow-hidden pointer-events-none"
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} color={store.glowColor} />
          <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
          <pointLight position={[-8, -6, 4]} intensity={1.5} color="#38bdf8" />

          <CameraController />

          {/* Background Universe */}
          <ProceduralNeuralBrain />
          <InfiniteParticleField />
          <TechnologySatellites />

          {/* Core Energy Build-up (Phase 2) */}
          <CoreEnergyPulse />

          {/* Post-Scene-7 Space Effects */}
          <FallingStars />
          <TravelingAsteroids />
          <ShockwaveRing />
          <CollisionExplosion />
          <GalaxyFromDebris />
          <CometSystem />
          <FeaturePlanets />

          {/* The AI Core & Light Source */}
          <TheHeartCore setSunRef={setSunRef} />

          {/* Extreme Cinematic Postprocessing */}
          {sunRef ? (
            <EffectComposer multisampling={4}>
              <GodRays
                sun={sunRef}
                blendFunction={THREE.AdditiveBlending}
                samples={60}
                density={0.96}
                decay={0.93}
                weight={0.6}
                exposure={0.8}
                clampMax={1.0}
                blur={true}
              />
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
              <Noise opacity={0.04} />
              <Vignette eskil={false} offset={0.1} darkness={1.2} />
            </EffectComposer>
          ) : (
            <EffectComposer multisampling={4}>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
              <Noise opacity={0.04} />
              <Vignette eskil={false} offset={0.1} darkness={1.2} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
