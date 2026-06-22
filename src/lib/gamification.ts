import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type XPReward = {
  newXp: number;
  newStreak: number;
  newLevel: number;
};

// Developer Galaxy Progression System
export const PLANETARY_LEVELS = [
  { xp: 0, name: "Earth", color: "#3b82f6", type: "Planet" },
  { xp: 1000, name: "Moon", color: "#9ca3af", type: "Satellite" },
  { xp: 3000, name: "Mars", color: "#ef4444", type: "Planet" },
  { xp: 10000, name: "Jupiter", color: "#f59e0b", type: "Gas Giant" },
  { xp: 25000, name: "Saturn", color: "#fbbf24", type: "Gas Giant" },
  { xp: 50000, name: "Neptune", color: "#3b82f6", type: "Ice Giant" },
  { xp: 100000, name: "Galaxy Explorer", color: "#fde047", type: "Title" },
  { xp: 250000, name: "Cosmic Architect", color: "#c084fc", type: "Title" },
  { xp: 500000, name: "Universal Builder", color: "#f87171", type: "Title" },
];

export function getPlanetForXP(xp: number) {
  let current = PLANETARY_LEVELS[0];
  let next = PLANETARY_LEVELS[1];
  for (let i = 0; i < PLANETARY_LEVELS.length; i++) {
    if (xp >= PLANETARY_LEVELS[i].xp) {
      current = PLANETARY_LEVELS[i];
      next = PLANETARY_LEVELS[Math.min(i + 1, PLANETARY_LEVELS.length - 1)];
    } else {
      break;
    }
  }
  return { current, next };
}

/**
 * Awards XP to the current user, updates their streak, and shows an animated toast.
 */
export async function awardXP(amount: number, reason: string): Promise<XPReward | null> {
  try {
    const { data, error } = await supabase.rpc("award_xp_and_streak", {
      amount,
      reason,
    });
    if (error || !data || !Array.isArray(data) || data.length === 0) {
      console.error("[xp] award failed", error);
      return null;
    }
    const row = data[0] as { new_xp: number; new_streak: number; new_level: number };
    const reward: XPReward = {
      newXp: row.new_xp,
      newStreak: row.new_streak,
      newLevel: row.new_level, // We keep the base level logic for database compatibility
    };

    const { current, next } = getPlanetForXP(reward.newXp);

    toast.success(`+${amount} XP — ${reason}`, {
      description: `🔥 ${reward.newStreak}-day streak · ${current.name} Orbit · ${reward.newXp} XP`,
      duration: 3500,
      icon: "🚀",
    });
    return reward;
  } catch (e) {
    console.error("[xp]", e);
    return null;
  }
}

/**
 * Unlocks an achievement. Constellations will connect unlocked achievements in the Dashboard.
 */
export async function unlockAchievement(opts: {
  code: string;
  title: string;
  description?: string;
  icon?: string;
  xp?: number;
}) {
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return;
  const xp = opts.xp ?? 50;
  const { error } = await supabase.from("achievements").insert({
    user_id: u.user.id,
    code: opts.code,
    title: opts.title,
    description: opts.description ?? "",
    icon: opts.icon ?? "trophy",
    xp_awarded: xp,
  });

  if (error && !error.message.includes("duplicate")) {
    console.error("[achievement]", error);
    return;
  }
  if (!error) {
    await awardXP(xp, `Constellation Unlocked: ${opts.title}`);
  }
}

export const XP = {
  SAVE_ROADMAP: 50,
  SAVE_STUDY: 50,
  SAVE_BLUEPRINT: 75,
  SAVE_MENTOR: 40,
  SAVE_PROJECT: 60,
  SAVE_RESUME: 80,
  RUN_ATS: 30,
  CHAT_MESSAGE: 5,
} as const;
