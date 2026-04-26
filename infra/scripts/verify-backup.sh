#!/usr/bin/env bash
set -euo pipefail
BACKUP_FILE=${1:?"Usage: verify-backup.sh <backup.archive>"}
if [[ ! -s "$BACKUP_FILE" ]]; then
  echo "Backup is missing or empty: $BACKUP_FILE" >&2
  exit 1
fi
echo "Backup exists and is non-empty: $BACKUP_FILE"
