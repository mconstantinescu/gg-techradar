---
title:      "Cloud-First Strategy"
segment:    platform-and-infrastructure
ring:       standard
flag:       new
tags:       [Global, scope-enterprise, cloud-native]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and binds all new application development.

## Context

Legacy on-premises infrastructure limits agility, scalability, and cost efficiency. A cloud-first strategy mandates that new workloads are designed for the cloud by default.

## Decision

All new applications and services **must target cloud deployment** (Azure preferred) unless a documented exception exists. On-premises deployment is permitted only for workloads with regulatory, latency, or data-sovereignty constraints that cannot be met in the cloud.

## Consequences

- **Positive**: Faster provisioning; elastic scaling; reduced capital expenditure; alignment with Azure-first strategy.
- **Negative**: Requires cloud-native skills; potential data-residency challenges for specific jurisdictions.
- **Mitigation**: Cloud training programme; data-classification framework to identify exceptions early.
