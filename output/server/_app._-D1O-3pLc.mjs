import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { f as useRouterState, L as Link } from "./_libs/tanstack__react-router.mjs";
import { d as PageShell, e as PageHeader } from "./_ssr/router-DT2A3-T4.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/client-DwafHdRl.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/seroval.mjs";
import { b as TriangleAlert } from "./_libs/lucide-react.mjs";
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
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
function NotFound() {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: TriangleAlert, title: "Page not found", description: `Nothing lives at "${path}". Try one of the active modules below.` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/generator", className: "rounded-lg bg-gradient-spark px-3 py-1.5 text-xs font-medium text-primary-foreground", children: "Project Generator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: "AI Builder" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/roadmap", className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: "Roadmap" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mentor", className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: "Mentor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat", className: "rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: "AI Chat" })
    ] }) })
  ] });
}
export {
  NotFound as component
};
