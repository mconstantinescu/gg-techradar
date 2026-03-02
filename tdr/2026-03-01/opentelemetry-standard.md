---
title:      "OpenTelemetry as Observability Standard"
segment:    operations-and-reliability
ring:       standard
flag:       new
tags:       [Global, scope-enterprise, monitoring, tracing, logging]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and applies to all production services.
- All new services must instrument with OpenTelemetry SDKs by default.

## Context

Vendor-specific instrumentation libraries created lock-in and inconsistent telemetry data across teams. OpenTelemetry provides a vendor-neutral standard for metrics, logs, and traces.

## Decision

All services must use **OpenTelemetry** SDKs and the **OTel Collector** for telemetry:

- **Auto-instrumentation** for supported languages (Java, .NET, Node.js, Python)
- **OTel Collector** deployed as a DaemonSet for telemetry routing
- **OTLP** as the standard export protocol to Grafana Tempo, Loki, and Prometheus
- **Semantic conventions** for consistent attribute naming

## Consequences

- **Positive**: Vendor-neutral instrumentation; consistent telemetry; easy backend switching.
- **Negative**: SDK maturity varies by language; configuration complexity.
- **Mitigation**: Shared OTel Collector config via Helm chart; language-specific quickstart guides.
