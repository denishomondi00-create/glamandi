FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile=false
RUN pnpm --filter @glamandi/api build
CMD ["sh", "-lc", "pnpm --filter @glamandi/api start"]
