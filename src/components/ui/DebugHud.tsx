// src/components/ui/DebugHud.tsx
import React, { useEffect, useRef, useState } from "react";
import { useHudState } from "@/hooks/use-scene-store";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useScrollVelocity } from "@/hooks/use-scroll-velocity";

/**
 * Minimal developer HUD showing performance, narrative, ship, accessibility and input metrics.
 * Visible in development by default, hidden in production unless toggled via hotkey (Shift+Alt+D).
 */
export function DebugHud() {
  // Hotkey registration – toggles store.hudVisible
  useHotkeys();

  const {
    graphicsMode,
    cameraMode,
    shipMode,
    hudVisible,
    particleCount,
    shipVelocity,
    shipBankAngle,
    reduceMotion,
    prefersReducedTransparency,
    audioMuted,
    scrollProgress,
  } = useHudState();

  // Input type from scroll velocity hook
  const { inputType } = useScrollVelocity();

  // Simple FPS / frame‑time tracker (updates ~4×/s)
  const [fps, setFps] = useState(0);
  const [frameTime, setFrameTime] = useState(0);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      const now = performance.now();
      if (lastTime.current !== undefined) {
        const dt = now - lastTime.current;
        const currentFps = Math.round(1000 / dt);
        setFps(currentFps);
        setFrameTime(Math.round(dt));
      }
      lastTime.current = now;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Derive a simple chapter number (7 chapters total as used elsewhere)
  const currentChapter = Math.floor(scrollProgress * 7) + 1;

  // Styling constants – follow the spec
  const panelStyle: React.CSSProperties = {
    position: "fixed",
    top: 16,
    right: 16,
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(56,189,248,0.4)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "#E2E8F0",
    fontFamily: "JetBrains Mono, IBM Plex Mono, monospace",
    fontSize: 12,
    lineHeight: 1.4,
    zIndex: 1000,
    pointerEvents: "none",
  };

  const headerStyle: React.CSSProperties = {
    color: "#38BDF8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 4,
    fontSize: 11,
  };

  if (!hudVisible && !import.meta.env.DEV) {
    return null;
  }

  return (
    <div style={panelStyle}>
      {/* Performance */}
      <div style={headerStyle}>Performance</div>
      <div>FPS: {fps}</div>
      <div>Frame Time: {frameTime} ms</div>
      <div>Graphics Mode: {graphicsMode}</div>
      <div>GPU Tier: N/A</div>
      <div>Particle Count: {particleCount}</div>

      {/* Narrative */}
      <div style={headerStyle}>Narrative</div>
      <div>Current Act: N/A</div>
      <div>Current Chapter: {currentChapter}</div>
      <div>Camera Mode: {cameraMode}</div>

      {/* Ship */}
      <div style={headerStyle}>Ship</div>
      <div>Ship Mode: {shipMode}</div>
      <div>Velocity: {shipVelocity.toFixed(2)}</div>
      <div>Bank Angle: {shipBankAngle.toFixed(2)}</div>
      <div>Thrust Intensity: N/A</div>

      {/* Accessibility */}
      <div style={headerStyle}>Accessibility</div>
      <div>Reduce Motion: {reduceMotion ? "on" : "off"}</div>
      <div>Reduce Transparency: {prefersReducedTransparency ? "on" : "off"}</div>
      <div>Audio Enabled: {audioMuted ? "off" : "on"}</div>

      {/* Input */}
      <div style={headerStyle}>Input</div>
      <div>Input Type: {inputType}</div>
    </div>
  );
}

export default DebugHud;
