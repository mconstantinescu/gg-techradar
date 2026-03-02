---
title:      "Keycloak as Enterprise Identity Provider"
segment:    security-and-compliance
ring:       standard
flag:       new
tags:       [Global, scope-enterprise, compliance-high, identity, authentication]
scope:      enterprise
author:     Gunvor Group Technology Team
decidedBy:  Technology Advisory Group (TAG)
---

## Applicability

- This record is **Enterprise scope** and **binding** on all services
  requiring user authentication or service-to-service identity.
- Existing services using custom auth must migrate within 12 months.
- Project ADRs **must reference** this record for any authentication
  design decisions.

## Context

Multiple authentication mechanisms exist across the organisation:
LDAP-backed form login, per-app OAuth integrations with Azure AD, and
a legacy SAML IdP for back-office tools. This fragmentation creates
security blind spots (inconsistent session management, no centralised
MFA enforcement) and a poor user experience (multiple passwords, no
SSO). Regulatory audits consistently flag the lack of a unified
identity layer.

## Decision

We adopt **Keycloak** (self-hosted on AKS) as the enterprise identity
provider and authentication broker:

- **OIDC** as the standard protocol for all applications —
  SAML adapters for legacy systems that cannot migrate immediately
- **Azure AD federation** — corporate directory remains the user store;
  Keycloak brokers to Azure AD via OIDC
- **MFA enforcement** — TOTP/FIDO2 required for all human users;
  service accounts use client-credential grants with mTLS
- **Centralised session management** — single sign-on (SSO) and single
  sign-out across all integrated applications
- **Realm-per-product** model with shared enterprise realm for
  cross-cutting policies

## Consequences

- **Positive**: Unified SSO; centralised MFA; consistent session policy;
  simplified audit trail; reduced attack surface.
- **Negative**: Keycloak becomes a critical dependency — outage affects
  all services; operational overhead of self-hosting.
- **Mitigation**: HA deployment (multi-replica, cross-AZ); automated
  backup/restore of realm configuration; runbook for emergency bypass;
  evaluate managed Keycloak (e.g., Phase Two) as future option.
