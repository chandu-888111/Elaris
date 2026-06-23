import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useServerFn } from "./_ssr/ai-BioNg-KZ.mjs";
import { g as generateStudyGuide } from "./_ssr/ai.functions-CiGO9ibj.mjs";
import { u as useAuth, R as Route$t, d as PageShell, e as PageHeader, H as HolographicPanel, f as awardXP, X as XP, g as unlockAchievement } from "./_ssr/router-DtXO_wcb.mjs";
import { S as SaveBar } from "./_ssr/SaveBar-BGWbeuEr.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { G as GraduationCap, L as LoaderCircle, v as BookOpen, C as Cpu, ai as FlaskConical, g as Brain } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__react-router.mjs";
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
const LibraryCanvas = reactExports.lazy(() => import("./_ssr/LibraryCanvas-DLPYAyJP.mjs"));
const StudyGuideUniverse = reactExports.lazy(() => import("./_ssr/StudyGuideUniverse-DkAG99ww.mjs").then((m) => ({
  default: m.StudyGuideUniverse
})));
const DOMAINS = ["Web Dev", "AI/ML", "Data Science", "Mobile", "Cybersecurity", "Cloud", "DevOps", "Blockchain"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
function StudyPage() {
  const generate = useServerFn(generateStudyGuide);
  const {
    user
  } = useAuth();
  const {
    node,
    restoreId
  } = Route$t.useSearch();
  const [domain, setDomain] = reactExports.useState(DOMAINS[0]);
  const [skillLevel, setSkillLevel] = reactExports.useState("Beginner");
  const [goal, setGoal] = reactExports.useState("Land first dev job");
  const [dailyMinutes, setDailyMinutes] = reactExports.useState(60);
  const [loading, setLoading] = reactExports.useState(false);
  const [guide, setGuide] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState(null);
  const [completed, setCompleted] = reactExports.useState({});
  const [bookmarks, setBookmarks] = reactExports.useState({});
  const [viewMode, setViewMode] = reactExports.useState("3d");
  reactExports.useEffect(() => {
    if (node) {
      const [domainSlug, nodeId] = node.split(":");
      const cleanTopic = nodeId ? nodeId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : node;
      setDomain(cleanTopic);
      const cleanGoal = `Learn ${cleanTopic} inside ${domainSlug}`;
      setGoal(cleanGoal);
      setLoading(true);
      setErr(null);
      setGuide(null);
      generate({
        data: {
          domain: cleanTopic,
          skillLevel,
          goal: cleanGoal,
          dailyMinutes
        }
      }).then((res) => setGuide(res)).catch((e) => setErr(e instanceof Error ? e.message : "Failed")).finally(() => setLoading(false));
    }
  }, [node]);
  reactExports.useEffect(() => {
    if (restoreId && user) {
      const loadSavedGuide = async () => {
        setLoading(true);
        setErr(null);
        try {
          const {
            data,
            error
          } = await supabase.from("study_guides").select("id, created_at, domain, skill_level, goal, daily_minutes, content").eq("id", restoreId).single();
          if (error) throw error;
          if (data) {
            setDomain(data.domain);
            setSkillLevel(data.skill_level);
            setGoal(data.goal);
            setDailyMinutes(data.daily_minutes);
            setGuide(data.content);
            setCompleted({});
            setBookmarks({});
          }
        } catch (e) {
          setErr(e instanceof Error ? e.message : "Failed to load study guide");
        } finally {
          setLoading(false);
        }
      };
      loadSavedGuide();
    }
  }, [restoreId, user]);
  const onGen = async () => {
    setLoading(true);
    setErr(null);
    setGuide(null);
    try {
      setGuide(await generate({
        data: {
          domain,
          skillLevel,
          goal,
          dailyMinutes
        }
      }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };
  const onSave = async () => {
    if (!user || !guide) return;
    const {
      error
    } = await supabase.from("study_guides").insert({
      user_id: user.id,
      domain,
      skill_level: skillLevel,
      goal,
      daily_minutes: dailyMinutes,
      content: guide
    });
    if (error) {
      toast.error("Save failed");
      return;
    }
    await awardXP(XP.SAVE_STUDY, "Saved study guide");
    await unlockAchievement({
      code: "save-study",
      title: "Focused Learner",
      description: "Create and save a weekly study guide.",
      icon: "GraduationCap",
      xp: 50
    });
  };
  const totalTasks = guide?.modules.reduce((a, m) => a + m.practice.length + m.test.length + 1, 0) ?? 0;
  const doneTasks = Object.values(completed).filter(Boolean).length;
  const xp = doneTasks * 25;
  const streak = Math.min(doneTasks, 30);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { className: "p-0 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#01030a]" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryCanvas, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: GraduationCap, title: "AI Study Guide", description: "A personalised, week-by-week curriculum with tasks, resources, projects and quizzes.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { canSave: !!guide, onSave, pickerTable: "study_guides", pickerSelect: "id, created_at, domain, skill_level, goal, daily_minutes, content", pickerToRow: (r) => ({
        id: r.id,
        label: r.domain,
        meta: `${r.skill_level} · ${r.goal}`
      }), pickerOnPick: (r) => {
        setDomain(r.domain);
        setSkillLevel(r.skill_level);
        setGoal(r.goal);
        setDailyMinutes(r.daily_minutes);
        setGuide(r.content);
        setCompleted({});
        setBookmarks({});
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[360px_1fr] max-w-7xl mx-auto pb-12 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md self-start sticky top-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Domain", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: domain, setValue: setDomain, options: DOMAINS }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Skill level", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: skillLevel, setValue: setSkillLevel, options: LEVELS }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your goal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: goal, onChange: (e) => setGoal(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `Daily time: ${dailyMinutes} min`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 15, max: 240, step: 15, value: dailyMinutes, onChange: (e) => setDailyMinutes(+e.target.value), className: "w-full accent-spark" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGen, disabled: loading, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }),
            loading ? "Generating…" : "Generate study guide"
          ] }),
          err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: err }),
          guide && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "XP", value: xp }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Streak", value: `${streak}d` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MiniStat, { label: "Done", value: `${doneTasks}/${totalTasks}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] space-y-4 relative", children: [
          guide && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-0 z-10 flex rounded-xl border border-white/5 bg-black/55 p-1 backdrop-blur", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("3d"), className: `rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors ${viewMode === "3d" ? "bg-gradient-spark text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: "3D Universe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewMode("2d"), className: `rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors ${viewMode === "2d" ? "bg-gradient-spark text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`, children: "2D List" })
          ] }),
          !guide && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "mb-3 h-8 w-8 text-spark animate-float" }),
            "Pick your goal — get a complete curriculum."
          ] }),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
            length: 4
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 animate-pulse rounded-2xl bg-muted/30" }, i)) }),
          guide && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: viewMode === "3d" ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[400px] items-center justify-center rounded-2xl border border-white/10 bg-black/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full border-2 border-spark border-t-transparent animate-spin" }) }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudyGuideUniverse, { guide, completed, onToggleComplete: (k) => setCompleted((c) => ({
            ...c,
            [k]: !c[k]
          })), bookmarks, onToggleBookmark: (k) => setBookmarks((b) => ({
            ...b,
            [k]: !b[k]
          })) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-spark", children: "Data Core" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-white mt-1", children: guide.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/60 leading-relaxed", children: guide.summary })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: guide.modules.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between border-b border-white/10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-xl text-white", children: [
                "Module ",
                idx + 1,
                " — ",
                m.title
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-spark mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3 w-3" }),
                    " Learn"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70 leading-relaxed whitespace-pre-wrap", children: m.learn })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-aurora mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3 w-3" }),
                    " Visualize"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "bg-black/50 border border-white/5 rounded-xl p-4 text-xs font-mono text-white/60 overflow-x-auto", children: m.visualize })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3 w-3" }),
                    " Practice"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: m.practice.map((t, i) => {
                    const k = `prac-${m.id}-${i}`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCompleted((c) => ({
                        ...c,
                        [k]: !c[k]
                      })), className: `mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${completed[k] ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/20"}`, children: completed[k] && "✓" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-1 ${completed[k] ? "text-white/30 line-through" : "text-white/80"}`, children: t })
                    ] }, i);
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2", children: [
                    "Build: ",
                    m.build.title
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70 mb-3", children: m.build.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCompleted((c) => ({
                    ...c,
                    [`build-${m.id}`]: !c[`build-${m.id}`]
                  })), className: `text-xs px-3 py-1.5 rounded-lg border ${completed[`build-${m.id}`] ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-transparent border-white/20 text-white/60"}`, children: completed[`build-${m.id}`] ? "Completed Project" : "Mark as Built" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3 w-3" }),
                    " Test Knowledge"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: m.test.map((t, i) => {
                    const k = `test-${m.id}-${i}`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/30 rounded-xl p-4 border border-white/5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white mb-3", children: t.question }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: t.options.map((opt, oIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                        if (opt === t.answer) {
                          setCompleted((c) => ({
                            ...c,
                            [k]: true
                          }));
                          toast.success("Correct answer!");
                        } else {
                          toast.error("Incorrect, try again.");
                        }
                      }, className: `text-left text-xs p-2.5 rounded-lg border transition-colors ${completed[k] && opt === t.answer ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"}`, children: opt }, oIdx)) })
                    ] }, i);
                  }) })
                ] })
              ] })
            ] }, m.id)) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    children
  ] });
}
function Pills({
  value,
  setValue,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setValue(o), className: `rounded-full border px-3 py-1 text-xs ${value === o ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: o }, o)) });
}
function MiniStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/40 p-2 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground", children: label })
  ] });
}
export {
  StudyPage as component
};
