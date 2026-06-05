# StoryVerse — AI Interactive Storytelling App

A full-stack AI interactive storytelling web app built with Next.js 14, TypeScript, Tailwind CSS, and the Claude API.

## Features

- Chat with AI characters that have persistent memory
- Branching storylines with streaming responses
- Character and world creation
- Mana in-app currency system
- Dark purple aesthetic with Framer Motion animations

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (for production database)
- Anthropic API key (optional — mock responses used without it)

### Setup

```bash
cd ~/ai-storytelling-app
npm install
cp .env.example .env
# Edit .env with your credentials

npx prisma generate
npx prisma db push   # when DATABASE_URL is configured

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Prisma ORM
- **AI**: Claude API (`claude-sonnet-4-6`)
- **Auth**: NextAuth.js (email + Google OAuth)
- **State**: Zustand

## Project Structure

```
app/           — Pages and API routes
components/    — UI components (chat, cards, layout)
lib/           — Utilities (Claude, memory, auth, mock data)
prisma/        — Database schema
```

## Mock Mode

Without `ANTHROPIC_API_KEY`, the chat API returns simulated streaming responses. All data uses in-memory mock storage until PostgreSQL is connected.

## Deployment

Designed for Vercel. Set environment variables in your Vercel project dashboard.
