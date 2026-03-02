---
title:      "Migrate CI/CD to GitHub Actions"
segment:    development-experience
ring:       assess
flag:       new
tags:       [Global, scope-enterprise, ci-cd, devops]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and would bind all engineering
  teams upon acceptance.
- Currently **Under Assessment** — feasibility study and cost analysis
  in progress; pilot planned for Q4 2025.

## Context

Jenkins has been the organisation's CI/CD platform for 8+ years. The
self-hosted controller cluster requires significant maintenance
(plugin updates, security patches, capacity planning). Pipeline
definitions are inconsistent (Jenkinsfile, Job DSL, scripted vs.
declarative). GitHub is already the source-code host, making native
CI/CD integration a natural fit.

## Decision

We are assessing the feasibility of migrating CI/CD pipelines to
**GitHub Actions**:

- Evaluate **reusable workflows** for golden-path templates
- Assess **self-hosted runners** on AKS for cost control
- Investigate **OIDC federation** with Azure for secret-less deployments
- Develop a **migration cost model** comparing GitHub Actions vs.
  continued Jenkins investment

## Consequences

- **Positive**: Native GitHub integration; simpler pipeline authoring;
  potential to reduce infrastructure overhead.
- **Negative**: Migration effort; runner fleet management; learning
  curve for Jenkins-native teams.
- **Mitigation**: Complete cost-benefit analysis before committing;
  pilot with a non-critical service first.
