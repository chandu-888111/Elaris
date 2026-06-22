import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as Sparkles } from "../_libs/lucide-react.mjs";
function Logo({ to = "/", className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: `group inline-flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-spark shadow-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-xl animate-pulse-ring" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-semibold tracking-tight", children: [
      "Project",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Spark" })
    ] })
  ] });
}
export {
  Logo as L
};
