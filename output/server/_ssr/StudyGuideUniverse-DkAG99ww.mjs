import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { aE as ChevronLeft, x as ChevronRight, G as GraduationCap, f as Bookmark, r as Check, b0 as RotateCw, a5 as ArrowRight } from "../_libs/lucide-react.mjs";
function StudyGuideUniverse({
  guide,
  completed,
  onToggleComplete,
  bookmarks,
  onToggleBookmark
}) {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const [flipped, setFlipped] = reactExports.useState(false);
  const [warpFactor, setWarpFactor] = reactExports.useState(1);
  const canvasRef = reactExports.useRef(null);
  const total = guide.modules.length;
  const handleIndexChange = (newIndex) => {
    setActiveIndex(newIndex);
    setFlipped(false);
    setWarpFactor(5);
  };
  reactExports.useEffect(() => {
    if (warpFactor > 1) {
      const timer = setTimeout(() => {
        setWarpFactor((prev) => Math.max(1, prev - 0.25));
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [warpFactor]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    const particles = [];
    const particleCount = 120;
    const colors = [
      "rgba(236, 72, 153, 0.65)",
      // Pink
      "rgba(168, 85, 247, 0.65)",
      // Purple
      "rgba(59, 130, 246, 0.65)",
      // Blue
      "rgba(34, 211, 238, 0.65)"
      // Cyan
    ];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: Math.random() * (width * 0.45) + 60,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 3e-3 + 1e-3) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        type: Math.random() > 0.75 ? Math.random() > 0.5 ? "cube" : "polygon" : "star"
      });
    }
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;
      const cx = width / 2;
      const cy = height * 0.46;
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.65);
      bgGlow.addColorStop(0, "rgba(22, 12, 50, 0.45)");
      bgGlow.addColorStop(0.5, "rgba(10, 5, 28, 0.2)");
      bgGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);
      const breathing = Math.sin(time * 2.2) * 6;
      const coreRadius = 70 + breathing;
      const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 1.85);
      auraGrad.addColorStop(0, "rgba(236, 72, 153, 0.4)");
      auraGrad.addColorStop(0.35, "rgba(168, 85, 247, 0.22)");
      auraGrad.addColorStop(0.65, "rgba(59, 130, 246, 0.08)");
      auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.85, 0, Math.PI * 2);
      ctx.fill();
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.25, "rgba(236, 72, 153, 0.9)");
      coreGrad.addColorStop(0.65, "rgba(124, 58, 237, 0.72)");
      coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.22)";
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.25);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.32)";
      ctx.setLineDash([4, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 1.45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.4);
      ctx.strokeStyle = "rgba(236, 72, 153, 0.35)";
      ctx.setLineDash([50, 40, 8, 40]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 1.08, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      particles.forEach((p, index) => {
        p.angle += p.speed * warpFactor;
        const px = cx + p.radius * Math.cos(p.angle);
        const py = cy + p.radius * Math.sin(p.angle) * 0.24;
        const sizeMultiplier = Math.sin(time + p.pulsePhase) * 0.28 + 0.92;
        const currentSize = p.size * sizeMultiplier;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.type === "star") {
          ctx.arc(px, py, currentSize, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "cube") {
          ctx.rect(px - currentSize, py - currentSize, currentSize * 2, currentSize * 2);
          ctx.fill();
        } else {
          ctx.moveTo(px, py - currentSize);
          ctx.lineTo(px + currentSize, py + currentSize);
          ctx.lineTo(px - currentSize, py + currentSize);
          ctx.closePath();
          ctx.fill();
        }
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2x = cx + p2.radius * Math.cos(p2.angle);
          const p2y = cy + p2.radius * Math.sin(p2.angle) * 0.24;
          const dist = Math.hypot(px - p2x, py - p2y);
          if (dist < 75) {
            const alpha = (1 - dist / 75) * 0.16;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(p2x, p2y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [warpFactor]);
  const angleStep = 360 / total;
  const radius = Math.max(340, 240 / (2 * Math.tan(Math.PI / total)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[650px] w-full bg-black/45 rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "absolute inset-0 w-full h-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex justify-between items-center bg-black/35 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-spark", children: "Spatial Universe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-display font-semibold text-foreground", children: [
          "Module ",
          activeIndex + 1,
          ": ",
          guide.modules[activeIndex].title
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleIndexChange((activeIndex - 1 + total) % total),
            className: "p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-foreground transition active:scale-95 cursor-none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-xs font-semibold px-2", children: [
          activeIndex + 1,
          " / ",
          total
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleIndexChange((activeIndex + 1) % total),
            className: "p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-foreground transition active:scale-95 cursor-none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 w-full flex items-center justify-center relative",
        style: {
          perspective: "1400px",
          perspectiveOrigin: "50% 40%",
          overflow: "visible"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: {
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${-activeIndex * angleStep}deg)`,
              transition: "transform 0.85s cubic-bezier(0.19, 1, 0.22, 1)",
              width: "280px",
              height: "380px"
            },
            children: guide.modules.map((mod, idx) => {
              const isCurrent = activeIndex === idx;
              const cardAngle = idx * angleStep;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                CylinderCard,
                {
                  moduleData: mod,
                  index: idx,
                  cardAngle,
                  radius,
                  isCurrent,
                  flipped: flipped && isCurrent,
                  setFlipped,
                  completed,
                  onToggleComplete,
                  bookmarks,
                  onToggleBookmark,
                  onSelect: () => handleIndexChange(idx)
                },
                mod.id
              );
            })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: guide.modules.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleIndexChange(idx),
          className: `h-2 rounded-full transition-all duration-300 cursor-none ${activeIndex === idx ? "w-8 bg-spark" : "w-2 bg-white/10 hover:bg-white/30"}`,
          title: `Module ${idx + 1}`
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg border border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5 text-spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Click cards to rotate. Click active card to explore details." })
      ] })
    ] })
  ] });
}
function CylinderCard({
  moduleData,
  index,
  cardAngle,
  radius,
  isCurrent,
  flipped,
  setFlipped,
  completed,
  onToggleComplete,
  bookmarks,
  onToggleBookmark,
  onSelect
}) {
  const [tilt, setTilt] = reactExports.useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!isCurrent || flipped) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = y / (rect.height / 2) * -10;
    const tiltY = x / (rect.width / 2) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onClick: () => {
        if (!isCurrent) onSelect();
      },
      className: `absolute w-[280px] h-[380px] transition-opacity duration-500 select-none ${isCurrent ? "opacity-100 cursor-pointer" : "opacity-35 hover:opacity-75 cursor-pointer"}`,
      style: {
        transformStyle: "preserve-3d",
        // Position card in a circular cylinder formation
        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) ${isCurrent && flipped ? "rotateY(180deg)" : ""}`,
        transition: "transform 0.85s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s",
        backfaceVisibility: "visible"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          className: "w-full h-full relative",
          style: {
            transformStyle: "preserve-3d",
            transform: isCurrent && !flipped ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)` : "scale(1)",
            transition: "transform 0.15s ease-out"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 w-full h-full rounded-3xl border border-white/10 bg-card/85 p-5 backdrop-blur-md shadow-glow flex flex-col justify-between text-foreground",
                style: {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold uppercase tracking-widest text-spark", children: [
                        "Module ",
                        index + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            onToggleBookmark(`module-${moduleData.id}`);
                          },
                          className: "text-muted-foreground hover:text-spark transition p-1 cursor-none",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Bookmark,
                            {
                              className: `h-4 w-4 ${bookmarks[`module-${moduleData.id}`] ? "fill-spark text-spark" : ""}`
                            }
                          )
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-lg font-bold text-foreground leading-snug", children: moduleData.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-semibold", children: "Topics & Exercises" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-xs", children: (moduleData.practice || []).slice(0, 4).map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5 text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 mt-0.5 shrink-0 text-spark" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: task })
                      ] }, idx)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        if (!isCurrent) {
                          onSelect();
                        } else {
                          setFlipped(true);
                        }
                      },
                      className: "w-full flex justify-center items-center gap-1.5 rounded-xl bg-gradient-spark px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 cursor-none",
                      children: isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Explore Topics ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3 w-3" })
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        "Select Week ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                      ] })
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 w-full h-full rounded-3xl border border-white/10 bg-card/90 p-5 backdrop-blur-md shadow-glow flex flex-col justify-between text-foreground",
                style: {
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold uppercase tracking-widest text-emerald-400", children: [
                        "Module ",
                        index + 1,
                        " Details"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          onClick: (e) => {
                            e.stopPropagation();
                            setFlipped(false);
                          },
                          className: "text-[10px] font-semibold text-spark flex items-center gap-1 hover:underline cursor-none p-1",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3 w-3" }),
                            " Flip Back"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto pr-1 space-y-4", "data-lenis-prevent": "true", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-bold", children: "Practice Exercises" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: (moduleData.practice || []).map((task, idx) => {
                          const key = `prac-${moduleData.id}-${idx}`;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              onClick: (e) => {
                                e.stopPropagation();
                                onToggleComplete(key);
                              },
                              className: "flex w-full items-start gap-2.5 text-left text-xs text-muted-foreground hover:text-foreground transition py-0.5 cursor-none",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: `mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center transition-all ${completed[key] ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/15 bg-white/5"}`,
                                    children: completed[key] && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 stroke-[3]" })
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: `leading-normal ${completed[key] ? "line-through opacity-40 text-muted-foreground" : ""}`,
                                    children: task
                                  }
                                )
                              ]
                            },
                            idx
                          );
                        }) })
                      ] }),
                      moduleData.build && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1 border-t border-white/5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[9px] uppercase tracking-widest text-muted-foreground font-bold", children: "Project" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 text-xs text-spark", children: moduleData.build.title })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        setFlipped(false);
                      },
                      className: "w-full text-center text-[10px] text-muted-foreground hover:text-foreground transition cursor-none",
                      children: "Close Details"
                    }
                  ) })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  StudyGuideUniverse
};
