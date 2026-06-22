import require$$1$2 from "http";
import require$$2 from "https";
import require$$1$1 from "url";
import require$$0$2 from "querystring";
import require$$0 from "fs";
import require$$0$3 from "stream";
import require$$0$4 from "util";
import require$$0$1 from "path";
import require$$1 from "crypto";
import { r as requireSax } from "./sax.mjs";
import { r as requireLib } from "./iconv-lite.mjs";
var needle = { exports: {} };
var querystring = {};
var hasRequiredQuerystring;
function requireQuerystring() {
  if (hasRequiredQuerystring) return querystring;
  hasRequiredQuerystring = 1;
  var toString = Object.prototype.toString;
  function stringify(obj, prefix) {
    if (prefix && (obj === null || typeof obj == "undefined")) {
      return prefix + "=";
    } else if (toString.call(obj) == "[object Array]") {
      return stringifyArray(obj, prefix);
    } else if (toString.call(obj) == "[object Object]") {
      return stringifyObject(obj, prefix);
    } else if (toString.call(obj) == "[object Date]") {
      return obj.toISOString();
    } else if (prefix) {
      return prefix + "=" + encodeURIComponent(String(obj));
    } else if (String(obj).indexOf("=") !== -1) {
      return String(obj);
    } else {
      throw new TypeError("Cannot build a querystring out of: " + obj);
    }
  }
  function stringifyArray(arr, prefix) {
    var ret = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      if (prefix)
        ret.push(stringify(arr[i], prefix + "[]"));
      else
        ret.push(stringify(arr[i]));
    }
    return ret.join("&");
  }
  function stringifyObject(obj, prefix) {
    var ret = [];
    Object.keys(obj).forEach(function(key) {
      ret.push(stringify(obj[key], prefix ? prefix + "[" + encodeURIComponent(key) + "]" : encodeURIComponent(key)));
    });
    return ret.join("&");
  }
  querystring.build = stringify;
  return querystring;
}
var multipart = {};
var hasRequiredMultipart;
function requireMultipart() {
  if (hasRequiredMultipart) return multipart;
  hasRequiredMultipart = 1;
  var readFile = require$$0.readFile, basename = require$$0$1.basename;
  multipart.build = function(data, boundary, callback) {
    if (typeof data != "object" || typeof data.pipe == "function")
      return callback(new Error("Multipart builder expects data as key/val object."));
    var body = "", object = flatten(data), count = Object.keys(object).length;
    if (count === 0)
      return callback(new Error("Empty multipart body. Invalid data."));
    function done(err, section) {
      if (err) return callback(err);
      if (section) body += section;
      --count || callback(null, body + "--" + boundary + "--");
    }
    for (var key in object) {
      var value = object[key];
      if (value === null || typeof value == "undefined") {
        done();
      } else if (Buffer.isBuffer(value)) {
        var part = { buffer: value, content_type: "application/octet-stream" };
        generate_part(key, part, boundary, done);
      } else {
        var part = value.buffer || value.file || value.content_type ? value : { value };
        generate_part(key, part, boundary, done);
      }
    }
  };
  function generate_part(name, part, boundary, callback) {
    var return_part = "--" + boundary + "\r\n";
    return_part += 'Content-Disposition: form-data; name="' + name + '"';
    function append(data, filename2, force_binary) {
      if (data) {
        var binary = force_binary || part.content_type.indexOf("text") == -1;
        return_part += '; filename="' + encodeURIComponent(filename2) + '"\r\n';
        if (binary) return_part += "Content-Transfer-Encoding: binary\r\n";
        return_part += "Content-Type: " + part.content_type + "\r\n\r\n";
        return_part += binary ? data.toString("binary") : data.toString("utf8");
      }
      callback(null, return_part + "\r\n");
    }
    if ((part.file || part.buffer) && part.content_type) {
      var filename = part.filename ? part.filename : part.file ? basename(part.file) : name;
      if (part.buffer) return append(part.buffer, filename, true);
      readFile(part.file, function(err, data) {
        if (err) return callback(err);
        append(data, filename, true);
      });
    } else {
      if (!part.value)
        throw new Error("value missing for multipart!");
      if (typeof part.value == "object")
        return callback(new Error("Object received for " + name + ", expected string."));
      if (part.content_type) {
        return_part += "\r\n";
        return_part += "Content-Type: " + part.content_type;
      }
      return_part += "\r\n\r\n";
      return_part += Buffer.from(String(part.value), "utf8").toString("binary");
      append();
    }
  }
  function flatten(object, into, prefix) {
    into = into || {};
    for (var key in object) {
      var prefix_key = prefix ? prefix + "[" + key + "]" : key;
      var prop = object[key];
      if (prop && typeof prop === "object" && !(prop.buffer || prop.file || prop.content_type))
        flatten(prop, into, prefix_key);
      else
        into[prefix_key] = prop;
    }
    return into;
  }
  return multipart;
}
var auth;
var hasRequiredAuth;
function requireAuth() {
  if (hasRequiredAuth) return auth;
  hasRequiredAuth = 1;
  var createHash = require$$1.createHash;
  function get_header(header, credentials, opts) {
    var type = header.split(" ")[0], user = credentials[0], pass = credentials[1];
    if (type == "Digest") {
      return digest.generate(header, user, pass, opts.method, opts.path);
    } else if (type == "Basic") {
      return basic(user, pass);
    }
  }
  function md5(string) {
    return createHash("md5").update(string).digest("hex");
  }
  function basic(user, pass) {
    var str = typeof pass == "undefined" ? user : [user, pass].join(":");
    return "Basic " + Buffer.from(str).toString("base64");
  }
  var digest = {};
  digest.parse_header = function(header) {
    var challenge = {}, matches = header.match(/([a-z0-9_-]+)="?([a-z0-9_=\/\.@\s-\+:)()]+)"?/gi);
    for (var i = 0, l = matches.length; i < l; i++) {
      var parts = matches[i].split("="), key = parts.shift(), val = parts.join("=").replace(/^"/, "").replace(/"$/, "");
      challenge[key] = val;
    }
    return challenge;
  };
  digest.update_nc = function(nc) {
    var max = 99999999;
    nc++;
    if (nc > max)
      nc = 1;
    var padding = new Array(8).join("0") + "";
    nc = nc + "";
    return padding.substr(0, 8 - nc.length) + nc;
  };
  digest.generate = function(header, user, pass, method, path) {
    var nc = 1, cnonce = null, challenge = digest.parse_header(header);
    var ha1 = md5(user + ":" + challenge.realm + ":" + pass), ha2 = md5(method.toUpperCase() + ":" + path), resp = [ha1, challenge.nonce];
    if (typeof challenge.qop === "string") {
      cnonce = md5(Math.random().toString(36)).substr(0, 8);
      nc = digest.update_nc(nc);
      resp = resp.concat(nc, cnonce);
      resp = resp.concat(challenge.qop, ha2);
    } else {
      resp = resp.concat(ha2);
    }
    var params = {
      uri: path,
      realm: challenge.realm,
      nonce: challenge.nonce,
      username: user,
      response: md5(resp.join(":"))
    };
    if (challenge.qop) {
      params.qop = challenge.qop;
    }
    if (challenge.opaque) {
      params.opaque = challenge.opaque;
    }
    if (cnonce) {
      params.nc = nc;
      params.cnonce = cnonce;
    }
    header = [];
    for (var k in params)
      header.push(k + '="' + params[k] + '"');
    return "Digest " + header.join(", ");
  };
  auth = {
    header: get_header,
    basic,
    digest: digest.generate
  };
  return auth;
}
var cookies = {};
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies) return cookies;
  hasRequiredCookies = 1;
  var unescape = require$$0$2.unescape;
  var COOKIE_PAIR = /^([^=\s]+)\s*=\s*("?)\s*(.*)\s*\2\s*$/;
  var EXCLUDED_CHARS = /[\x00-\x1F\x7F\x3B\x3B\s\"\,\\"%]/g;
  var KEY_INDEX = 1;
  var VALUE_INDEX = 3;
  function cleanCookieString(str) {
    return str.trim().replace(/\x3B+$/, "");
  }
  function getFirstPair(str) {
    var index = str.indexOf(";");
    return index === -1 ? str : str.substr(0, index);
  }
  function encodeCookieComponent(str) {
    return str.toString().replace(EXCLUDED_CHARS, encodeURIComponent);
  }
  function parseSetCookieString(str) {
    str = cleanCookieString(str);
    str = getFirstPair(str);
    var res = COOKIE_PAIR.exec(str);
    if (!res || !res[VALUE_INDEX]) return null;
    return {
      name: unescape(res[KEY_INDEX]),
      value: unescape(res[VALUE_INDEX])
    };
  }
  function parseSetCookieHeader(header) {
    if (!header) return {};
    if (typeof header === "string" || header instanceof String) header = header.split(";");
    header = Array.isArray(header) ? header : [header];
    return header.reduce(function(res, str) {
      var cookie = parseSetCookieString(str);
      if (cookie) res[cookie.name] = cookie.value;
      return res;
    }, {});
  }
  function writeCookieString(obj) {
    return Object.keys(obj).reduce(function(str, name) {
      var encodedName = encodeCookieComponent(name);
      var encodedValue = encodeCookieComponent(obj[name]);
      str += (str ? "; " : "") + encodedName + "=" + encodedValue;
      return str;
    }, "");
  }
  cookies.read = parseSetCookieHeader;
  cookies.write = writeCookieString;
  return cookies;
}
var parsers = { exports: {} };
var hasRequiredParsers;
function requireParsers() {
  if (hasRequiredParsers) return parsers.exports;
  hasRequiredParsers = 1;
  var Transform = require$$0$3.Transform;
  var sax = requireSax();
  function parseXML(str, cb) {
    var obj, current, parser = sax.parser(true, { trim: true, lowercase: true });
    parser.onerror = parser.onend = done;
    function done(err) {
      parser.onerror = parser.onend = function() {
      };
      cb(err, obj);
    }
    function newElement(name, attributes) {
      return {
        name: name || "",
        value: "",
        attributes: attributes || {},
        children: []
      };
    }
    parser.oncdata = parser.ontext = function(t) {
      if (current) current.value += t;
    };
    parser.onopentag = function(node) {
      var element = newElement(node.name, node.attributes);
      if (current) {
        element.parent = current;
        current.children.push(element);
      } else {
        obj = element;
      }
      current = element;
    };
    parser.onclosetag = function() {
      if (typeof current.parent !== "undefined") {
        var just_closed = current;
        current = current.parent;
        delete just_closed.parent;
      }
    };
    parser.write(str).close();
  }
  function parserFactory(name, fn) {
    function parser() {
      var chunks = [], stream = new Transform({ objectMode: true });
      stream._transform = function(chunk, encoding, done) {
        chunks.push(chunk);
        done();
      };
      stream._flush = function(done) {
        var self = this, data = Buffer.concat(chunks);
        try {
          fn(data, function(err, result) {
            if (err) throw err;
            self.push(result);
          });
        } catch (err) {
          self.push(data);
        } finally {
          done();
        }
      };
      return stream;
    }
    return { fn: parser, name };
  }
  var parsers$1 = {};
  function buildParser(name, types, fn) {
    var parser = parserFactory(name, fn);
    types.forEach(function(type) {
      parsers$1[type] = parser;
    });
  }
  buildParser("json", [
    "application/json",
    "application/hal+json",
    "text/javascript",
    "application/vnd.api+json"
  ], function(buffer, cb) {
    var err, data;
    try {
      data = JSON.parse(buffer);
    } catch (e) {
      err = e;
    }
    cb(err, data);
  });
  buildParser("xml", [
    "text/xml",
    "application/xml",
    "application/rdf+xml",
    "application/rss+xml",
    "application/atom+xml"
  ], function(buffer, cb) {
    parseXML(buffer.toString(), function(err, obj) {
      cb(err, obj);
    });
  });
  parsers.exports = parsers$1;
  parsers.exports.use = buildParser;
  return parsers.exports;
}
var decoder;
var hasRequiredDecoder;
function requireDecoder() {
  if (hasRequiredDecoder) return decoder;
  hasRequiredDecoder = 1;
  var iconv, inherits = require$$0$4.inherits, stream = require$$0$3;
  var regex = /(?:charset|encoding)\s*=\s*['"]? *([\w\-]+)/i;
  inherits(StreamDecoder, stream.Transform);
  function StreamDecoder(charset) {
    if (!(this instanceof StreamDecoder))
      return new StreamDecoder(charset);
    stream.Transform.call(this, charset);
    this.charset = charset;
    this.parsed_chunk = false;
  }
  StreamDecoder.prototype._transform = function(chunk, encoding, done) {
    if (!this.parsed_chunk && (this.charset == "utf-8" || this.charset == "utf8")) {
      this.parsed_chunk = true;
      var matches = regex.exec(chunk.toString());
      if (matches) {
        var found = matches[1].toLowerCase().replace("utf8", "utf-8");
        if (iconv.encodingExists(found)) this.charset = found;
      }
    }
    if (this.charset == "utf-8" || !iconv.encodingExists(this.charset)) {
      this.push(chunk);
      return done();
    }
    var self = this;
    if (!this.decoder) {
      this.decoder = iconv.decodeStream(this.charset);
      this.decoder.on("data", function(decoded_chunk) {
        self.push(decoded_chunk);
      });
    }
    this.decoder.write(chunk);
    done();
  };
  decoder = function(charset) {
    try {
      if (!iconv) iconv = requireLib();
    } catch (e) {
    }
    if (iconv)
      return new StreamDecoder(charset);
    else
      return new stream.PassThrough();
  };
  return decoder;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var fs = require$$0, url = require$$1$1, stream = require$$0$3;
  function resolve_url(href, base) {
    if (url.URL)
      return new url.URL(href, base);
    return base ? url.resolve(base, href) : href;
  }
  function host_and_ports_match(url1, url2) {
    if (url1.indexOf("http") < 0) url1 = "http://" + url1;
    if (url2.indexOf("http") < 0) url2 = "http://" + url2;
    var a = url.parse(url1), b = url.parse(url2);
    return a.host == b.host && String(a.port || (a.protocol == "https:" ? 443 : 80)) == String(b.port || (b.protocol == "https:" ? 443 : 80));
  }
  function should_proxy_to(uri) {
    var no_proxy = get_env_var(["NO_PROXY"], true);
    if (!no_proxy) return true;
    var pattern, pattern_list = no_proxy.split(/[\s,]+/);
    for (var i in pattern_list) {
      pattern = pattern_list[i];
      if (pattern.trim().length == 0) continue;
      var regex = new RegExp(pattern.replace(/^\./, "*").replace(/[.]/g, "\\$&").replace(/\*/g, ".*"));
      if (uri.match(regex)) return false;
    }
    return true;
  }
  function get_env_var(keys, try_lower) {
    var val, i = -1, env = process.env;
    while (!val && i < keys.length - 1) {
      val = env[keys[++i]];
      if (!val && try_lower) {
        val = env[keys[i].toLowerCase()];
      }
    }
    return val;
  }
  function parse_content_type(header) {
    if (!header || header === "") return {};
    var found, charset = "utf8", arr = header.split(";");
    if (arr.length > 1 && (found = arr[1].match(/charset=(.+)/)))
      charset = found[1];
    return { type: arr[0], charset };
  }
  function is_stream(obj) {
    return typeof obj.pipe === "function";
  }
  function get_stream_length(stream2, given_length, cb) {
    if (given_length > 0)
      return cb(given_length);
    if (stream2.end !== void 0 && stream2.end !== Infinity && stream2.start !== void 0)
      return cb(stream2.end + 1 - (stream2.start || 0));
    fs.stat(stream2.path, function(err, stat) {
      cb(stat ? stat.size - (stream2.start || 0) : null);
    });
  }
  function pump_streams(streams, cb) {
    if (stream.pipeline)
      return stream.pipeline.apply(null, streams.concat(cb));
    var tmp = streams.shift();
    while (streams.length) {
      tmp = tmp.pipe(streams.shift());
      tmp.once("error", function(e) {
        cb && cb(e);
        cb = null;
      });
    }
  }
  utils = {
    resolve_url,
    get_env_var,
    host_and_ports_match,
    should_proxy_to,
    parse_content_type,
    is_stream,
    get_stream_length,
    pump_streams
  };
  return utils;
}
const version = "3.5.0";
const require$$13 = {
  version
};
var hasRequiredNeedle;
function requireNeedle() {
  if (hasRequiredNeedle) return needle.exports;
  hasRequiredNeedle = 1;
  (function(module) {
    var fs = require$$0, http = require$$1$2, https = require$$2, url = require$$1$1, stream = require$$0$3, debug = require$$0$4.debuglog("needle"), stringify = requireQuerystring().build, multipart2 = requireMultipart(), auth2 = requireAuth(), cookies2 = requireCookies(), parsers2 = requireParsers(), decoder2 = requireDecoder(), utils2 = requireUtils();
    var version2 = require$$13.version;
    var user_agent = "Needle/" + version2;
    user_agent += " (Node.js " + process.version + "; " + process.platform + " " + process.arch + ")";
    var tls_options = "pfx key passphrase cert ca ciphers rejectUnauthorized secureProtocol checkServerIdentity family";
    var close_by_default = !http.Agent || http.Agent.defaultMaxSockets != Infinity;
    var extend = Object.assign ? Object.assign : require$$0$4._extend;
    var redirect_codes = [301, 302, 303, 307, 308];
    function bind_opts(fn, options) {
      return fn.bind(null, options);
    }
    var decompressors = {};
    try {
      var zlib = require("zlib");
      var zlib_options = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      var br_options = {
        flush: zlib.BROTLI_OPERATION_FLUSH,
        finishFlush: zlib.BROTLI_OPERATION_FLUSH
      };
      decompressors["x-deflate"] = bind_opts(zlib.Inflate, zlib_options);
      decompressors["deflate"] = bind_opts(zlib.Inflate, zlib_options);
      decompressors["x-gzip"] = bind_opts(zlib.Gunzip, zlib_options);
      decompressors["gzip"] = bind_opts(zlib.Gunzip, zlib_options);
      if (typeof zlib.BrotliDecompress === "function") {
        decompressors["br"] = bind_opts(zlib.BrotliDecompress, br_options);
      }
    } catch (e) {
    }
    var defaults = {
      // data
      boundary: "--------------------NODENEEDLEHTTPCLIENT",
      encoding: "utf8",
      parse_response: "all",
      // same as true. valid options: 'json', 'xml' or false/null
      proxy: null,
      // agent & headers
      agent: null,
      headers: {},
      accept: "*/*",
      user_agent,
      // numbers
      open_timeout: 1e4,
      response_timeout: 0,
      read_timeout: 0,
      follow_max: 0,
      stream_length: -1,
      // abort signal
      signal: null,
      // booleans
      compressed: false,
      decode_response: true,
      parse_cookies: true,
      follow_set_cookies: false,
      follow_set_referer: false,
      follow_keep_method: false,
      follow_if_same_host: false,
      follow_if_same_protocol: false,
      follow_if_same_location: false,
      use_proxy_from_env_var: true
    };
    var aliased = {
      options: {
        decode: "decode_response",
        parse: "parse_response",
        timeout: "open_timeout",
        follow: "follow_max"
      },
      inverted: {}
    };
    Object.keys(aliased.options).map(function(k) {
      var value = aliased.options[k];
      aliased.inverted[value] = k;
    });
    function keys_by_type(type) {
      return Object.keys(defaults).map(function(el) {
        if (defaults[el] !== null && defaults[el].constructor == type)
          return el;
      }).filter(function(el) {
        return el;
      });
    }
    function Needle(method, uri, data, options, callback) {
      if (typeof uri !== "string")
        throw new TypeError("URL must be a string, not " + uri);
      this.method = method.toLowerCase();
      this.uri = uri;
      this.data = data;
      if (typeof options == "function") {
        this.callback = options;
        this.options = {};
      } else {
        this.callback = callback;
        this.options = options;
      }
    }
    Needle.prototype.setup = function(uri, options) {
      function get_option(key2, fallback) {
        if (typeof options[key2] != "undefined") return options[key2];
        return typeof options[aliased.inverted[key2]] != "undefined" ? options[aliased.inverted[key2]] : fallback;
      }
      function check_value(expected, key2) {
        var value = get_option(key2), type = typeof value;
        if (type != "undefined" && type != expected)
          throw new TypeError(type + " received for " + key2 + ", but expected a " + expected);
        return type == expected ? value : defaults[key2];
      }
      var config = {
        http_opts: {
          agent: get_option("agent", defaults.agent),
          localAddress: get_option("localAddress", void 0),
          lookup: get_option("lookup", void 0),
          signal: get_option("signal", defaults.signal)
        },
        // passed later to http.request() directly
        headers: {},
        output: options.output,
        proxy: get_option("proxy", defaults.proxy),
        parser: get_option("parse_response", defaults.parse_response),
        encoding: options.encoding || (options.multipart ? "binary" : defaults.encoding)
      };
      keys_by_type(Boolean).forEach(function(key2) {
        config[key2] = check_value("boolean", key2);
      });
      keys_by_type(Number).forEach(function(key2) {
        config[key2] = check_value("number", key2);
      });
      if (config.http_opts.signal && !(config.http_opts.signal instanceof AbortSignal))
        throw new TypeError(typeof config.http_opts.signal + " received for signal, but expected an AbortSignal");
      tls_options.split(" ").forEach(function(key2) {
        if (typeof options[key2] != "undefined") {
          if (config.http_opts.agent) {
            config.http_opts.agent.options[key2] = options[key2];
          } else {
            config.http_opts[key2] = options[key2];
          }
        }
      });
      for (var key in defaults.headers)
        config.headers[key] = defaults.headers[key];
      config.headers["accept"] = options.accept || defaults.accept;
      config.headers["user-agent"] = options.user_agent || defaults.user_agent;
      if (options.content_type)
        config.headers["content-type"] = options.content_type;
      if (options.connection || close_by_default)
        config.headers["connection"] = options.connection || "close";
      if ((options.compressed || defaults.compressed) && typeof zlib != "undefined")
        config.headers["accept-encoding"] = decompressors["br"] ? "gzip, deflate, br" : "gzip, deflate";
      if (options.cookies)
        config.headers["cookie"] = cookies2.write(options.cookies);
      if (uri.match(/[^\/]@/)) {
        var parts = (url.parse(uri).auth || "").split(":");
        options.username = parts[0];
        options.password = parts[1];
      }
      if (options.username) {
        if (options.auth && (options.auth == "auto" || options.auth == "digest")) {
          config.credentials = [options.username, options.password];
        } else {
          config.headers["authorization"] = auth2.basic(options.username, options.password);
        }
      }
      if (config.use_proxy_from_env_var) {
        var env_proxy = utils2.get_env_var(["HTTP_PROXY", "HTTPS_PROXY"], true);
        if (!config.proxy && env_proxy) config.proxy = env_proxy;
      }
      if (config.proxy) {
        if (!config.use_proxy_from_env_var || utils2.should_proxy_to(uri)) {
          if (config.proxy.indexOf("http") === -1)
            config.proxy = "http://" + config.proxy;
          if (config.proxy.indexOf("@") !== -1) {
            var proxy = (url.parse(config.proxy).auth || "").split(":");
            options.proxy_user = proxy[0];
            options.proxy_pass = proxy[1];
          }
          if (options.proxy_user)
            config.headers["proxy-authorization"] = auth2.basic(options.proxy_user, options.proxy_pass);
        } else {
          delete config.proxy;
        }
      }
      for (var h in options.headers)
        config.headers[h.toLowerCase()] = options.headers[h];
      config.uri_modifier = get_option("uri_modifier", null);
      return config;
    };
    Needle.prototype.start = function() {
      var out = new stream.PassThrough({ objectMode: false }), uri = this.uri, data = this.data, method = this.method, callback = typeof this.options == "function" ? this.options : this.callback, options = this.options || {};
      if (uri.indexOf("http") === -1)
        uri = uri.replace(/^(\/\/)?/, "http://");
      var self = this, body, waiting = false, config = this.setup(uri, options);
      var json = options.json || options.json !== false && config.headers["content-type"] == "application/json";
      if (data) {
        if (options.multipart) {
          var boundary = options.boundary || defaults.boundary;
          waiting = true;
          multipart2.build(data, boundary, function(err, parts) {
            if (err) throw err;
            config.headers["content-type"] = "multipart/form-data; boundary=" + boundary;
            next(parts);
          });
        } else if (utils2.is_stream(data)) {
          if (method == "get")
            throw new Error("Refusing to pipe() a stream via GET. Did you mean .post?");
          if (config.stream_length > 0 || config.stream_length === 0 && data.path) {
            waiting = true;
            utils2.get_stream_length(data, config.stream_length, function(length) {
              data.length = length;
              next(data);
            });
          } else {
            body = data;
          }
        } else if (Buffer.isBuffer(data)) {
          body = data;
        } else if (method == "get" && !json) {
          uri = uri.replace(/\?.*|$/, "?" + stringify(data));
        } else {
          body = typeof data === "string" ? data : json ? JSON.stringify(data) : stringify(data);
          body = Buffer.from(body, config.encoding);
        }
      }
      function next(body2) {
        if (body2) {
          if (body2.length) config.headers["content-length"] = body2.length;
          if (!config.headers["content-type"]) {
            config.headers["content-type"] = json ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";
          }
        }
        if (options.json && (!options.accept && !(options.headers || {}).accept))
          config.headers["accept"] = "application/json";
        self.send_request(1, method, uri, config, body2, out, callback);
      }
      if (!waiting) next(body);
      return out;
    };
    Needle.prototype.get_request_opts = function(method, uri, config) {
      var opts = config.http_opts, proxy = config.proxy, remote = proxy ? url.parse(proxy) : url.parse(uri);
      opts.protocol = remote.protocol;
      opts.host = remote.hostname;
      opts.port = remote.port || (remote.protocol == "https:" ? 443 : 80);
      opts.path = proxy ? uri : remote.pathname + (remote.search || "");
      opts.method = method;
      opts.headers = config.headers;
      if (!opts.headers["host"]) {
        var target = proxy ? url.parse(uri) : remote;
        opts.headers["host"] = target.hostname;
        if (target.port && [80, 443].indexOf(target.port) === -1) {
          opts.headers["host"] += ":" + target.port;
        }
      }
      return opts;
    };
    Needle.prototype.should_follow = function(location, config, original) {
      if (!location) return false;
      function matches(property) {
        var property = original[property];
        return location.indexOf(property) !== -1;
      }
      if (!config.follow_if_same_location && location === original)
        return false;
      if (config.follow_if_same_host && !matches("host"))
        return false;
      if (config.follow_if_same_protocol && !matches("protocol"))
        return false;
      return true;
    };
    Needle.prototype.send_request = function(count, method, uri, config, post_data, out, callback) {
      if (typeof config.uri_modifier === "function") {
        var modified_uri = config.uri_modifier(uri);
        debug("Modifying request URI", uri + " => " + modified_uri);
        uri = modified_uri;
      }
      var request, timer, returned = 0, self = this, request_opts = this.get_request_opts(method, uri, config), protocol = request_opts.protocol == "https:" ? https : http, signal = request_opts.signal;
      function unlisten_errors() {
        request.removeListener("error", had_error);
        request.once("error", function() {
        });
      }
      function done(err, resp) {
        if (returned++ > 0)
          return debug("Already finished, stopping here.");
        if (timer) clearTimeout(timer);
        out.done = true;
        unlisten_errors();
        if (callback)
          return callback(err, resp, resp ? resp.body : void 0);
        out.emit("done", err);
        var pipes = out._readableState.pipes || [];
        if (!pipes.forEach) pipes = [pipes];
        pipes.forEach(function(st) {
          st.emit("done", err);
        });
      }
      function had_error(err) {
        debug("Request error", err);
        out.emit("err", err);
        done(err || new Error("Unknown error when making request."));
      }
      function abort_handler() {
        out.emit("err", new Error("Aborted by signal."));
        request.destroy();
      }
      function set_timeout(type, milisecs) {
        if (timer) clearTimeout(timer);
        if (milisecs <= 0) return;
        timer = setTimeout(function() {
          out.emit("timeout", type);
          request.destroy();
          if (type == "read") done(new Error(type + " timeout"));
          signal && signal.removeEventListener("abort", abort_handler);
        }, milisecs);
      }
      debug("Making request #" + count, request_opts);
      request = protocol.request(request_opts, function(resp) {
        var headers = resp.headers;
        debug("Got response", resp.statusCode, headers);
        out.emit("response", resp);
        set_timeout("read", config.read_timeout);
        if (config.parse_cookies && (headers["set-cookie"] || config.previous_resp_cookies)) {
          resp.cookies = extend(config.previous_resp_cookies || {}, cookies2.read(headers["set-cookie"]));
          debug("Got cookies", resp.cookies);
        }
        if (redirect_codes.indexOf(resp.statusCode) !== -1 && self.should_follow(headers.location, config, uri)) {
          clearTimeout(timer);
          if (count <= config.follow_max) {
            out.emit("redirect", headers.location);
            if (!config.follow_keep_method) {
              method = "GET";
              post_data = null;
              delete config.headers["content-length"];
            }
            if (utils2.host_and_ports_match(headers.location, uri)) {
              if (config.follow_set_cookies) {
                var request_cookies = cookies2.read(config.headers["cookie"]);
                config.previous_resp_cookies = resp.cookies;
                if (Object.keys(request_cookies).length || Object.keys(resp.cookies || {}).length) {
                  config.headers["cookie"] = cookies2.write(extend(request_cookies, resp.cookies));
                }
              } else {
                delete config.headers["cookie"];
              }
            } else {
              delete config.headers["cookie"];
              delete config.headers["authorization"];
              delete config.headers["proxy-authorization"];
            }
            if (config.follow_set_referer)
              config.headers["referer"] = encodeURI(uri);
            config.headers["host"] = null;
            var redirect_url = utils2.resolve_url(headers.location, uri);
            debug("Redirecting to " + redirect_url.toString());
            unlisten_errors();
            return self.send_request(++count, method, redirect_url.toString(), config, post_data, out, callback);
          } else if (config.follow_max > 0) {
            return done(new Error("Max redirects reached. Possible loop in: " + headers.location));
          }
        }
        if (resp.statusCode == 401 && headers["www-authenticate"] && config.credentials) {
          if (!config.headers["authorization"]) {
            var auth_header = auth2.header(headers["www-authenticate"], config.credentials, request_opts);
            if (auth_header) {
              config.headers["authorization"] = auth_header;
              return self.send_request(count, method, uri, config, post_data, out, callback);
            }
          }
        }
        out.emit("header", resp.statusCode, headers);
        out.emit("headers", headers);
        var pipeline = [], mime = utils2.parse_content_type(headers["content-type"]), text_response = mime.type && (mime.type.indexOf("text/") != -1 || !!mime.type.match(/(\/|\+)(xml|json)$/));
        if (headers["content-encoding"] && decompressors[headers["content-encoding"]]) {
          var decompressor = decompressors[headers["content-encoding"]]();
          decompressor.on("error", had_error);
          pipeline.push(decompressor);
        }
        if (config.parser && parsers2[mime.type]) {
          var parser_name = config.parser.toString().toLowerCase();
          if (["xml", "json"].indexOf(parser_name) == -1 || parsers2[mime.type].name == parser_name) {
            out.parser = parsers2[mime.type].name;
            pipeline.push(parsers2[mime.type].fn());
            out._writableState.objectMode = true;
            out._readableState.objectMode = true;
          }
        } else if (text_response && config.decode_response && mime.charset) {
          pipeline.push(decoder2(mime.charset));
        }
        pipeline.push(out);
        utils2.pump_streams([resp].concat(pipeline), function(err) {
          if (err) debug(err);
          if (err && err.message == "write after end") request.destroy();
        });
        if (config.output && resp.statusCode == 200) {
          var file = fs.createWriteStream(config.output);
          file.on("error", had_error);
          out.on("end", function() {
            if (file.writable) file.end();
          });
          file.on("close", function() {
            delete out.file;
          });
          out.on("readable", function() {
            var chunk;
            while ((chunk = this.read()) !== null) {
              if (file.writable) file.write(chunk);
              if (resp.body) resp.body.push(chunk);
            }
          });
          out.file = file;
        }
        if (callback) {
          resp.raw = [];
          resp.body = [];
          resp.bytes = 0;
          var clean_pipe = new stream.PassThrough();
          clean_pipe.on("readable", function() {
            var chunk;
            while ((chunk = this.read()) != null) {
              resp.bytes += chunk.length;
              resp.raw.push(chunk);
            }
          });
          utils2.pump_streams([resp, clean_pipe], function(err) {
            if (err) debug(err);
          });
          if (!config.output || resp.statusCode != 200) {
            out.on("readable", function() {
              var chunk;
              while ((chunk = this.read()) !== null) {
                if (typeof chunk == "string") chunk = Buffer.from(chunk);
                resp.body.push(chunk);
              }
            });
          }
        }
        out.on("end", function() {
          if (resp.body) {
            resp.raw = Buffer.concat(resp.raw);
            if (resp.body[0] !== void 0 && !Buffer.isBuffer(resp.body[0])) {
              resp.body = resp.body[0];
              if (out.parser) resp.parser = out.parser;
            } else {
              resp.body = Buffer.concat(resp.body);
              if (text_response || out.parser) {
                resp.body = resp.body.toString();
              }
            }
          }
          if (out.file) {
            out.file.on("close", function() {
              done(null, resp);
            });
          } else {
            done(null, resp);
          }
        });
      });
      set_timeout("open", config.open_timeout);
      request.on("error", had_error);
      request.once("abort", function() {
        if (timer) clearTimeout(timer);
      });
      request.once("socket", function(socket) {
        if (socket.connecting) {
          socket.once("connect", function() {
            set_timeout("response", config.response_timeout);
          });
        } else {
          set_timeout("response", config.response_timeout);
        }
      });
      if (post_data) {
        if (utils2.is_stream(post_data)) {
          utils2.pump_streams([post_data, request], function(err) {
            if (err) debug(err);
          });
        } else {
          request.write(post_data, config.encoding);
          request.end();
        }
      } else {
        request.end();
      }
      if (signal) {
        if (signal.aborted === true) {
          abort_handler();
        } else {
          signal.addEventListener("abort", abort_handler, { once: true });
        }
      }
      out.abort = function() {
        request.destroy();
      };
      out.request = request;
      return out;
    };
    if (typeof Promise !== "undefined") {
      module.exports = function() {
        var verb, args = [].slice.call(arguments);
        if (args[0].match(/\.|\//))
          verb = args.length > 2 ? "post" : "get";
        else
          verb = args.shift();
        if (verb.match(/get|head/i) && args.length == 2)
          args.splice(1, 0, null);
        return new Promise(function(resolve, reject) {
          module.exports.request(verb, args[0], args[1], args[2], function(err, resp) {
            return err ? reject(err) : resolve(resp);
          });
        });
      };
    }
    module.exports.version = version2;
    module.exports.defaults = function(obj) {
      for (var key in obj) {
        var target_key = aliased.options[key] || key;
        if (defaults.hasOwnProperty(target_key) && typeof obj[key] != "undefined") {
          if (target_key != "parse_response" && target_key != "proxy" && target_key != "agent" && target_key != "signal") {
            var valid_type = defaults[target_key].constructor.name;
            if (obj[key].constructor.name != valid_type)
              throw new TypeError("Invalid type for " + key + ", should be " + valid_type);
          } else if (target_key === "signal" && obj[key] !== null && !(obj[key] instanceof AbortSignal)) {
            throw new TypeError("Invalid type for " + key + ", should be AbortSignal");
          }
          defaults[target_key] = obj[key];
        } else {
          throw new Error("Invalid property for defaults:" + target_key);
        }
      }
      return defaults;
    };
    "head get".split(" ").forEach(function(method) {
      module.exports[method] = function(uri, options, callback) {
        return new Needle(method, uri, options.query, options, callback).start();
      };
    });
    "post put patch delete".split(" ").forEach(function(method) {
      module.exports[method] = function(uri, data, options, callback) {
        return new Needle(method, uri, data, options, callback).start();
      };
    });
    module.exports.request = function(method, uri, data, opts, callback) {
      return new Needle(method, uri, data, opts, callback).start();
    };
  })(needle);
  return needle.exports;
}
export {
  requireNeedle as r
};
