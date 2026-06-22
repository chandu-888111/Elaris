import { MessageEditModal } from "@/components/MessageEditModal";
import { Pencil } from "lucide-react";
import { ChatFileUpload } from "@/components/ChatFileUpload";
import { processUploadedFiles } from "@/lib/fileProcessing";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  Send,
  Loader2,
  Sparkles,
  User as UserIcon,
  Square,
  ChevronDown,
  BookOpen,
  FlaskConical,
  CalendarClock,
  Zap,
} from "lucide-react";
import { Markdown } from "@/components/Markdown";
import { unlockAchievement } from "@/lib/gamification";
import { useParams, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Lazy load heavy 3D components
const ChatCommandCanvas = lazy(() => import("@/components/canvas/ChatCommandCanvas"));
const MentorHologram = lazy(() =>
  import("@/components/MentorHologram").then((m) => ({ default: m.MentorHologram })),
);

// --- UI Layout ---

export const Route = createFileRoute("/_app/chat/$threadId")({
  component: ChatThreadPage,
});

type DBMessage = { id: string; role: string; parts: unknown };

function ChatThreadPage() {
  const { threadId } = useParams({ from: "/_app/chat/$threadId" });
  const [initial, setInitial] = useState<UIMessage[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setInitial(null);
    (async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("id, role, parts, created_at")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });
      if (cancelled) return;
      const msgs: UIMessage[] = ((data ?? []) as DBMessage[]).map((m) => ({
        id: m.id,
        role: m.role as UIMessage["role"],
        parts: (Array.isArray(m.parts) ? m.parts : []) as UIMessage["parts"],
      }));
      setInitial(msgs);
    })();
    return () => {
      cancelled = true;
    };
  }, [threadId]);

  if (initial === null) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-spark" />
      </div>
    );
  }
  return <ChatWindow key={threadId} threadId={threadId} initialMessages={initial} />;
}

function ChatWindow({
  threadId,
  initialMessages,
}: {
  threadId: string;
  initialMessages: UIMessage[];
}) {
  const { user } = useAuth();
  const [editingMessage, setEditingMessage] = useState<UIMessage | null>(null);
  const [editText, setEditText] = useState("");
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini" | "both">("both");
  const [responseMode, setResponseMode] = useState<
    "default" | "research" | "learning" | "planning"
  >("default");
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [modeOpen, setModeOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { messages, setMessages, sendMessage, regenerate, status, stop, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onFinish: async ({ message }) => {
      if (!user || !message) return;
      const text = getMessageText(message);
      const parts = [{ type: "text", text }];
      await supabase.from("chat_messages").insert({
        id: crypto.randomUUID(),
        thread_id: threadId,
        user_id: user.id,
        role: message.role,
        parts: parts as unknown as never,
      });
      await supabase
        .from("chat_threads")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", threadId);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const isStreaming = status === "submitted" || status === "streaming";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !user || isStreaming) return;

    // Process uploaded files
    let filesText = "";
    if (files.length > 0) {
      const processed = await processUploadedFiles(files);
      filesText = processed
        .map((p) => `<file name="${p.file.name}">\n${p.text}\n</file>`)
        .join("\n\n");
    }
    const baseCombined = filesText ? `${filesText}\n\n${text}` : text;

    // Add mode‑specific system prompt
    const modePrompt = {
      default: "",
      research: "You are a research assistant. Provide concise factual answers and cite sources.",
      learning:
        "You are an educator. Answer in a structured learning format: definition, features, functionality, procedure, uses, advantages.",
      planning:
        "You are a planner. Provide a detailed step‑by‑step plan with milestones and optional timelines.",
    }[responseMode];

    const finalPrompt = modePrompt ? `${modePrompt}\n\n${baseCombined}` : baseCombined;

    setInput("");
    const userMsgId = crypto.randomUUID();
    await supabase.from("chat_messages").insert({
      id: userMsgId,
      thread_id: threadId,
      user_id: user.id,
      role: "user",
      parts: [{ type: "text", text: finalPrompt }] as unknown as never,
    });
    if (messages.length === 0) {
      const title = baseCombined.length > 50 ? `${baseCombined.slice(0, 50)}…` : baseCombined;
      await supabase.from("chat_threads").update({ title }).eq("id", threadId);
      await unlockAchievement({
        code: "first-chat",
        title: "Curious Mind",
        description: "Initiate a chat discussion with AI.",
        icon: "MessageSquare",
        xp: 50,
      });
    }
    sendMessage({
      id: userMsgId,
      role: "user",
      parts: [{ type: "text", text: finalPrompt }],
    } as unknown as Parameters<typeof sendMessage>[0]);
    setFiles([]);
  };

  const handleSaveEdit = async (newText: string) => {
    if (!editingMessage) return;
    try {
      // Find index in current messages array
      const msgIndex = messages.findIndex((m) => m.id === editingMessage.id);

      // Update the edited message in DB
      await supabase
        .from("chat_messages")
        .update({ parts: [{ type: "text", text: newText }] as unknown as never })
        .eq("id", editingMessage.id);

      if (msgIndex !== -1) {
        // Delete all subsequent messages in DB
        const subsequentIds = messages.slice(msgIndex + 1).map((m) => m.id);
        if (subsequentIds.length > 0) {
          await supabase.from("chat_messages").delete().in("id", subsequentIds);
        }

        // Update local state to truncate and include the edited message
        const updatedMessage = {
          ...messages[msgIndex],
          content: newText,
          parts: [{ type: "text", text: newText }],
        };
        const newMessages = [...messages.slice(0, msgIndex), updatedMessage] as UIMessage[];
        setMessages(newMessages);

        // Tell AI to regenerate response for the newly edited user message
        if (updatedMessage.role === "user") {
          setTimeout(() => {
            regenerate();
          }, 100); // slight delay to ensure state settles
        }
      }

      setEditingMessage(null);
      setEditText("");
    } catch (e) {
      console.error("Failed to save edited message", e);
    }
  };

  return (
    <div className="flex h-full flex-col relative overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-[#000510]" />}>
        <ChatCommandCanvas isStreaming={isStreaming} />
      </Suspense>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 relative z-10 custom-scrollbar"
        data-lenis-prevent
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground"
            >
              {/* Removed purple MentorHologram as requested to fix overlapping with blue ChatCommandCanvas */}
              <p className="text-sm mt-4">
                Ask anything — ideas, code, architecture, learning paths.
              </p>
            </motion.div>
          )}
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <Bubble
                key={m.id}
                m={m}
                onEdit={(msg, textToEdit) => {
                  setEditingMessage(msg);
                  setEditText(textToEdit);
                }}
              />
            ))}
          </AnimatePresence>
          {isStreaming && messages[messages.length - 1]?.role === "assistant" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <Avatar role="assistant" />
              <div className="rounded-2xl border border-border bg-card/60 px-4 py-3">
                <div className="flex gap-1">
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-spark"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-spark"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-spark"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 mt-4"
            >
              <Avatar role="assistant" />
              <div className="rounded-2xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-red-400">
                <p className="font-semibold">Connection Error</p>
                <p className="mt-1">
                  {error.message ||
                    "The AI provider failed to respond. Please check API keys or try again later."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="relative z-10 border-t border-white/10 bg-black/40 px-3 pb-3 pt-3 backdrop-blur-md sm:px-8"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        {/* Attached files preview */}
        {files.length > 0 && (
          <div className="mx-auto mb-2 flex max-w-3xl flex-wrap gap-2">
            {files.map((f, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-lg border border-spark/30 bg-spark/10 px-2.5 py-1 text-xs text-spark"
              >
                📄 {f.name}
                <span className="text-muted-foreground">({Math.round(f.size / 1024)} KB)</span>
                <button
                  type="button"
                  onClick={() => setFiles((curr) => curr.filter((_, idx) => idx !== i))}
                  className="ml-1 rounded-full p-0.5 transition hover:bg-spark/20 hover:text-red-400"
                  aria-label="Remove file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Main input box */}
        <div className="mx-auto flex max-w-3xl flex-col gap-0 rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md transition-all focus-within:border-white/40 focus-within:shadow-[0_0_24px_rgba(255,255,255,0.1)]">
          {/* Textarea row */}
          <div className="flex items-end gap-2 px-3 pt-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSubmit(e);
                }
              }}
              rows={1}
              placeholder="Message ProjectSpark AI…"
              className="flex-1 resize-none bg-transparent py-1.5 text-sm leading-6 outline-none placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Bottom toolbar row */}
          <div className="flex items-center gap-2 border-t border-white/5 px-2 py-2">
            {/* Mode selector */}
            <div className="relative" ref={modeRef}>
              <button
                type="button"
                onClick={() => setModeOpen((o) => !o)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                  responseMode === "default"
                    ? "bg-white/8 text-muted-foreground hover:bg-white/12"
                    : "bg-spark/15 text-spark hover:bg-spark/25"
                }`}
                aria-label="Select response mode"
              >
                {responseMode === "default" && <Zap className="h-3.5 w-3.5" />}
                {responseMode === "research" && <FlaskConical className="h-3.5 w-3.5" />}
                {responseMode === "learning" && <BookOpen className="h-3.5 w-3.5" />}
                {responseMode === "planning" && <CalendarClock className="h-3.5 w-3.5" />}
                <span className="capitalize">{responseMode}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${modeOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {modeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 z-50 mb-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-md"
                  >
                    {(
                      [
                        { value: "default", label: "Default", icon: Zap, desc: "Normal answers" },
                        {
                          value: "research",
                          label: "Research",
                          icon: FlaskConical,
                          desc: "Fact-based & cited",
                        },
                        {
                          value: "learning",
                          label: "Learning",
                          icon: BookOpen,
                          desc: "Structured lessons",
                        },
                        {
                          value: "planning",
                          label: "Planning",
                          icon: CalendarClock,
                          desc: "Step-by-step plans",
                        },
                      ] as const
                    ).map(({ value, label, icon: Icon, desc }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setResponseMode(value);
                          setModeOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                          responseMode === value
                            ? "bg-spark/20 text-spark"
                            : "text-foreground/80 hover:bg-white/8"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-medium">{label}</span>
                          <span className="text-[10px] text-muted-foreground">{desc}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* File upload */}
            <ChatFileUpload onFilesSelected={setFiles} accept=".pdf,.docx,.txt" />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Send / Stop button */}
            {isStreaming ? (
              <button
                type="button"
                onClick={() => stop()}
                className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/90 text-destructive-foreground transition hover:scale-105 hover:bg-destructive"
                aria-label="Stop generating"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-8 w-8 place-items-center rounded-xl bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.4)] transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
                aria-label="Send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-muted-foreground/50">
          {isStreaming
            ? "Generating… click stop to cancel."
            : "ProjectSpark AI · Verify critical information independently."}
        </p>
      </form>

      {/* Edit modal */}
      {editingMessage && (
        <MessageEditModal
          originalText={editText}
          onClose={() => setEditingMessage(null)}
          onSave={async (newText) => {
            await handleSaveEdit(newText);
          }}
        />
      )}
    </div>
  );
}

function Avatar({ role }: { role: string }) {
  const isUser = role === "user";
  return (
    <div
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${isUser ? "bg-card border border-border" : "bg-gradient-spark text-primary-foreground shadow-glow"}`}
    >
      {isUser ? <UserIcon className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
    </div>
  );
}

interface MessagePart {
  type: string;
  text?: string;
}

function getMessageText(
  m: UIMessage & { content?: string; parts?: Array<{ type: string; text?: string }> },
): string {
  if (m.content) return m.content;
  if (Array.isArray(m.parts)) {
    return (m.parts as unknown as MessagePart[])
      .filter(
        (p): p is MessagePart & { text: string } =>
          typeof p === "object" && p !== null && p.type === "text" && typeof p.text === "string",
      )
      .map((p) => p.text)
      .join("\n\n");
  }
  return "";
}

function extractDisplayAndFiles(rawText: string) {
  let displayContext = rawText;

  // Strip mode prompts
  const modePrompts = [
    "You are a research assistant. Provide concise factual answers and cite sources.",
    "You are an educator. Answer in a structured learning format: definition, features, functionality, procedure, uses, advantages.",
    "You are a planner. Provide a detailed step‑by‑step plan with milestones and optional timelines.",
  ];
  for (const p of modePrompts) {
    if (displayContext.startsWith(p)) {
      displayContext = displayContext.substring(p.length).trim();
    }
  }

  // Extract file names and strip file contents
  const files: string[] = [];
  const fileRegex = /<file name="([^"]+)">[\s\S]*?<\/file>/g;
  let match;
  while ((match = fileRegex.exec(displayContext)) !== null) {
    files.push(match[1]);
  }
  displayContext = displayContext.replace(fileRegex, "").trim();

  return { displayContext, files };
}

function Bubble({ m, onEdit }: { m: UIMessage; onEdit?: (m: UIMessage, text: string) => void }) {
  const isUser = m.role === "user";
  const rawText = getMessageText(m);
  const { displayContext, files } = isUser
    ? extractDisplayAndFiles(rawText)
    : { displayContext: rawText, files: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <Avatar role={m.role} />
      <div
        className={`max-w-[85%] rounded-3xl border px-5 py-4 text-sm leading-relaxed shadow-xl backdrop-blur-md ${isUser ? "border-white/20 bg-white/10" : "border-white/5 bg-black/40"}`}
      >
        {isUser ? (
          <div className="flex flex-col gap-2">
            {files.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {files.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] flex items-center gap-1 bg-background/50 text-spark px-2 py-0.5 rounded-md border border-spark/20 shadow-sm"
                  >
                    📎 {f}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-start gap-2">
              <p className="whitespace-pre-wrap">{displayContext}</p>
              {onEdit && (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
                  onClick={() => onEdit(m, displayContext)}
                  aria-label="Edit message"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <Markdown>{displayContext}</Markdown>
        )}
      </div>
    </motion.div>
  );
}
