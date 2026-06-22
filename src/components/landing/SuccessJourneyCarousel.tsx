import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STORIES = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Full Stack Engineer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote:
      "ProjectSpark's dynamic architecture mapped out exactly what I needed to learn. I went from tutorial hell to deploying complex microservices in 3 months.",
    achievement: "Architected scalable backend",
    xp: "42,500 XP",
    skills: ["Go", "Kubernetes", "Redis", "Microservices"],
    projects: 14,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "AI Integration Lead",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    quote:
      "The visual 3D node maps helped me understand how AI models integrate into standard web stacks. It was the missing link in my career.",
    achievement: "Deployed first AI Agent",
    xp: "38,200 XP",
    skills: ["PyTorch", "LangChain", "Next.js", "OpenAI API"],
    projects: 9,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Frontend Architect",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    quote:
      "Seeing my resume analyzed and mapped against global job requirements holographically gave me the clarity I needed to negotiate my promotion.",
    achievement: "Mastered WebGL & R3F",
    xp: "51,100 XP",
    skills: ["React Three Fiber", "Three.js", "GSAP", "Framer Motion"],
    projects: 22,
  },
];

export function SuccessJourneyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % STORIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % STORIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const handleDragEnd = (_e: unknown, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -10000) handleNext();
    else if (swipe > 10000) handlePrev();
  };

  return (
    <section className="relative z-10 w-full py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Success Journeys
        </h2>
        <p className="text-white/50 text-lg">
          Witness the evolution of developers within the Spark ecosystem.
        </p>
      </div>

      <div className="relative h-[500px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1200px]">
        <AnimatePresence initial={false} custom={direction}>
          {STORIES.map((story, idx) => {
            // Calculate relative position for depth stacking
            let offset = idx - activeIndex;
            if (offset < -1) offset += STORIES.length;
            if (offset > 1) offset -= STORIES.length;

            if (Math.abs(offset) > 1) return null; // Only render active and immediate neighbors

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            let x = 0;
            let z = 0;
            let rotateY = 0;
            let opacity = 1;
            let zIndex = 10;

            if (isCenter) {
              x = 0;
              z = 100;
              rotateY = 0;
              opacity = 1;
              zIndex = 20;
            } else if (isLeft) {
              x = -300;
              z = -100;
              rotateY = 25;
              opacity = 0.5;
              zIndex = 10;
            } else if (isRight) {
              x = 300;
              z = -100;
              rotateY = -25;
              opacity = 0.5;
              zIndex = 10;
            }

            return (
              <motion.div
                key={story.id}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute w-[350px] md:w-[450px] h-[450px] rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-grab active:cursor-grabbing flex flex-col"
                initial={false}
                animate={{ x, z, rotateY, opacity, zIndex }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="h-48 w-full bg-[#0a0a0f] border-b border-white/10 relative overflow-hidden flex flex-col justify-end p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 to-transparent" />

                  <div className="relative z-20 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1">
                        Latest Achievement
                      </div>
                      <div className="text-lg font-medium text-white">{story.achievement}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
                        Experience
                      </div>
                      <div className="text-lg font-mono text-white">{story.xp}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-white/80 text-sm italic leading-relaxed">"{story.quote}"</p>

                    <div>
                      <div className="text-[10px] uppercase text-white/40 mb-2 tracking-wider">
                        Skills Unlocked
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {story.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10 text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                        <span className="px-2 py-1 text-[10px] rounded bg-white/5 border border-white/10 text-spark">
                          +{story.projects} Projects
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 pt-4 border-t border-white/10">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-10 h-10 rounded-full border border-white/20 object-cover"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">{story.name}</div>
                      <div className="text-xs text-white/50">{story.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-[-60px] flex items-center justify-center gap-4 w-full">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
