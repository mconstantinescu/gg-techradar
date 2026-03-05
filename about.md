# About the Technology Radar

## What Is the Technology Radar?

The Gunvor Group Technology Radar provides an at-a-glance landscape of the
technologies the organisation tracks, evaluates, and recommends. Think of it
as the **"what"** — the technologies themselves, classified across four quadrants
and four adoption rings.

For the full governance framework — including Decision Records and Documentation — see
the [Technology Portal About page](/about/).

---

## The 4 Quadrants

| Quadrant | What It Covers |
| --- | --- |
| **Methods & Patterns** | Development practices, architectural patterns, team methodologies |
| **Tools** | Build tools, testing tools, CI/CD, developer productivity |
| **Platforms & Operations** | Cloud platforms, orchestration, observability, SRE tooling |
| **Languages & Frameworks** | Programming languages, web frameworks, SDKs, libraries |

---

## The 4 Adoption Rings

| Ring | Meaning |
| --- | --- |
| **Adopt** | Proven in production. Recommended for broad use. |
| **Trial** | Worth pursuing. Try in a low-risk production project to build experience. |
| **Assess** | Worth exploring. Research and prototype, but not yet ready for production. |
| **Hold** | Proceed with caution. Not recommended for new projects; review existing usage. |

---

## Flags (Change Indicators)

Each blip on the radar carries a flag that indicates its movement since the last edition:

| Flag | Shape | Meaning |
| --- | --- | --- |
| **New** | ▲ Triangle | Newly added to the radar this edition |
| **Changed** | ◆ Diamond | Ring changed since the previous edition (promoted or demoted) |
| **Default** | ● Circle | No change since the previous edition |

---

## How to Read the Radar

1. **Explore by quadrant** to see technologies grouped by domain.
2. **Filter by ring** to discover what's recommended (Adopt) vs. what to avoid (Hold).
3. **Check the flag** to see what's new or has recently changed.
4. Click any blip to read the detailed assessment — context, rationale, and related links.

---

## Connected Sections

The Technology Radar is one pillar of the governance framework. See also:

- **[Decision Records](/decisions/)** — enterprise-wide TDRs and project-level ADRs that capture the "why" behind technology choices. [About Decisions →](/decisions/about/)
- **[Technical Documentation](/docs/)** — golden paths, SOPs, blueprints, and policies that describe "how" to implement. [About Docs →](/docs/about/)

Together: **Radar** (what) → **Decisions** (why) → **Docs** (how).

---

## Contributing

To add or update a technology blip, create a markdown file in the latest edition
folder of the [Radar repository](https://dev.azure.com/ADOGnvTest/Technology/_git/Radar)
and open a pull request.

Each blip requires frontmatter with `title`, `ring`, `quadrant`, and optional
`tags`, `flag`, and `featured` fields.

---

## More Information

- [Technology Portal Home](/)
- [About the Portal](/about/)
- [Contacts](/contacts/)
