import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudioStore } from "@/store/AudioStore";
import { useSceneStore } from "@/hooks/use-scene-store";

export function CinematicPreloader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { initAudio } = useAudioStore();
  const setState = useSceneStore((s) => s.setState);

  useEffect(() => {
    if (progress === 100) {
      // Small delay to ensure everything is settled
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleEnter = () => {
    initAudio();
    setIsDismissed(true);
    // Let the fade out animation play before unmounting the scene protections
    setTimeout(() => {
      setState({ preloaderDismissed: true });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050A] text-white"
        >
          <div className="flex flex-col items-center justify-center w-full max-w-md px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs tracking-[0.3em] font-medium text-white/50 mb-8 uppercase text-center"
            >
              PROJECTSPARK // INITIALIZING CORE...
            </motion.div>

            {/* Progress Bar & Percentage Container */}
            <div className="w-full relative h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isReady ? (
                  <motion.div
                    key="loading-ui"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center gap-4"
                  >
                    {/* Progress Bar */}
                    <div className="w-full h-[1px] bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.2 }}
                      />
                    </div>
                    {/* Percentage */}
                    <div className="font-mono text-sm tracking-widest text-white/70">
                      {Math.floor(progress)}%
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready-btn"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
                  >
                    <button
                      onClick={handleEnter}
                      className="relative overflow-hidden group px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                      <span className="relative z-10 text-sm tracking-[0.3em] font-bold uppercase">
                        Enter Universe
                      </span>
                      {/* Glow sweep effect */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
