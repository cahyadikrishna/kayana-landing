# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (Next.js)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)

No test framework is configured yet.

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19** with React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **ESLint 9** flat config with `core-web-vitals` and `typescript` presets

## Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Fonts

Geist and Geist Mono loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono` in the root layout.
