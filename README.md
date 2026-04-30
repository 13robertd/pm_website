# Bayline Property Co. — marketing site

Modern property management lead-gen site for Peninsula and South Bay
homeowners. Next.js App Router + TypeScript + Tailwind, fully static
prerendering for every page (homepage, estimate funnel, 16 city pages).

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build  # static prerender
npm run start  # serve the production build
```

## Environment variables

The lead capture API (`POST /api/leads`) sends notification emails via
[Resend](https://resend.com) when configured. Without these, leads still
land in server logs (`console.log`-prefixed `[lead]`) so you can grep
Vercel function output.

Copy `.env.example` to `.env.local` and fill in:

```bash
RESEND_API_KEY=re_...           # Resend API key
LEADS_TO_EMAIL=team@example.com # Inbox that receives lead notifications
LEADS_FROM_EMAIL=leads@yourdomain.com  # Verified sender on your Resend domain
```

Set the same variables in **Vercel project settings → Environment Variables**
for production.

## Routes (all prerendered)

| Path | What it is |
|---|---|
| `/` | Homepage |
| `/estimate` | 3-step rental estimate funnel |
| `/estimate/results` | Funnel results (reads `sessionStorage`; supports `?demo=1`) |
| `/areas/[city]` | 16 prerendered city pages (e.g. `/areas/palo-alto`) |
| `/api/leads` | `POST` endpoint for both lead forms |
| `/sitemap.xml` | Auto-generated sitemap of every public page |
| `/robots.txt` | Auto-generated robots with sitemap reference |
| `/opengraph-image` | 1200×630 link-unfurl image |

## Project structure

```
app/
  layout.tsx              Root layout, fonts, SEO metadata
  page.tsx                Homepage — composes site/* sections + JSON-LD
  globals.css             Tailwind base + smoothing + bg-dots utility
  not-found.tsx           Custom 404 with city link grid
  opengraph-image.tsx     1200×630 OG image (next/og)
  robots.ts               robots.txt
  sitemap.ts              sitemap.xml
  api/leads/route.ts      POST handler — Resend email + console fallback
  estimate/
    page.tsx              3-step funnel (client component, sessionStorage)
    results/page.tsx      Results page (client, redirects if no session data)
  areas/[city]/
    page.tsx              Dynamic city pages — generateStaticParams emits
                          all 16 slugs at build time

components/site/          Marketing site components
components/funnel/        /estimate funnel components

lib/
  site.ts                 SITE_URL + SITE_NAME — single source of truth
  content.ts              Company name, nav, trust badges, FAQ items,
                          city arrays, service catalog, founder bio,
                          homepage stats, city taglines
  areas.ts                City slug helpers + per-city FAQ generator +
                          sample addresses + allCitySlugs() for SSG
  rentEstimator.ts        Pure function — city × type baseline scaled
                          by bedrooms + sqft, returns rent range,
                          demand, days on market, insights
  mockProperties.ts       City × property-type rent baselines
```

## Customizing

- **Site URL** — `lib/site.ts`. Swap to your production domain when
  ready. Everything (canonicals, sitemap, OG image URLs, JSON-LD `url`
  fields) updates in one place.
- **Copy & data** — `lib/content.ts`. Most service titles, descriptions,
  city lists, FAQ items, founder note, homepage stats, dropdown options,
  and the company name live there.
- **Brand color** — `tailwind.config.ts`. The `brand` palette (soft
  teal-blue) is the only color extension; swap it to re-skin.
- **Add a new service area city** — add it to `PENINSULA_AREAS` or
  `SOUTH_BAY_AREAS` in `lib/content.ts`. The next build automatically:
  - prerenders a `/areas/[new-slug]` page
  - includes the city in the homepage `ServiceAreas` grid
  - includes the URL in `/sitemap.xml`
  - rebuilds every other city's `ServiceAreas` to link to it
  Optional: add an entry to `CITY_TAGLINES` (in content.ts) and
  `CITY_BASELINES` (in `mockProperties.ts`) for richer city-specific
  content.

## What's wired vs. placeholder

- **Lead capture** — Forms `POST` to `/api/leads`. The route always
  logs the lead to server console; it sends an email if Resend env vars
  are set. Failures don't block the user's success state on the funnel.
- **Founder note** — `FOUNDER` in `lib/content.ts` has placeholders
  (`[Founder Name]`, `[TBD]` license). Swap when real values exist.
  The portrait is initials in a brand-gradient circle; replace with
  `<Image>` once a headshot is hosted.
- **JSON-LD** — `[TBD]` placeholders for telephone, email, and CA DRE
  license number on the homepage and city pages. Update in
  `app/page.tsx` and `app/areas/[city]/page.tsx`.

## Designed to grow into

- Owner dashboard (real auth + data)
- Tenant portal
- Maintenance request portal
- Supabase persistence for leads (the API route is the seam — add a
  `supabase.from('leads').insert(...)` call alongside the Resend call)
- Real comp data in `lib/rentEstimator.ts` (Zillow, Rentometer, MLS)
