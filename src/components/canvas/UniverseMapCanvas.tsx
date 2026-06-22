import { useFrame } from "@react-three/fiber";
import { Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { getPlanetForXP } from "@/lib/gamification";

function OrbitingStations({
  count,
  radius,
  speed,
  color,
}: {
  count: number;
  radius: number;
  speed: number;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.2,
              Math.sin(angle) * radius,
            ]}
          >
            <mesh>
              <octahedronGeometry args={[0.08]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                wireframe
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function ConstellationLines({ achievements }: { achievements: string[] }) {
  const pts = useMemo(() => {
    const points = [];
    for (let i = 0; i < achievements.length; i++) {
      const angle = (i / Math.max(1, achievements.length)) * Math.PI * 2;
      const r = 4 + (i % 3);
      points.push(
        new THREE.Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r),
      );
    }
    return points;
  }, [achievements]);

  if (pts.length < 2) return null;

  return (
    <group>
      {pts.map((p, i) => (
        <Sphere key={i} args={[0.05]} position={p}>
          <meshBasicMaterial color="#fcd34d" />
          <Html distanceFactor={15} center>
            <div className="text-[6px] font-mono text-amber-200/50 uppercase whitespace-nowrap">
              {achievements[i]}
            </div>
          </Html>
        </Sphere>
      ))}
      <mesh>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(pts, true), 64, 0.01, 8, false]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

interface UniverseMapProps {
  xp: number;
  projects?: number | unknown[];
  achievements?: Array<{ title: string; [key: string]: unknown }>;
  skills?: number | unknown[];
}

export default function UniverseMap({ xp, projects, achievements, skills }: UniverseMapProps) {
  const { current } = getPlanetForXP(xp);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const projectsCount = typeof projects === "number" ? projects : projects?.length || 0;
  const skillsCount = typeof skills === "number" ? skills : skills?.length || 0;

  return (
    <>
      <ambientLight intensity={0.2} color={current.color} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-2, 0, -2]} intensity={1} color={current.color} />

      <Stars radius={50} depth={20} count={3000} factor={4} saturation={1} fade speed={0.5} />

      {/* Central Planet (User Level) */}
      <group position={[0, 0, 0]}>
        <Sphere ref={planetRef} args={[1.5, 64, 64]}>
          <meshPhysicalMaterial
            color={current.color}
            emissive={current.color}
            emissiveIntensity={0.2}
            roughness={0.4}
            metalness={0.1}
            wireframe
          />
        </Sphere>
        <Html position={[0, -2.5, 0]} center>
          <div className="text-center font-mono">
            <div
              className="text-white font-bold text-lg whitespace-nowrap uppercase tracking-widest"
              style={{ color: current.color, textShadow: `0 0 10px ${current.color}` }}
            >
              {current.name}
            </div>
          </div>
        </Html>
      </group>

      <OrbitingStations count={projectsCount} radius={2.5} speed={0.3} color="#38bdf8" />
      <OrbitingStations count={skillsCount} radius={3.5} speed={-0.2} color="#10b981" />
      <ConstellationLines achievements={achievements?.map((a) => a.title) || []} />
    </>
  );
}
