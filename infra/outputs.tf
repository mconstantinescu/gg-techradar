# ══════════════════════════════════════════════════════
# Outputs
# ══════════════════════════════════════════════════════

output "resource_group_name" {
  description = "Name of the created resource group"
  value       = azurerm_resource_group.this.name
}

output "resource_group_id" {
  description = "ID of the resource group"
  value       = azurerm_resource_group.this.id
}

output "swa_id" {
  description = "ID of the Static Web App"
  value       = azurerm_static_web_app.techradar.id
}

output "swa_default_hostname" {
  description = "Default hostname of the Static Web App"
  value       = azurerm_static_web_app.techradar.default_host_name
}

output "swa_url" {
  description = "URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.techradar.default_host_name}"
}

output "swa_api_key" {
  description = "API key for the Static Web App (sensitive)"
  value       = azurerm_static_web_app.techradar.api_key
  sensitive   = true
}

output "entra_app_client_id" {
  description = "Entra ID app client ID (use in SWA auth config)"
  value       = local.entra_app_client_id
  sensitive   = false
}

output "entra_app_id_object" {
  description = "Entra ID app object ID"
  value       = var.enable_entra_auth ? azuread_application.techradar_swa[0].object_id : null
}
