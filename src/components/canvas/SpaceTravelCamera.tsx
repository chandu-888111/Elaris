// src/components/canvas/SpaceTravelCamera.tsx
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/hooks/use-scene-store";

/**
 * Camera component handling multiple modes:
 * - "orbit": true spherical orbit around the ship.
 * - "flyby": cinematic approach → pass → pullback sequence.
 * - fallback (default) retains previous warp‑drive behavior.
 */
export function SpaceTravelCamera() {
  const { camera } = useThree();
  const cameraMode = useSceneStore((s) => s.cameraMode);
  const graphicsMode = useSceneStore((s) => s.graphicsMode);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const cameraPosition = useSceneStore((s) => s.cameraPosition);

  const currentPos = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());
  const currentFov = useRef(45);

  // Flyby FSM state
  const flybyStage = useRef<"approach" | "pass" | "pullback">("approach");
  const flybyTimer = useRef(0);

  useFrame((state, delta) => {
    const smoothing = graphicsMode === "ultra" ? 0.2 : graphicsMode === "high" ? 0.1 : 0.05;
    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3(0, 0, 0);
    const targetFov = 45;
    let lerpSpeed = 0.1;

    if (cameraMode === "orbit") {
      // True spherical orbit: constant radius, elevation angle, rotating around Y axis.
      const radius = 8;
      const speed = 0.2; // rad/s
      const elapsed = state.clock.getElapsedTime();
      const theta = elapsed * speed; // horizontal angle
      const phi = Math.PI / 6; // 30° elevation
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      targetPos.set(x, y, z);
      // smooth orientation via quaternion slerp
      const lookQuat = new THREE.Quaternion();
      lookQuat.setFromUnitVectors(new THREE.Vector3(0, 0, -1), targetPos.clone().normalize());
      camera.quaternion.slerp(lookQuat, smoothing);
    } else if (cameraMode === "flyby") {
      // Simple three‑stage flyby FSM.
      const approachDuration = 1.5; // seconds
      const passDuration = 1.0;
      const pullbackDuration = 1.5;
      flybyTimer.current += delta;
      const stage = flybyStage.current;

      if (stage === "approach") {
        const t = Math.min(flybyTimer.current / approachDuration, 1);
        // Move from Z=8 towards Z=-4 (in front of ship)
        targetPos.set(0, 0, 8 - t * 12);
        if (t >= 1) {
          flybyStage.current = "pass";
          flybyTimer.current = 0;
        }
      } else if (stage === "pass") {
        const t = Math.min(flybyTimer.current / passDuration, 1);
        // Pass by the ship, from Z=-4 to Z=4
        targetPos.set(0, 0, -4 + t * 8);
        if (t >= 1) {
          flybyStage.current = "pullback";
          flybyTimer.current = 0;
        }
      } else if (stage === "pullback") {
        const t = Math.min(flybyTimer.current / pullbackDuration, 1);
        // Pull back to original distance Z=8
        targetPos.set(0, 0, 4 + t * 4);
        if (t >= 1) {
          // Loop back to approach for continuous demo
          flybyStage.current = "approach";
          flybyTimer.current = 0;
        }
      }
      lerpSpeed = 0.15;
    } else if (cameraMode === "dramatic") {
      // Slow pullback and subtle roll (Dutch tilt) for the invitation/closing chapter
      targetPos.set(0.5, 0.5, 12);
      targetLook.set(0, 0, 0);
      camera.up.set(0.1, 0.99, 0).normalize();
      lerpSpeed = 0.02;
    } else {
      // centralize scroll‑driven timeline position from the store (chase mode / default)
      targetPos.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
      targetLook.set(0, 0, 0);
      // subtle pointer parallax
      const { pointer } = state;
      targetPos.x += pointer.x * 0.5;
      targetPos.y += pointer.y * 0.5;
      lerpSpeed = 0.05;
    }

    // Reset camera roll if not in dramatic mode
    if (cameraMode !== "dramatic") {
      camera.up.set(0, 1, 0);
    }

    // Apply smoothing lerps
    currentPos.current.lerp(targetPos, lerpSpeed);
    currentLook.current.lerp(targetLook, lerpSpeed);
    currentFov.current = THREE.MathUtils.lerp(currentFov.current, targetFov, lerpSpeed * 2);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
    if ((camera as THREE.PerspectiveCamera).fov !== undefined) {
      (camera as THREE.PerspectiveCamera).fov = currentFov.current;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}
