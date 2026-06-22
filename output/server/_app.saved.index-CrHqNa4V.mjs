import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { u as useAuth, d as PageShell, e as PageHeader, p as playClick, H as HolographicPanel, n as playSuccess } from "./_ssr/router-DT2A3-T4.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/seroval.mjs";
import { a8 as CodeXml, av as Lightbulb, i as FolderHeart, v as BookOpen, t as Terminal, g as Brain, G as GraduationCap, f as Bookmark, w as Search, al as Trash2, a5 as ArrowRight, E as ExternalLink, h as Sparkles } from "./_libs/lucide-react.mjs";
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
function SavedPage() {
  const {
    user
  } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("blueprints");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [blueprints, setBlueprints] = reactExports.useState([]);
  const [projectIdeas, setProjectIdeas] = reactExports.useState([]);
  const [portfolios, setPortfolios] = reactExports.useState([]);
  const [books, setBooks] = reactExports.useState([]);
  const [interviewPreps, setInterviewPreps] = reactExports.useState([]);
  const [mentorPlans, setMentorPlans] = reactExports.useState([]);
  const [studyGuides, setStudyGuides] = reactExports.useState([]);
  const filterList = (list, fields) => {
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase().trim();
    return list.filter((item) => {
      return fields.some((field) => {
        const val = field.split(".").reduce((acc, part) => {
          if (acc && typeof acc === "object" && part in acc) {
            return acc[part];
          }
          return void 0;
        }, item);
        return val && String(val).toLowerCase().includes(query);
      });
    });
  };
  const filteredBlueprints = filterList(blueprints, ["title", "description", "technologies"]);
  const filteredProjectIdeas = filterList(projectIdeas, ["title", "solution_overview", "difficulty", "domains"]);
  const filteredPortfolios = filterList(portfolios, ["title", "description", "technologies"]);
  const filteredBooks = filterList(books, ["title", "blueprint.description", "blueprint.categoryName", "blueprint.author"]);
  const filteredInterviewPreps = filterList(interviewPreps, ["title", "description", "blueprint.company"]);
  const filteredMentorPlans = filterList(mentorPlans, ["topic", "goal", "level"]);
  const filteredStudyGuides = filterList(studyGuides, ["domain", "goal"]);
  const loadAllSaved = reactExports.useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [projectsRes, blueprintsRes, mentorRes, studyRes] = await Promise.all([supabase.from("projects").select("*").order("created_at", {
        ascending: false
      }), supabase.from("build_blueprints").select("*").order("created_at", {
        ascending: false
      }), supabase.from("mentor_plans").select("*").order("created_at", {
        ascending: false
      }), supabase.from("study_guides").select("*").order("created_at", {
        ascending: false
      })]);
      if (projectsRes.error) throw projectsRes.error;
      if (blueprintsRes.error) throw blueprintsRes.error;
      if (mentorRes.error) throw mentorRes.error;
      if (studyRes.error) throw studyRes.error;
      setProjectIdeas(projectsRes.data || []);
      setMentorPlans(mentorRes.data || []);
      setStudyGuides(studyRes.data || []);
      const allBps = blueprintsRes.data || [];
      const bps = [];
      const ports = [];
      const bks = [];
      const preps = [];
      allBps.forEach((item) => {
        const bp = item.blueprint;
        if (bp && bp.category === "portfolio") {
          ports.push(item);
        } else if (bp && bp.category === "book") {
          bks.push(item);
        } else if (bp && bp.category === "interview_prep") {
          preps.push(item);
        } else {
          bps.push(item);
        }
      });
      setBlueprints(bps);
      setPortfolios(ports);
      setBooks(bks);
      setInterviewPreps(preps);
      if (bps.length === 0) {
        if (ports.length > 0) setActiveTab("portfolios");
        else if (projectsRes.data && projectsRes.data.length > 0) setActiveTab("projects");
        else if (bks.length > 0) setActiveTab("books");
        else if (preps.length > 0) setActiveTab("interview");
        else if (mentorRes.data && mentorRes.data.length > 0) setActiveTab("mentor");
        else if (studyRes.data && studyRes.data.length > 0) setActiveTab("study");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error("Failed to load saved items: " + message);
    } finally {
      setLoading(false);
    }
  }, [user]);
  reactExports.useEffect(() => {
    loadAllSaved();
  }, [loadAllSaved]);
  const deleteItem = async (id, table) => {
    playClick();
    const {
      error
    } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete: " + error.message);
    } else {
      toast.success("Item removed");
      loadAllSaved();
    }
  };
  const tabs = [{
    value: "blueprints",
    label: "Sandbox & Blueprints",
    icon: CodeXml,
    count: filteredBlueprints.length
  }, {
    value: "projects",
    label: "Project Ideas",
    icon: Lightbulb,
    count: filteredProjectIdeas.length
  }, {
    value: "portfolios",
    label: "Portfolios",
    icon: FolderHeart,
    count: filteredPortfolios.length
  }, {
    value: "books",
    label: "Books & Docs",
    icon: BookOpen,
    count: filteredBooks.length
  }, {
    value: "interview",
    label: "Interview Prep",
    icon: Terminal,
    count: filteredInterviewPreps.length
  }, {
    value: "mentor",
    label: "AI Mentor Plans",
    icon: Brain,
    count: filteredMentorPlans.length
  }, {
    value: "study",
    label: "Study Guides",
    icon: GraduationCap,
    count: filteredStudyGuides.length
  }];
  const renderActiveContent = () => {
    switch (activeTab) {
      case "blueprints":
        return filteredBlueprints.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "Blueprints & Code Sandbox", redirectPath: "/builder", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredBlueprints.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "build_blueprints"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: item.description || "Production project blueprint with generated starter files and architectural layouts." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: (item.technologies || []).slice(0, 4).map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full border border-spark/20 bg-spark/5 text-[9px] uppercase tracking-wider text-spark font-mono", children: tech }, tech)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", search: {
              restoreId: item.id
            }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Launch Sandbox" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }, item.id)) });
      case "projects":
        return filteredProjectIdeas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "Project Ideas", redirectPath: "/generator", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredProjectIdeas.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "projects"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: item.solution_overview }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [
              (item.domains || []).slice(0, 3).map((domain) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-wider text-muted-foreground", children: domain }, domain)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full border border-border bg-background/30 text-[9px] uppercase tracking-wider text-muted-foreground font-semibold", children: item.difficulty })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/saved/$projectId", params: {
              projectId: item.id
            }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View Idea Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }, item.id)) });
      case "portfolios":
        return filteredPortfolios.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "Custom Portfolios", redirectPath: "/portfolio", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredPortfolios.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "build_blueprints"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderHeart, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: item.description || "Tailored developer custom portfolio website styling and content structure." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: (item.technologies || []).slice(0, 4).map((tech) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[9px] uppercase tracking-wider text-muted-foreground", children: tech }, tech)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/portfolio", search: {
              restoreId: item.id
            }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Load Portfolio Builder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }, item.id)) });
      case "books":
        return filteredBooks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "Saved Books & Docs", redirectPath: "/books", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredBooks.map((item) => {
          const bp = item.blueprint;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "build_blueprints"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[8px] font-bold uppercase tracking-wider w-fit block mb-1", children: bp.categoryName || "Computer Science" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6 truncate", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: bp.description || `Author: ${item.description}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-purple-400 font-mono font-bold bg-purple-500/10 border border-purple-500/10 px-1.5 py-0.2 rounded text-[8px]", children: bp.format || "HTML" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: bp.url, target: "_blank", rel: "noopener noreferrer", onClick: () => {
                playSuccess();
              }, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Read Book" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
              ] })
            ] })
          ] }, item.id);
        }) });
      case "interview":
        return filteredInterviewPreps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "Interview Prep Lists", redirectPath: "/job-prep", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredInterviewPreps.map((item) => {
          const bp = item.blueprint;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "build_blueprints"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "h-4 w-4 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed font-sans", children: item.description || `LeetCode questions list compiled for technical interviews.` }),
              bp && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block text-[10px] text-muted-foreground bg-white/5 border border-white/10 px-2 py-0.5 rounded", children: [
                bp.questionsCount || 0,
                " Questions Saved"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/job-prep", search: {
                company: bp.company,
                timeframe: bp.timeframe
              }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open Prep Console" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
              ] })
            ] })
          ] }, item.id);
        }) });
      case "mentor":
        return filteredMentorPlans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "AI Lesson Plans", redirectPath: "/mentor", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredMentorPlans.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "mentor_plans"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.topic })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: [
              "Goal: ",
              item.goal || `Master ${item.topic}`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block text-[10px] text-spark bg-spark/10 border border-spark/20 px-2 py-0.5 rounded-full font-bold", children: [
              item.level,
              " Level"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/mentor", search: {
              restoreId: item.id
            }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open Lesson Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }, item.id)) });
      case "study":
        return filteredStudyGuides.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tabLabel: "AI Study Guides", redirectPath: "/study-guide", hasQuery: !!searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: filteredStudyGuides.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(HolographicPanel, { className: "p-5 flex flex-col justify-between min-h-[160px] relative group border-white/5 bg-card/45", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteItem(item.id, "study_guides"), className: "absolute right-3 top-3 text-muted-foreground hover:text-destructive p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-base text-foreground flex items-center gap-1.5 pr-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                item.domain,
                " Curriculum"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: [
              "Goal: ",
              item.goal
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block text-[10px] text-muted-foreground bg-white/5 border border-white/10 px-2 py-0.5 rounded", children: [
              item.daily_minutes,
              " Min Daily Routine"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-white/5 pt-3 mt-4 text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: new Date(item.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/study-guide", search: {
              restoreId: item.id
            }, onClick: playClick, className: "text-spark hover:underline font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Launch Study Console" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }, item.id)) });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Bookmark, title: "Saved Items", description: "Your centralized storage center. Access saved code blueprints, interactive sandboxes, portfolios, book bookmarks, interview preps, mentor guides, and curriculums." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-white/5 text-xs font-semibold overflow-x-auto pb-1 gap-1 scrollbar-none flex-1 order-last md:order-first", "data-lenis-prevent": true, children: tabs.map((tab) => {
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          playClick();
          setActiveTab(tab.value);
        }, className: `px-4.5 py-2.5 capitalize rounded-t-xl transition flex items-center gap-1.5 whitespace-nowrap ${activeTab === tab.value ? "border-b-2 border-spark text-foreground bg-spark/5" : "text-muted-foreground hover:text-foreground hover:bg-white/2"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-muted-foreground ml-0.5", children: tab.count })
        ] }, tab.value);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:w-80 order-first md:order-last shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search saved items...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full rounded-xl border border-white/10 bg-background/50 pl-9 pr-8 py-1.5 text-xs text-foreground outline-none focus:border-spark focus:ring-1 focus:ring-spark/30 transition-all" }),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearchQuery(""), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 animate-pulse rounded-2xl bg-card/20 border border-white/5" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-in fade-in duration-300", children: renderActiveContent() })
  ] });
}
function EmptyState({
  tabLabel,
  redirectPath,
  hasQuery
}) {
  if (hasQuery) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium", children: "No matching items found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground max-w-sm px-4", children: "Try adjusting your search terms or filters to find what you're looking for." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-spark text-primary-foreground shadow-glow animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium", children: "No saved items in this category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground max-w-sm px-4", children: [
        "Compile and bookmark references or generate AI tools inside the ",
        tabLabel,
        " section to see them listed here."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: redirectPath, onClick: playClick, className: "inline-flex items-center gap-2 rounded-xl bg-gradient-spark px-5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
      " Explore ",
      tabLabel
    ] })
  ] });
}
export {
  SavedPage as component
};
