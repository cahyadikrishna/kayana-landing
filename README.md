# Kayana Moment — landing page

Next.js 16 site with content managed in Sanity.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in SANITY_API_READ_TOKEN
pnpm dev                     # http://localhost:3000
pnpm typecheck               # generate Next route types, then tsc --noEmit
```

CI (`.github/workflows/ci.yml`) runs on every PR and on pushes to `main`: lint, design lint, typecheck and build for the app, then a Studio typecheck, a typegen drift check on `src/sanity/types.ts`, and a Studio build.

## Content (Sanity)

Editors use the hosted Studio at **https://kayanamoment.sanity.studio** (also listed in the Sanity Dashboard). Publishing updates the live site within seconds through the publish webhook (see below). No redeploy needed. The **Presentation** tab shows the site with click-to-edit overlays.

To work on the Studio itself:

```bash
cd studio
pnpm install
pnpm dev        # http://localhost:3333
pnpm typegen    # after changing a schema or a GROQ query
pnpm deploy     # publish the Studio
pnpm seed       # create any missing content (pass -- --replace to reset everything)
```

## Deploying (Vercel)

Set these Environment Variables in the Vercel project (Production **and** Preview): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_SANITY_STUDIO_URL`, `SANITY_REVALIDATE_SECRET` (values in `.env.example`). `https://kayanamoment.vercel.app` is already allowed in Sanity CORS and is the Studio's preview URL. When a custom domain is added, run `npx sanity cors add https://<domain> --credentials` and update `studio/sanity.config.ts`.

### Publish webhook

Published content is cached until `/api/revalidate` expires it. Create the webhook once in sanity.io/manage → project → API → Webhooks:

- **URL:** `https://kayanamoment.vercel.app/api/revalidate`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type in ["siteSettings", "hero", "about", "home", "project", "category", "testimonial", "sanity.imageAsset"]`
- **Projection:** `{_type}`
- **HTTP method:** POST
- **API version:** `v2026-10-01` (matches `src/sanity/env.ts`)
- **Secret:** a random string; set the same value as `SANITY_REVALIDATE_SECRET` in Vercel (Production)
- Leave drafts and versions off.

The webhook is the only thing that refreshes published content: fetches are cached indefinitely (`next-sanity`'s `sanityFetch` sets `revalidate: false`). If a delivery fails, published edits stay hidden until it succeeds. To recover, open the webhook's attempt log in sanity.io/manage and resend the failed delivery. Preview deployments get no webhook, so outside draft mode their published content can be stale. Preview content through draft mode (the Studio's Presentation tool), where `<SanityLive />` keeps it live.

See `CLAUDE.md` › Content and `DESIGN.md` for conventions.
