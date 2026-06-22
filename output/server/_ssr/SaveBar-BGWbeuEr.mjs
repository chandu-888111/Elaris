import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SessionPicker } from "./SessionPicker-CrpRw6VW.mjs";
import { L as LoaderCircle, r as Check, aq as Save } from "../_libs/lucide-react.mjs";
function SaveBar(p) {
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  const handle = async () => {
    if (!p.canSave || saving) return;
    setSaving(true);
    try {
      await p.onSave();
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SessionPicker,
      {
        table: p.pickerTable,
        select: p.pickerSelect,
        toRow: p.pickerToRow,
        onPick: p.pickerOnPick
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handle,
        disabled: !p.canSave || saving,
        className: "inline-flex items-center gap-1.5 rounded-lg bg-gradient-spark px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow transition hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100",
        children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          saving ? "Saving…" : saved ? "Saved" : "Save"
        ]
      }
    )
  ] });
}
export {
  SaveBar as S
};
