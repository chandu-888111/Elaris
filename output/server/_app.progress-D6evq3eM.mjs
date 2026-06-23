import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useAuth, d as PageShell, e as PageHeader } from "./_ssr/router-DtXO_wcb.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-BioNg-KZ.mjs";
import "./_libs/seroval.mjs";
import { a9 as CalendarCheck, F as Flame, ag as Target, L as LoaderCircle, q as Plus } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
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
function ProgressPage() {
  const {
    user
  } = useAuth();
  const [entries, setEntries] = reactExports.useState([]);
  const [minutes, setMinutes] = reactExports.useState(60);
  const [notes, setNotes] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const {
        data
      } = await supabase.from("daily_progress").select("id, day, minutes, xp_earned, notes").order("day", {
        ascending: false
      }).limit(60);
      setEntries(data ?? []);
      setLoading(false);
    })();
  }, [user]);
  const log = async () => {
    if (!user) return;
    setSaving(true);
    const xp = Math.round(minutes / 2);
    const {
      data,
      error
    } = await supabase.from("daily_progress").insert({
      user_id: user.id,
      day: today,
      minutes,
      xp_earned: xp,
      notes: notes || null
    }).select("id, day, minutes, xp_earned, notes").single();
    setSaving(false);
    if (!error && data) {
      setEntries((e) => [data, ...e]);
      setNotes("");
      await supabase.rpc;
      const totalXp2 = (await supabase.from("profiles").select("xp").eq("id", user.id).maybeSingle()).data?.xp ?? 0;
      await supabase.from("profiles").update({
        xp: totalXp2 + xp
      }).eq("id", user.id);
    }
  };
  const dates = new Set(entries.map((e) => e.day));
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    if (dates.has(d)) streak++;
    else break;
  }
  const totalMinutes = entries.reduce((a, e) => a + e.minutes, 0);
  const totalXp = entries.reduce((a, e) => a + e.xp_earned, 0);
  const heat = Array.from({
    length: 30
  }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 864e5).toISOString().slice(0, 10);
    const e = entries.find((x) => x.day === d);
    return {
      d,
      mins: e?.minutes ?? 0
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: CalendarCheck, title: "Daily Progress", description: "Log focused minutes, earn XP, and keep the streak alive." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[360px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Streak", value: `${streak}d`, icon: Flame }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Total XP", value: totalXp, icon: Target }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mini, { label: "Hours", value: `${(totalMinutes / 60).toFixed(1)}h`, icon: CalendarCheck })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: [
            "Minutes today: ",
            minutes
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 5, max: 240, step: 5, value: minutes, onChange: (e) => setMinutes(+e.target.value), className: "w-full accent-spark" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground", children: "Notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), rows: 3, placeholder: "What did you learn?", className: "w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: log, disabled: saving, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          "Log today (+",
          Math.round(minutes / 2),
          " XP)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Last 30 days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: heat.map((h) => {
            const intensity = h.mins === 0 ? 0 : h.mins < 30 ? 1 : h.mins < 60 ? 2 : h.mins < 120 ? 3 : 4;
            const bg = ["bg-muted/40", "bg-spark/20", "bg-spark/40", "bg-spark/60", "bg-spark"][intensity];
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { title: `${h.d}: ${h.mins} min`, className: `h-6 w-6 rounded ${bg}` }, h.d);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground", children: "Recent entries" }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-5 w-5 animate-spin text-spark" }) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No entries yet — log your first session." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: entries.slice(0, 12).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between gap-3 py-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: new Date(e.day).toLocaleDateString(void 0, {
                weekday: "short",
                month: "short",
                day: "numeric"
              }) }),
              e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: e.notes })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono", children: [
                e.minutes,
                " min"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-spark", children: [
                "+",
                e.xp_earned,
                " XP"
              ] })
            ] })
          ] }, e.id)) })
        ] })
      ] })
    ] })
  ] });
}
function Mini({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/40 p-2 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mx-auto h-3.5 w-3.5 text-spark" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-base", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-muted-foreground", children: label })
  ] });
}
export {
  ProgressPage as component
};
