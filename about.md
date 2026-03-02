# About — Technology Radar & Decision Records

## Technology Radar, TDR, and ADR — How They Fit Together

The Gunvor Group technology governance framework uses three complementary instruments:

| Instrument | Purpose | Audience |
| --- | --- | --- |
| **Technology Radar** | A landscape view of technologies the organisation tracks, evaluates, and recommends. Think of it as the "what" — the technologies themselves. | All engineering staff |
| **Technology Decision Record (TDR)** | A **Global** decision set by the **Technology Advisory Group (TAG)**. TDRs define enterprise-wide mandates, standards, and guardrails that bind all teams. | TAG, Architecture Board, all teams |
| **Architecture Decision Record (ADR)** | A **project-** or **programme-level** decision made by the team or product stakeholders (SMEs). ADRs are always linked to a source project and one or more Architecturally Significant Requirements (ASRs). | Project/product teams |

> Both TDRs and ADRs live in this single registry. Filter by **scope-enterprise**,
> **scope-program**, or **scope-project** tags to navigate by governance level.

---

## The 6-Category Taxonomy

Decision records are organised into **six domain-aligned categories**. The addition
of **Operations & Reliability** ensures that "Day 2" concerns — how we *run* and
*observe* systems — have a seat at the architecture table alongside "Day 1" design.

| Category | Scope & Focus | Industry Alignment |
| --- | --- | --- |
| **Platform & Infrastructure** | Compute, networking, cloud providers, Kubernetes/orchestration, edge, HA/DR. | AWS/Azure Well-Architected |
| **Application Architecture** | Integration patterns, API strategy, microservices vs. monolith, modularisation. | TOGAF / ISO 42010 |
| **Data & Analytics** | Persistence (SQL/NoSQL), event streaming, AI/ML models, data governance. | DAMA-DMBOK |
| **Security & Compliance** | Identity (IAM), encryption, Zero Trust, regulatory controls (GDPR/SOC 2). | NIST / ISO 27001 |
| **Development Experience** | Languages, frameworks, CI/CD pipelines, testing tools, developer portals. | DORA / Team Topologies |
| **Operations & Reliability** | Observability (logging/tracing/metrics), SRE practices, FinOps, incident management. | Google SRE Book |

---

## The 4-Stage Lifecycle (Rings)

These four stages mirror the natural flow of technology adoption — keeping the
registry clean, actionable, and free of "analysis paralysis."

| Ring | Stage | Meaning |
| --- | --- | --- |
| **Assess** | Research | Under research or proof-of-concept. No production impact allowed yet. Evaluate feasibility, cost, and risk. |
| **Trial** | Validate | Low-risk production use. Limited to specific projects or early-adopter teams to prove value. |
| **Standard** | Golden Path | Recommended for all new workloads within the defined scope. The default choice unless a documented exemption exists. |
| **Sunset** | Retire | Formally deprecated. No new implementations. Existing workloads must have a migration or exit plan. |

**Typical flow**: Assess → Trial → Standard → (eventually) Sunset.

---

## The Feedback Loop

Technology decisions do not flow in one direction. There is a continuous feedback
loop between the Technology Radar, project-level ADRs, and enterprise-wide TDRs:

```text
  ┌─────────────────────────────────────────────────────────────┐
  │                    TECHNOLOGY RADAR                         │
  │         (landscape of technologies we track)                │
  └────────────┬──────────────────────────────────┬─────────────┘
               │ informs                          ▲ updates
               ▼                                  │
  ┌────────────────────────┐          ┌───────────┴────────────┐
  │  Project / Programme   │  pattern │  Enterprise TDR        │
  │  ADRs                  ├─────────►│  (Global, TAG-decided) │
  │  (team-level choices)  │ adoption │                        │
  └────────────────────────┘          └────────────────────────┘
```

1. **Radar → ADR**: A team evaluates a technology visible on the radar (e.g. Apache Kafka) and writes an ADR to adopt it for their project, anchored in a specific ASR.
2. **ADR → TDR**: When the TAG observes that multiple projects have independently adopted the same technology or pattern, it recognises the emerging standard and issues an enterprise-wide TDR to formalise it.
3. **TDR → Radar**: The new TDR creates or updates a blip on the Technology Radar, signalling the technology's endorsed status to the wider organisation.

### Concrete Example: Event-Driven Architecture & Kafka

Consider how event-driven architecture and Apache Kafka moved through the
governance cycle:

1. **Project ADR** — The Order Processing squad needed to decouple services to
   tolerate downstream outages. They wrote an ADR: *"Event-Driven Architecture
   for Order Processing"*, anchored in the ASR: *"The order workflow must
   tolerate downstream service outages of up to 30 minutes without data loss."*
   They chose Apache Kafka as the streaming platform.

2. **Pattern recognition** — Two more project teams (risk analytics, settlement
   reconciliation) independently adopted event-driven patterns with Kafka. The
   Data & Analytics Chapter noticed the convergence and proposed a
   product-programme ADR: *"Apache Kafka for Event Streaming"*.

3. **TAG adoption** — The Technology Advisory Group reviewed the three
   implementations, assessed operational maturity, and recognised Kafka as the
   de-facto standard. The TAG may issue an enterprise TDR: *"Kafka as Enterprise
   Event Streaming Platform"*, binding all new event-driven services to use
   Kafka on Azure (per the existing cloud mandate).

4. **Radar update** — The Technology Radar reflects the new status: "Kafka"
   moves from *Trial* to *Adopt*, visibly signalling the strategic direction
   to every engineer in the organisation.

---

## Governance: Who Decides?

### TDR — Technology Advisory Group (TAG)

- **Scope**: Enterprise / Global
- **Decided by**: Technology Advisory Group (TAG)
- **Binding**: All new services; existing services must comply on major version
  change or within 12 months of ratification
- **Purpose**: Define corporate-wide technology mandates, guardrails, and
  strategic direction
- **Examples**: Primary cloud provider, enterprise identity provider, encryption
  baselines, CI/CD platform migration

### ADR — Project Stakeholders & SMEs

- **Scope**: Project or Product/Programme
- **Decided by**: Project stakeholders, Subject Matter Experts, Chapter Leads
- **Binding**: Within the project or product boundary only
- **Anchored in**: One or more **Architecturally Significant Requirements (ASRs)** —
  non-functional or cross-cutting requirements that drive the decision
- **Always linked to**: A source **project** or **programme**
- **Examples**: Event-driven order processing, service-level database choice,
  team branching strategy

---

## The Unified Governance Matrix

This table visualises how a single taxonomy bridges the gap from a high-level
Enterprise TDR down to a detailed Project ADR:

| Level | Decision Type | Example Decision | Typical Category |
| --- | --- | --- | --- |
| **Enterprise** | **TDR** | "Azure is our primary Cloud Provider" | Platform & Infra |
| **Programme** | **ADR** | "All trading services must use Event Sourcing" | App Architecture |
| **Project** | **ADR** | "Use Apache Kafka for order-processing due to ASR-104 (Reliability)" | Data & Analytics |

---

## Cross-Tagging Strategy

Every decision record uses a **dual-tagging** approach to ensure discoverability
across governance levels and technical domains.

### A. Governance Tags (The "Who & Where")

| Tag | Meaning |
| --- | --- |
| `scope-enterprise` | Binding global standards (TDR). Also tagged `Global`. |
| `scope-program` | Shared standards for a specific product line. |
| `scope-project` | Local ADRs anchored in specific ASRs. |
| `compliance-high` | Decisions that satisfy specific regulatory audits (GDPR, SOC 2, ISO 27001). |

### B. Technical & Functional Tags (The "What")

| Domain | Example Tags |
| --- | --- |
| **Infrastructure** | `cloud-native`, `serverless`, `multi-cloud`, `on-prem` |
| **Data** | `acid`, `eventual-consistency`, `real-time`, `big-data` |
| **Interface** | `async`, `grpc`, `rest`, `events` |

---

## The Constraint Link

When writing a **Project or Programme ADR**, include the `constrainedBy` metadata
field to reference the enterprise TDR that constrains the decision. This provides
an immediate paper trail for auditors and future architects.

For example, if a project chooses Azure Database for PostgreSQL because the
enterprise TDR mandates Azure as the primary cloud provider, the ADR includes:

```yaml
constrainedBy: azure-primary-cloud
```

This creates a traceable chain: **Enterprise TDR → Programme ADR → Project ADR**,
ensuring every technology choice can be traced back to the strategic mandate that
enables or constrains it.

---

## Scope Levels

| Scope | Tags | Who decides | Binding on |
| --- | --- | --- | --- |
| **Enterprise** | `Global`, `scope-enterprise` | TAG | All teams and services |
| **Product / Programme** | `scope-program` | Product stakeholders, Chapter Leads | Teams within the product boundary |
| **Project** | `scope-project` | Project squad, Lead Architect | The specific project team |

**Promotion path**: recurring patterns flow **Project → Product/Programme → Enterprise**.
When a decision has cross-cutting impact, cost, security, or compliance implications,
it should be elevated to a TDR via the TAG.

---

## Compliance & Exemptions

### Binding rules for TDRs (Global / Standard ring)

- **New services** must comply with all Standard-ring TDRs at inception.
- **Existing services** must comply on **major version change** or within
  **12 months** of ratification, whichever comes first.
- Teams may request a **temporary exemption** via the TAG with documented
  justification and a compliance roadmap.

### Binding rules for ADRs

- ADRs bind the teams within the declared project or product scope.
- Teams must not contradict a Standard-ring enterprise TDR. If a project ADR
  conflicts with a Global TDR, the TDR takes precedence.

### Audit & traceability

Every record carries a release date, scope, deciding body, `constrainedBy` link,
and (for ADRs) the linked project and ASRs. The registry serves as the single
source of truth for technology decisions, supporting audit, onboarding, and
vendor due-diligence.

---

## Record Template

All decision records follow the **MADR** (Markdown Any Decision Record) format:

- **Frontmatter**: title, segment (category), ring (lifecycle stage), scope, tags
  (governance + technical), author, decidedBy, constrainedBy, and (for ADRs)
  project and asr
- **Applicability**: who must comply, constraint references, related records
- **Context**: forces, risks, and drivers behind the decision
- **Decision**: the chosen technology or pattern and its key principles
- **Consequences**: positive/negative outcomes and mitigations

---

## Contributing

To propose a new decision record, create a markdown file in the `tdr/` directory
of the [gg-techradar](https://github.com/GunvorGroup/gg-techradar) repository
following the existing frontmatter format and open a pull request.

- **TDRs** require TAG review and must include `scope: enterprise`, the
  `Global` tag, and the `scope-enterprise` tag.
- **ADRs** require project stakeholder review and must include `project`,
  `asr`, and `constrainedBy` fields in the frontmatter.
