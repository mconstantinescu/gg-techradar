---
title:      "TypeScript as Default Frontend Language"
segment:    development-experience
ring:       standard
flag:       new
tags:       [scope-program, languages, frontend, typescript]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  Frontend Chapter Lead
project:    Gunvor Trading Platform
---

## Applicability

- This record is **Product/Program scope** and binds all teams building
  browser-based or Node.js applications within the trading platform.
- Project-level ADRs may specify framework choices (React, Vue) but
  **must** use TypeScript as the language layer.

## Context

The frontend codebase has grown to 200k+ lines across multiple SPAs.
Plain JavaScript's lack of static typing leads to runtime errors that
escape code review, makes large-scale refactoring risky, and slows
onboarding. IDE support (autocomplete, inline docs) degrades without
type information, reducing developer productivity.

## Decision

We adopt **TypeScript** (latest stable, currently 5.x) as the default
language for all frontend and Node.js development:

- **Strict mode** (`strict: true`) enabled in all `tsconfig.json` files
- **No implicit `any`** — all public APIs must have explicit type
  annotations
- **Shared type packages** published to the internal registry for
  cross-project reuse (e.g., trade models, API response types)
- **Migration path** — existing JS files converted incrementally via
  `allowJs` with a ratchet that blocks new `.js` files in CI

## Consequences

- **Positive**: Catch type errors at compile time; improved IDE support;
  self-documenting interfaces; safer refactoring at scale.
- **Negative**: Initial migration effort for legacy JS; slightly longer
  build times; TypeScript-specific learning curve.
- **Mitigation**: Provide tsconfig templates; run migration sprints per
  squad; pre-commit hooks enforce no new `.js` files.
