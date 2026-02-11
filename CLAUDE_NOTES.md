# Claude Development Notes - Meadowlark Concert Series

## Project Overview
Website for the Meadowlark Concert Series - intimate house concerts in the Bauerle Ranch neighborhood of South Austin.

**Tech Stack:** Astro + React + Tailwind CSS

**Venue:** 10500 Beard Avenue, Austin, TX 78748 (living room concerts, doors open 1 hour before showtime)

---

## Current Status

### Completed
- [x] Astro project scaffolded with React and Tailwind
- [x] Homepage with hero, about section, featured concert, "How It Works"
- [x] Concerts listing page (upcoming + past)
- [x] Individual concert detail pages with sections: Details, About Artist, Location, RSVP
- [x] Contact page with FAQ
- [x] Mailing list signup via Google Forms (working)
- [x] RSVP form via Google Forms (needs testing/debugging)
- [x] Thank you page for mailing list signups
- [x] RSVP confirmed page
- [x] Custom color scheme (meadow green + warm tan)
- [x] Responsive design

### Needs Attention
- [ ] **RSVP form is "glitchy"** - user reported issues, needs debugging
  - Form is at `/rsvp?concert=[slug]`
  - Submits to Google Form ID: `1FAIpQLSfp85ITDb7LRxNWKhypMLapHCupbsqcKotNyghjP1Yd7HPkFQ`
  - Entry IDs:
    - Name: `entry.1049319765`
    - Email: `entry.24407779`
    - Number of Guests: `entry.1710774296`
    - Concert: `entry.1053752465`
    - Message: `entry.1710075639`

### Not Yet Done
- [ ] Replace placeholder images with real images (Cloudinary recommended)
- [ ] Update sample concert data with real concerts
- [ ] Deploy to hosting (Netlify recommended, GitHub Pages also documented)
- [ ] Set up custom domain (if desired)
- [ ] Update contact page email addresses (currently placeholder emails)

---

## Key Files

### Data Management
- `src/data/concerts.ts` - Concert data (add/edit concerts here)
- `src/data/types.ts` - TypeScript types + venue info

### Pages
- `src/pages/index.astro` - Homepage
- `src/pages/concerts/index.astro` - Concert listings
- `src/pages/concerts/[slug].astro` - Individual concert pages
- `src/pages/contact.astro` - Contact + mailing list signup
- `src/pages/rsvp.astro` - RSVP form (receives `?concert=slug` param)
- `src/pages/thank-you.astro` - Mailing list confirmation
- `src/pages/rsvp-confirmed.astro` - RSVP confirmation

### Components
- `src/components/Header.astro` - Site header/nav
- `src/components/Footer.astro` - Site footer
- `src/components/ConcertCard.astro` - Concert card for listings

### Styling
- `src/styles/global.css` - Global styles + Tailwind theme colors

---

## Google Forms Integration

### Mailing List Form
- Form ID: `1FAIpQLSeeRueGNslgEYWQSIXjPXNZi5rOoFku_phteX8Wbn4H86isbQ`
- Entry IDs:
  - Name: `entry.627835089`
  - Email: `entry.460166804`
- Status: **Working**

### RSVP Form
- Form ID: `1FAIpQLSfp85ITDb7LRxNWKhypMLapHCupbsqcKotNyghjP1Yd7HPkFQ`
- Entry IDs:
  - Name: `entry.1049319765`
  - Email: `entry.24407779`
  - Number of Guests: `entry.1710774296`
  - Concert: `entry.1053752465`
  - Message: `entry.1710075639`
- Status: **Glitchy - needs debugging**

---

## Design Decisions

### Colors (defined in global.css)
- `--color-meadow: #4a7c59` (primary green)
- `--color-meadow-light: #6b9b7a`
- `--color-meadow-dark: #3a6147`
- `--color-warm: #d4a574` (accent tan)
- `--color-warm-light: #e8c9a8`
- `--color-cream: #faf8f5` (background)
- `--color-charcoal: #2d2d2d` (text)

### Content Notes
- Concerts happen in living room (not backyard) - removed backyard references
- Doors open 1 hour before showtime (not 30 min)
- Location details kept vague intentionally - "exact details provided when you RSVP"

---

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Next Session TODO

1. Debug RSVP form submission issues
2. Test full RSVP flow end-to-end
3. Any other changes user identifies
