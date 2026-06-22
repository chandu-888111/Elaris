import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { u as useAuth } from "./_ssr/router-DT2A3-T4.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/seroval.mjs";
import { M as MessageSquare, L as LoaderCircle, h as Sparkles } from "./_libs/lucide-react.mjs";
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
function ChatEmpty() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const start = async () => {
    if (!user) return;
    setLoading(true);
    const {
      data
    } = await supabase.from("chat_threads").insert({
      user_id: user.id,
      title: "New chat"
    }).select("id").single();
    setLoading(false);
    if (data) navigate({
      to: "/chat/$threadId",
      params: {
        threadId: data.id
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center gap-4 p-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-spark text-primary-foreground shadow-glow animate-float", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "ProjectSpark AI" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-sm text-muted-foreground", children: "Your always-on mentor for ideas, code, learning, and architecture. Start a thread to begin." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: start, disabled: loading, className: "inline-flex items-center gap-2 rounded-xl bg-gradient-spark px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      "New conversation"
    ] })
  ] });
}
export {
  ChatEmpty as component
};
