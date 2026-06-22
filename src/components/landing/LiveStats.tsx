import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * (to - from) + from));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

const STATS = [
  { label: "Projects Generated", value: 1240500 },
  { label: "Learning Hours", value: 850000 },
  { label: "Skills Mastered", value: 4200000 },
  { label: "Active Developers", value: 150000 },
];

export function LiveStats() {
  return (
    <div className="py-24 px-6 md:px-24  border-t border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[100px] bg-spark/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
              <AnimatedCounter to={stat.value} />+
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/50">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
