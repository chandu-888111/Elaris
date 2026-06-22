import { create } from "zustand";

type CursorVariant = "default" | "magnetic" | "text" | "hidden" | "active" | "portal";

interface CursorState {
  variant: CursorVariant;
  position: { x: number; y: number };
  magneticTarget: { x: number; y: number; width: number; height: number } | null;
  textContext: string;

  setVariant: (variant: CursorVariant) => void;
  setPosition: (x: number, y: number) => void;
  setMagneticTarget: (rect: DOMRect | null) => void;
  setTextContext: (text: string) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: "default",
  position: { x: 0, y: 0 },
  magneticTarget: null,
  textContext: "",

  setVariant: (variant) => set({ variant }),
  setPosition: (x, y) => set({ position: { x, y } }),
  setMagneticTarget: (rect) => {
    if (!rect) {
      set({ magneticTarget: null });
      return;
    }
    set({
      magneticTarget: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      },
    });
  },
  setTextContext: (textContext) => set({ textContext }),
}));
