# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (don't add a `package-lock.json`).

- `pnpm dev` — start dev server (Next.js)
- `pnpm build` — production build
- `pnpm lint` — run ESLint (flat config, `eslint.config.mjs`)
- `pnpm lint:design` — design-system guard (`scripts/lint-design.mjs`)
- `pnpm --dir studio dev` — Sanity Studio on :3333
- `pnpm --dir studio typegen` — regenerate `src/sanity/types.ts` after changing a schema or query
- `pnpm --dir studio deploy` — publish the Studio to https://kayanamoment.sanity.studio

No test framework is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **ESLint 9** flat config with `core-web-vitals` and `typescript` presets

## Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Content (Sanity)

All copy, images, stats, testimonials and contact details live in Sanity (project `ovo94io9`, dataset `production`). Nothing content-like is hard-coded in `src/components/`.

- `studio/` is a standalone Studio with its own `package.json`; it is excluded from the app's tsconfig and ESLint. Schemas are in `studio/schemaTypes/`; singletons are `siteSettings`, `hero`, `about`, `home`.
- `src/app/page.tsx` runs one query (`HOME_PAGE_QUERY` in `src/sanity/queries.ts`) via `sanityFetch` and passes typed props down. Section components never fetch.
- `<SanityLive />` and `<VisualEditing />` render in draft mode only, powering live preview and click-to-edit in the Studio's Presentation tool. Published content is cached indefinitely and refreshed only by the Sanity publish webhook (`/api/revalidate`, `SANITY_REVALIDATE_SECRET`, expires the `sanity` cache tag). There is no time-based fallback; recover a missed delivery by resending it from the webhook log in sanity.io/manage.
- In draft mode strings carry invisible stega markers: wrap any CMS value used in logic (hrefs, comparisons, keys) in `stegaClean()`. Metadata queries use `stega: false`.
- Headlines are Portable Text restricted to one italic run — render with `Headline`. Images render with `SanityImage`.
- Env vars: see `.env.example`. `SANITY_API_READ_TOKEN` is a secret Viewer token.

## Design system

**`DESIGN.md` is the single source of truth for all styling, typography and motion. Read it before building or restyling any section, component or page.** Tokens are in `src/app/globals.css`; primitives are in `src/components/ui/` (`Section`, `SectionLabel`, `Button`, `Pill`, `Divider`).

Non-negotiables:
1. Strictly achromatic: only `paper`, `ink`, `ink-pure`, `graphite`, `smoke`, `ash`, with opacity for tints. No brand or accent colors.
2. Radius 0 everywhere. `rounded-pill` only on `Pill`.
3. No shadows, blur/glass, or gradients.
4. Type through `type-*` utilities only. Serif (Fraunces) only as `type-display` / `type-title` / `type-quote`.
5. Sans never above weight 400. At most one italic `<em>` accent per headline. No bold.
6. Every section uses `Section` (paper default; max two `tone="ink"`) and starts with `SectionLabel` → `type-title`.
7. CTAs are `Button` text links with `→`. `variant="solid"` is reserved for the sticky booking button.
8. Motion: `reveal` + `--i` stagger via `useReveal`, `--ease-editorial` only. No lift, float, parallax, or animation libraries. Respect `prefers-reduced-motion`.

## Fonts

Loaded via `next/font/google` in `src/app/layout.tsx`: Fraunces (`--font-fraunces`, variable + italic + opsz), Inter 300/400 (`--font-inter`), JetBrains Mono 400 (`--font-jetbrains-mono`). They map to the `font-display` / `font-sans` / `font-mono` theme tokens.
