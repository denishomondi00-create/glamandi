#!/usr/bin/env bash
set -euo pipefail
corepack enable
pnpm install
docker compose -f infra/docker/docker-compose.dev.yml up -d
pnpm build
