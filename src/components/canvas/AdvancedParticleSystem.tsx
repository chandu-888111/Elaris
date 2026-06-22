import { useRef, useMemo, useEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { FboSimulationMaterial } from "./FboSimulationMaterial";

const RenderShader = {
  uniforms: {
    positions: { value: null },
    uColor: { value: new THREE.Color() },
  },
  vertexShader: `
    uniform sampler2D positions;
    attribute vec2 instanceUv;
    varying vec2 vUv;
    void main() {
      vUv = instanceUv;
      vec4 pos = texture2D(positions, instanceUv);
      vec4 mvPosition = modelViewMatrix * vec4(pos.xyz, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(uColor, 0.8);
    }
  `,
};

export function AdvancedParticleSystem({
  type,
  count,
  color,
}: {
  type: "dust" | "energy" | "plasma" | "quantum" | "meteor";
  count: number;
  color: string;
}) {
  // Texture dimensions based on count (square)
  const size = Math.ceil(Math.sqrt(count));
  const actualCount = size * size;

  // FBOs
  const target1 = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  const target2 = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  const simMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const renderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  // Setup FBO Scene
  const [scene, camera] = useMemo(() => {
    const s = new THREE.Scene();
    const c = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
    return [s, c];
  }, []);

  // Initialize positions
  const [initTexture, instanceUvs] = useMemo(() => {
    const data = new Float32Array(size * size * 4);
    const uvs = new Float32Array(actualCount * 2);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i * size + j;
        const idx4 = index * 4;

        data[idx4] = (Math.random() - 0.5) * 100;
        data[idx4 + 1] = (Math.random() - 0.5) * 100;
        data[idx4 + 2] = (Math.random() - 0.5) * 100;
        data[idx4 + 3] = 1.0;

        uvs[index * 2] = i / size;
        uvs[index * 2 + 1] = j / size;
      }
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;
    return [texture, uvs];
  }, [size, actualCount]);

  // Ping-pong state
  const flip = useRef(false);

  let typeId = 0;
  if (type === "energy") typeId = 1;
  if (type === "meteor") typeId = 2;
  if (type === "plasma") typeId = 3;

  const uniforms = useMemo(
    () => ({
      positions: { value: initTexture },
      uTime: { value: 0 },
      uSpeed: { value: 1.0 },
      uType: { value: typeId },
    }),
    [initTexture, typeId],
  );

  useFrame((state) => {
    if (!simMaterialRef.current || !renderMaterialRef.current) return;
    const { gl, clock } = state;

    simMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;

    // Ping Pong FBO
    gl.setRenderTarget(flip.current ? target1 : target2);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Swap
    flip.current = !flip.current;

    // Read from rendered target
    const currentTarget = flip.current ? target1 : target2;
    simMaterialRef.current.uniforms.positions.value = currentTarget.texture;
    renderMaterialRef.current.uniforms.positions.value = currentTarget.texture;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            ref={simMaterialRef}
            vertexShader={FboSimulationMaterial.vertexShader}
            fragmentShader={FboSimulationMaterial.fragmentShader}
            uniforms={uniforms}
          />
        </mesh>,
        scene,
      )}

      <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, actualCount]}>
        {/* Using a tiny plane for particles */}
        <planeGeometry args={[0.2, 0.2]}>
          <instancedBufferAttribute attach="attributes-instanceUv" args={[instanceUvs, 2]} />
        </planeGeometry>
        <shaderMaterial
          ref={renderMaterialRef}
          vertexShader={RenderShader.vertexShader}
          fragmentShader={RenderShader.fragmentShader}
          uniforms={{
            positions: { value: null },
            uColor: { value: new THREE.Color(color) },
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </>
  );
}
