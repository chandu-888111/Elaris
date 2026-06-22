import { r as requireCommonjs } from "./html-entities.mjs";
import { r as requireNeedle } from "./needle.mjs";
var lib = {};
var images = {};
var util = {};
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  (function(exports) {
    var __importDefault = util && util.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseSpiceBody = exports.ensureJSON = exports.getVQD = exports.queryString = exports.SearchTimeType = exports.SafeSearchType = exports.COMMON_HEADERS = exports.VQD_REGEX = exports.SPICE_BASE = void 0;
    const needle_1 = __importDefault(requireNeedle());
    exports.SPICE_BASE = "https://duckduckgo.com/js/spice";
    exports.VQD_REGEX = /vqd=['"](\d+-\d+(?:-\d+)?)['"]/;
    exports.COMMON_HEADERS = {
      "sec-ch-ua": '"Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    };
    (function(SafeSearchType) {
      SafeSearchType[SafeSearchType["STRICT"] = 0] = "STRICT";
      SafeSearchType[SafeSearchType["MODERATE"] = -1] = "MODERATE";
      SafeSearchType[SafeSearchType["OFF"] = -2] = "OFF";
    })(exports.SafeSearchType || (exports.SafeSearchType = {}));
    (function(SearchTimeType) {
      SearchTimeType["ALL"] = "a";
      SearchTimeType["DAY"] = "d";
      SearchTimeType["WEEK"] = "w";
      SearchTimeType["MONTH"] = "m";
      SearchTimeType["YEAR"] = "y";
    })(exports.SearchTimeType || (exports.SearchTimeType = {}));
    function queryString(query) {
      return new URLSearchParams(query).toString();
    }
    exports.queryString = queryString;
    async function getVQD(query, ia = "web", options) {
      try {
        const response = await (0, needle_1.default)("get", `https://duckduckgo.com/?${queryString({ q: query, ia })}`, options);
        return exports.VQD_REGEX.exec(response.body)[1];
      } catch (e) {
        throw new Error(`Failed to get the VQD for query "${query}".`);
      }
    }
    exports.getVQD = getVQD;
    function ensureJSON(body) {
      if (body instanceof Buffer)
        return JSON.parse(body.toString());
      else if (typeof body === "string")
        return JSON.parse(body);
      return body;
    }
    exports.ensureJSON = ensureJSON;
    function parseSpiceBody(body, regex = /^ddg_spice_[\w]+\(\n?((?:.|\n)+)\n?\);?/) {
      return JSON.parse(regex.exec(body.toString())[1]);
    }
    exports.parseSpiceBody = parseSpiceBody;
  })(util);
  return util;
}
var hasRequiredImages;
function requireImages() {
  if (hasRequiredImages) return images;
  hasRequiredImages = 1;
  (function(exports) {
    var __importDefault = images && images.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchImages = exports.ImageLicense = exports.ImageColor = exports.ImageLayout = exports.ImageType = exports.ImageSize = void 0;
    const html_entities_1 = /* @__PURE__ */ requireCommonjs();
    const needle_1 = __importDefault(requireNeedle());
    const util_1 = requireUtil();
    var ImageSize;
    (function(ImageSize2) {
      ImageSize2["ALL"] = "";
      ImageSize2["SMALL"] = "Small";
      ImageSize2["MEDIUM"] = "Medium";
      ImageSize2["LARGE"] = "Large";
      ImageSize2["WALLPAPER"] = "Wallpaper";
    })(ImageSize = exports.ImageSize || (exports.ImageSize = {}));
    var ImageType;
    (function(ImageType2) {
      ImageType2["ALL"] = "";
      ImageType2["PHOTOGRAPH"] = "photo";
      ImageType2["CLIPART"] = "clipart";
      ImageType2["GIF"] = "gif";
      ImageType2["TRANSPARENT"] = "transparent";
    })(ImageType = exports.ImageType || (exports.ImageType = {}));
    var ImageLayout;
    (function(ImageLayout2) {
      ImageLayout2["ALL"] = "";
      ImageLayout2["SQUARE"] = "Square";
      ImageLayout2["TALL"] = "Tall";
      ImageLayout2["WIDE"] = "Wide";
    })(ImageLayout = exports.ImageLayout || (exports.ImageLayout = {}));
    var ImageColor;
    (function(ImageColor2) {
      ImageColor2["ALL"] = "";
      ImageColor2["COLOR"] = "color";
      ImageColor2["BLACK_AND_WHITE"] = "Monochrome";
      ImageColor2["RED"] = "Red";
      ImageColor2["ORANGE"] = "Orange";
      ImageColor2["YELLOW"] = "Yellow";
      ImageColor2["GREEN"] = "Green";
      ImageColor2["BLUE"] = "Blue";
      ImageColor2["PINK"] = "Pink";
      ImageColor2["BROWN"] = "Brown";
      ImageColor2["BLACK"] = "Black";
      ImageColor2["GRAY"] = "Gray";
      ImageColor2["GREY"] = "Gray";
      ImageColor2["TEAL"] = "Teal";
      ImageColor2["WHITE"] = "White";
    })(ImageColor = exports.ImageColor || (exports.ImageColor = {}));
    var ImageLicense;
    (function(ImageLicense2) {
      ImageLicense2["ALL"] = "";
      ImageLicense2["CREATIVE_COMMONS"] = "Any";
      ImageLicense2["PUBLIC_DOMAIN"] = "Public";
      ImageLicense2["SHARE"] = "Share";
      ImageLicense2["SHARE_COMMERCIALLY"] = "ShareCommercially";
      ImageLicense2["MODIFY"] = "Modify";
      ImageLicense2["MODIFY_COMMERCIALLY"] = "ModifyCommercially";
    })(ImageLicense = exports.ImageLicense || (exports.ImageLicense = {}));
    const defaultOptions = {
      safeSearch: util_1.SafeSearchType.OFF,
      locale: "en-us",
      offset: 0
    };
    async function searchImages(query, options, needleOptions) {
      if (!query)
        throw new Error("Query cannot be empty!");
      if (!options)
        options = defaultOptions;
      else
        options = sanityCheck(options);
      let vqd = options.vqd;
      if (!vqd)
        vqd = await (0, util_1.getVQD)(query, "web", needleOptions);
      const filters = [
        options.size ? `size:${options.size}` : "",
        options.type ? `type:${options.type}` : "",
        options.layout ? `layout:${options.layout}` : "",
        options.color ? `color:${options.color}` : "",
        options.license ? `license:${options.license}` : ""
      ];
      const queryObject = {
        l: options.locale,
        o: "json",
        q: query,
        vqd,
        p: options.safeSearch === 0 ? "1" : "-1",
        f: filters.toString(),
        s: String(options.offset || 0)
      };
      const response = await (0, needle_1.default)("get", `https://duckduckgo.com/i.js?${(0, util_1.queryString)(queryObject)}`, needleOptions || { headers: util_1.COMMON_HEADERS });
      if (response.statusCode === 403)
        throw new Error("A server error occurred!");
      const imagesResult = (0, util_1.ensureJSON)(response.body);
      return {
        noResults: !imagesResult.results.length,
        vqd,
        results: imagesResult.results.map((image) => ({
          ...image,
          title: (0, html_entities_1.decode)(image.title)
        }))
      };
    }
    exports.searchImages = searchImages;
    function sanityCheck(options) {
      options = Object.assign({}, defaultOptions, options);
      if (!(options.safeSearch in util_1.SafeSearchType))
        throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
      if (typeof options.safeSearch === "string")
        options.safeSearch = util_1.SafeSearchType[options.safeSearch];
      if (typeof options.offset !== "number")
        throw new TypeError(`Search offset is not a number!`);
      if (options.offset < 0)
        throw new RangeError("Search offset cannot be below zero!");
      if (!options.locale || typeof options.locale !== "string")
        throw new TypeError("Search locale must be a string!");
      if (options.size && !Object.values(ImageSize).includes(options.size))
        throw new TypeError(`${options.size} is an invalid image size filter!`);
      if (options.type && !Object.values(ImageType).includes(options.type))
        throw new TypeError(`${options.type} is an invalid image type filter!`);
      if (options.layout && !Object.values(ImageLayout).includes(options.layout))
        throw new TypeError(`${options.layout} is an invalid image layout filter!`);
      if (options.color && !Object.values(ImageColor).includes(options.color))
        throw new TypeError(`${options.color} is an invalid color filter!`);
      if (options.license && !Object.values(ImageLicense).includes(options.license))
        throw new TypeError(`${options.license} is an invalid license filter!`);
      if (options.vqd && !/\d-\d+-\d+/.test(options.vqd))
        throw new Error(`${options.vqd} is an invalid VQD!`);
      return options;
    }
  })(images);
  return images;
}
var news = {};
var hasRequiredNews;
function requireNews() {
  if (hasRequiredNews) return news;
  hasRequiredNews = 1;
  var __importDefault = news && news.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(news, "__esModule", { value: true });
  news.searchNews = void 0;
  const html_entities_1 = /* @__PURE__ */ requireCommonjs();
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  const defaultOptions = {
    safeSearch: util_1.SafeSearchType.OFF,
    locale: "en-us",
    offset: 0
  };
  async function searchNews(query, options, needleOptions) {
    if (!query)
      throw new Error("Query cannot be empty!");
    if (!options)
      options = defaultOptions;
    else
      options = sanityCheck(options);
    let vqd = options.vqd;
    if (!vqd)
      vqd = await (0, util_1.getVQD)(query, "web", needleOptions);
    const queryObject = {
      l: options.locale,
      o: "json",
      noamp: "1",
      q: query,
      vqd,
      p: options.safeSearch === 0 ? "1" : String(options.safeSearch),
      df: options.time || "",
      s: String(options.offset || 0)
    };
    const response = await (0, needle_1.default)("get", `https://duckduckgo.com/news.js?${(0, util_1.queryString)(queryObject)}`, needleOptions || { headers: util_1.COMMON_HEADERS });
    if (response.statusCode === 403)
      throw new Error("A server error occurred!");
    const newsResult = (0, util_1.ensureJSON)(response.body);
    return {
      noResults: !newsResult.results.length,
      vqd,
      results: newsResult.results.map((article) => ({
        date: article.date,
        excerpt: (0, html_entities_1.decode)(article.excerpt),
        image: article.image,
        relativeTime: article.relative_time,
        syndicate: article.syndicate,
        title: (0, html_entities_1.decode)(article.title),
        url: article.url,
        isOld: !!article.is_old
      }))
    };
  }
  news.searchNews = searchNews;
  function sanityCheck(options) {
    options = Object.assign({}, defaultOptions, options);
    if (!(options.safeSearch in util_1.SafeSearchType))
      throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
    if (typeof options.safeSearch === "string")
      options.safeSearch = util_1.SafeSearchType[options.safeSearch];
    if (typeof options.offset !== "number")
      throw new TypeError(`Search offset is not a number!`);
    if (options.offset < 0)
      throw new RangeError("Search offset cannot be below zero!");
    if (!options.locale || typeof options.locale !== "string")
      throw new TypeError("Search locale must be a string!");
    if (options.time && !Object.values(util_1.SearchTimeType).includes(options.time))
      throw new TypeError(`${options.time} is an invalid time filter!`);
    if (options.vqd && !/\d-\d+-\d+/.test(options.vqd))
      throw new Error(`${options.vqd} is an invalid VQD!`);
    return options;
  }
  return news;
}
var search = {};
var hasRequiredSearch;
function requireSearch() {
  if (hasRequiredSearch) return search;
  hasRequiredSearch = 1;
  var __importDefault = search && search.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(search, "__esModule", { value: true });
  search.autocomplete = search.search = void 0;
  const html_entities_1 = /* @__PURE__ */ requireCommonjs();
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  const defaultOptions = {
    safeSearch: util_1.SafeSearchType.OFF,
    time: util_1.SearchTimeType.ALL,
    locale: "en-us",
    region: "wt-wt",
    offset: 0,
    marketRegion: "en-US"
  };
  const SEARCH_REGEX = /DDG\.pageLayout\.load\('d',(\[.+\])\);DDG\.duckbar\.load(?:Module)?\('/;
  const IMAGES_REGEX = /;DDG\.duckbar\.load\('images', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('news/;
  const NEWS_REGEX = /;DDG\.duckbar\.load\('news', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('videos/;
  const VIDEOS_REGEX = /;DDG\.duckbar\.load\('videos', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.loadModule\('related_searches/;
  const RELATED_SEARCHES_REGEX = /DDG\.duckbar\.loadModule\('related_searches', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('products/;
  async function search$1(query, options, needleOptions) {
    if (!query)
      throw new Error("Query cannot be empty!");
    if (!options)
      options = defaultOptions;
    else
      options = sanityCheck(options);
    let vqd = options.vqd;
    if (!vqd)
      vqd = await (0, util_1.getVQD)(query, "web", needleOptions || { headers: util_1.COMMON_HEADERS });
    const queryObject = {
      q: query,
      ...options.safeSearch !== util_1.SafeSearchType.STRICT ? { t: "D" } : {},
      l: options.locale,
      ...options.safeSearch === util_1.SafeSearchType.STRICT ? { p: "1" } : {},
      kl: options.region || "wt-wt",
      s: String(options.offset),
      dl: "en",
      ct: "US",
      bing_market: options.marketRegion,
      df: options.time,
      vqd,
      ...options.safeSearch !== util_1.SafeSearchType.STRICT ? { ex: String(options.safeSearch) } : {},
      sp: "1",
      bpa: "1",
      biaexp: "b",
      msvrtexp: "b",
      ...options.safeSearch === util_1.SafeSearchType.STRICT ? {
        videxp: "a",
        nadse: "b",
        eclsexp: "a",
        stiaexp: "a",
        tjsexp: "b",
        related: "b",
        msnexp: "a"
      } : {
        nadse: "b",
        eclsexp: "b",
        tjsexp: "b"
        // cdrexp: 'b'
      }
    };
    const response = await (0, needle_1.default)("get", `https://links.duckduckgo.com/d.js?${(0, util_1.queryString)(queryObject)}`, needleOptions);
    if (response.body.includes("DDG.deep.is506"))
      throw new Error("A server error occurred!");
    if (response.body.toString().includes("DDG.deep.anomalyDetectionBlock"))
      throw new Error("DDG detected an anomaly in the request, you are likely making requests too quickly.");
    const searchResults = JSON.parse(SEARCH_REGEX.exec(response.body)[1].replace(/\t/g, "    "));
    if (searchResults.length === 1 && !("n" in searchResults[0])) {
      const onlyResult = searchResults[0];
      if (!onlyResult.da && onlyResult.t === "EOF" || !onlyResult.a || onlyResult.d === "google.com search")
        return {
          noResults: true,
          vqd,
          results: []
        };
    }
    const results = {
      noResults: false,
      vqd,
      results: []
    };
    for (const search2 of searchResults) {
      if ("n" in search2)
        continue;
      let bang;
      if (search2.b) {
        const [prefix, title, domain] = search2.b.split("	");
        bang = { prefix, title, domain };
      }
      results.results.push({
        title: search2.t,
        description: (0, html_entities_1.decode)(search2.a),
        rawDescription: search2.a,
        hostname: search2.i,
        icon: `https://external-content.duckduckgo.com/ip3/${search2.i}.ico`,
        url: search2.u,
        bang
      });
    }
    const imagesMatch = IMAGES_REGEX.exec(response.body);
    if (imagesMatch) {
      const imagesResult = JSON.parse(imagesMatch[1].replace(/\t/g, "    "));
      results.images = imagesResult.results.map((i) => {
        i.title = (0, html_entities_1.decode)(i.title);
        return i;
      });
    }
    const newsMatch = NEWS_REGEX.exec(response.body);
    if (newsMatch) {
      const newsResult = JSON.parse(newsMatch[1].replace(/\t/g, "    "));
      results.news = newsResult.results.map((article) => ({
        date: article.date,
        excerpt: (0, html_entities_1.decode)(article.excerpt),
        image: article.image,
        relativeTime: article.relative_time,
        syndicate: article.syndicate,
        title: (0, html_entities_1.decode)(article.title),
        url: article.url,
        isOld: !!article.is_old
      }));
    }
    const videosMatch = VIDEOS_REGEX.exec(response.body);
    if (videosMatch) {
      const videoResult = JSON.parse(videosMatch[1].replace(/\t/g, "    "));
      results.videos = [];
      for (const video of videoResult.results) {
        results.videos.push({
          url: video.content,
          title: (0, html_entities_1.decode)(video.title),
          description: (0, html_entities_1.decode)(video.description),
          image: video.images.large || video.images.medium || video.images.small || video.images.motion,
          duration: video.duration,
          publishedOn: video.publisher,
          published: video.published,
          publisher: video.uploader,
          viewCount: video.statistics.viewCount || void 0
        });
      }
    }
    const relatedMatch = RELATED_SEARCHES_REGEX.exec(response.body);
    if (relatedMatch) {
      const relatedResult = JSON.parse(relatedMatch[1].replace(/\t/g, "    "));
      results.related = [];
      for (const related of relatedResult.results) {
        results.related.push({
          text: related.text,
          raw: related.display_text
        });
      }
    }
    return results;
  }
  search.search = search$1;
  function sanityCheck(options) {
    options = Object.assign({}, defaultOptions, options);
    if (!(options.safeSearch in util_1.SafeSearchType))
      throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
    if (typeof options.safeSearch === "string")
      options.safeSearch = util_1.SafeSearchType[options.safeSearch];
    if (typeof options.offset !== "number")
      throw new TypeError(`Search offset is not a number!`);
    if (options.offset < 0)
      throw new RangeError("Search offset cannot be below zero!");
    if (options.time && !Object.values(util_1.SearchTimeType).includes(options.time) && !/\d{4}-\d{2}-\d{2}..\d{4}-\d{2}-\d{2}/.test(options.time))
      throw new TypeError(`${options.time} is an invalid search time!`);
    if (!options.locale || typeof options.locale !== "string")
      throw new TypeError("Search locale must be a string!");
    if (!options.region || typeof options.region !== "string")
      throw new TypeError("Search region must be a string!");
    if (!options.marketRegion || typeof options.marketRegion !== "string")
      throw new TypeError("Search market region must be a string!");
    if (options.vqd && !/\d-\d+-\d+/.test(options.vqd))
      throw new Error(`${options.vqd} is an invalid VQD!`);
    return options;
  }
  async function autocomplete(query, region, needleOptions) {
    if (!query)
      throw new Error("Query cannot be empty!");
    const queryObject = {
      q: query,
      kl: region || "wt-wt"
    };
    const response = await (0, needle_1.default)("get", `https://duckduckgo.com/ac/?${(0, util_1.queryString)(queryObject)}`, needleOptions);
    return (0, util_1.ensureJSON)(response.body);
  }
  search.autocomplete = autocomplete;
  return search;
}
var videos = {};
var hasRequiredVideos;
function requireVideos() {
  if (hasRequiredVideos) return videos;
  hasRequiredVideos = 1;
  (function(exports) {
    var __importDefault = videos && videos.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchVideos = exports.VideoLicense = exports.VideoDuration = exports.VideoDefinition = void 0;
    const html_entities_1 = /* @__PURE__ */ requireCommonjs();
    const needle_1 = __importDefault(requireNeedle());
    const util_1 = requireUtil();
    var VideoDefinition;
    (function(VideoDefinition2) {
      VideoDefinition2["ANY"] = "";
      VideoDefinition2["HIGH"] = "high";
      VideoDefinition2["STANDARD"] = "standard";
    })(VideoDefinition = exports.VideoDefinition || (exports.VideoDefinition = {}));
    var VideoDuration;
    (function(VideoDuration2) {
      VideoDuration2["ANY"] = "";
      VideoDuration2["SHORT"] = "short";
      VideoDuration2["MEDIUM"] = "medium";
      VideoDuration2["LONG"] = "long";
    })(VideoDuration = exports.VideoDuration || (exports.VideoDuration = {}));
    var VideoLicense;
    (function(VideoLicense2) {
      VideoLicense2["ANY"] = "";
      VideoLicense2["CREATIVE_COMMONS"] = "creativeCommon";
      VideoLicense2["YOUTUBE"] = "youtube";
    })(VideoLicense = exports.VideoLicense || (exports.VideoLicense = {}));
    const defaultOptions = {
      safeSearch: util_1.SafeSearchType.OFF,
      locale: "en-us",
      offset: 0
    };
    async function searchVideos(query, options, needleOptions) {
      if (!query)
        throw new Error("Query cannot be empty!");
      if (!options)
        options = defaultOptions;
      else
        options = sanityCheck(options);
      let vqd = options.vqd;
      if (!vqd)
        vqd = await (0, util_1.getVQD)(query, "web", needleOptions);
      const filters = [
        options.time && options.time !== "a" ? `publishedAfter:${options.time}` : "",
        options.definition ? `videoDefinition:${options.definition}` : "",
        options.duration ? `videoDuration:${options.duration}` : "",
        options.license ? `videoLicense:${options.license}` : ""
      ];
      const queryObject = {
        l: options.locale,
        o: "json",
        q: query,
        vqd,
        p: options.safeSearch === 0 ? "1" : String(options.safeSearch),
        f: filters.toString(),
        s: String(options.offset || 0)
      };
      const response = await (0, needle_1.default)("get", `https://duckduckgo.com/v.js?${(0, util_1.queryString)(queryObject)}`, needleOptions || { headers: util_1.COMMON_HEADERS });
      if (response.statusCode === 403)
        throw new Error("A server error occurred!");
      const videosResult = (0, util_1.ensureJSON)(response.body);
      return {
        noResults: !videosResult.results.length,
        vqd,
        results: videosResult.results.map((video) => ({
          url: video.content,
          title: (0, html_entities_1.decode)(video.title),
          description: (0, html_entities_1.decode)(video.description),
          image: video.images.large || video.images.medium || video.images.small || video.images.motion,
          duration: video.duration,
          publishedOn: video.publisher,
          published: video.published,
          publisher: video.uploader,
          viewCount: video.statistics.viewCount || void 0
        }))
      };
    }
    exports.searchVideos = searchVideos;
    function sanityCheck(options) {
      options = Object.assign({}, defaultOptions, options);
      if (!(options.safeSearch in util_1.SafeSearchType))
        throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
      if (typeof options.safeSearch === "string")
        options.safeSearch = util_1.SafeSearchType[options.safeSearch];
      if (typeof options.offset !== "number")
        throw new TypeError(`Search offset is not a number!`);
      if (options.offset < 0)
        throw new RangeError("Search offset cannot be below zero!");
      if (!options.locale || typeof options.locale !== "string")
        throw new TypeError("Search locale must be a string!");
      if (options.time && !Object.values(util_1.SearchTimeType).includes(options.time))
        throw new TypeError(`${options.time} is an invalid time filter!`);
      if (options.definition && !Object.values(VideoDefinition).includes(options.definition))
        throw new TypeError(`${options.definition} is an invalid video definition!`);
      if (options.duration && !Object.values(VideoDuration).includes(options.duration))
        throw new TypeError(`${options.duration} is an invalid video duration!`);
      if (options.license && !Object.values(VideoLicense).includes(options.license))
        throw new TypeError(`${options.license} is an invalid video license!`);
      if (options.vqd && !/\d-\d+-\d+/.test(options.vqd))
        throw new Error(`${options.vqd} is an invalid VQD!`);
      return options;
    }
  })(videos);
  return videos;
}
var currency = {};
var hasRequiredCurrency;
function requireCurrency() {
  if (hasRequiredCurrency) return currency;
  hasRequiredCurrency = 1;
  var __importDefault = currency && currency.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(currency, "__esModule", { value: true });
  currency.currency = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function currency$1(from, to, amount = 1, needleOptions) {
    if (!from)
      throw new Error("Currency `from` cannot be empty!");
    if (!to)
      throw new Error("Currency `to` cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/currency/${amount}/${from}/${to}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    if (result.headers.status !== "0")
      throw new Error(result.headers.description);
    return result;
  }
  currency.currency = currency$1;
  return currency;
}
var audio = {};
var hasRequiredAudio;
function requireAudio() {
  if (hasRequiredAudio) return audio;
  hasRequiredAudio = 1;
  var __importDefault = audio && audio.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(audio, "__esModule", { value: true });
  audio.dictionaryAudio = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function dictionaryAudio(word, needleOptions) {
    if (!word)
      throw new Error("Word cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/dictionary/audio/${word}`, needleOptions);
    if (response.body.toString() === "ddg_spice_dictionary_audio();\n")
      return [];
    return response.body;
  }
  audio.dictionaryAudio = dictionaryAudio;
  return audio;
}
var definition = {};
var hasRequiredDefinition;
function requireDefinition() {
  if (hasRequiredDefinition) return definition;
  hasRequiredDefinition = 1;
  var __importDefault = definition && definition.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(definition, "__esModule", { value: true });
  definition.dictionaryDefinition = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function dictionaryDefinition(word, needleOptions) {
    if (!word)
      throw new Error("Word cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/dictionary/definition/${word}`, needleOptions);
    if (response.body.toString() === "ddg_spice_dictionary_definition();\n")
      return [];
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
  }
  definition.dictionaryDefinition = dictionaryDefinition;
  return definition;
}
var hyphenation = {};
var hasRequiredHyphenation;
function requireHyphenation() {
  if (hasRequiredHyphenation) return hyphenation;
  hasRequiredHyphenation = 1;
  var __importDefault = hyphenation && hyphenation.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(hyphenation, "__esModule", { value: true });
  hyphenation.dictionaryHyphenation = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function dictionaryHyphenation(word, needleOptions) {
    if (!word)
      throw new Error("Word cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/dictionary/hyphenation/${word}`, needleOptions);
    if (response.body.toString() === "ddg_spice_dictionary_hyphenation();\n")
      return [];
    return response.body;
  }
  hyphenation.dictionaryHyphenation = dictionaryHyphenation;
  return hyphenation;
}
var pronunciation = {};
var hasRequiredPronunciation;
function requirePronunciation() {
  if (hasRequiredPronunciation) return pronunciation;
  hasRequiredPronunciation = 1;
  var __importDefault = pronunciation && pronunciation.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(pronunciation, "__esModule", { value: true });
  pronunciation.dictionaryPronunciation = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function dictionaryPronunciation(word, needleOptions) {
    if (!word)
      throw new Error("Word cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/dictionary/pronunciation/${word}`, needleOptions);
    if (response.body.toString() === "ddg_spice_dictionary_pronunciation();\n")
      return [];
    return response.body;
  }
  pronunciation.dictionaryPronunciation = dictionaryPronunciation;
  return pronunciation;
}
var dns = {};
var hasRequiredDns;
function requireDns() {
  if (hasRequiredDns) return dns;
  hasRequiredDns = 1;
  (function(exports) {
    var __importDefault = dns && dns.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dns = exports.DNSRecordType = void 0;
    const needle_1 = __importDefault(requireNeedle());
    const util_1 = requireUtil();
    var DNSRecordType;
    (function(DNSRecordType2) {
      DNSRecordType2["ANY"] = "any";
      DNSRecordType2["A"] = "a";
      DNSRecordType2["AAAA"] = "aaaa";
      DNSRecordType2["AFSDB"] = "afsdb";
      DNSRecordType2["APL"] = "apl";
      DNSRecordType2["CAA"] = "caa";
      DNSRecordType2["CERT"] = "cert";
      DNSRecordType2["CNAME"] = "cname";
      DNSRecordType2["DHCID"] = "dhcid";
      DNSRecordType2["DLV"] = "dlv";
      DNSRecordType2["DNAME"] = "dname";
      DNSRecordType2["DNSKEY"] = "dnskey";
      DNSRecordType2["DS"] = "ds";
      DNSRecordType2["HIP"] = "hip";
      DNSRecordType2["IPSECKEY"] = "ipseckey";
      DNSRecordType2["KEY"] = "key";
      DNSRecordType2["KX"] = "kx";
      DNSRecordType2["LOC"] = "loc";
      DNSRecordType2["MX"] = "mx";
      DNSRecordType2["NS"] = "ns";
      DNSRecordType2["NSEC"] = "nsec";
      DNSRecordType2["NSEC3"] = "nsec3";
      DNSRecordType2["NSEC3PARAM"] = "nsec3param";
      DNSRecordType2["RRSIG"] = "rrsig";
      DNSRecordType2["RP"] = "rp";
      DNSRecordType2["SIG"] = "sig";
      DNSRecordType2["SOA"] = "soa";
      DNSRecordType2["SPF"] = "spf";
      DNSRecordType2["SRV"] = "srv";
      DNSRecordType2["SSHFP"] = "sshfp";
      DNSRecordType2["TA"] = "ta";
      DNSRecordType2["TKEY"] = "tkey";
      DNSRecordType2["TLSA"] = "tlsa";
      DNSRecordType2["TSIG"] = "tsig";
      DNSRecordType2["TX"] = "tx";
      DNSRecordType2["TXT"] = "txt";
    })(DNSRecordType = exports.DNSRecordType || (exports.DNSRecordType = {}));
    async function dns$1(domain, recordType = DNSRecordType.ANY, needleOptions) {
      if (!domain)
        throw new Error("Domain cannot be empty!");
      const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/dns/${recordType}/${domain}`, needleOptions);
      const result = (0, util_1.parseSpiceBody)(response.body);
      return result;
    }
    exports.dns = dns$1;
  })(dns);
  return dns;
}
var emojipedia = {};
var hasRequiredEmojipedia;
function requireEmojipedia() {
  if (hasRequiredEmojipedia) return emojipedia;
  hasRequiredEmojipedia = 1;
  var __importDefault = emojipedia && emojipedia.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(emojipedia, "__esModule", { value: true });
  emojipedia.emojipedia = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function emojipedia$1(emoji, needleOptions) {
    if (!emoji)
      throw new Error("Emoji cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/emojipedia/${emoji}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
  }
  emojipedia.emojipedia = emojipedia$1;
  return emojipedia;
}
var expandUrl = {};
var hasRequiredExpandUrl;
function requireExpandUrl() {
  if (hasRequiredExpandUrl) return expandUrl;
  hasRequiredExpandUrl = 1;
  var __importDefault = expandUrl && expandUrl.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(expandUrl, "__esModule", { value: true });
  expandUrl.expandUrl = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function expandUrl$1(url, needleOptions) {
    if (!url)
      throw new Error("URL cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/expand_url/${encodeURIComponent(url)}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
  }
  expandUrl.expandUrl = expandUrl$1;
  return expandUrl;
}
var forecast = {};
var hasRequiredForecast;
function requireForecast() {
  if (hasRequiredForecast) return forecast;
  hasRequiredForecast = 1;
  var __importDefault = forecast && forecast.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(forecast, "__esModule", { value: true });
  forecast.forecast = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function forecast$1(query, locale = "en", needleOptions) {
    if (!query)
      throw new Error("Query cannot be empty!");
    if (!locale)
      throw new Error("Locale cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/forecast/${encodeURIComponent(query)}/${locale}`, needleOptions);
    if (response.body.toString() === "ddg_spice_forecast();\n")
      return null;
    return (0, util_1.parseSpiceBody)(response.body, /ddg_spice_[\w]+\(\n?((?:.|\n)+)\n?\);?/);
  }
  forecast.forecast = forecast$1;
  return forecast;
}
var statista = {};
var hasRequiredStatista;
function requireStatista() {
  if (hasRequiredStatista) return statista;
  hasRequiredStatista = 1;
  var __importDefault = statista && statista.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(statista, "__esModule", { value: true });
  statista.statista = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function statista$1(query, needleOptions) {
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/statista/${encodeURIComponent(query)}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
  }
  statista.statista = statista$1;
  return statista;
}
var stocks = {};
var hasRequiredStocks;
function requireStocks() {
  if (hasRequiredStocks) return stocks;
  hasRequiredStocks = 1;
  var __importDefault = stocks && stocks.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(stocks, "__esModule", { value: true });
  stocks.stocks = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function stocks$1(symbol, needleOptions) {
    if (!symbol)
      throw new Error("Symbol cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/stocks/${symbol}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    if (result.Outcome !== "Success")
      throw new Error(`${result.Outcome}: ${result.Message}`);
    return result;
  }
  stocks.stocks = stocks$1;
  return stocks;
}
var thesaurus = {};
var hasRequiredThesaurus;
function requireThesaurus() {
  if (hasRequiredThesaurus) return thesaurus;
  hasRequiredThesaurus = 1;
  var __importDefault = thesaurus && thesaurus.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(thesaurus, "__esModule", { value: true });
  thesaurus.thesaurus = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function thesaurus$1(word, needleOptions) {
    if (!word)
      throw new Error("Word cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/thesaurus/${word}`, needleOptions);
    if (response.body.toString() === "ddg_spice_thesaurus();\n")
      return null;
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
  }
  thesaurus.thesaurus = thesaurus$1;
  return thesaurus;
}
var time = {};
var hasRequiredTime;
function requireTime() {
  if (hasRequiredTime) return time;
  hasRequiredTime = 1;
  var __importDefault = time && time.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(time, "__esModule", { value: true });
  time.time = void 0;
  const needle_1 = __importDefault(requireNeedle());
  const util_1 = requireUtil();
  async function time$1(query, needleOptions) {
    if (!query)
      throw new Error("Query cannot be empty!");
    const response = await (0, needle_1.default)("get", `${util_1.SPICE_BASE}/time/${query}`, needleOptions);
    return (0, util_1.parseSpiceBody)(response.body);
  }
  time.time = time$1;
  return time;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function(exports) {
    var __createBinding = lib && lib.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = lib && lib.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchTimeType = exports.SafeSearchType = exports.getVQD = void 0;
    __exportStar(requireImages(), exports);
    __exportStar(requireNews(), exports);
    __exportStar(requireSearch(), exports);
    __exportStar(requireVideos(), exports);
    __exportStar(requireCurrency(), exports);
    __exportStar(requireAudio(), exports);
    __exportStar(requireDefinition(), exports);
    __exportStar(requireHyphenation(), exports);
    __exportStar(requirePronunciation(), exports);
    __exportStar(requireDns(), exports);
    __exportStar(requireEmojipedia(), exports);
    __exportStar(requireExpandUrl(), exports);
    __exportStar(requireForecast(), exports);
    __exportStar(requireStatista(), exports);
    __exportStar(requireStocks(), exports);
    __exportStar(requireThesaurus(), exports);
    __exportStar(requireTime(), exports);
    var util_1 = requireUtil();
    Object.defineProperty(exports, "getVQD", { enumerable: true, get: function() {
      return util_1.getVQD;
    } });
    Object.defineProperty(exports, "SafeSearchType", { enumerable: true, get: function() {
      return util_1.SafeSearchType;
    } });
    Object.defineProperty(exports, "SearchTimeType", { enumerable: true, get: function() {
      return util_1.SearchTimeType;
    } });
  })(lib);
  return lib;
}
var libExports = requireLib();
export {
  libExports as l
};
