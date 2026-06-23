import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useAuth, d as PageShell, e as PageHeader, H as HolographicPanel, S as SharedCanvas } from "./_ssr/router-DtXO_wcb.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-BioNg-KZ.mjs";
import "./_libs/seroval.mjs";
import { aa as ChartColumn, aN as Activity, T as TrendingUp, ag as Target, Z as Zap, J as Trophy } from "./_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, e as Area, a as RadarChart, P as PolarGrid, b as PolarAngleAxis, c as PolarRadiusAxis, d as Radar, B as BarChart, f as Bar, L as LineChart, g as Line } from "./_libs/recharts.mjs";
import { S as Stars, a as Sphere, O as OrbitControls, R as Ring, H as Html } from "./_libs/react-three__drei.mjs";
import { a as useFrame } from "./_libs/react-three__fiber.mjs";
import { D as DoubleSide, e as Vector3, ak as BufferGeometry, ap as LineBasicMaterial, v as AdditiveBlending, aq as Line$1 } from "./_libs/three.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/scheduler.mjs";
import "./_libs/isbot.mjs";
import "./_libs/react-three__postprocessing.mjs";
import "./_libs/postprocessing.mjs";
import "./_libs/maath.mjs";
import "./_libs/zustand.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/ai.mjs";
import "./_libs/ai-sdk__gateway.mjs";
import "./_libs/ai-sdk__provider-utils.mjs";
import "./_libs/ai-sdk__provider.mjs";
import "./_libs/eventsource-parser.mjs";
import "./_libs/zod.mjs";
import "./_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "./_libs/opentelemetry__api.mjs";
import "./_libs/framer-motion.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/its-fine.mjs";
import "./_libs/react-use-measure.mjs";
import "./_libs/ai-sdk__openai-compatible.mjs";
import "./_libs/ai-sdk__google.mjs";
import "./_libs/ai-sdk__anthropic.mjs";
import "./_libs/ai-sdk__cohere.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/babel__runtime.mjs";
import "./_libs/three-stdlib.mjs";
import "./_libs/troika-three-text.mjs";
import "./_libs/troika-worker-utils.mjs";
import "./_libs/webgl-sdf-generator.mjs";
import "./_libs/bidi-js.mjs";
import "./_libs/troika-three-utils.mjs";
import "./_libs/suspend-react.mjs";
import "./_libs/tunnel-rat.mjs";
import "./_libs/es-toolkit.mjs";
import "./_libs/clsx.mjs";
import "./_libs/reselect.mjs";
import "./_libs/react-is.mjs";
import "./_libs/tiny-invariant.mjs";
import "./_libs/d3-shape.mjs";
import "./_libs/d3-path.mjs";
import "./_libs/reduxjs__toolkit.mjs";
import "./_libs/redux.mjs";
import "./_libs/immer.mjs";
import "./_libs/redux-thunk.mjs";
import "./_libs/react-redux.mjs";
import "./_libs/victory-vendor.mjs";
import "./_libs/d3-scale.mjs";
import "./_libs/internmap.mjs";
import "./_libs/d3-array.mjs";
import "./_libs/d3-time-format.mjs";
import "./_libs/d3-time.mjs";
import "./_libs/d3-interpolate.mjs";
import "./_libs/d3-color.mjs";
import "./_libs/d3-format.mjs";
import "./_libs/decimal.js-light.mjs";
import "./_libs/eventemitter3.mjs";
function ConcentricRing({
  innerRadius,
  outerRadius,
  progress,
  // 0 to 1
  color,
  label,
  valueText,
  icon: Icon,
  index
}) {
  const bgRef = reactExports.useRef(null);
  const fgRef = reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  const thetaLength = reactExports.useMemo(() => {
    return Math.max(0.01, Math.min(0.999, progress)) * Math.PI * 2;
  }, [progress]);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (fgRef.current && bgRef.current) {
      const tilt = Math.sin(time * 0.8 + index) * 0.05;
      fgRef.current.rotation.x = -Math.PI / 2 + tilt;
      bgRef.current.rotation.x = -Math.PI / 2 + tilt;
      const scale = hovered ? 1.03 : 1;
      fgRef.current.scale.set(scale, scale, scale);
      bgRef.current.scale.set(scale, scale, scale);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Ring,
      {
        ref: bgRef,
        args: [innerRadius, outerRadius, 64],
        rotation: [-Math.PI / 2, 0, 0],
        onPointerOver: (e) => {
          e.stopPropagation();
          setHovered(true);
        },
        onPointerOut: () => setHovered(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color, transparent: true, opacity: 0.12, side: DoubleSide })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Ring,
      {
        ref: fgRef,
        args: [innerRadius, outerRadius, 64, 1, 0, thetaLength],
        rotation: [-Math.PI / 2, 0, 0],
        onPointerOver: (e) => {
          e.stopPropagation();
          setHovered(true);
        },
        onPointerOut: () => setHovered(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshPhysicalMaterial",
          {
            color,
            emissive: color,
            emissiveIntensity: hovered ? 1.5 : 0.8,
            roughness: 0.2,
            metalness: 0.8,
            side: DoubleSide,
            transparent: true,
            opacity: 0.85
          }
        )
      }
    ),
    hovered && /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { position: [0, 0, (innerRadius + outerRadius) / 2], distanceFactor: 6, center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-black/85 px-3 py-2 text-foreground backdrop-blur-md shadow-glow select-none pointer-events-none min-w-[120px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3", style: { color } }),
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", style: { color }, children: valueText }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-muted-foreground", children: [
        Math.round(progress * 100),
        "% of goal"
      ] })
    ] }) })
  ] });
}
function SkillNode({
  skill,
  value,
  index,
  total
}) {
  const meshRef = reactExports.useRef(null);
  reactExports.useRef(null);
  const [hovered, setHovered] = reactExports.useState(false);
  const pos = reactExports.useMemo(() => {
    const angle = index / total * Math.PI * 2;
    const r = 2.4;
    const y = Math.sin(index * 1.5) * 0.4;
    return new Vector3(r * Math.cos(angle), y, r * Math.sin(angle));
  }, [index, total]);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = pos.y + Math.sin(time * 1.5 + index) * 0.08;
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = time * 0.2;
      const pulse = (hovered ? 1.25 : 1) + Math.sin(time * 3 + index) * 0.04;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });
  const lineGeom = reactExports.useMemo(() => {
    const pts = [new Vector3(0, 0, 0), pos];
    return new BufferGeometry().setFromPoints(pts);
  }, [pos]);
  const lineMat = reactExports.useMemo(() => {
    return new LineBasicMaterial({
      color: hovered ? "#22d3ee" : "#475569",
      transparent: true,
      opacity: hovered ? 0.8 : 0.25,
      blending: AdditiveBlending,
      linewidth: 1
    });
  }, [hovered]);
  const lineObj = reactExports.useMemo(() => {
    return new Line$1(lineGeom, lineMat);
  }, [lineGeom, lineMat]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("primitive", { object: lineObj }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: pos, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Sphere,
        {
          ref: meshRef,
          args: [0.22, 16, 16],
          onPointerOver: (e) => {
            e.stopPropagation();
            setHovered(true);
          },
          onPointerOut: () => setHovered(false),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "meshPhysicalMaterial",
            {
              color: hovered ? "#22d3ee" : "#334155",
              emissive: hovered ? "#0891b2" : "#1e293b",
              emissiveIntensity: hovered ? 1.6 : 0.3,
              roughness: 0.1,
              metalness: 0.9,
              clearcoat: 1,
              wireframe: !hovered
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { distanceFactor: 6, position: [0, 0.4, 0], center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `pointer-events-none select-none rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest border backdrop-blur transition-all duration-300 ${hovered ? "bg-cyan-500/90 text-black border-cyan-400 scale-105 shadow-glow" : "bg-black/60 text-muted-foreground border-white/5"}`,
          children: [
            skill,
            " (",
            value,
            "%)"
          ]
        }
      ) })
    ] })
  ] });
}
function AnalyticsUniverse({
  learningHours,
  learningTarget,
  projectsCount,
  projectsTarget,
  aiInteractions,
  aiTarget,
  skills
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[360px] w-full bg-black/45 rounded-3xl border border-white/5 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: { position: [0, 2.5, 5], fov: 45 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [10, 10, 10], intensity: 1.5, color: "#c084fc" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-10, -10, -10], intensity: 0.8, color: "#06b6d4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Stars,
        {
          radius: 50,
          depth: 20,
          count: 300,
          factor: 1.5,
          saturation: 0.5,
          fade: true,
          speed: 0.4
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, -0.3, 0], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConcentricRing,
          {
            innerRadius: 1.3,
            outerRadius: 1.42,
            progress: learningHours / learningTarget,
            color: "#38bdf8",
            label: "Learning Hours",
            valueText: `${learningHours}h / ${learningTarget}h`,
            icon: Activity,
            index: 0
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConcentricRing,
          {
            innerRadius: 1.05,
            outerRadius: 1.17,
            progress: projectsCount / projectsTarget,
            color: "#c084fc",
            label: "Projects Created",
            valueText: `${projectsCount} / ${projectsTarget}`,
            icon: Target,
            index: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConcentricRing,
          {
            innerRadius: 0.8,
            outerRadius: 0.92,
            progress: aiInteractions / aiTarget,
            color: "#ec4899",
            label: "AI Interactions",
            valueText: `${aiInteractions} / ${aiTarget}`,
            icon: Zap,
            index: 2
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sphere, { args: [0.3, 32, 32], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meshPhysicalMaterial",
          {
            color: "#a78bfa",
            emissive: "#7c3aed",
            emissiveIntensity: 1.2,
            roughness: 0.1,
            metalness: 0.9,
            clearcoat: 1
          }
        ) }),
        skills.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkillNode,
          {
            skill: s.skill,
            value: s.value,
            index: idx,
            total: skills.length
          },
          s.skill
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OrbitControls,
        {
          enableZoom: true,
          maxDistance: 8,
          minDistance: 3,
          maxPolarAngle: Math.PI / 1.8,
          minPolarAngle: Math.PI / 4
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute bottom-4 left-4 z-10 text-[9px] uppercase tracking-wider text-muted-foreground font-semibold bg-black/55 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#38bdf8]" }),
        " Hours"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#c084fc]" }),
        " Projects"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[#ec4899]" }),
        " AI"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3 w-3 text-cyan-400" }),
        " Hover Skills"
      ] })
    ] })
  ] });
}
function AnalyticsPage() {
  const {
    user
  } = useAuth();
  const [projects, setProjects] = reactExports.useState([]);
  const [threadCount, setThreadCount] = reactExports.useState(0);
  const [msgCount, setMsgCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const [{
        data: p
      }, {
        count: tc
      }, {
        count: mc
      }] = await Promise.all([supabase.from("projects").select("domains, created_at, difficulty"), supabase.from("chat_threads").select("*", {
        count: "exact",
        head: true
      }), supabase.from("chat_messages").select("*", {
        count: "exact",
        head: true
      })]);
      setProjects(p ?? []);
      setThreadCount(tc ?? 0);
      setMsgCount(mc ?? 0);
    })();
  }, [user]);
  const now = Date.now();
  const days = Array.from({
    length: 14
  }, (_, i) => {
    const d = new Date(now - (13 - i) * 864e5);
    const key = d.toISOString().slice(0, 10);
    const projectsThatDay = projects.filter((p) => p.created_at.startsWith(key)).length;
    const seed = key.split("-").reduce((acc, part) => acc + parseInt(part, 10), 0);
    const stableHoursExtra = (seed * 9301 + 49297) % 233280 / 233280;
    const stableAiExtra = (seed * 1664525 + 1013904223) % 2147483648 / 2147483648;
    return {
      day: d.toLocaleDateString(void 0, {
        weekday: "short"
      }),
      projects: projectsThatDay,
      hours: +(projectsThatDay * 1.5 + stableHoursExtra * 2).toFixed(1),
      ai: Math.round(projectsThatDay * 4 + stableAiExtra * 6)
    };
  });
  const domainAgg = {};
  projects.forEach((p) => {
    const arr = Array.isArray(p.domains) ? p.domains : [];
    arr.forEach((d) => {
      domainAgg[d] = (domainAgg[d] ?? 0) + 1;
    });
  });
  const domainData = Object.entries(domainAgg).map(([name, count]) => ({
    name,
    count
  }));
  const skillRadar = [{
    skill: "Frontend",
    value: Math.min(100, projects.length * 12 + 30)
  }, {
    skill: "Backend",
    value: Math.min(100, projects.length * 10 + 25)
  }, {
    skill: "AI/ML",
    value: Math.min(100, (domainAgg["AI/ML"] ?? 0) * 25 + 20)
  }, {
    skill: "DevOps",
    value: Math.min(100, projects.length * 8 + 15)
  }, {
    skill: "Design",
    value: Math.min(100, projects.length * 9 + 30)
  }, {
    skill: "Data",
    value: Math.min(100, (domainAgg["Data Science"] ?? 0) * 25 + 20)
  }];
  const totalHours = days.reduce((a, d) => a + d.hours, 0);
  const totalAI = days.reduce((a, d) => a + d.ai, 0);
  const avgPerDay = (totalHours / 14).toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: ChartColumn, title: "Analytics", description: "Track learning velocity, project momentum, and skill growth." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Activity, label: "Learning hours", value: `${totalHours.toFixed(1)}h`, sub: "Last 14 days" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: TrendingUp, label: "Avg / day", value: `${avgPerDay}h`, sub: "Daily streak rhythm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Target, label: "Projects", value: projects.length, sub: `${threadCount} chat threads` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Zap, label: "AI interactions", value: totalAI + msgCount, sub: "Messages + tools" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Interactive 3D Analytics & Skill Tree Space" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsUniverse, { learningHours: +totalHours.toFixed(1), learningTarget: 40, projectsCount: projects.length, projectsTarget: 10, aiInteractions: totalAI + msgCount, aiTarget: 200, skills: skillRadar })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Weekly learning hours", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: days, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--spark)", stopOpacity: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--spark)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "hours", stroke: "var(--spark)", strokeWidth: 2, fill: "url(#g1)" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Skill mastery", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: skillRadar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "var(--border)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "skill", tick: {
          fill: "var(--muted-foreground)",
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarRadiusAxis, { stroke: "var(--border)", tick: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { dataKey: "value", stroke: "var(--spark)", fill: "var(--spark)", fillOpacity: 0.35 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Project domains", children: domainData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { msg: "Generate projects to see domain mix" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: domainData, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 10, angle: -20, textAnchor: "end", height: 50 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, allowDecimals: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", fill: "var(--spark)", radius: [6, 6, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "AI interactions", className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: days, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          fontSize: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "ai", stroke: "var(--aurora)", strokeWidth: 2, dot: {
          r: 3
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "projects", stroke: "var(--spark)", strokeWidth: 2, dot: {
          r: 3
        } })
      ] }) }) })
    ] })
  ] });
}
function KpiCard({
  icon: Icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-spark" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-2xl font-semibold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] text-muted-foreground/70", children: sub })
  ] });
}
function Panel({
  title,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border bg-card/60 p-5 backdrop-blur ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground", children: title }),
    children
  ] });
}
function Empty({
  msg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[200px] items-center justify-center text-xs text-muted-foreground", children: msg });
}
export {
  AnalyticsPage as component
};
