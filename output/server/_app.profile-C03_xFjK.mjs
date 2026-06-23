import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useAuth, d as PageShell, e as PageHeader } from "./_ssr/router-DtXO_wcb.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { L as LoaderCircle, ac as User, aq as Save, W as Icons, J as Trophy, aj as Lock, r as Check } from "./_libs/lucide-react.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-BioNg-KZ.mjs";
import "./_libs/seroval.mjs";
import { m as motion } from "./_libs/framer-motion.mjs";
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
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
const ALL_ACHIEVEMENTS = [{
  code: "first-project",
  title: "First Spark",
  description: "Generate your first AI project idea.",
  icon: "Sparkles",
  xp: 50
}, {
  code: "save-roadmap",
  title: "Curriculum Architect",
  description: "Design and save a custom career roadmap.",
  icon: "Compass",
  xp: 50
}, {
  code: "save-study",
  title: "Focused Learner",
  description: "Create and save a weekly study guide.",
  icon: "GraduationCap",
  xp: 50
}, {
  code: "save-blueprint",
  title: "AI Builder Pro",
  description: "Generate a production code blueprint.",
  icon: "Code2",
  xp: 75
}, {
  code: "first-chat",
  title: "Curious Mind",
  description: "Initiate a chat discussion with AI.",
  icon: "MessageSquare",
  xp: 50
}, {
  code: "perfect-quiz",
  title: "Perfect Score",
  description: "Answer all mini-quiz questions correctly.",
  icon: "Brain",
  xp: 75
}];
function Profile() {
  const {
    user
  } = useAuth();
  const [displayName, setDisplayName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [xp, setXp] = reactExports.useState(0);
  const [streak, setStreak] = reactExports.useState(0);
  const [unlocked, setUnlocked] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const [profileRes, achievementsRes] = await Promise.all([supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(), supabase.from("achievements").select("code").eq("user_id", user.id)]);
      if (profileRes.data) {
        const data = profileRes.data;
        setDisplayName(data.display_name ?? "");
        setBio(data.bio ?? "");
        setAvatarUrl(data.avatar_url ?? "");
        setXp(data.xp ?? 0);
        setStreak(data.streak_days ?? 0);
      }
      if (achievementsRes.data) {
        setUnlocked(achievementsRes.data.map((a) => a.code));
      }
      setLoading(false);
    })();
  }, [user]);
  const save = async () => {
    if (!user) return;
    setSaving(true);
    setMsg(null);
    const {
      error
    } = await supabase.from("profiles").update({
      display_name: displayName,
      bio,
      avatar_url: avatarUrl
    }).eq("id", user.id);
    setSaving(false);
    setMsg(error ? error.message : "Saved");
    setTimeout(() => setMsg(null), 2e3);
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-6 w-6 animate-spin text-spark" }) });
  const level = Math.floor(xp / 500) + 1;
  const currentLevelXp = xp % 500;
  const percent = Math.round(currentLevelXp / 500 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: User, title: "Profile", description: "How you appear across ProjectSpark." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[300px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-gradient-spark text-3xl text-primary-foreground shadow-glow", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "", className: "h-full w-full object-cover" }) : (displayName || user?.email || "U")[0].toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold", children: displayName || user?.email?.split("@")[0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-4 border-t border-white/5 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-16 w-16 flex items-center justify-center shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-full w-full -rotate-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "26", className: "stroke-white/5", strokeWidth: "4", fill: "transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "26", className: "stroke-spark", strokeWidth: "4", fill: "transparent", strokeDasharray: 2 * Math.PI * 26, strokeDashoffset: 2 * Math.PI * 26 * (1 - percent / 100), strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute font-display text-sm font-bold text-foreground", children: level })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold", children: [
                "Level ",
                level,
                " Builder"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                currentLevelXp,
                "/500 XP (",
                percent,
                "%)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-white/5 bg-background/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StreakFlame, { days: streak }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: "Active Streak" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                streak,
                " consecutive days"
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-6 backdrop-blur space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Display name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: displayName, onChange: (e) => setDisplayName(e.target.value), className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Avatar URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: avatarUrl, onChange: (e) => setAvatarUrl(e.target.value), placeholder: "https://…", className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bio", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: bio, onChange: (e) => setBio(e.target.value), rows: 4, placeholder: "Tell us what you're building…", className: "w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "inline-flex items-center gap-2 rounded-xl bg-gradient-spark px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50", children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            "Save changes"
          ] }),
          msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-spark", children: msg })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-6 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-display text-sm font-semibold uppercase tracking-wider text-spark", children: "My Achievements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: ALL_ACHIEVEMENTS.map((a) => {
            const isUnlocked = unlocked.includes(a.code);
            const IconComp = Icons[a.icon] || Trophy;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-3.5 rounded-2xl border p-4 transition-all duration-300 ${isUnlocked ? "border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_oklch(0.8_0.16_140_/_0.03)]" : "border-white/5 bg-white/2 opacity-60"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isUnlocked ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-muted-foreground"}`, children: isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: `text-sm font-semibold ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`, children: a.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[9px] font-bold uppercase ${isUnlocked ? "text-emerald-400" : "text-muted-foreground"}`, children: [
                    "+",
                    a.xp,
                    " XP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2", children: a.description }),
                isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1.5 inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5" }),
                  " Unlocked"
                ] })
              ] })
            ] }, a.code);
          }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-xs uppercase tracking-widest text-muted-foreground font-semibold", children: label }),
    children
  ] });
}
function StreakFlame({
  days
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.svg, { animate: {
      scale: days > 0 ? [1, 1.08, 1] : 1,
      y: days > 0 ? [0, -3, 0] : 0
    }, transition: {
      repeat: Infinity,
      duration: 1.8,
      ease: "easeInOut"
    }, className: `h-10 w-10 text-orange-500 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] ${days > 0 ? "opacity-100" : "opacity-25"}`, viewBox: "0 0 24 24", fill: "currentColor", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2c-.5 0-.9.2-1.2.6C7.5 7.1 6.5 10 6.5 12.5c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5c0-2.5-1-5.4-4.3-9.9-.3-.4-.7-.6-1.2-.6zm0 2.5c2.3 3.6 2.8 5.7 2.8 7.5 0 1.5-1.3 2.8-2.8 2.8S9.2 13.5 9.2 12c0-1.8.5-3.9 2.8-7.5z" }),
      days > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 16.5c-1.38 0-2.5-1.12-2.5-2.5 0-1 .6-2.1 2.5-4 1.9 1.9 2.5 3 2.5 4 0 1.38-1.12 2.5-2.5 2.5z", className: "text-amber-400" })
    ] }),
    days > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-[10px] font-bold text-white mt-1 select-none font-display", children: days })
  ] });
}
export {
  Profile as component
};
