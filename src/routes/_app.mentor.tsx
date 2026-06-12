import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, Suspense, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateMentorPlan } from "@/lib/ai.functions";
import type { MentorPlan } from "@/lib/schemas";
import { PageShell } from "@/components/PageHeader";
import {
  Brain,
  Loader2,
  Lightbulb,
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Menu,
  MessageSquare
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SaveBar } from "@/components/SaveBar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { awardXP, XP } from "@/lib/gamification";
import { toast } from "sonner";
import { z } from "zod";
import { HolographicPanel } from "@/components/HolographicPanel";
import { lazy } from "react";

// Lazy load heavy 3D canvas
const MentorChamberCanvas = lazy(() => import("@/components/canvas/MentorChamberCanvas"));

type MentorRow = {
  id: string;
  created_at: string;
  topic: string;
  level: string;
  goal: string | null;
  plan: MentorPlan;
};

const mentorSearchSchema = z.object({
  node: z.string().optional(),
  restoreId: z.string().optional(),
});

export const Route = createFileRoute("/_app/mentor")({
  validateSearch: mentorSearchSchema,
  head: () => ({ meta: [{ title: "AI Mentor — ProjectSpark" }] }),
  component: MentorPage,
});

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

// --- Main Page Component ---

function MentorPage() {
  const generate = useServerFn(generateMentorPlan);
  const { user } = useAuth();
  const { node, restoreId } = Route.useSearch();

  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<MentorPlan | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (restoreId && user) {
      const loadSaved = async () => {
        const { data, error } = await supabase.from("mentor_plans").select("*").eq("id", restoreId).single();
        if (!error && data) {
          setTopic(data.topic);
          setLevel(data.level);
          setGoal(data.goal ?? "");
          setPlan(data.plan as any);
          setDone({});
          toast.success("Loaded saved lesson plan!");
        }
      };
      loadSaved();
    }
  }, [restoreId, user]);

  useEffect(() => {
    if (node) {
      const [domainSlug, nodeId] = node.split(":");
      const cleanTopic = nodeId ? nodeId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : node;
      setTopic(cleanTopic);
      const cleanGoal = `Master ${cleanTopic} inside ${domainSlug}`;
      setGoal(cleanGoal);

      setLoading(true);
      setErr(null);
      setPlan(null);
      generate({ data: { topic: cleanTopic, level, goal: cleanGoal } })
        .then((res) => setPlan(res))
        .catch((e) => setErr(e instanceof Error ? e.message : "Failed"))
        .finally(() => setLoading(false));
    }
  }, [node]);

  const onGen = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setErr(null);
    setPlan(null);
    try {
      setPlan(await generate({ data: { topic, level, goal: goal || `Learn ${topic}` } }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    if (!user || !plan) return;
    const { error } = await supabase.from("mentor_plans").insert({
      user_id: user.id, topic, level, goal: goal || null, plan: plan as unknown as never,
    });
    if (!error) await awardXP(XP.SAVE_MENTOR, "Saved mentor plan");
  };

  const SUGGESTIONS = ["React Hooks", "System Design", "TypeScript Generics", "Machine Learning", "Docker"];

  return (
    <PageShell className="p-0 overflow-hidden">
      {/* 3D Environment Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-[#02000a]" />}>
        <MentorChamberCanvas isTyping={loading} />
      </Suspense>

      {/* Floating UI Layer */}
      <div className="relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6">
        
        {/* Holographic Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
              <Brain className="h-6 w-6 text-spark" />
              Holographic Mentor Chamber
            </h1>
            <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">
              A.I. Tutor Array: Online
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/chat" className="glass rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition border border-white/10 flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <MessageSquare className="h-3 w-3" /> Connect Chat
            </Link>
            <SaveBar<MentorRow>
              canSave={!!plan}
              onSave={onSave}
              pickerTable="mentor_plans"
              pickerSelect="id, created_at, topic, level, goal, plan"
              pickerToRow={(r) => ({ id: r.id, label: r.topic, meta: `${r.level}` })}
              pickerOnPick={(r) => {
                setTopic(r.topic); setLevel(r.level); setGoal(r.goal ?? ""); setPlan(r.plan); setDone({});
              }}
            />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] max-w-7xl mx-auto">
          
          {/* Controls Panel */}
          <HolographicPanel className="space-y-6 p-6 bg-black/40 backdrop-blur-3xl border-white/10 rounded-3xl self-start sticky top-6">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark">Subject Target</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Initialize learning parameter..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-spark focus:ring-1 focus:ring-spark outline-none transition"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark">Cognitive Level</label>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${level === l ? "border-spark bg-spark/20 text-spark" : "border-white/10 text-white/40 hover:bg-white/5"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-spark">Objective (Optional)</label>
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Define end-state..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-spark focus:ring-1 focus:ring-spark outline-none transition"
              />
            </div>
            
            <button
              onClick={onGen}
              disabled={loading || !topic.trim()}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-spark to-aurora p-[1px] disabled:opacity-50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-spark to-aurora opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative flex items-center justify-center gap-2 rounded-xl bg-black/50 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md">
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-spark" /> : <Brain className="h-4 w-4 text-spark" />}
                {loading ? "Synthesizing..." : "Initiate Protocol"}
              </div>
            </button>
            {err && <p className="text-xs text-red-400 font-mono">{err}</p>}

            <div>
              <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Suggested Parameters</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setTopic(s); onGen(); }}
                    className="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/50 hover:bg-white/10 hover:text-white transition cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </HolographicPanel>

          {/* Results Panel */}
          <div className="min-h-[500px] space-y-6">
            {!plan && !loading && (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm p-8 text-center">
                <p className="text-sm font-mono text-spark animate-pulse uppercase tracking-widest">Awaiting Input Parameters...</p>
              </div>
            )}
            
            {loading && (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <HolographicPanel key={i} className="h-24 bg-black/40 border-white/10 rounded-3xl animate-pulse" />
                ))}
              </div>
            )}
            
            {plan && (
              <div className="space-y-6 pb-24">
                <HolographicPanel className="p-6 bg-black/40 backdrop-blur-3xl border-white/10 rounded-3xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-spark mb-1">Synthesized Pathway</div>
                      <h2 className="font-display text-3xl font-bold text-white">{plan.topic}</h2>
                    </div>
                    <div className="rounded-full border border-spark/30 bg-spark/10 px-4 py-2 text-xs font-mono text-spark">
                      ETA: {plan.estimatedHours}h
                    </div>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{plan.overview}</p>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-aurora" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Prerequisites</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.prerequisites.map((p, i) => (
                        <span key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-mono text-white/60">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </HolographicPanel>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/50 ml-2">Learning Modules</h3>
                  {plan.concepts.map((c, i) => (
                    <HolographicPanel key={i} className={`p-6 border-white/10 rounded-3xl transition-all duration-300 ${done[i] ? "bg-black/60 opacity-50" : "bg-black/40 backdrop-blur-3xl hover:bg-white/5"}`}>
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                          className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${done[i] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-white/20 hover:border-spark text-white/50"}`}
                        >
                          {done[i] ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-lg font-bold ${done[i] ? "line-through text-white/30" : "text-white"}`}>
                            {c.name}
                          </h4>
                          <p className={`mt-2 text-sm leading-relaxed ${done[i] ? "text-white/20" : "text-white/60"}`}>{c.explanation}</p>
                          <pre className={`mt-4 w-full max-w-full overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-xs leading-relaxed ${done[i] ? "text-white/20" : "text-emerald-400/80"}`}>
                            {c.example}
                          </pre>
                        </div>
                      </div>
                    </HolographicPanel>
                  ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <HolographicPanel className="p-6 bg-black/40 backdrop-blur-3xl border-white/10 rounded-3xl">
                    <div className="mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-spark" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Practice Vectors</h3>
                    </div>
                    <ul className="space-y-3">
                      {plan.practiceTasks.map((t, i) => (
                        <li key={i} className="flex gap-3 text-sm text-white/60">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spark" /> {t}
                        </li>
                      ))}
                    </ul>
                  </HolographicPanel>
                  <HolographicPanel className="p-6 bg-black/40 backdrop-blur-3xl border-white/10 rounded-3xl">
                    <div className="mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-aurora" />
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Next Ascension</h3>
                    </div>
                    <ul className="space-y-3">
                      {plan.nextSteps.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm text-white/60">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aurora" /> {s}
                        </li>
                      ))}
                    </ul>
                  </HolographicPanel>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
