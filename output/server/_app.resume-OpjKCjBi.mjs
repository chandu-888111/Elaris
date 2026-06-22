import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useServerFn } from "./_ssr/ai-DTqZfz-A.mjs";
import { u as useAuth, h as generateResume, i as analyzeResumeATS, d as PageShell, e as PageHeader, f as awardXP, X as XP } from "./_ssr/router-DT2A3-T4.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { S as SessionPicker } from "./_ssr/SessionPicker-CrpRw6VW.mjs";
import { toast } from "./_libs/sonner.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { Q as FileText, h as Sparkles, ap as ScanLine, L as LoaderCircle, aq as Save, l as Download, ar as Mail, as as MapPin, at as Globe, ah as Github, au as Linkedin } from "./_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as RadarChart, P as PolarGrid, b as PolarAngleAxis, c as PolarRadiusAxis, d as Radar } from "./_libs/recharts.mjs";
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
function ResumePage() {
  const {
    user
  } = useAuth();
  const gen = useServerFn(generateResume);
  const ats = useServerFn(analyzeResumeATS);
  const [tab, setTab] = reactExports.useState("build");
  const [name, setName] = reactExports.useState("");
  const [targetRole, setTargetRole] = reactExports.useState("Full Stack Engineer");
  const [experience, setExperience] = reactExports.useState("");
  const [skills, setSkills] = reactExports.useState("");
  const [projects, setProjects] = reactExports.useState("");
  const [education, setEducation] = reactExports.useState("");
  const [rawDetails, setRawDetails] = reactExports.useState("");
  const [template, setTemplate] = reactExports.useState("Detailed");
  const [resume, setResume] = reactExports.useState(null);
  const [resumeId, setResumeId] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [jobDesc, setJobDesc] = reactExports.useState("");
  const [report, setReport] = reactExports.useState(null);
  const [atsLoading, setAtsLoading] = reactExports.useState(false);
  const onGen = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setResume(null);
    setResumeId(null);
    setReport(null);
    try {
      const r = await gen({
        data: {
          name,
          targetRole,
          rawDetails,
          template
        }
      });
      setResume(r);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };
  const onSave = async () => {
    if (!resume || !user) return;
    const {
      data,
      error
    } = await supabase.from("resumes").insert({
      user_id: user.id,
      title: `${resume.name} — ${targetRole}`,
      target_role: targetRole,
      content: resume,
      ats_score: report?.overallScore ?? 0,
      ats_report: report ?? {}
    }).select("id").single();
    if (error) {
      toast.error(error.message);
      return;
    }
    setResumeId(data.id);
    await awardXP(XP.SAVE_RESUME, "Saved resume");
  };
  const onExportPDF = () => {
    window.print();
  };
  const onRunATS = async () => {
    if (!resume) {
      toast.error("Generate a resume first.");
      return;
    }
    if (!jobDesc.trim()) return;
    setAtsLoading(true);
    setReport(null);
    try {
      const resumeText = serializeResume(resume);
      const r = await ats({
        data: {
          resumeText,
          jobDescription: jobDesc
        }
      });
      setReport(r);
      await awardXP(XP.RUN_ATS, "Ran ATS analysis");
      if (resumeId) {
        await supabase.from("resumes").update({
          ats_score: r.overallScore,
          ats_report: r
        }).eq("id", resumeId);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "ATS failed");
    } finally {
      setAtsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: FileText, title: "Resume Builder & ATS Analyzer", description: "AI-generated, ATS-optimized resumes with recruiter-grade scoring.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionPicker, { table: "resumes", select: "id, title, target_role, content, ats_score, ats_report, created_at", toRow: (r) => ({
      id: r.id,
      label: r.title,
      meta: `${r.target_role} · ATS ${Math.round(Number(r.ats_score))}`
    }), onPick: (r) => {
      setResume(r.content);
      setTargetRole(r.target_role);
      setName(r.content.name);
      setResumeId(r.id);
      setReport(r.ats_report?.overallScore ? r.ats_report : null);
      setTab("build");
    } }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex gap-2 rounded-xl glass-panel p-1 w-fit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === "build", onClick: () => setTab("build"), icon: Sparkles, children: "Build" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === "ats", onClick: () => setTab("ats"), icon: ScanLine, children: "ATS Analyzer" })
    ] }),
    tab === "build" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl glass-panel p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: setName, placeholder: "Ada Lovelace" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Target role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: targetRole, onChange: setTargetRole, placeholder: "Full Stack Engineer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Template Style", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: template, onChange: (e) => setTemplate(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-spark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Detailed", children: "Detailed (Descriptive bullets)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Simple", children: "Simple (Concise & Minimal)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Paste Full Details (Experience, Skills, Education...)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { value: rawDetails, onChange: setRawDetails, rows: 12, placeholder: "Paste your entire raw resume, LinkedIn profile, or list of experiences here. AI will extract and structure it perfectly." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGen, disabled: loading || !name.trim(), className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          loading ? "Crafting resume…" : "Generate resume"
        ] }),
        resume && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onSave, className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 py-2 text-xs hover:bg-card transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            " ",
            resumeId ? "Saved" : "Save"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onExportPDF, className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 py-2 text-xs hover:bg-card transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " Download PDF"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[500px]", children: [
        !resume && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mb-3 h-8 w-8 text-spark animate-float" }),
          "Fill in the form — AI will craft a polished resume."
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[500px] animate-pulse rounded-2xl bg-muted/20" }),
        resume && /* @__PURE__ */ jsxRuntimeExports.jsx(ResumePreview, { resume })
      ] })
    ] }),
    tab === "ats" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl glass-panel p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: resume ? `Analyzing: ${resume.name} — ${targetRole}` : "Generate a resume first in the Build tab." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Paste job description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { value: jobDesc, onChange: setJobDesc, rows: 10, placeholder: "Paste the full JD here…" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onRunATS, disabled: atsLoading || !resume || !jobDesc.trim(), className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
          atsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }),
          atsLoading ? "Analyzing…" : "Run ATS analysis"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[500px]", children: [
        !report && !atsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[500px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "mb-3 h-8 w-8 text-spark animate-float" }),
          "Paste a JD to score your resume."
        ] }),
        atsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[500px] animate-pulse rounded-2xl bg-muted/20" }),
        report && /* @__PURE__ */ jsxRuntimeExports.jsx(ATSPanel, { report })
      ] })
    ] })
  ] });
}
function serializeResume(r) {
  return `${r.name}
${r.headline}

SUMMARY
${r.summary}

SKILLS
${r.skills.join(", ")}

EXPERIENCE
${r.experience.map((e) => `${e.role} @ ${e.company} (${e.period})
${e.bullets.map((b) => `- ${b}`).join("\n")}`).join("\n\n")}

PROJECTS
${r.projects.map((p) => `${p.name}: ${p.description} [${p.tech.join(", ")}]`).join("\n")}

EDUCATION
${r.education.map((e) => `${e.degree}, ${e.school} (${e.period})`).join("\n")}

CERTIFICATIONS
${r.certifications.join(", ")}

ACHIEVEMENTS
${r.achievements.join("\n")}`;
}
function ResumePreview({
  resume
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print:bg-white print:text-black overflow-hidden rounded-2xl glass-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-spark/20 via-transparent to-transparent p-8 print:bg-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-gradient", children: resume.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: resume.headline }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground", children: [
        resume.contact.email && /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: Mail, children: resume.contact.email }),
        resume.contact.location && /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: MapPin, children: resume.contact.location }),
        resume.contact.website && /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: Globe, children: resume.contact.website }),
        resume.contact.github && /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: Github, children: resume.contact.github }),
        resume.contact.linkedin && /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: Linkedin, children: resume.contact.linkedin })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 p-8 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: resume.summary }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Skills", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: resume.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-card/40 px-2 py-0.5 text-[11px]", children: s }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Experience", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: resume.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            e.role,
            " · ",
            e.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: e.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 space-y-0.5 pl-4 text-sm", children: e.bullets.map((b, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "list-disc", children: b }, j)) })
      ] }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Projects", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: resume.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[11px] text-spark", children: p.tech.join(" · ") })
      ] }, i)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Education", children: resume.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          e.degree,
          " · ",
          e.school
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: e.period })
      ] }, i)) }),
      resume.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Certifications", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: resume.certifications.join(" · ") }) }),
      resume.achievements.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Achievements", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-0.5 pl-4 text-sm", children: resume.achievements.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "list-disc", children: a }, i)) }) })
    ] })
  ] });
}
function ATSPanel({
  report
}) {
  const radarData = Object.entries(report.scores).map(([k, v]) => ({
    metric: k.charAt(0).toUpperCase() + k.slice(1),
    value: v
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center rounded-2xl glass-panel p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-32 w-32 place-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 -rotate-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "42", stroke: "hsl(var(--border))", strokeWidth: "6", fill: "none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "42", stroke: "url(#g)", strokeWidth: "6", strokeLinecap: "round", fill: "none", strokeDasharray: `${report.overallScore / 100 * 264} 264` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", x1: "0", x2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "hsl(var(--spark))" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "hsl(var(--primary))" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold", children: Math.round(report.overallScore) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "ATS Score" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-panel p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[10px] uppercase tracking-widest text-muted-foreground", children: "Recruiter take" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: report.recruiterTake }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: radarData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "metric", tick: {
            fill: "hsl(var(--muted-foreground))",
            fontSize: 10
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarRadiusAxis, { domain: [0, 100], tick: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { dataKey: "value", stroke: "hsl(var(--spark))", fill: "hsl(var(--spark))", fillOpacity: 0.35 })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Matched keywords", items: report.matchedKeywords, tone: "ok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Missing keywords", items: report.missingKeywords, tone: "warn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Strengths", items: report.strengths, tone: "ok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Improvements", items: report.improvements, tone: "warn" })
    ] })
  ] });
}
function ListCard({
  title,
  items,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-panel p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md border px-2 py-0.5 text-[11px] ${tone === "ok" ? "border-spark/40 bg-spark/10 text-foreground" : "border-destructive/40 bg-destructive/10 text-foreground"}`, children: it }, i)) })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] uppercase tracking-widest text-spark", children: title }),
    children
  ] });
}
function Chip({
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
    children
  ] });
}
function TabBtn({
  active,
  onClick,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition ${active ? "bg-gradient-spark text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
    " ",
    children
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
function Input({
  value,
  onChange,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder, className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" });
}
function TextArea({
  value,
  onChange,
  rows,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows, placeholder, className: "w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm" });
}
export {
  ResumePage as component
};
