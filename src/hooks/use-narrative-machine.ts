import { useEffect } from "react";
import { type MotionValue } from "framer-motion";
import { useSceneStore } from "@/hooks/use-scene-store";
import { useAudioStore } from "@/store/AudioStore";

export type ChapterId =
  | "awakening"
  | "first-signal"
  | "expansion"
  | "intelligence"
  | "singularity"
  | "elaris";

export interface ChapterConfig {
  id: ChapterId;
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
}

export const CHAPTERS: ChapterConfig[] = [
  {
    id: "awakening",
    start: 0.0,
    end: 0.12,
    eyebrow: "AWAKENING",
    headline: "In the beginning there was silence. Then a signal appeared.",
  },
  {
    id: "first-signal",
    start: 0.12,
    end: 0.28,
    eyebrow: "FIRST SIGNAL",
    headline: "A spark crossed the void. The universe noticed.",
  },
  {
    id: "expansion",
    start: 0.28,
    end: 0.48,
    eyebrow: "EXPANSION",
    headline: "Systems emerged. Knowledge began to connect.",
  },
  {
    id: "intelligence",
    start: 0.48,
    end: 0.68,
    eyebrow: "INTELLIGENCE",
    headline: "Patterns became understanding. Understanding became intention.",
  },
  {
    id: "singularity",
    start: 0.68,
    end: 0.85,
    eyebrow: "SINGULARITY",
    headline: "Every path converged. Every possibility became visible.",
  },
  {
    id: "elaris",
    start: 0.85,
    end: 1.0,
    eyebrow: "ELARIS",
    headline: "Not a destination. A new beginning.",
  },
];

/**
 * Hook to run the narrative state machine by syncing scroll progression
 * to Zustand's active chapter, timeOfUniverse, and scroll progress values.
 */
export function useNarrativeMachine(scrollYProgress: MotionValue<number>) {
  const setActiveChapterId = useSceneStore((s) => s.setActiveChapterId);
  const setTimeOfUniverse = useSceneStore((s) => s.setTimeOfUniverse);
  const setScrollProgress = useSceneStore((s) => s.setScrollProgress);
  const addVisitedChapter = useSceneStore((s) => s.addVisitedChapter);

  useEffect(() => {
    const handleProgressUpdate = (latest: number) => {
      // Clamp between 0 and 1
      const normalized = Math.max(0, Math.min(1, latest));
      setScrollProgress(normalized);
      setTimeOfUniverse(normalized);

      // Update audio drone frequency based on scroll progress
      useAudioStore.getState().setScrollProgression(normalized);

      const current = CHAPTERS.find((ch) => normalized >= ch.start && normalized <= ch.end);

      if (current) {
        setActiveChapterId(current.id);
        addVisitedChapter(current.id);
      }
    };

    // Initial update
    handleProgressUpdate(scrollYProgress.get());

    const unsub = scrollYProgress.on("change", handleProgressUpdate);
    return () => unsub();
  }, [
    scrollYProgress,
    setActiveChapterId,
    setTimeOfUniverse,
    setScrollProgress,
    addVisitedChapter,
  ]);
}
