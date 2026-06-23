import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate, f as useRouterState, L as Link, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth, b as useSceneStore, c as playSweep, A as AsteroidBackground, p as playClick, a as playHover, P as PageTransition } from "./_ssr/router-DtXO_wcb.mjs";
import { L as Logo } from "./_ssr/Logo-AqCW_hF-.mjs";
import { L as Lenis } from "./_libs/lenis.mjs";
import { T as ThemeToggle } from "./_ssr/ThemeToggle-Dilb7rBT.mjs";
import { L as LoaderCircle, a6 as LayoutDashboard, h as Sparkles, f as Bookmark, g as Brain, G as GraduationCap, M as MessageSquare, a7 as Compass, a8 as CodeXml, a9 as CalendarCheck, aa as ChartColumn, J as Trophy, Q as FileText, C as Cpu, p as ShoppingBag, U as Users, i as FolderHeart, t as Terminal, v as BookOpen, ab as Settings, ac as User, ad as Info, ae as LogOut, af as Menu, w as Search, W as Icons, ag as Target } from "./_libs/lucide-react.mjs";
import { _ as _e } from "./_libs/cmdk.mjs";
import { a as DOMAINS } from "./_ssr/domains-NgPH8Jrf.mjs";
import { S as SEED_ROADMAPS } from "./_ssr/roadmap-catalog-DXzHCKoR.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/client-DwafHdRl.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import "./_ssr/ai-BioNg-KZ.mjs";
import "./_libs/seroval.mjs";
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
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
let instance = null;
function useLenis() {
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    if (instance) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });
    instance = lenis;
    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
      instance = null;
    };
  }, []);
}
function SearchPalette() {
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  if (!open) return null;
  const searchLower = search.toLowerCase();
  const matchedDomains = DOMAINS.filter(
    (d) => d.name.toLowerCase().includes(searchLower) || d.category.toLowerCase().includes(searchLower) || d.blurb.toLowerCase().includes(searchLower) || d.tags.some((t) => t.toLowerCase().includes(searchLower))
  ).slice(0, 5);
  const matchedNodes = [];
  if (searchLower.length >= 2) {
    Object.entries(SEED_ROADMAPS).forEach(([slug, tiers]) => {
      const domainName = DOMAINS.find((d) => d.slug === slug)?.name ?? slug;
      Object.entries(tiers).forEach(([tier, data]) => {
        data.nodes.forEach((node) => {
          if (node.title.toLowerCase().includes(searchLower) || node.why.toLowerCase().includes(searchLower)) {
            if (!matchedNodes.some((n) => n.nodeId === node.id && n.domainSlug === slug)) {
              matchedNodes.push({
                domainSlug: slug,
                domainName,
                nodeId: node.id,
                nodeTitle: node.title,
                why: node.why
              });
            }
          }
        });
      });
    });
  }
  const handleSelect = (to, params, searchParams) => {
    setOpen(false);
    setSearch("");
    navigate({ to, params, search: searchParams });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-sm",
      onClick: () => setOpen(false),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-glow backdrop-blur-md animate-in fade-in zoom-in-95 duration-200",
          onClick: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(_e, { label: "Global Command Palette", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b border-white/5 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                _e.Input,
                {
                  autoFocus: true,
                  placeholder: "Type a domain, skill, or topic...",
                  value: search,
                  onValueChange: setSearch,
                  className: "flex h-12 w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpen(false),
                  className: "rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-white/10 hover:text-foreground",
                  children: "ESC"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(_e.List, { className: "max-h-[300px] overflow-y-auto p-2", "data-lenis-prevent": true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { className: "py-6 text-center text-sm text-muted-foreground", children: "No results found." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                _e.Group,
                {
                  heading: "Navigation",
                  className: "px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Item,
                      {
                        onSelect: () => handleSelect("/dashboard"),
                        icon: LayoutDashboard,
                        title: "Dashboard",
                        desc: "View learning progress and profile metrics"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Item,
                      {
                        onSelect: () => handleSelect("/roadmap"),
                        icon: Compass,
                        title: "Roadmap Planner",
                        desc: "Personalized and custom learning roadmaps"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Item,
                      {
                        onSelect: () => handleSelect("/resources"),
                        icon: Trophy,
                        title: "Resources Hub",
                        desc: "Explore catalog of all learning tracks"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Item,
                      {
                        onSelect: () => handleSelect("/mentor"),
                        icon: Brain,
                        title: "AI Mentor",
                        desc: "Interactive personalized lesson designer"
                      }
                    )
                  ] })
                }
              ),
              matchedDomains.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                _e.Group,
                {
                  heading: "Learning Tracks",
                  className: "mt-4 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 space-y-0.5", children: matchedDomains.map((d) => {
                    const iconsRecord = Icons;
                    const DynIcon = iconsRecord[d.icon] || CodeXml;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Item,
                      {
                        onSelect: () => handleSelect("/roadmap/$slug", { slug: d.slug }),
                        icon: DynIcon,
                        title: d.name,
                        desc: d.blurb
                      },
                      d.slug
                    );
                  }) })
                }
              ),
              matchedNodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                _e.Group,
                {
                  heading: "Roadmap Topics & Skills",
                  className: "mt-4 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 space-y-0.5", children: matchedNodes.slice(0, 4).map((node) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Item,
                    {
                      onSelect: () => handleSelect(
                        "/roadmap/$slug",
                        { slug: node.domainSlug },
                        { node: node.nodeId }
                      ),
                      icon: Target,
                      title: node.nodeTitle,
                      desc: `${node.domainName} · ${node.why}`
                    },
                    `${node.domainSlug}-${node.nodeId}`
                  )) })
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function Item({
  onSelect,
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    _e.Item,
    {
      onSelect,
      className: "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground outline-none transition duration-150 aria-selected:bg-white/5 hover:bg-white/5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-spark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground leading-snug", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground leading-normal", children: desc })
        ] })
      ]
    }
  );
}
const NAV = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    to: "/generator",
    label: "Project Generator",
    icon: Sparkles
  },
  {
    to: "/saved",
    label: "Saved",
    icon: Bookmark
  },
  {
    to: "/mentor",
    label: "AI Mentor",
    icon: Brain
  },
  {
    to: "/study-guide",
    label: "Study Guide",
    icon: GraduationCap
  },
  {
    to: "/chat",
    label: "Chatbot",
    icon: MessageSquare
  },
  {
    to: "/roadmap",
    label: "Roadmap Planner",
    icon: Compass
  },
  {
    to: "/builder",
    label: "AI Project Builder",
    icon: CodeXml
  },
  {
    to: "/progress",
    label: "Daily Progress",
    icon: CalendarCheck
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: ChartColumn
  },
  {
    to: "/resources",
    label: "Resources Hub",
    icon: Trophy
  },
  {
    to: "/resume",
    label: "Resume & ATS",
    icon: FileText
  },
  // Developer OS modules
  {
    to: "/build-your-own-x",
    label: "Build Your Own X",
    icon: Cpu
  },
  {
    to: "/marketplace",
    label: "Project Marketplace",
    icon: ShoppingBag
  },
  {
    to: "/collaboration",
    label: "Collaboration Hub",
    icon: Users
  },
  {
    to: "/portfolio",
    label: "Portfolio Builder",
    icon: FolderHeart
  },
  {
    to: "/job-prep",
    label: "Interview Prep",
    icon: Terminal
  },
  {
    to: "/books",
    label: "Books & Docs Hub",
    icon: BookOpen
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User
  },
  {
    to: "/about",
    label: "About",
    icon: Info
  }
];
function AppLayout() {
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  const {
    user,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  const isChat = path.startsWith("/chat");
  const setScene = useSceneStore((s) => s.setScene);
  useLenis();
  reactExports.useEffect(() => {
    if (instance) {
      instance.resize();
      instance.scrollTo(0, {
        immediate: true
      });
    }
  }, [path]);
  reactExports.useEffect(() => {
    playSweep();
    if (path.startsWith("/chat")) {
      setScene("chat");
    } else if (path.startsWith("/mentor")) {
      setScene("mentor");
    } else if (path.startsWith("/roadmap")) {
      setScene("roadmap");
    } else if (path.startsWith("/study-guide")) {
      setScene("study-guide");
    } else if (path.startsWith("/analytics")) {
      setScene("analytics");
    } else {
      setScene("dashboard");
    }
  }, [path, setScene]);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [user, loading, navigate]);
  if (loading || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-spark" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-svh w-full overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AsteroidBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchPalette, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "sticky top-0 z-20 hidden w-64 shrink-0 flex-col glass-panel rounded-none border-y-0 border-l-0 px-4 py-6 lg:flex h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto mt-8 [&::-webkit-scrollbar]:hidden", style: {
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }, "data-lenis-prevent": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-0.5 pr-1 pb-4", children: NAV.map((n) => {
        const active = path === n.to || path.startsWith(n.to + "/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, onMouseEnter: playHover, onClick: playClick, className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 ${active ? "bg-gradient-spark text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-0.5"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: n.label })
        ] }, n.to);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 shrink-0 glass rounded-2xl p-3 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-gradient-spark text-primary-foreground shadow-glow shrink-0", children: (user.email ?? "U")[0].toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium text-foreground", children: user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Signed in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          await signOut();
          navigate({
            to: "/"
          });
        }, className: "shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition", "aria-label": "Sign out", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative flex flex-col flex-1 min-w-0 overflow-hidden h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden shrink-0 sticky top-0 z-10 flex items-center justify-between glass px-4 py-3 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "p-2 -ml-2 rounded-lg hover:bg-white/10 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: () => setMenuOpen(!menuOpen), className: "cursor-pointer flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) })
      ] }),
      menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-64 flex flex-col glass-panel bg-background/95 p-4 shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto mt-8 [&::-webkit-scrollbar]:hidden", style: {
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }, "data-lenis-prevent": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-0.5 pr-1 pb-4", children: NAV.map((n) => {
            const active = path === n.to || path.startsWith(n.to + "/");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, onMouseEnter: playHover, onClick: () => setMenuOpen(false), className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 ${active ? "bg-gradient-spark text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-0.5"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: n.label })
            ] }, n.to);
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 shrink-0 glass rounded-2xl p-3 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium text-foreground", children: user.email }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
              await signOut();
              navigate({
                to: "/"
              });
            }, className: "shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-rose-400 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", onClick: () => setMenuOpen(false) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden", style: {
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }, "data-lenis-prevent": true, children: isChat ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { location: path }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
      ] }) })
    ] })
  ] });
}
export {
  AppLayout as component
};
