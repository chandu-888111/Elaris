// src/hooks/use-ship-physics.ts
import { useEffect, useState } from "react";
import { useSceneStore } from "../hooks/use-scene-store";
import { useScrollVelocity } from "../hooks/use-scroll-velocity";
import * as THREE from "three";

/**
 * ShipPhysicsState – describes the current physics of the spaceship.
 */
export interface ShipPhysicsState {
  /** Normalized forward/backward velocity (‑1 … 1) */
  velocity: number;
  /** Acceleration derived from velocity change */
  acceleration: number;
  /** Bank (roll) angle in radians */
  bankAngle: number;
  /** Thrust intensity (0 … 1) used by visual effects */
  thrustIntensity: number;
  /** Current behavioural mode */
  mode: "idle" | "cruise" | "boost" | "reverse";
}

/**
 * useShipPhysics – computes ship physics using the unified scroll‑velocity hook.
 * It clamps velocity, derives thrust, banking, and mode, and syncs these values
 * to the global scene store for other subsystems (camera, audio, particles).
 */
export function useShipPhysics(): ShipPhysicsState {
  // smoothedVelocity already incorporates smoothing (default 0.1)
  const { smoothedVelocity } = useScrollVelocity();
  const setShipMode = useSceneStore((s) => s.setShipMode);
  const setShipVelocity = useSceneStore((s) => s.setShipVelocity);

  const [state, setState] = useState<ShipPhysicsState>({
    velocity: 0,
    acceleration: 0,
    bankAngle: 0,
    thrustIntensity: 0,
    mode: "idle",
  });

  useEffect(() => {
    // Clamp velocity to safe range (‑1 … 1)
    const velocity = THREE.MathUtils.clamp(smoothedVelocity, -1, 1);

    // Compute acceleration based on change from previous frame
    const acceleration = (velocity - state.velocity) / (1 / 60); // assuming 60 fps timestep

    // Determine ship mode
    let mode: ShipPhysicsState["mode"];
    if (velocity > 0.7) mode = "boost";
    else if (velocity > 0.3) mode = "cruise";
    else if (velocity < 0) mode = "reverse";
    else mode = "idle";

    // Thrust intensity (clamped 0-1)
    const thrustIntensity = THREE.MathUtils.clamp(Math.abs(velocity), 0, 1);

    // Banking angle proportional to velocity direction
    const maxBank = Math.PI / 6; // 30°
    const bankAngle = THREE.MathUtils.lerp(state.bankAngle, velocity * maxBank, 0.08);

    // Sync to global store
    setShipMode(mode);
    setShipVelocity(velocity);

    // Update local state
    setState({
      velocity,
      acceleration,
      bankAngle,
      thrustIntensity,
      mode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- state.velocity and state.bankAngle are omitted to prevent infinite rendering loops
  }, [smoothedVelocity, setShipMode, setShipVelocity]);

  return state;
}
