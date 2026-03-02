---
title:      "Azure Key Vault for Secrets Management"
segment:    security-and-compliance
ring:       standard
flag:       new
tags:       [Global, scope-enterprise, compliance-high, secrets, azure]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and **supersedes** the HashiCorp Vault TDR.
- All services that consume secrets must migrate to Azure Key Vault by Q3 2026.

## Context

The operational burden of self-hosted HashiCorp Vault — including HA management, unsealing ceremonies, and Raft storage maintenance — has proven costly relative to the benefits. Azure Key Vault provides native integration with our Azure-first platform, Entra ID-based access control, and zero operational overhead.

## Decision

We adopt **Azure Key Vault** as the standard secrets management platform:

- **Managed HSM** for high-security key operations
- **RBAC via Entra ID** — no separate policy language (replaces Vault HCL policies)
- **Private endpoints** — secrets never traverse public networks
- **Automatic rotation** for storage account keys and SQL credentials
- **CSI Secret Store Driver** for Kubernetes pod injection (replaces Vault Agent)

## Consequences

- **Positive**: Zero operational overhead; native Azure integration; simplified RBAC; automatic key rotation.
- **Negative**: Less flexibility than Vault for dynamic secrets; no transit encryption engine equivalent.
- **Mitigation**: Use application-level encryption libraries where transit engine was used; evaluate Managed HSM for advanced crypto operations.
