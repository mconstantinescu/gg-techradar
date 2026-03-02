---
title:      "Event-Driven Architecture for Order Processing"
segment:    application-architecture
ring:       standard
tags:       [scope-project, events, async, eda]
scope:      project
author:     Gunvor Group Technology Team
decidedBy:  Order Processing Squad
project:    Trade Order Management System (TOMS)
asr:        "The order workflow must tolerate downstream service outages of up to 30 minutes without data loss or duplicate execution."
constrainedBy: azure-primary-cloud
---

## Applicability

- This record is **Project scope** and binds the order-processing squad.
- Anchored in ASR: *"The order workflow must tolerate downstream service
  outages of up to 30 minutes without data loss or duplicate execution."*
- References Product ADR: *Apache Kafka for Event Streaming*.

## Context

The order-processing pipeline spans multiple bounded contexts (pricing,
risk, settlement). Synchronous REST calls between these services create
tight coupling: a settlement outage causes cascading failures back to the
order-entry UI. The team needs a pattern that decouples producers from
consumers and guarantees at-least-once delivery during transient failures.

## Decision

We adopt an **event-driven architecture** (EDA) within the order-processing
domain:

- **Domain events** represent facts that have occurred (e.g.,
  `OrderPlaced`, `RiskAssessed`, `TradeSettled`) — past-tense naming
- Events are published to **Kafka topics** partitioned by order ID for
  ordering guarantees
- **Event schemas** are versioned via Avro and published to a shared
  schema registry
- **Idempotent consumers** ensure at-least-once delivery is safe
- **Saga orchestrator** coordinates multi-step workflows with
  compensating actions on failure

## Consequences

- **Positive**: Services evolve independently; fault isolation during
  downstream outages; natural audit trail via event log; elastic
  throughput via partition scaling.
- **Negative**: Eventual consistency requires careful UI handling;
  debugging distributed flows is harder; saga complexity grows with
  workflow steps.
- **Mitigation**: Invest in distributed tracing (OpenTelemetry) and a
  correlation-ID standard; provide saga-state visibility via a dashboard.
