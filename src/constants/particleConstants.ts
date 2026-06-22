export const PARTICLE_COUNTS = {
  low: 500,
  high: 2000,
  ultra: 5000,
} as const;

export type GraphicsMode = keyof typeof PARTICLE_COUNTS;
