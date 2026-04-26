# Property Management Website

A modern, premium marketing site for a Bay Area property management company,
with a secondary homeowner services vertical.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Project structure

```
app/
  layout.tsx              Root layout, fonts, SEO metadata
  page.tsx                Homepage — composes all section components
  globals.css             Tailwind + base styles

components/site/
  Header.tsx              Sticky nav + Get Proposal CTA
  Hero.tsx                Headline + mini dashboard mockup
  TrustBar.tsx            Compact trust badges strip
  Differentiators.tsx     Tech-Friendly / Professional / Fast pillars
  PropertyManagement.tsx  Primary services grid (8 cards)
  DashboardPreview.tsx    Premium SaaS-style metrics + rent roll
  HomeownerServices.tsx   Secondary services (3 cards, dark band)
  ServiceAreas.tsx        Eight South Bay city tiles
  Process.tsx             Two side-by-side process tracks
  LeadForm.tsx            Lead capture with success state
  Footer.tsx              Links + copyright

lib/
  content.ts              Centralized copy/data (cities, services, etc.)
```

## Customizing

- **Copy & data:** edit `lib/content.ts` — most service titles, descriptions,
  cities, dropdown options, and the company name live there.
- **Brand color:** the soft teal-blue accent is defined as `brand` in
  `tailwind.config.ts`. Swap the palette there to re-skin the site.
- **Sections:** each section is an independent component. Reorder, remove,
  or duplicate by editing `app/page.tsx`.

## What's wired vs. placeholder

- The lead form currently `console.log`s submissions and shows a success
  state. To send real leads, replace the handler in `components/site/LeadForm.tsx`
  with a `fetch('/api/...')` call or a Supabase insert.
- The owner dashboard is a static mock — it's a marketing visual, not the
  real product. Easy to swap for a screenshot or real data later.

## Designed to grow into

- Owner dashboard (real auth + data)
- Tenant portal
- Maintenance request portal
- Supabase auth
- Online property onboarding flow
