---
title:      "Unified Observability Platform"
segment:    operations-and-reliability
ring:       trial
tags:       [Global, scope-enterprise, observability, monitoring, opentelemetry]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Platform Engineering Lead
---

## Applicability

- This record is **Enterprise scope** and applies to all production services.
- Currently in **Trial** — platform team and two product teams piloting the unified stack.

## Context

Monitoring tools have proliferated across teams — some use Datadog, others Prometheus+Grafana, a few rely on Azure Monitor alone. This fragmentation makes cross-service debugging difficult and increases licensing costs.

## Decision

Consolidate on a **unified observability platform**:

- **OpenTelemetry** as the single instrumentation standard (traces, metrics, logs)
- **Grafana stack** (Loki, Tempo, Mimir) as the backend, self-hosted on AKS
- **Standardised dashboards** per service tier (gold/silver/bronze SLO templates)
- **Alerting** via Grafana Alerting with PagerDuty integration for on-call
- **Migration path**: new services must use OTel SDK; existing services migrate within 6 months of standard adoption

## Consequences

- **Positive**: Single pane of glass; reduced vendor costs; consistent SLO tracking; faster incident resolution.
- **Negative**: Migration effort for existing instrumentation; Grafana stack operational overhead.
- **Mitigation**: OTel auto-instrumentation for Java/Python reduces manual effort; dedicated SRE capacity for Grafana operations.
