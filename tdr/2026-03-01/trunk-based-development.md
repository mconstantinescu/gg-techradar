---
title:      "Trunk-Based Development"
segment:    development-experience
ring:       standard
flag:       changed
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
The DORA metrics show our lead time for changes is 5× slower than
elite performers.

## Decision

We propose adopting **Trunk-Based Development** (TBD):

- All developers commit to `main` (or a short-lived branch merged
  within **24 hours**)
- **Feature flags** (LaunchDarkly / Azure App Configuration) gate
  incomplete features in production
- **CI runs on every push to `main`** — broken builds are fixed
  immediately (15-minute SLA)
- **Release branches** are cut only for hotfix support of prior
  versions, never for feature isolation
- **Pair/mob programming** replaces code review for complex changes;
  async review limited to small, well-scoped PRs

## Consequences

- **Positive**: Faster integration; shorter lead time; reduced merge
  conflicts; CI signal is always fresh against trunk.
- **Negative**: Requires feature-flag discipline; incomplete code in
  main may confuse; demands fast, reliable CI.
- **Mitigation**: Feature-flag hygiene sprints; invest in CI speed
  (parallelism, caching); establish TBD working agreement per squad.


**Update March 2026:** Trunk-based development with short-lived feature branches (< 2 days) is now the standard branching model. All teams have migrated from Gitflow. Release branches are only permitted for hotfix scenarios.
