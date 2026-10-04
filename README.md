# Kayana Moment — landing page

Next.js 16 site with content managed in Sanity.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in SANITY_API_READ_TOKEN
pnpm dev                     # http://localhost:3000
```

## Content (Sanity)

Editors use the hosted Studio at **https://kayanamoment.sanity.studio** (also listed in the Sanity Dashboard). Publishing updates the live site within seconds. No redeploy needed. The **Presentation** tab shows the site with click-to-edit overlays.

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

Set these Environment Variables in the Vercel project (Production **and** Preview): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `NEXT_PUBLIC_SANITY_STUDIO_URL` (values in `.env.example`). `https://kayanamoment.vercel.app` is already allowed in Sanity CORS and is the Studio's preview URL. When a custom domain is added, run `npx sanity cors add https://<domain> --credentials` and update `studio/sanity.config.ts`.

See `CLAUDE.md` › Content and `DESIGN.md` for conventions.
