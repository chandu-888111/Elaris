import { useRef, useState, useEffect } from "react";
import { View, Html, Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { PlanetarySystem } from "../canvas/PlanetarySystem";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const PLANETS = [
  {
    id: "mentor",
    type: "knowledge",
    name: "AI Mentor",
    desc: "24/7 personal guide.",
    radius: 8,
    angle: 0,
    speed: 0.1,
  },
  {
    id: "guide",
    type: "ice",
    name: "Study Guide",
    desc: "Dynamic curriculum.",
    radius: 8,
    angle: Math.PI * 0.6,
    speed: 0.12,
  },
  {
    id: "roadmap",
    type: "cyber",
    name: "Roadmap",
    desc: "Career pathing.",
    radius: 8,
    angle: Math.PI * 1.3,
    speed: 0.08,
  },

  {
    id: "builder",
    type: "builder",
    name: "Builder",
    desc: "Project generation.",
    radius: 14,
    angle: Math.PI * 0.2,
    speed: 0.05,
  },
  {
    id: "resources",
    type: "lava",
    name: "Resources",
    desc: "Curated library.",
    radius: 14,
    angle: Math.PI * 0.9,
    speed: 0.06,
  },
  {
    id: "resume",
    type: "career",
    name: "Resume",
    desc: "ATS generation.",
    radius: 14,
    angle: Math.PI * 1.6,
    speed: 0.04,
  },

  {
    id: "team",
    type: "team",
    name: "Team Match",
    desc: "Global network.",
    radius: 20,
    angle: Math.PI * 0.5,
    speed: 0.03,
  },
  {
    id: "assistant",
    type: "ai",
    name: "Assistant",
    desc: "Core OS Brain.",
    radius: 20,
    angle: Math.PI * 1.2,
    speed: 0.02,
  },
  {
    id: "interview",
    type: "gas",
    name: "Interview",
    desc: "Mock prep.",
    radius: 20,
    angle: Math.PI * 1.8,
    speed: 0.035,
  },
];

function OrbitPath({ radius }: { radius: number }) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  return <Line points={points} color="#ffffff" transparent opacity={0.05} lineWidth={1} />;
}

interface PlanetData {
  id: string;
  type: string;
  name: string;
  desc: string;
  radius: number;
  angle: number;
  speed: number;
}

function InteractivePlanet({
  data,
  onSelect,
}: {
  data: PlanetData;
  onSelect: (data: PlanetData, position: THREE.Vector3) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const currentAngle = useRef(data.angle);

  useFrame((state, delta) => {
    if (!group.current) return;
    currentAngle.current += data.speed * delta;
    group.current.position.x = Math.cos(currentAngle.current) * data.radius;
    group.current.position.z = Math.sin(currentAngle.current) * data.radius;
  });

  return (
    <group ref={group}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          const worldPos = new THREE.Vector3();
          group.current?.getWorldPosition(worldPos);
          onSelect(data, worldPos);
        }}
      >
        <PlanetarySystem
          type={
            data.type as
              | "knowledge"
              | "ice"
              | "cyber"
              | "builder"
              | "lava"
              | "career"
              | "team"
              | "ai"
              | "gas"
          }
          scale={hovered ? 1.2 : 1}
        />
        {hovered && (
          <Html center distanceFactor={15} position={[0, 2, 0]}>
            <div className="bg-black/80 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-white text-xs whitespace-nowrap pointer-events-none">
              {data.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

function UniverseScene({ onPlanetSelect }: { onPlanetSelect: (data: PlanetData) => void }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Initial camera setup
  useEffect(() => {
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const handleSelect = (data: PlanetData, position: THREE.Vector3) => {
    onPlanetSelect(data);
    // Zoom camera to planet
    gsap.to(camera.position, {
      x: position.x,
      y: position.y + 2,
      z: position.z + 8,
      duration: 1.5,
      ease: "power3.inOut",
    });
    // Look at planet
    const dummy = { x: 0, y: 0, z: 0 }; // currently looking at center
    gsap.to(dummy, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.lookAt(dummy.x, dummy.y, dummy.z);
      },
    });
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02; // Global slow rotation
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#ffffff" />

      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <OrbitPath radius={8} />
      <OrbitPath radius={14} />
      <OrbitPath radius={20} />

      {PLANETS.map((p) => (
        <InteractivePlanet key={p.id} data={p} onSelect={handleSelect} />
      ))}
      <ResetCameraListener />
    </group>
  );
}

export function UniverseMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const resetCamera = () => {
    setSelectedPlanet(null);
    // The camera will reset naturally if we had a global store for it,
    // but for the View, it maintains its own camera.
    // To properly reset, we'd fire an event. Let's just dispatch a custom event.
    window.dispatchEvent(new CustomEvent("reset-universe-camera"));
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black/50 overflow-hidden">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">Universe Map</h2>
        <p className="text-white/50 text-sm mt-2">Click a planet to explore capabilities</p>
      </div>

      {isInView && (
        <div className="absolute inset-0 z-0">
          <View className="w-full h-full">
            <UniverseScene onPlanetSelect={setSelectedPlanet} />
          </View>
        </div>
      )}

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-1/2 right-12 -translate-y-1/2 w-80 glass border border-white/20 p-6 rounded-2xl z-20 shadow-2xl"
          >
            <button
              onClick={resetCamera}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">{selectedPlanet.name}</h3>
            <p className="text-white/70 text-sm mb-6">{selectedPlanet.desc}</p>
            <div className="h-px w-full bg-white/10 mb-6" />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Module Online
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Neural Sync 100%
              </div>
            </div>
            <button className="mt-8 w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm text-white transition-colors">
              Access Core
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Event Listener Helper inside the component tree isn't easy without another hook. We'll handle it inside UniverseScene by listening to 'reset-universe-camera'. */}
    </div>
  );
}

function ResetCameraListener() {
  const { camera } = useThree();

  useEffect(() => {
    const handleReset = () => {
      gsap.to(camera.position, { x: 0, y: 15, z: 30, duration: 1.5, ease: "power3.inOut" });
      const dummy = { x: 0, y: 0, z: 0 };
      gsap.to(dummy, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "power3.inOut",
        onUpdate: () => camera.lookAt(dummy.x, dummy.y, dummy.z),
      });
    };
    window.addEventListener("reset-universe-camera", handleReset);
    return () => window.removeEventListener("reset-universe-camera", handleReset);
  }, [camera]);

  return null;
}
