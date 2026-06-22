import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTypographyProps {
  text: string;
  className?: string;
  mode?: "word" | "character" | "line" | "parallax";
  delay?: number;
}

export function KineticTypography({
  text,
  className,
  mode = "word",
  delay = 0,
}: KineticTypographyProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (mode === "parallax") {
    return (
      <motion.h2 ref={ref} style={{ y }} className={cn("text-4xl font-bold text-white", className)}>
        {text}
      </motion.h2>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 100 },
    },
  };

  const words = text.split(" ");
  const chars = text.split("");

  return (
    <motion.h2
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap text-4xl font-bold text-white", className)}
    >
      {mode === "word" &&
        words.map((word, index) => (
          <motion.span variants={child} key={index} className="mr-2 mb-2 inline-block">
            {word}
          </motion.span>
        ))}

      {mode === "character" &&
        chars.map((char, index) => (
          <motion.span variants={child} key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}

      {mode === "line" && (
        <span className="overflow-hidden inline-block w-full">
          <motion.span variants={child} className="inline-block w-full">
            {text}
          </motion.span>
        </span>
      )}
    </motion.h2>
  );
}
