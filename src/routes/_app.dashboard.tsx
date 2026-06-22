import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef, useMemo, Suspense, lazy } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/PageHeader";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { HolographicPanel } from "@/components/HolographicPanel";
import { playHover, playClick } from "@/lib/sounds";
import { getPlanetForXP, PLANETARY_LEVELS } from "@/lib/gamification";
import { SharedCanvas as Canvas } from "@/components/SharedCanvas";

// Lazy load heavy 3D canvas
const UniverseMap = lazy(() => import("@/components/canvas/UniverseMapCanvas"));

// --- Dashboard UI ---

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Mission Control — ProjectSpark" }] }),
  component: Dashboard,
});

type RecentProject = {
  id: string;
  title: string;
  created_at: string;
};

type Stats = {
  projects: number;
  saved: number;
  threads: number;
  xp: number;
  streak: number;
  recent: RecentProject[];
  achievements: { title: string; [key: string]: unknown }[];
};

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [
        { count: projects },
        { count: saved },
        { count: threads },
        { data: profile },
        { data: recent },
        { data: achievementsData },
      ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("bookmarked", true),
        supabase.from("chat_threads").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("xp, streak_days").eq("id", user.id).maybeSingle(),
        supabase
          .from("projects")
          .select("id, title, created_at")
          .order("created_at", { ascending: false })
          .limit(3),
        supabase.from("achievements").select("code").eq("user_id", user.id),
      ]);

      setStats({
        projects: projects ?? 0,
        saved: saved ?? 0,
        threads: threads ?? 0,
        xp: profile?.xp ?? 0,
        streak: profile?.streak_days ?? 0,
        recent: recent ?? [],
        achievements: (achievementsData ?? []).map((a) => ({ title: a.code })),
      });
    })();
  }, [user]);

  const { current, next } = stats
    ? getPlanetForXP(stats.xp)
    : { current: PLANETARY_LEVELS[0], next: PLANETARY_LEVELS[1] };
  const progressPct = stats
    ? Math.max(
        0,
        Math.min(100, Math.round(((stats.xp - current.xp) / (next.xp - current.xp)) * 100)),
      )
    : 0;

  return (
    <PageShell className="p-0 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 bg-[#02000a]">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <UniverseMap
              xp={stats?.xp || 0}
              projects={stats?.projects || 0}
              achievements={stats?.achievements || []}
              skills={4} // Mock skills count
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating UI Overlays */}
      <div className="relative z-10 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar p-6">
        {/* Header HUD */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
              <Icons.Radar className="h-6 w-6 text-spark" />
              Mission Control Center
            </h1>
            <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">
              Commander: {user?.email?.split("@")[0] || "Guest"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/generator"
              onClick={playClick}
              onMouseEnter={playHover}
              className="glass rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              Launch Project
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Developer Galaxy Progression */}
            <HolographicPanel className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-spark mb-1">
                    Current Coordinates
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-display font-bold text-white">
                      {current.name}
                    </span>
                    <span className="text-xs font-mono text-white/50">{current.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {stats?.xp || 0} XP
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40">
                    Total Experience
                  </div>
                </div>
              </div>

              <div className="relative pt-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-white/50 mb-2 font-mono">
                  <span>{current.xp} XP</span>
                  <span className="text-white">
                    Next: {next.name} ({next.xp} XP)
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-spark to-aurora"
                  />
                </div>
              </div>
            </HolographicPanel>

            <div className="grid grid-cols-2 gap-4">
              {/* Stats Cards */}
              <HolographicPanel className="p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
                <Icons.Flame className="h-5 w-5 text-orange-500 mb-3" />
                <div className="text-3xl font-display font-bold text-white">
                  {stats?.streak || 0}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1">
                  Day Streak
                </div>
              </HolographicPanel>

              <HolographicPanel className="p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
                <Icons.Trophy className="h-5 w-5 text-amber-400 mb-3" />
                <div className="text-3xl font-display font-bold text-white">
                  {stats?.achievements.length || 0}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 mt-1">
                  Constellations Unlocked
                </div>
              </HolographicPanel>
            </div>

            {/* AI Recommendations */}
            <HolographicPanel className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4 flex items-center gap-2">
                <Icons.BrainCircuit className="h-4 w-4 text-spark" /> AI Flight Recommendations
              </h3>
              <div className="space-y-3">
                <div className="glass rounded-xl p-3 border border-white/5 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-spark/20 text-spark mt-0.5">
                    <Icons.Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Continue Roadmap</h4>
                    <p className="text-[10px] text-white/60 mt-1">
                      You are 80% through the React track. Next node: Advanced Hooks.
                    </p>
                  </div>
                </div>
                <div className="glass rounded-xl p-3 border border-white/5 flex gap-3 items-start">
                  <div className="p-2 rounded-lg bg-aurora/20 text-aurora mt-0.5">
                    <Icons.Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Interview Readiness</h4>
                    <p className="text-[10px] text-white/60 mt-1">
                      Your ATS score is 85/100. Time to attempt a mock interview session.
                    </p>
                  </div>
                </div>
              </div>
            </HolographicPanel>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <HolographicPanel className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                Orbiting Projects
              </h3>
              <div className="space-y-2">
                {stats?.recent.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-center p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white">{p.title}</span>
                    <Icons.ArrowRight className="h-3 w-3 text-white/30" />
                  </div>
                ))}
                {(!stats?.recent || stats.recent.length === 0) && (
                  <p className="text-xs text-white/30 text-center py-4">
                    No projects launched yet.
                  </p>
                )}
              </div>
            </HolographicPanel>

            <HolographicPanel className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
                Space Stations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/roadmap"
                  className="glass rounded-xl p-4 text-center border border-white/5 hover:border-spark/50 transition flex flex-col items-center gap-2"
                >
                  <Icons.Map className="h-5 w-5 text-spark" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                    Galaxy Map
                  </span>
                </Link>
                <Link
                  to="/mentor"
                  className="glass rounded-xl p-4 text-center border border-white/5 hover:border-aurora/50 transition flex flex-col items-center gap-2"
                >
                  <Icons.Bot className="h-5 w-5 text-aurora" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                    AI Mentor
                  </span>
                </Link>
                <Link
                  to="/study-guide"
                  className="glass rounded-xl p-4 text-center border border-white/5 hover:border-emerald-500/50 transition flex flex-col items-center gap-2"
                >
                  <Icons.BookOpen className="h-5 w-5 text-emerald-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                    Library
                  </span>
                </Link>
                <Link
                  to="/job-prep"
                  className="glass rounded-xl p-4 text-center border border-white/5 hover:border-orange-500/50 transition flex flex-col items-center gap-2"
                >
                  <Icons.Target className="h-5 w-5 text-orange-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white">
                    Simulations
                  </span>
                </Link>
              </div>
            </HolographicPanel>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
