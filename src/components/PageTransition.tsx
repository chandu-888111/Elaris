import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function PageTransition({ location }: { location: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ultra-fast transition to hide WebGL context switching without slowing down the user
    setIsVisible(true);
    const t = setTimeout(() => setIsVisible(false), 200);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[100] bg-black/60"
        />
      )}
    </AnimatePresence>
  );
}
