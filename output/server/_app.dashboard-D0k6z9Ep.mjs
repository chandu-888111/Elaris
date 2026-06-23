import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth, k as getPlanetForXP, l as PLANETARY_LEVELS, d as PageShell, S as SharedCanvas, a as playHover, p as playClick, H as HolographicPanel } from "./_ssr/router-DtXO_wcb.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-BioNg-KZ.mjs";
import "./_libs/seroval.mjs";
import { m as motion } from "./_libs/framer-motion.mjs";
import { aA as Radar, F as Flame, J as Trophy, aB as BrainCircuit, a7 as Compass, B as Briefcase, a5 as ArrowRight, aC as Map, aD as Bot, v as BookOpen, ag as Target } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/react-three__fiber.mjs";
import "./_libs/three.mjs";
import "./_libs/zustand.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/its-fine.mjs";
import "./_libs/react-use-measure.mjs";
import "./_libs/react-three__postprocessing.mjs";
import "./_libs/postprocessing.mjs";
import "./_libs/maath.mjs";
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
import "./_libs/react-three__drei.mjs";
import "./_libs/babel__runtime.mjs";
import "./_libs/three-stdlib.mjs";
import "./_libs/troika-three-text.mjs";
import "./_libs/troika-worker-utils.mjs";
import "./_libs/webgl-sdf-generator.mjs";
import "./_libs/bidi-js.mjs";
import "./_libs/troika-three-utils.mjs";
import "./_libs/suspend-react.mjs";
import "./_libs/tunnel-rat.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
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
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
const UniverseMap = reactExports.lazy(() => import("./_ssr/UniverseMapCanvas-BlaOKYqM.mjs"));
function Dashboard() {
  const {
    user
  } = useAuth();
  const [stats, setStats] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const [{
        count: projects
      }, {
        count: saved
      }, {
        count: threads
      }, {
        data: profile
      }, {
        data: recent
      }, {
        data: achievementsData
      }] = await Promise.all([supabase.from("projects").select("*", {
        count: "exact",
        head: true
      }), supabase.from("projects").select("*", {
        count: "exact",
        head: true
      }).eq("bookmarked", true), supabase.from("chat_threads").select("*", {
        count: "exact",
        head: true
      }), supabase.from("profiles").select("xp, streak_days").eq("id", user.id).maybeSingle(), supabase.from("projects").select("id, title, created_at").order("created_at", {
        ascending: false
      }).limit(3), supabase.from("achievements").select("code").eq("user_id", user.id)]);
      setStats({
        projects: projects ?? 0,
        saved: saved ?? 0,
        threads: threads ?? 0,
        xp: profile?.xp ?? 0,
        streak: profile?.streak_days ?? 0,
        recent: recent ?? [],
        achievements: (achievementsData ?? []).map((a) => ({
          title: a.code
        }))
      });
    })();
  }, [user]);
  const {
    current,
    next
  } = stats ? getPlanetForXP(stats.xp) : {
    current: PLANETARY_LEVELS[0],
    next: PLANETARY_LEVELS[1]
  };
  const progressPct = stats ? Math.max(0, Math.min(100, Math.round((stats.xp - current.xp) / (next.xp - current.xp) * 100))) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { className: "p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[#02000a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SharedCanvas, { camera: {
      position: [0, 2, 8],
      fov: 45
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UniverseMap,
      {
        xp: stats?.xp || 0,
        projects: stats?.projects || 0,
        achievements: stats?.achievements || [],
        skills: 4
      }
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-bold text-white flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "h-6 w-6 text-spark" }),
            "Mission Control Center"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 text-sm mt-1 uppercase tracking-widest font-mono", children: [
            "Commander: ",
            user?.email?.split("@")[0] || "Guest"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/generator", onClick: playClick, onMouseEnter: playHover, className: "glass rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]", children: "Launch Project" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_350px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold tracking-[0.2em] uppercase text-spark mb-1", children: "Current Coordinates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-bold text-white", children: current.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-white/50", children: current.type })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold font-mono text-emerald-400", children: [
                  stats?.xp || 0,
                  " XP"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-white/40", children: "Total Experience" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] uppercase font-bold text-white/50 mb-2 font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  current.xp,
                  " XP"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white", children: [
                  "Next: ",
                  next.name,
                  " (",
                  next.xp,
                  " XP)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/5 rounded-full overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                width: 0
              }, animate: {
                width: `${progressPct}%`
              }, transition: {
                duration: 1.5,
                ease: "easeOut"
              }, className: "h-full bg-gradient-to-r from-spark to-aurora" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-orange-500 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold text-white", children: stats?.streak || 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1", children: "Day Streak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 text-amber-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-display font-bold text-white", children: stats?.achievements.length || 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1", children: "Constellations Unlocked" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "h-4 w-4 text-spark" }),
              " AI Flight Recommendations"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 border border-white/5 flex gap-3 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-spark/20 text-spark mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white", children: "Continue Roadmap" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/60 mt-1", children: "You are 80% through the React track. Next node: Advanced Hooks." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-3 border border-white/5 flex gap-3 items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-aurora/20 text-aurora mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-white", children: "Interview Readiness" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/60 mt-1", children: "Your ATS score is 85/100. Time to attempt a mock interview session." })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4", children: "Orbiting Projects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              stats?.recent.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: p.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3 text-white/30" })
              ] }, p.id)),
              (!stats?.recent || stats.recent.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30 text-center py-4", children: "No projects launched yet." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4", children: "Space Stations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/roadmap", className: "glass rounded-xl p-4 text-center border border-white/5 hover:border-spark/50 transition flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-5 w-5 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white", children: "Galaxy Map" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/mentor", className: "glass rounded-xl p-4 text-center border border-white/5 hover:border-aurora/50 transition flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-5 w-5 text-aurora" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white", children: "AI Mentor" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/study-guide", className: "glass rounded-xl p-4 text-center border border-white/5 hover:border-emerald-500/50 transition flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5 text-emerald-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white", children: "Library" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/job-prep", className: "glass rounded-xl p-4 text-center border border-white/5 hover:border-orange-500/50 transition flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-5 w-5 text-orange-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white", children: "Simulations" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
