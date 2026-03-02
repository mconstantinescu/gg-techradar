---

title:      "Diagrams as Code"
ring:       adopt
segment:    methods-and-patterns
tags:       [architecture, documentation, quality assurance]
featured:   false
author:     Gunvor Group Technology Team
---
Treating diagrams as code — versioned, reviewable, and generated from text — increases transparency, collaboration, and productivity. The textual representation is easy to write and diff, and generating graphical output (SVG, PNG) is straightforward with the associated toolchains.

We extensively use tools such as [Mermaid](https://mermaid.js.org/) (natively supported by GitHub, GitLab, and Notion), [PlantUML](https://plantuml.com/) in combination with [AsciiDoc](/tools/asciidoc/), [D2](https://d2lang.com/) for readable scripted diagrams, and [Structurizr](https://structurizr.com/) for C4-model architecture views. At Gunvor Group, diagrams-as-code is the default approach for architecture documentation, decision records, and system context views.
