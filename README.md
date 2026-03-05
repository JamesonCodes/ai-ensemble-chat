# AI Ensemble Chat

A production-style chat application built with Next.js and the Vercel AI SDK.

This portfolio project builds on the official Vercel AI Chatbot template and emphasizes:

- Multi-model orchestration
- Real-time chat UX
- Clean full-stack architecture
- Practical product features (comparison mode, winner selection, persistence)

## Attribution

Adapted from the official Vercel AI Chatbot template:
https://github.com/vercel/ai-chatbot

## Highlights

- Single-response chat mode
- Quad-response mode (4 model outputs from one prompt)
- Winner selection (`Use for Next`) to route the next prompt to the preferred model
- Header view-mode toggle (`single` / `quad`) with tooltips
- Smart scrolling behavior:
  - Quad finishes anchored at top cards
  - Single finishes jump to newest response
- Auth (guest + regular user)
- Persistent chat history in Postgres
- File upload support via Vercel Blob
- Optional resumable streaming with Redis

## Tech Stack

- Next.js (App Router)
- TypeScript
- Vercel AI SDK (`ai`, `@ai-sdk/react`, AI Gateway)
- Auth.js (NextAuth)
- Drizzle ORM + Postgres
- shadcn/ui + Radix + Tailwind CSS
- SWR + Sonner + Framer Motion

## Quick Start (Beginner-Friendly)

### 1) Prerequisites

Install these first:

- Node.js 20+
- pnpm 9+
- A Postgres database
- A Vercel Blob token
- AI Gateway key (for local/non-Vercel usage)

Optional:

- Redis (for resumable streams)

Helpful setup links:

- AI Gateway: https://vercel.com/ai-gateway
- Vercel Blob Store: https://vercel.com/docs/vercel-blob
- Postgres: https://vercel.com/docs/postgres
- Redis: https://vercel.com/docs/redis

### 2) Clone and install

```bash
git clone <your-repo-url>
cd ai-ensemble-chat
pnpm install
```

### Optional: Agent skills setup (Codex users)

If you use Codex/agent workflows, note that cloning this repo and running `pnpm install`
sets up the app, but may not automatically install/sync local agent skills on every machine.

- App runtime setup: covered by this README
- Agent skill setup: managed by your Codex environment/tooling

This repo includes `skills-lock.json` to track skill state, but you may still need to run
your local skill install/sync step when setting up a new workstation.

AI SDK skill reference:
- https://skills.sh/vercel/ai/ai-sdk

### 3) Create environment file

Copy `.env.example` to `.env.local` and fill values:

```bash
cp .env.example .env.local
```

Required variables:

- `AUTH_SECRET`
- `AI_GATEWAY_API_KEY` (required outside Vercel)
- `POSTGRES_URL`
- `BLOB_READ_WRITE_TOKEN`

Optional:

- `REDIS_URL` (enables resumable stream support)

### 4) Run database migration

```bash
pnpm db:migrate
```

### 5) Start dev server

```bash
pnpm dev
```

Open: `http://localhost:3000`

## How to Use

### Single vs Quad mode

- Use the header toggle:
  - `single`: one assistant response
  - `quad`: four assistant candidates

### Quad winner flow

1. Send a prompt in Quad mode
2. Compare 4 responses
3. Click `Use for Next` on the best one
4. That model becomes active for the next prompt

### Model selection

Use the model dropdown in the input toolbar to choose provider/model.

## Scripts

- `pnpm dev` - start local development server
- `pnpm build` - migrate DB then build
- `pnpm start` - start production server
- `pnpm test` - run Playwright tests
- `pnpm lint` - run linter checks
- `pnpm format` - auto-fix lint/style
- `pnpm db:migrate` - apply migrations
- `pnpm db:studio` - open Drizzle Studio

## Environment Variables

See `.env.example` for the full list.

```env
AUTH_SECRET=
AI_GATEWAY_API_KEY=
BLOB_READ_WRITE_TOKEN=
POSTGRES_URL=
REDIS_URL=
```

## Project Structure

```text
app/
  (chat)/
    api/chat/route.ts        # chat API (single + quad modes)
components/
  chat.tsx                   # main chat state + transport wiring
  chat-header.tsx            # top utility bar + mode toggle
  message.tsx                # message rendering + quad cards
  multimodal-input.tsx       # input, model selector, uploads
lib/
  ai/models.ts               # curated model list
  ai/providers.ts            # gateway/provider wiring
  ai/entitlements.ts         # rate/usage limits by user type
  db/queries.ts              # persistence layer
```

## Portfolio Notes

Areas this project emphasizes:

- Multi-model comparison UX and state synchronization
- Robust request-state handling (avoids stale mode/model payload bugs)
- Practical API/UI design for advanced chat features without over-engineering
- Clear separation of concerns between API routes, UI state, and rendering components

## Troubleshooting

### App starts but chat errors immediately

Check:

- `AI_GATEWAY_API_KEY` is valid (if running locally)
- provider/model IDs in `lib/ai/models.ts` are supported by your gateway setup

### No messages saved

Check:

- `POSTGRES_URL`
- `pnpm db:migrate` ran successfully

### File uploads fail

Check:

- `BLOB_READ_WRITE_TOKEN`

### Resumable stream features unavailable

Set:

- `REDIS_URL`

## License

MIT
