globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/assets/ai.functions-BCLLX2ER.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32a-gDQVW2MhS6BW7OsFihqDCfBCnh0"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 810,
    "path": "../public/assets/ai.functions-BCLLX2ER.js"
  },
  "/assets/auth-middleware-BG1SXIM6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56-MrB3cQ3UGCkatkmCPCcBb1buTVQ"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 86,
    "path": "../public/assets/auth-middleware-BG1SXIM6.js"
  },
  "/assets/domains-BeM98Bbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"30e3-iuPuFOv6JblYEPh/YIBt50fLiP4"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 12515,
    "path": "../public/assets/domains-BeM98Bbq.js"
  },
  "/assets/ChatCommandCanvas-DmPB8VcD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"62d-eknxWxXsWUjneXMPE/2I0Wv84Sk"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1581,
    "path": "../public/assets/ChatCommandCanvas-DmPB8VcD.js"
  },
  "/assets/framer-motion-CYr2u_2H.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a22e-/fV29fxig3on9JicPSf8DDgD8OE"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 41518,
    "path": "../public/assets/framer-motion-CYr2u_2H.js"
  },
  "/blackhole.jpg": {
    "type": "image/jpeg",
    "etag": '"3aa04-QnTe9GASUvUzvkcRZYuSt3pWW4A"',
    "mtime": "2026-06-12T14:35:32.365Z",
    "size": 240132,
    "path": "../public/blackhole.jpg"
  },
  "/assets/LibraryCanvas-L-5zIlIu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"58b-2Jqvfxybh+Gu15d27j/Kd742KKM"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1419,
    "path": "../public/assets/LibraryCanvas-L-5zIlIu.js"
  },
  "/assets/gsap-xgxdCp6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11198-9ubDNODqOLALvTTPNnR3eEdAXgI"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 70040,
    "path": "../public/assets/gsap-xgxdCp6f.js"
  },
  "/assets/index-BEAuUHOP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3946-B95WumGP19do9hKSmsy28+aR1oE"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 14662,
    "path": "../public/assets/index-BEAuUHOP.js"
  },
  "/assets/login-CRohwgIE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c5c-cjAQkdofIDPuLmdy62OiBu0zAr8"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 11356,
    "path": "../public/assets/login-CRohwgIE.js"
  },
  "/assets/Markdown-B1GAoWrA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83a-9Ggs+NDIf4mU2WmXPRt72NiuvIc"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 2106,
    "path": "../public/assets/Markdown-B1GAoWrA.js"
  },
  "/assets/MentorHologram-M_VNVrDY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9f0-sgLVSNWIDczMI4JaGmyaOmTi4XY"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 2544,
    "path": "../public/assets/MentorHologram-M_VNVrDY.js"
  },
  "/assets/Logo-BP2KY1sH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"272-QinJrcezxDg5X816/Pyyx9UeOJA"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 626,
    "path": "../public/assets/Logo-BP2KY1sH.js"
  },
  "/assets/MentorChamberCanvas-DD0X5ha0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"722-qr4xQFSBB/gSBQUFycdk/FI6SqM"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1826,
    "path": "../public/assets/MentorChamberCanvas-DD0X5ha0.js"
  },
  "/assets/roadmap-catalog-4qgpA0gt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38b5-f6guJSl9KdnL+D99NpHP/oRVXJY"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 14517,
    "path": "../public/assets/roadmap-catalog-4qgpA0gt.js"
  },
  "/assets/roadmap.functions-DGvylG8F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"44e-lMRnIaNb/RWeS9WlgSvwKsE11FQ"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1102,
    "path": "../public/assets/roadmap.functions-DGvylG8F.js"
  },
  "/assets/RoadmapGalaxy-BsDKgfcB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20c3-+rncA/Sa3eI3Z85JUwu1cD6T5KY"',
    "mtime": "2026-06-22T14:42:27.673Z",
    "size": 8387,
    "path": "../public/assets/RoadmapGalaxy-BsDKgfcB.js"
  },
  "/assets/SaveBar-S5EPa2nh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"396-LZ6Cgls83tQQMjHuhGfl1nmRiZ4"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 918,
    "path": "../public/assets/SaveBar-S5EPa2nh.js"
  },
  "/assets/SessionPicker-IqItCPzy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"756-8EMo0kPAmmUrVnzgVfOUGNceNFs"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1878,
    "path": "../public/assets/SessionPicker-IqItCPzy.js"
  },
  "/assets/StudyGuideUniverse-Ds-C_3Hh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b51-6yYJyPvb7K4NhqlKHaCCPip327g"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 11089,
    "path": "../public/assets/StudyGuideUniverse-Ds-C_3Hh.js"
  },
  "/assets/recharts-BR9lJ8kJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"429f8-F7wDCUFUTmkVWMGb23cP5tg8+18"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 272888,
    "path": "../public/assets/recharts-BR9lJ8kJ.js"
  },
  "/assets/styles-DyTkw-tK.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"320a1-xqXMHIvfxRQSQQxKkd5skApATf4"',
    "mtime": "2026-06-22T14:42:27.667Z",
    "size": 204961,
    "path": "../public/assets/styles-DyTkw-tK.css"
  },
  "/assets/ThemeToggle-KZnqpYHu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b5-uxqgEZlQsjzoak2jqaWyJXL2f6A"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 949,
    "path": "../public/assets/ThemeToggle-KZnqpYHu.js"
  },
  "/assets/UniverseMapCanvas-BYi1pedv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9f4-FroyDxqlCnJeryHmbbXwI27RZmo"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 2548,
    "path": "../public/assets/UniverseMapCanvas-BYi1pedv.js"
  },
  "/assets/utils-Cb_ICAk5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"61-egRLaOrSHdsgpzUtsfRDclzmvuU"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 97,
    "path": "../public/assets/utils-Cb_ICAk5.js"
  },
  "/assets/verified-DpsEe8wg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"50e-NQt1QVPHwg7hBmsDVfOmP/SB1i8"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1294,
    "path": "../public/assets/verified-DpsEe8wg.js"
  },
  "/assets/_app-lDDa6rkl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b65-vlg4ZwYfzZK9I+v9d5J2vBBdW1U"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 11109,
    "path": "../public/assets/_app-lDDa6rkl.js"
  },
  "/assets/_app.about-Cn_4DdwH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"938-6jRl991V0ycy6eLqgVAFdW5RNic"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 2360,
    "path": "../public/assets/_app.about-Cn_4DdwH.js"
  },
  "/assets/_app.analytics-BWMmoHSr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c74-Mq6Fb85+nijm3YVKepsWpFKlim4"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 11380,
    "path": "../public/assets/_app.analytics-BWMmoHSr.js"
  },
  "/assets/_app.builder-BVhk7tf-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fb3-p/ztxRb74mHW2ZHWR/eg8I5DKZE"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 16307,
    "path": "../public/assets/_app.builder-BVhk7tf-.js"
  },
  "/assets/_app.chat-WUJ0hEHS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ae-ICwB9+HEKRUbFZl3toHwn/X0epk"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 4526,
    "path": "../public/assets/_app.chat-WUJ0hEHS.js"
  },
  "/assets/_app.chat.index-CwAY-wPl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"512-2TIiF+rm5s8gkT1lepS3Ndbr06I"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1298,
    "path": "../public/assets/_app.chat.index-CwAY-wPl.js"
  },
  "/assets/_app.chat._threadId-Ch0lRI2y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a35-mTNOMKfAx86YcnYMoiyCTE4bUfk"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 14901,
    "path": "../public/assets/_app.chat._threadId-Ch0lRI2y.js"
  },
  "/assets/_app.dashboard-BaNqBfPm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21c3-EMFx4ob6QFJZpR4zhtDrMr0R2nk"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 8643,
    "path": "../public/assets/_app.dashboard-BaNqBfPm.js"
  },
  "/assets/_app.generator-Ckv55Pfc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2618-/BBNeOh1FiOR/iX/Vjp78vx3hUc"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 9752,
    "path": "../public/assets/_app.generator-Ckv55Pfc.js"
  },
  "/assets/_app.mentor-C6IRVKJq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2857-6UNDtqsGgStS6S+9sZFh7XbMtlA"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 10327,
    "path": "../public/assets/_app.mentor-C6IRVKJq.js"
  },
  "/assets/_app.profile-BHzWUUVc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e79-MLz/uhdsAKehpM6Kg92x3Wa9zGs"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 7801,
    "path": "../public/assets/_app.profile-BHzWUUVc.js"
  },
  "/assets/_app.progress-DtrLVak3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e3-qfGP9LgSGEh/ZwRelgyRQTAjM80"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 4835,
    "path": "../public/assets/_app.progress-DtrLVak3.js"
  },
  "/assets/_app.resources-MT3cxkSR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0b-Sc949u8S0/++UE5GrVUGbYcOLPA"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 7691,
    "path": "../public/assets/_app.resources-MT3cxkSR.js"
  },
  "/assets/_app.roadmap-_yyY4_wB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a0-7VgbvtcJ21SoRvNP6QfAaTJ1wy4"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 160,
    "path": "../public/assets/_app.roadmap-_yyY4_wB.js"
  },
  "/assets/_app.resume-C9C82-tw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3448-HWlVZgTBDa/XCxr9IMSADRW1GZc"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 13384,
    "path": "../public/assets/_app.resume-C9C82-tw.js"
  },
  "/assets/_app.roadmap.index-DZ-vBKjc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2753-/O5Mjm/A5WAdzeQqgFUMfLncIhU"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 10067,
    "path": "../public/assets/_app.roadmap.index-DZ-vBKjc.js"
  },
  "/assets/_app.roadmap._slug-S9qXLQ6-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14200-CSiq4Ci/7oZO3uwwYdd5kVFjBkE"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 82432,
    "path": "../public/assets/_app.roadmap._slug-S9qXLQ6-.js"
  },
  "/assets/_app.saved.index-DgUdfKlJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4754-llRVWK/7AeJ1Qc0i2ili+X5uIVA"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 18260,
    "path": "../public/assets/_app.saved.index-DgUdfKlJ.js"
  },
  "/assets/three-HmxGe26l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff84f-daoyNZaw192H2DI4fxF0+zPFYF4"',
    "mtime": "2026-06-22T14:42:27.673Z",
    "size": 1046607,
    "path": "../public/assets/three-HmxGe26l.js"
  },
  "/assets/_app.saved._projectId-CQMYR8rS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ae9-fPpMp8ggfv77FM5UokaMM7FpV/0"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 10985,
    "path": "../public/assets/_app.saved._projectId-CQMYR8rS.js"
  },
  "/assets/index-BN5xLhku.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"314cab-4J3V45n6HPyxopWG0AkUkYtDcXY"',
    "mtime": "2026-06-22T14:42:27.673Z",
    "size": 3230891,
    "path": "../public/assets/index-BN5xLhku.js"
  },
  "/assets/_app.study-guide-B84ewxJJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b54-PAlZasws+it8eiBys8bPjqh2nGI"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 11092,
    "path": "../public/assets/_app.study-guide-B84ewxJJ.js"
  },
  "/assets/_app.settings-D9UUhwDq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122b-Yw689lsm6uNePsjtNvvfOip0OFI"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 4651,
    "path": "../public/assets/_app.settings-D9UUhwDq.js"
  },
  "/assets/_app._-h9x5THDu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"539-o0xzhtTHsB5keCjRug7u6B6gELw"',
    "mtime": "2026-06-22T14:42:27.669Z",
    "size": 1337,
    "path": "../public/assets/_app._-h9x5THDu.js"
  },
  "/Alien_Breed_Starfighter_Reimagined.usdz": {
    "type": "model/vnd.usdz+zip",
    "etag": '"723e96-5jfatNWf2G40GopVr4CCkboktnw"',
    "mtime": "2026-06-21T13:11:24.277Z",
    "size": 7487126,
    "path": "../public/Alien_Breed_Starfighter_Reimagined.usdz"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _wgcfPz = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_BIhsmQ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_BIhsmQ };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_wgcfPz)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
