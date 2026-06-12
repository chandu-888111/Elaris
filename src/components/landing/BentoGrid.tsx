import { motion } from "framer-motion";
import { Brain, Code2, Map, Users, Target, Rocket } from "lucide-react";

const FEATURES = [
  {
    title: "AI Project Generator",
    desc: "From idea to full stack architecture in seconds.",
    icon: Code2,
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-2",
    color: "from-spark/20 to-spark/5"
  },
  {
    title: "Interactive Roadmaps",
    desc: "3D planetary galaxies guiding your career.",
    icon: Map,
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    color: "from-aurora/20 to-aurora/5"
  },
  {
    title: "AI Mentor",
    desc: "24/7 holographic tutor.",
    icon: Brain,
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    color: "from-emerald-500/20 to-emerald-500/5"
  },
  {
    title: "Mock Interviews",
    desc: "Crack any tech interview.",
    icon: Target,
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    color: "from-orange-500/20 to-orange-500/5"
  },
  {
    title: "Global Collaboration",
    desc: "Match with devs worldwide.",
    icon: Users,
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    color: "from-blue-500/20 to-blue-500/5"
  }
];

export function BentoGrid() {
  return (
    <div className="py-32 px-6 md:px-24  relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-white mb-6">
            Everything a <span className="text-transparent bg-clip-text bg-gradient-to-r from-spark to-aurora">Developer Needs</span>.
          </h2>
          <p className="text-xl text-white/50 max-w-2xl">
            ProjectSpark isn't just a learning platform. It's a complete operating system for your career, combining AI generation, 3D visualizations, and global networking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-white/30 transition-colors ${feat.colSpan} ${feat.rowSpan}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                  <feat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-white/60 text-sm">{feat.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
