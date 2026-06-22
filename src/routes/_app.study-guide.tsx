import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateStudyGuide } from "@/lib/ai.functions";
import type { StudyGuide } from "@/lib/schemas";
import { PageShell, PageHeader } from "@/components/PageHeader";
import { GraduationCap, Loader2, BookOpen, FlaskConical, Brain, Bookmark, Cpu } from "lucide-react";
import { SaveBar } from "@/components/SaveBar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { awardXP, XP, unlockAchievement } from "@/lib/gamification";
import { toast } from "sonner";
import { z } from "zod";
import { HolographicPanel } from "@/components/HolographicPanel";
import { getBYOXLinkForTask } from "@/lib/byox-link";
import { lazy, Suspense } from "react";

// Lazy load heavy 3D background and components
const LibraryCanvas = lazy(() => import("@/components/canvas/LibraryCanvas"));
const StudyGuideUniverse = lazy(() =>
  import("@/components/StudyGuideUniverse").then((m) => ({ default: m.StudyGuideUniverse })),
);

type StudyRow = {
  id: string;
  created_at: string;
  domain: string;
  skill_level: string;
  goal: string;
  daily_minutes: number;
  content: StudyGuide;
};

const studySearchSchema = z.object({
  node: z.string().optional(),
  restoreId: z.string().optional(),
});

export const Route = createFileRoute("/_app/study-guide")({
  validateSearch: studySearchSchema,
  head: () => ({ meta: [{ title: "Study Guide — ProjectSpark" }] }),
  component: StudyPage,
});

const DOMAINS = [
  "Web Dev",
  "AI/ML",
  "Data Science",
  "Mobile",
  "Cybersecurity",
  "Cloud",
  "DevOps",
  "Blockchain",
];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

function StudyPage() {
  const generate = useServerFn(generateStudyGuide);
  const { user } = useAuth();
  const { node, restoreId } = Route.useSearch();

  const [domain, setDomain] = useState(DOMAINS[0]);
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Land first dev job");
  const [dailyMinutes, setDailyMinutes] = useState(60);
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<StudyGuide | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  useEffect(() => {
    if (node) {
      const [domainSlug, nodeId] = node.split(":");
      const cleanTopic = nodeId
        ? nodeId
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
        : node;
      setDomain(cleanTopic);
      const cleanGoal = `Learn ${cleanTopic} inside ${domainSlug}`;
      setGoal(cleanGoal);

      setLoading(true);
      setErr(null);
      setGuide(null);
      generate({ data: { domain: cleanTopic, skillLevel, goal: cleanGoal, dailyMinutes } })
        .then((res) => setGuide(res))
        .catch((e) => setErr(e instanceof Error ? e.message : "Failed"))
        .finally(() => setLoading(false));
    }
    // Omission of 'generate', 'skillLevel', and 'dailyMinutes' is intentional:
    // we only want to auto-generate a study guide once when the route 'node'
    // search parameter is loaded, not when other configuration state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node]);

  useEffect(() => {
    if (restoreId && user) {
      const loadSavedGuide = async () => {
        setLoading(true);
        setErr(null);
        try {
          const { data, error } = await supabase
            .from("study_guides")
            .select("id, created_at, domain, skill_level, goal, daily_minutes, content")
            .eq("id", restoreId)
            .single();
          if (error) throw error;
          if (data) {
            setDomain(data.domain);
            setSkillLevel(data.skill_level);
            setGoal(data.goal);
            setDailyMinutes(data.daily_minutes);
            setGuide(data.content as unknown as StudyGuide);
            setCompleted({});
            setBookmarks({});
          }
        } catch (e) {
          setErr(e instanceof Error ? e.message : "Failed to load study guide");
        } finally {
          setLoading(false);
        }
      };
      loadSavedGuide();
    }
  }, [restoreId, user]);

  const onGen = async () => {
    setLoading(true);
    setErr(null);
    setGuide(null);
    try {
      setGuide(await generate({ data: { domain, skillLevel, goal, dailyMinutes } }));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async () => {
    if (!user || !guide) return;
    const { error } = await supabase.from("study_guides").insert({
      user_id: user.id,
      domain,
      skill_level: skillLevel,
      goal,
      daily_minutes: dailyMinutes,
      content: guide as unknown as never,
    });
    if (error) {
      toast.error("Save failed");
      return;
    }
    await awardXP(XP.SAVE_STUDY, "Saved study guide");
    await unlockAchievement({
      code: "save-study",
      title: "Focused Learner",
      description: "Create and save a weekly study guide.",
      icon: "GraduationCap",
      xp: 50,
    });
  };

  const totalTasks =
    guide?.modules.reduce((a, m) => a + m.practice.length + m.test.length + 1, 0) ?? 0;
  const doneTasks = Object.values(completed).filter(Boolean).length;
  const xp = doneTasks * 25;
  const streak = Math.min(doneTasks, 30);

  return (
    <PageShell className="p-0 overflow-hidden relative">
      <Suspense fallback={<div className="absolute inset-0 bg-[#01030a]" />}>
        <LibraryCanvas />
      </Suspense>

      <div className="relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6">
        <PageHeader
          icon={GraduationCap}
          title="AI Study Guide"
          description="A personalised, week-by-week curriculum with tasks, resources, projects and quizzes."
          actions={
            <SaveBar<StudyRow>
              canSave={!!guide}
              onSave={onSave}
              pickerTable="study_guides"
              pickerSelect="id, created_at, domain, skill_level, goal, daily_minutes, content"
              pickerToRow={(r) => ({
                id: r.id,
                label: r.domain,
                meta: `${r.skill_level} · ${r.goal}`,
              })}
              pickerOnPick={(r) => {
                setDomain(r.domain);
                setSkillLevel(r.skill_level);
                setGoal(r.goal);
                setDailyMinutes(r.daily_minutes);
                setGuide(r.content);
                setCompleted({});
                setBookmarks({});
              }}
            />
          }
        />

        <div className="grid gap-6 lg:grid-cols-[360px_1fr] max-w-7xl mx-auto pb-12 mt-6">
          <HolographicPanel className="space-y-4 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md self-start sticky top-6">
            <Field label="Domain">
              <Pills value={domain} setValue={setDomain} options={DOMAINS} />
            </Field>
            <Field label="Skill level">
              <Pills value={skillLevel} setValue={setSkillLevel} options={LEVELS} />
            </Field>
            <Field label="Your goal">
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label={`Daily time: ${dailyMinutes} min`}>
              <input
                type="range"
                min={15}
                max={240}
                step={15}
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(+e.target.value)}
                className="w-full accent-spark"
              />
            </Field>
            <button
              onClick={onGen}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GraduationCap className="h-4 w-4" />
              )}
              {loading ? "Generating…" : "Generate study guide"}
            </button>
            {err && <p className="text-xs text-destructive">{err}</p>}

            {guide && (
              <div className="grid grid-cols-3 gap-2">
                <MiniStat label="XP" value={xp} />
                <MiniStat label="Streak" value={`${streak}d`} />
                <MiniStat label="Done" value={`${doneTasks}/${totalTasks}`} />
              </div>
            )}
          </HolographicPanel>

          <div className="min-h-[400px] space-y-4 relative">
            {guide && (
              <div className="absolute right-0 top-0 z-10 flex rounded-xl border border-white/5 bg-black/55 p-1 backdrop-blur">
                <button
                  onClick={() => setViewMode("3d")}
                  className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                    viewMode === "3d"
                      ? "bg-gradient-spark text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  3D Universe
                </button>
                <button
                  onClick={() => setViewMode("2d")}
                  className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                    viewMode === "2d"
                      ? "bg-gradient-spark text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  2D List
                </button>
              </div>
            )}

            {!guide && !loading && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 text-center text-sm text-muted-foreground">
                <GraduationCap className="mb-3 h-8 w-8 text-spark animate-float" />
                Pick your goal — get a complete curriculum.
              </div>
            )}
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted/30" />
                ))}
              </div>
            )}
            {guide && (
              <>
                {viewMode === "3d" ? (
                  <Suspense
                    fallback={
                      <div className="flex h-[400px] items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                        <div className="h-12 w-12 rounded-full border-2 border-spark border-t-transparent animate-spin" />
                      </div>
                    }
                  >
                    <StudyGuideUniverse
                      guide={guide}
                      completed={completed}
                      onToggleComplete={(k) => setCompleted((c) => ({ ...c, [k]: !c[k] }))}
                      bookmarks={bookmarks}
                      onToggleBookmark={(k) => setBookmarks((b) => ({ ...b, [k]: !b[k] }))}
                    />
                  </Suspense>
                ) : (
                  <>
                    <HolographicPanel className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-spark">
                        Data Core
                      </div>
                      <h2 className="font-display text-3xl font-bold text-white mt-1">
                        {guide.title}
                      </h2>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">{guide.summary}</p>
                    </HolographicPanel>

                    <div className="space-y-8">
                      {guide.modules.map((m, idx) => (
                        <HolographicPanel
                          key={m.id}
                          className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-colors"
                        >
                          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                            <h3 className="font-bold text-xl text-white">
                              Module {idx + 1} — {m.title}
                            </h3>
                          </div>

                          <div className="space-y-6">
                            {/* LEARN */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-spark mb-2 flex items-center gap-2">
                                <BookOpen className="h-3 w-3" /> Learn
                              </h4>
                              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                                {m.learn}
                              </p>
                            </div>

                            {/* VISUALIZE */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-aurora mb-2 flex items-center gap-2">
                                <Cpu className="h-3 w-3" /> Visualize
                              </h4>
                              <pre className="bg-black/50 border border-white/5 rounded-xl p-4 text-xs font-mono text-white/60 overflow-x-auto">
                                {m.visualize}
                              </pre>
                            </div>

                            {/* PRACTICE */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                                <FlaskConical className="h-3 w-3" /> Practice
                              </h4>
                              <ul className="space-y-2">
                                {m.practice.map((t, i) => {
                                  const k = `prac-${m.id}-${i}`;
                                  return (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                      <button
                                        onClick={() => setCompleted((c) => ({ ...c, [k]: !c[k] }))}
                                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border ${completed[k] ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/20"}`}
                                      >
                                        {completed[k] && "✓"}
                                      </button>
                                      <span
                                        className={`flex-1 ${completed[k] ? "text-white/30 line-through" : "text-white/80"}`}
                                      >
                                        {t}
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            {/* BUILD */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">
                                Build: {m.build.title}
                              </h4>
                              <p className="text-sm text-white/70 mb-3">{m.build.description}</p>
                              <button
                                onClick={() =>
                                  setCompleted((c) => ({
                                    ...c,
                                    [`build-${m.id}`]: !c[`build-${m.id}`],
                                  }))
                                }
                                className={`text-xs px-3 py-1.5 rounded-lg border ${completed[`build-${m.id}`] ? "bg-purple-500/20 border-purple-500 text-purple-300" : "bg-transparent border-white/20 text-white/60"}`}
                              >
                                {completed[`build-${m.id}`] ? "Completed Project" : "Mark as Built"}
                              </button>
                            </div>

                            {/* TEST */}
                            <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                                <Brain className="h-3 w-3" /> Test Knowledge
                              </h4>
                              <div className="space-y-4">
                                {m.test.map((t, i) => {
                                  const k = `test-${m.id}-${i}`;
                                  return (
                                    <div
                                      key={i}
                                      className="bg-black/30 rounded-xl p-4 border border-white/5"
                                    >
                                      <p className="text-sm font-medium text-white mb-3">
                                        {t.question}
                                      </p>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {t.options.map((opt, oIdx) => (
                                          <button
                                            key={oIdx}
                                            onClick={() => {
                                              if (opt === t.answer) {
                                                setCompleted((c) => ({ ...c, [k]: true }));
                                                toast.success("Correct answer!");
                                              } else {
                                                toast.error("Incorrect, try again.");
                                              }
                                            }}
                                            className={`text-left text-xs p-2.5 rounded-lg border transition-colors ${completed[k] && opt === t.answer ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"}`}
                                          >
                                            {opt}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </HolographicPanel>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
function Pills({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setValue(o)}
          className={`rounded-full border px-3 py-1 text-xs ${value === o ? "border-spark bg-spark/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-2 text-center">
      <div className="font-display text-lg">{value}</div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
function Card({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <HolographicPanel className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5 text-spark" />
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">{title}</h3>
      </div>
      <ul className="space-y-3 text-sm">
        <BookOpen className="hidden" />
        {items.map((i, n) => (
          <li key={n} className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-spark" />
            {i}
          </li>
        ))}
      </ul>
    </HolographicPanel>
  );
}
