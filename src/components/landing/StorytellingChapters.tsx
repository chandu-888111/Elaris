import { useRef, useEffect } from "react";
import { useScroll, motion, useTransform, type MotionValue } from "framer-motion";
import { useLandingMemoryStore } from "@/store/LandingMemoryStore";
import { KineticTypography } from "./KineticTypography";

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  text: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "The Problem",
    subtitle: "Fragmented Ecosystems",
    text: "Developers are forced to jump between dozens of tools, tutorials, and platforms. Context switching kills momentum. The spark fades.",
  },
  {
    id: 2,
    title: "Learning Chaos",
    subtitle: "The Tutorial Hell",
    text: "Endless videos without actual implementation. It's time to break out of the loop and start building real architecture.",
  },
  {
    id: 3,
    title: "AI Guidance",
    subtitle: "Context-Aware Mentorship",
    text: "Imagine an intelligence that understands your entire codebase, your skill level, and your ultimate goals. It doesn't just answer; it guides.",
  },
  {
    id: 4,
    title: "Building Projects",
    subtitle: "Code Flows Like Water",
    text: "Deploy complex architectures with a single click. Watch your infrastructure assemble itself in real-time.",
  },
  {
    id: 5,
    title: "Team Collaboration",
    subtitle: "Global Sync",
    text: "Form alliances with developers across the globe. The AI matches complementary skills instantly.",
  },
  {
    id: 6,
    title: "Career Launch",
    subtitle: "The Ascension",
    text: "Your achievements unlock new trajectories. Your resume and streak scores form a holographic identity.",
  },
  {
    id: 7,
    title: "Developer Evolution",
    subtitle: "Vision 2050",
    text: "ProjectSpark is not a website. It is a full AI Operating System. Step through the portal.",
  },
];

export function StorytellingChapters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = useLandingMemoryStore((state) => state.setScrollProgress);
  const markChapterVisited = useLandingMemoryStore((state) => state.markChapterVisited);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setScrollProgress(v);
      const currentChapter = Math.floor(v * 7) + 1;
      if (currentChapter >= 1 && currentChapter <= 7) {
        markChapterVisited(currentChapter);
      }
    });
  }, [scrollYProgress, setScrollProgress, markChapterVisited]);

  return (
    <div ref={containerRef} className="relative w-full z-10" style={{ height: "700vh" }}>
      {CHAPTERS.map((chapter, i) => (
        <ChapterBlock key={chapter.id} chapter={chapter} index={i} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function ChapterBlock({
  chapter,
  index,
  progress,
}: {
  chapter: Chapter;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / 7;
  const end = (index + 1) / 7;
  const mid = start + (end - start) / 2;

  // Fade in, hold, fade out
  const opacity = useTransform(
    progress,
    [start, start + 0.05, mid, end - 0.05, end],
    [0, 1, 1, 1, 0],
  );

  const y = useTransform(progress, [start, mid, end], [100, 0, -100]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-4xl px-8 flex flex-col items-center text-center pointer-events-auto">
        <div className="mb-6 flex items-center gap-4 opacity-50">
          <div className="h-[1px] w-12 bg-cyan-400" />
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-cyan-400">
            Chapter 0{chapter.id}
          </span>
          <div className="h-[1px] w-12 bg-cyan-400" />
        </div>

        <KineticTypography
          text={chapter.title}
          mode="word"
          className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        />

        <h3 className="text-2xl md:text-3xl text-cyan-300 font-medium mb-8 tracking-wide drop-shadow-md">
          {chapter.subtitle}
        </h3>

        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl font-light">
          {chapter.text}
        </p>
      </div>
    </motion.div>
  );
}
