terraform {
  required_version = ">= 1.5"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.0"
    }
  }

  # Remote state — uncomment and configure for your environment
  # backend "azurerm" {
  #   resource_group_name  = "rg-terraform-state"
  #   storage_account_name = "stgunvortfstate"
  #   container_name       = "tfstate"
  #   key                  = "techradar.tfstate"
  # }
}

provider "azurerm" {
  features {}
  # subscription_id sourced from ARM_SUBSCRIPTION_ID environment variable
}

provider "azuread" {
  # tenant_id sourced from AZURE_TENANT_ID or uses default tenant
}
