import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateObjectResilient } from "@/lib/ai-gateway";
import { AIRecommendationSchema } from "@/lib/schemas";

export const generateRecommendations = createServerFn({ method: "POST" })
  .inputValidator(
    (d: {
      mentorState: unknown;
      learningHistory: unknown;
      skillGraph: unknown;
      learningAnalytics: unknown;
      careerProfile: unknown;
    }) => d,
  )
  .handler(async ({ data }): Promise<z.infer<typeof AIRecommendationSchema>> => {
    const prompt = `You are the ProjectSpark Ecosystem Recommendation Engine. 
You possess deep context about the user's learning history, skills, and mentor state. 

USER DATA:
Mentor State: ${JSON.stringify(data.mentorState)}
Learning History: ${JSON.stringify(data.learningHistory)}
Skill Graph: ${JSON.stringify(data.skillGraph)}
Learning Analytics: ${JSON.stringify(data.learningAnalytics)}
Career Profile: ${JSON.stringify(data.careerProfile)}

Based ONLY on this user data, generate contextual recommendations.

Constraints:
1. Provide highly specific, actionable advice.
2. The "Next Topic" should address a critical "Next Skill Gap" or logical roadmap progression.
3. The "Next Resource" must be from a highly trusted source (e.g. MDN, official docs).
4. The "Next Project" should bridge their strong areas and weak areas.
`;

    const result = await generateObjectResilient({
      model: "google",
      system: prompt,
      schema: AIRecommendationSchema,
      prompt: "Generate the AI Recommendations for this user.",
    } as unknown as Parameters<typeof generateObjectResilient>[0]);

    return result.object as z.infer<typeof AIRecommendationSchema>;
  });
