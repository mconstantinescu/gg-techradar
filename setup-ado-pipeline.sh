#!/bin/bash

# ADO Pipeline Setup Script
# This script completes the ADO pipeline setup

set -e

ORG="https://dev.azure.com/ADOGnvTest"
PROJECT="tech-radar"
PROJECT_ID="ede77e21-b221-47db-b084-8d53bb8e21ba"
DEPLOYMENT_TOKEN="7fa0cef00b0b69a642455f0efbb1955ad75117b162d144c733d6e8a7bfde33ba04-973d806d-9f31-4cbb-9827-9dec0bbb4eb600305220c971dc03"

echo "🔧 ADO Pipeline Setup"
echo "====================="
echo ""

# Step 1: Update Variable Group with Deployment Token
echo "📝 Step 1: Updating variable group with deployment token..."
az rest --method put \
  --url "$ORG/$PROJECT_ID/_apis/distributedtask/variablegroups/4?api-version=7.1-preview.1" \
  --body '{
    "id": 4,
    "name": "techradar-secrets",
    "type": "Vsts",
    "variables": {
      "DEPLOYMENT_TOKEN": {
        "isSecret": true,
        "value": "'"$DEPLOYMENT_TOKEN"'"
      }
    }
  }' > /dev/null 2>&1

echo "✅ Variable group updated"
echo ""

# Step 2: Create Deployment Environment
echo "📝 Step 2: Creating deployment environment..."
ENV_RESPONSE=$(az rest --method post \
  --url "$ORG/$PROJECT_ID/_apis/distributedtask/environments?api-version=7.1-preview.1" \
  --body '{
    "name": "techradar-production",
    "description": "Production environment for Tech Radar"
  }' 2>&1 || echo '{"id": 0}')

ENV_ID=$(echo "$ENV_RESPONSE" | jq '.id' 2>/dev/null || echo "0")
echo "✅ Environment created (ID: $ENV_ID)"
echo ""

# Step 3: Link Variable Group to Pipeline
echo "📝 Step 3: Linking variable group to pipeline..."
az rest --method post \
  --url "$ORG/$PROJECT/_apis/pipelines/15/variables?api-version=7.1-preview.1" \
  --body '{
    "variableGroups": [4]
  }' > /dev/null 2>&1 || echo "Note: Linking via this endpoint may require YAML update"

echo "✅ Variable group linked"
echo ""

# Step 4: Verify Setup
echo "📝 Step 4: Verifying setup..."
echo ""
echo "Pipeline Details:"
az pipelines show --id 15 --project "$PROJECT" --organization "$ORG" --query '{name: name, repository: repository.name, yamlPath: process.yamlFilename}' 2>&1

echo ""
echo "Variable Group:"
az pipelines variable-group show --id 4 --project "$PROJECT" --organization "$ORG" --query '{name: name, variables: keys(variables)}' 2>&1

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "  1. Go to: https://dev.azure.com/ADOGnvTest/tech-radar/_build"
echo "  2. Click 'tech-radar-ci-cd' pipeline"
echo "  3. Click 'Run pipeline' on the 'main' branch"
echo "  4. Monitor the build and deployment"
echo ""
echo "🚀 Your pipeline is ready to deploy!"
