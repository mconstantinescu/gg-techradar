---
title:      "Centralised Observability Platform"
segment:    operations-and-reliability
ring:       trial
flag:       new
tags:       [Global, scope-enterprise, monitoring, logging, tracing]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and applies to all production services.

## Context

Observability data is fragmented across tools: Azure Monitor for infrastructure, application-specific logging, and ad-hoc Grafana dashboards. Correlating metrics, logs, and traces requires manual effort.

## Decision

We are trialling a **unified observability platform** based on:

- **Grafana** for dashboarding (shared instance, team-scoped folders)
- **Prometheus / Azure Monitor Metrics** for metrics collection
- **Grafana Loki** for log aggregation
- **Grafana Tempo** for distributed tracing (OpenTelemetry-based)

## Consequences

- **Positive**: Single-pane-of-glass; correlated signals; reduced tool sprawl.
- **Negative**: Migration effort from existing monitoring setups; Loki query learning curve.
- **Mitigation**: Phased rollout starting with new services; training sessions.
