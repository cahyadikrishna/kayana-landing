import { stegaClean } from "next-sanity";
import type { HOME_PAGE_QUERY_RESULT } from "./types";

/** Shapes the section components receive, derived from HOME_PAGE_QUERY. */
export type PageData = HOME_PAGE_QUERY_RESULT;
export type Settings = NonNullable<PageData["settings"]>;
export type HeroContent = NonNullable<PageData["hero"]>;
export type AboutContent = NonNullable<PageData["about"]>;
export type HomeContent = NonNullable<PageData["home"]>;
export type ProjectsHeader = NonNullable<HomeContent["projects"]>;
export type TestimonialsHeader = NonNullable<HomeContent["testimonials"]>;
export type CtaBlockContent = NonNullable<HomeContent["ctaPrimary"]>;
export type ContactHeader = NonNullable<HomeContent["contact"]>;
export type Project = PageData["projects"][number];
export type Testimonial = PageData["testimonials"][number];

export type HeadlineValue = NonNullable<HeroContent["headline"]>;
export type SanityImageValue = NonNullable<HeroContent["background"]>;

export function whatsappHref(settings: Settings | null) {
  // Stega characters would corrupt the wa.me URL in draft mode
  const number = stegaClean(settings?.whatsappNumber);
  return number ? `https://wa.me/${number}` : undefined;
}
