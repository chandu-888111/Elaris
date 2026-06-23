// src/components/canvas/Spaceship.tsx
import React, { useRef, useEffect } from "react";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";
import { useGLTF } from "@react-three/drei";
import { useShipPhysics } from "../../hooks/use-ship-physics";
import { useSceneStore, SceneState } from "../../hooks/use-scene-store";
import * as THREE from "three";

/**
 * Spaceship component – loads the Alien_Breed_Starfighter USDZ model and
 * applies position, rotation, and banking based on ship physics.
 */
export const Spaceship: React.FC = () => {
  // Asynchronously load model with fallback chain: USDZ → GLB → placeholder
  // Asynchronously load model with fallback chain: USDZ → GLB → placeholder
  const [model, setModel] = React.useState<unknown>(null);
  const [source, setSource] = React.useState<string>("");

  React.useEffect(() => {
    // Helper to load via loader
    const loadUSDZ = async () => {
      const loader = new USDZLoader();
      try {
        const gltf = await loader.loadAsync("/Alien_Breed_Starfighter_Reimagined.usdz");
        setModel(gltf);
        setSource("USDZ");
        console.log("[Spaceship] USDZ loaded");
      } catch (err) {
        console.warn("[Spaceship] USDZ failed, loading GLB fallback", err);
        loadGLB();
      }
    };
    const loadGLB = async () => {
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");
      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync("/Alien_Breed_Starfighter_Reimagined.glb");
        setModel(gltf);
        setSource("GLB");
        console.log("[Spaceship] GLB loaded");
      } catch (err) {
        console.warn("[Spaceship] GLB failed, loading placeholder", err);
        loadPlaceholder();
      }
    };
    const loadPlaceholder = async () => {
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");
      const loader = new GLTFLoader();
      try {
        const gltf = await loader.loadAsync("/placeholderLowPoly.glb");
        setModel(gltf);
        setSource("placeholder");
        console.log("[Spaceship] Placeholder loaded");
      } catch (err) {
        console.error("[Spaceship] All model loads failed", err);
      }
    };
    loadUSDZ();
  }, []);

  const shipGroup = useRef<THREE.Group>(null!);
  const physics = useShipPhysics();
  const setShipMode = useSceneStore((s: SceneState) => s.setShipMode);

  // Update store with current mode
  useEffect(() => {
    setShipMode(physics.mode);
  }, [physics.mode, setShipMode]);

  // Animate ship each frame based on physics
  useFrame(() => {
    if (!shipGroup.current) return;
    // Forward movement along -Z based on velocity
    const forward = physics.velocity * 5; // speed factor
    const targetPos = new THREE.Vector3(0, 0, -forward);
    shipGroup.current.position.lerp(targetPos, 0.08);

    // Banking (roll) around Z axis
    const targetQuat = new THREE.Quaternion();
    const euler = new THREE.Euler(0, 0, physics.bankAngle, "XYZ");
    targetQuat.setFromEuler(euler);
    shipGroup.current.quaternion.slerp(targetQuat, 0.08);
  });

  const getObject = () => {
    if (!model) return null;
    const obj = model as THREE.Object3D & { scene?: THREE.Object3D };
    return obj.scene ?? obj;
  };

  const modelObject = getObject();
  if (!modelObject) return null;

  return (
    <group ref={shipGroup}>
      {/* The USDZ loader returns a scene; some loaders expose .scene, fallback to object itself */}
      <primitive object={modelObject} />
    </group>
  );
};
