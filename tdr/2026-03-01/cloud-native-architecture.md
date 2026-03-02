---
title:      "Cloud-Native Application Architecture"
segment:    application-architecture
ring:       trial
flag:       new
tags:       [Global, scope-enterprise, cloud-native, microservices, twelve-factor]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and applies to all new application development.
- Currently in **Trial** — three pilot services have been rebuilt using cloud-native patterns; broader rollout pending results.

## Context

Monolithic applications are difficult to scale independently, deploy frequently, and evolve without risk. Cloud-native patterns enable teams to build resilient, scalable, and independently deployable services.

## Decision

New applications should follow **cloud-native architecture** principles:

- **Twelve-Factor App** methodology as the baseline design checklist
- **Containerized** from day one — no VM-only deployments for new services
- **Service mesh** (Linkerd) for observability and mTLS between services
- **Event-driven communication** via Kafka for async workflows
- **Health probes, graceful shutdown**, and circuit breakers as non-negotiable patterns

## Consequences

- **Positive**: Independent scaling; faster deployments; resilience by design; technology diversity per service.
- **Negative**: Distributed system complexity; debugging across services; eventual consistency challenges.
- **Mitigation**: Distributed tracing (OpenTelemetry); standardised service templates; team topology alignment.
