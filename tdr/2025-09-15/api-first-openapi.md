---
title:      "API-First Design with OpenAPI"
segment:    application-architecture
ring:       trial
flag:       new
tags:       [scope-program, rest, api, openapi]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  API Standards Working Group
project:    Gunvor Trading Platform
---

## Applicability

- This record is **Product/Program scope** and would bind all teams
  building consumer-facing or inter-service APIs within the trading
  platform.
- Currently **Proposed** — initial pilot underway with two service teams.

## Context

Teams define REST APIs inconsistently — some use Swagger annotations
generated from code, others write ad-hoc documentation, and a few have
no contract at all. This causes integration friction, duplicated
validation logic, and makes it impossible to enforce API standards
centrally. Clients cannot generate typed SDKs reliably.

## Decision

We propose trialling an **API-First** development workflow:

- **OpenAPI 3.1** specs are written **before** implementation and stored
  in a shared `api-specs/` repository
- Specs are the **single source of truth** — code is generated from them
  (server stubs, client SDKs, request validators)
- A **linting pipeline** (Spectral) enforces naming conventions, error
  format (RFC 7807), pagination style, and versioning scheme

## Consequences

- **Positive**: Consistent API surface; auto-generated clients reduce
  integration effort; contract-first catches design issues early.
- **Negative**: Upfront design effort increases; teams must learn OpenAPI
  tooling; spec drift risk if enforcement is weak.
- **Mitigation**: Provide OpenAPI starter templates; integrate Spectral
  into PR checks.
