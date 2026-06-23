import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate, L as Link } from "./_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./_ssr/ai-BioNg-KZ.mjs";
import { a as generateCustomRoadmap } from "./_ssr/roadmap.functions-BEray9Nm.mjs";
import { a as DOMAINS } from "./_ssr/domains-NgPH8Jrf.mjs";
import { u as useAuth, d as PageShell, e as PageHeader, f as awardXP, X as XP, g as unlockAchievement } from "./_ssr/router-DtXO_wcb.mjs";
import { S as SaveBar } from "./_ssr/SaveBar-BGWbeuEr.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/auth-middleware-IU1Y2FXs.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { a7 as Compass, L as LoaderCircle, h as Sparkles, a3 as ChevronDown, aP as Calendar, a0 as CircleCheckBig, ag as Target, v as BookOpen } from "./_libs/lucide-react.mjs";
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
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
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
const ROLES_SUGGESTIONS = ["AI Engineer", "Full Stack Developer", "DevOps Engineer", "Cybersecurity Analyst", "Data Scientist", "UI/UX Designer"];
const TIMEFRAMES = ["3 months", "6 months", "9 months", "12 months"];
const LEVELS = ["Absolute beginner", "Some basics", "Intermediate", "Advanced"];
function RoadmapIndexPage() {
  const navigate = useNavigate();
  const generate = useServerFn(generateCustomRoadmap);
  const {
    user
  } = useAuth();
  const [goal, setGoal] = reactExports.useState("");
  const [timeframe, setTimeframe] = reactExports.useState("6 months");
  const [level, setLevel] = reactExports.useState("Some basics");
  const [loading, setLoading] = reactExports.useState(false);
  const [customData, setCustomData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [openWeek, setOpenWeek] = reactExports.useState(1);
  const popularDomains = DOMAINS.filter((d) => ["react", "nextjs", "python", "machine-learning", "generative-ai", "aws", "devops", "cybersecurity", "dsa", "system-design", "flutter", "ui-ux"].includes(d.slug)).slice(0, 6);
  const onGen = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setError(null);
    setCustomData(null);
    try {
      const res = await generate({
        data: {
          goal,
          timeframe,
          level
        }
      });
      setCustomData(res);
      setOpenWeek(1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };
  const onSave = async () => {
    if (!user || !customData) return;
    const contentPayload = customData;
    const {
      error: error2
    } = await supabase.from("roadmaps").insert({
      user_id: user.id,
      target_role: goal,
      timeframe,
      experience_level: level,
      content: contentPayload
    });
    if (error2) {
      toast.error("Save failed");
      return;
    }
    await awardXP(XP.SAVE_ROADMAP, "Saved custom roadmap");
    await unlockAchievement({
      code: "save-roadmap",
      title: "Curriculum Architect",
      description: "Design and save a custom career roadmap.",
      icon: "Compass",
      xp: 50
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Compass, title: "AI Roadmap Planner", description: "Build highly customized, week-by-week career roadmaps or explore flagship curriculum tracks.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { canSave: !!customData, onSave, pickerTable: "roadmaps", pickerSelect: "id, created_at, target_role, timeframe, experience_level, content", pickerToRow: (r) => ({
      id: r.id,
      label: r.target_role,
      meta: `${r.timeframe} · ${r.experience_level}`
    }), pickerOnPick: (r) => {
      setGoal(r.target_role);
      setTimeframe(r.timeframe);
      setLevel(r.experience_level);
      setCustomData(r.content);
      setOpenWeek(1);
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[360px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold uppercase tracking-wider text-spark", children: "Custom Path Builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "What is your learning goal?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: goal, onChange: (e) => setGoal(e.target.value), placeholder: "e.g. Become AI Engineer", className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: ROLES_SUGGESTIONS.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setGoal(role), className: "rounded-lg bg-white/5 border border-white/5 px-2 py-0.5 text-[9px] text-muted-foreground hover:bg-white/10 hover:text-foreground", children: role }, role)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Target Timeframe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: TIMEFRAMES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTimeframe(t), className: `rounded-full border px-3 py-1 text-xs transition ${timeframe === t ? "border-spark bg-spark/15 text-foreground font-semibold" : "border-border text-muted-foreground hover:text-foreground"}`, children: t }, t)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Current Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLevel(l), className: `rounded-full border px-3 py-1 text-xs transition ${level === l ? "border-spark bg-spark/15 text-foreground font-semibold" : "border-border text-muted-foreground hover:text-foreground"}`, children: l }, l)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGen, disabled: loading || !goal.trim(), className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 disabled:opacity-50", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          loading ? "Generating path..." : "Generate AI Roadmap"
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 mt-2", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] space-y-8", children: [
        !customData && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-dashed border-border bg-card/45 p-8 text-center text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "mx-auto h-8 w-8 text-spark animate-float mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-semibold text-foreground", children: "AI Custom Curriculum Generator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs leading-relaxed max-w-md mx-auto", children: 'Describe any technical goal (e.g. "React microfrontends") and timeframe. AI will lay out a week-by-week syllabus.' })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground mb-4", children: "Or Explore Flagship Learning Tracks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: popularDomains.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/roadmap/$slug", params: {
              slug: d.slug
            }, className: "group flex items-center justify-between rounded-2xl border border-white/5 bg-card/60 p-4 transition-all hover:border-spark/40 hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-sm font-semibold text-foreground group-hover:text-gradient", children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 block", children: d.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-white/5 p-1.5 text-muted-foreground group-hover:bg-white/10 group-hover:text-spark transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4" }) })
            ] }, d.slug)) })
          ] })
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-2xl bg-muted/30" }, i)) }),
        customData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-card/85 to-card/30 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-spark", children: "Custom Plan for" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold mt-1", children: customData.goal }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: [
              "Weekly schedule generated for starting level:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: level }),
              " and target timeframe: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: timeframe }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: customData.weeks.map((w, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card/65", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenWeek(openWeek === w.week ? null : w.week), className: "flex w-full items-center justify-between px-5 py-4 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid h-7 w-7 place-items-center rounded-lg bg-spark/15 text-xs font-bold text-spark", children: [
                  "W",
                  w.week
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: w.theme }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                    "Milestone: ",
                    w.milestone
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 text-muted-foreground transition ${openWeek === w.week ? "rotate-180 text-foreground" : ""}` })
            ] }),
            openWeek === w.week && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/5 bg-background/25 p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                  " Daily Activities"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-xs text-muted-foreground", children: w.daily.map((dayItem, dIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-spark shrink-0", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dayItem })
                ] }, dIdx)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3 flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-emerald-400 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-[10px] uppercase font-bold text-emerald-400", children: "Week Milestone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: w.milestone })
                ] })
              ] }),
              w.project && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/5 bg-white/5 p-3 flex items-start gap-2 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-spark shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-[10px] uppercase font-bold text-spark", children: "Weekly Project" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: w.project })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
                  to: "/builder",
                  search: {
                    seed: w.project
                  }
                }), className: "rounded-lg bg-white/5 px-2.5 py-1 text-[10px] text-foreground hover:bg-white/10", children: "Build" })
              ] })
            ] })
          ] }, w.week)) }),
          customData.resources && customData.resources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-card/60 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-spark" }),
              " Curated Resources"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-white/5", children: customData.resources.map((res, rIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-2.5 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-muted-foreground", children: res.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: res.url, target: "_blank", rel: "noreferrer", className: "text-spark font-semibold hover:underline", children: "View Resource" })
            ] }, rIdx)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  RoadmapIndexPage as component
};
