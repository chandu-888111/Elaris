import { motion } from "framer-motion";
import { useSceneStore } from "@/hooks/use-scene-store";
import { CHAPTERS } from "@/hooks/use-narrative-machine";

export function ChapterProgressBar() {
  const activeChapterId = useSceneStore((s) => s.activeChapterId);
  const scrollProgress = useSceneStore((s) => s.scrollProgress);

  return (
    <div className="fixed right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-6 select-none md:right-8">
      {/* Scroll track with filled progress */}
      <div className="relative h-60 w-1 rounded-full bg-white/5">
        <motion.div
          className="absolute top-0 w-full rounded-full bg-gradient-to-b from-spark to-cyan-400"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Floating dot indicators */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {CHAPTERS.map((ch, idx) => {
            const isActive = ch.id === activeChapterId;
            const percentage = (idx / (CHAPTERS.length - 1)) * 100;
            return (
              <div
                key={ch.id}
                className="absolute right-1/2 translate-x-1/2 flex items-center justify-end group"
                style={{ top: `${percentage}%` }}
              >
                {/* Tooltip Label */}
                <div className="absolute right-6 scale-95 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 pointer-events-none select-none">
                  <div className="glass rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur shadow-glow">
                    {ch.id}
                  </div>
                </div>

                {/* Pulsing indicator button */}
                <button
                  className={`relative flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive ? "scale-110" : "scale-100 hover:scale-105"
                  }`}
                  onClick={() => {
                    const targetPercent = ch.start;
                    const documentHeight =
                      document.documentElement.scrollHeight - window.innerHeight;
                    window.scrollTo({
                      top: targetPercent * documentHeight,
                      behavior: "smooth",
                    });
                  }}
                  aria-label={`Scroll to chapter ${ch.id}`}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isActive ? "bg-spark/20 animate-ping" : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-spark bg-spark shadow-glow"
                        : "border-white/30 bg-black/60 hover:border-white/60"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ChapterProgressBar;
