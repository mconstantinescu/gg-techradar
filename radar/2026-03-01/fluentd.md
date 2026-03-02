---

title:      "Fluentd"
ring:       hold
segment:    tools
tags:       [devops]
featured:   false
author:     Gunvor Group Technology Team
---
[Fluentd](https://www.fluentd.org) is a mature log-collection and routing tool. While it remains functional and well-supported, we have largely transitioned to [Grafana Loki and Promtail](/platforms-and-services/loki/) for log aggregation. The pull-based model, native Kubernetes integration, and simpler operational footprint of Loki better suit our observability strategy.

We also found that extensive upfront log parsing — a common Fluentd pattern — carries a risk of losing logs and requires significant configuration effort. For new projects, Fluentd is not recommended; existing deployments should plan migration to the Loki stack.
