import { c as createServerFn, a as createSsrRpc } from "./ai-DTqZfz-A.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-Bg7BSutF.mjs";
const getRoadmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("d3cceba56919cbb94af74939db2ee2e54d9d81867be14c7329347b3946aadc2b"));
const generateNodeStudyGuide = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("10cb75aafad77839ce6077c11157f38f1eaa08a10ec8c2c7581435a783e5556e"));
const generateCustomRoadmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("33fc70f46a66a435dd1e1cda28354eb2a72ab97d82334fc6d203487fc8bad192"));
const toggleNodeProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("e417beef39e1146922e1d7c86c86a72a9e97613c66e642f81d7950a5e265180f"));
const getDomainProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("dfa721998d2ac0fd5014200e70bbc8de57c6e917818763ddf8e766e239a15aa1"));
const getAllDomainsProgress = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d24c69199349c8184d89dbf225db17ed3acd1a3bf0f8f97945bd85700fd2b60d"));
const generateNodeResourcesAndMindmap = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("a691febf030bea961f2ded3944bbd9b2048c299746b418a7810bb42e61dcfa52"));
createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("cecf8ffdcbed00a8d8a65ff5854aa6568542d489f80144577af57d67124f2a3e"));
createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(createSsrRpc("ceb984027b7de607f356fb5656d5b4b4b71072e927de260d8073ec1d6b6cb016"));
export {
  generateCustomRoadmap as a,
  getRoadmap as b,
  getDomainProgress as c,
  generateNodeStudyGuide as d,
  generateNodeResourcesAndMindmap as e,
  getAllDomainsProgress as g,
  toggleNodeProgress as t
};
