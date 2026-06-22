// src/hooks/use-hotkeys.ts
import { useEffect } from "react";
import { useSceneStore } from "@/hooks/use-scene-store";

/**
 * Global hotkey hook.
 * Registers Shift + Alt + D to toggle the Debug HUD visibility.
 */
export function useHotkeys() {
  const toggleHud = () => {
    const current = useSceneStore.getState().hudVisible;
    useSceneStore.getState().setHudVisible(!current);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.code === "KeyD") {
        e.preventDefault();
        toggleHud();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
}
