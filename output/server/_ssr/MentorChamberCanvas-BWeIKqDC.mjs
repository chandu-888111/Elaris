import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SharedCanvas } from "./router-DtXO_wcb.mjs";
import { d as dt, w as wt } from "../_libs/react-three__postprocessing.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-BioNg-KZ.mjs";
import "../_libs/seroval.mjs";
import { S as Stars, O as OrbitControls, a as Sphere } from "../_libs/react-three__drei.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
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
import "../_libs/three.mjs";
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
import "../_libs/postprocessing.mjs";
import "../_libs/maath.mjs";
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
function HolographicEntity({ isTyping }) {
  const meshRef = reactExports.useRef(null);
  const ringRef = reactExports.useRef(null);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = isTyping ? 3 : 0.5;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2 * speedMultiplier;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      const pulseFreq = isTyping ? 5 : 1.5;
      const pulseAmp = isTyping ? 0.05 : 0.02;
      const scale = 1 + Math.sin(time * pulseFreq) * pulseAmp;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.2;
      ringRef.current.rotation.y = time * 0.1 * speedMultiplier;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: meshRef, args: [1.5, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color: "#a78bfa",
        emissive: "#a78bfa",
        emissiveIntensity: isTyping ? 1.5 : 0.5,
        roughness: 0.1,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [1.4, 64, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color: "#38bdf8",
        emissive: "#38bdf8",
        emissiveIntensity: isTyping ? 0.5 : 0.1,
        roughness: 0.2,
        transmission: 0.9,
        thickness: 0.5
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: ringRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [2.5, 0.02, 16, 100] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#a78bfa", transparent: true, opacity: isTyping ? 0.8 : 0.3 })
    ] })
  ] });
}
function MentorChamberCanvas({ isTyping }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[#02000a] pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 0, 8], fov: 45 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [5, 5, 5], intensity: 2, color: "#a78bfa" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-5, -5, -5], intensity: 1, color: "#38bdf8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 20, depth: 10, count: 1e3, factor: 2, saturation: 1, fade: true, speed: 0.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicEntity, { isTyping }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrbitControls,
      {
        enableZoom: false,
        enablePan: false,
        maxPolarAngle: Math.PI / 1.5,
        minPolarAngle: Math.PI / 3
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(dt, { multisampling: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      wt,
      {
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0.9,
        intensity: isTyping ? 2.5 : 1.5
      }
    ) })
  ] }) }) });
}
export {
  MentorChamberCanvas as default
};
