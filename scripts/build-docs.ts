#!/usr/bin/env npx tsx
/**
 * build-docs.ts — Build the /docs/ section from markdown files.
 *
 *   Reads markdown from docs/ directory, parses frontmatter,
 *   converts to HTML via `marked`, and outputs:
 *     - build/docs/index.html           (landing page with category grid)
 *     - build/docs/<slug>/index.html    (individual article pages)
 */

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/* ── Paths ────────────────────────────────────────────────── */

const ROOT = process.cwd();
const resolve = (...parts: string[]): string => path.join(ROOT, ...parts);

const DOCS_SRC = resolve("docs");
const DOCS_OUT = resolve("build", "docs");
const INDEX_TEMPLATE = resolve("templates", "docs-index.html");
const ARTICLE_TEMPLATE = resolve("templates", "docs-article.html");

/* ── Types ────────────────────────────────────────────────── */

interface DocFrontmatter {
    title: string;
    category: string;
    tags: string[];
    author: string;
    description: string;
    related_decisions: string[];
    related_radar: string[];
}

interface DocEntry {
    slug: string;
    frontmatter: DocFrontmatter;
    bodyMarkdown: string;
}

/* ── Category Icons (SVG) ─────────────────────────────────── */

const CATEGORY_ICONS: Record<string, string> = {
    "Application Architecture": '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 1h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm1 3v2h8V4H4zm0 4v2h5V8H4z"/></svg>',
    "Platform & Infrastructure": '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1H2V4zm0 3h12v2H2V7zm0 4h12v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1z"/></svg>',
    "Operations & Reliability": '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2.5a1.25 1.25 0 1 1 0 2.5A1.25 1.25 0 0 1 8 3.5zM6.5 7.5h3l-.5 5h-2l-.5-5z"/></svg>',
    "Security & Compliance": '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l6 2v4c0 3.5-2.5 6.5-6 7.5C4.5 13.5 2 10.5 2 7V3l6-2zm0 2.2L4 4.6v2.8c0 2.6 1.8 4.8 4 5.6 2.2-.8 4-3 4-5.6V4.6L8 3.2z"/></svg>',
    "Development Experience": '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M5.854 4.146a.5.5 0 0 0-.708.708L7.293 7H1.5a.5.5 0 0 0 0 1h5.793L5.146 10.146a.5.5 0 1 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3zM11 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 11 3z"/></svg>',
};

const DEFAULT_ICON = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 3v2h6V4H5zm0 4v1h6V8H5z"/></svg>';

/* ── Helpers ──────────────────────────────────────────────── */

const info = (msg: string): void => console.log(`\x1b[32m${msg}\x1b[0m`);

/** Minimal YAML-frontmatter parser — handles simple key: value pairs between --- fences */
function parseFrontmatter(content: string): { data: Record<string, string>; body: string } {
    const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) return { data: {}, body: content };

    const data: Record<string, string> = {};
    let currentKey = "";
    for (const line of m[1].split(/\r?\n/)) {
        // indented continuation line (part of a YAML list under previous key)
        if (/^\s+-\s+/.test(line) && currentKey) {
            const val = line.replace(/^\s+-\s+/, "").trim();
            const prev = data[currentKey] ?? "";
            data[currentKey] = prev ? `${prev},${val}` : val;
            continue;
        }
        const kv = line.match(/^(\w[\w_-]*):\s*(.*)/);
        if (kv) {
            currentKey = kv[1].trim();
            data[currentKey] = kv[2].trim().replace(/^["']|["']$/g, "");
        }
    }
    return { data, body: m[2] };
}

function parseCSV(val: string | undefined): string[] {
    if (!val) return [];
    return val.split(",").map((s) => s.trim()).filter(Boolean);
}

function toDocEntry(slug: string, raw: string): DocEntry {
    const { data, body } = parseFrontmatter(raw);
    return {
        slug,
        frontmatter: {
            title: data.title ?? slug,
            category: data.category ?? "General",
            tags: parseCSV(data.tags),
            author: data.author ?? "",
            description: data.description ?? "",
            related_decisions: parseCSV(data.related_decisions),
            related_radar: parseCSV(data.related_radar),
        },
        bodyMarkdown: body,
    };
}

function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ── Build ────────────────────────────────────────────────── */

info("\n══════════════════════════════════════════════");
info("  Building Technical Documentation");
info("══════════════════════════════════════════════\n");

if (!fs.existsSync(DOCS_SRC)) {
    console.error("No docs/ directory found — skipping docs build.");
    process.exit(0);
}

/* Read templates */
if (!fs.existsSync(INDEX_TEMPLATE) || !fs.existsSync(ARTICLE_TEMPLATE)) {
    console.error("Missing docs templates (docs-index.html / docs-article.html).");
    process.exit(1);
}

const indexTemplate = fs.readFileSync(INDEX_TEMPLATE, "utf8");
const articleTemplate = fs.readFileSync(ARTICLE_TEMPLATE, "utf8");

/* Parse all doc markdown files */
const mdFiles = fs.readdirSync(DOCS_SRC).filter((f) => f.endsWith(".md"));
const docs: DocEntry[] = mdFiles.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(DOCS_SRC, f), "utf8");
    return toDocEntry(slug, raw);
});

info(`Found ${docs.length} documentation article(s)`);

/* Ensure output directory */
fs.mkdirSync(DOCS_OUT, { recursive: true });

/* ── Build individual article pages ───────────────────────── */

for (const doc of docs) {
    const htmlContent = marked.parse(doc.bodyMarkdown, { async: false }) as string;

    /* Meta tags row */
    const metaTags = doc.frontmatter.tags
        .slice(0, 6)
        .map((t) => `<span class="doc-meta-tag">${escapeHtml(t)}</span>`)
        .join("\n            ");

    const authorEl = doc.frontmatter.author
        ? `<span class="doc-meta-author">${escapeHtml(doc.frontmatter.author)}</span>`
        : "";

    /* Related links */
    const relatedItems: string[] = [];

    for (const slug of doc.frontmatter.related_decisions) {
        relatedItems.push(
            `<a class="doc-related-item" href="/decisions/"><span class="doc-related-badge decision">Decision</span> ${escapeHtml(slug.replace(/-/g, " "))}</a>`
        );
    }
    for (const slug of doc.frontmatter.related_radar) {
        relatedItems.push(
            `<a class="doc-related-item" href="/radar/"><span class="doc-related-badge radar">Radar</span> ${escapeHtml(slug.replace(/-/g, " "))}</a>`
        );
    }

    // Add cross-links to other docs that are in the same category
    for (const other of docs) {
        if (other.slug === doc.slug) continue;
        if (other.frontmatter.category === doc.frontmatter.category) {
            relatedItems.push(
                `<a class="doc-related-item" href="/docs/${other.slug}/"><span class="doc-related-badge doc">Doc</span> ${escapeHtml(other.frontmatter.title)}</a>`
            );
        }
    }

    const relatedSection = relatedItems.length > 0
        ? `<div class="doc-related"><h3>Related</h3><div class="doc-related-grid">${relatedItems.join("\n")}</div></div>`
        : "";

    /* Assemble page */
    const page = articleTemplate
        .replace(/\{\{TITLE\}\}/g, escapeHtml(doc.frontmatter.title))
        .replace(/\{\{DESCRIPTION\}\}/g, escapeHtml(doc.frontmatter.description))
        .replace("{{META_TAGS}}", `${metaTags}\n            ${authorEl}`)
        .replace("{{CONTENT}}", htmlContent)
        .replace("{{RELATED_LINKS}}", relatedSection);

    /* Write to build/docs/<slug>/index.html */
    const outDir = path.join(DOCS_OUT, doc.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), page);

    info(`  → /docs/${doc.slug}/`);
}

/* ── Build index page ─────────────────────────────────────── */

/* Group by category */
const categories = new Map<string, DocEntry[]>();
for (const doc of docs) {
    const cat = doc.frontmatter.category;
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(doc);
}

/* Sort categories alphabetically, docs within each alphabetically */
const sortedCategories = [...categories.entries()].sort(([a], [b]) => a.localeCompare(b));

let indexContent = "";
for (const [category, catDocs] of sortedCategories) {
    const icon = CATEGORY_ICONS[category] ?? DEFAULT_ICON;
    const cards = catDocs
        .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
        .map((doc) => {
            const tags = doc.frontmatter.tags
                .slice(0, 4)
                .map((t) => `<span class="doc-tag">${escapeHtml(t)}</span>`)
                .join("");
            return `<a class="doc-card" href="/docs/${doc.slug}/">
                <h3>${escapeHtml(doc.frontmatter.title)}</h3>
                <p>${escapeHtml(doc.frontmatter.description)}</p>
                <div class="doc-tags">${tags}</div>
            </a>`;
        })
        .join("\n            ");

    indexContent += `
        <section class="docs-category">
            <h2 class="docs-category-title">${icon} ${escapeHtml(category)}</h2>
            <div class="docs-grid">
                ${cards}
            </div>
        </section>`;
}

const indexPage = indexTemplate.replace("{{DOCS_INDEX_CONTENT}}", indexContent);
fs.writeFileSync(path.join(DOCS_OUT, "index.html"), indexPage);

info(`\n✅ Docs build complete — ${docs.length} articles in ${sortedCategories.length} categories\n`);
