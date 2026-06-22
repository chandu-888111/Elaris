import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Json } from "@/integrations/supabase/types";
import {
  generateTextResilient,
  generateObjectResilient,
  generateResourceObjectResilient,
} from "./ai-gateway";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  getSeededRoadmap,
  type RoadmapTier,
  type Tier,
  type RoadmapNode,
  FALLBACK_CURRICULA,
} from "./roadmap-catalog";
import { DOMAIN_BY_SLUG } from "./domains";
import { getModel, SYSTEM, extractJson } from "./ai.functions";
import { getFallbackMindmapAndResources } from "./resource-engine";
import { searchWeb } from "./search";

const ResourceSchema = z.object({
  type: z.enum(["doc", "youtube", "github", "blog", "practice"]),
  title: z.string(),
  url: z.string(),
  channel: z.string().optional(),
  videoId: z.string().optional(),
  author: z.string().optional(),
  duration: z.string().optional(),
  difficulty: z.string().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  free: z.boolean().optional(),
});

const TierSchema = z.object({
  tier: z.enum(["beginner", "intermediate", "advanced"]),
  summary: z.string(),
  nodes: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      why: z.string(),
      prerequisites: z.array(z.string()),
      outcome: z.string(),
      hours: z.coerce.number().min(0),
      difficulty: z.enum(["easy", "medium", "hard"]),
      importanceScore: z.coerce.number().min(1).max(10),
      skills: z.array(z.string()).optional(),
      tools: z.array(z.string()).optional(),
      interviewTopics: z.array(z.string()).optional(),
      careerImpact: z.string().optional(),
      dependsOn: z.array(z.string()).optional(),
      resources: z.array(ResourceSchema),
      projects: z.array(
        z.object({
          title: z.string(),
          brief: z.string(),
          difficulty: z.enum(["easy", "medium", "hard"]),
        }),
      ),
      quizzes: z.array(z.string()),
    }),
  ),
});

function generateTierFallback(slug: string, tier: Tier): RoadmapTier {
  const domain = DOMAIN_BY_SLUG[slug];
  const name = domain?.name ?? slug;

  // Check if we have pre-seeded domain-specific fallback nodes
  const domainCurriculum = FALLBACK_CURRICULA[slug]?.[tier];
  if (domainCurriculum && domainCurriculum.length > 0) {
    return {
      tier,
      summary: `A comprehensive ${tier} learning path for ${name} covering core concepts, modules, and practical projects.`,
      nodes: domainCurriculum,
    };
  }

  const nodes: RoadmapNode[] = [
    {
      id: `${slug}-${tier}-1`,
      title: `Introduction to ${name} (${tier})`,
      why: `To get started with ${name}, you need to understand the core foundations and fundamental concepts.`,
      prerequisites: [],
      outcome: `Understand the high-level architecture and fundamental blocks of ${name}.`,
      hours: 10,
      difficulty: "easy",
      skills: ["Fundamentals", name],
      tools: ["Editor", "CLI"],
      interviewTopics: [`What is ${name}?`, `Core principles of ${name}`],
      careerImpact: `Establishes a solid base for advanced features.`,
      resources: [
        {
          type: "doc",
          title: `Official ${name} Documentation`,
          url: `https://www.google.com/search?q=${encodeURIComponent(name + " official documentation")}`,
          difficulty: "beginner",
          rating: 4.9,
          free: true,
        },
        {
          type: "youtube",
          title: `${name} Beginner Tutorial`,
          url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
          videoId: "de9Wq3yK9fs",
          channel: "Tech Guides",
          difficulty: "beginner",
          rating: 4.8,
          free: true,
        },
      ],
      projects: [
        {
          title: `Simple ${name} Starter`,
          brief: `A basic project to test installation, configuration, and fundamental APIs of ${name}.`,
          difficulty: "easy",
        },
      ],
    },
    {
      id: `${slug}-${tier}-2`,
      title: `Core ${name} Development`,
      why: `Understanding how ${name} is structured internally is essential for building real-world software.`,
      prerequisites: [`${slug}-${tier}-1`],
      outcome: `Design and structure files using modern architectural standards.`,
      hours: 15,
      difficulty: "medium",
      skills: ["Architecture", "Design Patterns"],
      tools: ["Debugger"],
      interviewTopics: [`Internal architecture of ${name}`, "Common design patterns"],
      careerImpact: `Enables building larger codebases with confidence.`,
      resources: [
        {
          type: "blog",
          title: `Best Practices in ${name}`,
          url: `https://www.google.com/search?q=${encodeURIComponent(name + " architecture best practices")}`,
          difficulty: "intermediate",
          rating: 4.7,
          free: true,
        },
        {
          type: "youtube",
          title: `Mastering ${name} Components`,
          url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
          videoId: "de9Wq3yK9fs",
          channel: "Code Mastery",
          difficulty: "intermediate",
          rating: 4.8,
          free: true,
        },
      ],
      projects: [
        {
          title: `${name} Advanced Application`,
          brief: `Build a mid-sized component implementing data binding, routing, or state updates.`,
          difficulty: "medium",
        },
      ],
    },
    {
      id: `${slug}-${tier}-3`,
      title: `Advanced ${name} Techniques`,
      why: `Managing variables and API integration is critical as features grow in complexity.`,
      prerequisites: [`${slug}-${tier}-2`],
      outcome: `Handle remote data fetching, storage caching, and updates.`,
      hours: 12,
      difficulty: "medium",
      skills: ["State Management", "APIs"],
      tools: ["DevTools"],
      interviewTopics: ["How to manage state?", "Lifecycle methods or lifecycle equivalents"],
      careerImpact: `Required for any production level applications.`,
      resources: [
        {
          type: "github",
          title: `${name} Boilerplate Repository`,
          url: `https://github.com/search?q=${encodeURIComponent(name + " template")}`,
          difficulty: "intermediate",
          rating: 4.6,
          free: true,
        },
        {
          type: "youtube",
          title: `Advanced ${name} Guide`,
          url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
          videoId: "de9Wq3yK9fs",
          channel: "Dev channel",
          difficulty: "intermediate",
          rating: 4.5,
          free: true,
        },
      ],
      projects: [
        {
          title: `Advanced ${name} Deployment`,
          brief: `A stateful tracker that syncs updates dynamically.`,
          difficulty: "medium",
        },
      ],
    },
    {
      id: `${slug}-${tier}-4`,
      title: `Testing & Performance in ${name}`,
      why: `Clean and fast code makes the difference between junior developers and senior engineers.`,
      prerequisites: [`${slug}-${tier}-3`],
      outcome: `Write unit and integration tests and profile your application performance.`,
      hours: 10,
      difficulty: "hard",
      skills: ["Testing", "Optimization"],
      tools: ["Profiler", "Testing Framework"],
      interviewTopics: ["Testing strategies", "Performance optimization patterns"],
      careerImpact: `Ensures robust, scalable applications.`,
      resources: [
        {
          type: "doc",
          title: `Testing ${name} Applications`,
          url: `https://www.google.com/search?q=${encodeURIComponent(name + " testing guide")}`,
          difficulty: "advanced",
          rating: 4.8,
          free: true,
        },
        {
          type: "youtube",
          title: `Performance tuning ${name}`,
          url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
          videoId: "de9Wq3yK9fs",
          channel: "Tech optimization",
          difficulty: "advanced",
          rating: 4.9,
          free: true,
        },
      ],
      projects: [
        {
          title: `Optimized Production Release`,
          brief: `Audit an existing project, write tests, optimize load times by 30%.`,
          difficulty: "hard",
        },
      ],
    },
  ];

  return {
    tier,
    summary: `A comprehensive ${tier} learning path for ${name} covering core concepts, modules, state management, and production readiness.`,
    nodes,
  };
}

async function generateTierWithAI(slug: string, tier: Tier): Promise<RoadmapTier> {
  const domain = DOMAIN_BY_SLUG[slug];
  const name = domain?.name ?? slug;
  const prompt = `Design a ${tier} roadmap for "${name}".

Return JSON shaped exactly as:
{
  "tier": "${tier}",
  "summary": "1-2 sentence overview of this tier",
  "nodes": [
    {
      "id": "kebab-id",
      "title": "Topic title",
      "why": "Why this matters (1-2 sentences)",
      "prerequisites": ["other-node-id", "..."],
      "outcome": "What the learner can do after",
      "hours": 10,
      "difficulty": "easy" | "medium" | "hard",
      "importanceScore": 8,
      "skills": ["skill-name-1", "skill-name-2"],
      "tools": ["tool-name-1", "tool-name-2"],
      "interviewTopics": ["topic-1", "topic-2"],
      "careerImpact": "Description of career impact",
      "dependsOn": ["other-node-id", "..."],
      "resources": [
        { 
          "type": "doc" | "youtube" | "github" | "blog" | "practice",
          "title": "...", 
          "url": "Must be a search query URL (e.g. https://www.youtube.com/results?search_query=... or https://www.google.com/search?q=... or https://github.com/search?q=...). DO NOT guess direct URLs.",
          "channel": "(youtube only)", 
          "videoId": "",
          "author": "Author or Publisher name",
          "duration": "e.g. 10m or 2h",
          "difficulty": "beginner | intermediate | advanced",
          "rating": 4.8,
          "free": true
        }
      ],
      "projects": [{ "title": "...", "brief": "...", "difficulty": "easy|medium|hard" }],
      "quizzes": ["Question 1 about this topic?", "Question 2 about this topic?"]
    }
  ]
}

Rules:
- Generate a Graph structure, not a linear array. Use 'prerequisites' to branch into parallel tracks (e.g. Node A unlocks Node B and Node C).
- 5 to 10 nodes, covering a comprehensive skill tree.
- For resources, ALWAYS generate search URLs instead of direct links to avoid 404s.
- Each node must have at least 1 project and 2-3 quizzes.
- Prereq ids must reference earlier nodes in this tier (or [] for root nodes).
`;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { object } = await generateResourceObjectResilient({
        system: SYSTEM,
        prompt,
        temperature: attempt === 0 ? 0.6 : 0.3,
        schema: TierSchema,
      } as unknown as Parameters<typeof generateResourceObjectResilient>[0] & { schema: unknown });
      return object as unknown as RoadmapTier;
    } catch (e) {
      console.error("[roadmap] AI error", e);
    }
  }
  throw new Error("Failed to generate roadmap");
}

export const getRoadmap = createServerFn({ method: "POST" })
  .inputValidator((d: { slug: string; tier: Tier }) => d)
  .handler(async ({ data }) => {
    // 1. Force AI Generation by ignoring seeds. We want unique graphs.
    // We keep the API signature the same so the UI doesn't break.

    // 2. Cached?
    try {
      const { data: cached } = await supabaseAdmin
        .from("roadmap_cache")
        .select("content")
        .eq("domain", data.slug)
        .eq("tier", data.tier)
        .maybeSingle();
      if (cached?.content) {
        const content = cached.content as unknown as RoadmapTier;
        // Ignore the cache if it's the old generic 4-node fallback, so we load the new beautiful domain-specific curricula
        const isGenericFallback =
          !content.nodes ||
          (content.nodes.length === 4 &&
            content.nodes.some(
              (n) =>
                n.id.endsWith("-1") ||
                n.title.includes("Core Components & Architecture") ||
                n.title.includes("State Management & Data Flow"),
            ));
        if (!isGenericFallback) {
          return { source: "cache" as const, content };
        }
      }
    } catch (e) {
      console.warn("[roadmap] Cache read failed (likely due to invalid service role key):", e);
    }

    // 3. Cache Miss: Generate AI custom track synchronously
    try {
      console.log(
        `[roadmap] Cache miss for ${data.slug} (${data.tier}). Generating custom track synchronously.`,
      );
      const generated = await generateTierWithAI(data.slug, data.tier);
      try {
        await supabaseAdmin.from("roadmap_cache").upsert({
          domain: data.slug,
          tier: data.tier,
          content: generated as unknown as Json,
          generated_by: "AI",
          model: "google/gemini-2.5-flash",
          version: "1.0",
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
      } catch (cacheErr) {
        console.warn("[roadmap] Cache write failed (non-fatal):", cacheErr);
      }
      return { source: "AI" as const, content: generated };
    } catch (err) {
      console.error("[roadmap] Synchronous AI generation failed, using fallback:", err);
      const fallback = generateTierFallback(data.slug, data.tier);
      try {
        await supabaseAdmin.from("roadmap_cache").upsert({
          domain: data.slug,
          tier: data.tier,
          content: fallback as unknown as Json,
          generated_by: "fallback",
          model: "static",
          version: "1.0",
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });
      } catch (cacheErr) {
        console.warn("[roadmap] Cache fallback write failed:", cacheErr);
      }
      return { source: "fallback" as const, content: fallback };
    }
  });

const StudyGuideNodeSchema = z.object({
  what: z.array(z.string()),
  how: z.array(z.string()),
  practice: z.array(z.string()),
  mini_project: z.object({ title: z.string(), brief: z.string() }),
  quiz: z
    .array(
      z.object({
        q: z.string(),
        choices: z.array(z.string()).length(4),
        answer: z.number().min(0).max(3),
      }),
    )
    .min(3),
});

export const generateNodeStudyGuide = createServerFn({ method: "POST" })
  .inputValidator((d: { slug: string; tier: Tier; nodeId: string; nodeTitle: string }) => d)
  .handler(async ({ data }): Promise<z.infer<typeof StudyGuideNodeSchema>> => {
    const cacheKey = `${data.slug}:${data.nodeId}`;

    // 1. Check cache first
    try {
      const { data: cached } = await supabaseAdmin
        .from("roadmap_cache")
        .select("content")
        .eq("domain", cacheKey)
        .eq("tier", "study-guide")
        .maybeSingle();
      if (cached?.content) {
        return cached.content as unknown as z.infer<typeof StudyGuideNodeSchema>;
      }
    } catch (e) {
      console.warn("[study-guide] Cache read failed:", e);
    }

    const fallback = {
      what: [
        `Core fundamentals of ${data.nodeTitle}`,
        `Best practices and design patterns in ${data.nodeTitle}`,
        `Integration and common pitfalls of ${data.nodeTitle}`,
        `Advanced optimization techniques`,
      ],
      how: [
        `Review documentation for ${data.nodeTitle}`,
        `Set up a local sandbox environment`,
        `Build a simple demo utilizing ${data.nodeTitle}`,
        `Conduct code reviews on open source examples`,
      ],
      practice: [
        `Write a clean implementation of ${data.nodeTitle}`,
        `Create test cases covering edge cases`,
        `Profile memory and execution performance`,
      ],
      mini_project: {
        title: `${data.nodeTitle} Sandbox`,
        brief: `Create a fully-featured, production-ready implementation showcasing ${data.nodeTitle} with clean code practices and comprehensive tests.`,
      },
      quiz: [
        {
          q: `What is the primary benefit of ${data.nodeTitle}?`,
          choices: [
            "Improves system performance and modularity",
            "Reduces development cost to zero",
            "Eliminates the need for testing",
            "Forces the application to run multi-threaded",
          ],
          answer: 0,
        },
        {
          q: `Which of the following is a common pitfall when using ${data.nodeTitle}?`,
          choices: [
            "Over-engineering simple implementations",
            "Complete loss of network connectivity",
            "Compiler deprecation of all features",
            "Immediate database lockouts",
          ],
          answer: 0,
        },
        {
          q: `How should you structure testing for ${data.nodeTitle}?`,
          choices: [
            "By isolating core logic and testing edge cases",
            "By writing no tests and letting users report bugs",
            "By compiling only on local machines",
            "By testing only database connectivity",
          ],
          answer: 0,
        },
      ],
    };

    const generatePromise = (async () => {
      const domain = DOMAIN_BY_SLUG[data.slug]?.name ?? data.slug;
      const prompt = `Build a focused study guide for "${data.nodeTitle}" within ${domain} (${data.tier}). Return JSON:
{
  "what": ["sub-topic", ...],
  "how": ["actionable step", ...],
  "practice": ["exercise", ...],
  "mini_project": { "title": "...", "brief": "..." },
  "quiz": [{ "q": "...", "choices": ["a","b","c","d"], "answer": 0 }, ...]
}
Rules: 4-6 items per list. Exactly 5 quiz items. Real, modern best practices.`;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const { object } = await generateResourceObjectResilient({
            system: SYSTEM,
            prompt,
            temperature: attempt === 0 ? 0.5 : 0.3,
            schema: StudyGuideNodeSchema,
          } as unknown as Parameters<typeof generateResourceObjectResilient>[0] & {
            schema: unknown;
          });
          const parsed = object;

          // Save to database cache in background
          (async () => {
            try {
              await supabaseAdmin.from("roadmap_cache").upsert({
                domain: cacheKey,
                tier: "study-guide",
                content: parsed as unknown as Json,
                generated_by: "AI",
                model: "google/gemini-2.5-flash",
                version: "1.0",
                expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              });
            } catch (err) {
              console.warn("[study-guide] Background cache write failed:", err);
            }
          })();

          return parsed as z.infer<typeof StudyGuideNodeSchema>;
        } catch (error) {
          console.error(`[StudyGuide] AI attempt ${attempt + 1} failed:`, error);
        }
      }
      return fallback;
    })();

    try {
      return await generatePromise;
    } catch (e) {
      return fallback;
    }
  });

const CustomRoadmapSchema = z.object({
  goal: z.string(),
  weeks: z
    .array(
      z.object({
        week: z.number(),
        theme: z.string(),
        daily: z.array(z.string()).min(3),
        milestone: z.string(),
        project: z.string().optional(),
      }),
    )
    .min(2),
  resources: z.array(ResourceSchema).min(3),
});

export const generateCustomRoadmap = createServerFn({ method: "POST" })
  .inputValidator((d: { goal: string; timeframe: string; level: string }) => d)
  .handler(async ({ data }): Promise<z.infer<typeof CustomRoadmapSchema>> => {
    const prompt = `Create a personalized week-by-week roadmap.
Goal: ${data.goal}
Timeframe: ${data.timeframe}
Starting level: ${data.level}

Return JSON:
{
  "goal": "...",
  "weeks": [{ "week": 1, "theme": "...", "daily": ["...","...","..."], "milestone": "...", "project": "optional" }],
  "resources": [{ "type": "doc|youtube|github|blog|practice", "title": "...", "url": "https://..." }]
}
Use real, well-known resources.`;
    const { object } = await generateResourceObjectResilient({
      system: SYSTEM,
      prompt,
      temperature: 0.6,
      schema: CustomRoadmapSchema,
    } as unknown as Parameters<typeof generateResourceObjectResilient>[0] & { schema: unknown });
    return object as z.infer<typeof CustomRoadmapSchema>;
  });

export const toggleNodeProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: {
      slug: string;
      tier: Tier;
      nodeId: string;
      status: "in_progress" | "done";
      hours?: number;
      bookmarked?: boolean;
    }) => d,
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const payload = {
      user_id: userId,
      domain: data.slug,
      tier: data.tier,
      node_id: data.nodeId,
      status: data.status,
      hours: data.hours ?? 0,
      hours_spent: data.hours ?? 0,
      bookmarked: data.bookmarked ?? false,
      completed_at: data.status === "done" ? new Date().toISOString() : null,
      xp_earned: data.status === "done" ? 100 : 0,
      last_accessed: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("node_progress")
      .upsert(payload, { onConflict: "user_id,domain,tier,node_id" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getDomainProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: rows, error } = await supabase
      .from("node_progress")
      .select(
        "tier,node_id,status,hours,hours_spent,xp_earned,bookmarked,completed_at,last_accessed",
      )
      .eq("domain", data.slug);
    if (error) throw new Error(error.message);
    return { rows: rows ?? [] };
  });

export const getAllDomainsProgress = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data: rows, error } = await supabase.from("node_progress").select("domain,status");
    if (error) throw new Error(error.message);

    const result: Record<string, { completedCount: number; totalCount: number }> = {};
    for (const row of rows ?? []) {
      if (!result[row.domain]) {
        result[row.domain] = { completedCount: 0, totalCount: 0 };
      }
      result[row.domain].totalCount++;
      if (row.status === "done" || row.status === "completed") {
        result[row.domain].completedCount++;
      }
    }
    return { progress: result };
  });

const NodeResourcesAndMindmapSchema = z.object({
  resources: z.array(
    z.object({
      type: z.enum([
        "doc",
        "youtube",
        "github",
        "article",
        "course",
        "book",
        "cheatsheet",
        "practice",
      ]),
      title: z.string(),
      url: z.string(),
      channel: z.string().optional(),
      videoId: z.string().optional(),
      duration: z.string().optional(),
      difficulty: z.string().optional(),
      qualityScore: z.coerce.number().optional(),
      tier: z.number().min(1).max(5).optional(),
      free: z.boolean().optional(),
      author: z.string().optional(),
      rating: z.coerce.number().optional(),
    }),
  ),
  knowledgeMap: z.object({
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
  }),
  projects: z.object({
    beginner: z.object({ title: z.string(), description: z.string() }),
    intermediate: z.object({ title: z.string(), description: z.string() }),
    advanced: z.object({ title: z.string(), description: z.string() }),
    startupIdea: z.object({ title: z.string(), description: z.string() }),
    researchIdea: z.object({ title: z.string(), description: z.string() }),
    finalYear: z.object({ title: z.string(), description: z.string() }),
    industry: z.object({ title: z.string(), description: z.string() }),
    openSource: z.object({ title: z.string(), description: z.string() }),
    portfolio: z.object({ title: z.string(), description: z.string() }),
  }),
  mindmap: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(["root", "main", "leaf"]),
        info: z.string(),
        source: z.string().optional(),
        x: z.number(),
        y: z.number(),
        color: z.string().optional(),
      }),
    ),
    edges: z.array(
      z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
        animated: z.boolean().optional(),
      }),
    ),
  }),
});

export const generateNodeResourcesAndMindmap = createServerFn({ method: "POST" })
  .inputValidator((d: { slug: string; tier: Tier; nodeId: string; nodeTitle: string }) => d)
  .handler(async ({ data }): Promise<z.infer<typeof NodeResourcesAndMindmapSchema>> => {
    const cacheKey = `${data.slug}:${data.nodeId}`;

    // 1. Check cache first
    try {
      const { data: cached } = await supabaseAdmin
        .from("roadmap_cache")
        .select("content")
        .eq("domain", cacheKey)
        .eq("tier", "resources-mindmap-v2")
        .maybeSingle();
      if (cached?.content) {
        return cached.content as unknown as z.infer<typeof NodeResourcesAndMindmapSchema>;
      }
    } catch (e) {
      console.warn("[resources-mindmap] Cache read failed:", e);
    }

    const fallback = getFallbackMindmapAndResources(data.nodeTitle, data.slug, data.tier);

    const generatePromise = (async () => {
      const domain = DOMAIN_BY_SLUG[data.slug]?.name ?? data.slug;

      // Fetch real search results to ground the AI's resource URLs
      const searchResults = await searchWeb(
        `${data.nodeTitle} ${domain} best tutorial OR documentation OR github`,
      );
      const searchContext = searchResults
        .map((r) => `- [${r.title}](${r.url}): ${r.description}`)
        .join("\n");

      const prompt = `You are an elite AI learning engineer. Design an adaptive learning ecosystem for the topic "${data.nodeTitle}" inside the domain "${domain}" (${data.tier}).

      CRITICAL TRUSTED RESOURCES INSTRUCTION:
      You MUST only provide resources from highly trusted sources. 
      - Docs: MDN, React Docs, Next.js Docs, Python Docs, TensorFlow, PyTorch, AWS, Kubernetes.
      - Videos: freeCodeCamp, Fireship, Traversy Media, Tech With Tim, CodeWithHarry, Krish Naik.
      - Courses: Coursera, edX, MIT OCW, Harvard CS50.
      - Repositories: Official GitHub repos.
      Do NOT surface random low-quality blogs. Use the provided REAL web search results to ground your URLs:
      ${searchContext}

      If you must generate search URLs because an exact link is missing, use domain-restricted queries (e.g., \`site:developer.mozilla.org ${data.nodeTitle}\`).

      Return JSON shaped exactly as:
      {
        "resources": [
          {
            "type": "doc|youtube|github|article|course|book|cheatsheet|practice",
            "title": "Specific resource title",
            "url": "REAL URL or trusted search URL",
            "channel": "YouTube channel (youtube type only)",
            "videoId": "",
            "duration": "Duration (e.g., '15m')",
            "difficulty": "Beginner|Intermediate|Advanced",
            "qualityScore": 95,
            "tier": 1,
            "free": true
          }
        ],
        "knowledgeMap": {
          "concepts": ["..."],
          "subtopics": ["..."],
          "dependencies": ["..."],
          "careerRelevance": "...",
          "industryUsage": ["..."],
          "estimatedHours": 10,
          "difficulty": "...",
          "commonMistakes": ["..."],
          "bestPractices": ["..."],
          "interviewRelevance": ["..."],
          "projectApplications": ["..."]
        },
        "projects": {
          "beginner": { "title": "...", "description": "..." },
          "intermediate": { "title": "...", "description": "..." },
          "advanced": { "title": "...", "description": "..." },
          "startupIdea": { "title": "...", "description": "..." },
          "researchIdea": { "title": "...", "description": "..." },
          "finalYear": { "title": "...", "description": "..." },
          "industry": { "title": "...", "description": "..." },
          "openSource": { "title": "...", "description": "..." },
          "portfolio": { "title": "...", "description": "..." }
        },
        "mindmap": {
          "nodes": [
            {
              "id": "root",
              "label": "${data.nodeTitle}",
              "type": "root",
              "info": "Central focus node summary explaining what this topic is at a high level.",
              "source": "Official documentation link",
              "x": 0,
              "y": 0
            },
            {
              "id": "branch-0",
              "label": "First major subtopic of ${data.nodeTitle}",
              "type": "main",
              "info": "Detailed explanation of this subtopic, its purpose, and core usage.",
              "source": "Reference link or documentation section",
              "x": -160,
              "y": -90
            },
            {
              "id": "leaf-0-0",
              "label": "Detailed leaf of first subtopic",
              "type": "leaf",
              "info": "Specific tooltip information with code or configuration examples.",
              "source": "Specific reference or tutorial link",
              "x": -270,
              "y": -120
            }
          ],
          "edges": [
            { "id": "edge-root-branch-0", "source": "root", "target": "branch-0" },
            { "id": "edge-branch-0-leaf-0-0", "source": "branch-0", "target": "leaf-0-0" }
          ]
        }
      }

      Rules:
      - Rank resources using tiers: Tier 1 (Docs), Tier 2 (Courses), Tier 3 (Videos), Tier 4 (GitHub), Tier 5 (Articles/Cheatsheets).
      - Ensure NO duplicate or outdated tutorials are included.
      - Mindmap must contain 8-12 nodes specific to "${data.nodeTitle}".
      - Projects should strictly align with the user's roadmap node.`;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const { object } = await generateResourceObjectResilient({
            system: SYSTEM,
            prompt,
            temperature: attempt === 0 ? 0.5 : 0.3,
            schema: NodeResourcesAndMindmapSchema,
          } as unknown as Parameters<typeof generateResourceObjectResilient>[0] & {
            schema: unknown;
          });
          const parsed = object;

          // Save to database cache in background
          (async () => {
            try {
              await supabaseAdmin.from("roadmap_cache").upsert({
                domain: cacheKey,
                tier: "resources-mindmap-v2",
                content: parsed as unknown as Json,
                generated_by: "AI",
                model: "google/gemini-2.5-flash",
                version: "1.0",
                expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              });
            } catch (err) {
              console.warn("[resources-mindmap] Background cache write failed:", err);
            }
          })();

          return parsed as z.infer<typeof NodeResourcesAndMindmapSchema>;
        } catch (error) {
          console.error(`[Resources & Mindmap] AI attempt ${attempt + 1} failed:`, error);
        }
      }
      return fallback as z.infer<typeof NodeResourcesAndMindmapSchema>;
    })();

    try {
      return await generatePromise;
    } catch (e) {
      return fallback as z.infer<typeof NodeResourcesAndMindmapSchema>;
    }
  });

export const checkNodeCache = createServerFn({ method: "POST" })
  .inputValidator((d: { cacheKey: string }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: cached } = await supabaseAdmin
      .from("roadmap_cache")
      .select("content")
      .eq("domain", data.cacheKey)
      .eq("tier", "resources-mindmap-v2")
      .maybeSingle();
    return cached?.content || null;
  });

export const saveNodeCache = createServerFn({ method: "POST" })
  .inputValidator((d: { cacheKey: string; content: unknown }) => d)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("roadmap_cache").upsert({
      domain: data.cacheKey,
      tier: "resources-mindmap-v2",
      content: data.content as Json,
      generated_by: "AI",
      model: "perplexity/sonar-deep-research",
    });
    return { success: true };
  });
