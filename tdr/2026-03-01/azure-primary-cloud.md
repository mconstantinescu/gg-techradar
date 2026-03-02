---
title:      "Azure as Primary Cloud Provider"
segment:    platform-and-infrastructure
ring:       trial
tags:       [Global, scope-enterprise, cloud-native, multi-cloud]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and **binding** on all net-new services.
- Existing services must comply on major version change or within 12 months
  unless a formally approved exception exists.
- Project and Product ADRs **must reference** this record when making
  cloud-related choices.

## Context

Gunvor Group operates globally and requires a cloud platform that delivers
enterprise-grade compliance (SOC 2, ISO 27001), strong hybrid-cloud support
for on-premises trading systems, and broad regional availability across
EMEA, APAC, and the Americas. Standardising on a single primary cloud
reduces vendor sprawl, simplifies governance, and enables shared platform
engineering investments.

## Decision

We adopt **Microsoft Azure** as the primary cloud provider for all new
workloads. Key drivers:

- **Compliance coverage** — Azure meets our regulatory needs across all
  operating regions with built-in compliance tooling (Defender for Cloud,
  Policy).
- **Hybrid integration** — Azure Arc and ExpressRoute provide seamless
  connectivity to existing on-premises infrastructure.
- **Enterprise agreement** — consolidated billing and committed-use
  discounts at the organisational level.
- **Identity alignment** — Entra ID (Azure AD) is already the corporate
  directory, reducing identity-federation complexity.

AWS or GCP may be used for specific edge cases (e.g., ML workloads, SaaS
vendor requirements) but require Architecture Board approval.

## Consequences

- **Positive**: Single pane of glass for governance; simplified networking;
  consolidated cost management; deeper integration with M365 ecosystem.
- **Negative**: Vendor concentration risk; some niche services may be
  weaker than competitor equivalents.
- **Mitigation**: Maintain cloud-agnostic abstractions (Terraform, Kubernetes)
  at the infrastructure layer to preserve portability for critical workloads.
