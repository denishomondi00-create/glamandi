#!/usr/bin/env bash
set -euo pipefail
BACKUP_FILE=${1:?"Usage: restore-mongo.sh <backup.archive>"}
mongorestore --uri "${MONGO_URI:-mongodb://localhost:27017/glamandi}" --archive="$BACKUP_FILE" --gzip --drop
