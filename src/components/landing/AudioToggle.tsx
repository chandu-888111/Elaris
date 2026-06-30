import { useAudioStore } from "@/store/AudioStore";
import { Volume2, VolumeX } from "lucide-react";
import { playHover, playClick } from "@/lib/sounds";

export function AudioToggle() {
  const isMuted = useAudioStore((s) => s.isMuted);
  const toggleMute = useAudioStore((s) => s.toggleMute);

  return (
    <button
      onClick={() => {
        playClick();
        toggleMute();
      }}
      onMouseEnter={playHover}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-card/40 backdrop-blur-md text-muted-foreground hover:text-white transition-all duration-300 hover:border-spark/40 hover:bg-card shadow-glow"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4 text-spark animate-pulse" />
      )}
    </button>
  );
}

export default AudioToggle;
