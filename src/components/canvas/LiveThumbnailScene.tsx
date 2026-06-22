import { useRef } from "react";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";
import { useFrame } from "@react-three/fiber";
import { Mesh, MathUtils } from "three";
import { useCursorStore } from "@/store/CursorStore";

function HoveringOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = MathUtils.lerp(
      meshRef.current.position.y,
      Math.sin(t * 2) * 0.1,
      0.1,
    );
    meshRef.current.rotation.x = t * 0.5;
    meshRef.current.rotation.y = t * 0.8;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial
        color="#00e5ff"
        wireframe={true}
        transparent={true}
        opacity={0.8}
        emissive="#00e5ff"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function LiveThumbnailScene({ active }: { active: boolean }) {
  const setCursorVariant = useCursorStore((state) => state.setVariant);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s ease" }}
      onMouseEnter={() => setCursorVariant("hidden")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      {active && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#8a2be2" />
          <HoveringOrb />
        </Canvas>
      )}
    </div>
  );
}
