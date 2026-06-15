#!/usr/bin/env bash
# Sync auth-related env vars from .env to Vercel Production.
# Usage: npx vercel login && ./scripts/sync-vercel-env.sh

set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f .env ]]; then
  echo "Missing .env in project root"
  exit 1
fi

PRODUCTION_URL="${PRODUCTION_URL:-https://ai-storytelling-app-pearl.vercel.app}"

get_env() {
  grep -E "^${1}=" .env | head -1 | cut -d= -f2- | tr -d '"'
}

sync_var() {
  local name="$1"
  local value="$2"
  echo "→ $name"
  printf '%s' "$value" | npx vercel env add "$name" production --force
}

echo "Syncing to Vercel Production ($PRODUCTION_URL)"
echo "Project must be linked: npx vercel link"

sync_var "NEXTAUTH_URL" "$PRODUCTION_URL"
sync_var "NEXTAUTH_SECRET" "$(get_env NEXTAUTH_SECRET)"
sync_var "GOOGLE_CLIENT_ID" "$(get_env GOOGLE_CLIENT_ID)"
sync_var "GOOGLE_CLIENT_SECRET" "$(get_env GOOGLE_CLIENT_SECRET)"
sync_var "DATABASE_URL" "$(get_env DATABASE_URL)"
sync_var "DIRECT_URL" "$(get_env DIRECT_URL)"
sync_var "NEXT_PUBLIC_API_URL" "https://ai-storytelling-backend-production.up.railway.app"

echo ""
echo "Done. Redeploy: npx vercel --prod"
