---
title:      "SST"
segment:    platforms-and-services
ring:       trial
flag:       changed
tags:       [devops, frontend]
author:     Gunvor Group Technology Team
---

[SST (Serverless Stack)](https://sst.dev/docs) is an [Infrastructure as Code](/methods-and-patterns/infrastructure-as-code/) tool built on top of open-source components from [Pulumi](/tools/pulumi/) and [Terraform](/tools/terraform/).

Specifically designed for front-end developers, SST enables them to work within their familiar environment while leveraging AWS or other cloud platforms. It simplifies common tasks, such as managing secrets and deployments, and accelerates development with prebuilt components for authentication, email, and cron jobs.

At Gunvor Group, SST is currently used by members of the Frontend Community of Interest (CoI) to deploy private projects and has also been adopted for our internal table tennis app.

We recommend evaluating SST for projects where frontend developers are expected to manage serverless infrastructure or where rapid deployment of serverless applications is a priority. Its focus on simplicity and developer experience makes it particularly suitable for teams with limited backend expertise or those seeking to streamline their cloud workflows.

**Update March 2026:** SST (Serverless Stack) has been piloted for two Azure Functions projects with promising results. Its live-development mode and infrastructure-as-code approach simplify the serverless development experience. Moving to Trial.
