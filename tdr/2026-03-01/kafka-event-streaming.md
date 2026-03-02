---
title:      "Apache Kafka for Event Streaming"
segment:    data-and-analytics
ring:       trial
tags:       [scope-program, events, real-time, async, kafka]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  Data & Integration Chapter
project:    Gunvor Trading Platform
constrainedBy: azure-primary-cloud
---

## Applicability

- This record is **Product/Program scope** and would bind all teams
  needing asynchronous messaging or event streaming within the trading
  platform.
- Currently **Proposed** — pilot running with the order-processing squad.
- References Project ADR: *Event-Driven Architecture for Order
  Processing*.
- Constrained by Enterprise ADR: *Azure as Primary Cloud Provider*.

## Context

The trading platform currently uses RabbitMQ for message queuing.
While RabbitMQ handles point-to-point and pub/sub well, it lacks
native support for event replay, durable log retention, and high-
throughput partitioned consumption needed by the growing number of
event-driven services. Multiple teams have requested a streaming
platform that supports consumer-group rebalancing, exactly-once
semantics, and long-term event retention for audit and analytics.

## Decision

We propose adopting **Apache Kafka** (via Confluent Platform on AKS,
or Azure Event Hubs with Kafka protocol) as the standard event
streaming platform:

- **Topic-per-aggregate** naming convention aligned with domain events
- **Avro schemas** with Confluent Schema Registry for contract
  enforcement and backward/forward compatibility
- **Consumer groups** per service — each service owns its offset
  management
- **Retention policy**: 7 days for operational topics; 90 days for
  audit/compliance topics; infinite for regulatory-required streams
- **Connect framework** for CDC (Change Data Capture) from PostgreSQL
  to analytics pipelines

RabbitMQ remains for lightweight request-reply and task-queue patterns
where Kafka's overhead is unjustified.

## Consequences

- **Positive**: Event replay for new consumers; high throughput at
  scale; decoupled analytics pipeline; audit-grade event retention.
- **Negative**: Operational complexity (ZooKeeper/KRaft, broker sizing,
  partition rebalancing); higher resource footprint than RabbitMQ;
  learning curve.
- **Mitigation**: Evaluate Azure Event Hubs (Kafka-compatible, fully
  managed) to reduce ops burden; provide internal Kafka training;
  establish golden-path topic templates.
