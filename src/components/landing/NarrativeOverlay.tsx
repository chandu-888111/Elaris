import { motion, AnimatePresence } from "framer-motion";
import { useSceneStore } from "@/hooks/use-scene-store";
import { CHAPTERS } from "@/hooks/use-narrative-machine";

export function NarrativeOverlay() {
  const activeChapterId = useSceneStore((s) => s.activeChapterId);

  const currentChapter = CHAPTERS.find((ch) => ch.id === activeChapterId) || CHAPTERS[0];

  return (
    <div className="pointer-events-none fixed bottom-8 left-6 z-20 select-none md:bottom-12 md:left-12 max-w-xs sm:max-w-sm md:max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter.id}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.3 }}
          className="glass-strong flex flex-col items-start gap-2 rounded-2xl border border-white/5 bg-black/40 p-4 sm:p-5 backdrop-blur-md shadow-glow"
        >
          {/* Eyebrow / System status */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-spark">
            <span className="h-1.5 w-1.5 rounded-full bg-spark animate-pulse" />
            <span>SYSTEM LOG // {currentChapter.eyebrow}</span>
          </div>

          {/* Description line */}
          <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/80 font-mono">
            &gt; {currentChapter.headline}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default NarrativeOverlay;
