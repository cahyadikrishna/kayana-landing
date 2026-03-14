Build a complete landing page for my creative agency with the following spec:

## Project context

Kayana Moment is a graduation photography agency. Tagline: "We make your Graduation effortless captured."
Tone: bold, elegant, editorial. Target client: graduating students and their families.

## Tech rules

- Next.js App Router, TypeScript, Tailwind only (no inline styles, no CSS modules)
- Mobile-first: design for 375px, scale up to 1280px
- All components in /src/components/, page assembled in /src/app/page.tsx
- Use next/image for all images, next/font for typography
- No third-party UI libraries (no shadcn, no MUI, no Framer Motion)
- Subtle scroll animations using Intersection Observer API only (no libraries)
- All images: use https://picsum.photos/seed/[unique-word]/800/600 as placeholders

## Typography system

- Headings: Playfair Display (Google Fonts, free for commercial use)
- Body & UI: Inter (Google Fonts)
- Load both via next/font/google
- Style direction: large, heavy Playfair Display headlines paired with tight,
  light Inter body text — bold editorial feel with an elegant serif touch
- Section titles should be oversized (text-6xl to text-9xl) like the reference image
- Use italic Playfair Display for accent words within headlines

## Color palette (match reference image exactly)

- Background: #FFFFFF (white sections) and #111111 (dark sections)
- Primary text: #111111
- Inverted text: #FFFFFF
- Accent: #111111 (rely on typography weight and spacing, not color, for hierarchy)
- Tags and labels: uppercase Inter, text-xs, letter-spacing wide, color #888888

## Sections (in this exact order)

1. **Nav** — Fixed top nav, white background, agency name left-aligned in Playfair Display
   italic, links right-aligned in Inter. "About Us", "Projects", "Services", "Team".
   Thin bottom border on scroll.

2. **Hero** — Full viewport height. Giant "Kayana Moment." headline in Playfair Display
   bold (text-8xl md:text-9xl), black on white. Below the headline: a row of 4 small
   service tags (Brand Strategy, Photography, Digital Design, Retouching) each with a
   numbered icon. Below tags: a 2-column asymmetric photo grid (3 images total — one tall
   left, two stacked right) using picsum placeholders. Bottom-left corner: small italic
   caption "©2025 Kayana Moment".

3. **About / Stats** — White section. Left: a bold italic serif pull-quote paragraph
   ("Driven by vision and light, our team creates graduation memories that last forever.").
   Right: 3 stat cards in a grid — "120+ Sessions Completed", "99% Client Satisfaction",
   "5+ Years of Experience". Each stat has a large Playfair Display number, Inter label,
   and 1-line description. Thin border separators between cards.

4. **Projects** — White section. Left-aligned oversized "Project." heading with a small
   counter tag "[24]". A horizontal scrollable row of 4 project cards on desktop, stacked
   on mobile. Each card: full-bleed image, project name overlaid in Playfair Display white,
   category tag below in Inter (e.g. [Graduation - 23], [Portrait - 22]).

5. **Services** — Full dark section (#111111 background, white text). Large "Service."
   heading top-left with a "[What we do]" label above it. Right of heading: short tagline
   - "Get Started →" CTA button (white outlined). Below: 5 service rows separated by thin
     white borders — "Graduation Photography [1]", "Portrait Sessions [2]",
     "Event Coverage [3]", "Photo Retouching [4]", "Digital Prints [5]".
     Each row: service name in large Playfair Display on left, short Inter description
     on right. On hover, the active row shows a thumbnail image inset (absolutely positioned).

6. **Testimonials** — White section. Label "[What they say]" in small caps Inter.
   Large italic Playfair Display heading "Kind Words." Three testimonial cards in a row
   (stack on mobile). Each card: quote in Playfair Display italic, client name in Inter
   bold, role/occasion below in Inter light. Thin card borders, generous padding.

7. **Team** — White section. Label "[@KayanaaMoment]" small top-left. Large Playfair
   Display heading "Our Creative Minds." 4 team member cards in a row (2 col on mobile):
   square picsum photo, name in Inter bold, role in Inter light, 2-line bio below.
   Colorful background tints on photos (CSS filter: hue-rotate or colored overlay div).

8. **Blog / Insights** — White section. Label "[Latest Stories]" in small caps.
   Large "Insights." heading in Playfair Display. 3 blog preview cards in a grid:
   picsum image top, category tag, post title in Playfair Display, short excerpt in Inter,
   date and "Read more →" link. Cards have thin borders.

9. **CTA / Footer top** — Dark section (#111111). Large italic Playfair Display headline
   spanning 2 lines: "We look forward to capturing your moment." Background: a dark
   full-bleed picsum photo with a dark overlay. White text throughout.

10. **Footer** — Dark section continuing from CTA. Left: agency description in small Inter.
    Center: Navigation links column. Right: Social Media links column (Instagram, LinkedIn,
    Facebook). Bottom: full-width "Kayana Moment." in oversized Playfair Display bold,
    acting as a visual end mark.

## Layout behavior

- Sticky nav with blur backdrop on scroll
- Hero is full viewport height (100svh)
- Dark/light section alternation creates natural visual rhythm
- All section headings follow the oversized editorial style from reference
- Generous whitespace: section padding py-24 md:py-32 minimum

## Spacing & detail rules

- Small metadata labels above section headings: uppercase Inter text-xs tracking-widest
  text-gray-400, e.g. "[What we do]", "[03]"
- Numbered superscripts on service names: styled as small Inter text-xs aligned top
- Horizontal rules: use thin 1px borders (border-gray-200 on white, border-gray-700
  on dark) — no heavy dividers
- Cards: no drop shadows — use border instead (border border-gray-200)
- Buttons: outlined style, no fill, sharp corners (rounded-none), hover inverts colors

## What NOT to do

- No gradients anywhere
- No drop shadows (box-shadow: none)
- No rounded corners on cards or buttons (rounded-none)
- No colorful backgrounds except the team photo overlays
- No Lorem Ipsum — write realistic graduation photography agency copy
- Do not install any animation libraries
- Do not use CSS modules or styled-components
