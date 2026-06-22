import React from "react";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { cn } from "@/lib/utils";
import { Activity, Flame, Target, TrendingUp, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface LearningAnalyticsProps {
  variant?: "dashboard" | "compact" | "full";
  className?: string;
}

export function LearningAnalytics({ variant = "dashboard", className }: LearningAnalyticsProps) {
  const { learningAnalytics, mentorState } = useEcosystemStore();

  const metrics = [
    {
      label: "Learning Velocity",
      value: `${learningAnalytics.learningVelocity || 0}%`,
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Consistency Score",
      value: `${learningAnalytics.consistencyScore || 0}/100`,
      icon: Activity,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Focus Score",
      value: `${learningAnalytics.focusScore || 0}/100`,
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Current Streak",
      value: `${mentorState.dailyStreak || 0} Days`,
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      label: "XP Growth",
      value: `+${learningAnalytics.xpGrowth || 0}`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Total Projects",
      value: mentorState.projectsBuilt || 0,
      icon: Trophy,
      color: "text-spark",
      bg: "bg-spark/10",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={cn("grid grid-cols-2 gap-2", className)}>
        {metrics.slice(0, 4).map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5"
          >
            <div className={cn("p-1 rounded-md", m.bg)}>
              <m.icon className={cn("w-3 h-3", m.color)} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/50">{m.label}</div>
              <div className="text-xs font-bold text-white">{m.value}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Learning Analytics</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
            Live Ecosystem Metrics
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          System Healthy
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-xl", m.bg)}>
                <m.icon className={cn("w-5 h-5", m.color)} />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">
                {m.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {variant === "full" && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-sm font-bold text-white mb-4">Readiness Scores</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold text-white/70">
                <span>Interview Readiness</span>
                <span className="text-emerald-400">
                  {learningAnalytics.interviewReadiness || 0}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${learningAnalytics.interviewReadiness || 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold text-white/70">
                <span>Resume Readiness</span>
                <span className="text-blue-400">{learningAnalytics.resumeReadiness || 0}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${learningAnalytics.resumeReadiness || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
