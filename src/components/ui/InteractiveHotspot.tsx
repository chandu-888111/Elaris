import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursorStore } from "@/store/CursorStore";

interface InteractiveHotspotProps {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  description: string;
}

export function InteractiveHotspot({ x, y, title, description }: InteractiveHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const setCursorVariant = useCursorStore((state) => state.setVariant);

  return (
    <div
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorVariant("hidden"); // Hide default magnetic cursor to let the hotspot shine, or keep it.
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorVariant("default");
      }}
    >
      {/* Pulsating Dot */}
      <div className="relative flex items-center justify-center cursor-crosshair">
        <div className="absolute h-4 w-4 rounded-full bg-cyan-400 opacity-75 animate-ping" />
        <div className="relative h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#00e5ff]" />
      </div>

      {/* Floating Tooltip Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -10 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute left-1/2 -top-4 w-64 -translate-x-1/2 -translate-y-full rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 p-5 shadow-2xl origin-bottom"
          >
            <h4 className="text-lg font-bold text-white mb-2 tracking-tight drop-shadow-md">
              {title}
            </h4>
            <p className="text-sm text-white/70 leading-relaxed">{description}</p>
            {/* Arrow pointer */}
            <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-white/5 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
