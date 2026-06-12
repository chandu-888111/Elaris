import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Icosahedron } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function AsteroidField({ count = 100 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random data for each asteroid
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40 - 10
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      speed: {
        rX: (Math.random() - 0.5) * 0.02,
        rY: (Math.random() - 0.5) * 0.02,
        rZ: (Math.random() - 0.5) * 0.02,
        velocity: [
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ] as [number, number, number]
      },
      scale: Math.random() * 0.5 + 0.1
    }));
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    asteroids.forEach((asteroid, i) => {
      // Update position
      asteroid.position[0] += asteroid.speed.velocity[0];
      asteroid.position[1] += asteroid.speed.velocity[1];
      asteroid.position[2] += asteroid.speed.velocity[2];

      // Wrap around bounds
      if (asteroid.position[0] > 20) asteroid.position[0] = -20;
      if (asteroid.position[0] < -20) asteroid.position[0] = 20;
      if (asteroid.position[1] > 20) asteroid.position[1] = -20;
      if (asteroid.position[1] < -20) asteroid.position[1] = 20;
      if (asteroid.position[2] > 10) asteroid.position[2] = -30;
      if (asteroid.position[2] < -30) asteroid.position[2] = 10;

      // Update rotation
      asteroid.rotation[0] += asteroid.speed.rX;
      asteroid.rotation[1] += asteroid.speed.rY;
      asteroid.rotation[2] += asteroid.speed.rZ;

      dummy.position.set(...asteroid.position);
      dummy.rotation.set(...asteroid.rotation);
      dummy.scale.setScalar(asteroid.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.3} 
        wireframe={true} 
      />
    </instancedMesh>
  );
}

export function AsteroidBackground() {
  return (
    <div className="fixed inset-0 -z-20 h-full w-full bg-black overflow-hidden pointer-events-none" aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#38bdf8" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
        
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <AsteroidField count={150} />
        
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
