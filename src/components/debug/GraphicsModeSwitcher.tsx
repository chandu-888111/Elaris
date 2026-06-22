// src/components/debug/GraphicsModeSwitcher.tsx
import React from "react";
import { useSceneStore } from "../../hooks/use-scene-store";

/**
 * Hidden developer UI to manually override graphics mode.
 * Can be rendered conditionally (e.g., only in dev) or attached to a shortcut.
 */
export const GraphicsModeSwitcher: React.FC = () => {
  const graphicsMode = useSceneStore((s) => s.graphicsMode);
  const locked = useSceneStore((s) => s.graphicsModeLocked);
  const setGraphicsMode = useSceneStore((s) => s.setGraphicsMode);
  const lockGraphicsMode = useSceneStore((s) => s.lockGraphicsMode);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value as "ultra" | "high" | "low";
    setGraphicsMode(mode);
    // lock after manual change to avoid auto‑detector overriding it
    lockGraphicsMode(true);
  };

  const handleUnlock = () => {
    lockGraphicsMode(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        padding: "8px 12px",
        borderRadius: 4,
        color: "white",
        fontFamily: "system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      <label htmlFor="gfx-mode">Graphics Mode: </label>
      <select id="gfx-mode" value={graphicsMode} onChange={handleChange} style={{ marginRight: 8 }}>
        <option value="low">Low</option>
        <option value="high">High</option>
        <option value="ultra">Ultra</option>
      </select>
      {locked && (
        <button
          onClick={handleUnlock}
          style={{
            background: "#f87171",
            color: "white",
            border: "none",
            borderRadius: 3,
            padding: "2px 6px",
            cursor: "pointer",
          }}
        >
          Unlock Auto‑Detect
        </button>
      )}
    </div>
  );
};
