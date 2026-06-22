import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#_&%X";

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const queue = text.split("").map((char) => ({
      char,
      start: Math.floor(Math.random() * 20),
      end: Math.floor(Math.random() * 20) + 20, // 20-40 frames of scrambling (approx 300-600ms at 60fps)
    }));

    let animationFrameId: number;

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { char, start, end } = queue[i];

        if (frame >= end) {
          complete++;
          output += char;
        } else if (frame >= start) {
          if (char === " ") {
            output += " ";
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        } else {
          output += "";
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        cancelAnimationFrame(animationFrameId);
      } else {
        frame++;
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, text]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      {displayText}
    </motion.span>
  );
}
