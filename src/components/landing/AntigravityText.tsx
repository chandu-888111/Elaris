import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const WORDS = ["LEARN.", "BUILD.", "PRACTICE.", "COLLABORATE.", "INNOVATE.", "LAUNCH."];

interface AntigravityWordProps {
  word: string;
  i: number;
  scrollYProgress: MotionValue<number>;
}

function AntigravityWord({ word, i, scrollYProgress }: AntigravityWordProps) {
  // Calculate a staggered reveal range for each word
  const start = i * (1 / WORDS.length);
  const end = start + 1 / WORDS.length;

  // Opacity reveals as you scroll past this word's chunk
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-6xl md:text-9xl font-black tracking-tighter text-white"
    >
      {word}
    </motion.span>
  );
}

export function AntigravityText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="py-48 px-6 md:px-24  overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <p className="text-spark text-sm font-bold tracking-[0.3em] uppercase mb-4">
          The Ecosystem
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {WORDS.map((word, i) => (
            <AntigravityWord key={word} word={word} i={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
