import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useAuth, d as PageShell, e as PageHeader } from "./_ssr/router-DT2A3-T4.mjs";
import { J as Trophy, w as Search, W as Icons, a8 as CodeXml, a5 as ArrowRight } from "./_libs/lucide-react.mjs";
import { a as DOMAINS, C as CATEGORIES } from "./_ssr/domains-NgPH8Jrf.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as SEED_ROADMAPS } from "./_ssr/roadmap-catalog-DXzHCKoR.mjs";
import { g as getAllDomainsProgress } from "./_ssr/roadmap.functions-DYP5wcCL.mjs";
import { u as useServerFn } from "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/client-DwafHdRl.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/auth-middleware-Bg7BSutF.mjs";
import "./_libs/seroval.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/react-three__fiber.mjs";
import "./_libs/three.mjs";
import "./_libs/zustand.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/scheduler.mjs";
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
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/three-stdlib.mjs";
import "./_libs/troika-three-text.mjs";
import "./_libs/troika-worker-utils.mjs";
import "./_libs/webgl-sdf-generator.mjs";
import "./_libs/bidi-js.mjs";
import "./_libs/troika-three-utils.mjs";
import "./_libs/suspend-react.mjs";
import "./_libs/tunnel-rat.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
const COLOR_CLASSES = {
  violet: {
    border: "group-hover:border-violet-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.65_0.22_290_/_0.2)]",
    text: "text-violet-400",
    bg: "bg-violet-500/10"
  },
  cyan: {
    border: "group-hover:border-cyan-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.74_0.16_200_/_0.2)]",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10"
  },
  emerald: {
    border: "group-hover:border-emerald-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.80_0.16_140_/_0.2)]",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  indigo: {
    border: "group-hover:border-indigo-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.60_0.20_270_/_0.2)]",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10"
  },
  blue: {
    border: "group-hover:border-blue-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.60_0.18_250_/_0.2)]",
    text: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  sky: {
    border: "group-hover:border-sky-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.70_0.15_220_/_0.2)]",
    text: "text-sky-400",
    bg: "bg-sky-500/10"
  },
  orange: {
    border: "group-hover:border-orange-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.65_0.20_40_/_0.2)]",
    text: "text-orange-400",
    bg: "bg-orange-500/10"
  },
  rose: {
    border: "group-hover:border-rose-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.65_0.22_25_/_0.2)]",
    text: "text-rose-400",
    bg: "bg-rose-500/10"
  },
  fuchsia: {
    border: "group-hover:border-fuchsia-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.65_0.22_320_/_0.2)]",
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10"
  },
  teal: {
    border: "group-hover:border-teal-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.65_0.15_170_/_0.2)]",
    text: "text-teal-400",
    bg: "bg-teal-500/10"
  },
  amber: {
    border: "group-hover:border-amber-500/40",
    glow: "group-hover:shadow-[0_0_20px_oklch(0.75_0.15_80_/_0.2)]",
    text: "text-amber-400",
    bg: "bg-amber-500/10"
  }
};
function DomainCard({
  slug,
  name,
  category,
  blurb,
  tags,
  icon,
  colorTheme,
  galaxyCluster,
  completedCount = 0,
  totalCount = 0
}) {
  const iconsRecord = Icons;
  const LucideIcon = iconsRecord[icon] || CodeXml;
  const colors = COLOR_CLASSES[colorTheme] || COLOR_CLASSES.blue;
  const progressPercentage = totalCount ? Math.round(completedCount / totalCount * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/roadmap/$slug",
      params: { slug },
      className: `group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:bg-card/80 hover:-translate-y-1 ${colors.border} ${colors.glow}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text} shadow-inner`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LucideIcon, { className: "h-5 w-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-semibold tracking-tight text-foreground transition group-hover:text-gradient", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2", children: blurb }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1", children: tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "rounded-lg bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground",
              children: [
                "#",
                tag
              ]
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border-t border-white/5 pt-4", children: totalCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-[10px] font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              progressPercentage,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full overflow-hidden rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-gradient-spark transition-all duration-500",
              style: { width: `${progressPercentage}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1.5 block text-[9px] uppercase tracking-wider text-muted-foreground", children: [
            completedCount,
            " of ",
            totalCount,
            " nodes completed"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest", children: galaxyCluster }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] text-spark transition-transform group-hover:translate-x-0.5", children: [
            "Explore path ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] })
        ] }) })
      ]
    }
  );
}
function Resources() {
  const [q, setQ] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const {
    user
  } = useAuth();
  const fetchAllProgress = useServerFn(getAllDomainsProgress);
  const [progressMap, setProgressMap] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!user) return;
    fetchAllProgress({}).then(({
      progress
    }) => setProgressMap(progress)).catch(() => {
    });
  }, [user, fetchAllProgress]);
  const filtered = DOMAINS.filter((d) => {
    const matchesCategory = !selectedCategory || d.category === selectedCategory;
    const searchLower = q.toLowerCase();
    const matchesQuery = !q || d.name.toLowerCase().includes(searchLower) || d.category.toLowerCase().includes(searchLower) || d.blurb.toLowerCase().includes(searchLower) || d.tags.some((t) => t.toLowerCase().includes(searchLower)) || // Match nodes in seeded roadmaps for this domain
    SEED_ROADMAPS[d.slug] && Object.values(SEED_ROADMAPS[d.slug]).some((tier) => tier.nodes.some((n) => n.title.toLowerCase().includes(searchLower) || n.why.toLowerCase().includes(searchLower)));
    return matchesCategory && matchesQuery;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Trophy, title: "Learning Resources & Tracks", description: "Explore interactive roadmaps across 100+ specialized engineering & science tracks. Generated by AI and tracked with real-time progress.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground sm:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Press" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground border border-white/10", children: "Ctrl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground border border-white/10", children: "K" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "to search globally" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search learning paths, skills, or topics (e.g. Hooks, Sklearn)...", className: "w-full rounded-xl border border-border bg-card/60 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 pr-1 max-h-[120px] overflow-y-auto md:max-h-none md:overflow-visible", "data-lenis-prevent": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedCategory(null), className: `rounded-full border px-3 py-1 text-xs transition ${!selectedCategory ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: "All" }),
        CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedCategory(cat), className: `rounded-full border px-3 py-1 text-xs transition ${selectedCategory === cat ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`, children: cat }, cat))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: [
      filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(DomainCard, { ...d, completedCount: progressMap[d.slug]?.completedCount ?? 0, totalCount: progressMap[d.slug]?.totalCount ?? 0 }, d.slug)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-16 text-center text-sm text-muted-foreground glass rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto h-8 w-8 text-spark/60 animate-bounce mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground", children: "No tracks match your query" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs", children: "Try searching for other general skills or press Ctrl+K." })
      ] })
    ] })
  ] });
}
export {
  Resources as component
};
