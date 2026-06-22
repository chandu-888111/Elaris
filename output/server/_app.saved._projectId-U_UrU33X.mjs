import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate, u as useRouter, L as Link } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { o as Route$2, d as PageShell } from "./_ssr/router-DT2A3-T4.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/seroval.mjs";
import { L as LoaderCircle, aQ as ArrowLeft, aw as BookmarkCheck, f as Bookmark, ax as Hammer, G as GraduationCap, aC as Map, aq as Save, X, aR as Pencil, l as Download, aS as Share2, al as Trash2, J as Trophy, R as Rocket, N as Network, C as Cpu, ay as Wrench, az as CalendarDays } from "./_libs/lucide-react.mjs";
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
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
function ProjectDetailsPage() {
  const {
    projectId
  } = Route$2.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const [p, setP] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState({
    title: "",
    problem_statement: "",
    solution_overview: ""
  });
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from("projects").select("*").eq("id", projectId).maybeSingle();
      if (error) toast.error(error.message);
      setP(data ?? null);
      setLoading(false);
    })();
  }, [projectId]);
  const toggleBookmark = async () => {
    if (!p) return;
    const next = !p.bookmarked;
    setP({
      ...p,
      bookmarked: next
    });
    const {
      error
    } = await supabase.from("projects").update({
      bookmarked: next
    }).eq("id", p.id);
    if (error) {
      setP({
        ...p,
        bookmarked: !next
      });
      toast.error(error.message);
    }
  };
  const onDelete = async () => {
    if (!p) return;
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const {
      error
    } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success("Project deleted");
    navigate({
      to: "/saved"
    });
  };
  const startEdit = () => {
    if (!p) return;
    setDraft({
      title: p.title,
      problem_statement: p.problem_statement,
      solution_overview: p.solution_overview
    });
    setEditing(true);
  };
  const saveEdit = async () => {
    if (!p) return;
    const {
      error
    } = await supabase.from("projects").update(draft).eq("id", p.id);
    if (error) return toast.error(error.message);
    setP({
      ...p,
      ...draft
    });
    setEditing(false);
    toast.success("Saved");
  };
  const buildThis = () => {
    if (!p) return;
    sessionStorage.setItem("ps:buildIdea", JSON.stringify({
      title: p.title,
      problemStatement: p.problem_statement,
      solutionOverview: p.solution_overview,
      technologies: p.technologies,
      requirements: p.requirements ?? {
        hardware: [],
        software: []
      },
      architecture: p.architecture,
      timeline: p.timeline,
      futureScope: p.future_scope,
      resumeValueScore: Number(p.resume_value_score),
      innovationScore: Number(p.innovation_score),
      techDepthScore: Number(p.tech_depth_score),
      marketPotential: p.market_potential,
      difficulty: p.difficulty,
      domains: p.domains
    }));
    navigate({
      to: "/builder"
    });
  };
  const mentor = () => {
    if (!p) return;
    sessionStorage.setItem("ps:mentorTopic", p.title);
    navigate({
      to: "/mentor"
    });
  };
  const roadmap = () => {
    if (!p) return;
    sessionStorage.setItem("ps:roadmapSeed", p.domains?.[0] ?? p.title);
    navigate({
      to: "/roadmap"
    });
  };
  const exportPdf = () => {
    if (!p) return;
    const w = window.open("", "_blank");
    if (!w) return toast.error("Popup blocked");
    const list = (arr = []) => arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
    w.document.write(`<!doctype html><html><head><title>${escapeHtml(p.title)}</title>
      <style>body{font-family:Inter,system-ui,sans-serif;max-width:780px;margin:40px auto;padding:0 24px;color:#111}
      h1{font-size:28px;margin-bottom:4px} h2{font-size:16px;margin-top:24px;color:#333;border-bottom:1px solid #eee;padding-bottom:4px}
      ul{padding-left:18px} .meta{color:#666;font-size:13px;margin-bottom:16px}
      .pills span{display:inline-block;border:1px solid #ddd;padding:2px 8px;border-radius:999px;font-size:11px;margin:2px 4px 2px 0}
      .scores{display:flex;gap:16px;margin:12px 0}
      .scores div{flex:1;border:1px solid #eee;padding:8px;border-radius:8px;text-align:center}</style></head><body>
      <h1>${escapeHtml(p.title)}</h1>
      <div class="meta">${escapeHtml(p.difficulty)} · ${escapeHtml(p.market_potential)} market · Saved ${new Date(p.created_at).toLocaleDateString()}</div>
      <div class="pills">${(p.domains ?? []).map((d) => `<span>${escapeHtml(d)}</span>`).join("")}</div>
      <div class="scores">
        <div><b>${Number(p.resume_value_score).toFixed(1)}</b><br/>Resume value</div>
        <div><b>${Number(p.innovation_score).toFixed(1)}</b><br/>Innovation</div>
        <div><b>${Number(p.tech_depth_score).toFixed(1)}</b><br/>Tech depth</div>
      </div>
      <h2>Problem</h2><p>${escapeHtml(p.problem_statement)}</p>
      <h2>Solution</h2><p>${escapeHtml(p.solution_overview)}</p>
      <h2>Technologies</h2><div class="pills">${(p.technologies ?? []).map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>
      <h2>Hardware</h2><ul>${list(p.requirements?.hardware ?? [])}</ul>
      <h2>Software</h2><ul>${list(p.requirements?.software ?? [])}</ul>
      <h2>Architecture</h2><ol>${list(p.architecture ?? [])}</ol>
      <h2>Timeline</h2><ol>${list(p.timeline ?? [])}</ol>
      <h2>Future scope</h2><ul>${list(p.future_scope ?? [])}</ul>
      <script>window.onload=()=>window.print()<\/script></body></html>`);
    w.document.close();
  };
  const share = async () => {
    const url = window.location.href;
    const title = p?.title ?? "ProjectSpark";
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
        return;
      } catch {
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) }) });
  }
  if (!p) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Project not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/saved", className: "mt-4 inline-flex items-center gap-1.5 text-sm text-spark hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        " Back to saved"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => router.history.back(), className: "mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.title, onChange: (e) => setDraft({
            ...draft,
            title: e.target.value
          }), className: "w-full rounded-lg border border-border bg-background px-3 py-2 font-display text-2xl font-semibold outline-none focus:border-spark/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [
            (p.domains ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-spark/40 bg-spark/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-spark", children: d }, d)),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: p.difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              p.market_potential,
              " market"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground", children: [
              "Saved ",
              new Date(p.created_at).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleBookmark, className: "inline-flex items-center gap-1.5 rounded-lg border border-spark/50 bg-spark/10 px-3 py-1.5 text-xs font-medium text-spark", children: [
          p.bookmarked ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-3.5 w-3.5" }),
          p.bookmarked ? "Bookmarked" : "Bookmark"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: buildThis, primary: true, icon: Hammer, children: "Build This Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: mentor, icon: GraduationCap, children: "Continue with AI Mentor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: roadmap, icon: Map, children: "Generate Roadmap" }),
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: saveEdit, icon: Save, children: "Save" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: () => setEditing(false), icon: X, children: "Cancel" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: startEdit, icon: Pencil, children: "Edit Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: exportPdf, icon: Download, children: "Export PDF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: share, icon: Share2, children: "Share" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { onClick: onDelete, icon: Trash2, danger: true, children: "Delete" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Trophy, label: "Resume value", value: `${Number(p.resume_value_score).toFixed(1)}/10` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Rocket, label: "Innovation", value: `${Number(p.innovation_score).toFixed(1)}/10` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Network, label: "Tech depth", value: `${Number(p.tech_depth_score).toFixed(1)}/10` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Problem", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: draft.problem_statement, onChange: (e) => setDraft({
        ...draft,
        problem_statement: e.target.value
      }), rows: 4, className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-spark/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: p.problem_statement }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Solution", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: draft.solution_overview, onChange: (e) => setDraft({
        ...draft,
        solution_overview: e.target.value
      }), rows: 4, className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-spark/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: p.solution_overview }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Tech stack" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: (p.technologies ?? []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-card/60 px-2 py-1 font-mono text-[11px]", children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Cpu, title: "Hardware", items: p.requirements?.hardware ?? [] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Wrench, title: "Software", items: p.requirements?.software ?? [] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Network, title: "Architecture / Workflow", items: p.architecture ?? [], ordered: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: CalendarDays, title: "Timeline", items: p.timeline ?? [], ordered: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { icon: Rocket, title: "Future scope", items: p.future_scope ?? [] })
    ] })
  ] });
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
function Action({
  children,
  onClick,
  icon: Icon,
  primary,
  danger
}) {
  const cls = primary ? "bg-gradient-spark text-primary-foreground shadow-glow hover:opacity-95" : danger ? "border border-destructive/40 text-destructive hover:bg-destructive/10" : "border border-border hover:bg-card/60";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
    " ",
    children
  ] });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-spark" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-xl", children: value }),
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
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: title }),
    children
  ] });
}
function ListBlock({
  icon: Icon,
  title,
  items,
  ordered
}) {
  if (!items?.length) return null;
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
  ProjectDetailsPage as component
};
