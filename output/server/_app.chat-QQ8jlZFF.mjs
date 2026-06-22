import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate, g as useParams, O as Outlet, L as Link } from "./_libs/tanstack__react-router.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { u as useAuth } from "./_ssr/router-DT2A3-T4.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-DTqZfz-A.mjs";
import "./_libs/seroval.mjs";
import { aE as ChevronLeft, L as LoaderCircle, q as Plus, M as MessageSquare, X, aF as Pin, al as Trash2 } from "./_libs/lucide-react.mjs";
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
function ChatLayout() {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const params = useParams({
    strict: false
  });
  const [threads, setThreads] = reactExports.useState(null);
  const [creating, setCreating] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    const {
      data
    } = await supabase.from("chat_threads").select("id, title, pinned, updated_at").not("title", "like", "Mentor:%").order("pinned", {
      ascending: false
    }).order("updated_at", {
      ascending: false
    });
    setThreads(data ?? []);
  }, []);
  reactExports.useEffect(() => {
    if (user) load();
  }, [user, load]);
  reactExports.useEffect(() => {
    setMobileOpen(false);
  }, [params.threadId]);
  const create = async () => {
    if (!user) return;
    setCreating(true);
    const {
      data,
      error
    } = await supabase.from("chat_threads").insert({
      user_id: user.id,
      title: "New chat"
    }).select("id").single();
    setCreating(false);
    if (error || !data) return;
    await load();
    navigate({
      to: "/chat/$threadId",
      params: {
        threadId: data.id
      }
    });
  };
  const togglePin = async (t) => {
    await supabase.from("chat_threads").update({
      pinned: !t.pinned
    }).eq("id", t.id);
    load();
  };
  const remove = async (id) => {
    await supabase.from("chat_messages").delete().eq("thread_id", id);
    await supabase.from("chat_threads").delete().eq("id", id);
    if (params.threadId === id) navigate({
      to: "/chat"
    });
    load();
  };
  const ThreadList = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-medium", children: "Conversations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: create, disabled: creating, className: "rounded-lg bg-gradient-spark p-1.5 text-primary-foreground shadow-glow disabled:opacity-50", "aria-label": "New chat", children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(false), className: "md:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 transition", "aria-label": "Close", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-2 py-2", "data-lenis-prevent": true, children: [
      !threads && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-2", children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 animate-pulse rounded-lg bg-card/40" }, i)) }),
      threads && threads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-6 text-center text-xs text-muted-foreground", children: "No chats yet." }),
      threads?.map((t) => {
        const active = params.threadId === t.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group flex items-center gap-1 rounded-lg px-1 ${active ? "bg-card/70" : "hover:bg-card/40"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/chat/$threadId", params: {
            threadId: t.id
          }, className: "flex-1 truncate px-2 py-2.5 text-sm", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: t.title || "Untitled" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePin(t), className: "rounded p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-spark", "aria-label": "Pin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: `h-3 w-3 ${t.pinned ? "fill-spark text-spark opacity-100" : ""}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(t.id), className: "rounded p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
        ] }, t.id);
      })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "glass hidden w-72 shrink-0 flex-col md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThreadList, {}) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex md:hidden", onClick: () => setMobileOpen(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass w-72 flex flex-col shadow-2xl", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThreadList, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-black/50" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMobileOpen(true), className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-white/10 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
          "Chats"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-muted-foreground flex-1 text-center", children: params.threadId ? threads?.find((t) => t.id === params.threadId)?.title || "Chat" : "New Conversation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: create, disabled: creating, className: "rounded-lg bg-gradient-spark p-1.5 text-primary-foreground shadow-glow disabled:opacity-50", "aria-label": "New chat", children: creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  ChatLayout as component
};
