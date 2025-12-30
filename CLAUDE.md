# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saint Paul Tennis Club website - a Next.js 14 application built with v0.app and deployed on Vercel. The site serves a neighborhood tennis and swimming club in Summit Hill, established in 1912.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

Note: This project uses pnpm as the package manager.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router (React 19)
- **Styling**: Tailwind CSS 4 with CSS variables for theming
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Backend**: Supabase (auth, database)
- **Icons**: Lucide React
- **Fonts**: Inter (sans) and Playfair Display (serif) via next/font

### Project Structure

```
app/
├── auth/               # Authentication pages (login, register, forgot-password, callback)
├── member-portal/      # Member-only pages (household, events, reservations, directory)
├── board-portal/       # Board member admin pages (stats, members, checkin)
├── about/, tennis/, swim/, contact/, employment/  # Public content pages

components/
├── ui/                 # shadcn/ui components
└── *.tsx               # Page-level components (header, footer, hero, etc.)

lib/
├── utils.ts            # cn() utility for className merging
├── env.ts              # Type-safe environment variable access
└── supabase/
    ├── client.ts       # Browser Supabase client (for client components)
    ├── server.ts       # Server Supabase client (for server components/API routes)
    └── types.ts        # Database types and table definitions

hooks/
└── use-dropdown.ts     # Dropdown menu behavior hook
```

### Key Patterns

- **Client Components**: Components using React hooks must have `"use client"` directive
- **Supabase Clients**: Use `lib/supabase/client.ts` in client components, `lib/supabase/server.ts` in server components and API routes
- **Database Types**: All Supabase tables are typed in `lib/supabase/types.ts` - includes profiles, households, reservations, events, etc.
- **CSS Variables**: Theme colors defined in `app/globals.css` using oklch color space; primary color is green (#5a7d5d)
- **Path Aliases**: Use `@/components`, `@/lib`, `@/hooks` for imports
- **Images**: Stored in `/public/`, referenced with leading slash

### Environment Variables

Required for Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### User Roles

Defined in `lib/supabase/types.ts`: `member`, `staff`, `board`, `admin`

## v0.app Sync

This repository auto-syncs with v0.app deployments. Changes made in v0.app are automatically pushed here.
