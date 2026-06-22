import { SkillNode } from "@/stores/useEcosystemStore";

export function calculateSkillMastery(score: number): SkillNode["mastery"] {
  if (score < 25) return "Beginner";
  if (score < 50) return "Intermediate";
  if (score < 75) return "Advanced";
  if (score < 90) return "Expert";
  return "Master";
}

/**
 * Updates a skill's score and advanced metrics based on the action taken.
 * @param currentSkill The existing skill data, or undefined if new.
 * @param action The type of learning action.
 * @param metadata Additional data to configure the skill properties.
 */
export function processSkillAction(
  currentSkill: SkillNode | undefined,
  action:
    | "roadmap_completion"
    | "quiz_pass"
    | "project_completion"
    | "mentor_assessment"
    | "interview_score"
    | "study_guide_progress"
    | "resume_analysis",
  metadata: {
    name: string;
    category: string;
    dependencies?: string[];
    scoreDelta?: number;
    confidenceDelta?: number;
  },
): SkillNode {
  const baseScore = currentSkill?.score || 0;
  const baseConfidence = currentSkill?.confidence || 0;
  let momentum = currentSkill?.momentum || 0;
  let velocity = currentSkill?.learningVelocity || 0;
  let consistency = currentSkill?.consistencyScore || 0;
  let retention = currentSkill?.retentionScore || 0;

  let increment = metadata.scoreDelta || 0;
  let confIncrement = metadata.confidenceDelta || 0;

  if (!increment) {
    switch (action) {
      case "roadmap_completion":
        increment = 10;
        confIncrement = 5;
        momentum += 5;
        velocity += 2;
        consistency += 2;
        retention += 1;
        break;
      case "study_guide_progress":
        increment = 2;
        confIncrement = 1;
        consistency += 1;
        break;
      case "project_completion":
        increment = 25;
        confIncrement = 15;
        momentum += 10;
        velocity += 5;
        retention += 5;
        break;
      case "quiz_pass":
        increment = 5;
        confIncrement = 10;
        retention += 10;
        break;
      case "interview_score":
        increment = 15;
        confIncrement = 20;
        momentum += 5;
        break;
      case "mentor_assessment":
        increment = 3;
        confIncrement = 2;
        break;
      case "resume_analysis":
        increment = 5;
        confIncrement = 5;
        break;
    }
  }

  // Diminishing returns after 80
  if (baseScore > 80) increment *= 0.5;
  if (baseScore > 90) increment *= 0.2;

  const newScore = Math.min(100, Math.max(0, baseScore + increment));
  const newConfidence = Math.min(100, Math.max(0, baseConfidence + confIncrement));

  const sources = currentSkill ? new Set(currentSkill.source) : new Set<string>();
  sources.add(action);

  return {
    name: metadata.name,
    score: Math.round(newScore),
    mastery: calculateSkillMastery(newScore),
    confidence: Math.round(newConfidence),
    momentum: Math.min(100, Math.round(momentum)),
    learningVelocity: Math.min(100, Math.round(velocity)),
    retentionScore: Math.min(100, Math.round(retention)),
    consistencyScore: Math.min(100, Math.round(consistency)),
    dependencies: currentSkill?.dependencies || metadata.dependencies || [],
    category: currentSkill?.category || metadata.category,
    lastUpdated: new Date().toISOString(),
    source: Array.from(sources),
  };
}
