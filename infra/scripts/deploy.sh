#!/usr/bin/env bash
set -euo pipefail
pnpm install --frozen-lockfile
pnpm build
docker compose -f infra/docker/docker-compose.prod.yml up -d --build
