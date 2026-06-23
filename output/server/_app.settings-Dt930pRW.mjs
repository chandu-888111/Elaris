import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth, d as PageShell, e as PageHeader } from "./_ssr/router-DtXO_wcb.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { T as ThemeToggle } from "./_ssr/ThemeToggle-Dilb7rBT.mjs";
import { c as createServerFn, a as createSsrRpc } from "./_ssr/ai-BioNg-KZ.mjs";
import { r as requireSupabaseAuth } from "./_ssr/auth-middleware-IU1Y2FXs.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_libs/seroval.mjs";
import { ab as Settings, aj as Lock, ak as Bell, ae as LogOut, L as LoaderCircle, al as Trash2, am as UserMinus } from "./_libs/lucide-react.mjs";
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
const deleteCurrentUserAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("aa5c6ff2f1b50a0696b66e3fe430122cb99f6d2cb1bdac8763c2511f4610ca48"));
function SettingsPage() {
  const {
    user,
    signOut
  } = useAuth();
  const nav = useNavigate();
  const [notify, setNotify] = reactExports.useState(true);
  const [emails, setEmails] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  const onResetPwd = async () => {
    if (!user?.email) return;
    setBusy(true);
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(user.email);
    setBusy(false);
    setMsg(error ? error.message : "Password reset email sent.");
    setTimeout(() => setMsg(null), 3e3);
  };
  const onDelete = async () => {
    if (!confirm("Permanently delete all your projects and chats? This cannot be undone.")) return;
    setBusy(true);
    await Promise.all([supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000"), supabase.from("chat_threads").delete().neq("id", "00000000-0000-0000-0000-000000000000"), supabase.from("chat_messages").delete().neq("id", "00000000-0000-0000-0000-000000000000"), supabase.from("daily_progress").delete().neq("id", "00000000-0000-0000-0000-000000000000")]);
    setBusy(false);
    setMsg("All data cleared.");
  };
  const onDeleteAccount = async () => {
    if (!confirm("Are you absolutely sure you want to delete your account? This will permanently delete your login, profile, and all data. This action is irreversible.")) return;
    setBusy(true);
    try {
      const {
        error: rpcError
      } = await supabase.rpc("delete_user_account");
      if (rpcError) {
        console.warn("[settings] RPC deletion failed, falling back to server function:", rpcError);
        const res = await deleteCurrentUserAccount();
        if (!res?.success) {
          throw new Error("Failed to delete account via server function");
        }
      }
      await signOut();
      nav({
        to: "/"
      });
    } catch (err) {
      console.error("[settings] Deletion error:", err);
      setMsg(err.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Settings, title: "Settings", description: "Account, preferences, and data controls." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Account", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: user?.email ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onResetPwd, disabled: busy, className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60 disabled:opacity-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
          " Send password reset"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Preferences", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { icon: Bell, label: "In-app notifications", checked: notify, onChange: setNotify }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { icon: Bell, label: "Email digest", hint: "Weekly summary of your progress", checked: emails, onChange: setEmails })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Danger zone", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => signOut().then(() => nav({
          to: "/"
        })), className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-card/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
          " Sign out"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onDelete, disabled: busy, className: "inline-flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20 disabled:opacity-50", children: [
          busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " ",
          "Erase all my data"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onDeleteAccount, disabled: busy, className: "inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive/20 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/30 disabled:opacity-50", children: [
          busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "h-3.5 w-3.5" }),
          " ",
          "Delete my account"
        ] })
      ] }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-spark", children: msg })
    ] })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start gap-3", children })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 text-sm flex-1 min-w-[240px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value })
  ] });
}
function Toggle({
  icon: Icon,
  label,
  hint,
  checked,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-spark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        label,
        hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground", children: hint })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!checked, onChange: (e) => onChange?.(e.target.checked), className: "h-4 w-4 accent-spark" })
  ] });
}
export {
  SettingsPage as component
};
