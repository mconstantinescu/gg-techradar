---
title:      "PostgreSQL as Default RDBMS"
segment:    data-and-analytics
ring:       standard
flag:       new
tags:       [scope-program, acid, persistence, postgresql]
scope:      product-program
author:     Gunvor Group Technology Team
decidedBy:  Trading Platform Architecture Board
project:    Gunvor Trading Platform
constrainedBy: azure-primary-cloud
---

## Applicability

- This record is **Product/Program scope** and binds all teams needing
  a relational database within the trading platform.
- Constrained by Enterprise ADR: *Azure as Primary Cloud Provider*
  (use Azure Database for PostgreSQL — Flexible Server).
- Project ADRs may specify schema design and replication topology but
  **must** use PostgreSQL unless an exemption is granted.

## Context

Teams have independently adopted PostgreSQL, MySQL, and SQL Server for
relational workloads. This diversity increases operational overhead
(different backup strategies, monitoring dashboards, DBA expertise),
complicates cross-service joins and reporting, and fragments the
talent pool. A 2024 internal survey showed 70% of services already
use PostgreSQL, making it the de-facto standard.

## Decision

We standardise on **PostgreSQL** (latest stable, currently 16.x) as
the default RDBMS:

- **Azure Database for PostgreSQL — Flexible Server** as the managed
  deployment target (HA with zone-redundant standby)
- **Connection pooling** via PgBouncer sidecar for high-concurrency
  services
- **Logical replication** for cross-service read replicas where
  eventual consistency is acceptable
- **Extensions whitelist**: `pg_stat_statements`, `pgcrypto`, `uuid-ossp`,
  `postgis` (geo workloads only) — others require DBA approval
- **Dynamic credentials** via Vault (see Enterprise ADR: *HashiCorp
  Vault for Secrets Management*)

## Consequences

- **Positive**: Unified DBA expertise; consistent backup/restore
  procedures; single monitoring stack; strong ecosystem and community.
- **Negative**: Not ideal for every workload (time-series → TimescaleDB
  extension; document store → consider Cosmos DB with exemption).
- **Mitigation**: Allow exemptions via Architecture Board for justified
  use cases; provide extension-approved path for specialised needs.
