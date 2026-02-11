# Meadowlark Concert Series

A website for the Meadowlark Concert Series - intimate house concerts in the Bauerle Ranch neighborhood of South Austin.

Built with [Astro](https://astro.build), React, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── public/
│   ├── images/           # Concert and artist images
│   └── favicon.svg
├── src/
│   ├── components/       # Reusable components
│   ├── data/
│   │   ├── concerts.ts   # Concert data (edit this to add concerts)
│   │   └── types.ts      # TypeScript types & venue info
│   ├── layouts/
│   │   └── Layout.astro  # Main page layout
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── contact.astro       # Contact & mailing list
│   │   └── concerts/
│   │       ├── index.astro     # Concert listings
│   │       └── [slug].astro    # Individual concert pages
│   └── styles/
│       └── global.css    # Global styles & Tailwind
└── package.json
```

## Managing Concerts

### Option 1: Edit the Data File (Simplest)

Edit `src/data/concerts.ts` directly to add, update, or remove concerts:

```typescript
{
  id: "unique-id",
  slug: "artist-name-month-year",  // Used in URL
  artistName: "Artist Name",
  date: "2025-03-15",              // ISO date format
  doorsTime: "6:30 PM",
  showTime: "7:00 PM",
  suggestedDonation: "$20-30",
  shortDescription: "Brief description for listings",
  fullDescription: "Full description with multiple paragraphs...",
  artistBio: "Artist biography...",
  artistWebsite: "https://...",    // Optional
  artistSpotify: "https://...",    // Optional
  artistInstagram: "https://...",  // Optional
  featuredImage: "/images/concert-name.jpg",
  artistImage: "/images/artist-name.jpg",  // Optional
  rsvpLink: "https://forms.google.com/...",
  status: "upcoming"  // or "past"
}
```

### Option 2: Google Sheets CMS (Recommended for Non-Technical Updates)

See the "Google Sheets Integration" section below.

## Image Hosting

### Recommended: Cloudinary (Free Tier)

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Upload images to your Media Library
3. Use the image URLs in your concert data:

```typescript
featuredImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/v1234567/concerts/artist.jpg"
```

**Why Cloudinary?**
- 25GB storage free
- Automatic image optimization and resizing
- Fast CDN delivery
- Keeps your repo small

### Alternative: Local Images

Store images in `public/images/` and reference them as `/images/filename.jpg`. This works but increases repo size and build times.

## Forms Setup

### RSVP Forms (Google Forms)

1. Create a Google Form with fields: Name, Email, Number of Guests, Message
2. Copy the form URL
3. Add to concert data as `rsvpLink`

### Email Signup (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORMSPREE_ID` in `src/pages/contact.astro`:

```html
<form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```

Formspree free tier includes 50 submissions/month.

### Alternative: Mailchimp

Replace the Formspree form with a Mailchimp embedded signup form if you prefer to manage subscribers there.

## Deployment

### Option 1: GitHub Pages (Free)

1. Push code to GitHub
2. Go to repo Settings > Pages
3. Under "Build and deployment", select GitHub Actions
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

5. Update `astro.config.mjs` with your base URL:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/meadowlark-concerts',  // your repo name
  // ...
});
```

### Option 2: Netlify (Recommended)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select your repo
5. Build settings are auto-detected (build command: `npm run build`, publish: `dist`)
6. Click "Deploy site"

**Benefits:**
- Automatic deploys on push
- Free custom domain support
- Easy environment variables for API keys

### Option 3: Vercel

Similar to Netlify - connect your GitHub repo and it auto-detects Astro settings.

## Google Sheets Integration (Optional)

To use Google Sheets as a CMS:

1. Create a Google Sheet with columns matching the Concert type
2. Publish the sheet to the web (File > Share > Publish to web > CSV)
3. Install a CSV parser: `npm install papaparse`
4. Create a fetch function in `src/data/concerts.ts`:

```typescript
import Papa from 'papaparse';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv';

export async function fetchConcerts(): Promise<Concert[]> {
  const response = await fetch(SHEET_URL);
  const csv = await response.text();
  const { data } = Papa.parse(csv, { header: true });
  return data.map(row => ({
    // Map CSV columns to Concert properties
  }));
}
```

5. Update your pages to use `await fetchConcerts()` in the frontmatter

**Note:** For static builds, you'll need to rebuild the site when content changes. Use a webhook or scheduled GitHub Action for automatic updates.

## Customization

### Colors

Edit the theme colors in `src/styles/global.css`:

```css
:root {
  --color-meadow: #4a7c59;      /* Primary green */
  --color-warm: #d4a574;         /* Accent tan */
  --color-cream: #faf8f5;        /* Background */
  --color-charcoal: #2d2d2d;     /* Text */
}
```

### Venue Info

Update `src/data/types.ts` to change venue details:

```typescript
export const venue: VenueInfo = {
  name: "Meadowlark House",
  address: "10500 Beard Avenue",
  // ...
};
```

### Contact Emails

Update email addresses in `src/pages/contact.astro`.

## Commands

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start dev server at `localhost:4321`         |
| `npm run build`   | Build for production to `./dist/`            |
| `npm run preview` | Preview production build locally             |

## License

MIT
# meadowlark-concerts
