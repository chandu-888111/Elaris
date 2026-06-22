import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  Terminal,
  FileText,
  CheckCircle2,
  Bot,
  Network,
  FolderGit2,
  BookOpen,
} from "lucide-react";

export function LiveOSDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setStage(0);
      return;
    }

    // Sequence timing logic
    const sequence = [
      { delay: 0, stage: 1 }, // Input
      { delay: 1500, stage: 2 }, // Roadmap
      { delay: 3000, stage: 3 }, // Study Guide
      { delay: 4500, stage: 4 }, // Resources
      { delay: 6000, stage: 5 }, // Projects
      { delay: 7500, stage: 6 }, // Resume
      { delay: 9000, stage: 7 }, // Interview
    ];

    const timeouts = sequence.map((s) => setTimeout(() => setStage(s.stage), s.delay));
    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="py-32 px-6 md:px-12 relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#03000a] via-spark/5 to-[#03000a] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
          Live Operating System
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto">
          Watch how the AI dynamically generates your entire career ecosystem from a single intent.
        </p>
      </div>

      <div className="relative w-full max-w-4xl aspect-[16/9] glass rounded-3xl border border-white/10 overflow-hidden bg-black/60 shadow-[0_0_50px_rgba(139,92,246,0.15)] flex flex-col">
        {/* Terminal Header */}
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="mx-auto text-[10px] text-white/30 font-mono">sys.spark_forge.init()</div>
        </div>

        {/* Demo Content Area */}
        <div className="flex-1 relative p-8">
          <AnimatePresence mode="popLayout">
            {/* Stage 1: Input */}
            {stage >= 1 && (
              <motion.div
                key="stage1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-2xl font-mono text-white mb-8"
              >
                <span className="text-spark">❯</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="overflow-hidden whitespace-nowrap border-r-2 border-white pr-1"
                >
                  I want to learn AI.
                </motion.span>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-6 h-full mt-8">
              {/* Stage 2: Roadmap */}
              {stage >= 2 && (
                <motion.div
                  key="stage2"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  className="col-span-1 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                    <Network className="w-4 h-4" /> Roadmap Generated
                  </div>
                  <div className="flex-1 border-l border-emerald-500/20 ml-2 pl-4 flex flex-col gap-4 py-2">
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Python Basics
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Neural Networks
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> PyTorch /
                      TensorFlow
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="col-span-2 flex flex-col gap-6">
                {/* Stage 3: Study Guide & Resources */}
                <div className="grid grid-cols-2 gap-6">
                  {stage >= 3 && (
                    <motion.div
                      key="stage3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4"
                    >
                      <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-3">
                        <BookOpen className="w-4 h-4" /> Study Guide Active
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "35%" }}
                          transition={{ duration: 2 }}
                          className="h-full bg-blue-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  {stage >= 4 && (
                    <motion.div
                      key="stage4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 flex flex-wrap gap-2"
                    >
                      <div className="w-full flex items-center gap-2 text-yellow-400 font-mono text-sm mb-1">
                        <FolderGit2 className="w-4 h-4" /> Resources Fetched
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/80">
                        3 Videos
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/80">
                        14 Articles
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/80">
                        GitHub repos
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Stage 5: Projects */}
                {stage >= 5 && (
                  <motion.div
                    key="stage5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-spark/30 bg-spark/5 p-4 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-spark font-mono text-sm mb-2">
                      <Terminal className="w-4 h-4" /> Project Architecture
                    </div>
                    <div className="font-mono text-[10px] text-white/50 space-y-1">
                      <div>
                        <span className="text-pink-400">import</span> torch
                      </div>
                      <div>
                        <span className="text-pink-400">import</span> torch.nn{" "}
                        <span className="text-pink-400">as</span> nn
                      </div>
                      <br />
                      <div>
                        <span className="text-blue-400">class</span>{" "}
                        <span className="text-green-400">Transformer</span>(nn.Module):
                      </div>
                      <div className="pl-4">
                        <span className="text-blue-400">def</span>{" "}
                        <span className="text-yellow-400">__init__</span>(self): ...
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Floating Updates (Resume & Interview) */}
            {stage >= 6 && (
              <motion.div
                key="stage6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-8 right-8 rounded-xl border border-orange-500/50 bg-black/80 backdrop-blur-md p-4 shadow-2xl z-20"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-xs font-bold text-white">Resume Auto-Updated</div>
                    <div className="text-[10px] text-white/50">Added "AI & PyTorch" to skills</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-4" />
                </div>
              </motion.div>
            )}

            {stage >= 7 && (
              <motion.div
                key="stage7"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 rounded-xl border border-purple-500/50 bg-black/90 backdrop-blur-md p-6 shadow-2xl z-30 max-w-[250px]"
              >
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs mb-4">
                  <Bot className="w-4 h-4" /> Interview Prep Ready
                </div>
                <div className="text-xs text-white/80 leading-relaxed">
                  "You've completed the PyTorch module. Are you ready for a mock technical interview
                  on backpropagation?"
                </div>
                <button className="mt-4 w-full py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/50 rounded text-xs text-white transition-colors">
                  Start Interview
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
