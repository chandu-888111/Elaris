// src/hooks/use-scroll-velocity.ts
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Unified scroll‑velocity hook supporting mouse wheel, trackpad, touch, and pointer drag.
 * Returns raw and smoothed velocity values for consumption by ship physics, camera, audio, etc.
 */
export type InputType = "wheel" | "touch" | "pointer";

export interface ScrollVelocity {
  scrollY: number;
  delta: number;
  velocity: number;
  smoothedVelocity: number;
  direction: number;
  inputType: InputType;
}

export function useScrollVelocity({ smoothing = 0.1 } = { smoothing: 0.1 }) {
  const { gl } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const [delta, setDelta] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [smoothedVelocity, setSmoothedVelocity] = useState(0);
  const [direction, setDirection] = useState(0);
  const [inputType, setInputType] = useState<InputType>("wheel");

  const lastTimeRef = useRef(performance.now());
  const lastPosRef = useRef(0);
  const scrollYRef = useRef(0);
  const smoothedVelocityRef = useRef(0);

  const update = (newY: number, type: InputType) => {
    const now = performance.now();
    const dt = (now - lastTimeRef.current) / 1000; // seconds
    const dy = newY - lastPosRef.current;
    const rawVelocity = dt > 0 ? dy / dt : 0;
    const smoothed = THREE.MathUtils.lerp(smoothedVelocityRef.current, rawVelocity, smoothing);

    setScrollY(newY);
    setDelta(dy);
    setVelocity(rawVelocity);
    setSmoothedVelocity(smoothed);
    setDirection(Math.sign(dy));
    setInputType(type);

    lastTimeRef.current = now;
    lastPosRef.current = newY;
    scrollYRef.current = newY;
    smoothedVelocityRef.current = smoothed;
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      update(scrollYRef.current + e.deltaY, "wheel");
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        update(e.touches[0].clientY, "touch");
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        update(e.touches[0].clientY, "touch");
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      update(scrollYRef.current + e.movementY, "pointer");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons) {
        update(scrollYRef.current + e.movementY, "pointer");
      }
    };
    const container = gl.domElement;
    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- update is stable and uses refs for scroll position tracking
  }, [gl.domElement]);

  return {
    scrollY,
    delta,
    velocity,
    smoothedVelocity,
    direction,
    inputType,
  } as ScrollVelocity;
}
