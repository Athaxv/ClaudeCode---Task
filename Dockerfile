# ── Stage 1: Install dependencies ──────────────────────
FROM node:20-slim AS base

RUN npm install -g pnpm@9.0.0

WORKDIR /app

# Copy workspace config first for layer caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# Copy all workspace package.json files
COPY apps/backend/package.json apps/backend/package.json
COPY packages/agent/package.json packages/agent/package.json
COPY packages/schema/package.json packages/schema/package.json
COPY packages/versioning/package.json packages/versioning/package.json
COPY packages/db/package.json packages/db/package.json

# Install all dependencies (workspace-wide)
RUN pnpm install --frozen-lockfile

# ── Stage 2: Copy source & run ─────────────────────────
FROM base AS runner

WORKDIR /app

# Copy everything from base (node_modules + manifests)
COPY --from=base /app /app

# Copy source code for backend and its workspace dependencies
COPY apps/backend/ apps/backend/
COPY packages/agent/ packages/agent/
COPY packages/schema/ packages/schema/
COPY packages/versioning/ packages/versioning/
COPY packages/db/ packages/db/

# Generate Prisma client if @repo/db has a schema
RUN cd packages/db && npx prisma generate 2>/dev/null || true

EXPOSE 4000

ENV NODE_ENV=production

# Use tsx to run the backend (workspace packages export raw .ts)
CMD ["npx", "tsx", "apps/backend/src/index.ts"]
