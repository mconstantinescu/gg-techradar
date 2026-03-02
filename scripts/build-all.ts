#!/usr/bin/env npx tsx
/**
 * build-all.ts — Orchestrates a dual build:
 *   1. Main Technology Radar       (config.json     + radar/) → build/
 *   2. Technology Decision Records  (config-tdr.json + tdr/)  → build/tdr/
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

safeRemove(resolve("build-radar"));
fs.renameSync(resolve("build"), resolve("build-radar"));

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

/* ── Phase 3 — Merge TDR into main build ─────────────────── */

if (tdrBuildOk) {
    info("\nMerging TDR build into main build…");
    const tdrDest = resolve("build-radar", "tdr");
    safeRemove(tdrDest);
    fs.cpSync(resolve("build"), tdrDest, { recursive: true });
    safeRemove(resolve("build"));
    info("TDR pages merged into build/tdr/");
} else if (fs.existsSync(resolve("tdr"))) {
    warn("TDR build failed — continuing without TDR output.");
}

safeRemove(resolve("build"));
fs.renameSync(resolve("build-radar"), resolve("build"));

/* ── Phase 4 — Postbuild ─────────────────────────────────── */

info("\n══════════════════════════════════════════════");
info("  Phase 3 — Postbuild");
info("══════════════════════════════════════════════\n");

execSync("npx tsx scripts/postbuild.ts", { stdio: "inherit", cwd: ROOT });

info("\n✅ Full build complete.\n");
