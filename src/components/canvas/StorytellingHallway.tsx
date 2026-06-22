import { useRef, useMemo } from "react";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Float, Environment, Sparkles } from "@react-three/drei";
import { useScroll, useTransform, type MotionValue } from "framer-motion";
import * as THREE from "three";

const ROOM_Z_POSITIONS = [0, -30, -60, -90];

// Frosted Glass Material for Noomo-style aesthetics
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#ffffff",
  metalness: 0.1,
  roughness: 0.2,
  transmission: 0.9,
  thickness: 0.5,
  ior: 1.5,
});

function Diorama1() {
  return (
    <group position={[2, 0, ROOM_Z_POSITIONS[0]]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh material={glassMaterial}>
          <icosahedronGeometry args={[1.5, 2]} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
      </Float>
      <Html position={[-6, 0, 0]} center className="w-80 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-2">The AI Mentor</h3>
          <p className="text-white/70">
            A glowing, context-aware intelligence that guides your architectural decisions.
          </p>
        </div>
      </Html>
    </group>
  );
}

function Diorama2() {
  // Constellation of nodes
  return (
    <group position={[-2, 0, ROOM_Z_POSITIONS[1]]}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
            ]}
            material={glassMaterial}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
          </mesh>
        ))}
      </Float>
      <Html position={[6, 0, 0]} center className="w-80 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-2">Interactive Roadmaps</h3>
          <p className="text-white/70">
            Navigate through dynamic learning constellations mapping out your entire career
            trajectory.
          </p>
        </div>
      </Html>
    </group>
  );
}

function Diorama3() {
  return (
    <group position={[2, 0, ROOM_Z_POSITIONS[2]]}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            material={glassMaterial}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
          </mesh>
        ))}
      </Float>
      <Html position={[-6, 0, 0]} center className="w-80 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,165,0,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-2">Project Builder</h3>
          <p className="text-white/70">
            Watch your architecture assemble itself in real-time as geometric building blocks snap
            together.
          </p>
        </div>
      </Html>
    </group>
  );
}

function Diorama4() {
  return (
    <group position={[-2, 0, ROOM_Z_POSITIONS[3]]}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh material={glassMaterial} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <planeGeometry args={[2, 1.2]} />
          <meshBasicMaterial color="#00ff88" opacity={0.3} transparent side={THREE.DoubleSide} />
        </mesh>
      </Float>
      <Html position={[6, 0, 0]} center className="w-80 pointer-events-none">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.2)]">
          <h3 className="text-2xl font-bold text-white mb-2">Developer Dashboard</h3>
          <p className="text-white/70">
            A central command terminal to orchestrate your deployments and track metrics.
          </p>
        </div>
      </Html>
    </group>
  );
}

function CameraRig({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const targetZ = useTransform(scrollYProgress, [0, 1], [10, ROOM_Z_POSITIONS[3] - 10]);

  // Dynamic Lighting based on Z position
  const lightRef = useRef<THREE.PointLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  const colors = useMemo(
    () => [
      new THREE.Color("#00e5ff"), // Cyan for Room 1
      new THREE.Color("#8a2be2"), // Violet for Room 2
      new THREE.Color("#ffa500"), // Amber for Room 3
      new THREE.Color("#00ff88"), // Green for Room 4
    ],
    [],
  );

  useFrame(() => {
    // Lerp camera position for smooth gliding
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.get(), 0.05);

    // Calculate which room we are closest to
    const currentZ = camera.position.z;
    let roomIndex = 0;

    if (currentZ < -15 && currentZ >= -45) roomIndex = 1;
    else if (currentZ < -45 && currentZ >= -75) roomIndex = 2;
    else if (currentZ < -75) roomIndex = 3;

    // Smoothly interpolate light color
    if (lightRef.current && ambientRef.current) {
      lightRef.current.color.lerp(colors[roomIndex], 0.05);
      ambientRef.current.color.lerp(colors[roomIndex], 0.05);
      lightRef.current.position.z = camera.position.z - 10;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.2} color="#00e5ff" />
      <pointLight
        ref={lightRef}
        position={[0, 2, 0]}
        intensity={20}
        distance={50}
        color="#00e5ff"
      />
    </>
  );
}

export function StorytellingScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 5, 30]} />

      <CameraRig scrollYProgress={scrollYProgress} />

      <Diorama1 />
      <Diorama2 />
      <Diorama3 />
      <Diorama4 />

      {/* Pathway dust/particles */}
      <Sparkles
        count={500}
        scale={[10, 10, 150]}
        position={[0, 0, -50]}
        size={2}
        speed={0.2}
        opacity={0.2}
        color="#ffffff"
      />

      <Environment preset="city" />
    </Canvas>
  );
}

export function StorytellingHallway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <StorytellingScene scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
