import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-DwafHdRl.mjs";
import { aO as History, L as LoaderCircle } from "../_libs/lucide-react.mjs";
function SessionPicker({
  table,
  select,
  toRow,
  onPick,
  label = "Resume previous"
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [rows, setRows] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open || rows !== null) return;
    setLoading(true);
    supabase.from(table).select(select).order("created_at", { ascending: false }).limit(12).then(({ data, error }) => {
      if (error) console.error("[SessionPicker]", error);
      setRows(data ?? []);
      setLoading(false);
    });
  }, [open, rows, table, select]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs hover:bg-card transition",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3.5 w-3.5" }),
          label
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full z-30 mt-2 w-80 overflow-hidden rounded-xl border border-border glass-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground", children: "Recent sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-80 overflow-y-auto", "data-lenis-prevent": true, children: [
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-6 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) }),
        !loading && rows && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-6 text-center text-xs text-muted-foreground", children: "No saved sessions yet." }),
        !loading && rows?.map((r) => {
          const row = toRow(r);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                onPick(r);
                setOpen(false);
              },
              className: "block w-full border-b border-border/60 px-3 py-2.5 text-left text-sm last:border-b-0 hover:bg-white/5 transition",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: row.label }),
                row.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-[11px] text-muted-foreground", children: row.meta }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[10px] text-muted-foreground", children: new Date(r.created_at).toLocaleString() })
              ]
            },
            r.id
          );
        })
      ] })
    ] })
  ] });
}
export {
  SessionPicker as S
};
