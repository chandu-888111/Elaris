// src/hooks/use-scene-store.ts
import * as THREE from "three";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PARTICLE_COUNTS } from "@/constants/particleConstants";

type GraphicsMode = "ultra" | "high" | "low";

type CameraMode = "chase" | "side" | "orbit" | "flyby" | "pullback" | "dramatic";

type ShipMode = "idle" | "cruise" | "boost" | "reverse";

export interface SceneState {
  // New fields for global canvas
  currentScene: string;
  setCurrentScene: (scene: string) => void;

  // Core graphics
  graphicsMode: GraphicsMode;
  graphicsModeLocked: boolean;

  coreScale: number;
  setCoreScale: (value: number) => void;
  // Accessibility flags
  reduceMotion: boolean;
  prefersReducedTransparency: boolean;
  keyboardNavigation: boolean;
  screenReaderMode: boolean;

  // Cursor & scroll
  cursorPos: { x: number; y: number };
  scrollProgress: number; // 0‑1 normalized

  // Chapter handling
  activeChapterId: string | null;
  visitedChapters: string[];
  unlockedEasterEggs: string[];

  // Ship physics & state
  shipVelocity: number;
  shipBankAngle: number;
  shipMode: ShipMode;

  // Event system
  eventQueue: string[];

  // Audio mute state
  audioMuted: boolean;

  // Dynamic time system (0 → 1 throughout the scroll narrative)
  timeOfUniverse: number;

  // HUD visibility (dev only by default)
  hudVisible: boolean;
  // Camera mode
  cameraMode: CameraMode;
  cameraPosition: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;
  // Setters (exposed for external modules)
  setGraphicsMode: (mode: GraphicsMode) => void;
  lockGraphicsMode: (locked: boolean) => void;
  setCameraMode: (mode: CameraMode) => void;
  setHudVisible: (visible: boolean) => void;
  setScene: (scene: string) => void;
  setReduceMotion: (value: boolean) => void;
  setPrefersReducedTransparency: (value: boolean) => void;
  setKeyboardNavigation: (value: boolean) => void;
  setScreenReaderMode: (value: boolean) => void;
  setCursorPos: (x: number, y: number) => void;
  setScrollProgress: (progress: number) => void;
  setActiveChapterId: (id: string | null) => void;
  addVisitedChapter: (id: string) => void;
  addUnlockedEasterEgg: (id: string) => void;
  setShipVelocity: (v: number) => void;
  setShipBankAngle: (a: number) => void;
  setShipMode: (mode: ShipMode) => void;
  enqueueEvent: (event: string) => void;
  dequeueEvent: (event: string) => void;
  setAudioMuted: (m: boolean) => void;
  setTimeOfUniverse: (t: number) => void;
}

export const useSceneStore = create<SceneState>()(
  devtools((set, get) => ({
    graphicsMode: "high",
    graphicsModeLocked: false,
    cameraMode: "chase",
    cameraPosition: [0, 0, 0],
    reduceMotion: false,
    prefersReducedTransparency: false,
    keyboardNavigation: false,
    screenReaderMode: false,
    cursorPos: { x: 0, y: 0 },
    scrollProgress: 0,
    activeChapterId: null,
    visitedChapters: [],
    unlockedEasterEggs: [],
    shipVelocity: 0,
    shipBankAngle: 0,
    shipMode: "idle",
    eventQueue: [],
    audioMuted: true,
    timeOfUniverse: 0,
    hudVisible: import.meta.env.DEV ? true : false,
    // New setters for global UI flags
    setHudVisible: (visible: boolean) => set({ hudVisible: visible }),
    // Shortcut for currentScene
    setScene: (scene: string) => set({ currentScene: scene }),
    // New defaults
    currentScene: "default",
    coreScale: 1,
    setCoreScale: (value: number) => set({ coreScale: value }),
    setGraphicsMode: (mode: GraphicsMode) => {
      const state = get() as SceneState;
      if (!state.graphicsModeLocked) set({ graphicsMode: mode });
    },
    lockGraphicsMode: (locked: boolean) => set({ graphicsModeLocked: locked }),
    setCameraMode: (mode: CameraMode) => set({ cameraMode: mode }),
    setCameraPosition: (pos: [number, number, number]) => set({ cameraPosition: pos }),
    setCurrentScene: (scene: string) => set({ currentScene: scene }),
    setReduceMotion: (value: boolean) => set({ reduceMotion: value }),
    setPrefersReducedTransparency: (value: boolean) => set({ prefersReducedTransparency: value }),
    setKeyboardNavigation: (value: boolean) => set({ keyboardNavigation: value }),
    setScreenReaderMode: (value: boolean) => set({ screenReaderMode: value }),
    setCursorPos: (x: number, y: number) => set({ cursorPos: { x, y } }),
    setScrollProgress: (progress: number) => set({ scrollProgress: progress }),
    setActiveChapterId: (id: string | null) => set({ activeChapterId: id }),
    addVisitedChapter: (id: string) => {
      const list = get().visitedChapters;
      if (!list.includes(id)) set({ visitedChapters: [...list, id] });
    },
    addUnlockedEasterEgg: (id: string) => {
      const list = get().unlockedEasterEggs;
      if (!list.includes(id)) set({ unlockedEasterEggs: [...list, id] });
    },
    setShipVelocity: (v: number) => set({ shipVelocity: v }),
    setShipBankAngle: (a: number) => set({ shipBankAngle: a }),
    setShipMode: (mode: ShipMode) => set({ shipMode: mode }),
    enqueueEvent: (event: string) => set((state) => ({ eventQueue: [...state.eventQueue, event] })),
    dequeueEvent: (event: string) =>
      set((state) => ({ eventQueue: state.eventQueue.filter((e) => e !== event) })),
    setAudioMuted: (m: boolean) => set({ audioMuted: m }),
    setTimeOfUniverse: (t: number) => set({ timeOfUniverse: t }),
  })),
);

// Export a direct reference for parts of the codebase that need the full store instance
export const sceneStore = useSceneStore;

// Lightweight selector for HUD to avoid unnecessary re-renders
export const useHudState = () =>
  useSceneStore((s) => ({
    graphicsMode: s.graphicsMode,
    cameraMode: s.cameraMode,
    shipMode: s.shipMode,
    hudVisible: s.hudVisible,
    particleCount: PARTICLE_COUNTS[s.graphicsMode],
    shipVelocity: s.shipVelocity,
    shipBankAngle: s.shipBankAngle,
    reduceMotion: s.reduceMotion,
    prefersReducedTransparency: s.prefersReducedTransparency,
    audioMuted: s.audioMuted,
    scrollProgress: s.scrollProgress,
    // Additional metrics can be added as needed
  }));
