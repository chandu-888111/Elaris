import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { k as getPlanetForXP } from "./router-DT2A3-T4.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
import { S as Stars, a as Sphere, H as Html } from "../_libs/react-three__drei.mjs";
import { e as Vector3, ar as CatmullRomCurve3 } from "../_libs/three.mjs";
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
function OrbitingStations({
  count,
  radius,
  speed,
  color
}) {
  const groupRef = reactExports.useRef(null);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: Array.from({ length: count }).map((_, i) => {
    const angle = i / count * Math.PI * 2;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "group",
      {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.2,
          Math.sin(angle) * radius
        ],
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("octahedronGeometry", { args: [0.08] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "meshStandardMaterial",
            {
              color,
              emissive: color,
              emissiveIntensity: 0.5,
              wireframe: true
            }
          )
        ] })
      },
      i
    );
  }) });
}
function ConstellationLines({ achievements }) {
  const pts = reactExports.useMemo(() => {
    const points = [];
    for (let i = 0; i < achievements.length; i++) {
      const angle = i / Math.max(1, achievements.length) * Math.PI * 2;
      const r = 4 + i % 3;
      points.push(
        new Vector3(Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r)
      );
    }
    return points;
  }, [achievements]);
  if (pts.length < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    pts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Sphere, { args: [0.05], position: p, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#fcd34d" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { distanceFactor: 15, center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[6px] font-mono text-amber-200/50 uppercase whitespace-nowrap", children: achievements[i] }) })
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("tubeGeometry", { args: [new CatmullRomCurve3(pts, true), 64, 0.01, 8, false] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#fcd34d", transparent: true, opacity: 0.2 })
    ] })
  ] });
}
function UniverseMap({ xp, projects, achievements, skills }) {
  const { current } = getPlanetForXP(xp);
  const planetRef = reactExports.useRef(null);
  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  const projectsCount = typeof projects === "number" ? projects : projects?.length || 0;
  const skillsCount = typeof skills === "number" ? skills : skills?.length || 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.2, color: current.color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [5, 3, 5], intensity: 2, color: "#ffffff" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-2, 0, -2], intensity: 1, color: current.color }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 50, depth: 20, count: 3e3, factor: 4, saturation: 1, fade: true, speed: 0.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { ref: planetRef, args: [1.5, 64, 64], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshPhysicalMaterial",
        {
          color: current.color,
          emissive: current.color,
          emissiveIntensity: 0.2,
          roughness: 0.4,
          metalness: 0.1,
          wireframe: true
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0, -2.5, 0], center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-white font-bold text-lg whitespace-nowrap uppercase tracking-widest",
          style: { color: current.color, textShadow: `0 0 10px ${current.color}` },
          children: current.name
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitingStations, { count: projectsCount, radius: 2.5, speed: 0.3, color: "#38bdf8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitingStations, { count: skillsCount, radius: 3.5, speed: -0.2, color: "#10b981" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ConstellationLines, { achievements: achievements?.map((a) => a.title) || [] })
  ] });
}
export {
  UniverseMap as default
};
