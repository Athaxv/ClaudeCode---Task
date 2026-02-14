FROM node:20-slim

RUN npm install -g pnpm@9.0.0

WORKDIR /app

# Copy workspace config and lockfile
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json .npmrc ./

# Copy all workspace package sources
COPY apps/backend/ apps/backend/
COPY packages/agent/ packages/agent/
COPY packages/schema/ packages/schema/
COPY packages/versioning/ packages/versioning/
COPY packages/db/ packages/db/

# Install all dependencies (workspace symlinks will be created)
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd packages/db && npx prisma generate 2>/dev/null || true

EXPOSE 4000

ENV NODE_ENV=production

# Use tsx to run (workspace packages export raw .ts source)
CMD ["npx", "tsx", "apps/backend/src/index.ts"]
