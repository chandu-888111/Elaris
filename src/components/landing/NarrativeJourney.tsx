import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { InteractiveHotspot } from "@/components/ui/InteractiveHotspot";

gsap.registerPlugin(ScrollTrigger);

export function NarrativeJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bgRef.current || !textRef.current) return;

    // Pin the container and animate inner elements based on scroll progression
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin for 200vh
        scrub: 1,
        pin: true,
      },
    });

    // Zoom and pan the background
    tl.to(
      bgRef.current,
      {
        scale: 1.3,
        backgroundPosition: "50% 100%",
        ease: "none",
      },
      0,
    );

    // Fade and move text block
    tl.fromTo(textRef.current, { opacity: 1, y: 0 }, { opacity: 0.2, y: -100, ease: "none" }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Deep Space Background with Vignette */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/placeholders/deep-space.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "50% 0%",
        }}
      >
        {/* Heavy Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/60 to-black pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
        <div ref={textRef} className="text-center max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
            <ScrambleText text="Escape the Learning Chaos" />
          </h2>
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed">
            <ScrambleText text="The modern developer ecosystem is a fragmented mess of tutorials, broken dependencies, and outdated documentation. It's time for an intelligent OS." />
          </p>
        </div>
      </div>

      {/* Interactive Hotspots positioned across the screen */}
      <InteractiveHotspot
        x={20}
        y={30}
        title="Fragmented Resources"
        description="Scattered across dozens of tabs, losing context constantly."
      />
      <InteractiveHotspot
        x={75}
        y={40}
        title="Dependency Hell"
        description="Hours wasted fixing breaking changes instead of writing logic."
      />
      <InteractiveHotspot
        x={40}
        y={70}
        title="AI Guidance"
        description="A unified AI mentor that understands your entire workspace context."
      />
    </section>
  );
}
