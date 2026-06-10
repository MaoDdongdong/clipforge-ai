# ClipForge AI

A bilingual AI short video generation SaaS. Users can input a script and generate an AI-assisted short video project including rewritten script, storyboard scenes, visual prompts, subtitles, mock voiceover assets, and mock video output.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Prisma
- **Auth**: Auth.js / NextAuth
- **i18n**: next-intl
- **Validation**: Zod + react-hook-form

## Features

- AI Script Rewriting
- Storyboard Generation
- Visual Prompt Builder
- Subtitle Assets
- Mock Export Workflow
- Bilingual Creation (English & Chinese)

## Local Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Run Prisma migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clipforge"
NEXTAUTH_SECRET="replace-with-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"
AI_PROVIDER="mock"
OPENAI_COMPATIBLE_API_KEY=""
OPENAI_COMPATIBLE_BASE_URL=""
OPENAI_COMPATIBLE_MODEL=""
APP_DEFAULT_LOCALE="en-US"
APP_SUPPORTED_LOCALES="en-US,zh-CN"
```

## Test Accounts

After seeding, you can log in with:

| Email | Password | Role |
|-------|----------|------|
| admin@clipforge.ai | admin123456 | ADMIN |
| demo@clipforge.ai | demo123456 | USER |

## AI Provider Configuration

The app works in **mock mode** by default (no API key required).

To use a real OpenAI-compatible API:

1. Set `AI_PROVIDER=openai-compatible` in `.env`
2. Configure your API key and base URL
3. The app will automatically use your provider instead of the mock

## Prisma Commands

```bash
# Create migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Generate Prisma client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## MVP Limitations

This is a production-ready MVP with the following known limitations:

- **No real video rendering**: Only mock video previews are generated
- **No real payment**: Billing is simulated, no actual payments processed
- **No real voice synthesis**: Voice selection is stored but not actually used for audio
- **Mock AI by default**: The app uses mock AI that generates placeholder content

## Future Roadmap

- Real video rendering integration
- Real voice synthesis (ElevenLabs, etc.)
- Payment integration (Stripe)
- Team collaboration features
- API access for enterprise
- Mobile app

## Route Structure

```
/en-US                    - Homepage (English)
/zh-CN                    - Homepage (Chinese)
/en-US/pricing            - Pricing page
/zh-CN/pricing            - Pricing page
/en-US/auth/login         - Login page
/zh-CN/auth/login         - Login page
/en-US/auth/register      - Registration page
/zh-CN/auth/register      - Registration page
/en-US/dashboard          - User dashboard
/zh-CN/dashboard          - User dashboard
/en-US/dashboard/new      - Create new project
/zh-CN/dashboard/new      - Create new project
/en-US/dashboard/tasks   - Task list
/zh-CN/dashboard/tasks    - Task list
/en-US/dashboard/tasks/[id] - Task detail
/zh-CN/dashboard/tasks/[id] - Task detail
/en-US/admin              - Admin dashboard
/zh-CN/admin              - Admin dashboard
```

## License

Private - All rights reserved