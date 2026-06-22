import { z } from "zod";

export const ProjectIdeaSchema = z.object({
  title: z.string(),
  problemStatement: z.string(),
  solutionOverview: z.string(),
  technologies: z.array(z.string()),
  requirements: z.object({
    hardware: z.array(z.string()),
    software: z.array(z.string()),
  }),
  architecture: z.array(z.string()),
  timeline: z.array(z.string()),
  futureScope: z.array(z.string()),
  resumeValueScore: z.coerce.number().min(0).max(10),
  innovationScore: z.coerce.number().min(0).max(10),
  techDepthScore: z.coerce.number().min(0).max(10),
  marketPotential: z.string(),
  difficulty: z.string(),
  domains: z.array(z.string()),
});
export type ProjectIdea = z.infer<typeof ProjectIdeaSchema>;

export const FALLBACK_IDEA: ProjectIdea = {
  title: "Smart AI Attendance System",
  problemStatement: "Manual attendance systems are inefficient.",
  solutionOverview: "AI-powered automated attendance using face recognition.",
  technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
  requirements: { hardware: ["Webcam"], software: ["VS Code"] },
  architecture: ["Capture Image", "Detect Face", "Store Attendance"],
  timeline: ["Week 1 - Research", "Week 2 - Development", "Week 3 - Testing"],
  futureScope: ["Cloud sync", "Mobile integration"],
  resumeValueScore: 9,
  innovationScore: 8,
  techDepthScore: 7.5,
  marketPotential: "High",
  difficulty: "Intermediate",
  domains: ["AI/ML", "Computer Vision"],
};

export const RoadmapSchema = z.object({
  role: z.string(),
  summary: z.string(),
  phases: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      skills: z.array(z.string()),
      projects: z.array(z.string()),
      certifications: z.array(z.string()),
    }),
  ),
  dailySchedule: z.array(z.string()),
  interviewPrep: z.array(z.string()),
});
export type Roadmap = z.infer<typeof RoadmapSchema>;

export const StudyGuideSchema = z.object({
  title: z.string(),
  summary: z.string(),
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      learn: z.string(),
      visualize: z.string(),
      practice: z.array(z.string()),
      build: z.object({
        title: z.string(),
        description: z.string(),
      }),
      test: z.array(
        z.object({
          question: z.string(),
          options: z.array(z.string()),
          answer: z.string(),
        }),
      ),
    }),
  ),
});
export type StudyGuide = z.infer<typeof StudyGuideSchema>;

export const BuildBlueprintSchema = z.object({
  title: z.string(),
  techStack: z.object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    database: z.array(z.string()),
    devops: z.array(z.string()),
  }),
  folderStructure: z.array(z.string()),
  frontendArchitecture: z.array(z.string()),
  backendArchitecture: z.array(z.string()),
  databaseSchema: z.array(z.object({ table: z.string(), columns: z.array(z.string()) })),
  apiRoutes: z.array(z.object({ method: z.string(), path: z.string(), description: z.string() })),
  authSetup: z.array(z.string()),
  envVariables: z.array(z.string()),
  recommendedLibraries: z.array(z.string()),
  testingStrategy: z.array(z.string()),
  cicd: z.array(z.string()),
  deploymentSteps: z.array(z.string()),
  githubWorkflow: z.array(z.string()),
  mvpPlan: z.array(z.string()),
  implementationSteps: z.array(
    z.object({ step: z.number(), title: z.string(), detail: z.string() }),
  ),
  starterSnippets: z.array(
    z.object({ filename: z.string(), language: z.string(), code: z.string() }),
  ),
  estimatedTimeline: z.string(),
});
export type BuildBlueprint = z.infer<typeof BuildBlueprintSchema>;

export const MentorPlanSchema = z.object({
  topic: z.string(),
  overview: z.string(),
  prerequisites: z.array(z.string()),
  concepts: z.array(z.object({ name: z.string(), explanation: z.string(), example: z.string() })),
  practiceTasks: z.array(z.string()),
  nextSteps: z.array(z.string()),
  estimatedHours: z.number(),
});
export type MentorPlan = z.infer<typeof MentorPlanSchema>;

export const RankedResourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  difficulty: z.string(),
  duration: z.string(),
  qualityScore: z.number(),
  trustScore: z.number(),
  lastVerified: z.string(),
  sourceType: z.string(),
  resourceType: z.enum([
    "doc",
    "youtube",
    "github",
    "article",
    "course",
    "book",
    "cheatsheet",
    "mindmap",
  ]),
  tier: z.number().min(1).max(5),
});
export type RankedResource = z.infer<typeof RankedResourceSchema>;

export const NodeKnowledgeMapSchema = z.object({
  concepts: z.array(z.string()),
  subtopics: z.array(z.string()),
  dependencies: z.array(z.string()),
  careerRelevance: z.string(),
  industryUsage: z.array(z.string()),
  estimatedHours: z.number(),
  difficulty: z.string(),
  commonMistakes: z.array(z.string()),
  bestPractices: z.array(z.string()),
  interviewRelevance: z.array(z.string()),
  projectApplications: z.array(z.string()),
});
export type NodeKnowledgeMap = z.infer<typeof NodeKnowledgeMapSchema>;

const ProjectDefinitionSchema = z.object({
  title: z.string(),
  problemStatement: z.string(),
  solution: z.string(),
  architecture: z.string(),
  techStack: z.array(z.string()),
  implementationPlan: z.array(z.string()),
  resumeValue: z.string(),
  marketPotential: z.string(),
  difficulty: z.string(),
});

export const ProjectEngineSchema = z.object({
  miniProject: ProjectDefinitionSchema,
  beginnerProject: ProjectDefinitionSchema,
  intermediateProject: ProjectDefinitionSchema,
  advancedProject: ProjectDefinitionSchema,
  portfolioProject: ProjectDefinitionSchema,
  startupProject: ProjectDefinitionSchema,
  researchProject: ProjectDefinitionSchema,
});
export type ProjectEngine = z.infer<typeof ProjectEngineSchema>;

export const MentorIntelligenceSchema = z.object({
  dailyMission: z.string(),
  weeklyGoal: z.string(),
  monthlyMilestone: z.string(),
  skillGapAnalysis: z.array(z.string()),
  learningRecommendations: z.array(z.string()),
  projectRecommendations: z.array(z.string()),
  careerRecommendations: z.array(z.string()),
  roadmapAdjustments: z.array(z.string()),
  interviewSuggestions: z.array(z.string()),
  resumeSuggestions: z.array(z.string()),
});
export type MentorIntelligence = z.infer<typeof MentorIntelligenceSchema>;

export const AIRecommendationSchema = z.object({
  nextTopic: z.object({ title: z.string(), reason: z.string() }),
  nextResource: z.object({ title: z.string(), url: z.string(), reason: z.string() }),
  nextProject: z.object({ title: z.string(), description: z.string(), reason: z.string() }),
  nextCertification: z.object({ title: z.string(), reason: z.string() }),
  nextCareerMove: z.object({ title: z.string(), reason: z.string() }),
  nextSkillGap: z.object({ title: z.string(), reason: z.string() }),
});
export type AIRecommendation = z.infer<typeof AIRecommendationSchema>;
