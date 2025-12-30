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
- **Icons**: Lucide React
- **Fonts**: Inter (sans) and Playfair Display (serif) via next/font

### Project Structure

```
app/                    # Next.js App Router pages
├── page.tsx            # Homepage (composes Header, Hero, Features, InfoCarousel, Footer)
├── layout.tsx          # Root layout with fonts and metadata
├── globals.css         # Tailwind imports and CSS custom properties
├── about/              # About section pages
├── tennis/             # Tennis-related pages
├── swim/               # Swimming-related pages
├── contact/            # Contact pages
├── employment/         # Employment pages
├── membership/         # Membership pages
├── member-portal/      # Member portal
├── board-portal/       # Board portal
└── checkout/           # Checkout flow

components/
├── ui/                 # shadcn/ui components (Button, Card, Badge, etc.)
├── header.tsx          # Site header with dropdown navigation
├── footer.tsx          # Site footer
├── hero-section.tsx    # Homepage hero
├── features-section.tsx
├── info-carousel.tsx
└── about-section.tsx

lib/
└── utils.ts            # cn() utility for className merging
```

### Key Patterns

- **Client Components**: Components using React hooks (useState, useRef, useEffect) must have `"use client"` directive
- **CSS Variables**: Theme colors defined in `app/globals.css` using oklch color space; primary color is green (#5a7d5d)
- **Path Aliases**: Use `@/components`, `@/lib`, `@/hooks` for imports (configured in components.json)
- **Images**: Stored in `/public/`, referenced with leading slash (e.g., `/saint-paul-logo.jpeg`)

### Build Configuration

TypeScript and ESLint errors are ignored during builds (configured in `next.config.mjs`). Images are unoptimized for simplicity.

## v0.app Sync

This repository auto-syncs with v0.app deployments. Changes made in v0.app are automatically pushed here.
