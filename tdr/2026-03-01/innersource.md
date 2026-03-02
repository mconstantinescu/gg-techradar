---
title:      "InnerSource Practice"
segment:    development-experience
ring:       trial
flag:       new
tags:       [Global, scope-enterprise, collaboration, governance]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and applies to all shared libraries and platform components.

## Context

Shared libraries and platform tools are currently maintained by single teams, creating bottlenecks for consumers who need changes. Cross-team contributions are ad-hoc and inconsistent.

## Decision

We adopt an **InnerSource** model for designated shared repositories:

- **Trusted Committers** from the owning team review and merge external PRs
- **CONTRIBUTING.md** in every InnerSource repo with contribution guidelines
- **30-day SLA** for PR reviews from external contributors
- **Backstage catalogue** labels InnerSource-eligible repositories

## Consequences

- **Positive**: Faster cross-team collaboration; reduced bottlenecks; broader code ownership.
- **Negative**: Trusted Committer review load; potential quality variance.
- **Mitigation**: Automated CI gates; pair-review sessions; InnerSource champions programme.
