import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useRef, useMemo } from "react";

function FloatingDataCards() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      const t = time * 0.1 + i * 100;
      dummy.position.x = Math.sin(t * 0.5) * 8;
      dummy.position.y = Math.cos(t * 0.3) * 6;
      dummy.position.z = Math.sin(t * 0.2) * 5 - 5;
      
      dummy.rotation.x = Math.sin(t * 0.5);
      dummy.rotation.y = Math.cos(t * 0.4);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.6, 0.8, 0.05]} />
      <meshPhysicalMaterial 
        color="#38bdf8" 
        emissive="#0284c7"
        emissiveIntensity={0.5}
        transparent 
        opacity={0.3} 
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </instancedMesh>
  );
}

export default function LibraryCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-[#01030a] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
          <Stars radius={20} depth={10} count={1500} factor={2} saturation={1} fade speed={0.5} />
          <FloatingDataCards />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#01030a] opacity-80" />
    </div>
  );
}
