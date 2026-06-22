import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LandingMemoryState {
  visitedChapters: number[];
  scrollProgress: number;
  motionIntensity: "low" | "high";

  markChapterVisited: (chapter: number) => void;
  setScrollProgress: (progress: number) => void;
  setMotionIntensity: (intensity: "low" | "high") => void;
}

export const useLandingMemoryStore = create<LandingMemoryState>()(
  persist(
    (set) => ({
      visitedChapters: [],
      scrollProgress: 0,
      motionIntensity: "high", // Default to premium experience

      markChapterVisited: (chapter) =>
        set((state) => ({
          visitedChapters: state.visitedChapters.includes(chapter)
            ? state.visitedChapters
            : [...state.visitedChapters, chapter],
        })),

      setScrollProgress: (scrollProgress) => set({ scrollProgress }),

      setMotionIntensity: (motionIntensity) => set({ motionIntensity }),
    }),
    {
      name: "projectspark-landing-memory",
    },
  ),
);
