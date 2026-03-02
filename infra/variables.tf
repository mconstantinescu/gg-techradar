# ══════════════════════════════════════════════════════
# Input variables
# ══════════════════════════════════════════════════════

variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "westeurope"
}

variable "environment" {
  description = "Environment name (dev, staging, production)"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "resource_group_name" {
  description = "Name of the Azure resource group"
  type        = string
  default     = "rg-techradar-prod"
}

variable "swa_name" {
  description = "Name of the Azure Static Web App resource"
  type        = string
  default     = "swa-gunvor-techradar"
}

variable "swa_sku_tier" {
  description = "SWA pricing tier (Free or Standard)"
  type        = string
  default     = "Standard"

  validation {
    condition     = contains(["Free", "Standard"], var.swa_sku_tier)
    error_message = "SKU tier must be Free or Standard."
  }
}

variable "swa_sku_size" {
  description = "SWA SKU size"
  type        = string
  default     = "Standard"
}

variable "custom_domain" {
  description = "Custom domain (e.g. techradar.gunvorgroup.com). Leave empty to skip."
  type        = string
  default     = ""
}

variable "enable_entra_auth" {
  description = "Enable Entra ID authentication for SWA"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default     = {}
}
