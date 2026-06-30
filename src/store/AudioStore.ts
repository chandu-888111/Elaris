import { create } from "zustand";

interface AudioState {
  isMuted: boolean;
  audioContext: AudioContext | null;
  ambientNode: GainNode | null;
  droneOscillator: OscillatorNode | null;

  initAudio: () => void;
  toggleMute: () => void;
  playHoverTick: () => void;
  playClickPulse: () => void;
  playGalaxyTransition: () => void;
  playAchievementUnlock: () => void;
  playPortalOpen: () => void;
  setScrollProgression: (progress: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isMuted: true,
  audioContext: null,
  ambientNode: null,
  droneOscillator: null,

  initAudio: () => {
    if (get().audioContext || get().isMuted) return;
    try {
      const ctx = new (
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      )();
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = 0.3;

      // Base ambient space drone
      const osc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 45;

      osc.connect(droneGain);
      droneGain.connect(masterGain);
      osc.start();

      set({ audioContext: ctx, ambientNode: masterGain, droneOscillator: osc });
    } catch (e) {
      console.warn("Audio context failed to initialize", e);
    }
  },

  toggleMute: () => {
    const { isMuted, initAudio, ambientNode, audioContext } = get();
    const nextMuted = !isMuted;

    if (!nextMuted && !ambientNode) initAudio();

    if (ambientNode && audioContext) {
      ambientNode.gain.setTargetAtTime(nextMuted ? 0 : 0.3, audioContext.currentTime, 0.5);
    }
    set({ isMuted: nextMuted });
  },

  playHoverTick: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05);
    gain.gain.setValueAtTime(0.05, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.05);
  },

  playClickPulse: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.2);
  },

  playGalaxyTransition: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    // Whoosh / Warp sound
    const noise = audioContext.createBufferSource();
    const bufferSize = audioContext.sampleRate * 2.0;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;

    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(100, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, audioContext.currentTime + 1.0);
    filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2.0);

    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 1.0);
    gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2.0);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    noise.start();
  },

  playAchievementUnlock: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    // Shimmering chime
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, audioContext.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * 0.1 + 1.0);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(audioContext.currentTime + i * 0.1);
      osc.stop(audioContext.currentTime + i * 0.1 + 1.0);
    });
  },

  playPortalOpen: () => {
    const { isMuted, audioContext } = get();
    if (isMuted || !audioContext) return;
    // Deep cinematic bass drop + high energy whine
    const bass = audioContext.createOscillator();
    const high = audioContext.createOscillator();
    const gain = audioContext.createGain();

    bass.type = "sine";
    bass.frequency.setValueAtTime(100, audioContext.currentTime);
    bass.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 2.0);

    high.type = "triangle";
    high.frequency.setValueAtTime(2000, audioContext.currentTime);
    high.frequency.exponentialRampToValueAtTime(8000, audioContext.currentTime + 2.0);

    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3.0);

    bass.connect(gain);
    high.connect(gain);
    gain.connect(audioContext.destination);

    bass.start();
    high.start();
    bass.stop(audioContext.currentTime + 3.0);
    high.stop(audioContext.currentTime + 3.0);
  },

  setScrollProgression: (progress: number) => {
    const { droneOscillator, audioContext, isMuted } = get();
    if (isMuted || !droneOscillator || !audioContext) return;
    const newFreq = 45 + progress * 150;
    droneOscillator.frequency.setTargetAtTime(newFreq, audioContext.currentTime, 0.5);
  },
}));

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__useAudioStore = useAudioStore;
}
