import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { M as Markdown$1 } from "../_libs/react-markdown.mjs";
import { r as remarkGfm } from "../_libs/remark-gfm.mjs";
import { r as Check, o as Copy } from "../_libs/lucide-react.mjs";
function CodeBlock({ children, className }) {
  const [copied, setCopied] = reactExports.useState(false);
  const text = String(children ?? "").replace(/\n$/, "");
  const lang = /language-(\w+)/.exec(className ?? "")?.[1];
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative my-3 overflow-hidden rounded-xl border border-border bg-background/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border bg-card/40 px-3 py-1.5 text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: lang ?? "code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: copy,
          className: "inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:text-foreground",
          children: [
            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
            copied ? "Copied" : "Copy"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto p-3 text-[12.5px] leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className, children: text }) })
  ] });
}
function Markdown({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "markdown-body text-sm leading-relaxed [&_p]:my-2 [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:font-display [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:my-0.5 [&_a]:text-spark [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-spark [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_table]:my-2 [&_table]:w-full [&_th]:border [&_th]:border-border [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_strong]:font-semibold [&_hr]:my-4 [&_hr]:border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Markdown$1,
    {
      remarkPlugins: [remarkGfm],
      components: {
        code({ className, children: children2, ...props }) {
          const isBlock = /language-/.test(className ?? "") || String(children2 ?? "").includes("\n");
          if (isBlock) return /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { className, children: children2 });
          return /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-card/70 px-1.5 py-0.5 font-mono text-[12.5px]", ...props, children: children2 });
        }
      },
      children
    }
  ) });
}
export {
  Markdown as M
};
