import { create } from "zustand";

export type UniverseEventType =
  | "none"
  | "meteor_shower"
  | "comet_flyby"
  | "solar_flare"
  | "nebula_storm"
  | "space_time_fracture"
  | "galaxy_birth_pulse"
  | "supernova"
  | "neural_storm"
  | "quantum_rain";

interface EventSchedulerState {
  currentEvent: UniverseEventType;
  eventIntensity: number; // 0.0 to 1.0
  triggerEvent: (event: UniverseEventType, durationMs?: number) => void;
  clearEvent: () => void;
}

export const useEventScheduler = create<EventSchedulerState>((set) => ({
  currentEvent: "none",
  eventIntensity: 0,

  triggerEvent: (event, durationMs = 5000) => {
    set({ currentEvent: event, eventIntensity: 1.0 });

    // Automatically clear event after duration
    if (durationMs > 0) {
      setTimeout(() => {
        set({ currentEvent: "none", eventIntensity: 0 });
      }, durationMs);
    }
  },

  clearEvent: () => set({ currentEvent: "none", eventIntensity: 0 }),
}));

// Setup automatic random events
export function startEventScheduler() {
  const events: UniverseEventType[] = [
    "meteor_shower",
    "comet_flyby",
    "solar_flare",
    "nebula_storm",
    "space_time_fracture",
    "supernova",
    "neural_storm",
    "quantum_rain",
  ];

  setInterval(() => {
    const isEvent = Math.random() > 0.7; // 30% chance every 15s
    if (isEvent) {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      useEventScheduler.getState().triggerEvent(randomEvent, 8000);
    }
  }, 15000);
}
