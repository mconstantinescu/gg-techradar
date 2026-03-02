---
title:      "Migrate CI/CD to GitHub Actions"
segment:    development-experience
ring:       trial
flag:       changed
tags:       [Global, scope-enterprise, ci-cd, devops]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and would bind all engineering
  teams upon acceptance.
- Currently **Proposed** — pilot running with platform and frontend
  teams; Architecture Board review scheduled for Q3 2025.
- Would supersede existing Jenkins-based pipelines over a 12-month
  migration window.

## Context

Jenkins has been the organisation's CI/CD platform for 8+ years. The
self-hosted controller cluster requires significant maintenance
(plugin updates, security patches, capacity planning). Pipeline
definitions are inconsistent (Jenkinsfile, Job DSL, scripted vs.
declarative). GitHub is already the source-code host, making native
CI/CD integration a natural fit.

## Decision

We propose migrating all CI/CD pipelines to **GitHub Actions**:

- **Reusable workflows** stored in a central `.github` repository
  provide golden-path templates (build, test, deploy, release)
- **Self-hosted runners** on AKS for cost control and network access
  to internal registries
- **OIDC federation** with Azure for secret-less deployments —
  no long-lived credentials
- **Migration playbook** — team-by-team, starting with greenfield
  services, then migrating brownfield in priority order
- **Jenkins decommission** target: end of Q2 2026

## Consequences

- **Positive**: Native GitHub integration; simpler pipeline authoring;
  reduced infrastructure overhead; OIDC eliminates stored secrets.
- **Negative**: Runner fleet management; GitHub Actions minute costs
  at scale; learning curve for Jenkins-native teams.
- **Mitigation**: Centralise runner management in platform team;
  budget forecast based on pilot usage data; provide migration
  workshops and pairing sessions.


**Update March 2026:** The pilot migration of three services from GitLab CI to GitHub Actions completed successfully. Build times improved by ~35% and the developer experience with GitHub-native CI is highly rated. Expanding trial to the full Trading Platform programme.
