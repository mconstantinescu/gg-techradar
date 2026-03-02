# ══════════════════════════════════════════════════════
# Azure Static Web App — Gunvor Technology Radar
# ══════════════════════════════════════════════════════

resource "azurerm_resource_group" "this" {
  name     = var.resource_group_name
  location = var.location
  tags     = local.tags
}

# ── Entra ID App Registration ───────────────────────
resource "azuread_application" "techradar_swa" {
  count       = var.enable_entra_auth ? 1 : 0
  display_name = "${var.swa_name}-auth"
  description = "Entra ID app registration for ${var.swa_name} SWA"

  app_role {
    allowed_member_types = ["User", "Application"]
    description          = "Admin role for Technology Radar"
    display_name         = "Admin"
    id                   = "01a6a05c-5430-41e1-a5c0-1d4d9f3c5c5c"
    value                = "TechRadar.Admin"
  }

  app_role {
    allowed_member_types = ["User", "Application"]
    description          = "Reader role for Technology Radar"
    display_name         = "Reader"
    id                   = "02b6b05d-5431-42e2-b6d0-2d4d9f3c5c5d"
    value                = "TechRadar.Reader"
  }

  web {
    redirect_uris = concat(
      ["https://${azurerm_static_web_app.techradar.default_host_name}/.auth/login/aad/callback"],
      var.custom_domain != "" ? ["https://${var.custom_domain}/.auth/login/aad/callback"] : []
    )
    implicit_grant {
      access_token_issuance_enabled = true
      id_token_issuance_enabled    = true
    }
  }

  required_resource_access {
    resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph

    resource_access {
      id   = "37f7f235-527c-4136-accd-4a02d197296e" # openid scope
      type = "Scope"
    }

    resource_access {
      id   = "64a6cdd6-aab1-4aaf-94b8-3da8b0a6b05c" # profile scope
      type = "Scope"
    }
  }
}

resource "azurerm_static_web_app" "techradar" {
  name                = var.swa_name
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  sku_tier            = var.swa_sku_tier
  sku_size            = var.swa_sku_size
  tags                = local.tags
}

# ── Custom domain (optional) ────────────────────────
resource "azurerm_static_web_app_custom_domain" "this" {
  count             = var.custom_domain != "" ? 1 : 0
  static_web_app_id = azurerm_static_web_app.techradar.id
  domain_name       = var.custom_domain
  validation_type   = "cname-delegation"
}

# ── Locals ──────────────────────────────────────────
locals {
  tags = merge(var.tags, {
    Application = "technology-radar"
    ManagedBy   = "Terraform"
    Environment = var.environment
  })

  entra_app_client_id = var.enable_entra_auth ? azuread_application.techradar_swa[0].client_id : null
}
