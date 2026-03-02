---
title:      "Container Security Scanning"
ring:       adopt
flag:       new
segment:    methods-and-patterns
tags:       [devops, security]
featured:   false
author:     Gunvor Group Technology Team
---

Container security scanning encompasses tools and practices for identifying vulnerabilities in container images, base layers, and runtime configurations. We integrate scanning at multiple stages: build-time (image vulnerability scanning), registry-level (admission control), and runtime (drift detection).

At Gunvor Group, we use Trivy for CI pipeline scanning, Microsoft Defender for Containers in AKS, and Dependabot for base-image update alerts. Every container image must pass a vulnerability scan before promotion to production registries. This layered approach ensures that known vulnerabilities are caught early and mitigated systematically.
