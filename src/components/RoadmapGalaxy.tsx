import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Ring, Stars, Html, Trail } from "@react-three/drei";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { RoadmapNode, RoadmapResource } from "@/lib/roadmap-catalog";

interface GalaxyProps {
  nodes: RoadmapNode[];
  completedIds: Set<string>;
  inProgressIds: Set<string>;
  selectedNode: RoadmapNode | null;
  onSelectNode: (node: RoadmapNode) => void;
  nodeStatus?: "locked" | "available" | "in_progress" | "completed";
  onStatusChange?: (newStatus: "in_progress" | "done") => void;
}

function CameraController({ targetPosition }: { targetPosition: THREE.Vector3 | null }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    const duration = 1.5;
    if (targetPosition) {
      const targetCamX = targetPosition.x + 0.8;
      const targetCamY = targetPosition.y + 0.5;
      const targetCamZ = targetPosition.z + 1.8;

      gsap.to(camera.position, {
        x: targetCamX,
        y: targetCamY,
        z: targetCamZ,
        duration: duration,
        ease: "power3.inOut",
      });

      if (controls) {
        const orbitControls = controls as unknown as { target: THREE.Vector3; update: () => void };
        gsap.to(orbitControls.target, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: duration,
          ease: "power3.inOut",
          onUpdate: () => orbitControls.update(),
        });
      }
    } else {
      gsap.to(camera.position, {
        x: 0,
        y: 3.0,
        z: 8,
        duration: duration,
        ease: "power3.inOut",
      });

      if (controls) {
        const orbitControls = controls as unknown as { target: THREE.Vector3; update: () => void };
        gsap.to(orbitControls.target, {
          x: 0,
          y: 0,
          z: 0,
          duration: duration,
          ease: "power3.inOut",
          onUpdate: () => orbitControls.update(),
        });
      }
    }
  }, [targetPosition, camera, controls]);

  return null;
}

function PlanetRing({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Ring ref={ref} args={[radius, radius + 0.08, 64]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <meshBasicMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </Ring>
  );
}

// Moons represent Subtopics/Skills
function SubtopicMoons({ skills, planetRadius }: { skills?: string[]; planetRadius: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const moons = useMemo(() => skills?.slice(0, 5) || [], [skills]); // Limit to 5 moons max

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  if (moons.length === 0) return null;

  return (
    <group ref={groupRef}>
      {moons.map((skill, idx) => {
        const angle = (idx / moons.length) * Math.PI * 2;
        const orbitRadius = planetRadius + 0.5;
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;

        return (
          <group key={idx} position={[x, Math.sin(angle) * 0.2, z]}>
            <Sphere args={[0.06, 16, 16]}>
              <meshStandardMaterial color="#9ca3af" roughness={0.7} metalness={0.2} />
            </Sphere>
            <Html distanceFactor={5} center position={[0, -0.15, 0]}>
              <div className="text-[6px] text-white/50 font-mono tracking-widest uppercase whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {skill}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// Satellites represent Resources
function ResourceSatellites({
  resources,
  planetRadius,
}: {
  resources: RoadmapResource[];
  planetRadius: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sats = useMemo(() => resources.slice(0, 4), [resources]);

  useFrame((state) => {
    if (groupRef.current) {
      // Satellites orbit faster and on a different axis
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  if (sats.length === 0) return null;

  return (
    <group ref={groupRef}>
      {sats.map((res, idx) => {
        const angle = (idx / sats.length) * Math.PI * 2;
        const orbitRadius = planetRadius + 0.9;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        return (
          <group key={idx} position={[x, y, 0]}>
            <Sphere args={[0.03, 8, 8]}>
              <meshBasicMaterial color="#38bdf8" />
            </Sphere>
            <Html distanceFactor={6} center position={[0.1, 0, 0]}>
              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[5px] text-sky-200/70 hover:text-sky-400 font-mono tracking-widest uppercase whitespace-nowrap transition"
              >
                {res.type}
              </a>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function NodePlanet({
  node,
  index,
  total,
  status,
  isSelected,
  onClick,
}: {
  node: RoadmapNode;
  index: number;
  total: number;
  status: "locked" | "available" | "in_progress" | "completed";
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Position on a helical galaxy spiral
  const pos = useMemo(() => {
    const angle = index * (Math.PI / 2.8);
    const radius = 1.5 + index * 0.8;
    const y = (index - total / 2) * 0.4;
    return new THREE.Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle));
  }, [index, total]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 2.0 + index) * 0.03;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  const colorConfig = useMemo(() => {
    switch (status) {
      case "completed":
        return { color: "#10b981", emissive: "#059669", intensity: 1.2, ring: true };
      case "in_progress":
        return { color: "#c084fc", emissive: "#6b21a8", intensity: 1.0, ring: true };
      case "available":
        return { color: "#38bdf8", emissive: "#0369a1", intensity: 0.8, ring: false };
      default:
        return { color: "#4b5563", emissive: "#1f2937", intensity: 0.15, ring: false };
    }
  }, [status]);

  const planetRadius = 0.4;

  return (
    <group position={pos}>
      {/* Planet Sphere */}
      <Sphere
        ref={ref}
        args={[planetRadius, 64, 64]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <meshPhysicalMaterial
          color={colorConfig.color}
          emissive={colorConfig.emissive}
          emissiveIntensity={hovered ? colorConfig.intensity * 1.5 : colorConfig.intensity}
          roughness={hovered ? 0.1 : 0.3}
          metalness={0.7}
          clearcoat={1.0}
        />
      </Sphere>

      {/* Orbiting Systems */}
      <SubtopicMoons skills={node.skills} planetRadius={planetRadius} />
      <ResourceSatellites resources={node.resources} planetRadius={planetRadius} />

      {/* Orbit ring */}
      {colorConfig.ring && <PlanetRing radius={0.8} color={colorConfig.color} />}

      {/* Halo glow selection effect */}
      {isSelected && (
        <Sphere args={[planetRadius + 0.15, 32, 32]}>
          <meshBasicMaterial
            color={colorConfig.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            wireframe
          />
        </Sphere>
      )}

      {/* Locked cage */}
      {status === "locked" && (
        <mesh rotation={[0.5, 0.5, 0.5]}>
          <boxGeometry args={[1.0, 1.0, 1.0]} />
          <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.1} />
        </mesh>
      )}

      {/* Planet Label */}
      <Html distanceFactor={8} position={[0, 0.8, 0]} center zIndexRange={[40, 0]}>
        <div
          className={`pointer-events-none select-none rounded-lg px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest border backdrop-blur-md transition-all duration-300 ${
            isSelected
              ? "bg-spark/90 text-primary-foreground border-spark shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110"
              : hovered
                ? "bg-card/90 text-foreground border-white/30 scale-105"
                : "bg-black/60 text-muted-foreground border-white/5"
          }`}
        >
          {node.title}
        </div>
      </Html>
    </group>
  );
}

function ConnectionBeams({ nodes, total }: { nodes: RoadmapNode[]; total: number }) {
  const points = useMemo(() => {
    return nodes.map((_, index) => {
      const angle = index * (Math.PI / 2.8);
      const radius = 1.5 + index * 0.8;
      const y = (index - total / 2) * 0.4;
      return new THREE.Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle));
    });
  }, [nodes, total]);

  const curvePoints = useMemo(() => {
    if (points.length < 2) return [];
    const beams = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += 0.4; // arch
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      beams.push(curve.getPoints(40));
    }
    return beams;
  }, [points]);

  return (
    <group>
      {curvePoints.map((pts, i) => {
        const lineGeom = new THREE.BufferGeometry().setFromPoints(pts);
        const lineMat = new THREE.LineBasicMaterial({
          color: "#818cf8",
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
          linewidth: 1.5,
        });
        const lineObj = new THREE.Line(lineGeom, lineMat);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
}

export function RoadmapGalaxy({
  nodes,
  completedIds,
  inProgressIds,
  selectedNode,
  onSelectNode,
  nodeStatus,
  onStatusChange,
}: GalaxyProps) {
  const total = nodes.length;

  const selectedPos = useMemo(() => {
    if (!selectedNode) return null;
    const idx = nodes.findIndex((n) => n.id === selectedNode.id);
    if (idx === -1) return null;
    const angle = idx * (Math.PI / 2.8);
    const radius = 1.5 + idx * 0.8;
    const y = (idx - total / 2) * 0.4;
    return new THREE.Vector3(radius * Math.cos(angle), y - 0.2, radius * Math.sin(angle));
  }, [selectedNode, nodes, total]);

  const themeColors = useMemo(() => {
    if (!selectedNode) {
      return { ambient: "#c084fc", point1: "#38bdf8", point2: "#ec4899" };
    }
    const title = selectedNode.title.toLowerCase();
    if (title.match(/react|html|css|frontend|ui/)) {
      return { ambient: "#06b6d4", point1: "#00d2ff", point2: "#3b82f6" };
    } else if (title.match(/sql|db|backend|node|python|go|rust/)) {
      return { ambient: "#10b981", point1: "#10b981", point2: "#14b8a6" };
    } else if (title.match(/ai|learning|model|agent/)) {
      return { ambient: "#a78bfa", point1: "#c084fc", point2: "#f472b6" };
    } else {
      return { ambient: "#fb923c", point1: "#f43f5e", point2: "#e11d48" };
    }
  }, [selectedNode]);

  const statusTheme = useMemo(() => {
    if (!nodeStatus)
      return { label: "Locked", badgeBg: "bg-red-500/10", badgeText: "text-red-400" };
    switch (nodeStatus) {
      case "completed":
        return { label: "Completed", badgeBg: "bg-emerald-500/15", badgeText: "text-emerald-400" };
      case "in_progress":
        return { label: "In Progress", badgeBg: "bg-purple-500/15", badgeText: "text-purple-400" };
      case "available":
        return { label: "Available", badgeBg: "bg-sky-500/15", badgeText: "text-sky-400" };
      default:
        return { label: "Locked", badgeBg: "bg-red-500/10", badgeText: "text-red-400" };
    }
  }, [nodeStatus]);

  return (
    <div className="relative h-full w-full bg-[#030014] rounded-3xl border border-white/10 overflow-hidden">
      <Canvas camera={{ position: [0, 3.0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} color={themeColors.ambient} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={themeColors.point1} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color={themeColors.point2} />
          <Stars radius={60} depth={30} count={800} factor={2} saturation={0.5} fade speed={0.4} />

          <group position={[0, -0.5, 0]}>
            <ConnectionBeams nodes={nodes} total={total} />

            {nodes.map((node, index) => {
              const isCompleted = completedIds.has(node.id);
              const isInProgress = inProgressIds.has(node.id);
              const isSelected = selectedNode?.id === node.id;

              let status: "locked" | "available" | "in_progress" | "completed" = "locked";
              if (isCompleted) status = "completed";
              else if (isInProgress) status = "in_progress";
              else status = "available";

              return (
                <NodePlanet
                  key={node.id}
                  node={node}
                  index={index}
                  total={total}
                  status={status}
                  isSelected={isSelected}
                  onClick={() => onSelectNode(node)}
                />
              );
            })}
          </group>

          <CameraController targetPosition={selectedPos} />
          <OrbitControls
            enableZoom={true}
            maxDistance={20}
            minDistance={2}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Holographic Panel UI removed in favor of NodeDrawer side panel */}

      {/* Legend */}
      {!selectedNode && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-6 text-[9px] uppercase tracking-widest text-muted-foreground font-bold bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />{" "}
            Completed
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />{" "}
            In Progress
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />{" "}
            Available
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gray-600" /> Locked
          </div>
        </div>
      )}
    </div>
  );
}
export default RoadmapGalaxy;
