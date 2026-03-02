---
title:      "Trunk-Based Development"
segment:    development-experience
ring:       trial
flag:       new
tags:       [scope-program, ci-cd, trunk-based, branching]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  Engineering Practices Guild
project:    Gunvor Trading Platform
---

## Applicability

- This record is **Product/Program scope** and would bind all teams
  within the trading platform.
- Currently **Proposed** — piloting with two squads before wider rollout.

## Context

Most teams use long-lived feature branches (days to weeks), leading to
painful merge conflicts, delayed integration testing, and "big-bang"
releases. CI pipelines run against feature branches but diverge from
`main` quickly, meaning green builds on branches often fail on merge.

## Decision

We propose trialling **Trunk-Based Development** (TBD):

- All developers commit to `main` (or a short-lived branch merged
  within **24 hours**)
- **Feature flags** gate incomplete features in production
- **CI runs on every push to `main`** — broken builds are fixed
  immediately
- **Pair/mob programming** replaces code review for complex changes

## Consequences

- **Positive**: Faster integration; shorter lead time; reduced merge
  conflicts; CI signal is always fresh against trunk.
- **Negative**: Requires feature-flag discipline; incomplete code in
  main may confuse; demands fast, reliable CI.
- **Mitigation**: Feature-flag hygiene sprints; invest in CI speed;
  establish TBD working agreement per squad.
