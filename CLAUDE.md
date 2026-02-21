# CLAUDE.md - Meadowlark Concert Series

## Project Overview

Website for the Meadowlark Concert Series - intimate house concerts in Austin, TX. Static site with serverless functions for payment processing.

**Tech Stack:** Astro 5 + React 19 + Tailwind CSS 4 + TypeScript (strict)
**Deployment:** Netlify (with serverless functions)
**Backend Services:** Stripe (payments), Resend (email), Google Forms (RSVP), Google Sheets (CMS)

## Commands

```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Production build to ./dist/
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── components/      # Astro components (Header, Footer, ConcertCard)
├── data/
│   ├── concerts.ts  # Fetches concert data from Google Sheets CSV
│   └── types.ts     # TypeScript interfaces + venue info
├── layouts/         # Layout.astro (main template)
├── pages/
│   ├── concerts/[slug].astro    # Concert detail pages
│   ├── rsvp/[slug].astro        # RSVP form (Google Forms)
│   ├── watch/[slug].astro       # Password-protected live stream
│   └── virtual-ticket/[slug].astro  # Virtual ticket purchase
└── styles/global.css  # Tailwind + CSS custom properties

netlify/functions/
├── create-checkout.ts   # Creates Stripe checkout session
├── stripe-webhook.ts    # Handles payment completion + sends email
└── get-session.ts       # Retrieves session metadata
```

## Key Patterns

### Concert Data
- Data fetched from Google Sheets CSV at build time (not hardcoded)
- Custom CSV parser in `src/data/concerts.ts` handles multi-line fields
- Helper functions: `getUpcomingConcerts()`, `getPastConcerts()`, `getConcertBySlug()`
- Status is calculated dynamically from date

### Page Generation
- Dynamic routes use `getStaticPaths()` for static generation
- Concerts with `streamingEnabled: true` get `/watch/[slug]` pages
- Only upcoming concerts get `/rsvp/[slug]` pages

### Forms
- Google Forms used for RSVP and mailing list (no-cors POST)
- Form submissions redirect to confirmation pages regardless of success
- Form IDs and entry IDs documented in `CLAUDE_NOTES.md`

### Payment Flow (Virtual Tickets)
1. User clicks Purchase → `create-checkout` function creates Stripe session
2. User completes payment on Stripe
3. Stripe webhook → `stripe-webhook` sends confirmation email via Resend
4. Success page retrieves session via `get-session` function

### Live Streaming
- Password-protected pages at `/watch/[slug]`
- Uses localStorage for password persistence
- YouTube embed with dynamic video ID
- Access codes sent via purchase confirmation email

## Environment Variables

Required in `.env` and Netlify:
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`

## Design System

Colors (CSS custom properties in global.css):
- `--color-meadow: #4a7c59` (primary green)
- `--color-warm: #d4a574` (accent tan)
- `--color-cream: #faf8f5` (background)
- `--color-charcoal: #2d2d2d` (text)

Typography: Georgia (serif), responsive with Tailwind breakpoints

## Content Notes

- Concerts are in a living room (not backyard)
- Doors open 1 hour before showtime
- Venue: 10500 Beard Avenue, Austin, TX 78748
- Location details kept vague until RSVP

## External Services

- **Google Sheets** - Concert data CMS (published as CSV)
- **Google Forms** - RSVP and mailing list collection
- **Cloudinary** - Image hosting (recommended)
- **Stripe** - Virtual ticket payments
- **Resend** - Transactional email
- **Netlify** - Hosting + serverless functions
