# ReviewRequest Generator

A mobile-first business tool for generating personalized review request messages. Built for service professionals — lawn care, cleaning, contracting, and any client-facing business that runs on word-of-mouth.

## What It Does

1. **Set up once** — enter your business name, owner name, and review links (Google, Yelp, Facebook, Nextdoor)
2. **Generate messages** — pick a client name, service type, and template to auto-fill a ready-to-send review request
3. **Copy and text** — one tap copies the message to your clipboard for pasting into SMS, email, or DM
4. **Track requests** — history log with conversion rate tracking so you know what's working

## Features

- 5 built-in message templates (Professional, Warm, Short, Follow-Up, Referral)
- Custom template builder with placeholder support
- Multi-platform support: Google, Yelp, Facebook, Nextdoor
- Recent service auto-suggest
- Conversion rate tracking with visual progress ring
- PWA-installable on mobile — works like a native app
- Dark mode support
- 100% client-side — no backend, no accounts, all data stays on-device via localStorage

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- HashRouter (GitHub Pages compatible)

## Development

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Deploy

Pushes to `main` auto-deploy to GitHub Pages via the included workflow.
