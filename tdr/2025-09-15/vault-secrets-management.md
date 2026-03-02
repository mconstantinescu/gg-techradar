---
title:      "HashiCorp Vault for Secrets Management"
segment:    security-and-compliance
ring:       sunset
flag:       changed
tags:       [Global, scope-enterprise, compliance-high, secrets, encryption]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and **binding** on all services
  that consume secrets (API keys, database credentials, TLS
  certificates, encryption keys).
- No service may store secrets in environment variables, config files,
  or source control.
- References Enterprise ADR: *Azure as Primary Cloud Provider* (Vault
  auto-unseal via Azure Key Vault).

## Context

Secrets are currently scattered across Azure Key Vault instances,
Kubernetes Secrets (base64-encoded, not encrypted at rest by default),
`.env` files, and CI variable stores. There is no consistent rotation
policy, no dynamic credential issuance, and auditing which service
accessed which secret requires correlating multiple log sources.

## Decision

We adopt **HashiCorp Vault** (self-hosted on AKS, HA mode with Raft
storage) as the centralised secrets management platform:

- **Dynamic secrets** for databases (PostgreSQL, Redis) — short-lived
  credentials issued on demand, auto-revoked on TTL expiry
- **PKI secrets engine** for internal mTLS certificate issuance
- **Transit engine** for application-layer encryption (encrypt/decrypt
  API without exposing raw keys)
- **Kubernetes auth method** — pods authenticate via ServiceAccount
  tokens; no static credentials needed
- **Audit logging** to Elasticsearch — every secret access is recorded
  with caller identity and timestamp
- **Auto-unseal** via Azure Key Vault — eliminates manual unseal
  ceremony after pod restarts

## Consequences

- **Positive**: Zero standing credentials; automated rotation; unified
  audit trail; encryption-as-a-service reduces crypto misuse.
- **Negative**: Vault is a critical-path dependency; operational
  complexity of self-hosting; policy-as-code learning curve (HCL).
- **Mitigation**: HA deployment with automated failover; disaster
  recovery snapshots to Azure Blob; on-call rotation with Vault
  expertise; evaluate HCP Vault as managed alternative.
