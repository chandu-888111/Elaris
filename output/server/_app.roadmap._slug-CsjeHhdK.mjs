import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate, L as Link } from "./_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./_ssr/ai-DTqZfz-A.mjs";
import { b as getRoadmap, c as getDomainProgress, t as toggleNodeProgress, d as generateNodeStudyGuide, e as generateNodeResourcesAndMindmap } from "./_ssr/roadmap.functions-DYP5wcCL.mjs";
import { D as DOMAIN_BY_SLUG } from "./_ssr/domains-NgPH8Jrf.mjs";
import { q as Route$1, d as PageShell, e as PageHeader, f as awardXP, u as useAuth, a as playHover, p as playClick, n as playSuccess, g as unlockAchievement } from "./_ssr/router-DT2A3-T4.mjs";
import { e as enrichRoadmapNode, g as getFallbackMindmapAndResources, m as matchKey } from "./_ssr/resource-engine-CMarqK7x.mjs";
import { u as useChat } from "./_libs/ai-sdk__react.mjs";
import { D as DefaultChatTransport } from "./_libs/ai.mjs";
import { M as Markdown } from "./_ssr/Markdown-CXkXquVv.mjs";
import { toast } from "./_libs/sonner.mjs";
import { s as supabase } from "./_ssr/client-DwafHdRl.mjs";
import { b as create, p as persist, e as createJSONStorage } from "./_libs/zustand.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/auth-middleware-Bg7BSutF.mjs";
import "./_ssr/ai-gateway-BOABUhLo.mjs";
import { a7 as Compass, aQ as ArrowLeft, L as LoaderCircle, G as GraduationCap, aT as Clock, a0 as CircleCheckBig, g as Brain, Y as CircleCheck, X, S as ShieldAlert, ag as Target, r as Check, C as Cpu, Q as FileText, aU as Youtube, ah as Github, a8 as CodeXml, v as BookOpen, f as Bookmark, w as Search, y as Play, E as ExternalLink, n as FileCode, aV as CircleDot, J as Trophy, a5 as ArrowRight, aW as ZoomIn, aX as ZoomOut, aY as Maximize, s as Send, aN as Activity, aI as Database, N as Network } from "./_libs/lucide-react.mjs";
import { m as motion } from "./_libs/framer-motion.mjs";
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
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/react-three__fiber.mjs";
import "./_libs/three.mjs";
import "./_libs/its-fine.mjs";
import "./_libs/react-use-measure.mjs";
import "./_libs/react-three__postprocessing.mjs";
import "./_libs/postprocessing.mjs";
import "./_libs/maath.mjs";
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
import "./_libs/zod.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/ai-sdk__gateway.mjs";
import "./_libs/ai-sdk__provider-utils.mjs";
import "./_libs/ai-sdk__provider.mjs";
import "./_libs/eventsource-parser.mjs";
import "./_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "./_libs/opentelemetry__api.mjs";
import "./_libs/ai-sdk__openai-compatible.mjs";
import "./_libs/ai-sdk__google.mjs";
import "./_libs/ai-sdk__anthropic.mjs";
import "./_libs/ai-sdk__cohere.mjs";
import "./_libs/motion-dom.mjs";
import "./_libs/motion-utils.mjs";
import "./_libs/throttleit.mjs";
import "./_libs/react-markdown.mjs";
import "./_libs/devlop.mjs";
import "./_libs/unified.mjs";
import "./_libs/bail.mjs";
import "./_libs/extend.mjs";
import "./_libs/is-plain-obj.mjs";
import "./_libs/trough.mjs";
import "./_libs/vfile.mjs";
import "./_libs/vfile-message.mjs";
import "./_libs/unist-util-stringify-position.mjs";
import "node:process";
import "node:path";
import "node:url";
import "./_libs/remark-parse.mjs";
import "./_libs/mdast-util-from-markdown.mjs";
import "./_libs/micromark-util-decode-numeric-character-reference+[...].mjs";
import "./_libs/micromark-util-decode-string.mjs";
import "./_libs/decode-named-character-reference+[...].mjs";
import "./_libs/character-entities.mjs";
import "./_libs/micromark-util-normalize-identifier+[...].mjs";
import "./_libs/micromark.mjs";
import "./_libs/micromark-util-combine-extensions+[...].mjs";
import "./_libs/micromark-util-chunked.mjs";
import "./_libs/micromark-factory-space.mjs";
import "./_libs/micromark-util-character.mjs";
import "./_libs/micromark-core-commonmark.mjs";
import "./_libs/micromark-util-classify-character+[...].mjs";
import "./_libs/micromark-util-resolve-all.mjs";
import "./_libs/micromark-util-subtokenize.mjs";
import "./_libs/micromark-factory-destination.mjs";
import "./_libs/micromark-factory-label.mjs";
import "./_libs/micromark-factory-title.mjs";
import "./_libs/micromark-factory-whitespace.mjs";
import "./_libs/micromark-util-html-tag-name.mjs";
import "./_libs/mdast-util-to-string.mjs";
import "./_libs/remark-rehype.mjs";
import "./_libs/mdast-util-to-hast.mjs";
import "./_libs/ungap__structured-clone.mjs";
import "./_libs/micromark-util-sanitize-uri.mjs";
import "./_libs/unist-util-position.mjs";
import "./_libs/trim-lines.mjs";
import "./_libs/unist-util-visit.mjs";
import "./_libs/unist-util-visit-parents.mjs";
import "./_libs/unist-util-is.mjs";
import "./_libs/hast-util-to-jsx-runtime.mjs";
import "./_libs/comma-separated-tokens.mjs";
import "./_libs/property-information.mjs";
import "./_libs/space-separated-tokens.mjs";
import "./_libs/style-to-js.mjs";
import "./_libs/style-to-object.mjs";
import "./_libs/inline-style-parser.mjs";
import "./_libs/hast-util-whitespace.mjs";
import "./_libs/estree-util-is-identifier-name.mjs";
import "./_libs/html-url-attributes.mjs";
import "./_libs/remark-gfm.mjs";
import "./_libs/micromark-extension-gfm.mjs";
import "./_libs/micromark-extension-gfm-autolink-literal+[...].mjs";
import "./_libs/micromark-extension-gfm-footnote+[...].mjs";
import "./_libs/micromark-extension-gfm-strikethrough+[...].mjs";
import "./_libs/micromark-extension-gfm-table.mjs";
import "./_libs/micromark-extension-gfm-task-list-item+[...].mjs";
import "./_libs/mdast-util-gfm.mjs";
import "./_libs/mdast-util-gfm-autolink-literal+[...].mjs";
import "./_libs/ccount.mjs";
import "./_libs/mdast-util-find-and-replace.mjs";
import "./_libs/escape-string-regexp.mjs";
import "./_libs/mdast-util-gfm-footnote.mjs";
import "./_libs/mdast-util-gfm-strikethrough.mjs";
import "./_libs/mdast-util-gfm-table.mjs";
import "./_libs/markdown-table.mjs";
import "./_libs/mdast-util-to-markdown.mjs";
import "./_libs/longest-streak.mjs";
import "./_libs/mdast-util-phrasing.mjs";
import "./_libs/mdast-util-gfm-task-list-item.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
function getBYOXLinkForTask(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.includes("redis") || t.includes("key-value") || t.includes("kv store")) {
    return { query: "redis", label: "Build Redis" };
  }
  if (t.includes("sqlite") || t.includes("b-tree") || t.includes("database") && !t.includes("redis")) {
    return { query: "sqlite", label: "Build Database" };
  }
  if (t.includes("git ") || t.includes("version control") || t.includes(" git")) {
    return { query: "git", label: "Build Git" };
  }
  if (t.includes("dns ") || t.includes("dns server") || t.includes("recursive lookup")) {
    return { query: "dns", label: "Build DNS" };
  }
  if (t.includes("docker") || t.includes("container") || t.includes("namespaces")) {
    return { query: "docker", label: "Build Docker" };
  }
  if (t.includes("compiler") || t.includes("interpreter") || t.includes("parser") || t.includes("programming language")) {
    return { query: "programming-language", label: "Build Compiler" };
  }
  if (t.includes("shell") || t.includes("bash") || t.includes("cli prompt")) {
    return { query: "shell", label: "Build Shell" };
  }
  if (t.includes("web server") || t.includes("http server")) {
    return { query: "web-server", label: "Build Web Server" };
  }
  if (t.includes("torrent") || t.includes("bittorrent")) {
    return { query: "bittorrent", label: "Build BitTorrent" };
  }
  if (t.includes("blockchain") || t.includes("cryptocurrency")) {
    return { query: "blockchain", label: "Build Blockchain" };
  }
  if (t.includes("3d renderer") || t.includes("ray tracing") || t.includes("graphics engine")) {
    return { query: "3d-renderer", label: "Build 3D Renderer" };
  }
  if (t.includes("bot") || t.includes("chatbot") || t.includes("discord bot") || t.includes("slack bot")) {
    return { query: "bot", label: "Build Bot" };
  }
  if (t.includes("operating system") || t.includes("kernel") || t.includes("bootloader")) {
    return { query: "operating-system", label: "Build OS" };
  }
  if (t.includes("text editor")) {
    return { query: "text-editor", label: "Build Text Editor" };
  }
  if (t.includes("regex engine")) {
    return { query: "regex-engine", label: "Build Regex Engine" };
  }
  return null;
}
function NodeDrawer({
  open,
  onClose,
  node,
  domainSlug,
  domainName,
  tier,
  nodeStatus,
  onStatusChange
}) {
  const [activeTab, setActiveTab] = reactExports.useState("learn");
  const fetchStudyGuide = useServerFn(generateNodeStudyGuide);
  const fetchResourcesAndMindmap = useServerFn(generateNodeResourcesAndMindmap);
  const navigate = useNavigate();
  const getMatchedBYOX = () => {
    let match = getBYOXLinkForTask(node.title);
    if (match) return match;
    if (node.tools) {
      for (const tool of node.tools) {
        match = getBYOXLinkForTask(tool);
        if (match) return match;
      }
    }
    if (node.skills) {
      for (const skill of node.skills) {
        match = getBYOXLinkForTask(skill);
        if (match) return match;
      }
    }
    return null;
  };
  const matchedBYOX = getMatchedBYOX();
  const [zoom, setZoom] = reactExports.useState(1);
  const [pan, setPan] = reactExports.useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = reactExports.useState(false);
  const [startPan, setStartPan] = reactExports.useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = reactExports.useState(null);
  const svgRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const onWheel = (e) => {
      if (activeTab !== "mindmap") return;
      e.preventDefault();
      const zoomFactor = 1.1;
      setZoom((prev) => {
        const nextZoom = e.deltaY < 0 ? prev * zoomFactor : prev / zoomFactor;
        return Math.max(0.3, Math.min(4, nextZoom));
      });
    };
    svgEl.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      svgEl.removeEventListener("wheel", onWheel);
    };
  }, [activeTab]);
  const [dynamicData, setDynamicData] = reactExports.useState(null);
  const [dynamicLoading, setDynamicLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open || !node.id) return;
    setDynamicData(null);
    setDynamicLoading(true);
    fetchResourcesAndMindmap({
      data: { slug: domainSlug, tier, nodeId: node.id, nodeTitle: node.title }
    }).then((res) => {
      setDynamicData(res);
    }).catch((err) => {
      console.error("Failed to load AI resources and mindmap:", err);
    }).finally(() => {
      setDynamicLoading(false);
    });
  }, [open, node.id, domainSlug, tier, node.title, fetchResourcesAndMindmap]);
  const [recommendedBooks, setRecommendedBooks] = reactExports.useState([]);
  const [booksLoading, setBooksLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open || !node.id || activeTab !== "resources") return;
    let active = true;
    const fetchAndFilterBooks = async () => {
      setBooksLoading(true);
      try {
        const books = window.__fpb_cache || [];
        if (books.length === 0) {
          const res = await fetch(
            "https://raw.githubusercontent.com/EbookFoundation/free-programming-books-search/master/fpb.json"
          );
          const data = await res.json();
          if (data && Array.isArray(data.children) && data.children[0] && Array.isArray(data.children[0].children)) {
            const enBlocks = data.children[0].children.filter(
              (l) => l.language && l.language.code === "en"
            );
            enBlocks.forEach((enLang) => {
              enLang.sections.forEach((s) => {
                const secName = s.section;
                if (Array.isArray(s.entries)) {
                  s.entries.forEach((e) => {
                    books.push({
                      id: `live-${books.length}`,
                      title: e.title,
                      url: e.url,
                      author: e.author || "Unknown",
                      category: secName,
                      format: e.notes ? e.notes.join(", ") : "HTML"
                    });
                  });
                }
                if (Array.isArray(s.subsections)) {
                  s.subsections.forEach((sub) => {
                    const subName = sub.section;
                    if (Array.isArray(sub.entries)) {
                      sub.entries.forEach((e) => {
                        books.push({
                          id: `live-${books.length}`,
                          title: e.title,
                          url: e.url,
                          author: e.author || "Unknown",
                          category: `${secName} - ${subName}`,
                          format: e.notes ? e.notes.join(", ") : "HTML"
                        });
                      });
                    }
                  });
                }
              });
            });
            window.__fpb_cache = books;
          }
        }
        if (!active) return;
        const key = matchKey(node.title) || matchKey(domainSlug) || node.id;
        const normalizedNodeTitle = node.title.toLowerCase();
        const matched = books.filter((b) => {
          const title = b.title.toLowerCase();
          const category = b.category.toLowerCase();
          const directMatch = title.includes(normalizedNodeTitle) || category.includes(normalizedNodeTitle);
          const keyMatch = key ? new RegExp(`\\b${key.toLowerCase()}\\b`).test(title) || new RegExp(`\\b${key.toLowerCase()}\\b`).test(category) : false;
          return directMatch || keyMatch;
        });
        setRecommendedBooks(matched.slice(0, 4));
      } catch (err) {
        console.warn("Failed to load/match recommended books:", err);
      } finally {
        if (active) {
          setBooksLoading(false);
        }
      }
    };
    fetchAndFilterBooks();
    return () => {
      active = false;
    };
  }, [open, node.id, node.title, domainSlug, activeTab]);
  const [playingVideoId, setPlayingVideoId] = reactExports.useState(null);
  const [bookmarkedResources, setBookmarkedResources] = reactExports.useState({});
  const [completedResources, setCompletedResources] = reactExports.useState({});
  const [completedSkills, setCompletedSkills] = reactExports.useState({});
  reactExports.useEffect(() => {
    try {
      const stored = localStorage.getItem(`spark-tasks-${node.id}`);
      if (stored) {
        setCompletedSkills(JSON.parse(stored));
      } else {
        setCompletedSkills({});
      }
    } catch {
      setCompletedSkills({});
    }
  }, [node.id]);
  const toggleSkillComplete = (skill) => {
    setCompletedSkills((prev) => {
      const updated = { ...prev, [skill]: !prev[skill] };
      localStorage.setItem(`spark-tasks-${node.id}`, JSON.stringify(updated));
      if (updated[skill]) {
        playSuccess();
        awardXP(15, `Mastered: ${skill}`);
      } else {
        playClick();
      }
      return updated;
    });
  };
  const [studyGuide, setStudyGuide] = reactExports.useState(
    null
  );
  const [guideLoading, setGuideLoading] = reactExports.useState(false);
  const [quizAnswers, setQuizAnswers] = reactExports.useState({});
  const [quizSubmitted, setQuizSubmitted] = reactExports.useState(false);
  const { user } = useAuth();
  const [threadId, setThreadId] = reactExports.useState(null);
  const threadIdRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    threadIdRef.current = threadId;
  }, [threadId]);
  const [chatInput, setChatInput] = reactExports.useState("");
  const { messages, sendMessage, status, setMessages } = useChat({
    id: `mentor-${node.id}`,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: async ({ message }) => {
      const activeId = threadIdRef.current;
      if (!user || !activeId || !message) return;
      const msgAny = message;
      const text = msgAny.content || (Array.isArray(msgAny.parts) ? msgAny.parts.filter((p) => p?.type === "text").map((p) => p.text || "").join("\n\n") : "");
      const parts = [{ type: "text", text }];
      await supabase.from("chat_messages").insert({
        id: crypto.randomUUID(),
        thread_id: activeId,
        user_id: user.id,
        role: message.role,
        parts
      });
      await supabase.from("chat_threads").update({ updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", activeId);
    }
  });
  const isStreaming = status === "submitted" || status === "streaming";
  reactExports.useEffect(() => {
    if (!open || !user || !node.id) return;
    let cancelled = false;
    (async () => {
      const title = `Mentor:${domainSlug}:${node.id}`;
      const { data: threadData } = await supabase.from("chat_threads").select("id").eq("user_id", user.id).eq("title", title).maybeSingle();
      if (cancelled) return;
      const systemMessage = {
        id: "sys-prompt",
        role: "system",
        parts: [
          {
            type: "text",
            text: `You are the AI Mentor for the topic "${node.title}" in the domain "${domainName}". Scopes your responses strictly to this topic. Help the user learn, understand core concepts, prepare for interviews, or write code. Use markdown and code blocks when helpful.
            
User Memory / Analytics Data: 
${localStorage.getItem("ecosystem-storage") || "No historical memory found."}`
          }
        ]
      };
      if (threadData) {
        setThreadId(threadData.id);
        const { data: msgData } = await supabase.from("chat_messages").select("id, role, parts, created_at").eq("thread_id", threadData.id).order("created_at", { ascending: true });
        if (cancelled) return;
        const loadedMsgs = (msgData ?? []).map((m) => ({
          id: m.id,
          role: m.role,
          parts: Array.isArray(m.parts) ? m.parts : []
        }));
        setMessages([systemMessage, ...loadedMsgs]);
      } else {
        setThreadId(null);
        setMessages([systemMessage]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, user, node.id, domainSlug, domainName, node.title, setMessages]);
  const submitMessage = async (text) => {
    if (!user) return;
    let activeThreadId = threadId;
    if (!activeThreadId) {
      const title = `Mentor:${domainSlug}:${node.id}`;
      const { data, error } = await supabase.from("chat_threads").insert({ user_id: user.id, title }).select("id").single();
      if (error || !data) {
        toast.error("Failed to start chat session");
        return;
      }
      activeThreadId = data.id;
      setThreadId(activeThreadId);
    }
    const userMsgId = crypto.randomUUID();
    await supabase.from("chat_messages").insert({
      id: userMsgId,
      thread_id: activeThreadId,
      user_id: user.id,
      role: "user",
      parts: [{ type: "text", text }]
    });
    sendMessage({ id: userMsgId, role: "user", parts: [{ type: "text", text }] });
  };
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || isStreaming) return;
    setChatInput("");
    await submitMessage(text);
  };
  const getMessageText = (m) => {
    if (m.content) return m.content;
    if (Array.isArray(m.parts)) {
      return m.parts.filter((p) => p && p.type === "text").map((p) => p.text || "").join("\n\n");
    }
    return "";
  };
  reactExports.useEffect(() => {
    if (activeTab === "guide" && !studyGuide) {
      setGuideLoading(true);
      fetchStudyGuide({ data: { slug: domainSlug, tier, nodeId: node.id, nodeTitle: node.title } }).then((res) => {
        setStudyGuide(res);
        setQuizAnswers({});
        setQuizSubmitted(false);
      }).catch((e) => {
        toast.error("Failed to generate study guide");
      }).finally(() => setGuideLoading(false));
    }
  }, [activeTab, domainSlug, tier, node.id, node.title, studyGuide, fetchStudyGuide]);
  reactExports.useEffect(() => {
    setPlayingVideoId(null);
    setStudyGuide(null);
    setActiveTab("learn");
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setHoveredNode(null);
    setRecommendedBooks([]);
    setBooksLoading(false);
  }, [node.id]);
  const [notesContent, setNotesContent] = reactExports.useState("");
  const [notesSaved, setNotesSaved] = reactExports.useState(true);
  const [notesMode, setNotesMode] = reactExports.useState("edit");
  const saveTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const saved = localStorage.getItem(`spark-notes-${node.id}`);
    setNotesContent(saved || "");
    setNotesSaved(true);
  }, [node.id]);
  const handleNotesChange = (text) => {
    setNotesContent(text);
    setNotesSaved(false);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(`spark-notes-${node.id}`, text);
      setNotesSaved(true);
    }, 800);
  };
  const [expandedQuestionIdx, setExpandedQuestionIdx] = reactExports.useState(null);
  if (!open) return null;
  const toggleBookmark = (url) => {
    playClick();
    setBookmarkedResources((prev) => {
      const updated = { ...prev, [url]: !prev[url] };
      if (updated[url]) {
        awardXP(10, "Bookmarked study resource");
      }
      return updated;
    });
  };
  const toggleResourceComplete = (url) => {
    setCompletedResources((prev) => {
      const updated = { ...prev, [url]: !prev[url] };
      if (updated[url]) {
        playSuccess();
        awardXP(20, "Completed learning resource");
      } else {
        playClick();
      }
      return updated;
    });
  };
  const handleNodeCompletion = async () => {
    const isDone = nodeStatus === "completed";
    if (!isDone) {
      playSuccess();
    } else {
      playClick();
    }
    await onStatusChange(isDone ? "in_progress" : "done");
  };
  const handleQuickPrompt = async (promptText) => {
    if (isStreaming) return;
    await submitMessage(promptText);
  };
  const handleQuizSubmit = async () => {
    if (!studyGuide?.quiz) return;
    setQuizSubmitted(true);
    let correct = 0;
    studyGuide.quiz.forEach((qItem, idx) => {
      if (quizAnswers[idx] === qItem.answer) correct++;
    });
    Math.round(correct / studyGuide.quiz.length * 100);
    if (correct === studyGuide.quiz.length) {
      await awardXP(75, `Perfect Quiz! ${correct}/${studyGuide.quiz.length} on ${node.title}`);
      await unlockAchievement({
        code: "perfect-quiz",
        title: "Perfect Score",
        description: "Answer all mini-quiz questions correctly.",
        icon: "Brain",
        xp: 75
      });
    } else {
      await awardXP(
        correct * 10,
        `Quiz Score: ${correct}/${studyGuide.quiz.length} on ${node.title}`
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-[540px] flex-col border-l border-white/10 bg-card/95 shadow-glow backdrop-blur-md transition-transform duration-300 sm:max-w-[620px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-white/5 px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-spark", children: [
            domainName,
            " · ",
            tier
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mt-0.5", children: node.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          nodeStatus !== "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleNodeCompletion,
              className: `inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition ${nodeStatus === "completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30" : "bg-gradient-spark text-primary-foreground shadow-glow hover:-translate-y-0.5"}`,
              children: nodeStatus === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Completed" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mark Complete" })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClose,
              className: "rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex border-b border-white/5 px-4 text-xs font-medium overflow-x-auto scrollbar-none flex-nowrap",
          "data-lenis-prevent": true,
          children: [
            "learn",
            "resources",
            "build",
            "guide",
            "mindmap",
            "notes",
            "projects",
            "mentor"
          ].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onMouseEnter: playHover,
              onClick: () => {
                playClick();
                setActiveTab(tab);
              },
              className: `relative shrink-0 px-4 py-3 text-center transition capitalize ${activeTab === tab ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                tab === "guide" ? "Study Guide" : tab === "mentor" ? "AI Mentor" : tab === "mindmap" ? "Mindmap" : tab === "notes" ? "Personal Notes" : tab === "build" ? "Build (BYOX)" : tab,
                activeTab === tab && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-spark" })
              ]
            },
            tab
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", "data-lenis-prevent": true, children: [
        activeTab === "learn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground uppercase tracking-widest text-[9px] font-semibold", children: "Est. Learning Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 font-semibold text-foreground text-sm flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-spark" }),
                " ",
                node.hours,
                " Hours"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground uppercase tracking-widest text-[9px] font-semibold", children: "Difficulty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `mt-1 font-semibold text-sm capitalize ${node.difficulty === "easy" ? "text-emerald-400" : node.difficulty === "medium" ? "text-blue-400" : "text-red-400"}`,
                  children: node.difficulty
                }
              )
            ] })
          ] }),
          node.prerequisites && node.prerequisites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4 w-4 text-spark" }),
              " Prerequisites"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: node.prerequisites.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-lg bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-xs text-red-400 font-semibold",
                children: p
              },
              p
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-spark", children: "Why learn this?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground leading-relaxed", children: node.why })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-3", children: "Expected Outcome" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 items-start text-sm text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-spark mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: node.outcome })
            ] })
          ] }),
          node.careerImpact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "Career Impact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: node.careerImpact })
          ] }),
          (node.skills?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-3", children: "Tasks to Complete (Progress Tracker)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: node.skills?.map((skill) => {
              const isSkillDone = !!completedSkills[skill];
              const byoxLink = getBYOXLinkForTask(skill);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onClick: () => toggleSkillComplete(skill),
                  className: `flex items-center justify-between gap-3 rounded-xl border p-3 cursor-pointer transition ${isSkillDone ? "border-emerald-500/25 bg-emerald-500/5 text-foreground" : "border-white/5 bg-white/2 text-muted-foreground hover:border-white/10 hover:text-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${isSkillDone ? "border-emerald-500 bg-emerald-500 text-primary-foreground" : "border-white/20 bg-transparent"}`,
                          children: isSkillDone && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 stroke-[3px]" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium truncate", children: skill })
                    ] }),
                    byoxLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/build-your-own-x",
                        search: { query: byoxLink.query },
                        onClick: (e) => e.stopPropagation(),
                        className: "shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-spark/20 hover:bg-spark/35 border border-spark/30 hover:border-spark/50 text-[9px] font-bold text-spark transition shadow-glow",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-2.5 w-2.5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            byoxLink.label,
                            " ↗"
                          ] })
                        ]
                      }
                    )
                  ]
                },
                skill
              );
            }) })
          ] }),
          (node.tools?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-2", children: "Tools / Frameworks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: node.tools?.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-foreground",
                children: tool
              },
              tool
            )) })
          ] })
        ] }),
        activeTab === "resources" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          dynamicLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-6 border border-dashed border-white/5 rounded-2xl bg-white/2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground font-sans", children: "Querying AI for specialized docs, video tutorials, and exercises..." })
          ] }),
          (() => {
            if (dynamicLoading) return null;
            const resources = dynamicData?.resources || node.resources || [];
            if (resources.length > 0) {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: resources.map((resource) => {
                const isVideo = resource.type === "youtube";
                const isBookmarked = !!bookmarkedResources[resource.url];
                const isDone = !!completedResources[resource.url];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "group overflow-hidden rounded-2xl border border-white/5 bg-card/45 p-4 transition-all duration-300 hover:border-white/10",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-spark", children: [
                          resource.type === "doc" && /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                          resource.type === "youtube" && /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "h-4 w-4 text-red-500" }),
                          resource.type === "github" && /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
                          resource.type === "practice" && /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }),
                          resource.type === "blog" && /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-semibold uppercase tracking-widest text-muted-foreground", children: [
                            resource.type,
                            " ",
                            resource.author ? `· ${resource.author}` : ""
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground truncate mt-0.5 group-hover:text-spark transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: resource.url,
                              target: "_blank",
                              rel: "noreferrer",
                              className: "hover:underline",
                              children: resource.title
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground", children: [
                            resource.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              "⏱️ ",
                              resource.duration
                            ] }),
                            resource.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                              "⭐ ",
                              resource.rating
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resource.free ? "Free" : "Paid" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => toggleBookmark(resource.url),
                              className: `rounded-lg p-1.5 hover:bg-white/5 transition ${isBookmarked ? "text-spark" : "text-muted-foreground"}`,
                              title: isBookmarked ? "Remove bookmark" : "Bookmark resource",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Bookmark,
                                {
                                  className: "h-4 w-4",
                                  fill: isBookmarked ? "currentColor" : "none"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => toggleResourceComplete(resource.url),
                              className: `rounded-lg p-1.5 hover:bg-white/5 transition ${isDone ? "text-emerald-400" : "text-muted-foreground"}`,
                              title: isDone ? "Mark incomplete" : "Mark as completed",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                CircleCheck,
                                {
                                  className: "h-4 w-4",
                                  fill: isDone ? "currentColor" : "none"
                                }
                              )
                            }
                          )
                        ] })
                      ] }),
                      isVideo && resource.videoId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video w-full overflow-hidden rounded-xl bg-black relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.title || node.title + " " + resource.title)}`,
                              target: "_blank",
                              rel: "noreferrer",
                              className: "rounded-lg bg-black/75 border border-white/10 px-2 py-1 text-[9px] font-semibold text-white hover:text-spark transition flex items-center gap-1 cursor-pointer",
                              onClick: (e) => e.stopPropagation(),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3 w-3" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Search YouTube" })
                              ]
                            }
                          ) }),
                          playingVideoId === resource.videoId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "iframe",
                            {
                              src: `https://www.youtube.com/embed/${resource.videoId}?autoplay=1`,
                              title: resource.title,
                              frameBorder: "0",
                              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                              allowFullScreen: true,
                              className: "h-full w-full"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              onClick: () => setPlayingVideoId(resource.videoId),
                              className: "relative flex h-full w-full cursor-pointer items-center justify-center bg-cover bg-center",
                              style: {
                                backgroundImage: `url(https://img.youtube.com/vi/${resource.videoId}/hqdefault.jpg)`
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 transition hover:bg-black/25" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "z-10 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-glow transition group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Play,
                                  {
                                    className: "h-6 w-6 ml-0.5",
                                    fill: "currentColor"
                                  }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-[9px] text-white", children: "YouTube Preview" })
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-[10px] text-muted-foreground px-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Video preview unavailable?" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.title || node.title + " " + resource.title)}`,
                              target: "_blank",
                              rel: "noreferrer",
                              className: "text-spark font-semibold hover:underline flex items-center gap-1",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-2.5 w-2.5" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Find working version on YouTube ↗" })
                              ]
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  resource.url
                );
              }) });
            } else {
              return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-10", children: "No resources specified." });
            }
          })(),
          booksLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center py-6 border border-dashed border-white/5 rounded-2xl bg-white/2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Searching free programming reference books catalog..." })
          ] }),
          !booksLoading && recommendedBooks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold uppercase tracking-wider text-spark flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Recommended Reference Books (",
                recommendedBooks.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: recommendedBooks.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative overflow-hidden rounded-xl border border-white/5 bg-white/2 p-3 hover:border-spark/20 transition flex flex-col justify-between min-h-[120px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded w-fit inline-block", children: book.category }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-bold text-xs text-foreground mt-1.5 line-clamp-2 leading-snug", children: book.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground mt-0.5 truncate", children: [
                      "by ",
                      book.author
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-muted-foreground", children: book.format }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: book.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        onClick: () => {
                          playClick();
                          awardXP(10, `Opened book from roadmap: ${book.title}`);
                        },
                        className: "text-spark hover:underline font-semibold flex items-center gap-1 cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Read" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-2.5 w-2.5" })
                        ]
                      }
                    )
                  ] })
                ]
              },
              book.id
            )) })
          ] })
        ] }),
        activeTab === "build" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: matchedBYOX ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-spark/20 bg-spark/5 p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-spark/20 flex items-center justify-center text-spark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground", children: [
                "Build Your Own ",
                matchedBYOX.label.replace("Build ", "")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Matched with our interactive step-by-step BYOX catalog" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "This roadmap topic is directly related to the coding challenge",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              '"',
              matchedBYOX.label,
              '"'
            ] }),
            ". You can build a complete, production-ready version of this tool from scratch to earn substantial bonus XP, gain deep system engineering expertise, and showcase it on your resume."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                playClick();
                onClose();
                navigate({
                  to: "/build-your-own-x",
                  search: { query: matchedBYOX.query }
                });
              },
              className: "inline-flex items-center gap-2 rounded-xl bg-gradient-spark px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition cursor-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 fill-current" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start Building Challenge" })
              ]
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/2 p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Custom BYOX Sandbox Prototype" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "No direct catalog match found" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
            "Although there is no pre-built interactive guide for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
              '"',
              node.title,
              '"'
            ] }),
            ", you can prototype a custom sandbox project for it using our AI Project Builder. Describe the concept, select your stack, and let AI initiate the codebase."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                playClick();
                onClose();
                navigate({
                  to: "/builder",
                  search: { seed: `A custom prototype for ${node.title}` }
                });
              },
              className: "inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-white/10 hover:border-white/10 transition cursor-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-3.5 w-3.5 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create Project Sandbox" })
              ]
            }
          ) })
        ] }) }),
        activeTab === "guide" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          guideLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "AI is designing your mini study guide..." })
          ] }),
          studyGuide && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4" }),
                  " Core Topics"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs text-muted-foreground", children: studyGuide.what.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-spark font-bold", children: "•" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: w })
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
                  " Action Plan"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs text-muted-foreground", children: studyGuide.how.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-spark font-bold", children: [
                    i + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h })
                ] }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }),
                " Practice Tasks"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-xs text-muted-foreground", children: studyGuide.practice.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { className: "h-3.5 w-3.5 text-spark shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p })
              ] }, i)) })
            ] }),
            studyGuide.mini_project && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
                " Capstone Project"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-semibold text-foreground mt-1", children: studyGuide.mini_project.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children: studyGuide.mini_project.brief }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => navigate({
                    to: "/builder",
                    search: { seed: studyGuide.mini_project.title }
                  }),
                  className: "mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-spark hover:underline",
                  children: [
                    "Architect in AI Builder ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                  ]
                }
              )
            ] }),
            studyGuide.quiz && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spark mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                " Scoped Mini-Quiz"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: studyGuide.quiz.map(
                (qItem, qIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground", children: [
                    qIdx + 1,
                    ". ",
                    qItem.q
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: qItem.choices.map((choice, cIdx) => {
                    const isSelected = quizAnswers[qIdx] === cIdx;
                    const isCorrect = qItem.answer === cIdx;
                    let choiceClass = "border-white/5 bg-white/2 text-muted-foreground hover:bg-white/5";
                    if (isSelected) {
                      choiceClass = "border-spark/50 bg-spark/10 text-foreground";
                    }
                    if (quizSubmitted) {
                      if (isCorrect) {
                        choiceClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
                      } else if (isSelected) {
                        choiceClass = "border-red-500/50 bg-red-500/10 text-red-400";
                      }
                    }
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        disabled: quizSubmitted,
                        onClick: () => setQuizAnswers((prev) => ({ ...prev, [qIdx]: cIdx })),
                        className: `rounded-lg border px-3 py-2 text-left text-xs transition ${choiceClass}`,
                        children: choice
                      },
                      cIdx
                    );
                  }) })
                ] }, qIdx)
              ) }),
              !quizSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: handleQuizSubmit,
                  disabled: Object.keys(quizAnswers).length < studyGuide.quiz.length,
                  className: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-glow disabled:opacity-50",
                  children: "Submit Answers"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Quiz Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    },
                    className: "text-spark hover:underline",
                    children: "Retake Quiz"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        activeTab === "mindmap" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-spark mb-1", children: "AI-Powered Learning Mindmap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-sans", children: [
              "A visual overview of skills, tools, projects, and interview expectations for",
              " ",
              node.title,
              "."
            ] })
          ] }),
          dynamicLoading && !dynamicData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-3xl bg-white/2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-spark" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground font-sans", children: "Constructing customized AI mindmap nodes and relations..." })
          ] }) : (() => {
            const data = dynamicData?.mindmap || getFallbackMindmapAndResources(node.title, domainSlug).mindmap;
            const handleMouseDown = (e) => {
              if (e.button !== 0) return;
              const target = e.target;
              if (target.closest(".mindmap-node-group")) return;
              setIsPanning(true);
              setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
            };
            const handleMouseMove = (e) => {
              if (!isPanning) return;
              setPan({
                x: e.clientX - startPan.x,
                y: e.clientY - startPan.y
              });
            };
            const handleMouseUpOrLeave = () => {
              setIsPanning(false);
            };
            const zoomIn = () => setZoom((prev) => Math.min(4, prev * 1.2));
            const zoomOut = () => setZoom((prev) => Math.max(0.3, prev / 1.2));
            const resetView = () => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-4 min-h-[380px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-10 text-[9px] text-muted-foreground bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/5 pointer-events-none select-none", children: "🖱️ Drag to pan | Scroll to zoom" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: zoomIn,
                    className: "p-1.5 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded transition",
                    title: "Zoom In",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: zoomOut,
                    className: "p-1.5 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded transition",
                    title: "Zoom Out",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-3.5 bg-white/10 mx-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: resetView,
                    className: "p-1.5 hover:bg-white/10 text-muted-foreground hover:text-foreground rounded transition",
                    title: "Reset View",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  ref: svgRef,
                  viewBox: "-320 -180 640 360",
                  className: "w-full h-[360px] overflow-visible select-none",
                  style: { cursor: isPanning ? "grabbing" : "grab" },
                  onMouseDown: handleMouseDown,
                  onMouseMove: handleMouseMove,
                  onMouseUp: handleMouseUpOrLeave,
                  onMouseLeave: handleMouseUpOrLeave,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "root-grad", cx: "50%", cy: "50%", r: "50%", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.18 295)", stopOpacity: "0.4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.18 295)", stopOpacity: "0" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: `translate(${pan.x}, ${pan.y}) scale(${zoom})`, children: [
                      data.edges?.map((e) => {
                        const src = data.nodes?.find((n) => n.id === e.source);
                        const tgt = data.nodes?.find((n) => n.id === e.target);
                        if (!src || !tgt) return null;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx("g", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "line",
                          {
                            x1: src.x,
                            y1: src.y,
                            x2: tgt.x,
                            y2: tgt.y,
                            stroke: src.color || "rgba(255,255,255,0.15)",
                            strokeWidth: e.animated ? "2" : "1.2",
                            strokeDasharray: e.animated ? "4,4" : "none",
                            className: e.animated ? "animate-[dash_15s_linear_infinite]" : "",
                            style: {
                              opacity: 0.45
                            }
                          }
                        ) }, e.id);
                      }),
                      data.nodes?.map((n) => {
                        const isRoot = n.type === "root";
                        const isMain = n.type === "main";
                        n.type === "leaf";
                        const isHovered = hoveredNode?.id === n.id;
                        if (isRoot) {
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "g",
                            {
                              className: "mindmap-node-group cursor-pointer",
                              onMouseDown: (e) => e.stopPropagation(),
                              onMouseEnter: () => setHoveredNode(n),
                              onMouseLeave: () => setHoveredNode(null),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "circle",
                                  {
                                    cx: n.x,
                                    cy: n.y,
                                    r: isHovered ? "58" : "50",
                                    fill: "url(#root-grad)",
                                    className: "transition-all duration-200"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "rect",
                                  {
                                    x: n.x - 75,
                                    y: n.y - 20,
                                    width: "150",
                                    height: "40",
                                    rx: "12",
                                    fill: "oklch(0.16 0.02 270)",
                                    stroke: isHovered ? "oklch(0.78 0.18 295)" : n.color || "#fff",
                                    strokeWidth: isHovered ? "2.5" : "2",
                                    className: "drop-shadow-[0_0_12px_rgba(150,50,255,0.4)] transition-all duration-200"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: n.x,
                                    y: n.y + 4,
                                    textAnchor: "middle",
                                    fill: "#fff",
                                    className: "font-semibold text-[9px] uppercase tracking-wider select-none pointer-events-none",
                                    children: n.label.length > 20 ? n.label.substring(0, 18) + "..." : n.label
                                  }
                                )
                              ]
                            },
                            n.id
                          );
                        }
                        if (isMain) {
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "g",
                            {
                              className: "mindmap-node-group cursor-pointer",
                              onMouseDown: (e) => e.stopPropagation(),
                              onMouseEnter: () => setHoveredNode(n),
                              onMouseLeave: () => setHoveredNode(null),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "rect",
                                  {
                                    x: n.x - 65,
                                    y: n.y - 16,
                                    width: "130",
                                    height: "32",
                                    rx: "10",
                                    fill: "oklch(0.2 0.03 260)",
                                    stroke: isHovered ? "oklch(0.78 0.18 295)" : n.color || "rgba(255,255,255,0.3)",
                                    strokeWidth: isHovered ? "2" : "1.5",
                                    className: "transition-all duration-200"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "text",
                                  {
                                    x: n.x,
                                    y: n.y + 4,
                                    textAnchor: "middle",
                                    fill: "#fff",
                                    className: "font-semibold text-[9px] select-none pointer-events-none",
                                    children: n.label.length > 20 ? n.label.substring(0, 18) + "..." : n.label
                                  }
                                )
                              ]
                            },
                            n.id
                          );
                        }
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "g",
                          {
                            className: "mindmap-node-group cursor-pointer",
                            onMouseDown: (e) => e.stopPropagation(),
                            onMouseEnter: () => setHoveredNode(n),
                            onMouseLeave: () => setHoveredNode(null),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "circle",
                                {
                                  cx: n.x,
                                  cy: n.y,
                                  r: isHovered ? "7" : "5",
                                  fill: isHovered ? "oklch(0.78 0.18 295)" : "oklch(0.78 0.18 295)",
                                  stroke: "rgba(255,255,255,0.2)",
                                  strokeWidth: isHovered ? "1.5" : "0",
                                  className: "transition-all duration-200"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "text",
                                {
                                  x: n.x > 0 ? n.x + 10 : n.x - 10,
                                  y: n.y + 3,
                                  textAnchor: n.x > 0 ? "start" : "end",
                                  fill: isHovered ? "#fff" : "rgba(255,255,255,0.7)",
                                  className: "text-[9px] select-none pointer-events-none font-medium transition-all duration-200",
                                  children: n.label.length > 22 ? n.label.substring(0, 20) + "..." : n.label
                                }
                              )
                            ]
                          },
                          n.id
                        );
                      })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                        @keyframes dash {
                          to {
                            stroke-dashoffset: -40;
                          }
                        }
                      ` }),
              hoveredNode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/90 p-4 text-xs backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 z-20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-md bg-spark/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-spark", children: hoveredNode.type || "Topic" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-foreground text-sm mt-1", children: hoveredNode.label })
                  ] }),
                  hoveredNode.source && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: hoveredNode.source,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-spark hover:underline bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 transition",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Learn More" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground leading-relaxed text-[11px]", children: hoveredNode.info || "No details provided." })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4 rounded-2xl border border-white/5 bg-black/60 p-3 text-center text-[10px] text-muted-foreground backdrop-blur-sm pointer-events-none select-none", children: "💡 Hover over any node to view detailed descriptions and learning sources." })
            ] });
          })()
        ] }),
        activeTab === "notes" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[400px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setNotesMode("edit"),
                  className: `rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition ${notesMode === "edit" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setNotesMode("preview"),
                  className: `rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition ${notesMode === "preview" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
                  children: "Preview"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground flex items-center gap-1", children: notesSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All notes saved" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin text-spark" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saving drafts..." })
            ] }) })
          ] }),
          notesMode === "edit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: notesContent,
              onChange: (e) => handleNotesChange(e.target.value),
              placeholder: `Write your markdown notes about ${node.title} here...`,
              className: "flex-1 w-full rounded-2xl border border-white/5 bg-black/45 p-4 text-xs text-foreground outline-none focus:border-white/10 font-mono placeholder:text-muted-foreground"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-1 w-full rounded-2xl border border-white/5 bg-black/45 p-4 overflow-y-auto text-xs text-muted-foreground leading-relaxed prose prose-invert",
              "data-lenis-prevent": true,
              children: notesContent.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: notesContent }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center italic py-10", children: "No notes written yet. Switch to Edit to write your first note!" })
            }
          )
        ] }),
        activeTab === "mentor" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[420px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", "data-lenis-prevent": true, children: [
            messages.filter((m) => m.role !== "system").map((message) => {
              const isUser = message.role === "user";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex ${isUser ? "justify-end" : "justify-start"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${isUser ? "bg-gradient-spark text-primary-foreground" : "bg-white/5 border border-white/5 text-muted-foreground"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: getMessageText(message) })
                    }
                  )
                },
                message.id
              );
            }),
            isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-white/5 border border-white/5 px-4 py-2.5 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-spark" }) }) })
          ] }),
          messages.filter((m) => m.role !== "system").length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: [
            {
              l: "Explain Simply",
              q: `Explain the core concepts of "${node.title}" simply like I'm a beginner.`
            },
            {
              l: "Code Examples",
              q: `Show me some real-world code examples using "${node.title}".`
            },
            {
              l: "Interview Qs",
              q: `Give me 3 common interview questions on "${node.title}".`
            }
          ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => handleQuickPrompt(card.q),
              className: "rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] text-muted-foreground hover:bg-white/10 hover:text-foreground transition",
              children: card.l
            },
            card.l
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleChatSubmit,
              className: "flex border-t border-white/5 p-2 bg-background/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: chatInput,
                    onChange: (e) => setChatInput(e.target.value),
                    placeholder: `Ask AI Mentor about ${node.title}...`,
                    className: "flex-1 bg-transparent px-3 text-xs text-foreground outline-none placeholder:text-muted-foreground"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isStreaming || !chatInput.trim(),
                    className: "rounded-lg bg-gradient-spark p-2 text-primary-foreground shadow-glow disabled:opacity-50",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" })
                  }
                )
              ]
            }
          )
        ] }),
        activeTab === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: node.projects.length > 0 ? node.projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "group rounded-2xl border border-white/5 bg-card/45 p-4 transition duration-300 hover:border-white/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground group-hover:text-spark transition", children: project.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `rounded-lg px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider ${project.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400" : project.difficulty === "medium" ? "bg-blue-500/10 text-blue-400" : "bg-red-500/10 text-red-400"}`,
                    children: project.difficulty
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-muted-foreground leading-relaxed", children: project.brief }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => navigate({ to: "/builder", search: { seed: project.title } }),
                  className: "inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/5 px-3 py-1.5 text-[10px] text-foreground hover:bg-white/10 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-3.5 w-3.5 text-spark" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Build with AI" })
                  ]
                }
              ) })
            ]
          },
          project.title
        )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-10", children: "No projects specified." }) })
      ] })
    ] })
  ] });
}
const defaultMentorState = {
  completedNodes: [],
  weakAreas: [],
  strongAreas: [],
  mistakesMade: [],
  topicsStruggledWith: [],
  projectHistory: [],
  resourcePreferences: [],
  projectsBuilt: 0,
  studyTimeMinutes: 0,
  dailyStreak: 0,
  weeklyStreak: 0,
  xp: 0,
  achievements: [],
  interviewScores: {},
  resumeScores: {},
  skillScores: {},
  confidenceScores: {}
};
const defaultAnalytics = {
  studyTimeTotal: 0,
  nodesCompletedTotal: 0,
  resourcesConsumedTotal: 0,
  projectsBuiltTotal: 0,
  quizzesAttemptedTotal: 0,
  mentorSessionsTotal: 0,
  learningVelocity: 0,
  xpGrowth: 0,
  skillGrowth: 0,
  interviewReadiness: 0,
  resumeReadiness: 0,
  consistencyScore: 0,
  focusScore: 0,
  learningStreak: 0
};
const useEcosystemStore = create()(
  persist(
    (set, get) => ({
      mentorState: defaultMentorState,
      learningAnalytics: defaultAnalytics,
      skillGraph: {},
      updateMentorState: (updates) => set((state) => ({
        mentorState: { ...state.mentorState, ...updates }
      })),
      updateAnalytics: (updates) => set((state) => ({
        learningAnalytics: { ...state.learningAnalytics, ...updates }
      })),
      updateSkill: (skill) => set((state) => ({
        skillGraph: { ...state.skillGraph, [skill.name]: skill }
      })),
      syncToSupabase: async (userId) => {
        const { mentorState, learningAnalytics, skillGraph } = get();
        try {
          await supabase.from("profiles").update({
            mentor_state: mentorState,
            learning_analytics: learningAnalytics,
            skill_graph: skillGraph
          }).eq("id", userId);
        } catch (e) {
          console.error("Failed to sync ecosystem state to Supabase", e);
        }
      },
      loadFromSupabase: async (userId) => {
        try {
          const { data, error } = await supabase.from("profiles").select("mentor_state, learning_analytics, skill_graph").eq("id", userId).single();
          if (error) throw error;
          if (data) {
            set((state) => ({
              mentorState: {
                ...defaultMentorState,
                ...data.mentor_state
              },
              learningAnalytics: {
                ...defaultAnalytics,
                ...data.learning_analytics
              },
              skillGraph: {
                ...state.skillGraph,
                ...data.skill_graph
              }
            }));
          }
        } catch (e) {
          console.error("Failed to load ecosystem state from Supabase", e);
        }
      }
    }),
    {
      name: "ecosystem-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mentorState: state.mentorState,
        learningAnalytics: state.learningAnalytics,
        skillGraph: state.skillGraph
      })
    }
  )
);
const CATEGORY_ICONS = {
  Programming: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-4 h-4" }),
  Architecture: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-4 h-4" }),
  Data: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
  AI: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4" }),
  Default: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" })
};
function SkillGraph({ className }) {
  const { skillGraph } = useEcosystemStore();
  const skills = Object.keys(skillGraph).length > 0 ? Object.values(skillGraph) : [
    { name: "Python", score: 82, mastery: "Intermediate", category: "Programming" },
    { name: "System Design", score: 45, mastery: "Beginner", category: "Architecture" },
    { name: "Machine Learning", score: 65, mastery: "Intermediate", category: "AI" },
    { name: "SQL", score: 92, mastery: "Advanced", category: "Data" }
  ];
  const renderProgressBar = (score) => {
    const filledBlocks = Math.floor(score / 10);
    const emptyBlocks = 10 - filledBlocks;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex font-mono text-xs tracking-widest text-cyan-500/80", children: [
      "█".repeat(filledBlocks),
      "░".repeat(emptyBlocks)
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[100px] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-4 h-4 text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white tracking-tight", children: "Neural Skill Map" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 font-mono uppercase tracking-wider", children: "Live Ecosystem Sync" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 relative z-10", children: skills.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.1 },
            className: "group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 group-hover:text-cyan-400 transition-colors", children: CATEGORY_ICONS[skill.category] || CATEGORY_ICONS.Default }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-white/90 group-hover:text-white transition-colors", children: skill.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-mono tracking-widest text-white/40", children: skill.mastery }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-cyan-400 font-bold", children: [
                    skill.score,
                    "%"
                  ] })
                ] })
              ] }),
              renderProgressBar(skill.score)
            ]
          },
          skill.name
        )) })
      ]
    }
  );
}
const RoadmapGalaxy = reactExports.lazy(() => import("./_ssr/RoadmapGalaxy-FJGUPtp2.mjs").then((m) => ({
  default: m.RoadmapGalaxy
})));
function RoadmapSlugPage() {
  const {
    slug
  } = Route$1.useParams();
  const searchParams = Route$1.useSearch();
  const domain = DOMAIN_BY_SLUG[slug];
  useNavigate();
  const fetchRoadmap = useServerFn(getRoadmap);
  const fetchProgress = useServerFn(getDomainProgress);
  const updateProgress = useServerFn(toggleNodeProgress);
  const [activeTier, setActiveTier] = reactExports.useState("beginner");
  const [loading, setLoading] = reactExports.useState(true);
  const [roadmapData, setRoadmapData] = reactExports.useState(null);
  const [dbProgress, setDbProgress] = reactExports.useState([]);
  const [selectedNode, setSelectedNode] = reactExports.useState(null);
  const loadData = reactExports.useCallback(async (t) => {
    setLoading(true);
    try {
      const [roadmapRes, progressRes] = await Promise.all([fetchRoadmap({
        data: {
          slug,
          tier: t
        }
      }), fetchProgress({
        data: {
          slug
        }
      })]);
      const content = roadmapRes?.content ? {
        ...roadmapRes.content
      } : null;
      if (content && content.nodes) {
        content.nodes = content.nodes.map((n) => enrichRoadmapNode(n, slug));
      }
      setRoadmapData(content || null);
      setDbProgress(progressRes?.rows || []);
    } catch (e) {
      toast.error("Failed to load roadmap.");
    } finally {
      setLoading(false);
    }
  }, [slug, fetchRoadmap, fetchProgress]);
  reactExports.useEffect(() => {
    loadData(activeTier);
  }, [activeTier, loadData]);
  reactExports.useEffect(() => {
    if (roadmapData?.nodes && searchParams.node && !selectedNode) {
      const target = roadmapData.nodes.find((n) => n.id === searchParams.node);
      if (target) {
        setSelectedNode(target);
      }
    }
  }, [roadmapData, searchParams.node, selectedNode]);
  const nodeStatusMap = reactExports.useMemo(() => {
    const statusMap = {};
    if (!roadmapData?.nodes) return statusMap;
    const completedSet = /* @__PURE__ */ new Set();
    const inProgressSet = /* @__PURE__ */ new Set();
    if (Array.isArray(dbProgress)) {
      dbProgress.forEach((p) => {
        const pStatus = p.status || "";
        if (pStatus.toLowerCase() === "done" || pStatus.toLowerCase() === "completed") {
          completedSet.add(p.node_id);
        } else if (pStatus.toLowerCase() === "in_progress") {
          inProgressSet.add(p.node_id);
        }
      });
    }
    roadmapData.nodes.forEach((node) => {
      if (completedSet.has(node.id)) {
        statusMap[node.id] = "completed";
      } else if (inProgressSet.has(node.id)) {
        statusMap[node.id] = "in_progress";
      } else {
        statusMap[node.id] = "available";
      }
    });
    return statusMap;
  }, [roadmapData, dbProgress]);
  const totalHours = reactExports.useMemo(() => {
    return roadmapData?.nodes?.reduce((acc, n) => acc + (n.hours || 0), 0) || 0;
  }, [roadmapData]);
  const completedStats = reactExports.useMemo(() => {
    if (!roadmapData?.nodes) return {
      count: 0,
      percent: 0
    };
    const total = roadmapData.nodes.length;
    let completed = 0;
    roadmapData.nodes.forEach((n) => {
      if (nodeStatusMap[n.id] === "completed") completed++;
    });
    return {
      count: completed,
      percent: total ? Math.round(completed / total * 100) : 0
    };
  }, [roadmapData, nodeStatusMap]);
  const handleStatusChange = async (newStatus) => {
    if (!selectedNode) return;
    try {
      await updateProgress({
        data: {
          slug,
          tier: activeTier,
          nodeId: selectedNode.id,
          status: newStatus,
          hours: selectedNode.hours
        }
      });
      if (newStatus === "done") {
        await awardXP(100, `Completed: ${selectedNode.title}`);
      }
      const progressRes = await fetchProgress({
        data: {
          slug
        }
      });
      setDbProgress(progressRes?.rows || []);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };
  const completedIds = reactExports.useMemo(() => new Set(dbProgress.filter((p) => p.status === "done" || p.status === "completed").map((p) => p.node_id)), [dbProgress]);
  const inProgressIds = reactExports.useMemo(() => new Set(dbProgress.filter((p) => p.status === "in_progress").map((p) => p.node_id)), [dbProgress]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { icon: Compass, title: domain?.name ?? "Interactive Roadmap", description: domain?.blurb ?? "Interact, learn, and master this technology roadmap.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/resources", className: "inline-flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-xs text-foreground hover:bg-white/10 transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to tracks" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[650px] overflow-hidden rounded-3xl border border-white/10 bg-[#030014] shadow-2xl", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Initializing learning galaxy..." })
      ] }) : !roadmapData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center text-muted-foreground bg-background/50", children: "No roadmap available." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Loading 3D Galaxy..." })
      ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoadmapGalaxy, { nodes: roadmapData?.nodes || [], completedIds, inProgressIds, selectedNode, onSelectNode: (n) => setSelectedNode(n), nodeStatus: selectedNode ? nodeStatusMap[selectedNode.id] || "locked" : "locked", onStatusChange: handleStatusChange }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4", children: "Galaxy Sectors (Tiers)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["beginner", "intermediate", "advanced"].map((tierKey) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTier(tierKey), className: `flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest transition ${activeTier === tierKey ? "bg-gradient-to-r from-spark/20 to-aurora/20 text-white border border-spark/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "text-white/50 border border-white/5 hover:bg-white/5 hover:text-white"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tierKey }),
            activeTier !== tierKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-white/30 font-mono", children: [
              dbProgress.filter((p) => p.tier === tierKey && p.status === "done").length,
              " ",
              "DONE"
            ] })
          ] }, tierKey)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4", children: "Sector Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-16 w-16 shrink-0 items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-full w-full -rotate-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "26", className: "stroke-white/5", strokeWidth: "4", fill: "transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "32", r: "26", className: "stroke-spark", strokeWidth: "4", fill: "transparent", strokeDasharray: 2 * Math.PI * 26, strokeDashoffset: 2 * Math.PI * 26 * (1 - completedStats.percent / 100), strokeLinecap: "round" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute text-xs font-bold text-white font-mono", children: [
                completedStats.percent,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-white font-display", children: [
                completedStats.count,
                " / ",
                roadmapData?.nodes?.length || 0,
                " Orbits"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1 text-[10px] text-white/50 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5 text-spark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: activeTier })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white/50", children: "Est. Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-flex items-center gap-1.5 font-bold text-white font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-aurora" }),
                " ",
                totalHours,
                "h"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-white/50", children: "XP Earned" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-flex items-center gap-1.5 font-bold text-white font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5 text-emerald-400" }),
                dbProgress.filter((p) => p.tier === activeTier && p.status === "done").reduce((acc, p) => acc + (p.xp_earned || 0), 0),
                " ",
                "XP"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkillGraph, {})
      ] })
    ] }),
    selectedNode && domain && roadmapData && /* @__PURE__ */ jsxRuntimeExports.jsx(NodeDrawer, { open: !!selectedNode, onClose: () => setSelectedNode(null), node: selectedNode, domainSlug: slug, domainName: domain.name, tier: activeTier, nodeStatus: nodeStatusMap[selectedNode.id] || "locked", onStatusChange: handleStatusChange })
  ] });
}
export {
  RoadmapSlugPage as component
};
