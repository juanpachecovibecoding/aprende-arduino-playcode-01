const localeLoaders = {
  "./locales/de.js": () => import("./locales/de.js"),
  "./locales/es.js": () => import("./locales/es.js"),
  "./locales/fr.js": () => import("./locales/fr.js"),
  "./locales/he.js": () => import("./locales/he.js"),
  "./locales/hi.js": () => import("./locales/hi.js"),
  "./locales/id.js": () => import("./locales/id.js"),
  "./locales/it.js": () => import("./locales/it.js"),
  "./locales/ja.js": () => import("./locales/ja.js"),
  "./locales/ko.js": () => import("./locales/ko.js"),
  "./locales/pt.js": () => import("./locales/pt.js"),
  "./locales/tr.js": () => import("./locales/tr.js"),
  "./locales/zh.js": () => import("./locales/zh.js"),
};

const preload = (fn) => fn();

const LANGUAGES = [
  { code: "en", name: "English", locale: "en_US" },
  { code: "es", name: "Español", locale: "es_ES" },
  { code: "pt", name: "Português", locale: "pt_BR" },
  { code: "fr", name: "Français", locale: "fr_FR" },
  { code: "de", name: "Deutsch", locale: "de_DE" },
  { code: "it", name: "Italiano", locale: "it_IT" },
  { code: "tr", name: "Türkçe", locale: "tr_TR" },
  { code: "id", name: "Bahasa Indonesia", short: "Indonesia", locale: "id_ID" },
  {
    code: "zh",
    name: "简体中文",
    short: "中文",
    tag: "zh-Hans",
    locale: "zh_CN",
  },
  { code: "ja", name: "日本語", locale: "ja_JP" },
  { code: "ko", name: "한국어", locale: "ko_KR" },
  { code: "hi", name: "हिन्दी", locale: "hi_IN" },
  { code: "he", name: "עברית", dir: "rtl", locale: "he_IL" },
];

const getLangTag = (code) =>
  LANGUAGES.find((l) => l.code === code)?.tag ?? code;
const getLangDir = (code) =>
  LANGUAGES.find((l) => l.code === code)?.dir ?? "ltr";
const STORAGE_KEY = "learn-arduino:lang";
const isSupportedLang = (code) => LANGUAGES.some((l) => l.code === code);

let dictionary = {};
let currentLang = "en";

function t(str, vars) {
  let out = dictionary[str] ?? str;
  if (vars) {
    out = out.replace(/\{(\w+)\}/g, (match, key) =>
      key in vars ? vars[key] : match,
    );
  }
  return out;
}

function applyLocale(code, dict) {
  currentLang = code;
  dictionary = dict ?? {};
}

function detectPathLang(pathname) {
  const code = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1];
  return code && code !== "en" && isSupportedLang(code) ? code : "en";
}

function buildLangUrl(code) {
  return (code === "en" ? "/" : `/${code}/`) + location.search + location.hash;
}

function getSavedLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isSupportedLang(saved) ? saved : null;
  } catch {
    return null;
  }
}

function getBrowserLang() {
  for (const entry of navigator.languages ?? [navigator.language]) {
    const code = String(entry).slice(0, 2).toLowerCase().replace(/^iw$/, "he");
    if (isSupportedLang(code)) return code;
  }
  return null;
}

async function initLocale() {
  const lang = detectPathLang(location.pathname);
  if (lang === "en" && location.pathname === "/") {
    const preferred = getSavedLang() ?? getBrowserLang();
    if (preferred && preferred !== "en") {
      location.replace(buildLangUrl(preferred));
      return false;
    }
  }
  if (lang !== "en") {
    try {
      const loader = localeLoaders[`./locales/${lang}.js`];
      const mod = await loader();
      applyLocale(lang, mod.default);
    } catch {
      applyLocale("en");
    }
  }
  document.documentElement.lang = getLangTag(currentLang);
  document.documentElement.dir = getLangDir(currentLang);
  return true;
}

function setLang(code) {
  if (isSupportedLang(code)) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
    if (code !== currentLang) {
      location.assign(buildLangUrl(code));
    }
  }
}

const TRANSLATABLE_ATTRS = ["aria-label", "title", "alt", "placeholder"];

function translateDOM(root) {
  if (currentLang === "en") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const trimmed = node.nodeValue.trim();
    if (trimmed && dictionary[trimmed]) {
      node.nodeValue = node.nodeValue.replace(trimmed, dictionary[trimmed]);
    }
  }
  for (const el of root.querySelectorAll(
    TRANSLATABLE_ATTRS.map((a) => `[${a}]`).join(","),
  )) {
    for (const attr of TRANSLATABLE_ATTRS) {
      const val = el.getAttribute(attr);
      if (val && dictionary[val]) {
        el.setAttribute(attr, dictionary[val]);
      }
    }
  }
}

const SKIP_KEYS = new Set([
  "id",
  "thumb",
  "sim",
  "anchor",
  "icon",
  "side",
  "approach",
  "key",
  "part",
  "value",
  "type",
  "color",
  "tint",
  "via",
]);

function translateData(val, tr = t, prop = "") {
  if (typeof val === "string") {
    return prop === "code"
      ? val.replace(
          /\/\/(\s*)(.+)$/gm,
          (full, ws, comment) => `//${ws}${tr(comment.trim())}`,
        )
      : tr(val);
  }
  if (Array.isArray(val)) {
    return val.map((item) => translateData(item, tr, prop));
  }
  if (val && typeof val === "object") {
    const out = {};
    for (const [k, v] of Object.entries(val)) {
      if (
        SKIP_KEYS.has(k) ||
        (typeof v !== "string" && typeof v !== "object")
      ) {
        out[k] = v;
      } else if (k === "features") {
        out[k] = v.map(([icon, text]) => [icon, tr(text)]);
      } else if (k === "pinout") {
        out[k] = v.map(([name, role, desc, tint]) => [
          tr(name),
          tr(role),
          tr(desc),
          tint,
        ]);
      } else if (k === "code" && typeof v === "object") {
        out[k] = Object.fromEntries(
          Object.entries(v).map(([ck, cv]) => [
            ck,
            translateData(cv, tr, "code"),
          ]),
        );
      } else {
        out[k] = translateData(v, tr, k);
      }
    }
    return out;
  }
  return val;
}

initLocale().then((ok) => ok && import("./main.js"));

export {
  t as a,
  setLang as i,
  currentLang as n,
  translateDOM as o,
  translateData as r,
  preload as s,
  LANGUAGES as t,
};
