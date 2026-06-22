import { motion, useInView } from "framer-motion";
import { useRef, useState, Suspense, type ComponentType } from "react";
import { View } from "@react-three/drei";
import {
  BookOpen,
  Dumbbell,
  Sparkles,
  FolderGit2,
  FileText,
  Target,
  Rocket,
  Users,
  Bot,
} from "lucide-react";
import {
  AIMentorWorld,
  StudyGuideWorld,
  RoadmapWorld,
  BuilderWorld,
  ResourcesWorld,
  ResumeBuilderWorld,
  ResumeAnalyzerWorld,
  TeamMatchmakingWorld,
  AIAssistantWorld,
} from "../canvas/EcosystemMiniWorlds";

const MODULES = [
  {
    id: 1,
    label: "AI Mentor",
    icon: BookOpen,
    desc: "24/7 personalized guidance.",
    color: "from-blue-500 to-blue-400",
    World: AIMentorWorld,
  },
  {
    id: 2,
    label: "Study Guide",
    icon: Dumbbell,
    desc: "Dynamic curriculum generation.",
    color: "from-cyan-500 to-cyan-400",
    World: StudyGuideWorld,
  },
  {
    id: 3,
    label: "Roadmap",
    icon: Sparkles,
    desc: "Step-by-step career pathing.",
    color: "from-emerald-500 to-emerald-400",
    World: RoadmapWorld,
  },
  {
    id: 4,
    label: "Project Builder",
    icon: FolderGit2,
    desc: "AI-architected applications.",
    color: "from-spark-glow to-spark",
    World: BuilderWorld,
  },
  {
    id: 5,
    label: "Resources",
    icon: FileText,
    desc: "Curated learning materials.",
    color: "from-aurora to-aurora/80",
    World: ResourcesWorld,
  },
  {
    id: 6,
    label: "Resume Builder",
    icon: FileText,
    desc: "ATS-optimized generation.",
    color: "from-orange-500 to-orange-400",
    World: ResumeBuilderWorld,
  },
  {
    id: 7,
    label: "Resume Analyzer",
    icon: Target,
    desc: "Real-time AI scoring.",
    color: "from-red-500 to-red-400",
    World: ResumeAnalyzerWorld,
  },
  {
    id: 8,
    label: "Team Matchmaking",
    icon: Users,
    desc: "Find global collaborators.",
    color: "from-pink-500 to-pink-400",
    World: TeamMatchmakingWorld,
  },
  {
    id: 9,
    label: "AI Assistant",
    icon: Bot,
    desc: "Chat with your universe.",
    color: "from-purple-500 to-purple-400",
    World: AIAssistantWorld,
  },
];

interface EcosystemModule {
  id: number;
  label: string;
  icon: ComponentType<{ className?: string }>;
  desc: string;
  color: string;
  World: ComponentType<{ isHovered: boolean }>;
}

function EcosystemCard({ module, index }: { module: EcosystemModule; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group rounded-3xl overflow-hidden glass border border-white/10 p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/30"
    >
      {/* 3D World Viewport */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5">
        <div className="absolute inset-0 z-10 pointer-events-none rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />

        {/* Only mount the heavy 3D View if the card is visible. We also pass isHovered so the world could react if needed. */}
        {isInView && (
          <View className="w-full h-full">
            <Suspense fallback={null}>
              {/* If not hovered, we pause rendering to save massive CPU/GPU. In React Three Fiber, we can't pause a single View easily without pausing the whole Canvas, but unmounting the world works, or just rendering static fallback. For simplicity, we mount the animated world. R3F handles culling if offscreen. */}
              <module.World isHovered={isHovered} />
            </Suspense>
          </View>
        )}

        {/* Hover overlay stats */}
        <div
          className={`absolute bottom-2 left-2 right-2 flex justify-between items-center z-20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
            STATUS: ONLINE
          </div>
          <div className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
            SYNC: 100%
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${module.color}`}
        >
          <module.icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold">{module.label}</h3>
          <p className="text-xs text-white/60">{module.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function DeveloperEcosystem() {
  return (
    <div className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-spark/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            The Developer Ecosystem
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A seamless, end-to-end OS designed to take you from writing your first print statement
            to landing your dream tech role.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {MODULES.map((module, i) => (
            <EcosystemCard key={module.id} module={module} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
