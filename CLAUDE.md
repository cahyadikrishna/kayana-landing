# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (Next.js)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)
- `npm run lint:design` — design-system guard (`scripts/lint-design.mjs`)

No test framework is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **ESLint 9** flat config with `core-web-vitals` and `typescript` presets

## Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

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
