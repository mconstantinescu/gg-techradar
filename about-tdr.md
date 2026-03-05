# About — Technology Decision Records

## What Are Decision Records?

Decision Records capture **why** a technology choice was made — the context,
constraints, alternatives, and consequences. They are the governance backbone
of the Gunvor Group Technology Portal.

The portal distinguishes two levels of decision:

| Type | Scope | Who Decides |
| --- | --- | --- |
| **Technology Decision Record (TDR)** | Enterprise / Global | Technology Advisory Group (TAG) |
| **Architecture Decision Record (ADR)** | Project or Programme | Project stakeholders & SMEs |

> Both TDRs and ADRs live in this single registry. Filter by
> **scope-enterprise**, **scope-program**, or **scope-project** tags to navigate
> by governance level.

---

## The 6 Domain Categories

Decision records are classified into six domain-aligned categories:

| Category | Scope & Focus |
| --- | --- |
| **Platform & Infrastructure** | Compute, networking, cloud providers, Kubernetes, HA/DR |
| **Application Architecture** | Integration patterns, API strategy, microservices, modularisation |
| **Data & Analytics** | Persistence, event streaming, AI/ML, data governance |
| **Security & Compliance** | IAM, encryption, Zero Trust, regulatory controls |
| **Development Experience** | Languages, frameworks, CI/CD, testing, developer portals |
| **Operations & Reliability** | Observability, SRE practices, FinOps, incident management |

---

## The 4-Stage Lifecycle (Rings)

Each decision record progresses through four stages that mirror technology
adoption:

| Ring | Stage | Meaning |
| --- | --- | --- |
| **Assess** | Research | Under evaluation. No production impact yet. |
| **Trial** | Validate | Approved for low-risk production use in specific projects. |
| **Standard** | Golden Path | Recommended for all new workloads within scope. The default choice. |
| **Sunset** | Retire | Deprecated. No new implementations; existing workloads need a migration plan. |

**Typical flow**: Assess → Trial → Standard → (eventually) Sunset.

---

## Governance Model

### TDR — Technology Advisory Group (TAG)

- **Scope**: Enterprise / Global
- **Binding**: All new services; existing services must comply on major version
  change or within 12 months of ratification
- **Purpose**: Corporate-wide mandates, guardrails, and strategic direction
- **Examples**: Primary cloud provider, enterprise identity provider, CI/CD
  platform migration

### ADR — Project Stakeholders & SMEs

- **Scope**: Project or Product/Programme
- **Binding**: Within the declared project or product boundary only
- **Anchored in**: Architecturally Significant Requirements (ASRs)
- **Examples**: Event-driven order processing, service-level database choice,
  team branching strategy

---

## Cross-Tagging Strategy

Every record uses dual-tagging for discoverability:

**Governance tags** — `scope-enterprise`, `scope-program`, `scope-project`,
`compliance-high`

**Technical tags** — `cloud-native`, `serverless`, `async`, `grpc`, `rest`,
`events`, `acid`, `eventual-consistency`, etc.

---

## The Constraint Link

Project and programme ADRs include a `constrainedBy` field that references the
enterprise TDR constraining the decision. This creates a traceable chain:

**Enterprise TDR → Programme ADR → Project ADR**

---

## Compliance & Exemptions

- **New services** must comply with all Standard-ring TDRs at inception.
- **Existing services** must comply on major version change or within 12 months.
- Teams may request a **temporary exemption** via the TAG with documented
  justification and a compliance roadmap.
- ADRs must not contradict a Standard-ring TDR — the TDR takes precedence.

---

## The Feedback Loop

```text
  ┌───────────────────────────────────────────────────────────┐
  │                   TECHNOLOGY RADAR                        │
  │        (landscape of technologies we track)               │
  └──────────┬──────────────────────────────────┬─────────────┘
             │ informs                          ▲ updates
             ▼                                  │
  ┌──────────────────────────┐      ┌───────────┴──────────────┐
  │  Project / Programme     │ ───► │  Enterprise TDR          │
  │  ADRs                    │      │  (Global, TAG-decided)   │
  └──────────────────────────┘      └──────────────────────────┘
             │                                  │
             ▼                                  ▼
  ┌───────────────────────────────────────────────────────────┐
  │                TECHNICAL DOCUMENTATION                    │
  │    (golden paths, SOPs, blueprints, policies)             │
  └───────────────────────────────────────────────────────────┘
```

1. **Radar → ADR**: Teams evaluate technologies on the radar and write ADRs for their projects.
2. **ADR → TDR**: When multiple projects independently adopt the same pattern, the TAG formalises it as a TDR.
3. **TDR → Radar**: The TDR updates the radar blip, signalling the endorsed status.
4. **Decisions → Docs**: Approved decisions generate documentation — golden paths, SOPs, and reference architectures.

---

## Connected Sections

- **[Technology Radar](/radar/)** — the "what": technologies we track and recommend.
  [About the Radar →](/radar/about/)
- **[Technical Documentation](/docs/)** — the "how": golden paths, SOPs, blueprints, and policies.
  [About Docs →](/docs/about/)

Together: **Radar** (what) → **Decisions** (why) → **Docs** (how).

---

## Record Template

All records follow the **MADR** (Markdown Any Decision Record) format:

- **Frontmatter**: title, segment (category), ring (lifecycle), scope, tags,
  author, decidedBy, constrainedBy, project, asr
- **Applicability**: who must comply, constraint references
- **Context**: forces, risks, and drivers
- **Decision**: chosen technology/pattern and key principles
- **Consequences**: positive/negative outcomes and mitigations

---

## Contributing

To propose a new decision record, create a markdown file in the latest edition
folder of the [Decisions repository](https://dev.azure.com/ADOGnvTest/Technology/_git/Decisions)
and open a pull request.

- **TDRs** require TAG review and must include `scope: enterprise` and the
  `Global` tag.
- **ADRs** require project stakeholder review and must include `project`, `asr`,
  and `constrainedBy` fields.

---

## More Information

- [Technology Portal Home](/)
- [About the Portal](/about/)
- [Contacts](/contacts/)
