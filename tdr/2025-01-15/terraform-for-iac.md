---
title:      "Terraform for Infrastructure as Code"
segment:    platform-and-infrastructure
ring:       standard
flag:       new
tags:       [scope-program, cloud-native, iac, terraform]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  Platform Engineering Lead
project:    Gunvor Trading Platform
constrainedBy: azure-primary-cloud
---

## Applicability

- This record is **Product/Program scope** and binds all teams within the
  trading platform product suite.
- Constrained by Enterprise ADR: *Azure as Primary Cloud Provider*.
- Project ADRs may extend this with module-specific conventions.

## Context

Multiple teams provision Azure resources independently using a mix of ARM
templates, CLI scripts, and portal clicks. This leads to configuration
drift, undocumented infrastructure, and inconsistent tagging/compliance.
A single Infrastructure-as-Code tool must be standardised across the
product to enable peer review, drift detection, and reproducible
environments.

## Decision

We adopt **Terraform** (OpenTofu-compatible) as the standard IaC tool for
all infrastructure provisioning:

- **Terraform modules** published to an internal registry for reusable
  patterns (AKS cluster, PostgreSQL, Key Vault, networking)
- **Remote state** stored in Azure Storage with state locking
- **Plan-and-apply** workflow enforced via CI — no manual `terraform apply`
  against production
- **Policy-as-code** via OPA/Conftest to enforce tagging, region, and SKU
  guardrails before apply

## Consequences

- **Positive**: Reproducible environments; infrastructure peer review;
  drift detection; self-documenting topology.
- **Negative**: HCL learning curve for teams accustomed to ARM;
  state-management complexity; provider version churn.
- **Mitigation**: Provide starter templates; enforce version pinning in
  CI; schedule quarterly provider-upgrade sprints.
