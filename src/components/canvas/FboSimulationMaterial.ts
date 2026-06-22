import * as THREE from "three";

export const FboSimulationMaterial = {
  uniforms: {
    positions: { value: null },
    uTime: { value: 0 },
    uSpeed: { value: 1.0 },
    uType: { value: 0 }, // 0: dust, 1: energy, 2: meteor, 3: plasma
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D positions;
    uniform float uTime;
    uniform float uSpeed;
    uniform int uType;
    varying vec2 vUv;

    // Pseudo-random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec4 pos = texture2D(positions, vUv);
      
      // Basic movement simulation
      vec3 vel = vec3(0.0);
      
      if (uType == 0) { // dust
        vel = vec3(
          sin(uTime * 0.1 + pos.y) * 0.5,
          cos(uTime * 0.2 + pos.x) * 0.5,
          sin(uTime * 0.15 + pos.z) * 0.5
        );
      } else if (uType == 1) { // energy
        // Pull towards center
        vel = -normalize(pos.xyz) * 2.0;
      } else if (uType == 2) { // meteor
        vel = vec3(15.0, 0.0, 0.0);
      } else if (uType == 3) { // plasma
        vel = vec3(
          sin(uTime + pos.z) * 5.0,
          cos(uTime + pos.x) * 5.0,
          sin(uTime + pos.y) * 5.0
        );
      }

      pos.xyz += vel * uSpeed * 0.016; // Approx delta time

      // Wrap boundaries
      if (pos.x > 50.0) pos.x -= 100.0;
      if (pos.x < -50.0) pos.x += 100.0;
      if (pos.y > 50.0) pos.y -= 100.0;
      if (pos.y < -50.0) pos.y += 100.0;
      if (pos.z > 50.0) pos.z -= 100.0;
      if (pos.z < -50.0) pos.z += 100.0;

      gl_FragColor = pos;
    }
  `,
};
