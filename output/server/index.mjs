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
  "/assets/auth-middleware-C3V1lmWF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"56-IoTD3b3PyVOppjrp71OwaJj0kAo"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 86,
    "path": "../public/assets/auth-middleware-C3V1lmWF.js"
  },
  "/assets/ai.functions-C4lD44MR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32a-UROce/ZhQM2egczx1xo9DABmmJw"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 810,
    "path": "../public/assets/ai.functions-C4lD44MR.js"
  },
  "/assets/domains-BeM98Bbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"30e3-iuPuFOv6JblYEPh/YIBt50fLiP4"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 12515,
    "path": "../public/assets/domains-BeM98Bbq.js"
  },
  "/blackhole.jpg": {
    "type": "image/jpeg",
    "etag": '"3aa04-QnTe9GASUvUzvkcRZYuSt3pWW4A"',
    "mtime": "2026-06-12T14:35:32.365Z",
    "size": 240132,
    "path": "../public/blackhole.jpg"
  },
  "/assets/ChatCommandCanvas-Bc5MkA34.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"62d-27jbqAZlInXYyvk4lXbicnxb6Do"',
    "mtime": "2026-06-23T14:29:29.218Z",
    "size": 1581,
    "path": "../public/assets/ChatCommandCanvas-Bc5MkA34.js"
  },
  "/assets/gsap-xgxdCp6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11198-9ubDNODqOLALvTTPNnR3eEdAXgI"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 70040,
    "path": "../public/assets/gsap-xgxdCp6f.js"
  },
  "/assets/index-BRKdN3UX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3929-IEQKYNjMcmnCY8K5ievbkX8jBVI"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 14633,
    "path": "../public/assets/index-BRKdN3UX.js"
  },
  "/assets/framer-motion-BuzgYyqz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a22e-rkzjh7SbK8Z/VcFKKtLEAersbjg"',
    "mtime": "2026-06-23T14:29:29.208Z",
    "size": 41518,
    "path": "../public/assets/framer-motion-BuzgYyqz.js"
  },
  "/assets/login-tbJbc2B0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c5c-xvBL0XKZm3UNPaBXwXOarE+5WA4"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 11356,
    "path": "../public/assets/login-tbJbc2B0.js"
  },
  "/assets/LibraryCanvas-C7QiSdUe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"58b-DwqJhmet3QxrL8C+9zgkk9MN8w8"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 1419,
    "path": "../public/assets/LibraryCanvas-C7QiSdUe.js"
  },
  "/assets/Logo-CA7rvoo5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"272-iPAE/utD+lKlfc/4D2FeRYbn2NI"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 626,
    "path": "../public/assets/Logo-CA7rvoo5.js"
  },
  "/assets/Markdown-qJcOiXyR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83a-AzZ6NzuhNrgWiGbY2nb+WF2OFPU"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 2106,
    "path": "../public/assets/Markdown-qJcOiXyR.js"
  },
  "/assets/MentorChamberCanvas-Dt3fZ6uW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"722-mgJ//MliK/+fubK/H9yzYCykKyc"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 1826,
    "path": "../public/assets/MentorChamberCanvas-Dt3fZ6uW.js"
  },
  "/assets/MentorHologram-CsC9j78p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9f0-7diGWCBzbv3SPfHV9s+nCtDE6BU"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 2544,
    "path": "../public/assets/MentorHologram-CsC9j78p.js"
  },
  "/assets/roadmap-catalog-4qgpA0gt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38b5-f6guJSl9KdnL+D99NpHP/oRVXJY"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 14517,
    "path": "../public/assets/roadmap-catalog-4qgpA0gt.js"
  },
  "/assets/roadmap.functions-C283LAB9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"44e-6JcQjGLgHLJqt8hG7OHSMGLHbZA"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 1102,
    "path": "../public/assets/roadmap.functions-C283LAB9.js"
  },
  "/assets/RoadmapGalaxy-CYcN9oRB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"20c3-gQlm1UJg4gd35mkFljdFPtK2VWM"',
    "mtime": "2026-06-23T14:29:29.218Z",
    "size": 8387,
    "path": "../public/assets/RoadmapGalaxy-CYcN9oRB.js"
  },
  "/assets/SaveBar-26HbjTJB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"396-xLMwG8OmjuggDBfOTaUxx4Uvzy4"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 918,
    "path": "../public/assets/SaveBar-26HbjTJB.js"
  },
  "/assets/SessionPicker-C2u0iDqn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"756-vk0O3QAQEAvTexeZ7N/X6FUkArk"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 1878,
    "path": "../public/assets/SessionPicker-C2u0iDqn.js"
  },
  "/assets/StudyGuideUniverse-oK-ny80j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b51-YGE1QwPa0ljXRDx0cYPRsvchpCU"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 11089,
    "path": "../public/assets/StudyGuideUniverse-oK-ny80j.js"
  },
  "/assets/ThemeToggle-C7Fw45Mx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3b5-m9Ty6VBNxyOYTtTY7EmCKUf9LRo"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 949,
    "path": "../public/assets/ThemeToggle-C7Fw45Mx.js"
  },
  "/assets/styles-DyTkw-tK.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"320a1-xqXMHIvfxRQSQQxKkd5skApATf4"',
    "mtime": "2026-06-23T14:29:29.191Z",
    "size": 204961,
    "path": "../public/assets/styles-DyTkw-tK.css"
  },
  "/assets/recharts-D596RCv_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"429f8-5Bxbijn3Mo8MDVydpNyOzgKHBSM"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 272888,
    "path": "../public/assets/recharts-D596RCv_.js"
  },
  "/assets/UniverseMapCanvas-B0yyU9QG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9f4-GFLTcFCuNyNpQykfIIC8UASS3T0"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 2548,
    "path": "../public/assets/UniverseMapCanvas-B0yyU9QG.js"
  },
  "/assets/utils-DmV94TIf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"61-q/nbqO3ePOhW2vrenJgrf/MwujU"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 97,
    "path": "../public/assets/utils-DmV94TIf.js"
  },
  "/assets/_app.about-rX5jWFmo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"938-/7E8SvVhEbyae1t7T7vB0Wf/NfQ"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 2360,
    "path": "../public/assets/_app.about-rX5jWFmo.js"
  },
  "/assets/verified-DWVA_xFs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"50e-SuB9d9qPx1+SNJsbIGU9PJqgEtU"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 1294,
    "path": "../public/assets/verified-DWVA_xFs.js"
  },
  "/assets/_app.analytics-YyhmrUoF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2c74-czPLrUsWdtLr3oawXN0XkZac2Wo"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 11380,
    "path": "../public/assets/_app.analytics-YyhmrUoF.js"
  },
  "/assets/_app-RFMLyPm6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b67-jZvxwalnY5jgYq1ayJZ1gZygWqg"',
    "mtime": "2026-06-23T14:29:29.210Z",
    "size": 11111,
    "path": "../public/assets/_app-RFMLyPm6.js"
  },
  "/assets/_app.chat-jG06H8u6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11ae-bzb/8zQCfpxSyg6BgsM1AQX4q4Y"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 4526,
    "path": "../public/assets/_app.chat-jG06H8u6.js"
  },
  "/assets/_app.chat.index-ygPSCsWT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"512-Vx1XfTJcNfL8u0DgCf+Cwo1jXKI"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 1298,
    "path": "../public/assets/_app.chat.index-ygPSCsWT.js"
  },
  "/assets/_app.builder-PAPbsyAw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3fb3-Q8Gk+nSQMQhUFrEtgVD3nNPbVKg"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 16307,
    "path": "../public/assets/_app.builder-PAPbsyAw.js"
  },
  "/assets/_app.dashboard-BLuxv0V7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"21c3-rdTdk6ayGINdYkwMLsdDPPjkWoI"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 8643,
    "path": "../public/assets/_app.dashboard-BLuxv0V7.js"
  },
  "/assets/_app.chat._threadId-BY34smxg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3a35-/87knr+BqVc8vLSpd8A7N9jJQmc"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 14901,
    "path": "../public/assets/_app.chat._threadId-BY34smxg.js"
  },
  "/assets/_app.generator-B0lKrFXm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2618-j+RoIlUQHQS9SAWpOuwleVMJxiI"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 9752,
    "path": "../public/assets/_app.generator-B0lKrFXm.js"
  },
  "/assets/_app.profile-5_m-jbQQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e79-lalwQopiKdyUWlIcukgaM83bZ1Y"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 7801,
    "path": "../public/assets/_app.profile-5_m-jbQQ.js"
  },
  "/assets/_app.mentor-DhTbd8QH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2857-mV7DyZraWZ56Ts7SQDQ+VCWXbv8"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 10327,
    "path": "../public/assets/_app.mentor-DhTbd8QH.js"
  },
  "/assets/_app.resume-8kLxTCRm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3448-zG7su/au4mthHHIsIknR5OSKvLw"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 13384,
    "path": "../public/assets/_app.resume-8kLxTCRm.js"
  },
  "/assets/_app.progress-BL04kLMl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e3-aiCi+MP1grtY+YIiUhfojaelgmM"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 4835,
    "path": "../public/assets/_app.progress-BL04kLMl.js"
  },
  "/assets/_app.resources-BEhbEs36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0b-keDSSbGCzccKZuH/f1uhpfgvoGc"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 7691,
    "path": "../public/assets/_app.resources-BEhbEs36.js"
  },
  "/assets/_app.roadmap.index-DaRx9PHS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2753-hxl+g/5ovwdPAZ5OFXyU2MzGMwo"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 10067,
    "path": "../public/assets/_app.roadmap.index-DaRx9PHS.js"
  },
  "/assets/_app.roadmap-BtUy_D3h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a0-Ipa0noL7NhkD6aEGicTLi4lqjm0"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 160,
    "path": "../public/assets/_app.roadmap-BtUy_D3h.js"
  },
  "/assets/_app.roadmap._slug-DTJNIN46.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14200-T4ghAq70WYZLsUQBjJaEHqasOtk"',
    "mtime": "2026-06-23T14:29:29.215Z",
    "size": 82432,
    "path": "../public/assets/_app.roadmap._slug-DTJNIN46.js"
  },
  "/assets/_app.saved.index-Dre6b6ge.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4754-plju1dwBAVtTdlrRkJBupzzZ8Mk"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 18260,
    "path": "../public/assets/_app.saved.index-Dre6b6ge.js"
  },
  "/assets/_app.saved._projectId-D3FSmgcd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ae9-T69rYh6Unp7OGI2yHbnVPGfk8f8"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 10985,
    "path": "../public/assets/_app.saved._projectId-D3FSmgcd.js"
  },
  "/assets/three-BlwufqMb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff84f-W1gkdYyqQvJtsBk9/IM/HSnWmxc"',
    "mtime": "2026-06-23T14:29:29.216Z",
    "size": 1046607,
    "path": "../public/assets/three-BlwufqMb.js"
  },
  "/assets/index-B2LsKEZE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31599e-6jwk4o5gtov7Btw1gNTp38bNg8U"',
    "mtime": "2026-06-23T14:29:29.222Z",
    "size": 3234206,
    "path": "../public/assets/index-B2LsKEZE.js"
  },
  "/assets/_app.settings-8Khtp9UV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"122b-OKDdGuvWG//Z68lVlOepnmIDBuU"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 4651,
    "path": "../public/assets/_app.settings-8Khtp9UV.js"
  },
  "/assets/_app.study-guide-BHqKsd0G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2b54-L8NR/2W0kqogxbdVXIsNavxklTY"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 11092,
    "path": "../public/assets/_app.study-guide-BHqKsd0G.js"
  },
  "/assets/_app._-CgQeKsdv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"539-mWBxf+Heyv2yQRoO8sKAaY+GtRY"',
    "mtime": "2026-06-23T14:29:29.212Z",
    "size": 1337,
    "path": "../public/assets/_app._-CgQeKsdv.js"
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
