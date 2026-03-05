#!/usr/bin/env npx tsx
/**
 * postbuild.ts — Post-build processing:
 *   1. Injects <script src="/js/init.js" defer> into every HTML file
 *   2. Injects release-date <meta> tag per page type (radar vs TDR)
 *   3. Generates authors.json from markdown frontmatter
 *   4. Generates stats.json with edition change metrics
 */

import fs from "node:fs";
import path from "node:path";

/* ── Paths ────────────────────────────────────────────────── */

const ROOT = process.cwd();
const BUILD_DIR = path.join(ROOT, "build");
const RADAR_BUILD = path.join(BUILD_DIR, "radar");
const DECISIONS_BUILD = path.join(BUILD_DIR, "decisions");
const RADAR_DIR = path.join(ROOT, "radar");
const TDR_DIR = path.join(ROOT, "tdr");
const DOCS_DIR = path.join(ROOT, "docs");
const DOCS_BUILD = path.join(BUILD_DIR, "docs");
const SCRIPT_TAG = '<script src="/js/init.js" defer></script>';
const THEME_BOOTSTRAP_TAG = '<script id="gg-theme-bootstrap">(function(){var bgDark="#004a50";var bgLight="#f5f7fa";var theme="dark";try{var saved=localStorage.getItem("gg-theme");if(saved==="light"||saved==="dark"){theme=saved;}else if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches){theme="light";}}catch(e){}var root=document.documentElement;root.setAttribute("data-theme",theme);var bg=theme==="light"?bgLight:bgDark;root.style.setProperty("--background",bg);root.style.backgroundColor=bg;})();</script>';

/* ── Types ────────────────────────────────────────────────── */

interface Frontmatter {
    [key: string]: string;
}

interface RadarConfig {
    flags?: {
        new?: { color?: string };
        changed?: { color?: string };
        [key: string]: { color?: string } | undefined;
    };
    [key: string]: unknown;
}

interface StatsBucket {
    count: number;
    color: string;
    label: string;
    items: string[];
}

interface Stats {
    release: string;
    total: number;
    new: StatsBucket;
    changed: StatsBucket;
    stale: StatsBucket;
}

type EditionMap = Record<string, { ring: string; flag: string }>;

/* ── Helpers ──────────────────────────────────────────────── */

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

/** Recursively list files matching an extension (Node 18.17+ recursive readdir) */
function findFiles(dir: string, ext: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return (fs.readdirSync(dir, { recursive: true }) as string[])
        .filter((f) => f.endsWith(ext))
        .map((f) => path.join(dir, f));
}

/** Minimal YAML-frontmatter parser — key: value pairs between --- fences */
function parseFrontmatter(content: string): Frontmatter {
    const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) return {};
    const fm: Frontmatter = {};
    for (const line of m[1].split(/\r?\n/)) {
        const kv = line.match(/^(\w[\w-]*):\s*(.+)/);
        if (kv) fm[kv[1].trim()] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
    return fm;
}

/** Latest YYYY-MM-DD directory name under a given path */
function latestEdition(dir: string): string | null {
    if (!fs.existsSync(dir)) return null;
    const dirs = fs.readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
        .map((d) => d.name)
        .sort();
    return dirs.at(-1) ?? null;
}

function formatDate(yyyymmdd: string): string {
    const [y, m] = yyyymmdd.split("-");
    return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

/** Write JSON to build/radar/ and optionally mirror to build/decisions/ */
function writeJsonToBuilds(filename: string, data: unknown, alsoDecisions = false): void {
    if (fs.existsSync(RADAR_BUILD)) {
        fs.writeFileSync(path.join(RADAR_BUILD, filename), JSON.stringify(data, null, 2));
    }
    if (alsoDecisions && fs.existsSync(DECISIONS_BUILD)) {
        fs.writeFileSync(path.join(DECISIONS_BUILD, filename), JSON.stringify(data, null, 2));
    }
}

/* ── 1. Inject init.js + release-date meta ────────────────── */

const radarDate = latestEdition(RADAR_DIR);
const tdrDate = latestEdition(TDR_DIR);
const radarDateStr = radarDate ? formatDate(radarDate) : "";
const tdrDateStr = tdrDate ? formatDate(tdrDate) : "";

let patched = 0;
for (const file of findFiles(BUILD_DIR, ".html")) {
    let html = fs.readFileSync(file, "utf8");
    if (!html.includes("</body>")) continue;

    const relPath = path.relative(BUILD_DIR, file);
    const isTdr = relPath.startsWith(`decisions${path.sep}`) || relPath.startsWith("decisions/");
    const dateStr = isTdr ? tdrDateStr : radarDateStr;

    // Inject release-date meta (idempotent)
    if (dateStr && !html.includes('name="release-date"')) {
        html = html.replace("</head>", `<meta name="release-date" content="${dateStr}"/></head>`);
    }

    // Inject pre-paint theme bootstrap (idempotent)
    if (!html.includes('id="gg-theme-bootstrap"')) {
        html = html.replace("</head>", `${THEME_BOOTSTRAP_TAG}</head>`);
    }

    // Inject init.js (idempotent)
    if (!html.includes(SCRIPT_TAG)) {
        html = html.replace("</body>", `${SCRIPT_TAG}</body>`);
    }

    fs.writeFileSync(file, html);
    patched++;
}

console.log(`postbuild: injected init.js into ${patched} HTML file(s)`);
if (radarDateStr) console.log(`postbuild: radar release date → ${radarDateStr}`);
if (tdrDateStr) console.log(`postbuild: TDR release date   → ${tdrDateStr}`);

/* ── 2. Generate authors.json ─────────────────────────────── */

const authors: Record<string, string> = {};

for (const dir of [RADAR_DIR, TDR_DIR, DOCS_DIR]) {
    for (const mdFile of findFiles(dir, ".md")) {
        const fm = parseFrontmatter(fs.readFileSync(mdFile, "utf8"));
        if (fm.title && fm.author) {
            authors[path.basename(mdFile, ".md")] = fm.author;
        }
    }
}

writeJsonToBuilds("authors.json", authors, true);
console.log(`postbuild: generated authors.json (${Object.keys(authors).length} entries)`);

/* ── 3. Generate stats.json ───────────────────────────────── */

const STALE_THRESHOLD = 3;

function computeStats(contentDir: string, configPath: string): Stats | null {
    if (!fs.existsSync(contentDir) || !fs.existsSync(configPath)) return null;

    const config: RadarConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

    const editions = fs.readdirSync(contentDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
        .map((d) => d.name)
        .sort();

    if (editions.length === 0) return null;

    const latest = editions.at(-1)!;

    function parseEdition(name: string): EditionMap {
        const dir = path.join(contentDir, name);
        const items: EditionMap = {};
        for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
            const fm = parseFrontmatter(fs.readFileSync(path.join(dir, f), "utf8"));
            items[f.replace(/\.md$/, "")] = {
                ring: fm.ring ?? "",
                flag: (fm.flag ?? "default").toLowerCase(),
            };
        }
        return items;
    }

    const current = parseEdition(latest);

    const newItems: string[] = [];
    const changedItems: string[] = [];
    const defaultItems: string[] = [];

    for (const [slug, { flag }] of Object.entries(current)) {
        if (flag === "new") newItems.push(slug);
        else if (flag === "changed") changedItems.push(slug);
        else defaultItems.push(slug);
    }

    // Stale: 'default' items unchanged across the last N editions
    const staleItems: string[] = [];
    if (editions.length >= STALE_THRESHOLD) {
        const recent = editions.slice(-STALE_THRESHOLD).map(parseEdition);
        for (const slug of defaultItems) {
            const ring = current[slug].ring;
            if (recent.every((ed) => ed[slug]?.ring === ring)) {
                staleItems.push(slug);
            }
        }
    }

    return {
        release: latest,
        total: Object.keys(current).length,
        new: { count: newItems.length, color: config.flags?.new?.color ?? "#c9344f", label: "New", items: newItems },
        changed: { count: changedItems.length, color: config.flags?.changed?.color ?? "#006B72", label: "Changed", items: changedItems },
        stale: { count: staleItems.length, color: "#5c717e", label: "Stale", items: staleItems },
    };
}

const radarStats = computeStats(RADAR_DIR, path.join(ROOT, "config.json"));
const tdrStats = computeStats(TDR_DIR, path.join(ROOT, "config-tdr.json"));

if (radarStats && fs.existsSync(RADAR_BUILD)) {
    fs.writeFileSync(path.join(RADAR_BUILD, "stats.json"), JSON.stringify(radarStats, null, 2));
    console.log(`postbuild: generated radar/stats.json (${radarStats.total} radar items)`);
}

if (tdrStats && fs.existsSync(DECISIONS_BUILD)) {
    fs.writeFileSync(path.join(DECISIONS_BUILD, "stats.json"), JSON.stringify(tdrStats, null, 2));
    console.log(`postbuild: generated decisions/stats.json (${tdrStats.total} TDR items)`);
}

const docsStats = computeStats(DOCS_DIR, path.join(ROOT, "config-docs.json"));

if (docsStats && fs.existsSync(DOCS_BUILD)) {
    fs.writeFileSync(path.join(DOCS_BUILD, "stats.json"), JSON.stringify(docsStats, null, 2));
    console.log(`postbuild: generated docs/stats.json (${docsStats.total} doc items)`);
}

/* ── 4. Copy runtime config files into build/ ─────────────── */

for (const file of ["serve.json", "staticwebapp.config.json"]) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(BUILD_DIR, file));
        console.log(`postbuild: copied ${file} → build/`);
    }
}
