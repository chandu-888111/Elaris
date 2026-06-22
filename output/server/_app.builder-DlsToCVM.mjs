import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useServerFn } from "./_ssr/ai-DTqZfz-A.mjs";
import { c as generateBuildBlueprint, d as generateProjectPrototypeCode, u as updateProjectPrototypeCode } from "./_ssr/ai.functions-ClHaPUvy.mjs";
import { u as useAuth, m as Route$b, d as PageShell, e as PageHeader, f as awardXP, X as XP, g as unlockAchievement } from "./_ssr/router-DT2A3-T4.mjs";
import { S as SaveBar } from "./_ssr/SaveBar-BGWbeuEr.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { a8 as CodeXml, L as LoaderCircle, R as Rocket, h as Sparkles, C as Cpu, aG as Layers, aH as Server, aI as Database, aJ as Cloud, ay as Wrench, aK as Beaker, aL as FolderTree, aM as GitBranch, n as FileCode, X, o as Copy, r as Check } from "./_libs/lucide-react.mjs";
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
function BuilderPage() {
  const generate = useServerFn(generateBuildBlueprint);
  const generatePrototype = useServerFn(generateProjectPrototypeCode);
  const updatePrototype = useServerFn(updateProjectPrototypeCode);
  const {
    user
  } = useAuth();
  const {
    seed,
    restoreId
  } = Route$b.useSearch();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [tech, setTech] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [bp, setBp] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("overview");
  const [prototypeHtml, setPrototypeHtml] = reactExports.useState(null);
  const [updatingPrototype, setUpdatingPrototype] = reactExports.useState(false);
  const [prototypePrompt, setPrototypePrompt] = reactExports.useState("");
  const [showSandboxCodeModal, setShowSandboxCodeModal] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (seed) {
      setTitle(seed);
      setDescription(`Build a production-ready application for ${seed}.`);
      setTech("React, Node, Postgres");
    }
  }, [seed]);
  reactExports.useEffect(() => {
    const raw = sessionStorage.getItem("ps:buildIdea");
    if (raw) {
      try {
        const idea = JSON.parse(raw);
        setTitle(idea.title);
        setDescription(idea.solutionOverview);
        setTech(idea.technologies.join(", "));
      } catch {
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (restoreId && user) {
      const loadSaved = async () => {
        const {
          data,
          error: error2
        } = await supabase.from("build_blueprints").select("*").eq("id", restoreId).single();
        if (error2) {
          toast.error("Failed to load blueprint");
          return;
        }
        if (data) {
          setTitle(data.title);
          setDescription(data.description ?? "");
          setTech((data.technologies ?? []).join(", "));
          const blueprintData = data.blueprint;
          setBp(blueprintData);
          if (blueprintData && blueprintData.sandboxCode) {
            setPrototypeHtml(blueprintData.sandboxCode);
            setTab("prototype");
          } else {
            setTab("overview");
          }
          toast.success("Loaded saved blueprint!");
        }
      };
      loadSaved();
    }
  }, [restoreId, user]);
  const onGen = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    setBp(null);
    setPrototypeHtml(null);
    try {
      const technologies = tech.split(",").map((t) => t.trim()).filter(Boolean);
      const [blueprintResult, prototypeResult] = await Promise.all([generate({
        data: {
          title,
          description,
          technologies
        }
      }), generatePrototype({
        data: {
          title,
          description,
          technologies
        }
      })]);
      setBp(blueprintResult);
      setPrototypeHtml(prototypeResult.html);
      setTab("prototype");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };
  const exportJson = () => {
    if (!bp) return;
    const blob = new Blob([JSON.stringify(bp, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bp.title.replace(/\s+/g, "-").toLowerCase()}-blueprint.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const onSave = async () => {
    if (!user || !bp) return;
    const technologies = tech.split(",").map((t) => t.trim()).filter(Boolean);
    const {
      error: error2
    } = await supabase.from("build_blueprints").insert({
      user_id: user.id,
      title: bp.title,
      description,
      technologies,
      blueprint: {
        ...bp,
        category: "project",
        sandboxCode: prototypeHtml
      }
    });
    if (error2) {
      toast.error("Save failed: " + error2.message);
      return;
    }
    await awardXP(XP.SAVE_BLUEPRINT, "Saved blueprint");
    await unlockAchievement({
      code: "save-blueprint",
      title: "AI Builder Pro",
      description: "Generate a production code blueprint.",
      icon: "Code2",
      xp: 75
    });
    toast.success("Saved blueprint and interactive sandbox to Saved items!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: CodeXml, title: "AI Project Builder", description: "Turn any idea into a production-ready blueprint — folders, schema, APIs, code, and deploy steps.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveBar, { canSave: !!bp, onSave, pickerTable: "build_blueprints", pickerSelect: "id, created_at, title, description, technologies, blueprint", pickerToRow: (r) => ({
      id: r.id,
      label: r.title,
      meta: (r.technologies ?? []).slice(0, 4).join(", ")
    }), pickerOnPick: (r) => {
      setTitle(r.title);
      setDescription(r.description ?? "");
      setTech((r.technologies ?? []).join(", "));
      const blueprintData = r.blueprint;
      setBp(blueprintData);
      if (blueprintData && blueprintData.sandboxCode) {
        setPrototypeHtml(blueprintData.sandboxCode);
        setTab("prototype");
      } else {
        setTab("overview");
      }
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Project title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "e.g. AI Recipe Generator", className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), rows: 4, placeholder: "What does it do?", className: "w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Preferred tech (comma sep)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: tech, onChange: (e) => setTech(e.target.value), placeholder: "React, Node, Postgres", className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGen, disabled: loading || !title.trim(), className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-4 w-4" }),
          loading ? "Architecting…" : "Generate blueprint"
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }),
        bp && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: exportJson, className: "w-full rounded-lg border border-border px-3 py-2 text-xs hover:bg-card/60", children: "Export blueprint (.json)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px] space-y-4 min-w-0", children: [
        !bp && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "mb-3 h-8 w-8 text-spark animate-float" }),
          "Describe a project — get a full architecture in seconds."
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 animate-pulse rounded-2xl bg-muted/30" }, i)) }),
        bp && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/30 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-spark", children: "Blueprint" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: bp.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              "Estimated timeline: ",
              bp.estimatedTimeline
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            prototypeHtml && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("prototype"), className: `rounded-full px-3 py-1 text-xs font-semibold capitalize flex items-center gap-1 border ${tab === "prototype" ? "bg-gradient-spark border-spark text-primary-foreground shadow-glow" : "border-spark/30 text-spark hover:bg-spark/10 hover:text-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 animate-pulse text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Live Sandbox Prototype" })
            ] }),
            ["overview", "structure", "schema", "api", "code", "deploy"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `rounded-full px-3 py-1 text-xs capitalize ${tab === t ? "bg-gradient-spark text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`, children: t }, t))
          ] }),
          tab === "prototype" && prototypeHtml && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[280px_1fr] h-[550px] min-h-[500px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-4 h-full overflow-y-auto", "data-lenis-prevent": "true", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-bold text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-spark animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Prompt AI Sandbox" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-normal", children: "Iterate on your project prototype just like in Bolt, or v0! Ask the AI to change styles, add features, or refine behaviors." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: prototypePrompt, onChange: (e) => setPrototypePrompt(e.target.value), placeholder: "e.g. Add a clear all button or make it responsive...", rows: 4, className: "w-full rounded-lg border border-white/10 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-spark resize-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
                if (!prototypePrompt.trim() || !prototypeHtml) return;
                setUpdatingPrototype(true);
                toast.info("AI Sandbox modifying code...");
                try {
                  const res = await updatePrototype({
                    data: {
                      currentHtml: prototypeHtml,
                      prompt: prototypePrompt
                    }
                  });
                  setPrototypeHtml(res.html);
                  setPrototypePrompt("");
                  toast.success("Sandbox code updated!");
                  awardXP(20, "Updated project sandbox");
                } catch (err) {
                  toast.error("Failed to update sandbox");
                } finally {
                  setUpdatingPrototype(false);
                }
              }, disabled: updatingPrototype || !prototypePrompt.trim(), className: "w-full py-2 rounded-xl bg-gradient-spark text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-[1.02] transition disabled:opacity-50 shadow-glow cursor-none", children: [
                updatingPrototype ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: updatingPrototype ? "Updating..." : "Update Sandbox" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 overflow-hidden bg-white/5 flex flex-col h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-4 py-2 border-b border-white/5 bg-black/40 text-[10px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-red-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-wider opacity-60 font-mono text-spark", children: "http://localhost:3000/app-sandbox" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    if (prototypeHtml) {
                      navigator.clipboard.writeText(prototypeHtml);
                      toast.success("Sandbox HTML copied to clipboard!");
                    }
                  }, className: "rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] text-muted-foreground hover:bg-white/10 transition cursor-none", children: "Copy Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    setShowSandboxCodeModal(true);
                  }, className: "rounded bg-spark/20 border border-spark/30 px-2 py-0.5 text-spark hover:bg-spark/30 transition text-[9px] cursor-none", children: "Code View" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "AI App Sandbox Preview", srcDoc: prototypeHtml, className: "flex-1 w-full bg-white border-0" })
            ] })
          ] }),
          tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Layers, title: "Frontend stack", items: bp.techStack.frontend }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Server, title: "Backend stack", items: bp.techStack.backend }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Database, title: "Database", items: bp.techStack.database }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Cloud, title: "DevOps", items: bp.techStack.devops }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Wrench, title: "Frontend architecture", items: bp.frontendArchitecture }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Wrench, title: "Backend architecture", items: bp.backendArchitecture }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Beaker, title: "MVP plan", items: bp.mvpPlan }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Beaker, title: "Testing strategy", items: bp.testingStrategy }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Wrench, title: "Recommended libraries", items: bp.recommendedLibraries }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Wrench, title: "Env variables", items: bp.envVariables, mono: true })
          ] }),
          tab === "structure" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderTree, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: "Folder structure" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto rounded-lg bg-background/60 p-4 font-mono text-xs leading-relaxed", children: bp.folderStructure.join("\n") })
          ] }),
          tab === "schema" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bp.databaseSchema.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-sm", children: t.table })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.columns.map((c, n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded border border-border bg-background/40 px-2 py-1 font-mono text-xs", children: c }, n)) })
          ] }, i)) }),
          tab === "api" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4 text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: "API routes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: bp.apiRoutes.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-wrap items-center gap-3 py-2 font-mono text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-2 py-0.5 text-[10px] font-bold ${methodColor(r.method)}`, children: r.method.toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: r.path }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "— ",
                r.description
              ] })
            ] }, i)) })
          ] }),
          tab === "code" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            bp.starterSnippets.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { ...s }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: GitBranch, title: "GitHub workflow", items: bp.githubWorkflow })
          ] }),
          tab === "deploy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Rocket, title: "Deployment steps", items: bp.deploymentSteps, ordered: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: GitBranch, title: "CI/CD", items: bp.cicd }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: FileCode, title: "Auth setup", items: bp.authSetup, ordered: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BlueprintCard, { icon: Layers, title: "Implementation steps", items: bp.implementationSteps.map((s) => `${s.step}. ${s.title} — ${s.detail}`) })
          ] })
        ] })
      ] })
    ] }),
    showSandboxCodeModal && prototypeHtml && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[640px] rounded-3xl border border-white/10 bg-card p-6 shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSandboxCodeModal(false), className: "absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground transition cursor-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-bold text-foreground mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "h-5 w-5 text-spark" }),
        " Sandbox Prototype Code View"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Here is the HTML/CSS/JS source code generated for your sandbox web prototype." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { readOnly: true, value: prototypeHtml, rows: 12, className: "w-full rounded-xl border border-white/10 bg-background/50 p-4 font-mono text-[10px] leading-relaxed text-spark outline-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowSandboxCodeModal(false), className: "px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-foreground transition cursor-none", children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          navigator.clipboard.writeText(prototypeHtml);
          toast.success("Code copied!");
        }, className: "px-4.5 py-2 rounded-xl bg-gradient-spark text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition text-xs flex items-center gap-1.5 cursor-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Copy Code" })
        ] })
      ] })
    ] }) })
  ] });
}
function methodColor(m) {
  const x = m.toUpperCase();
  if (x === "GET") return "bg-emerald-500/20 text-emerald-400";
  if (x === "POST") return "bg-blue-500/20 text-blue-400";
  if (x === "PUT" || x === "PATCH") return "bg-amber-500/20 text-amber-400";
  if (x === "DELETE") return "bg-red-500/20 text-red-400";
  return "bg-muted text-foreground";
}
function BlueprintCard({
  icon: Icon,
  title,
  items,
  mono,
  ordered
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-spark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: `space-y-1.5 ${mono ? "font-mono text-xs" : "text-sm"}`, children: items.map((i, n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-spark/20 text-[10px] text-spark", children: ordered ? n + 1 : "•" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i })
    ] }, n)) })
  ] });
}
function CodeBlock({
  filename,
  language,
  code
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border bg-background/40 px-4 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "h-3.5 w-3.5 text-spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: filename }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "· ",
          language
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copy, className: "inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-card hover:text-foreground", children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
        copied ? "Copied" : "Copy"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto p-4 font-mono text-xs leading-relaxed", children: code })
  ] });
}
export {
  BuilderPage as component
};
