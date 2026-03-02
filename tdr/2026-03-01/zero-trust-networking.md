---
title:      "Zero Trust Network Architecture"
segment:    security-and-compliance
ring:       assess
flag:       new
tags:       [Global, scope-enterprise, security, zero-trust, networking]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  CISO Office
---

## Applicability

- This record is **Enterprise scope** and applies to all network architecture decisions.
- Currently **Under Assessment** — POC running with the trading platform network segment.

## Context

Traditional perimeter-based security assumes trust within the corporate network. With remote work, cloud workloads, and increasing sophistication of threats, this model is insufficient. Zero Trust assumes no implicit trust regardless of network location.

## Decision

Evaluate and pilot **Zero Trust Network Architecture** (ZTNA):

- **Identity-based access** — every request authenticated and authorized regardless of source network
- **Microsegmentation** — workload-to-workload communication explicitly allowed, default deny
- **Continuous verification** — device posture, user context, and risk signals evaluated per request
- **Azure Conditional Access + Entra ID** as the identity backbone
- **POC scope**: Trading platform APIs and internal developer portals

## Consequences

- **Positive**: Reduced blast radius; better compliance posture; location-independent security.
- **Negative**: Complexity in policy management; potential latency from additional auth checks; legacy system integration.
- **Mitigation**: Phased rollout segment-by-segment; policy-as-code for manageability; legacy gateway pattern for older systems.
