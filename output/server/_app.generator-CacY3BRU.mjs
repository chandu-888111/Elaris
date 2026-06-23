import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./_ssr/ai-BioNg-KZ.mjs";
import { b as generateProjectIdea } from "./_ssr/ai.functions-CiGO9ibj.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { u as useAuth, d as PageShell, e as PageHeader, g as unlockAchievement } from "./_ssr/router-DtXO_wcb.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_libs/sonner.mjs";
import { h as Sparkles, L as LoaderCircle, aw as BookmarkCheck, f as Bookmark, ax as Hammer, J as Trophy, R as Rocket, N as Network, C as Cpu, ay as Wrench, az as CalendarDays } from "./_libs/lucide-react.mjs";
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
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
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
import "./_libs/ai-sdk__openai-compatible.mjs";
import "./_libs/ai-sdk__google.mjs";
import "./_libs/ai-sdk__anthropic.mjs";
import "./_libs/ai-sdk__cohere.mjs";
const DOMAINS = ["AI/ML", "Web", "Mobile", "IoT", "Blockchain", "AR/VR", "Cybersecurity", "Data Science", "DevOps", "Robotics"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const TYPES = ["Mini Project", "Major Project", "Research", "Hackathon"];
const DURATIONS = ["1 week", "2-4 weeks", "1-2 months", "3+ months"];
const TEAMS = ["Solo", "2-3", "4-6", "7+"];
function GeneratorPage() {
  const {
    user
  } = useAuth();
  const generate = useServerFn(generateProjectIdea);
  const [domains, setDomains] = reactExports.useState(["AI/ML"]);
  const [difficulty, setDifficulty] = reactExports.useState("Intermediate");
  const [projectType, setProjectType] = reactExports.useState("Major Project");
  const [duration, setDuration] = reactExports.useState("1-2 months");
  const [teamSize, setTeamSize] = reactExports.useState("Solo");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [idea, setIdea] = reactExports.useState(null);
  const [savedId, setSavedId] = reactExports.useState(null);
  const toggleDomain = (d) => setDomains((arr) => arr.includes(d) ? arr.filter((x) => x !== d) : [...arr, d]);
  const onGenerate = async () => {
    setLoading(true);
    setError(null);
    setIdea(null);
    setSavedId(null);
    try {
      const result = await generate({
        data: {
          domains,
          difficulty,
          projectType,
          duration,
          teamSize
        }
      });
      setIdea(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate idea");
    } finally {
      setLoading(false);
    }
  };
  const onSave = async (bookmark) => {
    if (!idea || !user) return;
    const sanitize = (n) => {
      const v = Number(n);
      return Number.isFinite(v) ? Math.max(0, Math.min(10, v)) : 0;
    };
    try {
      const {
        data,
        error: error2
      } = await supabase.from("projects").insert({
        user_id: user.id,
        title: idea.title,
        problem_statement: idea.problemStatement,
        solution_overview: idea.solutionOverview,
        technologies: idea.technologies,
        requirements: idea.requirements,
        architecture: idea.architecture,
        timeline: idea.timeline,
        future_scope: idea.futureScope,
        resume_value_score: sanitize(idea.resumeValueScore),
        innovation_score: sanitize(idea.innovationScore),
        tech_depth_score: sanitize(idea.techDepthScore),
        market_potential: idea.marketPotential,
        difficulty: idea.difficulty,
        domains: idea.domains,
        bookmarked: bookmark
      }).select("id").single();
      if (error2) throw error2;
      setSavedId(data.id);
      await unlockAchievement({
        code: "first-project",
        title: "First Spark",
        description: "Generate your first AI project idea.",
        icon: "Sparkles",
        xp: 50
      });
      const {
        toast
      } = await import("./_libs/sonner.mjs");
      toast.success(bookmark ? "Bookmarked!" : "Project saved!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save project";
      console.error("[save project]", err);
      setError(msg);
      const {
        toast
      } = await import("./_libs/sonner.mjs");
      toast.error(msg);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Sparkles, title: "AI Project Generator", description: "Tell us your constraints — get a fully-architected, original project idea in seconds." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Domains (multi)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: DOMAINS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggleDomain(d), className: `rounded-full border px-3 py-1 text-xs transition ${domains.includes(d) ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: d }, d)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Difficulty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: difficulty, setValue: setDifficulty, options: DIFFICULTIES }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: projectType, setValue: setProjectType, options: TYPES }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Duration", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: duration, setValue: setDuration, options: DURATIONS }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Team size", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pills, { value: teamSize, setValue: setTeamSize, options: TEAMS }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGenerate, disabled: loading || domains.length === 0, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-50", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          loading ? "Generating…" : "Generate idea"
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] rounded-2xl border border-border bg-card/40 p-6 backdrop-blur", children: [
        !idea && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-spark text-primary-foreground shadow-glow animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Configure your constraints and let ProjectSpark conjure something brilliant." })
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-2/3 animate-pulse rounded bg-muted/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full animate-pulse rounded bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-5/6 animate-pulse rounded bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-3", children: Array.from({
            length: 6
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 animate-pulse rounded-xl bg-muted/30" }, i)) })
        ] }),
        idea && /* @__PURE__ */ jsxRuntimeExports.jsx(IdeaView, { idea, onSave, savedId })
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setValue(o), className: `rounded-full border px-3 py-1 text-xs transition ${value === o ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: o }, o)) });
}
function IdeaView({
  idea,
  onSave,
  savedId
}) {
  const navigate = useNavigate();
  const buildThis = () => {
    sessionStorage.setItem("ps:buildIdea", JSON.stringify(idea));
    navigate({
      to: "/builder"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: idea.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [
          idea.domains.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-spark/40 bg-spark/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-spark", children: d }, d)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: idea.difficulty }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            idea.marketPotential,
            " market"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSave(false), disabled: !!savedId, className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60 disabled:opacity-50", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onSave(true), disabled: !!savedId, className: "inline-flex items-center gap-1.5 rounded-lg border border-spark/50 bg-spark/10 px-3 py-1.5 text-xs font-medium text-spark disabled:opacity-50", children: [
          savedId ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
          savedId ? "Saved" : "Bookmark"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: buildThis, className: "inline-flex items-center gap-1.5 rounded-lg bg-gradient-spark px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3.5 w-3.5" }),
          "Build this project"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Trophy, label: "Resume value", value: `${Number(idea.resumeValueScore).toFixed(1)}/10` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Rocket, label: "Innovation", value: `${Number(idea.innovationScore).toFixed(1)}/10` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Network, label: "Tech depth", value: `${Number(idea.techDepthScore).toFixed(1)}/10` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Problem", body: idea.problemStatement }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Solution", body: idea.solutionOverview }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Tech stack" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: idea.technologies.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-card/60 px-2 py-1 font-mono text-[11px]", children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Cpu, title: "Hardware", items: idea.requirements.hardware }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Wrench, title: "Software", items: idea.requirements.software })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Network, title: "Architecture", items: idea.architecture, ordered: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: CalendarDays, title: "Timeline", items: idea.timeline, ordered: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Rocket, title: "Future scope", items: idea.futureScope })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-spark" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-lg", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label })
  ] });
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground", children });
}
function Section({
  title,
  body
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: body })
  ] });
}
function ListBlock({
  icon: Icon,
  title,
  items,
  ordered
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-spark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-sm text-foreground/90", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-spark/20 text-[10px] text-spark", children: ordered ? i + 1 : "•" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
    ] }, i)) })
  ] });
}
export {
  GeneratorPage as component
};
