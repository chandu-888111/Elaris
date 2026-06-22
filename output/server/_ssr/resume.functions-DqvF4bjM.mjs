import { e as createServerRpc, c as createServerFn } from "./ai-DTqZfz-A.mjs";
import { g as generateTextResilient } from "./ai-gateway-BOABUhLo.mjs";
import "../_libs/react.mjs";
import "../_libs/seroval.mjs";
import { i as objectType, m as arrayType, k as stringType, A as coerce } from "../_libs/zod.mjs";
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
const SYSTEM = `Return ONLY valid JSON. No markdown. No code fences. No commentary.`;
function extractJson(text) {
  let t = text.trim();
  if (t.startsWith("```")) t = t.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const f = t.indexOf("{");
  const l = t.lastIndexOf("}");
  if (f >= 0 && l > f) t = t.slice(f, l + 1);
  return JSON.parse(t);
}
const ResumeSchema = objectType({
  name: stringType(),
  headline: stringType(),
  contact: objectType({
    email: stringType(),
    location: stringType(),
    website: stringType(),
    github: stringType(),
    linkedin: stringType()
  }),
  summary: stringType(),
  skills: arrayType(stringType()),
  experience: arrayType(objectType({
    role: stringType(),
    company: stringType(),
    period: stringType(),
    bullets: arrayType(stringType())
  })),
  projects: arrayType(objectType({
    name: stringType(),
    description: stringType(),
    tech: arrayType(stringType()),
    link: stringType()
  })),
  education: arrayType(objectType({
    degree: stringType(),
    school: stringType(),
    period: stringType()
  })),
  certifications: arrayType(stringType()),
  achievements: arrayType(stringType())
});
const ATSReportSchema = objectType({
  overallScore: coerce.number().min(0).max(100),
  scores: objectType({
    keywords: coerce.number().min(0).max(100),
    formatting: coerce.number().min(0).max(100),
    impact: coerce.number().min(0).max(100),
    relevance: coerce.number().min(0).max(100),
    clarity: coerce.number().min(0).max(100),
    skills: coerce.number().min(0).max(100)
  }),
  matchedKeywords: arrayType(stringType()),
  missingKeywords: arrayType(stringType()),
  strengths: arrayType(stringType()),
  improvements: arrayType(stringType()),
  recruiterTake: stringType()
});
async function callJson(schema, prompt) {
  for (let i = 0; i < 2; i++) {
    try {
      const {
        text
      } = await generateTextResilient({
        system: SYSTEM,
        prompt,
        temperature: i === 0 ? 0.7 : 0.3
      });
      const parsed = schema.safeParse(extractJson(text));
      if (parsed.success) return parsed.data;
      console.error("[resume] parse", parsed.error.issues, text.slice(0, 300));
    } catch (e) {
      console.error("[resume]", e);
    }
  }
  throw new Error("AI failed to return valid JSON.");
}
const generateResume_createServerFn_handler = createServerRpc({
  id: "bc231beed22e65e331ebc5607ce260d8ec7de0c889e0aa3742415d4ba5258a36",
  name: "generateResume",
  filename: "src/lib/resume.functions.ts"
}, (opts) => generateResume.__executeServer(opts));
const generateResume = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(generateResume_createServerFn_handler, async ({
  data
}) => {
  const prompt = `Build a premium AI-generated resume tailored to the target role.
Target role: ${data.targetRole}
Candidate name: ${data.name}
Template style: ${data.template} (If 'Detailed', provide very descriptive bullets. If 'Simple', keep it concise).

Raw candidate details (extract all experience, skills, projects, education from here):
${data.rawDetails}

JSON shape (every field required, infer/expand where missing):
{
  "name": string,
  "headline": string (e.g. "Full Stack Engineer · React · Node"),
  "contact": { "email": string, "location": string, "website": string, "github": string, "linkedin": string },
  "summary": string (3-4 punchy sentences tailored to the role),
  "skills": string[] (10-18 sorted by relevance),
  "experience": [{ "role": string, "company": string, "period": string, "bullets": string[] }] (rewrite raw input into 3-5 quantified achievement bullets each),
  "projects": [{ "name": string, "description": string, "tech": string[], "link": string }] (2-5),
  "education": [{ "degree": string, "school": string, "period": string }],
  "certifications": string[],
  "achievements": string[]
}`;
  return callJson(ResumeSchema, prompt);
});
const analyzeResumeATS_createServerFn_handler = createServerRpc({
  id: "ee645837cc1fdb1a9586f6fd6c82fc038cd1fd13a82bf21f88be750d2bc4a3bb",
  name: "analyzeResumeATS",
  filename: "src/lib/resume.functions.ts"
}, (opts) => analyzeResumeATS.__executeServer(opts));
const analyzeResumeATS = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(analyzeResumeATS_createServerFn_handler, async ({
  data
}) => {
  const prompt = `You are a senior tech recruiter and ATS expert. Analyze this resume against the job description and return a detailed ATS report as JSON.

RESUME:
${data.resumeText.slice(0, 6e3)}

JOB DESCRIPTION:
${data.jobDescription.slice(0, 3e3)}

JSON shape:
{
  "overallScore": number (0-100),
  "scores": {
    "keywords": number, "formatting": number, "impact": number,
    "relevance": number, "clarity": number, "skills": number
  },
  "matchedKeywords": string[] (8-15),
  "missingKeywords": string[] (5-12 critical ones missing),
  "strengths": string[] (4-6),
  "improvements": string[] (5-8 specific rewrites),
  "recruiterTake": string (2-3 sentences as if a recruiter reviewing it)
}`;
  return callJson(ATSReportSchema, prompt);
});
const PortfolioDetailsSchema = objectType({
  fullName: stringType(),
  focusTitle: stringType(),
  email: stringType(),
  github: stringType(),
  linkedin: stringType(),
  skills: stringType(),
  education: stringType(),
  experience: stringType(),
  projects: stringType(),
  achievements: stringType(),
  hobbies: stringType()
});
const parseResumeForPortfolio_createServerFn_handler = createServerRpc({
  id: "dda3a9b435078d7ae55a9af2267bcbcf5f20b7d79084fa3053d24a433ad53543",
  name: "parseResumeForPortfolio",
  filename: "src/lib/resume.functions.ts"
}, (opts) => parseResumeForPortfolio.__executeServer(opts));
const parseResumeForPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(parseResumeForPortfolio_createServerFn_handler, async ({
  data
}) => {
  const prompt = `You are an AI resume parsing expert. Analyze the following raw resume text and extract the key information to construct a developer portfolio.
    
Resume Text:
${data.resumeText.slice(0, 6e3)}

Extract the details and return JSON with these exact fields:
{
  "fullName": "Candidate's full name",
  "focusTitle": "Tailored focus title or headline (e.g. 'Senior Frontend Engineer' or 'Machine Learning Researcher')",
  "email": "Contact email address",
  "github": "GitHub username or profile url (e.g. 'github.com/username')",
  "linkedin": "LinkedIn username or profile url (e.g. 'linkedin.com/in/username')",
  "skills": "Technical skills as a single comma-separated string (e.g. 'TypeScript, React, Python, AWS')",
  "education": "Brief description of education (e.g. 'B.S. in Computer Science, Stanford University (2025)')",
  "experience": "Brief summary of key professional experience (e.g. 'ML Engineer Intern at SparkLabs AI')",
  "projects": "Comma-separated list of key projects with short descriptions (e.g. 'E-commerce platform in Next.js, Raytracer in Rust')",
  "achievements": "Key professional, academic, or technical achievements, badges, or honors as a single comma-separated string. Do NOT include personal hobbies, sports, games, or leisure interests here!",
  "hobbies": "Personal interests, hobbies, or sports as a single comma-separated string (e.g. 'Chess, Watching Cricket, Hiking'). Do NOT include these in achievements!"
}

If any field is missing or cannot be inferred, provide a sensible default placeholder based on the context of the resume.`;
  return callJson(PortfolioDetailsSchema, prompt);
});
function extractHtml(text) {
  const match = text.match(/<html[\s\S]*<\/html>/i) || text.match(/<!DOCTYPE[\s\S]*<\/html>/i);
  if (match) {
    return match[0].trim();
  }
  let cleaned = text.trim();
  const htmlBlockMatch = cleaned.match(/```html([\s\S]*?)```/i) || cleaned.match(/```([\s\S]*?)```/i);
  if (htmlBlockMatch) {
    cleaned = htmlBlockMatch[1].trim();
  }
  const lower = cleaned.toLowerCase();
  if (!lower.includes("<html") && !lower.includes("<body") && !lower.includes("<div") && !lower.includes("<main") && !lower.includes("<section") && !lower.includes("<header")) {
    console.error("[extractHtml] Failed to find HTML tags in AI output:", cleaned.slice(0, 300));
    throw new Error("AI failed to return valid HTML. Please try again or check API keys.");
  }
  return cleaned;
}
const generateCustomPortfolio_createServerFn_handler = createServerRpc({
  id: "b05cdd6f691664cc831b21a6a6fea5fb1e776570b95ccd1cca976ec769cbf40c",
  name: "generateCustomPortfolio",
  filename: "src/lib/resume.functions.ts"
}, (opts) => generateCustomPortfolio.__executeServer(opts));
const generateCustomPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(generateCustomPortfolio_createServerFn_handler, async ({
  data
}) => {
  const prompt = `You are a world-class frontend engineer and UI/UX designer. Generate a complete, standalone, premium portfolio HTML page based on the candidate's details and the custom styling prompt.
    
Candidate Details:
- Name: ${data.details.fullName}
- Title: ${data.details.focusTitle}
- Email: ${data.details.email}
- GitHub: ${data.details.github}
- LinkedIn: ${data.details.linkedin}
- Skills: ${data.details.skills}
- Education: ${data.details.education}
- Experience: ${data.details.experience}
- Projects: ${data.details.projects}
- Achievements: ${data.details.achievements}
- Hobbies: ${data.details.hobbies}

Styling Prompt / Request:
"${data.prompt}"

CRITICAL REQUIREMENT: You MUST populate the generated HTML page with the EXACT Candidate Details provided above (Name, Title, Email, GitHub, LinkedIn, Skills, Education, Experience, Projects, Achievements, Hobbies). Do NOT use default placeholder names (like 'Arun Singh' or 'John Doe') or template text. Every piece of custom detail from the candidate list MUST be visible on the page.

Generate a single highly polished, responsive page. Use modern typography (e.g. Google Fonts like Space Grotesk, Inter, Outfit), smooth gradients, glowing glassmorphic elements, transition effects, and a layout that matches the theme described in the styling prompt. 

The output must be a single, complete HTML string including the full inline <style> block. Do NOT wrap the output in markdown code fences or backticks. Return ONLY the raw HTML code starting with <!DOCTYPE html>.`;
  const {
    text
  } = await generateTextResilient({
    system: "You are a web page generator. Return ONLY the raw HTML code. Do not wrap in triple backticks or markdown.",
    prompt
  });
  let cleaned = extractHtml(text);
  const replacePlaceholder = (htmlText, search, replacement) => {
    if (!search || !replacement) return htmlText;
    const escaped = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    return htmlText.replace(new RegExp(escaped, "gi"), replacement);
  };
  if (data.details.fullName) {
    cleaned = replacePlaceholder(cleaned, "Arun Singh", data.details.fullName);
    cleaned = replacePlaceholder(cleaned, "Arun", data.details.fullName.split(" ")[0]);
  }
  if (data.details.focusTitle) {
    cleaned = replacePlaceholder(cleaned, "AI Solutions Engineer", data.details.focusTitle);
    cleaned = replacePlaceholder(cleaned, "Full-Stack Developer", data.details.focusTitle);
    cleaned = replacePlaceholder(cleaned, "Full Stack Engineer", data.details.focusTitle);
  }
  if (data.details.email) {
    cleaned = replacePlaceholder(cleaned, "arun.singh@sparklabs.ai", data.details.email);
  }
  if (data.details.github) {
    cleaned = replacePlaceholder(cleaned, "github.com/arunsingh-ai", data.details.github);
  }
  if (data.details.linkedin) {
    cleaned = replacePlaceholder(cleaned, "linkedin.com/in/arun-spark", data.details.linkedin);
  }
  if (data.details.skills) {
    cleaned = replacePlaceholder(cleaned, "TypeScript, React, Node.js, PyTorch, Python, Docker", data.details.skills);
  }
  if (data.details.education) {
    cleaned = replacePlaceholder(cleaned, "B.S. in Computer Science, Stanford University (2025)", data.details.education);
  }
  if (data.details.experience) {
    cleaned = replacePlaceholder(cleaned, "ML Engineer Intern at SparkLabs AI (Implemented vision transformer diagnostic pipelines)", data.details.experience);
  }
  if (data.details.projects) {
    cleaned = replacePlaceholder(cleaned, "Custom RESP Engine (Rust) - in-memory key-value store, Interactive Mindmap (React) - visual graphs", data.details.projects);
  }
  if (data.details.achievements) {
    cleaned = replacePlaceholder(cleaned, "Hackathon Winner 2026, Dean's List (GPA 3.9/4.0)", data.details.achievements);
  }
  if (data.details.hobbies) {
    cleaned = replacePlaceholder(cleaned, "Chess, Watching Cricket, Hiking", data.details.hobbies);
  }
  return {
    html: cleaned
  };
});
const updateCustomPortfolio_createServerFn_handler = createServerRpc({
  id: "a2f7b9497b8e2ad7e33309e68afeecc1fd98c8974930aa73098a69308cfdf334",
  name: "updateCustomPortfolio",
  filename: "src/lib/resume.functions.ts"
}, (opts) => updateCustomPortfolio.__executeServer(opts));
const updateCustomPortfolio = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(updateCustomPortfolio_createServerFn_handler, async ({
  data
}) => {
  const prompt = `You are a world-class frontend engineer and UI/UX designer. Modify the following developer portfolio HTML page based on the update request.
    
Existing HTML:
\`\`\`html
${data.html}
\`\`\`

Candidate Details (for reference to ensure they remain populated):
- Name: ${data.details.fullName}
- Title: ${data.details.focusTitle}
- Email: ${data.details.email}
- GitHub: ${data.details.github}
- LinkedIn: ${data.details.linkedin}
- Skills: ${data.details.skills}
- Education: ${data.details.education}
- Experience: ${data.details.experience}
- Projects: ${data.details.projects}
- Achievements: ${data.details.achievements}
- Hobbies: ${data.details.hobbies}

Update Request:
"${data.prompt}"

CRITICAL REQUIREMENTS:
1. Retain the candidate's exact information, but apply the style edits, structure updates, layout modifications, or text replacements requested.
2. Return ONLY the modified raw HTML starting with <!DOCTYPE html>. Do not wrap in triple backticks or markdown.`;
  const {
    text
  } = await generateTextResilient({
    system: "You are a web page generator. Return ONLY the raw HTML code. Do not wrap in triple backticks or markdown.",
    prompt
  });
  let cleaned = extractHtml(text);
  const replacePlaceholder = (htmlText, search, replacement) => {
    if (!search || !replacement) return htmlText;
    const escaped = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    return htmlText.replace(new RegExp(escaped, "gi"), replacement);
  };
  if (data.details.fullName) {
    cleaned = replacePlaceholder(cleaned, "Arun Singh", data.details.fullName);
  }
  if (data.details.focusTitle) {
    cleaned = replacePlaceholder(cleaned, "AI Solutions Engineer", data.details.focusTitle);
    cleaned = replacePlaceholder(cleaned, "Full Stack Engineer", data.details.focusTitle);
  }
  if (data.details.email) {
    cleaned = replacePlaceholder(cleaned, "arun.singh@sparklabs.ai", data.details.email);
  }
  return {
    html: cleaned
  };
});
export {
  analyzeResumeATS_createServerFn_handler,
  generateCustomPortfolio_createServerFn_handler,
  generateResume_createServerFn_handler,
  parseResumeForPortfolio_createServerFn_handler,
  updateCustomPortfolio_createServerFn_handler
};
