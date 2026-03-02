---

title:      "Serverless"
ring:       adopt
segment:    methods-and-patterns
tags:       [devops]
featured:   false
author:     Gunvor Group Technology Team
---
The serverless pattern (Function as a Service) enables developers to focus on business logic while the cloud provider manages infrastructure, scaling, and availability. It is well-suited for event-driven workloads, short-lived compute tasks, API backends, and cost-sensitive applications that benefit from pay-per-invocation pricing.

At Gunvor Group, we use serverless primarily via [Azure Functions](/platforms-and-services/azure-functions/) and selectively via AWS Lambda. We pair serverless functions with managed services (queues, event grids, storage) to build loosely coupled, scalable systems. For orchestration of multi-step workflows, we use Durable Functions and Step Functions. Teams evaluating serverless should consider cold-start latency, vendor lock-in, and debugging complexity alongside the operational benefits.
