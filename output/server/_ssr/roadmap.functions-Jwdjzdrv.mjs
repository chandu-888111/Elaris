import { e as createServerRpc, c as createServerFn } from "./ai-BioNg-KZ.mjs";
import { a as generateResourceObjectResilient } from "./ai-gateway-BOABUhLo.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-IU1Y2FXs.mjs";
import { supabaseAdmin } from "./client.server-DTlM-9S9.mjs";
import { F as FALLBACK_CURRICULA } from "./roadmap-catalog-DXzHCKoR.mjs";
import { D as DOMAIN_BY_SLUG } from "./domains-NgPH8Jrf.mjs";
import { S as SYSTEM } from "./ai.functions-CiGO9ibj.mjs";
import { g as getFallbackMindmapAndResources } from "./resource-engine-CMarqK7x.mjs";
import { l as libExports } from "../_libs/duck-duck-scrape.mjs";
import "../_libs/react.mjs";
import "../_libs/seroval.mjs";
import { i as objectType, B as booleanType, A as coerce, k as stringType, p as enumType, m as arrayType, j as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/ai-sdk__google.mjs";
import "../_libs/ai-sdk__anthropic.mjs";
import "../_libs/ai-sdk__cohere.mjs";
import "fs";
import "path";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/@vercel/oidc.mjs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/html-entities.mjs";
import "../_libs/needle.mjs";
import "http";
import "https";
import "url";
import "querystring";
import "../_libs/sax.mjs";
import "../_libs/iconv-lite.mjs";
import "string_decoder";
import "../_libs/safer-buffer.mjs";
import "buffer";
async function searchWeb(query) {
  try {
    const results = await libExports.search(query, { safeSearch: libExports.SafeSearchType.OFF });
    return results.results.slice(0, 5).map((r) => ({ title: r.title, url: r.url, description: r.description }));
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
}
const ResourceSchema = objectType({
  type: enumType(["doc", "youtube", "github", "blog", "practice"]),
  title: stringType(),
  url: stringType(),
  channel: stringType().optional(),
  videoId: stringType().optional(),
  author: stringType().optional(),
  duration: stringType().optional(),
  difficulty: stringType().optional(),
  rating: coerce.number().min(0).max(5).optional(),
  free: booleanType().optional()
});
const TierSchema = objectType({
  tier: enumType(["beginner", "intermediate", "advanced"]),
  summary: stringType(),
  nodes: arrayType(objectType({
    id: stringType(),
    title: stringType(),
    why: stringType(),
    prerequisites: arrayType(stringType()),
    outcome: stringType(),
    hours: coerce.number().min(0),
    difficulty: enumType(["easy", "medium", "hard"]),
    importanceScore: coerce.number().min(1).max(10),
    skills: arrayType(stringType()).optional(),
    tools: arrayType(stringType()).optional(),
    interviewTopics: arrayType(stringType()).optional(),
    careerImpact: stringType().optional(),
    dependsOn: arrayType(stringType()).optional(),
    resources: arrayType(ResourceSchema),
    projects: arrayType(objectType({
      title: stringType(),
      brief: stringType(),
      difficulty: enumType(["easy", "medium", "hard"])
    })),
    quizzes: arrayType(stringType())
  }))
});
function generateTierFallback(slug, tier) {
  const domain = DOMAIN_BY_SLUG[slug];
  const name = domain?.name ?? slug;
  const domainCurriculum = FALLBACK_CURRICULA[slug]?.[tier];
  if (domainCurriculum && domainCurriculum.length > 0) {
    return {
      tier,
      summary: `A comprehensive ${tier} learning path for ${name} covering core concepts, modules, and practical projects.`,
      nodes: domainCurriculum
    };
  }
  const nodes = [{
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
    resources: [{
      type: "doc",
      title: `Official ${name} Documentation`,
      url: `https://www.google.com/search?q=${encodeURIComponent(name + " official documentation")}`,
      difficulty: "beginner",
      rating: 4.9,
      free: true
    }, {
      type: "youtube",
      title: `${name} Beginner Tutorial`,
      url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
      videoId: "de9Wq3yK9fs",
      channel: "Tech Guides",
      difficulty: "beginner",
      rating: 4.8,
      free: true
    }],
    projects: [{
      title: `Simple ${name} Starter`,
      brief: `A basic project to test installation, configuration, and fundamental APIs of ${name}.`,
      difficulty: "easy"
    }]
  }, {
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
    resources: [{
      type: "blog",
      title: `Best Practices in ${name}`,
      url: `https://www.google.com/search?q=${encodeURIComponent(name + " architecture best practices")}`,
      difficulty: "intermediate",
      rating: 4.7,
      free: true
    }, {
      type: "youtube",
      title: `Mastering ${name} Components`,
      url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
      videoId: "de9Wq3yK9fs",
      channel: "Code Mastery",
      difficulty: "intermediate",
      rating: 4.8,
      free: true
    }],
    projects: [{
      title: `${name} Advanced Application`,
      brief: `Build a mid-sized component implementing data binding, routing, or state updates.`,
      difficulty: "medium"
    }]
  }, {
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
    resources: [{
      type: "github",
      title: `${name} Boilerplate Repository`,
      url: `https://github.com/search?q=${encodeURIComponent(name + " template")}`,
      difficulty: "intermediate",
      rating: 4.6,
      free: true
    }, {
      type: "youtube",
      title: `Advanced ${name} Guide`,
      url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
      videoId: "de9Wq3yK9fs",
      channel: "Dev channel",
      difficulty: "intermediate",
      rating: 4.5,
      free: true
    }],
    projects: [{
      title: `Advanced ${name} Deployment`,
      brief: `A stateful tracker that syncs updates dynamically.`,
      difficulty: "medium"
    }]
  }, {
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
    resources: [{
      type: "doc",
      title: `Testing ${name} Applications`,
      url: `https://www.google.com/search?q=${encodeURIComponent(name + " testing guide")}`,
      difficulty: "advanced",
      rating: 4.8,
      free: true
    }, {
      type: "youtube",
      title: `Performance tuning ${name}`,
      url: "https://www.youtube.com/watch?v=de9Wq3yK9fs",
      videoId: "de9Wq3yK9fs",
      channel: "Tech optimization",
      difficulty: "advanced",
      rating: 4.9,
      free: true
    }],
    projects: [{
      title: `Optimized Production Release`,
      brief: `Audit an existing project, write tests, optimize load times by 30%.`,
      difficulty: "hard"
    }]
  }];
  return {
    tier,
    summary: `A comprehensive ${tier} learning path for ${name} covering core concepts, modules, state management, and production readiness.`,
    nodes
  };
}
async function generateTierWithAI(slug, tier) {
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
      const {
        object
      } = await generateResourceObjectResilient({
        system: SYSTEM,
        prompt,
        temperature: attempt === 0 ? 0.6 : 0.3,
        schema: TierSchema
      });
      return object;
    } catch (e) {
      console.error("[roadmap] AI error", e);
    }
  }
  throw new Error("Failed to generate roadmap");
}
const getRoadmap_createServerFn_handler = createServerRpc({
  id: "d3cceba56919cbb94af74939db2ee2e54d9d81867be14c7329347b3946aadc2b",
  name: "getRoadmap",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => getRoadmap.__executeServer(opts));
const getRoadmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(getRoadmap_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      data: cached
    } = await supabaseAdmin.from("roadmap_cache").select("content").eq("domain", data.slug).eq("tier", data.tier).maybeSingle();
    if (cached?.content) {
      const content = cached.content;
      const isGenericFallback = !content.nodes || content.nodes.length === 4 && content.nodes.some((n) => n.id.endsWith("-1") || n.title.includes("Core Components & Architecture") || n.title.includes("State Management & Data Flow"));
      if (!isGenericFallback) {
        return {
          source: "cache",
          content
        };
      }
    }
  } catch (e) {
    console.warn("[roadmap] Cache read failed (likely due to invalid service role key):", e);
  }
  try {
    console.log(`[roadmap] Cache miss for ${data.slug} (${data.tier}). Generating custom track synchronously.`);
    const generated = await generateTierWithAI(data.slug, data.tier);
    try {
      await supabaseAdmin.from("roadmap_cache").upsert({
        domain: data.slug,
        tier: data.tier,
        content: generated,
        generated_by: "AI",
        model: "google/gemini-2.5-flash",
        version: "1.0",
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
      });
    } catch (cacheErr) {
      console.warn("[roadmap] Cache write failed (non-fatal):", cacheErr);
    }
    return {
      source: "AI",
      content: generated
    };
  } catch (err) {
    console.error("[roadmap] Synchronous AI generation failed, using fallback:", err);
    const fallback = generateTierFallback(data.slug, data.tier);
    try {
      await supabaseAdmin.from("roadmap_cache").upsert({
        domain: data.slug,
        tier: data.tier,
        content: fallback,
        generated_by: "fallback",
        model: "static",
        version: "1.0",
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
      });
    } catch (cacheErr) {
      console.warn("[roadmap] Cache fallback write failed:", cacheErr);
    }
    return {
      source: "fallback",
      content: fallback
    };
  }
});
const StudyGuideNodeSchema = objectType({
  what: arrayType(stringType()),
  how: arrayType(stringType()),
  practice: arrayType(stringType()),
  mini_project: objectType({
    title: stringType(),
    brief: stringType()
  }),
  quiz: arrayType(objectType({
    q: stringType(),
    choices: arrayType(stringType()).length(4),
    answer: numberType().min(0).max(3)
  })).min(3)
});
const generateNodeStudyGuide_createServerFn_handler = createServerRpc({
  id: "10cb75aafad77839ce6077c11157f38f1eaa08a10ec8c2c7581435a783e5556e",
  name: "generateNodeStudyGuide",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => generateNodeStudyGuide.__executeServer(opts));
const generateNodeStudyGuide = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(generateNodeStudyGuide_createServerFn_handler, async ({
  data
}) => {
  const cacheKey = `${data.slug}:${data.nodeId}`;
  try {
    const {
      data: cached
    } = await supabaseAdmin.from("roadmap_cache").select("content").eq("domain", cacheKey).eq("tier", "study-guide").maybeSingle();
    if (cached?.content) {
      return cached.content;
    }
  } catch (e) {
    console.warn("[study-guide] Cache read failed:", e);
  }
  const fallback = {
    what: [`Core fundamentals of ${data.nodeTitle}`, `Best practices and design patterns in ${data.nodeTitle}`, `Integration and common pitfalls of ${data.nodeTitle}`, `Advanced optimization techniques`],
    how: [`Review documentation for ${data.nodeTitle}`, `Set up a local sandbox environment`, `Build a simple demo utilizing ${data.nodeTitle}`, `Conduct code reviews on open source examples`],
    practice: [`Write a clean implementation of ${data.nodeTitle}`, `Create test cases covering edge cases`, `Profile memory and execution performance`],
    mini_project: {
      title: `${data.nodeTitle} Sandbox`,
      brief: `Create a fully-featured, production-ready implementation showcasing ${data.nodeTitle} with clean code practices and comprehensive tests.`
    },
    quiz: [{
      q: `What is the primary benefit of ${data.nodeTitle}?`,
      choices: ["Improves system performance and modularity", "Reduces development cost to zero", "Eliminates the need for testing", "Forces the application to run multi-threaded"],
      answer: 0
    }, {
      q: `Which of the following is a common pitfall when using ${data.nodeTitle}?`,
      choices: ["Over-engineering simple implementations", "Complete loss of network connectivity", "Compiler deprecation of all features", "Immediate database lockouts"],
      answer: 0
    }, {
      q: `How should you structure testing for ${data.nodeTitle}?`,
      choices: ["By isolating core logic and testing edge cases", "By writing no tests and letting users report bugs", "By compiling only on local machines", "By testing only database connectivity"],
      answer: 0
    }]
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
        const {
          object
        } = await generateResourceObjectResilient({
          system: SYSTEM,
          prompt,
          temperature: attempt === 0 ? 0.5 : 0.3,
          schema: StudyGuideNodeSchema
        });
        const parsed = object;
        (async () => {
          try {
            await supabaseAdmin.from("roadmap_cache").upsert({
              domain: cacheKey,
              tier: "study-guide",
              content: parsed,
              generated_by: "AI",
              model: "google/gemini-2.5-flash",
              version: "1.0",
              expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
            });
          } catch (err) {
            console.warn("[study-guide] Background cache write failed:", err);
          }
        })();
        return parsed;
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
const CustomRoadmapSchema = objectType({
  goal: stringType(),
  weeks: arrayType(objectType({
    week: numberType(),
    theme: stringType(),
    daily: arrayType(stringType()).min(3),
    milestone: stringType(),
    project: stringType().optional()
  })).min(2),
  resources: arrayType(ResourceSchema).min(3)
});
const generateCustomRoadmap_createServerFn_handler = createServerRpc({
  id: "33fc70f46a66a435dd1e1cda28354eb2a72ab97d82334fc6d203487fc8bad192",
  name: "generateCustomRoadmap",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => generateCustomRoadmap.__executeServer(opts));
const generateCustomRoadmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(generateCustomRoadmap_createServerFn_handler, async ({
  data
}) => {
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
  const {
    object
  } = await generateResourceObjectResilient({
    system: SYSTEM,
    prompt,
    temperature: 0.6,
    schema: CustomRoadmapSchema
  });
  return object;
});
const toggleNodeProgress_createServerFn_handler = createServerRpc({
  id: "e417beef39e1146922e1d7c86c86a72a9e97613c66e642f81d7950a5e265180f",
  name: "toggleNodeProgress",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => toggleNodeProgress.__executeServer(opts));
const toggleNodeProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(toggleNodeProgress_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const payload = {
    user_id: userId,
    domain: data.slug,
    tier: data.tier,
    node_id: data.nodeId,
    status: data.status,
    hours: data.hours ?? 0,
    hours_spent: data.hours ?? 0,
    bookmarked: data.bookmarked ?? false,
    completed_at: data.status === "done" ? (/* @__PURE__ */ new Date()).toISOString() : null,
    xp_earned: data.status === "done" ? 100 : 0,
    last_accessed: (/* @__PURE__ */ new Date()).toISOString()
  };
  const {
    error
  } = await supabase.from("node_progress").upsert(payload, {
    onConflict: "user_id,domain,tier,node_id"
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getDomainProgress_createServerFn_handler = createServerRpc({
  id: "dfa721998d2ac0fd5014200e70bbc8de57c6e917818763ddf8e766e239a15aa1",
  name: "getDomainProgress",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => getDomainProgress.__executeServer(opts));
const getDomainProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(getDomainProgress_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data: rows,
    error
  } = await supabase.from("node_progress").select("tier,node_id,status,hours,hours_spent,xp_earned,bookmarked,completed_at,last_accessed").eq("domain", data.slug);
  if (error) throw new Error(error.message);
  return {
    rows: rows ?? []
  };
});
const getAllDomainsProgress_createServerFn_handler = createServerRpc({
  id: "d24c69199349c8184d89dbf225db17ed3acd1a3bf0f8f97945bd85700fd2b60d",
  name: "getAllDomainsProgress",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => getAllDomainsProgress.__executeServer(opts));
const getAllDomainsProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getAllDomainsProgress_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data: rows,
    error
  } = await supabase.from("node_progress").select("domain,status");
  if (error) throw new Error(error.message);
  const result = {};
  for (const row of rows ?? []) {
    if (!result[row.domain]) {
      result[row.domain] = {
        completedCount: 0,
        totalCount: 0
      };
    }
    result[row.domain].totalCount++;
    if (row.status === "done" || row.status === "completed") {
      result[row.domain].completedCount++;
    }
  }
  return {
    progress: result
  };
});
const NodeResourcesAndMindmapSchema = objectType({
  resources: arrayType(objectType({
    type: enumType(["doc", "youtube", "github", "article", "course", "book", "cheatsheet", "practice"]),
    title: stringType(),
    url: stringType(),
    channel: stringType().optional(),
    videoId: stringType().optional(),
    duration: stringType().optional(),
    difficulty: stringType().optional(),
    qualityScore: coerce.number().optional(),
    tier: numberType().min(1).max(5).optional(),
    free: booleanType().optional(),
    author: stringType().optional(),
    rating: coerce.number().optional()
  })),
  knowledgeMap: objectType({
    concepts: arrayType(stringType()),
    subtopics: arrayType(stringType()),
    dependencies: arrayType(stringType()),
    careerRelevance: stringType(),
    industryUsage: arrayType(stringType()),
    estimatedHours: numberType(),
    difficulty: stringType(),
    commonMistakes: arrayType(stringType()),
    bestPractices: arrayType(stringType()),
    interviewRelevance: arrayType(stringType()),
    projectApplications: arrayType(stringType())
  }),
  projects: objectType({
    beginner: objectType({
      title: stringType(),
      description: stringType()
    }),
    intermediate: objectType({
      title: stringType(),
      description: stringType()
    }),
    advanced: objectType({
      title: stringType(),
      description: stringType()
    }),
    startupIdea: objectType({
      title: stringType(),
      description: stringType()
    }),
    researchIdea: objectType({
      title: stringType(),
      description: stringType()
    }),
    finalYear: objectType({
      title: stringType(),
      description: stringType()
    }),
    industry: objectType({
      title: stringType(),
      description: stringType()
    }),
    openSource: objectType({
      title: stringType(),
      description: stringType()
    }),
    portfolio: objectType({
      title: stringType(),
      description: stringType()
    })
  }),
  mindmap: objectType({
    nodes: arrayType(objectType({
      id: stringType(),
      label: stringType(),
      type: enumType(["root", "main", "leaf"]),
      info: stringType(),
      source: stringType().optional(),
      x: numberType(),
      y: numberType(),
      color: stringType().optional()
    })),
    edges: arrayType(objectType({
      id: stringType(),
      source: stringType(),
      target: stringType(),
      animated: booleanType().optional()
    }))
  })
});
const generateNodeResourcesAndMindmap_createServerFn_handler = createServerRpc({
  id: "a691febf030bea961f2ded3944bbd9b2048c299746b418a7810bb42e61dcfa52",
  name: "generateNodeResourcesAndMindmap",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => generateNodeResourcesAndMindmap.__executeServer(opts));
const generateNodeResourcesAndMindmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(generateNodeResourcesAndMindmap_createServerFn_handler, async ({
  data
}) => {
  const cacheKey = `${data.slug}:${data.nodeId}`;
  try {
    const {
      data: cached
    } = await supabaseAdmin.from("roadmap_cache").select("content").eq("domain", cacheKey).eq("tier", "resources-mindmap-v2").maybeSingle();
    if (cached?.content) {
      return cached.content;
    }
  } catch (e) {
    console.warn("[resources-mindmap] Cache read failed:", e);
  }
  const fallback = getFallbackMindmapAndResources(data.nodeTitle, data.slug, data.tier);
  const generatePromise = (async () => {
    const domain = DOMAIN_BY_SLUG[data.slug]?.name ?? data.slug;
    const searchResults = await searchWeb(`${data.nodeTitle} ${domain} best tutorial OR documentation OR github`);
    const searchContext = searchResults.map((r) => `- [${r.title}](${r.url}): ${r.description}`).join("\n");
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
        const {
          object
        } = await generateResourceObjectResilient({
          system: SYSTEM,
          prompt,
          temperature: attempt === 0 ? 0.5 : 0.3,
          schema: NodeResourcesAndMindmapSchema
        });
        const parsed = object;
        (async () => {
          try {
            await supabaseAdmin.from("roadmap_cache").upsert({
              domain: cacheKey,
              tier: "resources-mindmap-v2",
              content: parsed,
              generated_by: "AI",
              model: "google/gemini-2.5-flash",
              version: "1.0",
              expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString()
            });
          } catch (err) {
            console.warn("[resources-mindmap] Background cache write failed:", err);
          }
        })();
        return parsed;
      } catch (error) {
        console.error(`[Resources & Mindmap] AI attempt ${attempt + 1} failed:`, error);
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
const checkNodeCache_createServerFn_handler = createServerRpc({
  id: "cecf8ffdcbed00a8d8a65ff5854aa6568542d489f80144577af57d67124f2a3e",
  name: "checkNodeCache",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => checkNodeCache.__executeServer(opts));
const checkNodeCache = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(checkNodeCache_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin: supabaseAdmin2
  } = await import("./client.server-DTlM-9S9.mjs");
  const {
    data: cached
  } = await supabaseAdmin2.from("roadmap_cache").select("content").eq("domain", data.cacheKey).eq("tier", "resources-mindmap-v2").maybeSingle();
  return cached?.content || null;
});
const saveNodeCache_createServerFn_handler = createServerRpc({
  id: "ceb984027b7de607f356fb5656d5b4b4b71072e927de260d8073ec1d6b6cb016",
  name: "saveNodeCache",
  filename: "src/lib/roadmap.functions.ts"
}, (opts) => saveNodeCache.__executeServer(opts));
const saveNodeCache = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(saveNodeCache_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin: supabaseAdmin2
  } = await import("./client.server-DTlM-9S9.mjs");
  await supabaseAdmin2.from("roadmap_cache").upsert({
    domain: data.cacheKey,
    tier: "resources-mindmap-v2",
    content: data.content,
    generated_by: "AI",
    model: "perplexity/sonar-deep-research"
  });
  return {
    success: true
  };
});
export {
  checkNodeCache_createServerFn_handler,
  generateCustomRoadmap_createServerFn_handler,
  generateNodeResourcesAndMindmap_createServerFn_handler,
  generateNodeStudyGuide_createServerFn_handler,
  getAllDomainsProgress_createServerFn_handler,
  getDomainProgress_createServerFn_handler,
  getRoadmap_createServerFn_handler,
  saveNodeCache_createServerFn_handler,
  toggleNodeProgress_createServerFn_handler
};
