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

See `CLAUDE.md` › Content and `DESIGN.md` for conventions.
