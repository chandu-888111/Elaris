import React from "react";
import { motion } from "framer-motion";
import { useEcosystemStore } from "@/stores/useEcosystemStore";
import { cn } from "@/lib/utils";
import { Activity, Brain, Code2, Database, Network } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Programming: <Code2 className="w-4 h-4" />,
  Architecture: <Network className="w-4 h-4" />,
  Data: <Database className="w-4 h-4" />,
  AI: <Brain className="w-4 h-4" />,
  Default: <Activity className="w-4 h-4" />,
};

export function SkillGraph({ className }: { className?: string }) {
  const { skillGraph } = useEcosystemStore();

  // For demo if empty
  const skills =
    Object.keys(skillGraph).length > 0
      ? Object.values(skillGraph)
      : [
          { name: "Python", score: 82, mastery: "Intermediate", category: "Programming" },
          { name: "System Design", score: 45, mastery: "Beginner", category: "Architecture" },
          { name: "Machine Learning", score: 65, mastery: "Intermediate", category: "AI" },
          { name: "SQL", score: 92, mastery: "Advanced", category: "Data" },
        ];

  const renderProgressBar = (score: number) => {
    const filledBlocks = Math.floor(score / 10);
    const emptyBlocks = 10 - filledBlocks;
    return (
      <div className="flex font-mono text-xs tracking-widest text-cyan-500/80">
        {"█".repeat(filledBlocks)}
        {"░".repeat(emptyBlocks)}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Brain className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Neural Skill Map</h3>
          <p className="text-xs text-white/50 font-mono uppercase tracking-wider">
            Live Ecosystem Sync
          </p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {skills.map((skill, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={skill.name}
            className="group"
          >
            <div className="flex justify-between items-end mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-white/40 group-hover:text-cyan-400 transition-colors">
                  {CATEGORY_ICONS[skill.category] || CATEGORY_ICONS.Default}
                </span>
                <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                  {skill.mastery}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{skill.score}%</span>
              </div>
            </div>

            {renderProgressBar(skill.score)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
