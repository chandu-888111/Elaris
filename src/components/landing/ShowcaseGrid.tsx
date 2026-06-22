import { useRef } from "react";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { View } from "@react-three/drei";
import { ShowcaseCard } from "./ShowcaseCard";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const FEATURES = [
  {
    title: "AI Mentor",
    description:
      "Get real-time guidance, code reviews, and explanations from a context-aware AI tutor.",
  },
  {
    title: "Roadmap Galaxy",
    description:
      "Visualize your entire learning journey as a sprawling universe of interconnected nodes.",
  },
  {
    title: "Study Guide Engine",
    description:
      "Automatically generate comprehensive study materials based on your current knowledge gaps.",
  },
  {
    title: "Project Builder",
    description: "Deploy complex architectures with a single click and watch code flow like water.",
  },
];

// Simple animated orb for the previews
function PreviewOrb({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color={color} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
  );
}

export function ShowcaseGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
          The Ultimate Ecosystem
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          Hover over the modules below to interact with live 3D web technologies powered by
          ProjectSpark.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {FEATURES.map((feature, idx) => {
          const colors = ["#00e5ff", "#8a2be2", "#ffaa00", "#ff00ff"];
          return (
            <ShowcaseCard key={idx} title={feature.title} description={feature.description}>
              <PreviewOrb color={colors[idx % colors.length]} />
            </ShowcaseCard>
          );
        })}
      </div>
    </section>
  );
}
