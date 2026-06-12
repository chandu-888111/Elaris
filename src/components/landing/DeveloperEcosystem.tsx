import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Dumbbell, Sparkles, FolderGit2, FileText, Target, Rocket } from "lucide-react";

const STAGES = [
  { id: 1, label: "Learning", icon: BookOpen, desc: "Master the fundamentals.", color: "from-blue-500 to-blue-400" },
  { id: 2, label: "Practice", icon: Dumbbell, desc: "Solve real-world problems.", color: "from-cyan-500 to-cyan-400" },
  { id: 3, label: "Projects", icon: Sparkles, desc: "Build AI-architected apps.", color: "from-emerald-500 to-emerald-400" },
  { id: 4, label: "Portfolio", icon: FolderGit2, desc: "Showcase your universe.", color: "from-spark-glow to-spark" },
  { id: 5, label: "Resume", icon: FileText, desc: "ATS-optimized generation.", color: "from-aurora to-aurora/80" },
  { id: 6, label: "Interview", icon: Target, desc: "Mock behavioral & technical.", color: "from-orange-500 to-orange-400" },
  { id: 7, label: "Career", icon: Rocket, desc: "Launch to the stars.", color: "from-red-500 to-red-400" },
];

export function DeveloperEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end center"] });

  return (
    <div ref={containerRef} className="py-32 px-6 md:px-24  relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-spark/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">The Developer Pipeline</h2>
          <p className="text-white/50 max-w-2xl mx-auto">A seamless, end-to-end ecosystem designed to take you from writing your first print statement to landing your dream tech role.</p>
        </div>

        <div className="relative">
          {/* Connecting Line Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full hidden md:block" />
          
          {/* Animated Glow Line */}
          <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-spark via-aurora to-emerald-400 -translate-y-1/2 rounded-full hidden md:block shadow-[0_0_20px_rgba(139,92,246,0.8)]" 
          />

          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 relative">
            {STAGES.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <motion.div 
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-row md:flex-col items-center text-left md:text-center gap-4 relative group"
                >
                  <div className={`w-14 h-14 rounded-2xl glass border border-white/20 flex items-center justify-center shrink-0 relative z-10 shadow-xl bg-gradient-to-br ${stage.color} hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1 tracking-tight">{stage.label}</h3>
                    <p className="text-[10px] text-white/50 leading-relaxed md:max-w-[120px] mx-auto">{stage.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
