import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SharedCanvas } from "./router-DT2A3-T4.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { S as Stars, O as OrbitControls } from "../_libs/react-three__drei.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
import { an as Object3D } from "../_libs/three.mjs";
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
function FloatingDataCards() {
  const count = 40;
  const meshRef = reactExports.useRef(null);
  const dummy = reactExports.useMemo(() => new Object3D(), []);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const t = time * 0.1 + i * 100;
      dummy.position.x = Math.sin(t * 0.5) * 8;
      dummy.position.y = Math.cos(t * 0.3) * 6;
      dummy.position.z = Math.sin(t * 0.2) * 5 - 5;
      dummy.rotation.x = Math.sin(t * 0.5);
      dummy.rotation.y = Math.cos(t * 0.4);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("instancedMesh", { ref: meshRef, args: [void 0, void 0, count], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.6, 0.8, 0.05] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhysicalMaterial",
      {
        color: "#38bdf8",
        emissive: "#0284c7",
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.3,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true
      }
    )
  ] });
}
function LibraryCanvas() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 bg-[#01030a] pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 0, 8], fov: 50 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [10, 10, 10], intensity: 1, color: "#38bdf8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 20, depth: 10, count: 1500, factor: 2, saturation: 1, fade: true, speed: 0.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingDataCards, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitControls, { enableZoom: false, enablePan: false, autoRotate: true, autoRotateSpeed: 0.5 })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-[#01030a] opacity-80" })
  ] });
}
export {
  LibraryCanvas as default
};
