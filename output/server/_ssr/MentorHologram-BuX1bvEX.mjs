import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SharedCanvas } from "./router-DtXO_wcb.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-BioNg-KZ.mjs";
import "../_libs/seroval.mjs";
import { S as Stars, a as Sphere } from "../_libs/react-three__drei.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
import { v as AdditiveBlending } from "../_libs/three.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/react-three__postprocessing.mjs";
import "../_libs/postprocessing.mjs";
import "../_libs/maath.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__google.mjs";
import "../_libs/ai-sdk__anthropic.mjs";
import "../_libs/ai-sdk__cohere.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
import "../_libs/troika-three-text.mjs";
import "../_libs/troika-worker-utils.mjs";
import "../_libs/webgl-sdf-generator.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/troika-three-utils.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/tunnel-rat.mjs";
function HologramMesh({ isTyping, color = "#a78bfa" }) {
  const meshRef = reactExports.useRef(null);
  const wireRef = reactExports.useRef(null);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = isTyping ? 3 : 1;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.4 * speedMultiplier;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
      const pulseFreq = isTyping ? 6 : 2;
      const pulseAmp = isTyping ? 0.08 : 0.03;
      const scale = 1 + Math.sin(time * pulseFreq) * pulseAmp;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -time * 0.2 * speedMultiplier;
      wireRef.current.rotation.x = -Math.cos(time * 0.35) * 0.15;
      const wireScale = isTyping ? 1.18 : 1.12;
      wireRef.current.scale.set(wireScale, wireScale, wireScale);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: meshRef, args: [0.9, 8, 8], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color,
        emissive: color,
        emissiveIntensity: isTyping ? 1.4 : 0.65,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: wireRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.9, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color,
          wireframe: true,
          transparent: true,
          opacity: isTyping ? 0.6 : 0.3,
          blending: AdditiveBlending
        }
      )
    ] })
  ] });
}
function FloatingHologramParticles({ isTyping, color }) {
  const pointsRef = reactExports.useRef(null);
  const count = 75;
  const [particles, pointsArray] = reactExports.useMemo(() => {
    const pts = [];
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 0.4;
      const x = r * Math.cos(theta);
      const y = (Math.random() - 0.5) * 1.5;
      const z = r * Math.sin(theta);
      pts.push({
        x,
        y,
        z,
        speed: 0.8 + Math.random() * 1.2,
        origY: y
      });
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return [pts, arr];
  }, []);
  useFrame((state) => {
    const pos = pointsRef.current?.geometry.attributes.position;
    if (!pos) return;
    const speed = isTyping ? 3 : 1;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      let y = pos.getY(i) + 6e-3 * p.speed * speed;
      if (y > 1.8) {
        y = -1.2;
      }
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref: pointsRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [pointsArray, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        color,
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: isTyping ? 0.95 : 0.45,
        blending: AdditiveBlending,
        depthWrite: false
      }
    )
  ] });
}
function MentorHologram({ isTyping, color = "#a78bfa" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 w-48 mx-auto overflow-hidden rounded-full border border-white/5 bg-black/30 backdrop-blur shadow-glow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 0, 2.5], fov: 45 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 1.8, color }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -5, -5], intensity: 1, color: "#38bdf8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 10, depth: 5, count: 50, factor: 1, saturation: 0.5, speed: 0.4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HologramMesh, { isTyping, color }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingHologramParticles, { isTyping, color })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `absolute inset-0 rounded-full border border-white/5 pointer-events-none transition-all duration-700 ${isTyping ? "animate-pulse-ring" : ""}`
      }
    )
  ] });
}
export {
  MentorHologram
};
