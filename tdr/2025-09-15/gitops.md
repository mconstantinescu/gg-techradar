---
title:      "GitOps for Deployment Workflows"
segment:    operations-and-reliability
ring:       standard
flag:       new
tags:       [Global, scope-enterprise, gitops, deployment, argocd]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and binds all teams deploying workloads to Kubernetes.

## Context

Manual and script-driven deployments led to configuration drift, inconsistent environments, and audit gaps. A declarative, Git-centric deployment model was needed to enforce consistency and traceability.

## Decision

All Kubernetes deployments must follow a **GitOps** workflow:

- **ArgoCD** as the single deployment operator across all clusters
- **App-of-apps pattern** for hierarchical application management
- **Sealed Secrets** for encrypted secret storage in Git
- **Pull-based reconciliation** — no direct kubectl apply in production

## Consequences

- **Positive**: Full audit trail via Git history; self-healing clusters; consistent multi-env deployments.
- **Negative**: Learning curve for teams used to imperative deploys; Sealed Secrets key rotation overhead.
- **Mitigation**: GitOps onboarding workshops; automated key rotation via CronJob.
