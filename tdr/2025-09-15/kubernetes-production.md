---
title:      "Kubernetes for Production Workloads"
segment:    platform-and-infrastructure
ring:       standard
tags:       [scope-project, cloud-native, containers, kubernetes]
scope:      project
author:     Gunvor Group Technology Team
decidedBy:  Platform Engineering Team
project:    Trading Platform Infrastructure
asr:        "Production services must support horizontal scaling to handle peak trading volumes (10x baseline) with sub-second auto-scale response."
constrainedBy: azure-primary-cloud
---

## Applicability

- This record is **Project scope** and binds the platform engineering team.
- Anchored in ASR: *"Production services must support horizontal scaling to
  handle peak trading volumes (10× baseline) with sub-second auto-scale
  response."*

## Context

The trading platform requires elastic scaling during volatile market
conditions. VM-based deployments cannot scale fast enough, and managing
heterogeneous deployment targets (VMs, PaaS, serverless) increases
operational overhead. The team needs a consistent container orchestration
layer that integrates with our Azure-first cloud strategy (see ADR:
*Azure as Primary Cloud Provider*).

## Decision

We adopt **Azure Kubernetes Service (AKS)** as the container orchestration
platform for all production workloads:

- **AKS managed clusters** with node auto-scaling and automatic upgrades
- **Helm charts** as the standard packaging format for service deployments
- **Horizontal Pod Autoscaler (HPA)** configured against custom metrics
  from Prometheus
- **Network policies** enforced via Calico for workload isolation

## Consequences

- **Positive**: Sub-second scaling; consistent deployment model across all
  services; strong ecosystem for observability and service mesh.
- **Negative**: Steep learning curve for teams unfamiliar with K8s;
  increased YAML complexity; cluster management overhead.
- **Mitigation**: Provide internal training programme; establish golden-path
  Helm templates; centralise cluster operations in the platform team.
