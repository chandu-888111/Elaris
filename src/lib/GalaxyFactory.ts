import * as THREE from "three";

export type GalaxyType = "spiral" | "elliptical" | "cluster";

export interface GalaxyParams {
  type: GalaxyType;
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  insideColor: THREE.Color;
  outsideColor: THREE.Color;
}

export function generateGalaxy(params: GalaxyParams): {
  positions: Float32Array;
  colors: Float32Array;
} {
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);

  const colorInside = params.insideColor.clone();
  const colorOutside = params.outsideColor.clone();

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * params.radius;
    let branchAngle = 0;

    if (params.type === "spiral") {
      branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;
    } else if (params.type === "elliptical") {
      branchAngle = Math.random() * Math.PI * 2;
    }

    const spinAngle = radius * params.spin;

    const randomX =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), params.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      params.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Cluster variation (spherical distribution)
    if (params.type === "cluster") {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.cbrt(Math.random()) * params.radius;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
    }

    // Color
    const mixedColor = colorInside.clone().lerp(colorOutside, radius / params.radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  return { positions, colors };
}
