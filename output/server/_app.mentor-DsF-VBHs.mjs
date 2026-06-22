import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useServerFn } from "./_ssr/ai-DTqZfz-A.mjs";
import { a as generateMentorPlan } from "./_ssr/ai.functions-ClHaPUvy.mjs";
import { u as useAuth, j as Route$i, d as PageShell, H as HolographicPanel, f as awardXP, X as XP } from "./_ssr/router-DT2A3-T4.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as SaveBar } from "./_ssr/SaveBar-BGWbeuEr.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { g as Brain, M as MessageSquare, L as LoaderCircle, ag as Target, Y as CircleCheck, av as Lightbulb, h as Sparkles } from "./_libs/lucide-react.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
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
import "./_libs/framer-motion.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
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
import "./_ssr/SessionPicker-CrpRw6VW.mjs";
const MentorChamberCanvas = reactExports.lazy(() => import("./_ssr/MentorChamberCanvas-KjKK_hBI.mjs"));
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
function MentorPage() {
  const generate = useServerFn(generateMentorPlan);
  const {
    user
  } = useAuth();
  const {
    node,
    restoreId
  } = Route$i.useSearch();
  const [topic, setTopic] = reactExports.useState("");
  const [level, setLevel] = reactExports.useState("Beginner");
  const [goal, setGoal] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [plan, setPlan] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState(null);
  const [done, setDone] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (restoreId && user) {
      const loadSaved = async () => {
        const {
          data,
          error
        } = await supabase.from("mentor_plans").select("*").eq("id", restoreId).single();
        if (!error && data) {
          setTopic(data.topic);
          setLevel(data.level);
          setGoal(data.goal ?? "");
          setPlan(data.plan);
          setDone({});
          toast.success("Loaded saved lesson plan!");
        }
      };
      loadSaved();
    }
  }, [restoreId, user]);
  reactExports.useEffect(() => {
    if (node) {
      const [domainSlug, nodeId] = node.split(":");
      const cleanTopic = nodeId ? nodeId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : node;
      setTopic(cleanTopic);
      const cleanGoal = `Master ${cleanTopic} inside ${domainSlug}`;
      setGoal(cleanGoal);
      setLoading(true);
      setErr(null);
      setPlan(null);
      generate({
        data: {
          topic: cleanTopic,
          level,
          goal: cleanGoal
        }
      }).then((res) => setPlan(res)).catch((e) => setErr(e instanceof Error ? e.message : "Failed")).finally(() => setLoading(false));
    }
  }, [node]);
  const onGen = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setErr(null);
    setPlan(null);
    try {
      setPlan(await generate({
        data: {
          topic,
          level,
          goal: goal || `Learn ${topic}`
        }
      }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };
  const onSave = async () => {
    if (!user || !plan) return;
    const {
      error
    } = await supabase.from("mentor_plans").insert({
      user_id: user.id,
      topic,
      level,
      goal: goal || null,
      plan
    });
    if (!error) await awardXP(XP.SAVE_MENTOR, "Saved mentor plan");
  };
  const SUGGESTIONS = ["React Hooks", "System Design", "TypeScript Generics", "Machine Learning", "Docker"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { className: "p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#02000a]" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MentorChamberCanvas, { isTyping: loading }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-bold text-white flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-6 w-6 text-spark" }),
            "Holographic Mentor Chamber"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mt-1 uppercase tracking-widest font-mono", children: "A.I. Tutor Array: Online" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/chat", className: "glass rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition border border-white/10 flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3 w-3" }),
            " Connect Chat"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { canSave: !!plan, onSave, pickerTable: "mentor_plans", pickerSelect: "id, created_at, topic, level, goal, plan", pickerToRow: (r) => ({
            id: r.id,
            label: r.topic,
            meta: `${r.level}`
          }), pickerOnPick: (r) => {
            setTopic(r.topic);
            setLevel(r.level);
            setGoal(r.goal ?? "");
            setPlan(r.plan);
            setDone({});
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "space-y-6 p-6 bg-black/40 backdrop-blur-md border-white/10 rounded-3xl self-start sticky top-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark", children: "Subject Target" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: topic, onChange: (e) => setTopic(e.target.value), placeholder: "Initialize learning parameter...", className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-spark focus:ring-1 focus:ring-spark outline-none transition" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark", children: "Cognitive Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLevel(l), className: `rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${level === l ? "border-spark bg-spark/20 text-spark" : "border-white/10 text-white/40 hover:bg-white/5"}`, children: l }, l)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark", children: "Objective (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: goal, onChange: (e) => setGoal(e.target.value), placeholder: "Define end-state...", className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-spark focus:ring-1 focus:ring-spark outline-none transition" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGen, disabled: loading || !topic.trim(), className: "w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-spark to-aurora p-[1px] disabled:opacity-50 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-spark to-aurora opacity-0 group-hover:opacity-100 transition-opacity blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center gap-2 rounded-xl bg-black/50 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md", children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-spark" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-spark" }),
              loading ? "Synthesizing..." : "Initiate Protocol"
            ] })
          ] }),
          err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 font-mono", children: err }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30", children: "Suggested Parameters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setTopic(s);
              onGen();
            }, className: "rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/50 hover:bg-white/10 hover:text-white transition cursor-pointer", children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[500px] space-y-6", children: [
          !plan && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-[500px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-spark animate-pulse uppercase tracking-widest", children: "Awaiting Input Parameters..." }) }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({
            length: 4
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { className: "h-24 bg-black/40 border-white/10 rounded-3xl animate-pulse" }, i)) }),
          plan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border-white/10 rounded-3xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-spark mb-1", children: "Synthesized Pathway" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-white", children: plan.topic })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-full border border-spark/30 bg-spark/10 px-4 py-2 text-xs font-mono text-spark", children: [
                  "ETA: ",
                  plan.estimatedHours,
                  "h"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: plan.overview }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-aurora" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-white", children: "Prerequisites" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: plan.prerequisites.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-mono text-white/60", children: p }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold uppercase tracking-widest text-white/50 ml-2", children: "Learning Modules" }),
              plan.concepts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HolographicPanel, { className: `p-6 border-white/10 rounded-3xl transition-all duration-300 ${done[i] ? "bg-black/60 opacity-50" : "bg-black/40 backdrop-blur-md hover:bg-white/5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDone((d) => ({
                  ...d,
                  [i]: !d[i]
                })), className: `mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${done[i] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-white/20 hover:border-spark text-white/50"}`, children: done[i] ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold", children: i + 1 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `text-lg font-bold ${done[i] ? "line-through text-white/30" : "text-white"}`, children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-sm leading-relaxed ${done[i] ? "text-white/20" : "text-white/60"}`, children: c.explanation }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: `mt-4 w-full max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs leading-relaxed ${done[i] ? "text-white/20" : "text-emerald-400/80"}`, children: c.example })
                ] })
              ] }) }, i))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border-white/10 rounded-3xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-spark" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-white", children: "Practice Vectors" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: plan.practiceTasks.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-white/60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark" }),
                  " ",
                  t
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-6 bg-black/40 backdrop-blur-md border-white/10 rounded-3xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-aurora" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-white", children: "Next Ascension" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: plan.nextSteps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-white/60", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora" }),
                  " ",
                  s
                ] }, i)) })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  MentorPage as component
};
