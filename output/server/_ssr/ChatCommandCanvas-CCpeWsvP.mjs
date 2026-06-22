import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SharedCanvas } from "./router-DT2A3-T4.mjs";
import { d as dt, w as wt } from "../_libs/react-three__postprocessing.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { G as Grid, O as OrbitControls, a as Sphere } from "../_libs/react-three__drei.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
import { D as DoubleSide } from "../_libs/three.mjs";
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
function AIOrb({ isStreaming }) {
  const meshRef = reactExports.useRef(null);
  const ringRef = reactExports.useRef(null);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speed = isStreaming ? 3 : 1;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5 * speed;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      const scale = 1 + Math.sin(time * (isStreaming ? 8 : 2)) * (isStreaming ? 0.08 : 0.02);
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.2) * 0.1;
      ringRef.current.rotation.z = time * 0.2 * speed;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, -2], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: meshRef, args: [0.8, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color: "#38bdf8",
        emissive: isStreaming ? "#38bdf8" : "#0284c7",
        emissiveIntensity: isStreaming ? 2 : 0.5,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: ringRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ringGeometry", { args: [1.2, 1.22, 64] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshBasicMaterial",
        {
          color: "#38bdf8",
          transparent: true,
          opacity: isStreaming ? 0.8 : 0.2,
          side: DoubleSide
        }
      )
    ] })
  ] });
}
function ChatCommandCanvas({ isStreaming }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[#000510] pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 1.5, 6], fov: 45 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Grid,
      {
        position: [0, -2, 0],
        args: [20, 20],
        cellSize: 0.5,
        cellThickness: 1,
        cellColor: "#38bdf8",
        sectionSize: 2.5,
        sectionThickness: 1.5,
        sectionColor: "#38bdf8",
        fadeDistance: 15,
        fadeStrength: 2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AIOrb, { isStreaming }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitControls, { enableZoom: false, enablePan: false, enableRotate: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(dt, { multisampling: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      wt,
      {
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0.9,
        intensity: isStreaming ? 2 : 0.8
      }
    ) })
  ] }) }) });
}
export {
  ChatCommandCanvas as default
};
