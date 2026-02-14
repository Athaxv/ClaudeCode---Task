# Deterministic UI Generator (Claude Code Style)

A powerful, AI-driven engine that generates **deterministic, high-quality UI code** from natural language prompts. Built with a structured **Agent Pipeline** (Planner → Generator → Explainer) and a strict **AST Schema**, ensuring reliable and version-controlled outputs.

## 🚀 Key Features

- **Deterministic Generation**: Uses a structured AST (Abstract Syntax Tree) to guarantee valid, type-safe UI components every time.
- **Agent Pipeline**:
  - **Planner**: Deconstructs user requests into a step-by-step execution plan.
  - **Generator**: Converts the plan into a precise JSON AST.
  - **Explainer**: Generates a natural language summary of changes.
- **Versioning & Rollback**: Built-in version control system (`@repo/versioning`) to track every change and restore previous states instantly.
- **Live Preview**: Real-time rendering of the generated UI with a "Claude Code" inspired interface.
- **Multi-Model Support**: Powered by Groq/LLMs for varied model selection.

## 🏗 Architecture

The project is a **Turborepo** monorepo structured as follows:

```
.
├── apps/
│   ├── frontend/        # Next.js 15 (App Router) - The interactive playground
│   └── backend/         # Express.js - API for the Agent Pipeline
├── packages/
│   ├── agent/           # Core Logic: Planner, Generator, Explainer
│   ├── schema/          # Zod schemas defining the UI AST (Container, Button, etc.)
│   ├── versioning/      # State management and history tracking
│   └── db/              # Prisma configurations
└── ...
```

## 🛠 Tech Stack

- **Frameworks**: Next.js 15, Express.js
- **Language**: TypeScript (Strict Mode)
- **Styling**: TailwindCSS, Shadcn UI
- **AI/LLM**: Groq SDK, Vercel AI SDK
- **Database**: PostgreSQL (via Prisma)
- **Tooling**: Turborepo, pnpm, Docker

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+ (`npm install -g pnpm`)
- PostgreSQL database
- Groq API Key

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd <repo-name>
pnpm install
```

### 2. Environment Setup

Copy the example environment files and configure them:

**Apps/Backend:**
Create `apps/backend/.env`:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
GROQ_API_KEY="gsk_..."
```

**Packages/DB:**
Create `packages/db/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

**Apps/Frontend:**
Create `apps/frontend/.env`:
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### 3. Database Setup

Generate the Prisma client and push the schema:

```bash
pnpm db:generate
pnpm db:push
```

### 4. Running the App

Start the entire stack (Frontend + Backend) in development mode:

```bash
pnpm dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:4000](http://localhost:4000)

## 🐳 Docker Deployment

The project includes a production-ready `Dockerfile`.

1. **Build the image**:
   ```bash
   docker build -t ui-generator-backend .
   ```

2. **Run the container**:
   ```bash
   docker run -p 4000:4000 \
     -e DATABASE_URL="postgresql://..." \
     -e GROQ_API_KEY="gsk_..." \
     ui-generator-backend
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
