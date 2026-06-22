import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SharedCanvas } from "./router-DT2A3-T4.mjs";
import { g as gsapWithCSS } from "../_libs/gsap.mjs";
import "../_libs/sonner.mjs";
import "./client-DwafHdRl.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { S as Stars, O as OrbitControls, a as Sphere, H as Html, R as Ring } from "../_libs/react-three__drei.mjs";
import { a as useFrame, u as useThree } from "../_libs/react-three__fiber.mjs";
import { e as Vector3, as as QuadraticBezierCurve3, ak as BufferGeometry, ap as LineBasicMaterial, v as AdditiveBlending, aq as Line, D as DoubleSide } from "../_libs/three.mjs";
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
function CameraController({ targetPosition }) {
  const { camera, controls } = useThree();
  reactExports.useEffect(() => {
    const duration = 1.5;
    if (targetPosition) {
      const targetCamX = targetPosition.x + 0.8;
      const targetCamY = targetPosition.y + 0.5;
      const targetCamZ = targetPosition.z + 1.8;
      gsapWithCSS.to(camera.position, {
        x: targetCamX,
        y: targetCamY,
        z: targetCamZ,
        duration,
        ease: "power3.inOut"
      });
      if (controls) {
        const orbitControls = controls;
        gsapWithCSS.to(orbitControls.target, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration,
          ease: "power3.inOut",
          onUpdate: () => orbitControls.update()
        });
      }
    } else {
      gsapWithCSS.to(camera.position, {
        x: 0,
        y: 3,
        z: 8,
        duration,
        ease: "power3.inOut"
      });
      if (controls) {
        const orbitControls = controls;
        gsapWithCSS.to(orbitControls.target, {
          x: 0,
          y: 0,
          z: 0,
          duration,
          ease: "power3.inOut",
          onUpdate: () => orbitControls.update()
        });
      }
    }
  }, [targetPosition, camera, controls]);
  return null;
}
function PlanetRing({ radius, color }) {
  const ref = reactExports.useRef(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ring, { ref, args: [radius, radius + 0.08, 64], rotation: [-Math.PI / 2.3, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "meshBasicMaterial",
    {
      color,
      side: DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: AdditiveBlending
    }
  ) });
}
function SubtopicMoons({ skills, planetRadius }) {
  const groupRef = reactExports.useRef(null);
  const moons = reactExports.useMemo(() => skills?.slice(0, 5) || [], [skills]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  if (moons.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: moons.map((skill, idx) => {
    const angle = idx / moons.length * Math.PI * 2;
    const orbitRadius = planetRadius + 0.5;
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [x, Math.sin(angle) * 0.2, z], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [0.06, 16, 16], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#9ca3af", roughness: 0.7, metalness: 0.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { distanceFactor: 5, center: true, position: [0, -0.15, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[6px] text-white/50 font-mono tracking-widest uppercase whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: skill }) })
    ] }, idx);
  }) });
}
function ResourceSatellites({
  resources,
  planetRadius
}) {
  const groupRef = reactExports.useRef(null);
  const sats = reactExports.useMemo(() => resources.slice(0, 4), [resources]);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  if (sats.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: groupRef, children: sats.map((res, idx) => {
    const angle = idx / sats.length * Math.PI * 2;
    const orbitRadius = planetRadius + 0.9;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [x, y, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [0.03, 8, 8], children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#38bdf8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { distanceFactor: 6, center: true, position: [0.1, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: res.url,
          target: "_blank",
          rel: "noreferrer",
          onClick: (e) => e.stopPropagation(),
          className: "text-[5px] text-sky-200/70 hover:text-sky-400 font-mono tracking-widest uppercase whitespace-nowrap transition",
          children: res.type
        }
      ) })
    ] }, idx);
  }) });
}
function NodePlanet({
  node,
  index,
  total,
  status,
  isSelected,
  onClick
}) {
  const ref = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  const pos = reactExports.useMemo(() => {
    const angle = index * (Math.PI / 2.8);
    const radius = 1.5 + index * 0.8;
    const y = (index - total / 2) * 0.4;
    return new Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle));
  }, [index, total]);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.03;
      ref.current.scale.set(pulse, pulse, pulse);
    }
  });
  const colorConfig = reactExports.useMemo(() => {
    switch (status) {
      case "completed":
        return { color: "#10b981", emissive: "#059669", intensity: 1.2, ring: true };
      case "in_progress":
        return { color: "#c084fc", emissive: "#6b21a8", intensity: 1, ring: true };
      case "available":
        return { color: "#38bdf8", emissive: "#0369a1", intensity: 0.8, ring: false };
      default:
        return { color: "#4b5563", emissive: "#1f2937", intensity: 0.15, ring: false };
    }
  }, [status]);
  const planetRadius = 0.4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: pos, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sphere,
      {
        ref,
        args: [planetRadius, 64, 64],
        onClick: (e) => {
          e.stopPropagation();
          onClick();
        },
        onPointerOver: (e) => {
          e.stopPropagation();
          setHovered(true);
        },
        onPointerOut: () => {
          setHovered(false);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshPhysicalMaterial",
          {
            color: colorConfig.color,
            emissive: colorConfig.emissive,
            emissiveIntensity: hovered ? colorConfig.intensity * 1.5 : colorConfig.intensity,
            roughness: hovered ? 0.1 : 0.3,
            metalness: 0.7,
            clearcoat: 1
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubtopicMoons, { skills: node.skills, planetRadius }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceSatellites, { resources: node.resources, planetRadius }),
    colorConfig.ring && /* @__PURE__ */ jsxRuntimeExports.jsx(PlanetRing, { radius: 0.8, color: colorConfig.color }),
    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [planetRadius + 0.15, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshBasicMaterial",
      {
        color: colorConfig.color,
        transparent: true,
        opacity: 0.15,
        blending: AdditiveBlending,
        wireframe: true
      }
    ) }),
    status === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { rotation: [0.5, 0.5, 0.5], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [1, 1, 1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#ef4444", wireframe: true, transparent: true, opacity: 0.1 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { distanceFactor: 8, position: [0, 0.8, 0], center: true, zIndexRange: [40, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `pointer-events-none select-none rounded-lg px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest border backdrop-blur-md transition-all duration-300 ${isSelected ? "bg-spark/90 text-primary-foreground border-spark shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110" : hovered ? "bg-card/90 text-foreground border-white/30 scale-105" : "bg-black/60 text-muted-foreground border-white/5"}`,
        children: node.title
      }
    ) })
  ] });
}
function ConnectionBeams({ nodes, total }) {
  const points = reactExports.useMemo(() => {
    return nodes.map((_, index) => {
      const angle = index * (Math.PI / 2.8);
      const radius = 1.5 + index * 0.8;
      const y = (index - total / 2) * 0.4;
      return new Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle));
    });
  }, [nodes, total]);
  const curvePoints = reactExports.useMemo(() => {
    if (points.length < 2) return [];
    const beams = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const mid = new Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += 0.4;
      const curve = new QuadraticBezierCurve3(p1, mid, p2);
      beams.push(curve.getPoints(40));
    }
    return beams;
  }, [points]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { children: curvePoints.map((pts, i) => {
    const lineGeom = new BufferGeometry().setFromPoints(pts);
    const lineMat = new LineBasicMaterial({
      color: "#818cf8",
      transparent: true,
      opacity: 0.15,
      blending: AdditiveBlending,
      linewidth: 1.5
    });
    const lineObj = new Line(lineGeom, lineMat);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("primitive", { object: lineObj }, i);
  }) });
}
function RoadmapGalaxy({
  nodes,
  completedIds,
  inProgressIds,
  selectedNode,
  onSelectNode,
  nodeStatus,
  onStatusChange
}) {
  const total = nodes.length;
  const selectedPos = reactExports.useMemo(() => {
    if (!selectedNode) return null;
    const idx = nodes.findIndex((n) => n.id === selectedNode.id);
    if (idx === -1) return null;
    const angle = idx * (Math.PI / 2.8);
    const radius = 1.5 + idx * 0.8;
    const y = (idx - total / 2) * 0.4;
    return new Vector3(radius * Math.cos(angle), y - 0.2, radius * Math.sin(angle));
  }, [selectedNode, nodes, total]);
  const themeColors = reactExports.useMemo(() => {
    if (!selectedNode) {
      return { ambient: "#c084fc", point1: "#38bdf8", point2: "#ec4899" };
    }
    const title = selectedNode.title.toLowerCase();
    if (title.match(/react|html|css|frontend|ui/)) {
      return { ambient: "#06b6d4", point1: "#00d2ff", point2: "#3b82f6" };
    } else if (title.match(/sql|db|backend|node|python|go|rust/)) {
      return { ambient: "#10b981", point1: "#10b981", point2: "#14b8a6" };
    } else if (title.match(/ai|learning|model|agent/)) {
      return { ambient: "#a78bfa", point1: "#c084fc", point2: "#f472b6" };
    } else {
      return { ambient: "#fb923c", point1: "#f43f5e", point2: "#e11d48" };
    }
  }, [selectedNode]);
  reactExports.useMemo(() => {
    if (!nodeStatus)
      return { label: "Locked", badgeBg: "bg-red-500/10", badgeText: "text-red-400" };
    switch (nodeStatus) {
      case "completed":
        return { label: "Completed", badgeBg: "bg-emerald-500/15", badgeText: "text-emerald-400" };
      case "in_progress":
        return { label: "In Progress", badgeBg: "bg-purple-500/15", badgeText: "text-purple-400" };
      case "available":
        return { label: "Available", badgeBg: "bg-sky-500/15", badgeText: "text-sky-400" };
      default:
        return { label: "Locked", badgeBg: "bg-red-500/10", badgeText: "text-red-400" };
    }
  }, [nodeStatus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full bg-[#030014] rounded-3xl border border-white/10 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 3, 8], fov: 45 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4, color: themeColors.ambient }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [10, 10, 10], intensity: 1.5, color: themeColors.point1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-10, -10, -10], intensity: 0.8, color: themeColors.point2 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 60, depth: 30, count: 800, factor: 2, saturation: 0.5, fade: true, speed: 0.4 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, -0.5, 0], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectionBeams, { nodes, total }),
        nodes.map((node, index) => {
          const isCompleted = completedIds.has(node.id);
          const isInProgress = inProgressIds.has(node.id);
          const isSelected = selectedNode?.id === node.id;
          let status = "locked";
          if (isCompleted) status = "completed";
          else if (isInProgress) status = "in_progress";
          else status = "available";
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            NodePlanet,
            {
              node,
              index,
              total,
              status,
              isSelected,
              onClick: () => onSelectNode(node)
            },
            node.id
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CameraController, { targetPosition: selectedPos }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrbitControls,
        {
          enableZoom: true,
          maxDistance: 20,
          minDistance: 2,
          maxPolarAngle: Math.PI / 1.5,
          minPolarAngle: Math.PI / 6,
          enableDamping: true,
          dampingFactor: 0.05
        }
      )
    ] }) }),
    !selectedNode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-6 text-[9px] uppercase tracking-widest text-muted-foreground font-bold bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" }),
        " ",
        "Completed"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" }),
        " ",
        "In Progress"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" }),
        " ",
        "Available"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-gray-600" }),
        " Locked"
      ] })
    ] })
  ] });
}
export {
  RoadmapGalaxy
};
