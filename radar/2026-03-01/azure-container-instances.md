---

title:      "Azure Container Instances"
ring:       hold
segment:    platforms-and-services
tags:       [devops]
featured:   false
author:     Gunvor Group Technology Team
---
[Azure Container Instances](https://azure.microsoft.com/products/container-instances) (ACI) offers a simple way to run Docker containers on Azure without managing virtual machines. While ACI is useful for quick experiments, dev/test workloads, and batch jobs, we found significant limitations for production use — including lack of native DNS support, limited integration with Application Gateway, unexpected restarts, and cost that is not always competitive with VM-based deployments.

For production container workloads, we recommend using [Kubernetes](/platforms-and-services/kubernetes/) on AKS. ACI may still be appropriate for short-lived or non-critical containers where operational simplicity outweighs the limitations.
