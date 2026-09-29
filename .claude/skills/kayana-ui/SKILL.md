---
name: kayana-ui
description: Use when building, adding, or restyling any section, component, page, layout, animation, or visual style on the Kayana Moment landing site — enforces the editorial-monochrome design system in DESIGN.md.
---

# Kayana UI

The Kayana site has a strict design system. Off-system styling breaks the brand even when it "looks fine" on its own.

## Before writing code

1. Read `DESIGN.md` in full. It is the single source of truth.
2. Skim one existing section closest to what you're building (for example `src/components/RecentFeed.tsx` for header + grid, or `Testimonials.tsx` for a photo-backed section) and match its structure.

## While building

- Compose from `src/components/ui/`: `Section`, `SectionLabel`, `Button`, `Pill`, `Divider`. Don't re-implement them inline.
- Set type only through `type-display | type-title | type-quote | type-heading | type-subheading | type-body | type-caption | type-meta`.
- Colors: `paper`, `ink`, `ink-pure`, `graphite`, `smoke`, `ash` (and opacity tints). Nothing else exists in the theme.
- Motion: `reveal` class plus `--i` stagger, triggered by `useReveal()` on the section root. Nothing else unless DESIGN.md › Motion allows it.
- If the design truly needs something the system lacks, add it **as a token in `globals.css` and document it in DESIGN.md**. Never add a one-off arbitrary value, and tell the user you extended the system.

## Before finishing

Run all three and fix any failures:

```bash
npm run lint:design
npm run lint
npm run build
```

Then check the page at mobile (375px) and desktop (1280px) widths.
