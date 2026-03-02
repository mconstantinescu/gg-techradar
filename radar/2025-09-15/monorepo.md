---

title:      "Monorepo"
ring:       adopt
segment:    methods-and-patterns
tags:       [coding]
featured:   false
author:     Gunvor Group Technology Team
---
A monorepo approach — storing multiple related projects in a single repository — offers significant benefits for our React and Next.js-based frontend ecosystem: efficient code sharing, consistent development environments, simplified dependency management, streamlined CI/CD pipelines, and easier cross-project refactoring.

At Gunvor Group, we use monorepo tooling (Nx, Turborepo) to manage build graphs, caching, and affected-project detection. However, monorepos are not a one-size-fits-all solution; they work best when projects share significant code, tooling, or deployment infrastructure. For isolated services with independent lifecycles, separate repositories may be more appropriate.
