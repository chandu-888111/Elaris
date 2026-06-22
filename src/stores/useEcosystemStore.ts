import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/integrations/supabase/client";

export type SkillNode = {
  name: string;
  score: number;
  mastery: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Master";
  confidence: number;
  momentum: number;
  learningVelocity: number;
  retentionScore: number;
  consistencyScore: number;
  dependencies: string[];
  category: string;
  lastUpdated: string;
  source: string[];
};

export type MentorState = {
  currentGoal?: string;
  careerTarget?: string;
  currentDomain?: string;
  currentRoadmap?: string;
  completedNodes: string[];
  currentNode?: string;
  weakAreas: string[];
  strongAreas: string[];
  mistakesMade: string[];
  topicsStruggledWith: string[];
  projectHistory: string[];
  resourcePreferences: string[];
  projectsBuilt: number;
  studyTimeMinutes: number;
  dailyStreak: number;
  weeklyStreak: number;
  xp: number;
  achievements: string[];
  learningStyle?: string;
  learningSpeed?: string;
  interviewScores: Record<string, number>;
  resumeScores: Record<string, number>;
  skillScores: Record<string, number>;
  confidenceScores: Record<string, number>;
  lastMentorRecommendations?: string;
};

export type LearningAnalytics = {
  studyTimeTotal: number;
  nodesCompletedTotal: number;
  resourcesConsumedTotal: number;
  projectsBuiltTotal: number;
  quizzesAttemptedTotal: number;
  mentorSessionsTotal: number;
  learningVelocity: number;
  xpGrowth: number;
  skillGrowth: number;
  interviewReadiness: number;
  resumeReadiness: number;
  consistencyScore: number;
  focusScore: number;
  learningStreak: number;
};

interface EcosystemState {
  mentorState: MentorState;
  learningAnalytics: LearningAnalytics;
  skillGraph: Record<string, SkillNode>;

  // Actions
  updateMentorState: (updates: Partial<MentorState>) => void;
  updateAnalytics: (updates: Partial<LearningAnalytics>) => void;
  updateSkill: (skill: SkillNode) => void;
  syncToSupabase: (userId: string) => Promise<void>;
  loadFromSupabase: (userId: string) => Promise<void>;
}

const defaultMentorState: MentorState = {
  completedNodes: [],
  weakAreas: [],
  strongAreas: [],
  mistakesMade: [],
  topicsStruggledWith: [],
  projectHistory: [],
  resourcePreferences: [],
  projectsBuilt: 0,
  studyTimeMinutes: 0,
  dailyStreak: 0,
  weeklyStreak: 0,
  xp: 0,
  achievements: [],
  interviewScores: {},
  resumeScores: {},
  skillScores: {},
  confidenceScores: {},
};

const defaultAnalytics: LearningAnalytics = {
  studyTimeTotal: 0,
  nodesCompletedTotal: 0,
  resourcesConsumedTotal: 0,
  projectsBuiltTotal: 0,
  quizzesAttemptedTotal: 0,
  mentorSessionsTotal: 0,
  learningVelocity: 0,
  xpGrowth: 0,
  skillGrowth: 0,
  interviewReadiness: 0,
  resumeReadiness: 0,
  consistencyScore: 0,
  focusScore: 0,
  learningStreak: 0,
};

export const useEcosystemStore = create<EcosystemState>()(
  persist(
    (set, get) => ({
      mentorState: defaultMentorState,
      learningAnalytics: defaultAnalytics,
      skillGraph: {},

      updateMentorState: (updates) =>
        set((state) => ({
          mentorState: { ...state.mentorState, ...updates },
        })),

      updateAnalytics: (updates) =>
        set((state) => ({
          learningAnalytics: { ...state.learningAnalytics, ...updates },
        })),

      updateSkill: (skill) =>
        set((state) => ({
          skillGraph: { ...state.skillGraph, [skill.name]: skill },
        })),

      syncToSupabase: async (userId: string) => {
        const { mentorState, learningAnalytics, skillGraph } = get();
        try {
          await supabase
            .from("profiles")
            .update({
              mentor_state: mentorState,
              learning_analytics: learningAnalytics,
              skill_graph: skillGraph,
            })
            .eq("id", userId);
        } catch (e) {
          console.error("Failed to sync ecosystem state to Supabase", e);
        }
      },

      loadFromSupabase: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("mentor_state, learning_analytics, skill_graph")
            .eq("id", userId)
            .single();

          if (error) throw error;

          if (data) {
            set((state) => ({
              mentorState: {
                ...defaultMentorState,
                ...(data.mentor_state as unknown as Partial<MentorState>),
              },
              learningAnalytics: {
                ...defaultAnalytics,
                ...(data.learning_analytics as unknown as Partial<LearningAnalytics>),
              },
              skillGraph: {
                ...state.skillGraph,
                ...(data.skill_graph as unknown as Record<string, SkillNode>),
              },
            }));
          }
        } catch (e) {
          console.error("Failed to load ecosystem state from Supabase", e);
        }
      },
    }),
    {
      name: "ecosystem-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        mentorState: state.mentorState,
        learningAnalytics: state.learningAnalytics,
        skillGraph: state.skillGraph,
      }),
    },
  ),
);
