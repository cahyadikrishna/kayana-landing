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

## Analytics

The site uses **Vercel Web Analytics** (visits, referrers, custom events) and **Speed Insights** (field LCP/INP/CLS). Both are cookieless and need no consent banner. They mount in `src/app/layout.tsx` and are skipped in draft mode, so Studio editing sessions are never counted. The footer carries a short privacy note (`UI.privacyNote` in `src/lib/ui-strings.ts`).

**Enable them once in the Vercel dashboard:** Project → Analytics → Enable, and Project → Speed Insights → Enable. The scripts are served from `/_vercel/insights/*` and `/_vercel/speed-insights/*` on Vercel only, so they 404 under a local `pnpm start`.

### Events

Links declare events in markup with `analyticsAttrs(name, props)` from `src/lib/analytics.ts`. One delegated listener in `src/components/Analytics.tsx` sends them on click, and on middle-click for links.

| Event | Props | Where |
| --- | --- | --- |
| `book_session_click` | `placement: "nav" \| "sticky"` | Desktop nav button, sticky booking button |
| `contact_click` | `channel: "whatsapp" \| "email" \| "instagram"` | Footer contact links |
| `project_filter` | `category` | Project filter pills, on a filter change only (not "All", not the active pill) |
| `explore_more_click` | none | "Explore more" link in Projects |
| `locale_switch` | `locale` | Reserved for #10, not sent yet |

**Conversions** = `book_session_click` + `contact_click` with `channel: "whatsapp"`, divided by visitors.

> **Plan limit:** the project is on Vercel **Hobby**. Hobby shows page views, referrers and Speed Insights, but **custom events need Pro**, so conversion counts are not visible until the project moves to Pro. The events are already sent and will show up once it does. Ad blockers block `/_vercel/insights`, so some visits and clicks are never counted.

### UTM convention

Instagram's in-app browser drops the referrer, so every Instagram link (bio, story, post, ad) must carry UTM parameters. Use lowercase with hyphens:

- `utm_source=instagram`
- `utm_medium=bio|story|post|paid_social`
- `utm_campaign=<yyyy-mm>-<slug>`, e.g. `2026-11-wisuda-ui`
- `utm_content=<creative>` (optional)

Example: `https://kayanamoment.vercel.app/?utm_source=instagram&utm_medium=story&utm_campaign=2026-11-wisuda-ui`

See `CLAUDE.md` › Content and `DESIGN.md` for conventions.
