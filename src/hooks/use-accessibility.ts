// src/hooks/use-accessibility.ts
import { useEffect } from "react";
import { useSceneStore } from "../hooks/use-scene-store";

/**
 * Hook that syncs OS accessibility preferences with the global scene store.
 * - prefers-reduced-motion
 * - prefers-reduced-transparency (custom, uses media query for `prefers-reduced-data` – fallback to motion)
 * - keyboard navigation detection (focus-visible support)
 * - screen reader detection (simple heuristic based on `aria-live` focus)
 */
export function useAccessibility() {
  const setReduceMotion = useSceneStore((s) => s.setReduceMotion);
  const setPrefersReducedTransparency = useSceneStore((s) => s.setPrefersReducedTransparency);
  const setKeyboardNavigation = useSceneStore((s) => s.setKeyboardNavigation);
  const setScreenReaderMode = useSceneStore((s) => s.setScreenReaderMode);

  useEffect(() => {
    // Reduced motion
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    setReduceMotion(motionMedia.matches);
    motionMedia.addEventListener("change", handleMotion);

    // Reduced transparency – we approximate with prefers-reduced-data if available
    const transparencyMedia = window.matchMedia("(prefers-reduced-data: reduce)");
    const handleTransparency = (e: MediaQueryListEvent) => setPrefersReducedTransparency(e.matches);
    setPrefersReducedTransparency(transparencyMedia.matches);
    transparencyMedia.addEventListener("change", handleTransparency);

    // Keyboard navigation detection – listen for Tab key globally
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setKeyboardNavigation(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Simple screen reader detection – when an element with aria-live receives focus
    const liveObserver = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        if (mut.addedNodes) {
          for (const node of Array.from(mut.addedNodes)) {
            const el = node as HTMLElement;
            if (el && el.getAttribute && el.getAttribute("aria-live")) {
              setScreenReaderMode(true);
            }
          }
        }
      }
    });
    liveObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      motionMedia.removeEventListener("change", handleMotion);
      transparencyMedia.removeEventListener("change", handleTransparency);
      window.removeEventListener("keydown", handleKeyDown);
      liveObserver.disconnect();
    };
  }, [setReduceMotion, setPrefersReducedTransparency, setKeyboardNavigation, setScreenReaderMode]);
}
