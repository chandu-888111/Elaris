import { useEffect } from "react";
import { useSceneStore } from "@/hooks/use-scene-store";

/**
 * SceneDirector – R3F component that orchestrates camera mode, ship physics,
 * and background animations based on the current active narrative chapter.
 */
export function SceneDirector() {
  const activeChapterId = useSceneStore((s) => s.activeChapterId);
  const setCameraMode = useSceneStore((s) => s.setCameraMode);
  const setShipMode = useSceneStore((s) => s.setShipMode);

  useEffect(() => {
    if (!activeChapterId) return;

    switch (activeChapterId) {
      case "awakening":
      case "first-signal":
        setCameraMode("orbit");
        setShipMode("idle");
        break;
      case "expansion":
        setCameraMode("chase"); // Follows useScrollTimeline path
        setShipMode("cruise");
        break;
      case "intelligence":
        setCameraMode("flyby");
        setShipMode("cruise");
        break;
      case "singularity":
        setCameraMode("flyby");
        setShipMode("boost");
        break;
      case "elaris":
        setCameraMode("dramatic");
        setShipMode("boost");
        break;
      default:
        setCameraMode("chase");
        setShipMode("idle");
    }
  }, [activeChapterId, setCameraMode, setShipMode]);

  return null;
}

export default SceneDirector;
