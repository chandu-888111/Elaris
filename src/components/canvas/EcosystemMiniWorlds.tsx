import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 1. AI Mentor: Floating neural DNA helix + synapse sparks
export function AIMentorWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} color="#00e5ff" intensity={2} />
      <Float speed={2} rotationIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#00e5ff"
            transmission={0.9}
            opacity={1}
            roughness={0.1}
            ior={1.5}
            thickness={0.5}
          />
        </Sphere>
      </Float>
      {/* Synapse sparks */}
      <Points positions={new Float32Array(300).map(() => (Math.random() - 0.5) * 4)}>
        <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

// 2. Study Guide: Orbiting knowledge cubes + progress ring
export function StudyGuideWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.getElapsedTime() * 0.3;
  });
  return (
    <group ref={group} rotation={[Math.PI / 4, 0, 0]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 2]} color="#3b82f6" intensity={2} />
      <mesh>
        <torusGeometry args={[1.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <Float key={i} position={[Math.cos(i * 2.1) * 1.2, Math.sin(i * 2.1) * 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// 3. Roadmap Planner: Expanding node constellation
export function RoadmapWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} color="#10b981" intensity={2} />
      {/* Nodes */}
      {[
        [-1, -1, 0],
        [1, 1, 0],
        [0, 0, 1],
        [-0.5, 1, -1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <Line
        points={[
          [-1, -1, 0],
          [0, 0, 1],
          [0, 0, 1],
          [1, 1, 0],
          [1, 1, 0],
          [-0.5, 1, -1],
          [-0.5, 1, -1],
          [-1, -1, 0],
        ]}
        color="#10b981"
        lineWidth={2}
        transparent
        opacity={0.5}
      />
    </group>
  );
}

// 4. AI Project Builder: Floating modular blocks assembling themselves
export function BuilderWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} color="#8b5cf6" intensity={2} />
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.1} />
      </mesh>
      <mesh position={[-0.4, 0.2, -0.4]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#c4b5fd" roughness={0.1} />
      </mesh>
      <mesh position={[0.4, 0.4, 0.2]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
    </group>
  );
}

// 5. Resources Hub: Satellite swarm orbiting a central repository
export function ResourcesWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 1;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} color="#f59e0b" intensity={2} />
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#f59e0b" wireframe />
      </mesh>
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 12) * Math.PI * 2) * 1.5,
            (Math.random() - 0.5) * 0.5,
            Math.sin((i / 12) * Math.PI * 2) * 1.5,
          ]}
        >
          <planeGeometry args={[0.2, 0.3]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// 6. Resume Builder: Holographic resume sheet with scanning beam
export function ResumeBuilderWorld({ isHovered }: { isHovered?: boolean }) {
  const scanRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (scanRef.current) {
      scanRef.current.position.y = Math.sin(clock.getElapsedTime() * 3) * 0.8;
    }
  });
  return (
    <group rotation={[Math.PI / 6, -Math.PI / 6, 0]}>
      <ambientLight intensity={0.5} />
      <mesh>
        <planeGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      <mesh ref={scanRef} position={[0, 0, 0.01]}>
        <planeGeometry args={[1.5, 0.1]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// 7. Resume Analyzer: Radar sweep + score particles
export function ResumeAnalyzerWorld({ isHovered }: { isHovered?: boolean }) {
  const sweepRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (sweepRef.current) sweepRef.current.rotation.z -= 0.05;
  });
  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      <ambientLight intensity={0.5} />
      <gridHelper args={[3, 10, "#ef4444", "#ef4444"]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={sweepRef}>
        <circleGeometry args={[1.5, 32, 0, Math.PI / 4]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// 8. Team Matchmaking: Connected avatars linked by energy lines
export function TeamMatchmakingWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.5;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 0]} color="#ec4899" intensity={2} />
      {[
        [-1, 0, 0],
        [1, 0, 0],
        [0, 0, -1],
        [0, 0, 1],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <capsuleGeometry args={[0.15, 0.3, 4, 8]} />
          <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      <Line
        points={[
          [-1, 0, 0],
          [1, 0, 0],
          [0, 0, -1],
          [0, 0, 1],
          [-1, 0, 0],
          [0, 0, -1],
        ]}
        color="#ec4899"
        lineWidth={1}
      />
    </group>
  );
}

// 9. AI Assistant: Breathing orb with streaming text particles
export function AIAssistantWorld({ isHovered }: { isHovered?: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      group.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={3} />
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#8b5cf6" emissiveIntensity={0.8} />
      </mesh>
      <Points positions={new Float32Array(150).map(() => (Math.random() - 0.5) * 3)}>
        <PointMaterial transparent color="#c4b5fd" size={0.03} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}
