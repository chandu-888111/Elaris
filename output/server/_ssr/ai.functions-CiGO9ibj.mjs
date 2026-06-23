import { c as createServerFn, a as createSsrRpc } from "./ai-BioNg-KZ.mjs";
import "./ai-gateway-BOABUhLo.mjs";
const SYSTEM = `Return ONLY valid JSON. Do not include markdown. Do not wrap in triple backticks. Do not include any explanation. All fields are mandatory.`;
const generateProjectIdea = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("0d2305b17a1d649c2a805a147df1bf6fca1d9aef72002104b2c50636eb15ab36"));
createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("b6facfec805a4d13e6faff31af888082ec42bbac733da5852134732c7b3f5fe6"));
const generateStudyGuide = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("a9838117b88af4e4a32c789a173811ceb1f1994b148d26cf9b7473647c45686a"));
const generateBuildBlueprint = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("ddaffa8685af33be9bf37dc3baba047b9d0242cbf4737c5cdb094d763cece235"));
const generateMentorPlan = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("e329a994be7ba36d8ae898f80b4a74d7304442ce8e0177ea8f251d1080a30b5c"));
const generateProjectPrototypeCode = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("9d8d5310b9a06662ac0cad63ce2c2777c722e3a72bc859d8bfb0d587101b123c"));
const updateProjectPrototypeCode = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("40b40ab593c63af0b2209b349ff13ade70dea11c84d5e72a7b4ab791952e60b8"));
export {
  SYSTEM as S,
  generateMentorPlan as a,
  generateProjectIdea as b,
  generateBuildBlueprint as c,
  generateProjectPrototypeCode as d,
  generateStudyGuide as g,
  updateProjectPrototypeCode as u
};
