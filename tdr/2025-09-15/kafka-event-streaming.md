---
title:      "Apache Kafka for Event Streaming"
segment:    data-and-analytics
ring:       trial
flag:       new
tags:       [Global, scope-program, event-driven, messaging]
scope:      program
author:     Gunvor Group Technology Team
decidedBy:  Architecture Board
---

## Applicability

- This record is **Program scope** for the Trading Platform programme.

## Context

Point-to-point integrations between trading, risk, and settlement systems create a fragile, hard-to-scale coupling. Event streaming provides durable, ordered, replay-capable message delivery.

## Decision

We trial **Apache Kafka** (Confluent Cloud managed) for inter-service event streaming in the Trading Platform programme:

- **Event-carried state transfer** for position and trade updates
- **Kafka Connect** for CDC from legacy databases
- **Schema Registry** with Avro for contract enforcement

## Consequences

- **Positive**: Decoupled services; event replay for debugging; real-time analytics pipeline.
- **Negative**: Operational complexity; eventual consistency requires design discipline.
- **Mitigation**: Managed Confluent Cloud reduces ops burden; team training on event-driven patterns.
