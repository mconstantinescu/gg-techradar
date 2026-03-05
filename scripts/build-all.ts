#!/usr/bin/env npx tsx
/**
 * build-all.ts — Orchestrates a multi-build:
 *   1. Main Technology Radar       (config.json     + radar/) → build/radar/
 *   2. Technology Decision Records  (config-tdr.json + tdr/)  → build/decisions/
 *   3. Home page + shared assets                              → build/
 *
 * The AOE techradar CLI always reads CWD/radar/ and CWD/config.json,
 * so we temporarily swap files for the TDR build, then restore them.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const resolve = (...parts: string[]): string => path.join(ROOT, ...parts);

/* ── Helpers ──────────────────────────────────────────────── */

const info = (msg: string): void => console.log(`\x1b[32m${msg}\x1b[0m`);
const warn = (msg: string): void => console.log(`\x1b[33m${msg}\x1b[0m`);

function safeRename(from: string, to: string): void {
    if (fs.existsSync(from)) fs.renameSync(from, to);
}

function safeRemove(p: string): void {
    if (fs.existsSync(p)) fs.rmSync(p, { recursive: true });
}

/** Describes a file/directory to swap: original → backup, replacement → original */
interface FileSwap {
    original: string;
    backup: string;
    replacement: string;
}

function swapFiles(swaps: FileSwap[]): void {
    for (const { original, backup, replacement } of swaps) {
        safeRename(original, backup);
        safeRename(replacement, original);
    }
}

function restoreFiles(swaps: FileSwap[]): void {
    for (const { original, backup, replacement } of swaps) {
        safeRename(original, replacement);
        safeRename(backup, original);
    }
}

function buildRadar(): void {
    execSync("npx techradar build", { stdio: "inherit", cwd: ROOT });
}

/* ── Phase 1 — Main Radar ────────────────────────────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 1 — Building Technology Radar");
info("══════════════════════════════════════════════\n");

buildRadar();

/* Stash radar output under build-staging/radar/ */
safeRemove(resolve("build-staging"));
fs.mkdirSync(resolve("build-staging", "radar"), { recursive: true });
fs.cpSync(resolve("build"), resolve("build-staging", "radar"), { recursive: true });
safeRemove(resolve("build"));

/* ── Phase 2 — TDR build (swap, build, restore) ─────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 2 — Building Technology Decision Records");
info("══════════════════════════════════════════════\n");

let tdrBuildOk = false;

if (!fs.existsSync(resolve("tdr"))) {
    warn("No tdr/ directory found — skipping TDR build.");
} else {
    const swaps: FileSwap[] = [
        { original: resolve("radar"), backup: resolve("radar-main"), replacement: resolve("tdr") },
        { original: resolve("config.json"), backup: resolve("config-main.json"), replacement: resolve("config-tdr.json") },
    ];

    if (fs.existsSync(resolve("about-tdr.md"))) {
        swaps.push({
            original: resolve("about.md"),
            backup: resolve("about-main.md"),
            replacement: resolve("about-tdr.md"),
        });
    }

    swapFiles(swaps);

    try {
        buildRadar();
        tdrBuildOk = true;
    } catch (err) {
        console.error("TDR build failed:", (err as Error).message);
    } finally {
        restoreFiles(swaps);
    }
}

/* ── Phase 3 — Merge into final build/ ───────────────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 3 — Assembling final build");
info("══════════════════════════════════════════════\n");

/* Merge TDR build into staging as /decisions/ */
if (tdrBuildOk) {
    info("Merging TDR build → build/decisions/");
    fs.cpSync(resolve("build"), resolve("build-staging", "decisions"), { recursive: true });
    safeRemove(resolve("build"));
} else if (fs.existsSync(resolve("tdr"))) {
    warn("TDR build failed — continuing without TDR output.");
    safeRemove(resolve("build"));
}

/* Copy home page template → build/index.html */
info("Copying home page template…");
const homeTemplatePath = resolve("templates", "home.html");
if (fs.existsSync(homeTemplatePath)) {
    fs.copyFileSync(homeTemplatePath, resolve("build-staging", "index.html"));
} else {
    warn("No templates/home.html found — skipping home page.");
}

/* Copy About & Contacts page templates */
for (const page of ["about", "contacts"]) {
    const tpl = resolve("templates", `${page}.html`);
    if (fs.existsSync(tpl)) {
        const destDir = resolve("build-staging", page);
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(tpl, path.join(destDir, "index.html"));
        info(`Copied ${page} page → build/${page}/index.html`);
    }
}

/* Copy section-level about pages (radar + decisions) */
/* Note: docs about page is handled by build-docs.ts */
for (const [section, template] of [
    ["radar", "radar-about.html"],
    ["decisions", "decisions-about.html"],
] as const) {
    const tpl = resolve("templates", template);
    if (fs.existsSync(tpl)) {
        const destDir = resolve("build-staging", section, "about");
        fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(tpl, path.join(destDir, "index.html"));
        info(`Copied ${section} about → build/${section}/about/index.html`);
    }
}

/* Copy shared root assets from public/ so they're accessible at domain root */
info("Copying shared root assets…");
const publicDir = resolve("public");
const publicAssets = ["favicon.ico", "robots.txt"];
for (const asset of publicAssets) {
    const src = path.join(publicDir, asset);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, resolve("build-staging", asset));
    }
}
/* Copy public directories (images/, js/) */
for (const dir of ["images", "js"]) {
    const src = path.join(publicDir, dir);
    if (fs.existsSync(src)) {
        fs.cpSync(src, resolve("build-staging", dir), { recursive: true });
    }
}
/* Copy logo.svg from public root */
if (fs.existsSync(path.join(publicDir, "logo.svg"))) {
    fs.copyFileSync(path.join(publicDir, "logo.svg"), resolve("build-staging", "logo.svg"));
}

/* Copy 403.html and 404.html from radar build if they exist (for SWA error pages) */
for (const errorPage of ["403.html", "404.html"]) {
    const src = resolve("build-staging", "radar", errorPage);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, resolve("build-staging", errorPage));
    }
}
/* Copy 404/ directory from radar build */
const notFoundDir = resolve("build-staging", "radar", "404");
if (fs.existsSync(notFoundDir)) {
    fs.cpSync(notFoundDir, resolve("build-staging", "404"), { recursive: true });
}

/* Rename staging → build */
safeRemove(resolve("build"));
fs.renameSync(resolve("build-staging"), resolve("build"));

/* ── Phase 3.5 — Build Docs ─────────────────────────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 3.5 — Building Technical Documentation");
info("══════════════════════════════════════════════\n");

if (fs.existsSync(resolve("docs"))) {
    execSync("npx tsx scripts/build-docs.ts", { stdio: "inherit", cwd: ROOT });
} else {
    warn("No docs/ directory found — skipping docs build.");
}

/* ── Phase 4 — Postbuild ─────────────────────────────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 4 — Postbuild");
info("══════════════════════════════════════════════\n");

execSync("npx tsx scripts/postbuild.ts", { stdio: "inherit", cwd: ROOT });

info("\n✅ Full build complete.\n");
