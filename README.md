# VibeDojo

AI와 함께 코딩을 배우는 학습 커뮤니티 플랫폼

## Overview

VibeDojo는 [Vibecoding Curriculum](https://github.com/vibedojo-by-hashed/VibecodingCurriculum)을 기반으로 한 학습 커뮤니티 플랫폼입니다. Claude Code를 활용한 바이브코딩으로 완전 초보부터 Web3 개발자까지 성장할 수 있습니다.

### Features

- 📚 **30챕터 커리큘럼** - 체계적인 단계별 학습
- 👥 **커뮤니티** - 질문, 토론, 프로젝트 공유
- 🎮 **게이미피케이션** - XP, 레벨, 뱃지로 재미있게 학습
- 🌍 **다국어 지원** - 한국어 / English

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions, Realtime)
- **i18n**: next-intl
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository

```bash
git clone https://github.com/vibedojo-by-hashed/vibedojo.git
cd vibedojo
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase

- Create a new project at [supabase.com](https://supabase.com)
- Run the migration: Copy contents of `supabase/migrations/001_initial_schema.sql` to SQL Editor
- Run the seed data: Copy contents of `supabase/seed.sql` to SQL Editor
- Enable Authentication providers (GitHub, Google, Email)

5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (main)/            # Protected pages (dashboard, curriculum)
│   └── auth/callback/     # OAuth callback
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── gamification/     # XP, level, badge components
├── lib/
│   ├── supabase/         # Supabase client setup
│   ├── curriculum-data.ts
│   └── gamification.ts
├── messages/              # i18n translations
│   ├── ko.json
│   └── en.json
└── middleware.ts          # Auth middleware
```

## Supabase Setup

### Authentication Providers

1. **GitHub**: Settings > Authentication > Providers > GitHub
2. **Google**: Settings > Authentication > Providers > Google
3. **Email**: Enabled by default

### Database

Run migrations in order from `supabase/migrations/`

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT
