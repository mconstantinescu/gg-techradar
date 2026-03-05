(function () {
  "use strict";

  /* ── Configuration ─────────────────────────────────────── */
  var COLLAPSED_WIDTH = "72px";
  var EXPANDED_WIDTH = "240px";
  var STORAGE_KEY = "gg-sidebar-collapsed";

  /* ── SVG icon library ──────────────────────────────────── */
  var icons = {
    radar:
      '<svg viewBox="-5 -5 32 32" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.71.38h-.64v2.61C4.22 3.32.38 7.36.38 12.29s4.19 9.33 9.33 9.33 8.97-3.84 9.3-8.69h2.61v-.64C21.62 5.72 16.28.38 9.71.38m0 19.95c-4.44 0-8.05-3.61-8.05-8.05s3.26-7.69 7.4-8.02v8.66h8.66c-.33 4.14-3.8 7.4-8.02 7.4Zm9.33-8.69h-8.69V1.69c5.34.32 9.63 4.61 9.95 9.96h-1.27Z" fill="currentColor"/></svg>',
    methods:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    tools:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    platforms:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" fill="none" stroke-width="2"/><line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    languages:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><polyline points="16 18 22 12 16 6" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="8 6 2 12 8 18" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    about:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    chevronDown:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronRight:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    collapse:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><polyline points="11 17 6 12 11 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="18 17 13 12 18 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    expand:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><polyline points="13 17 18 12 13 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="6 17 11 12 6 7" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    overview:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    github:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="currentColor"/></svg>',
    tag:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    author:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    adr:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    security:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    data:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" fill="none" stroke-width="2"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="currentColor" fill="none" stroke-width="2"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    architecture:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" fill="none" stroke-width="2"/><line x1="10" y1="6.5" x2="14" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6.5" y1="10" x2="6.5" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="17.5" y1="10" x2="17.5" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    tdr:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" fill="none" stroke-width="2"/></svg>',
    operations:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sun:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" fill="none" stroke-width="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    moon:
      '<svg viewBox="-4 -4 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  /* ── Segment-to-icon key mapping (radar) ────────────────── */
  var segmentIcons = {
    "methods-and-patterns": "methods",
    tools: "tools",
    "platforms-and-services": "platforms",
    "languages-and-frameworks": "languages",
  };

  /* ── TDR / Decision Records segment-to-icon key mapping ── */
  var tdrSegmentIcons = {
    "platform-and-infrastructure": "platforms",
    "application-architecture": "architecture",
    "data-and-analytics": "data",
    "security-and-compliance": "security",
    "development-experience": "tools",
    "operations-and-reliability": "operations",
  };

  /* ── Inject all CSS ────────────────────────────────────── */
  function injectStyles() {
    var css = [
      /* ── Sidebar container ─────────────────────────── */
      "#gg-sidebar {",
      "  position: fixed; top: 56px; right: 0; height: calc(100vh - 56px);",
      "  width: " + EXPANDED_WIDTH + ";",
      "  background: #006B72; color: #d0ece9;",
      "  display: flex; flex-direction: column;",
      "  z-index: 9999; transition: width .2s ease;",
      "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
      "  font-size: 13px;",
      "  border-left: 1px solid #005259;",
      "  box-shadow: -2px 0 8px rgba(0,0,0,.35);",
      "}",
      "#gg-sidebar.collapsed { width: " + COLLAPSED_WIDTH + "; }",

      /* ── Collapsed: hide labels & children, keep icons ── */
      "#gg-sidebar .nav-label,",
      "#gg-sidebar .nav-children,",
      "#gg-sidebar .sidebar-header-text { transition: opacity .15s; }",
      "#gg-sidebar.collapsed .nav-label,",
      "#gg-sidebar.collapsed .nav-children,",
      "#gg-sidebar.collapsed .sidebar-header-text,",
      "#gg-sidebar.collapsed .chevron-icon {",
      "  opacity: 0; pointer-events: none; width: 0;",
      "  overflow: hidden; position: absolute;",
      "}",

      /* ── Collapsed: center icons, prevent clipping ─── */
      "#gg-sidebar.collapsed .nav-item {",
      "  justify-content: center; padding-left: 0; padding-right: 0; gap: 0;",
      "}",
      "#gg-sidebar.collapsed .sidebar-nav { overflow: visible; }",

      /* ── Toggle button at top ──────────────────────── */
      "#gg-sidebar .sidebar-toggle {",
      "  display: flex; align-items: center; gap: 10px;",
      "  padding: 14px 18px; cursor: pointer;",
      "  background: #004a50; border: none; color: #7fbcb8;",
      "  border-bottom: 1px solid #005259; flex-shrink: 0;",
      "  min-height: 44px;",
      "}",
      "#gg-sidebar .sidebar-toggle:hover { color: #fff; }",
      "#gg-sidebar .sidebar-toggle svg { width: 20px; height: 20px; flex-shrink: 0; }",
      "#gg-sidebar .sidebar-header-text {",
      "  font-size: 11px; font-weight: 700; text-transform: uppercase;",
      "  letter-spacing: 1px; white-space: nowrap;",
      "}",

      /* ── Scrollable nav area ───────────────────────── */
      "#gg-sidebar .sidebar-nav {",
      "  flex: 1; overflow-y: auto; overflow-x: hidden;",
      "  padding: 6px 0;",
      "}",

      /* ── Nav item (1st-level row: icon + label) ────── */
      "#gg-sidebar .nav-item {",
      "  display: flex; align-items: center; gap: 10px;",
      "  padding: 10px 18px; cursor: pointer;",
      "  color: #b0ddd8; border: none; background: none;",
      "  width: 100%; text-align: left; font-size: 13px;",
      "  border-radius: 0; position: relative;",
      "  transition: color .12s, background .12s;",
      "  text-decoration: none;",
      "}",
      "#gg-sidebar .nav-item:hover { color: #fff; background: #005259; }",
      "#gg-sidebar .nav-item.active { color: #34C0A6; }",
      "#gg-sidebar .nav-item.active::before {",
      "  content: ''; position: absolute; right: 0; top: 6px; bottom: 6px;",
      "  width: 3px; border-radius: 2px; background: #34C0A6;",
      "}",
      "#gg-sidebar .nav-item svg.nav-icon {",
      "  width: 24px; height: 24px; flex-shrink: 0;",
      "}",
      "#gg-sidebar .nav-label {",
      "  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
      "  flex: 1;",
      "}",
      "#gg-sidebar .nav-item svg.chevron-icon {",
      "  width: 18px; height: 18px; flex-shrink: 0;",
      "  transition: transform .15s;",
      "}",
      "#gg-sidebar .nav-item.open svg.chevron-icon { transform: rotate(180deg); }",

      /* ── Tooltip on collapsed icons ────────────────── */
      "#gg-sidebar .nav-item[data-tooltip]:hover::after {",
      "  display: none;",
      "}",
      "#gg-sidebar.collapsed .nav-item[data-tooltip]:hover::after {",
      "  display: block; content: attr(data-tooltip);",
      "  position: absolute; right: 76px; top: 50%;",
      "  transform: translateY(-50%); background: #005259;",
      "  color: #fff; padding: 4px 10px; border-radius: 4px;",
      "  white-space: nowrap; font-size: 12px; pointer-events: none;",
      "  box-shadow: 0 2px 8px rgba(0,0,0,.35); z-index: 10;",
      "}",

      /* ── Children list (2nd-level) ─────────────────── */
      "#gg-sidebar .nav-children {",
      "  list-style: none; padding: 0; margin: 0;",
      "  overflow: hidden; max-height: 0;",
      "  transition: max-height .25s ease;",
      "}",
      "#gg-sidebar .nav-children.open { max-height: 600px; }",
      "#gg-sidebar .nav-children a {",
      "  display: flex; align-items: center; gap: 8px;",
      "  padding: 5px 18px 5px 44px; color: #b0ddd8;",
      "  text-decoration: none; font-size: 12px;",
      "  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;",
      "  transition: color .12s, background .12s;",
      "}",
      "#gg-sidebar .nav-children a:hover { background: #005259; color: #fff; }",
      "#gg-sidebar .nav-children a.current { color: #34C0A6; background: #005d63; }",
      "#gg-sidebar .nav-children a svg {",
      "  width: 18px; height: 18px; flex-shrink: 0;",
      "}",

      /* ── Separator ─────────────────────────────────── */
      "#gg-sidebar .nav-sep {",
      "  height: 1px; background: #005259; margin: 6px 10px;",
      "}",

      /* ── Push main content over ────────────────────── */
      "body.gg-sidebar-open #layout {",
      "  margin-right: " + EXPANDED_WIDTH + ";",
      "  transition: margin-right .2s ease;",
      "}",
      "body.gg-sidebar-collapsed #layout {",
      "  margin-right: " + COLLAPSED_WIDTH + ";",
      "  transition: margin-right .2s ease;",
      "}",

      /* ── Hide original top navigation ──────────────── */
      "body.gg-sidebar-open header nav,",
      "body.gg-sidebar-collapsed header nav { display: none !important; }",

      /* ── Responsive: hide sidebar on small screens ─── */
      "@media (max-width: 768px) {",
      "  #gg-sidebar { display: none; }",
      "  body.gg-sidebar-open #layout,",
      "  body.gg-sidebar-collapsed #layout { margin-right: 0; }",
      "  body.gg-sidebar-open header nav,",
      "  body.gg-sidebar-collapsed header nav { display: flex !important; }",
      "}",

      /* ── Article metadata panel (right-side aside) ─── */
      ".gg-meta-section {",
      "  padding: 16px 20px 12px; border-top: 1px solid rgba(0,0,0,.06);",
      "}",
      ".gg-meta-section:first-child { border-top: none; }",
      ".gg-meta-heading {",
      "  display: flex; align-items: center; gap: 6px;",
      "  font-size: 11px; font-weight: 700; text-transform: uppercase;",
      "  letter-spacing: .5px; color: #5c717e; margin: 0 0 10px;",
      "}",
      ".gg-meta-heading svg {",
      "  width: 14px; height: 14px; flex-shrink: 0;",
      "}",
      ".gg-meta-tags {",
      "  display: flex; flex-wrap: wrap; gap: 6px;",
      "}",
      ".gg-meta-tags a {",
      "  display: inline-flex; align-items: center; gap: 4px;",
      "  padding: 3px 10px; border-radius: 12px; font-size: 12px;",
      "  color: #006B72; background: rgba(52,192,166,.1);",
      "  border: 1px solid rgba(52,192,166,.25);",
      "  text-decoration: none; transition: all .15s;",
      "}",
      ".gg-meta-tags a:hover {",
      "  background: #34C0A6; color: #004a50; border-color: #34C0A6;",
      "}",
      ".gg-meta-author {",
      "  display: flex; align-items: center; gap: 8px;",
      "  font-size: 13px; color: #555;",
      "}",
      ".gg-meta-author svg {",
      "  width: 16px; height: 16px; flex-shrink: 0; color: #5c717e;",
      "}",

      /* ── Tags: move below title on detail pages ────── */
      "[class*='Tags_tags'] {",
      "  display: flex !important; flex-wrap: wrap; gap: 6px;",
      "  width: 100%; margin-top: 8px;",
      "  order: 99;",
      "}",
      "h1:has(+ [class*='Tags_tags']),",
      "[class*='ItemPage'] h1,",
      "[class*='_id__title'] {",
      "  display: flex; flex-wrap: wrap; align-items: baseline;",
      "}",
      /* Force the tags container onto its own line */
      "[class*='Tags_tags']::before {",
      "  content: ''; flex-basis: 100%; height: 0;",
      "}",

      /* ── Logo badges (version + date) ──────────────── */
      ".logo-title-group {",
      "  display: flex; flex-direction: column; justify-content: center;",
      "}",
      ".logo-badges {",
      "  display: flex; gap: 6px;",
      "  margin-top: 3px;",
      "}",
      ".logo-badge {",
      "  display: inline-block; font-size: 10px; font-weight: 500;",
      "  padding: 2px 8px; border-radius: 10px;",
      "  background: rgba(255,255,255,.08);",
      "  border: 1px solid rgba(255,255,255,.15);",
      "  color: rgba(255,255,255,.7); white-space: nowrap;",
      "  text-transform: uppercase; letter-spacing: .03em;",
      "  line-height: 1.4;",
      "}",

      /* ── Stats tiles bar ───────────────────────────── */
      ".gg-stats-heading {",
      "  font-size: 11px; font-weight: 600; text-transform: uppercase;",
      "  letter-spacing: .06em; opacity: .45; margin: 0;",
      "  padding: 14px 0 0; color: var(--foreground, #fff);",
      "  max-width: var(--max-width, 1200px); margin: 0 auto;",
      "}",
      ".gg-stats-bar {",
      "  display: flex; flex-wrap: wrap; gap: 10px;",
      "  padding: 6px 0 8px;",
      "  max-width: var(--max-width, 1200px); margin: 0 auto;",
      "}",
      ".gg-stats-tile {",
      "  display: flex; flex-direction: column; align-items: center;",
      "  padding: 10px 18px; border-radius: 10px;",
      "  background: rgba(255,255,255,.06);",
      "  border: 1px solid rgba(255,255,255,.12);",
      "  min-width: 90px; text-decoration: none;",
      "  transition: background .15s, border-color .15s, transform .1s;",
      "  cursor: pointer; color: inherit;",
      "}",
      ".gg-stats-tile:hover {",
      "  background: rgba(255,255,255,.12);",
      "  border-color: rgba(255,255,255,.25);",
      "  transform: translateY(-1px);",
      "}",
      ".gg-stats-tile.active {",
      "  background: rgba(255,255,255,.14);",
      "  border-color: rgba(255,255,255,.35);",
      "  box-shadow: 0 0 0 2px rgba(255,255,255,.15);",
      "}",
      ".gg-stats-count {",
      "  font-size: 22px; font-weight: 700; line-height: 1.2;",
      "  color: var(--foreground, #fff);",
      "}",
      ".gg-stats-label {",
      "  font-size: 11px; font-weight: 500; text-transform: uppercase;",
      "  letter-spacing: .04em; opacity: .7; margin-top: 2px;",
      "  color: var(--foreground, #fff);",
      "}",
      ".gg-stats-sep {",
      "  width: 1px; background: rgba(255,255,255,.12);",
      "  align-self: stretch; margin: 4px 2px;",
      "}",
      ".gg-stats-dot {",
      "  display: inline-block; width: 8px; height: 8px;",
      "  border-radius: 50%; margin-right: 4px; vertical-align: middle;",
      "}",
      ".gg-stats-shape {",
      "  display: inline-block; width: 10px; height: 10px; flex-shrink: 0;",
      "  margin-right: 4px; vertical-align: middle;",
      "}",
      ".gg-stats-shape.circle {",
      "  border-radius: 50%; background: currentColor;",
      "}",
      ".gg-stats-shape.triangle {",
      "  width: 0; height: 0;",
      "  border-left: 5px solid transparent;",
      "  border-right: 5px solid transparent;",
      "  border-bottom: 9px solid currentColor;",
      "}",
      ".gg-stats-shape.diamond {",
      "  width: 8px; height: 8px; background: currentColor;",
      "  transform: rotate(45deg);",
      "}",

      /* ── Legend bar (overview pages) ────────────────── */
      ".gg-legend {",
      "  display: flex; flex-wrap: wrap; gap: 18px; align-items: center;",
      "  padding: 10px 16px; margin: 12px 0 4px; border-radius: 10px;",
      "  background: rgba(255,255,255,.04);",
      "  border: 1px solid rgba(255,255,255,.08);",
      "  font-size: 12px; color: rgba(255,255,255,.7);",
      "}",
      ".gg-legend-title {",
      "  font-weight: 600; text-transform: uppercase; letter-spacing: .05em;",
      "  font-size: 10px; opacity: .5; margin-right: 4px;",
      "}",
      ".gg-legend-item {",
      "  display: inline-flex; align-items: center; gap: 6px;",
      "  cursor: pointer; padding: 3px 8px; border-radius: 6px;",
      "  transition: background .15s;",
      "}",
      ".gg-legend-item:hover { background: rgba(255,255,255,.08); }",
      ".gg-legend-item.active {",
      "  background: rgba(255,255,255,.12);",
      "  outline: 1px solid rgba(255,255,255,.2);",
      "}",
      ".gg-legend-shape {",
      "  display: inline-block; width: 12px; height: 12px; flex-shrink: 0;",
      "}",
      ".gg-legend-shape.circle {",
      "  border-radius: 50%; background: currentColor;",
      "}",
      ".gg-legend-shape.triangle {",
      "  width: 0; height: 0;",
      "  border-left: 6px solid transparent;",
      "  border-right: 6px solid transparent;",
      "  border-bottom: 11px solid currentColor;",
      "}",
      ".gg-legend-shape.diamond {",
      "  width: 10px; height: 10px; background: currentColor;",
      "  transform: rotate(45deg);",
      "}",

      /* ── Theme toggle button ───────────────────────── */
      ".gg-theme-toggle {",
      "  display: flex; align-items: center; gap: 10px;",
      "  padding: 10px 18px; cursor: pointer;",
      "  color: #7fbcb8; background: none; border: none;",
      "  border-top: 1px solid #005259; width: 100%;",
      "  font-size: 12px; font-family: inherit;",
      "  transition: color .12s, background .12s;",
      "  flex-shrink: 0;",
      "}",
      ".gg-theme-toggle:hover { color: #fff; background: #005259; }",
      ".gg-theme-toggle svg { width: 20px; height: 20px; flex-shrink: 0; }",
      ".gg-theme-toggle .theme-label {",
      "  white-space: nowrap; transition: opacity .15s;",
      "}",
      "#gg-sidebar.collapsed .gg-theme-toggle {",
      "  justify-content: center; padding-left: 0; padding-right: 0;",
      "}",
      "#gg-sidebar.collapsed .gg-theme-toggle .theme-label {",
      "  opacity: 0; width: 0; overflow: hidden; position: absolute;",
      "}",

      /* ── Hero intro section (home pages) ───────────── */
      ".gg-hero {",
      "  display: flex; gap: 24px; align-items: flex-start;",
      "  max-width: var(--max-width, 1200px); margin: 0 auto;",
      "  padding: 14px 0 4px;",
      "}",
      ".gg-hero-text {",
      "  flex: 1 1 0; min-width: 200px;",
      "  font-size: 14px; line-height: 1.65; opacity: .75;",
      "  color: var(--foreground, #fff);",
      "}",
      ".gg-hero-text strong { opacity: 1; font-weight: 600; }",
      ".gg-hero-right {",
      "  flex: 0 0 auto; display: flex; flex-direction: column;",
      "  align-items: flex-end; gap: 4px;",
      "}",
      "@media (max-width: 640px) {",
      "  .gg-hero { flex-direction: column; }",
      "  .gg-hero-right { align-items: flex-start; }",
      "}",

      /* ── Dark Theme Root Overrides ───────────────────── */
      ":root {",
      "  --background: #004a50 !important;",
      "}",
      "html:not([data-theme='light']) header { background: #004a50 !important; }",
      "html:not([data-theme='light']) footer { background: #004a50 !important; }",
      "html:not([data-theme='light']) .Footer_logo__C9vo8 img,",
      "html:not([data-theme='light']) .Logo_src__xX_cm {",
      "  filter: brightness(0) invert(1) !important;",
      "}",

      /* ── Light Theme Overrides ─────────────────────── */
      "html[data-theme='light'] {",
      "  --background: #f5f7fa !important;",
      "  --foreground: #002450 !important;",
      "  --content: #ffffff !important;",
      "  --text: #00385E !important;",
      "  --border: rgba(0,36,80,0.10) !important;",
      "  --tag: rgba(0,36,80,0.05) !important;",
      "  --highlight: #006B72 !important;",
      "  --link: #006B72 !important;",
      "}",
      /* Sidebar */
      "html[data-theme='light'] #gg-sidebar {",
      "  background: #ffffff; color: #002450;",
      "  border-left-color: #e0e6ec;",
      "  box-shadow: -2px 0 8px rgba(0,36,80,0.08);",
      "}",
      "html[data-theme='light'] #gg-sidebar .sidebar-toggle {",
      "  background: #f5f7fa; border-bottom-color: #e0e6ec; color: #6b8caf;",
      "}",
      "html[data-theme='light'] #gg-sidebar .sidebar-toggle:hover { color: #002450; }",
      "html[data-theme='light'] #gg-sidebar .nav-item { color: #00385E; }",
      "html[data-theme='light'] #gg-sidebar .nav-item:hover { color: #002450; background: #f0f4f8; }",
      "html[data-theme='light'] #gg-sidebar .nav-item.active { color: #006B72; }",
      "html[data-theme='light'] #gg-sidebar .nav-item.active::before { background: #006B72; }",
      "html[data-theme='light'] #gg-sidebar .nav-sep { background: #e0e6ec; }",
      "html[data-theme='light'] #gg-sidebar .nav-children a { color: #00385E; }",
      "html[data-theme='light'] #gg-sidebar .nav-children a:hover { color: #002450; background: #f0f4f8; }",
      "html[data-theme='light'] #gg-sidebar .nav-children a.current { color: #006B72; background: rgba(0,107,114,.08); }",
      "html[data-theme='light'] #gg-sidebar .sidebar-header-text { color: #6b8caf; }",
      /* Collapsed tooltips */
      "html[data-theme='light'] #gg-sidebar.collapsed .nav-item[data-tooltip]:hover::after {",
      "  background: #002450; color: #fff;",
      "}",
      /* Theme toggle */
      "html[data-theme='light'] .gg-theme-toggle {",
      "  color: #6b8caf; border-top-color: #e0e6ec;",
      "}",
      "html[data-theme='light'] .gg-theme-toggle:hover { color: #002450; background: #f0f4f8; }",
      /* Stats tiles */
      "html[data-theme='light'] .gg-stats-heading { color: #002450; }",
      "html[data-theme='light'] .gg-stats-tile {",
      "  background: rgba(0,36,80,.04); border-color: rgba(0,36,80,.10);",
      "}",
      "html[data-theme='light'] .gg-stats-tile:hover {",
      "  background: rgba(0,36,80,.08); border-color: rgba(0,36,80,.18);",
      "}",
      "html[data-theme='light'] .gg-stats-count { color: #002450; }",
      "html[data-theme='light'] .gg-stats-label { color: #00385E; }",
      /* Legend */
      "html[data-theme='light'] .gg-legend {",
      "  background: rgba(0,36,80,.03); border-color: rgba(0,36,80,.08); color: #00385E;",
      "}",
      "html[data-theme='light'] .gg-legend-item:hover { background: rgba(0,36,80,.06); }",
      "html[data-theme='light'] .gg-legend-item.active {",
      "  background: rgba(0,36,80,.08); outline-color: rgba(0,36,80,.15);",
      "}",
      /* Badges */
      "html[data-theme='light'] .logo-badge {",
      "  background: rgba(0,36,80,.06); border-color: rgba(0,36,80,.12); color: #00385E;",
      "}",
      /* Hero text */
      "html[data-theme='light'] .gg-hero-text { color: #00385E; }",
      /* Framework element light overrides */
      "html[data-theme='light'] header { background: #f5f7fa !important; border-bottom: 1px solid #d5dae0; }",
      "html[data-theme='light'] .Logo_src__xX_cm { filter: brightness(0) saturate(100%) !important; }",
      "html[data-theme='light'] .Logo_subline__E9VoF { color: #002450 !important; }",
      "html[data-theme='light'] footer { background: #f5f7fa !important; }",
      "html[data-theme='light'] .Footer_logo__C9vo8 img { filter: brightness(0) saturate(100%) !important; }",
      "html[data-theme='light'] .Footer_branding__feBRv { border-top-color: rgba(0,36,80,.10); }",
      "html[data-theme='light'] .Footer_description__s_1Tl { color: #00385E !important; }",
      "html[data-theme='light'] .Footer_footer__v3bT4 a { color: #006B72 !important; }",
      "html[data-theme='light'] main { color: #002450; font-weight: 450; }",
      "html[data-theme='light'] main > h1 > span {",
      "  background: rgba(0,36,80,.06) !important; border-color: rgba(0,36,80,.12) !important; color: #00385E !important;",
      "}",
      /* Item list */
      "html[data-theme='light'] [class*='ItemList_link'] {",
      "  color: #002450 !important; border-bottom-color: rgba(0,36,80,.10) !important;",
      "}",
      "html[data-theme='light'] [class*='ItemList_link']:hover {",
      "  background: rgba(0,107,114,.08) !important;",
      "}",
      /* Tag pills */
      "html[data-theme='light'] [class*='Tags_tag'] {",
      "  border-color: rgba(0,36,80,.18) !important; color: #00385E !important;",
      "  background: rgba(0,36,80,.04) !important;",
      "}",
      "html[data-theme='light'] [class*='Tags_tag']:hover,",
      "html[data-theme='light'] [class*='Tags_active'] {",
      "  background: #006B72 !important; color: #fff !important; border-color: #006B72 !important;",
      "}",
      /* Filter / search */
      "html[data-theme='light'] [class*='QueryFilter'] input {",
      "  background: #fff !important; color: #00385E !important;",
      "  border-color: rgba(0,36,80,.15) !important;",
      "}",
      /* Segment links on home page */
      "html[data-theme='light'] [class*='SegmentLink_link'] {",
      "  color: #002450 !important;",
      "}",
      /* Label descriptions */
      "html[data-theme='light'] [class*='Label_header'] { color: #002450 !important; }",
      "html[data-theme='light'] [class*='Label_description'] { color: #00385E !important; }",
      /* Article detail content area */
      "html[data-theme='light'] [class*='ItemDetail_content'] {",
      "  background: #fff !important; color: #00385E !important;",
      "  line-height: 1.7;",
      "}",
      "html[data-theme='light'] [class*='_id__sidebar'] {",
      "  background: #f5f7fa !important; color: #00385E !important;",
      "}",
      "html[data-theme='light'] .gg-meta-tags a {",
      "  color: #006B72; background: rgba(0,107,114,.08);",
      "  border-color: rgba(0,107,114,.2);",
      "}",
      "html[data-theme='light'] .gg-meta-tags a:hover {",
      "  background: #006B72; color: #fff; border-color: #006B72;",
      "}",
      "html[data-theme='light'] .gg-meta-heading { color: #6b8caf; }",
      "html[data-theme='light'] .gg-meta-author { color: #00385E; }",
      /* Segment list */
      "html[data-theme='light'] [class*='SegmentList_description'] { color: #00385E !important; }",
      /* Ring badge contrast: keep white text on colored badges */
      "html[data-theme='light'] [class*='Badge_colored'] {",
      "  color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.25) !important;",
      "  font-weight: 700 !important;",
      "}",
      /* Overview page filter area */
      "html[data-theme='light'] [class*='Filter_filter'] select {",
      "  background: #fff !important; color: #00385E !important;",
      "  border-color: rgba(0,36,80,.15) !important;",
      "}",
      /* Navigation icons */
      "html[data-theme='light'] [class*='Navigation_icon'] { fill: #006B72 !important; }",
      "html[data-theme='light'] [class*='SegmentLink_icon'] { fill: #006B72 !important; }",
      /* General text readability boost */
      "html[data-theme='light'] p, html[data-theme='light'] li,",
      "html[data-theme='light'] td, html[data-theme='light'] th {",
      "  color: #00385E !important;",
      "}",
      "html[data-theme='light'] h1, html[data-theme='light'] h2,",
      "html[data-theme='light'] h3, html[data-theme='light'] h4 {",
      "  color: #002450 !important;",
      "}",
      /* Social links in light mode */
      "html[data-theme='light'] [class*='SocialLinks_link'] {",
      "  border-color: rgba(0,36,80,.15) !important;",
      "}",
      "html[data-theme='light'] [class*='SocialLinks_link']:hover {",
      "  background: #006B72 !important; border-color: #006B72 !important;",
      "}",
      /* Search icon in light mode */
      "html[data-theme='light'] [class*='QueryFilter_icon'] { fill: #006B72 !important; }",

      /* ── Top navigation bar ────────────────────────── */
      "#gg-topnav {",
      "  position: fixed; top: 0; left: 0; right: 0; height: 56px;",
      "  display: flex; align-items: center; gap: 0;",
      "  background: #003a3f; color: #d0ece9;",
      "  z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;",
      "  font-size: 13px; border-bottom: 1px solid #005259;",
      "  box-shadow: 0 1px 6px rgba(0,0,0,.3);",
      "  padding: 0 16px;",
      "}",
      "#gg-topnav .topnav-brand {",
      "  display: flex; align-items: center; gap: 10px;",
      "  text-decoration: none; color: #fff; font-weight: 700;",
      "  font-size: 14px; margin-right: 24px; flex-shrink: 0;",
      "}",
      "#gg-topnav .topnav-brand img {",
      "  height: 34px; filter: brightness(0) invert(1);",
      "}",
      "#gg-topnav .topnav-links {",
      "  display: flex; align-items: center; gap: 2px; flex: 1;",
      "}",
      "#gg-topnav .topnav-link {",
      "  display: flex; align-items: center; gap: 6px;",
      "  padding: 6px 14px; border-radius: 6px;",
      "  color: #b0ddd8; text-decoration: none; font-size: 13px;",
      "  font-weight: 500; transition: color .12s, background .12s;",
      "  white-space: nowrap;",
      "}",
      "#gg-topnav .topnav-link:hover { color: #fff; background: rgba(255,255,255,.1); }",
      "#gg-topnav .topnav-link.active {",
      "  color: #34C0A6; background: rgba(52,192,166,.12);",
      "}",
      "#gg-topnav .topnav-link svg { width: 16px; height: 16px; flex-shrink: 0; }",
      "#gg-topnav .topnav-theme {",
      "  display: flex; align-items: center; justify-content: center;",
      "  width: 34px; height: 34px; border-radius: 6px;",
      "  background: none; border: 1px solid rgba(255,255,255,.12);",
      "  color: #7fbcb8; cursor: pointer; flex-shrink: 0;",
      "  transition: color .12s, background .12s, border-color .12s;",
      "}",
      "#gg-topnav .topnav-theme:hover { color: #fff; background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2); }",
      "#gg-topnav .topnav-theme svg { width: 18px; height: 18px; }",
      /* Light theme top nav */
      "html[data-theme='light'] #gg-topnav {",
      "  background: #ffffff; color: #002450;",
      "  border-bottom-color: #d5dae0;",
      "  box-shadow: 0 1px 4px rgba(0,36,80,.08);",
      "}",
      "html[data-theme='light'] #gg-topnav .topnav-brand { color: #002450; }",
      "html[data-theme='light'] #gg-topnav .topnav-brand img { filter: brightness(0) saturate(100%); }",
      "html[data-theme='light'] #gg-topnav .topnav-link { color: #00385E; }",
      "html[data-theme='light'] #gg-topnav .topnav-link:hover { color: #002450; background: rgba(0,36,80,.06); }",
      "html[data-theme='light'] #gg-topnav .topnav-link.active { color: #006B72; background: rgba(0,107,114,.1); }",
      "html[data-theme='light'] #gg-topnav .topnav-theme { color: #6b8caf; border-color: rgba(0,36,80,.12); }",
      "html[data-theme='light'] #gg-topnav .topnav-theme:hover { color: #002450; background: rgba(0,36,80,.06); }",
      /* Body offset for top nav */
      "body.gg-has-topnav { padding-top: 56px; }",
      "body.gg-has-topnav header { display: none !important; }",
      /* Hide sidebar on home page */
      "body.gg-page-home #gg-sidebar { display: none; }",
      "body.gg-page-home #layout { margin-right: 0 !important; }",
      /* Responsive: top nav compact */
      "@media (max-width: 768px) {",
      "  #gg-topnav .topnav-link span { display: none; }",
      "  #gg-topnav .topnav-link { padding: 6px 10px; }",
      "  #gg-topnav .topnav-brand span { display: none; }",
      "}",
    ].join("\n");

    var el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ── Helpers ───────────────────────────────────────────── */
  function setBodyClass(collapsed) {
    document.body.classList.remove("gg-sidebar-open", "gg-sidebar-collapsed");
    document.body.classList.add(collapsed ? "gg-sidebar-collapsed" : "gg-sidebar-open");
  }

  function isCurrentPath(href) {
    var p = window.location.pathname.replace(/\/+$/, "") || "/";
    var h = href.replace(/\/+$/, "") || "/";
    return p === h;
  }

  /* ── Theme management ──────────────────────────────────── */
  var THEME_KEY = "gg-theme";

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }

  /* ── Fetch segment titles from radar.json config ───────── */
  function getSegments() {
    var defaults = [
      { id: "methods-and-patterns", title: "Methods & Patterns" },
      { id: "tools", title: "Tools" },
      { id: "platforms-and-services", title: "Platforms & Operations" },
      { id: "languages-and-frameworks", title: "Languages & Frameworks" },
    ];
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/radar/radar.json", false);
      xhr.send();
      if (xhr.status === 200) {
        var raw = JSON.parse(xhr.responseText);
        var cfg = raw.config || raw;
        var segs = cfg.segments || cfg.quadrants;
        if (segs && segs.length) {
          return segs.map(function (s) {
            return { id: s.id, title: s.title };
          });
        }
      }
    } catch (e) { /* use defaults */ }
    return defaults;
  }

  /* ── Fetch TDR / Decision Records segment titles from /tdr/radar.json ── */
  function getTdrSegments() {
    var defaults = [
      { id: "platform-and-infrastructure", title: "Platform & Infrastructure" },
      { id: "application-architecture", title: "Application Architecture" },
      { id: "data-and-analytics", title: "Data & Analytics" },
      { id: "security-and-compliance", title: "Security & Compliance" },
      { id: "development-experience", title: "Development Experience" },
      { id: "operations-and-reliability", title: "Operations & Reliability" },
    ];
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/decisions/radar.json", false);
      xhr.send();
      if (xhr.status === 200) {
        var raw = JSON.parse(xhr.responseText);
        var cfg = raw.config || raw;
        var segs = cfg.segments || cfg.quadrants;
        if (segs && segs.length) {
          return segs.map(function (s) {
            return { id: s.id, title: s.title };
          });
        }
      }
    } catch (e) { /* use defaults */ }
    return defaults;
  }

  /* ── Build top navigation bar ────────────────────────────── */
  function buildTopNav() {
    if (document.getElementById("gg-topnav")) return;

    var topnav = document.createElement("nav");
    topnav.id = "gg-topnav";

    /* Brand */
    var brand = document.createElement("a");
    brand.className = "topnav-brand";
    brand.href = "/";
    brand.innerHTML = '<img src="/logo.svg" alt="Gunvor Group" /><span>Tech Radar</span>';
    topnav.appendChild(brand);

    /* Links */
    var linksDiv = document.createElement("div");
    linksDiv.className = "topnav-links";

    var p = window.location.pathname.replace(/\/+$/, "") || "/";
    var navItems = [
      { href: "/", label: "Home", icon: "radar", match: function (pp) { return pp === "/"; } },
      { href: "/radar/", label: "Radar", icon: "radar", match: function (pp) { return pp.indexOf("/radar") === 0; } },
      { href: "/decisions/", label: "Decisions", icon: "tdr", match: function (pp) { return pp.indexOf("/decisions") === 0; } },
      { href: "/radar/help-and-about-tech-radar/", label: "About", icon: "about", match: function (pp) { return pp.indexOf("/help-and-about") > -1; } },
    ];

    navItems.forEach(function (item) {
      var a = document.createElement("a");
      a.className = "topnav-link";
      a.href = item.href;
      a.innerHTML = icons[item.icon] + " <span>" + item.label + "</span>";
      if (item.match(p)) a.classList.add("active");
      linksDiv.appendChild(a);
    });
    topnav.appendChild(linksDiv);

    /* Theme toggle */
    var themeBtn = document.createElement("button");
    themeBtn.className = "topnav-theme";
    themeBtn.title = "Toggle theme";
    function updateTopNavTheme() {
      var isDark = document.documentElement.getAttribute("data-theme") !== "light";
      themeBtn.innerHTML = isDark ? icons.sun : icons.moon;
    }
    updateTopNavTheme();
    themeBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      var next = current === "light" ? "dark" : "light";
      setTheme(next);
      updateTopNavTheme();
    });
    topnav.appendChild(themeBtn);

    document.body.appendChild(topnav);
    document.body.classList.add("gg-has-topnav");

    /* Mark home page for CSS */
    if (p === "/") {
      document.body.classList.add("gg-page-home");
    }
  }

  /* ── Build sidebar (section-aware) ─────────────────────── */
  function buildSidebar() {
    var p = window.location.pathname.replace(/\/+$/, "") || "/";
    var isRadarPage = p.indexOf("/radar") === 0;
    var isDecisionsPage = p.indexOf("/decisions") === 0;

    /* Don't show sidebar on home page or non-content pages */
    if (!isRadarPage && !isDecisionsPage) return;

    var isCollapsed = localStorage.getItem(STORAGE_KEY) === "true";

    /* — Container — */
    var sidebar = document.createElement("div");
    sidebar.id = "gg-sidebar";
    if (isCollapsed) sidebar.classList.add("collapsed");

    /* — Toggle header — */
    var toggle = document.createElement("button");
    toggle.className = "sidebar-toggle";
    toggle.setAttribute("data-tooltip", "Toggle sidebar");
    var sectionLabel = isDecisionsPage ? "Decisions" : "Radar";
    toggle.innerHTML =
      '<span class="toggle-icon">' + (isCollapsed ? icons.expand : icons.collapse) + "</span>" +
      '<span class="sidebar-header-text">' + sectionLabel + '</span>';

    toggle.addEventListener("click", function () {
      var nowCollapsed = sidebar.classList.toggle("collapsed");
      localStorage.setItem(STORAGE_KEY, nowCollapsed ? "true" : "false");
      toggle.querySelector(".toggle-icon").innerHTML = nowCollapsed ? icons.expand : icons.collapse;
      setBodyClass(nowCollapsed);
    });
    sidebar.appendChild(toggle);

    /* — Scrollable nav area — */
    var nav = document.createElement("nav");
    nav.className = "sidebar-nav";

    if (isRadarPage) {
      /* ===== Radar section navigation ===== */
      var segments = getSegments();

      /* Radar Home link */
      var homeLi = document.createElement("li");
      var homeA = document.createElement("a");
      homeA.href = "/radar/";
      homeA.className = "nav-item";
      homeA.setAttribute("data-tooltip", "Radar Home");
      homeA.innerHTML =
        '<svg class="nav-icon">' + icons.radar.replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
        '<span class="nav-label">Radar Home</span>';
      if (isCurrentPath("/radar/") || isCurrentPath("/radar")) homeA.classList.add("active");
      nav.appendChild(homeA);

      /* Overview link */
      var overA = document.createElement("a");
      overA.href = "/radar/overview/";
      overA.className = "nav-item";
      overA.setAttribute("data-tooltip", "Overview");
      overA.innerHTML =
        '<svg class="nav-icon">' + icons.overview.replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
        '<span class="nav-label">Technologies Overview</span>';
      if (isCurrentPath("/radar/overview/") || isCurrentPath("/radar/overview")) overA.classList.add("active");
      nav.appendChild(overA);

      /* Separator */
      var sep = document.createElement("div");
      sep.className = "nav-sep";
      nav.appendChild(sep);

      /* Quadrants */
      segments.forEach(function (seg) {
        var a = document.createElement("a");
        a.href = "/radar/" + seg.id + "/";
        a.className = "nav-item";
        a.setAttribute("data-tooltip", seg.title);
        var iconKey = segmentIcons[seg.id] || "radar";
        a.innerHTML =
          '<svg class="nav-icon">' + icons[iconKey].replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
          '<span class="nav-label">' + seg.title + "</span>";
        if (p.indexOf("/radar/" + seg.id) === 0) a.classList.add("active");
        nav.appendChild(a);
      });

      /* About link */
      var sep2 = document.createElement("div");
      sep2.className = "nav-sep";
      nav.appendChild(sep2);

      var aboutA = document.createElement("a");
      aboutA.href = "/radar/help-and-about-tech-radar/";
      aboutA.className = "nav-item";
      aboutA.setAttribute("data-tooltip", "About");
      aboutA.innerHTML =
        '<svg class="nav-icon">' + icons.about.replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
        '<span class="nav-label">About & Governance</span>';
      if (p.indexOf("/help-and-about") > -1) aboutA.classList.add("active");
      nav.appendChild(aboutA);

    } else if (isDecisionsPage) {
      /* ===== Decisions section navigation ===== */
      var tdrSegments = getTdrSegments();

      /* Decisions Home link */
      var dHomeA = document.createElement("a");
      dHomeA.href = "/decisions/";
      dHomeA.className = "nav-item";
      dHomeA.setAttribute("data-tooltip", "Decisions Home");
      dHomeA.innerHTML =
        '<svg class="nav-icon">' + icons.tdr.replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
        '<span class="nav-label">Decisions Home</span>';
      if (isCurrentPath("/decisions/") || isCurrentPath("/decisions")) dHomeA.classList.add("active");
      nav.appendChild(dHomeA);

      /* Decisions Overview link */
      var dOverA = document.createElement("a");
      dOverA.href = "/decisions/overview/";
      dOverA.className = "nav-item";
      dOverA.setAttribute("data-tooltip", "Overview");
      dOverA.innerHTML =
        '<svg class="nav-icon">' + icons.overview.replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
        '<span class="nav-label">Decisions Overview</span>';
      if (isCurrentPath("/decisions/overview/") || isCurrentPath("/decisions/overview")) dOverA.classList.add("active");
      nav.appendChild(dOverA);

      /* Separator */
      var dSep = document.createElement("div");
      dSep.className = "nav-sep";
      nav.appendChild(dSep);

      /* TDR segments */
      tdrSegments.forEach(function (seg) {
        var a = document.createElement("a");
        a.href = "/decisions/" + seg.id + "/";
        a.className = "nav-item";
        a.setAttribute("data-tooltip", seg.title);
        var iconKey = tdrSegmentIcons[seg.id] || "tdr";
        a.innerHTML =
          '<svg class="nav-icon">' + icons[iconKey].replace(/<\/?svg[^>]*>/g, "") + "</svg>" +
          '<span class="nav-label">' + seg.title + "</span>";
        if (p.indexOf("/decisions/" + seg.id) === 0) a.classList.add("active");
        nav.appendChild(a);
      });
    }

    sidebar.appendChild(nav);
    document.body.appendChild(sidebar);

    /* Set body class */
    setBodyClass(isCollapsed);
  }

  /* ── Enhance article detail sidebar with tags & author ── */
  function enhanceArticleSidebar() {
    /* Only run on article detail pages – they have the aside sidebar */
    var aside = document.querySelector("aside._id__sidebar__pGGvL, aside[class*='_id__sidebar']");
    if (!aside) return;

    /* Derive item ID from the URL:  /<segment>/<item-id>/  */
    var pathParts = window.location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
    if (pathParts.length < 2) return; // not an article detail page
    var itemId = pathParts[pathParts.length - 1];

    /* ── Collect tags from the inline header or from radar.json ── */
    var tags = [];
    var headerTags = document.querySelectorAll(".Tags_tag__EJlP2, a[class*='Tags_tag']");
    headerTags.forEach(function (el) {
      var span = el.querySelector("span");
      if (span) {
        tags.push({ label: span.textContent.trim(), href: el.getAttribute("href") || "/?tag=" + encodeURIComponent(span.textContent.trim()) });
      }
    });

    /* ── Build the metadata container ── */
    var metaWrap = document.createElement("div");
    metaWrap.className = "gg-article-meta";

    /* — Tags section — */
    if (tags.length > 0) {
      var tagSection = document.createElement("div");
      tagSection.className = "gg-meta-section";

      var tagHeading = document.createElement("div");
      tagHeading.className = "gg-meta-heading";
      tagHeading.innerHTML = icons.tag + " Tags";
      tagSection.appendChild(tagHeading);

      var tagList = document.createElement("div");
      tagList.className = "gg-meta-tags";
      tags.forEach(function (t) {
        var a = document.createElement("a");
        a.href = t.href;
        a.textContent = t.label;
        tagList.appendChild(a);
      });
      tagSection.appendChild(tagList);
      metaWrap.appendChild(tagSection);
    }

    /* — Author section (async fetch from authors.json) — */
    var authorSection = document.createElement("div");
    authorSection.className = "gg-meta-section";

    var authorHeading = document.createElement("div");
    authorHeading.className = "gg-meta-heading";
    authorHeading.innerHTML = icons.author + " Author";
    authorSection.appendChild(authorHeading);

    var authorValue = document.createElement("div");
    authorValue.className = "gg-meta-author";
    authorValue.innerHTML = icons.author + " <span>Loading…</span>";
    authorSection.appendChild(authorValue);
    metaWrap.appendChild(authorSection);

    /* Insert metadata block before the item list (or at the top of aside) */
    var ringBadge = aside.querySelector("div[class*='ringAndSegment'], div._id__ringAndSegment__Ft8nj");
    if (ringBadge && ringBadge.nextSibling) {
      aside.insertBefore(metaWrap, ringBadge.nextSibling);
    } else {
      /* fallback: insert after the h3 title */
      var h3 = aside.querySelector("h3");
      if (h3 && h3.nextSibling) {
        aside.insertBefore(metaWrap, h3.nextSibling);
      } else {
        aside.insertBefore(metaWrap, aside.firstChild);
      }
    }

    /* Fetch author from authors.json */
    var isTdrItem = window.location.pathname.indexOf("/decisions/") === 0;
    var authorsUrl = isTdrItem ? "/decisions/authors.json" : "/radar/authors.json";
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", authorsUrl, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var authors = JSON.parse(xhr.responseText);
          var name = authors[itemId] || "Gunvor Group Technology Team";
          authorValue.innerHTML = icons.author + " <span>" + name + "</span>";
        } else {
          authorValue.innerHTML = icons.author + " <span>Gunvor Group Technology Team</span>";
        }
      };
      xhr.onerror = function () {
        authorValue.innerHTML = icons.author + " <span>Gunvor Group Technology Team</span>";
      };
      xhr.send();
    } catch (e) {
      authorValue.innerHTML = icons.author + " <span>Gunvor Group Technology Team</span>";
    }
  }

  /* ── Inject statistics tiles bar under the title ────── */
  function injectStatsTiles() {
    /* Only show on the main index page (radar or TDR root) */
    var p = window.location.pathname.replace(/\/+$/, "") || "/";
    var isTdr = p === "/decisions" || p === "/decisions/";
    var isRadar = p === "/radar" || p === "/radar/";
    if (!isTdr && !isRadar) return;

    /* Idempotent: don't inject twice */
    if (document.querySelector(".gg-hero")) return;

    var statsUrl = isTdr ? "/decisions/stats.json" : "/radar/stats.json";
    var overviewBase = isTdr ? "/decisions/overview" : "/radar/overview";

    /* Intro copy */
    var introHtml = isTdr
      ? 'The <strong>Technology Decision Records</strong> capture enterprise-wide mandates set by the Technology Advisory Group and project-level architecture decisions. They provide a traceable governance chain from strategic direction to implementation, organised across six domains and four lifecycle stages.'
      : 'The <strong>Technology Radar</strong> provides an at-a-glance view of the technologies Gunvor Group tracks, evaluates, and recommends. Blips are placed across four quadrants and four adoption rings to help engineering teams make informed, consistent technology choices.';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", statsUrl, true);
    xhr.onload = function () {
      if (xhr.status !== 200) return;
      try {
        var data = JSON.parse(xhr.responseText);
      } catch (e) {
        return;
      }

      /* Three evolution categories: New, Changed, Stale */
      var categories = [
        { key: "new", d: data["new"] },
        { key: "changed", d: data.changed },
        { key: "stale", d: data.stale }
      ];

      /* Keep only categories with count > 0 */
      var active = [];
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].d && categories[i].d.count > 0) {
          active.push(categories[i]);
        }
      }

      /* Build hero section: intro text (left) + tiles (right) */
      var hero = document.createElement("div");
      hero.className = "gg-hero";

      var textDiv = document.createElement("div");
      textDiv.className = "gg-hero-text";
      textDiv.innerHTML = introHtml;
      hero.appendChild(textDiv);

      if (active.length > 0) {
        var rightDiv = document.createElement("div");
        rightDiv.className = "gg-hero-right";

        var heading = document.createElement("p");
        heading.className = "gg-stats-heading";
        heading.textContent = "What\u2019s New";
        rightDiv.appendChild(heading);

        var bar = document.createElement("div");
        bar.className = "gg-stats-bar";

        var shapeMap = { "new": "triangle", changed: "diamond", stale: "circle" };

        for (var i = 0; i < active.length; i++) {
          var cat = active[i];
          var tile = document.createElement("a");
          tile.className = "gg-stats-tile";
          tile.href = overviewBase + "?flag=" + encodeURIComponent(cat.key);
          var shape = '<span class="gg-stats-shape ' + (shapeMap[cat.key] || 'circle') + '" style="color:' + (cat.d.color || '#5c717e') + '"></span>';
          tile.innerHTML =
            '<span class="gg-stats-count">' + cat.d.count + "</span>" +
            '<span class="gg-stats-label">' + shape + cat.d.label + "</span>";
          bar.appendChild(tile);
        }
        rightDiv.appendChild(bar);
        hero.appendChild(rightDiv);
      }

      placeHero(hero);
    };
    xhr.send();

    function placeHero(hero) {
      if (document.querySelector(".gg-hero")) return; /* idempotent */
      var h1 = document.querySelector("main > h1");
      if (h1) {
        h1.parentNode.insertBefore(hero, h1.nextSibling);
      } else {
        var main = document.querySelector("main");
        if (main) { main.prepend(hero); }
      }
    }
  }

  /* ── Legend + flag filtering for overview pages ──────── */
  function enhanceOverview() {
    var p = window.location.pathname.replace(/\/+$/, "") || "/";
    var isTdrOverview = p === "/decisions/overview";
    var isRadarOverview = p === "/radar/overview";
    if (!isTdrOverview && !isRadarOverview) return;

    /* Idempotent */
    if (document.querySelector(".gg-legend")) return;

    var statsUrl = isTdrOverview ? "/decisions/stats.json" : "/radar/stats.json";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", statsUrl, true);
    xhr.onload = function () {
      if (xhr.status !== 200) return;
      try {
        var data = JSON.parse(xhr.responseText);
      } catch (e) {
        return;
      }

      /* ── Build legend ─────────────────────────────── */
      var legend = document.createElement("div");
      legend.className = "gg-legend";

      legend.innerHTML =
        '<span class="gg-legend-title">Legend</span>' +
        '<span class="gg-legend-item" data-flag="">' +
        '<span class="gg-legend-shape circle" style="color:#5c717e"></span>' +
        '<span>Unchanged</span>' +
        '</span>' +
        '<span class="gg-legend-item" data-flag="new">' +
        '<span class="gg-legend-shape triangle" style="color:' + (data["new"].color || "#c9344f") + '"></span>' +
        '<span>New — added in this edition</span>' +
        '</span>' +
        '<span class="gg-legend-item" data-flag="changed">' +
        '<span class="gg-legend-shape diamond" style="color:' + (data.changed.color || "#006B72") + '"></span>' +
        '<span>Changed — ring moved or updated</span>' +
        '</span>';

      /* ── Read current ?flag= param ─────────────────── */
      var params = new URLSearchParams(window.location.search);
      var activeFlag = params.get("flag") || "";

      /* ── Insert legend into page ────────────────────── */
      var filterEl = document.querySelector("[class*='Filter_filter']");
      if (filterEl) {
        filterEl.parentNode.insertBefore(legend, filterEl.nextSibling);
      } else {
        var h1 = document.querySelector("h1");
        if (h1 && h1.parentNode) {
          h1.parentNode.insertBefore(legend, h1.nextSibling);
        }
      }

      /* ── Apply filter and button state ─────────────── */
      function applyFilter(flag) {
        activeFlag = flag;

        /* Update legend highlights */
        var legendItems = legend.querySelectorAll(".gg-legend-item");
        for (var l = 0; l < legendItems.length; l++) {
          legendItems[l].classList.remove("active");
          if (flag && legendItems[l].getAttribute("data-flag") === flag) {
            legendItems[l].classList.add("active");
          }
        }

        /* If no flag filter, show all items */
        var itemList = document.querySelector("[class*='ItemList_list']");
        if (!itemList) return;
        var items = itemList.querySelectorAll("[class*='ItemList_item']");

        if (!flag) {
          for (var j = 0; j < items.length; j++) {
            items[j].style.display = "";
          }
          return;
        }

        /* Build slug set for the active flag */
        var slugSet = {};
        var src = flag === "new" ? data["new"] : (flag === "changed" ? data.changed : data.stale);
        if (src && src.items) {
          for (var s = 0; s < src.items.length; s++) slugSet[src.items[s]] = true;
        }

        /* Match items by their href slug */
        for (var j = 0; j < items.length; j++) {
          var link = items[j].querySelector("a[href]");
          if (!link) { items[j].style.display = "none"; continue; }
          var href = link.getAttribute("href") || "";
          var slug = href.replace(/^\/+|\/+$/g, "").split("/").pop();
          items[j].style.display = slugSet[slug] ? "" : "none";
        }
      }

      /* ── Wire up click handlers ────────────────────── */
      /* Legend items are clickable */
      var legendClickable = legend.querySelectorAll(".gg-legend-item[data-flag]");
      for (var l = 0; l < legendClickable.length; l++) {
        legendClickable[l].addEventListener("click", (function (df) {
          return function () { applyFilter(df); };
        })(legendClickable[l].getAttribute("data-flag")));
      }

      /* Apply initial filter from URL param */
      applyFilter(activeFlag);
    };
    xhr.send();
  }

  /* ── Move version/date badges into the logo area ──────── */
  function enhanceLogoBadges() {
    var logo = document.querySelector(".Logo_logo__c5nVK");
    if (!logo) return;

    var h1 = document.querySelector("main > h1");
    var versionSpan = h1 ? h1.querySelector("span") : null;
    if (!versionSpan) return;

    /* Build badge row */
    var wrap = document.createElement("span");
    wrap.className = "logo-badges";

    /* Version badge */
    var vBadge = document.createElement("span");
    vBadge.className = "logo-badge";
    vBadge.textContent = versionSpan.textContent.replace(/\s+/g, " ").trim();
    wrap.appendChild(vBadge);

    /* Date badge (from meta injected by postbuild) */
    var metaDate = document.querySelector('meta[name="release-date"]');
    if (metaDate && metaDate.content) {
      var dBadge = document.createElement("span");
      dBadge.className = "logo-badge";
      dBadge.textContent = metaDate.content;
      wrap.appendChild(dBadge);
    }

    /* Wrap subline + badges in a column container so badges appear under title text */
    var subline = logo.querySelector(".Logo_subline__E9VoF");
    if (subline) {
      var col = document.createElement("span");
      col.className = "logo-title-group";
      subline.parentNode.insertBefore(col, subline);
      col.appendChild(subline);
      col.appendChild(wrap);
    } else {
      logo.appendChild(wrap);
    }

    /* Hide the original h1 entirely */
    h1.style.display = "none";
  }

  /* ── Bootstrap ─────────────────────────────────────────── */
  function init() {
    if (document.getElementById("gg-topnav")) return;

    /* Core navigation (topnav + sidebar) — must succeed */
    try { initTheme(); } catch (e) { console.warn("[gg-init] initTheme:", e); }
    try { injectStyles(); } catch (e) { console.warn("[gg-init] injectStyles:", e); }
    try { buildTopNav(); } catch (e) { console.warn("[gg-init] buildTopNav:", e); }
    try { buildSidebar(); } catch (e) { console.warn("[gg-init] buildSidebar:", e); }

    /* Enhancements — non-critical */
    try { enhanceArticleSidebar(); } catch (e) { console.warn("[gg-init] enhanceArticleSidebar:", e); }
    try { enhanceLogoBadges(); } catch (e) { console.warn("[gg-init] enhanceLogoBadges:", e); }
    try { injectStatsTiles(); } catch (e) { console.warn("[gg-init] injectStatsTiles:", e); }
    try { enhanceOverview(); } catch (e) { console.warn("[gg-init] enhanceOverview:", e); }

    /* Retry tiles + overview after React hydration may swap DOM */
    setTimeout(function () {
      try { injectStatsTiles(); } catch (e) { /* silent */ }
      try { enhanceOverview(); } catch (e) { /* silent */ }
      /* Retry topnav + sidebar if React hydration removed them */
      if (!document.getElementById("gg-topnav")) {
        try { buildTopNav(); } catch (e) { /* silent */ }
      }
      if (!document.getElementById("gg-sidebar")) {
        try { buildSidebar(); } catch (e) { /* silent */ }
      }
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
