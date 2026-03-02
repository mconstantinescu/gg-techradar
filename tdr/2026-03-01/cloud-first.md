---
title:      "Cloud-First Strategy"
segment:    platform-and-infrastructure
ring:       standard
tags:       [Global, scope-enterprise, cloud, strategy, azure]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  CTO Office
---

## Applicability

- This record is **Enterprise scope** and applies to all new projects and major re-platforming initiatives.
- **Accepted** — effective since Q4 2025.

## Context

Legacy on-premises infrastructure created capacity bottlenecks, long lead times for provisioning, and limited geographic reach. Cloud services offer elasticity, global availability, and managed services that reduce operational burden.

## Decision

All new workloads must be deployed to a **cloud environment** (Azure preferred) unless a documented exemption exists:

- **Azure** is the primary cloud provider per the existing Azure Primary Cloud decision
- **On-premises** deployment requires Architecture Board approval with justification (latency, regulatory, data residency)
- **Hybrid patterns** are acceptable during migration windows with a documented exit plan
- **FinOps** practices are mandatory — cost tagging, budget alerts, reserved instances review quarterly

## Consequences

- **Positive**: Faster provisioning; global reach; managed services reduce ops burden; elastic scaling.
- **Negative**: Ongoing cloud cost management; vendor dependency; network latency to on-prem systems.
- **Mitigation**: FinOps team reviews monthly; multi-cloud abstraction at IaC layer; Express Route for hybrid connectivity.
