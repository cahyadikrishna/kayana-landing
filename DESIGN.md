# Kayana Moment — Design System

> Editorial monochrome. Graduation photography mounted on white paper, framed by a whisper-thin serif.

This file is the **single source of truth** for how anything on this site looks, reads, and moves. Tokens live in `src/app/globals.css`; primitives live in `src/components/ui/`. When building a new section, component, or page, follow this document. Don't invent new values.

Adapted from an editorial gallery reference (Hugo & Marie). We keep its principles and adjust three things for Kayana: a sanctioned **Ink** surface, a monochrome booking CTA, and free fonts.

---

## 1. Voice

The photographs are the only chromatic event. The interface is a white gallery wall: hairline rules, text labels, and images, nothing else. Typography carries the personality. A **hairline serif (Fraunces 100–200)** sets ceremonial headlines, a **light sans (Inter 300/400)** handles every piece of UI, and a **mono (JetBrains Mono)** marks metadata. The feel is unhurried, confident and quiet. It is never loud or "salesy".

**The system is defined by what it refuses:** color, shadows, glass, gradients, rounded corners, bold weights, and filled buttons. The single filled button is the sticky booking CTA.

---

## 2. Tokens

All tokens are Tailwind v4 `@theme` values in `src/app/globals.css`. Tailwind's default palette, radii, shadows, blurs, font sizes and weights are **wiped**, so classes like `text-sm`, `bg-gray-100` and `rounded-xl` don't exist. Use only what's below.

### Color

| Token | Value | Class examples | Role |
|---|---|---|---|
| `paper` | `#ffffff` | `bg-paper`, `text-paper` | Default surface; text on ink/photos |
| `ink` | `#0a0a0a` | `bg-ink`, `text-ink`, `border-ink` | Text, hairlines on paper, the Ink surface |
| `ink-pure` | `#000000` | `bg-ink-pure/30` | Photo overlays only |
| `graphite` | `#767676` | `text-graphite` | Muted/secondary text on paper, input borders |
| `smoke` | `#b3b3b3` | `text-smoke` | Muted icons, disabled |
| `ash` | `#cccccc` | `border-ash` | Pill borders, quiet UI states |

On ink or photos, derive tints with opacity: `text-paper/60` (secondary), `text-paper/50` (meta), and `border-paper/20` (hairlines). **No other colors, ever.** That includes brand greens: the WhatsApp CTA is monochrome.

### Surfaces

| Surface | Use | Limit |
|---|---|---|
| **Paper** (`tone="paper"`) | Default for every section | — |
| **Ink** (`tone="ink"`) | Anchor sections for rhythm: currently Projects and Footer | **Max two per page**, never adjacent |
| **Photograph** | Full-bleed image plus a flat `bg-ink/75` or `bg-ink-pure/30` veil (Hero, Testimonials) | Image must carry the atmosphere; no gradients |

### Typography

Always use the `type-*` utilities. They set family, size, line-height, tracking and weight together.

| Utility | Family / weight | Size | Use |
|---|---|---|---|
| `type-display` | Fraunces 100 | 48 → 100px (`clamp`) | One ceremonial line per page: hero headline, footer wordmark |
| `type-title` | Fraunces 200 | 36 → 72px | Section titles, big stat numbers |
| `type-quote` | Fraunces 300 | 24 → 36px | Pull quotes and testimonials **only** |
| `type-heading` | Inter 300 | 22px | Sub-headings, mobile menu links |
| `type-subheading` | Inter 300 | 20px | Lead paragraphs, wordmark in nav |
| `type-body` | Inter 400 | 16px / 1.64 | Body copy (also the `body` default) |
| `type-caption` | Inter 300 | 14px / 1.8 | Supporting copy, nav links, buttons, captions |
| `type-meta` | JetBrains Mono 400 | 13px | Eyebrows, pills, counters, dates, credits |

Rules:
- **Serif only at `type-display`, `type-title` or `type-quote`.** Never set serif at body or UI sizes.
- **Emphasis = one italic `<em>` word or phrase per headline**, in the same weight. Never mix bold and regular, and never use `font-bold` or `font-semibold`.
- **Sans never exceeds 400.** Nav, headings and links sit at 300.
- **Mono is metadata only**: never body copy or navigation labels.
- Write headlines as flowing sentences. Avoid manual `<br />` line breaks; let the column width set the rag.

### Space & layout

| Token | Value | Class |
|---|---|---|
| Section rhythm | `clamp(4rem, 9vw, 5.625rem)` (≈90px) | `py-section`, `my-section`, `mt-section` |
| Container | `80rem` max, gutters 24px → 64px at `md` | `container-page` |
| Arrow gap | 5px | `ml-element` |
| Base unit | 4px (Tailwind default spacing) | `gap-2`, `mt-6`, … |

Density is sparse. Prefer more vertical air to more content.

### Shape & elevation

- **Radius:** 0 everywhere. `rounded-pill` is allowed **only** on `Pill`.
- **Elevation:** none. No `shadow-*`, no `backdrop-blur`, no glass cards. Depth comes from full-bleed images and 1px hairlines.
- **Separators:** 1px hairlines (`Divider`). Don't use tinted blocks, cards, or whitespace alone to group content.

---

## 3. Components (`src/components/ui/`)

### `Section` — every section starts here
```tsx
const { ref } = useReveal();
<Section id="services" tone="paper" ref={ref}>…</Section>
```
Applies the surface tone, `py-section` and `container-page`. Use `as="footer"` for the footer. A full-bleed photo section (see `Testimonials.tsx`) uses a plain `<section className="relative bg-ink py-section">` plus `container-page`.

### `SectionLabel` — eyebrow above a title
```tsx
<SectionLabel index={2} tone="ink">Our Work</SectionLabel>   // → (02) Our Work
```
Mono metadata, no box. Number the sections in page order.

### `Button` — text-with-arrow by default
```tsx
<Button href="#contact-us">Let's capture it</Button>                        // link  (default)
<Button href="#contact-us" variant="outline">Let's capture it</Button>      // hairline box
<Button href={wa} variant="solid" icon={<WhatsAppIcon />}>Book a Session</Button> // sticky ONLY
```
`tone="ink"` goes on ink or photo backgrounds. `link` gets an underline that draws in and a 4px arrow nudge. `outline` inverts on hover. **`solid` is reserved for the floating booking CTA**; don't use it anywhere else.

### `Pill` — tags and filters (the only rounded element)
```tsx
<Pill tone="ink" active={f === "All"} onClick={() => setF("All")}>All</Pill>
```

### `Divider` — hairline rule
```tsx
<Divider />                                   // horizontal, ink on paper
<Divider tone="ink" orientation="vertical" /> // ruled columns on ink
```

### Recurring patterns
- **Section header row:** eyebrow plus `type-title` on the left; a short `type-caption` blurb plus a `Button` link on the right, aligned to the bottom. A `Divider` follows. See `RecentFeed.tsx`.
- **Ruled columns:** equal columns separated by vertical hairlines, with no card chrome. See `About.tsx` (stats) and `Testimonials.tsx` (quotes).
- **Catalog grid:** images at 0 radius and no overlay, with the caption **below** (`type-caption` title plus `type-meta` number). See `RecentFeed.tsx`.
- **Hairline list:** rows ruled by `border-t` with a mono index, a title and mono meta. See the hero credits.

---

## 4. Motion

One easing and a few durations. Motion should feel like a page settling, never like a bounce.

| Token | Value | Use |
|---|---|---|
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything (it's also Tailwind's default) |
| `--duration-fast` | 200ms | Color changes (`duration-200`) |
| `--duration-base` | 400ms | Hover, underline, arrow (`duration-400`) |
| `--duration-reveal` | 800ms | Scroll/load entrances |
| `--duration-slow` | 1100ms | Hero media fade, image zoom |
| `--stagger-step` | 100ms | Delay per `--i` step |

### Allowed patterns
| Pattern | How |
|---|---|
| **Scroll reveal** (fade + 24px rise) | Add `reveal` to elements inside a section whose root gets `ref` from `useReveal()` |
| **Stagger** | `style={{ "--i": n } as React.CSSProperties}` on `.reveal` / `.anim-*` elements |
| **Hero load** | `anim-fade` (media, nav), `anim-rise` (headline), `anim-person` (cutouts) |
| **Underline reveal** | `link-underline` on any text link (built into `Button`) |
| **Arrow nudge** | Built into `Button` |
| **Slow image zoom** (1.03) | `media-zoom` on an `<Image>` inside a `group` |
| **Count-up** | Stats only, see `About.tsx` |
| **Scroll hint drift** | `scroll-indicator`, hero only |

### Banned
Hover lift (`-translate-y`), shadows on hover, scale-pop, infinite floating loops, parallax, spring/bounce easing, grayscale-to-color reveals, and any animation library.

All motion must collapse under `prefers-reduced-motion`. The global block in `globals.css` handles every class above. If you add a new animated class, add it there too.

---

## 5. Do / Don't

**Do**
- Start every section with `Section` → `SectionLabel` → `type-title`.
- Let photographs bleed edge to edge or sit in a flat grid, and let them carry the color.
- Separate content with 1px hairlines.
- Use `Button` links with `→` for calls to action.
- Keep paragraphs short, with `max-w-sm` / `max-w-xl` measures.

**Don't**
- Add any color, gradient, shadow, blur, or radius (except `Pill`).
- Use `font-bold`/`font-semibold`, or serif at UI sizes.
- Put text on images with gradient scrims. Use a flat veil, or put the caption below the image.
- Use more than two Ink sections, or two in a row.
- Use raw hex values or arbitrary `text-[…]` sizes. The one exception is the footer wordmark's viewport-fit size.

---

## 6. Building a new section — recipe

```tsx
"use client";

import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import { useReveal } from "@/hooks/useScrollAnimation";

export default function Services() {
  const { ref } = useReveal();

  return (
    <Section id="services" ref={ref}>
      <div className="reveal flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="md:w-1/2">
          <SectionLabel index={6}>Services</SectionLabel>
          <h2 className="type-title mt-6">
            Every part of the day, <em>considered</em>.
          </h2>
        </div>
        <Button href="#contact-us">Plan your session</Button>
      </div>

      <Divider className="mt-12" />

      <ul>
        {services.map((s, i) => (
          <li key={s.name} className="reveal flex items-baseline gap-6 border-b border-ink py-6"
              style={{ "--i": i + 1 } as React.CSSProperties}>
            <span className="type-meta text-graphite">{String(i + 1).padStart(2, "0")}</span>
            <span className="type-heading flex-1">{s.name}</span>
            <span className="type-caption max-w-xs text-graphite">{s.description}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

Before finishing, run `npm run lint:design`, `npm run lint` and `npm run build`.
