#!/usr/bin/env bash
set -euo pipefail
STAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p infra/backups
mongodump --uri "${MONGO_URI:-mongodb://localhost:27017/glamandi}" --archive="infra/backups/glamandi_${STAMP}.archive" --gzip
echo "Backup created: infra/backups/glamandi_${STAMP}.archive"
